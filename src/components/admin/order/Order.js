import React, { Component, useState } from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import WebsocketNotification from "./WebsocketNotification";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import {
  Collapse,
  Pagination,
  Button,
  Modal,
  Row,
  Col,
  Popover,
  Typography,
} from "antd";
import {
  PrinterOutlined,
  MailOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styles from "../admin.less";
import {
  printOrder,
  smsSend,
  sendMail,
  listenOrder,
} from "../../../actions/index";
import SmsForm from "../form/SmsForm";
import moment from "moment";
import AdminPage from "../AdminPage";
import DatePickerForm from "./DatePickerForm";
import PreOrders from "./preorders/PreOrders";
import { useTranslation } from "react-i18next";
import { useSWRConfig } from "swr";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
const convertInEuro = (totalPrice) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);
};
const { Title } = Typography;
const pageSize = 6;

function Order({
  loading,
  admincrud,
  basicinfo,
  printOrder,
  smsSend,
  sendMail,
  listenOrder,
}) {
  const { mutate } = useSWRConfig();
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({});
  const [chosenDate, setChosenDate] = useState(moment());
  const [chosenMonth, setChosenMonth] = useState(moment());
  const [current, setCurrent] = useState(1);
  const { t } = useTranslation();

  const onFinish = (values) => {
    console.log("Success:", values.date);
    setChosenDate(values.date);
    mutate(
      `/api/admincrud/fetchPreOrders/?restaurant_id=${restaurant_id}&chosenDate=${JSON.stringify(
        chosenDate.startOf("day")
      )}`
    );
  };
  const onChange = (page) => {
    setCurrent(page);
  };
  const showModal = (order) => {
    setVisible(true);
    setOrder(order);
  };

  const printomzet = (orders, period) => {
    // const { printOrder } = this.props;
    const omzetobj = (ordersArr, omzetPeriod) => {
      let totalSalesRevenue = 0;
      let totalAfhaalRevenue = 0;
      let totalBezorgenRevenue = 0;
      ordersArr.forEach((order) => {
        totalSalesRevenue += order.totalPrice;
        if (order.orderType === "afhalen") {
          totalAfhaalRevenue += order.totalPrice;
        }
        if (order.orderType === "bezorgen") {
          totalBezorgenRevenue += order.totalPrice;
        }
      });
      return {
        totalSalesRevenue,
        totalAfhaalRevenue,
        totalBezorgenRevenue,
        aantal: ordersArr.length,
        date:
          omzetPeriod === "day"
            ? chosenDate.format("dddd, MMMM Do YYYY, h:mm:ss,Z")
            : chosenMonth.format(" MMMM YYYY"),
        omzetPeriod,
      };
    };
    const obj = omzetobj(orders, period);
    console.log(obj);
    printOrder(obj);
    return obj;
  };
  const onFinishDayReport = () => {
    const { orders } = admincrud.fetchOrders;

    const orders_to_print = orders.filter((order) =>
      chosenDate.isSame(moment(order.createdDate), "day")
    );
    printomzet(orders_to_print, "day");
  };
  const onFinishMonthReport = (values) => {
    const { orders } = admincrud.fetchOrders;

    const orders_to_print = orders.filter((order) =>
      values.date.isSame(moment(order.createdDate), "month")
    );
    printomzet(orders_to_print, "month");
  };
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    // this.setState({ visible: false });
    setVisible(false);
  };
  const onChangeDatePicker = (date) => {
    console.log(date);
    // this.setState({ chosenMonth: date });
    setChosenMonth(date);
  };
  let totalSalesRevenue = 0;
  let totalAfhaalRevenue = 0;
  let totalBezorgenRevenue = 0;
  //get all paid orders from DB
  const allPaidOrders =
    loading.effects["admincrud/fetchOrders"] === false
      ? admincrud.fetchOrders.orders
      : [];
  const limitedPaidOders = allPaidOrders.filter((order) =>
    chosenDate.isSame(moment(order.createdDate), "day")
  );
  const allPanels = limitedPaidOders.map((order, i) => {
    totalSalesRevenue += order.totalPrice;
    if (order.orderType === "afhalen") {
      totalAfhaalRevenue += order.totalPrice;
    }
    if (order.orderType === "bezorgen") {
      totalBezorgenRevenue += order.totalPrice;
    }
    const isorderinadvance =
      order.date &&
      !moment(order.date).isSame(moment(order.createdDate), "day");
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
      <div
        style={{ width: "100%", color: isorderinadvance ? "red" : "inherit" }}
      >
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
                <Popover content={content} placement="leftTop" trigger="click">
                  <InfoCircleOutlined />
                </Popover>
              </div>
              <div>
                {isorderinadvance ? (
                  <div style={{ color: "red" }}>
                    {moment(order.date).format("DD-MM-YYYY")}
                  </div>
                ) : null}
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
            <b>{convertInEuro(order.totalPrice)}</b>
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
                <Col span={6}>{convertInEuro(cartProduct.subTotal)}</Col>
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
            <Col span={6}>{convertInEuro(order.deliveryFee)}</Col>
          </Row>
        ) : null}
        {order.tip > 0 ? (
          <Row>
            <Col span={6}>1</Col>
            <Col span={12}>fooi</Col>
            <Col span={6}>{convertInEuro(order.tip)}</Col>
          </Row>
        ) : null}
        {order.transactieKosten ? (
          <Row>
            <Col span={6}>1</Col>
            <Col span={12}>transactiekosten</Col>
            <Col span={6}>{convertInEuro(order.transactieKosten)}</Col>
          </Row>
        ) : null}
        {order.discountAmount > 0 ? (
          <Row>
            <Col span={6}>1</Col>
            <Col span={12}>Afhalen korting:</Col>
            <Col span={6}>- {convertInEuro(order.discountAmount)}</Col>
          </Row>
        ) : null}
        {order.discountAmountByCode > 0 ? (
          <Row>
            <Col span={6}>1</Col>
            <Col span={12}>kortingscode:</Col>
            <Col span={6}>- {convertInEuro(order.discountAmountByCode)}</Col>
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
          <span>
            {" "}
            <Button
              type="danger"
              shape="circle"
              icon={<MailOutlined />}
              onClick={() => showModal(order)}
            ></Button>
          </span>
        </div>
      </Collapse.Panel>
    );
  });

  return (
    <div>
      <AdminPage page="orders" reservation={basicinfo.reservation} t={t} />
      <div id="barsMenuAndLanguageSwitcherWrapper">
        <div id="languageSwitcherWrapper">
          <LanguageSwitcher />
        </div>
      </div>
      <WebsocketNotification
        listenOrder={listenOrder}
        namespace={basicinfo.namespace}
      />
      <div className={styles.ordersFull}>
        <DatePickerForm onFinish={onFinish} t={t} />
        <PreOrders chosenDate={chosenDate} printOrder={printOrder} t={t} />
        <Collapse bordered={true} defaultActiveKey={["0"]}>
          {allPanels.filter(
            (a, i) =>
              i >= (current - 1) * pageSize && i <= current * pageSize - 1
          )}
        </Collapse>

        <Modal
          className={styles.modalOneButton}
          visible={visible}
          title={
            order.cus_orderId +
            " " +
            order.orderType +
            " " +
            order.customerName +
            " " +
            convertInEuro(order.totalPrice)
          }
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading.effects["admincrud/add"] === true}
              onClick={handleOk}
            >
              Submit
            </Button>,
          ]}
        >
          {/* <AddForm addInDb={addInDb} loading={loading} categories={categories} /> */}
          <SmsForm
            sendMail={sendMail}
            number={order.telefoon}
            orderType={order.orderType}
            orderId={order.cus_orderId}
            loading={loading}
            admincrud={admincrud}
            takeTime={order.takeTime}
            customerName={order.customerName}
            email={order.email}
          />
        </Modal>
      </div>
      <div className={styles.pagination}>
        <Pagination
          current={current}
          onChange={onChange}
          pageSize={pageSize}
          total={allPanels.length}
        />
      </div>
      <div className={styles.totalRevenue}>
        <Row>
          <Col sm={8} xs={24}>
            <Title>
              {t("pick-up")}:{convertInEuro(totalAfhaalRevenue)}
            </Title>
          </Col>
          <Col sm={8} xs={24}>
            <Title>
              {t("delivery")}:{convertInEuro(totalBezorgenRevenue)}
            </Title>
          </Col>
          <Col sm={8} xs={24}>
            <Title>
              {t("total")}:{convertInEuro(totalSalesRevenue)}
            </Title>
          </Col>
        </Row>
      </div>

      {
        // <OmzetPrintForm
        //   onFinishDayReport={onFinishDayReport}
        //   onFinishMonthReport={onFinishMonthReport}
        //   onChangeDatePicker={onChangeDatePicker}
        //   t={t}
        // />
      }
    </div>
  );
}

const mapStateToProps = ({ loading, admincrud, basicinfo }) => ({
  loading,
  admincrud,
  basicinfo,
});

export default connect(mapStateToProps, {
  printOrder,
  smsSend,
  sendMail,
  listenOrder,
})(Order);
