import React, { useState } from "react";
import { myfetcher } from "Utilities/toolStore";
import gegevens, { changeFormat } from "Utilities/gegevens";
import styles from "../../admin.less";
import useSWR from "swr";
import moment from "moment";
import { Collapse, Pagination, Col, Popover, Button, Row } from "antd";
import { PrinterOutlined, InfoCircleOutlined } from "@ant-design/icons";
const { restaurant_id } = gegevens;
const pageSize = 6;

export default function PreOrders({ chosenDate, printOrder, t }) {
  const [current, setCurrent] = useState(1);
  const [showPreOrders, setShowPreOrders] = useState(false);
  const handleClick = () => {
    setShowPreOrders(!showPreOrders);
  };
  const { data, error } = useSWR(
    `/api/admincrud/fetchPreOrders/?restaurant_id=${restaurant_id}&chosenDate=${JSON.stringify(
      chosenDate.startOf("day")
    )}`,
    myfetcher
  );
  if (error) {
    return <div>Fout optreedt.</div>;
  }
  if (!data) {
    return <div>loading...</div>;
  }
  if (!Array.isArray(data)) {
    return <div> wrong type data</div>;
  }
  if (Array.isArray(data) && data.length === 0) {
    return null;
  }
  if (Array.isArray(data) && data.length > 0) {
    const allPanels = data.map((order, i) => {
      const content = (
        <div>
          {order.orderType === "bezorgen" ? (
            <div>
              <p>{order.adres}</p>
              <p>{order.postcode}</p>
              <p>{order.telefoon}</p>
              <p>{order.notes}</p>
              <p>{order.bedrijfsnaam}</p>
            </div>
          ) : (
            <div>
              <p>{order.telefoon}</p>
              <p>{order.notes}</p>
              <p>{order.bedrijfsnaam}</p>
            </div>
          )}
        </div>
      );
      const printButtonContent = (
        <div>
          <Button
            type="primary"
            style={{ backgroundColor: "#fc9d03", marginRight: "5px" }}
            onClick={() =>
              printOrder({
                ...order,
                printOnlyLobby: true,
                printOnlyKitchen: false,
              })
            }
          >
            Alleen balie bon
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#04d15d" }}
            onClick={() =>
              printOrder({
                ...order,
                printOnlyLobby: false,
                printOnlyKitchen: false,
              })
            }
          >
            Beide bonnen
          </Button>
        </div>
      );
      const header = (
        <div style={{ width: "100%", color: "#1ea808" }}>
          <Row>
            <Col span={5}>
              <b>{order.cus_orderId}</b>
            </Col>
            <Col span={5}>
              {order.paymethod !== "cash" ? null : (
                <div
                  style={{
                    marginRight: "8px",
                    borderStyle: "solid",
                    textalign: "center",
                    fontWeight: "600",
                    wordBreak: "break-word",
                  }}
                >
                  NOG TE BETALEN
                </div>
              )}
            </Col>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  fontWeight: 700,
                  justifyContent: "center",
                }}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <Popover
                    content={content}
                    placement="leftTop"
                    trigger="click"
                  >
                    <InfoCircleOutlined />
                  </Popover>
                </div>
                <div>
                  <div style={{ color: "#1ea808" }}>
                    {moment(order.date).format("DD-MM-YYYY")}
                  </div>
                  <div>
                    {order.orderType} {order.takeTime}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <b>{order.customerName}</b>
            </Col>
            <Col span={4}>
              <b>{changeFormat(order.totalPrice)}</b>
            </Col>
          </Row>
        </div>
      );
      return (
        <Collapse.Panel header={header} key={i}>
          <div className={styles.productsHeader}>
            <Row>
              <Col span={6}>Aantal</Col>
              <Col span={6}>Title</Col>
              <Col span={6}>Optie</Col>
              <Col span={6}>Subtotal</Col>
            </Row>
          </div>
          <br />
          {order.cartProducts.map((cartProduct) => {
            return (
              <div className={styles.productsHeader}>
                <Row>
                  <Col span={6}>{cartProduct.quantity}</Col>
                  <Col span={6}>{cartProduct.title}</Col>
                  <Col span={6}>
                    {cartProduct.option !== undefined
                      ? cartProduct.option.title
                      : "nvt"}
                  </Col>
                  <Col span={6}>{changeFormat(cartProduct.subTotal)}</Col>
                </Row>
              </div>
            );
          })}

          {order.tip > 0 ||
          order.transactieKosten ||
          order.orderType === "bezorgen" ||
          order.discountAmount > 0 ? (
            <div
              style={{ margin: "10px 0", borderTop: "1px dotted black" }}
            ></div>
          ) : null}
          {order.orderType === "bezorgen" ? (
            <Row>
              <Col span={6}>1</Col>
              <Col span={12}>bezorgenkosten</Col>
              <Col span={6}>{changeFormat(order.deliveryFee)}</Col>
            </Row>
          ) : null}
          {order.tip > 0 ? (
            <Row>
              <Col span={6}>1</Col>
              <Col span={12}>fooi</Col>
              <Col span={6}>{changeFormat(order.tip)}</Col>
            </Row>
          ) : null}
          {order.transactieKosten ? (
            <Row>
              <Col span={6}>1</Col>
              <Col span={12}>transactiekosten</Col>
              <Col span={6}>{changeFormat(order.transactieKosten)}</Col>
            </Row>
          ) : null}
          {order.discountAmount > 0 ? (
            <Row>
              <Col span={6}>1</Col>
              <Col span={12}>korting:</Col>
              <Col span={6}>- {changeFormat(order.discountAmount)}</Col>
            </Row>
          ) : null}

          <div className={styles.printer}>
            <span style={{ paddingRight: "20px" }}>
              {" "}
              <Popover content={printButtonContent} trigger="click">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PrinterOutlined />}
                  // onClick={() => printOrder(order)}
                ></Button>
              </Popover>
            </span>
            <span></span>
          </div>
        </Collapse.Panel>
      );
    });

    return (
      <div>
        <div
          style={{
            textAlign: "center",
            background: "black",
            color: "white",
            padding: "10px",
            fontWeight: 700,
            fontSize: "18px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
          onClick={handleClick}
        >
          {t("you_have_preorders", { count: data.length })}
        </div>

        {!showPreOrders ? null : (
          <div>
            <Collapse bordered={true}>
              {allPanels.filter(
                (a, i) =>
                  i >= (current - 1) * pageSize && i <= current * pageSize - 1
              )}
            </Collapse>

            <div className={styles.pagination}>
              <Pagination
                current={current}
                onChange={(page) => setCurrent(page)}
                pageSize={pageSize}
                total={allPanels.length}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
