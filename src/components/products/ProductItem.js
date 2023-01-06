import React from "react";
import { useMediaQuery } from "react-responsive";
import { CloseDays } from "Utilities/close";
import { Button, message, Tooltip } from "antd";
import { daysOptions } from "../checkout/form/options/timeOptions";
import styles from "../../css/product.less";
import cssstyles from "../../css/product.css";
import "../../index.css";
import moment from "moment";
import gegevens from "Utilities/gegevens";
import { colorPurple } from "Utilities/toolStore";
import { changeFormat } from "Utilities/gegevens";
import allergies from "Utilities/allergies";
import { IconFont } from "Utilities/toolStore";
const propTypes = {};
let winkelwagendrawerFunc;
let backgroundFunc;
message.config({
  top: 200,
  duration: 3,
  maxCount: 1,
  getContainer: () => root,
});
const NotAvailableMsg = (
  <div>
    Wegens omstandigheden kunnen we al de online bestellingen niet verwerken.
    Sorry voor het ongemak.
  </div>
);
const closeMsg = (obj) => {
  const { extra_closed, text, history } = obj;
  if (extra_closed.closed) {
    return (
      <div>
        Vanaf {moment(extra_closed.begin).format("DD-MM-YYYY")} t/m{" "}
        {moment(extra_closed.end).format("DD-MM-YYYY")} zijn we gesloten i.v.m.
        {extra_closed.reason}.
        <Button
          type="primary"
          onClick={() =>
            history.push(gegevens.homePage ? "/#contact" : "/contact")
          }
        >
          Bekijk onze Openingstijden
        </Button>
      </div>
    );
  }

  return (
    <div>
      Op {text} zijn we gesloten.
      <Button
        type="primary"
        onClick={() =>
          history.push(gegevens.homePage ? "/#contact" : "/contact")
        }
      >
        Bekijk onze Openingstijden
      </Button>
    </div>
  );
};
const handleClick = (obj) => {
  const {
    outofstock,
    closeday,
    history,
    menuKind,
    productId,
    price_half,
    itemAdd,
    getPrice,
    discount,
    showModal,
    productTitle,
    productCategorie,
    extra,
    openingstijden,
    _closeday,
    afhaalstatus,
  } = obj;
  const closedayInstance = new CloseDays(_closeday, openingstijden);
  const extra_closed = closedayInstance.extra_closed();
  const normal_closed = closedayInstance.normal_closed();
  const day = daysOptions.find((day) => day.value === moment().day());

  if (outofstock) {
    return;
  }
  if (extra_closed.closed || normal_closed) {
    warning(closeMsg({ extra_closed, text: day.text, history }));
    return;
  } else if (!afhaalstatus) {
    warning(NotAvailableMsg);
  } else if (
    !price_half &&
    ((typeof menuKind === "string" && menuKind === "withoutOption") ||
      (Array.isArray(menuKind) && menuKind.includes("withoutOption")))
  ) {
    const element = document.getElementById(productTitle);
    const winkelwagendrawertotal = document.getElementById(
      "winkelwagendrawertotal"
    );
    if (
      winkelwagendrawertotal.classList.contains(cssstyles.winkelwagenAfteradd)
    ) {
      winkelwagendrawertotal.classList.remove(cssstyles.winkelwagenAfteradd);
      clearTimeout(winkelwagendrawerFunc);
    }
    if (element.classList.contains(cssstyles.afteradd)) {
      element.classList.remove(cssstyles.afteradd);
      clearTimeout(backgroundFunc);
    }
    setTimeout(() => element.classList.add(cssstyles.afteradd), 100);
    setTimeout(
      () => winkelwagendrawertotal.classList.add(cssstyles.winkelwagenAfteradd),
      100
    );
    backgroundFunc = setTimeout(() => {
      element.classList.remove(cssstyles.afteradd);
    }, 500);
    winkelwagendrawerFunc = setTimeout(() => {
      winkelwagendrawertotal.classList.remove(cssstyles.winkelwagenAfteradd);
    }, 1000);
    const isHalfPortion = false;
    itemAdd({
      id: productId,
      subTotal: getPrice(productId, isHalfPortion, discount),
      discount,
      halfPortion: false,
    });
  } else {
    showModal(
      productId,
      productTitle,
      menuKind,
      productCategorie,
      extra,
      discount
    );
  }
};
const warning = (msg) => {
  message.warning(msg);
};
function ProductItem(props) {
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });
  const ImgSmallscreen = ({ productImgUrl, children }) => {
    return productImgUrl && isSmallscreen ? children : null;
  };
  const ImgBigscreen = ({ productImgUrl, children }) => {
    return productImgUrl && !isSmallscreen ? children : null;
  };
  const Img = ({ hasDiscount, productImgUrl }) => (
    <span>
      <img
        src={productImgUrl}
        alt="img"
        width="100"
        style={
          isSmallscreen && !hasDiscount
            ? { padding: "10px 5px 0 0" }
            : { paddingRight: "5px" }
        }
      />
    </span>
  );
  const ImgOutOfStock = ({ productImgUrl }) => (
    <img
      src={productImgUrl}
      alt="img"
      style={{
        position: "absolute",
        top: "10%",
        left: isSmallscreen ? "10%" : "15%",
        width: isSmallscreen ? "80vw" : "250px",
      }}
    />
  );

  let data;
  const {
    productId,
    productTitle,
    productCategorie,
    productDiscription,
    productImgUrl,
    productPrice,
    price_half,
    outofstock,
    menuKind,
    showModal,
    extra,
    discount,
    discountedPrice,
    itemAdd,
    getPrice,
    closeday,
    history,
    themeColor,
    allergy,
    openingstijden,
    _closeday,
    afhaalstatus,
  } = props;
  data = (
    <div
      className={styles.productItem}
      style={{
        position: "relative",
        pointerEvents: outofstock ? "none" : "auto",
      }}
    >
      <div
        style={{
          opacity: outofstock ? "0.9" : "1",
          filter: outofstock ? "grayscale(100%)" : "grayscale(0%)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <div>
            <h4 className={styles.productTitle}>{productTitle}</h4>
            {allergy.length === 0 ? null : (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {allergy.map((allerg) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Tooltip title={allerg} trigger={["hover", "click"]}>
                      <IconFont
                        style={{ fontSize: "24px", margin: "0 2px" }}
                        type={allergies[allerg]}
                      />
                    </Tooltip>
                  </div>
                ))}
              </div>
            )}
          </div>
          {productDiscription ? (
            <div style={{ paddingRight: "15px" }}>
              {productDiscription.split("-").map((description, i) => (
                <div key={i}>{description}</div>
              ))}
            </div>
          ) : null}
        </div>
        <div style={{ flex: 0.3 }}>
          <ImgBigscreen productImgUrl={productImgUrl}>
            <Img
              productImgUrl={productImgUrl}
              hasDiscount={discount && discount !== 0}
            />
          </ImgBigscreen>
        </div>
        <div className={styles.productRightSide}>
          <div style={{ float: "right" }}>
            {!discount || discount === 0 ? (
              <span className={styles.productPrice}>
                {changeFormat(productPrice)}
              </span>
            ) : (
              <span
                style={{ fontStyle: "italic", color: "red" }}
                className={styles.productPrice}
              >
                {discountedPrice}
              </span>
            )}

            <IconFont
              type={themeColor === colorPurple ? "icon-add-copy" : "icon-add"} //purple
              className={styles.productIcon}
            />
          </div>
          {!discount || discount === 0 ? null : (
            <div>
              <span
                style={isSmallscreen ? { paddingLeft: "20%" } : {}}
                className={styles.productOriginalPrice}
              >
                {changeFormat(productPrice)}
              </span>
            </div>
          )}
          <div>
            <ImgSmallscreen productImgUrl={productImgUrl}>
              <Img
                productImgUrl={productImgUrl}
                hasDiscount={discount && discount !== 0}
              />
            </ImgSmallscreen>
          </div>
        </div>
      </div>
      {!outofstock ? null : (
        <ImgOutOfStock productImgUrl="https://i.ibb.co/ZMWkPbS/tijdelijknietleverbaar.png" />
      )}
    </div>
  );

  return (
    <div
      id={productTitle}
      onClick={() =>
        handleClick({
          outofstock,
          closeday,
          history,
          menuKind,
          productId,
          price_half,
          itemAdd,
          getPrice,
          discount,
          showModal,
          productTitle,
          productCategorie,
          extra,
          _closeday,
          afhaalstatus,
          openingstijden,
        })
      }
    >
      {data}
    </div>
  );
}

ProductItem.propTypes = propTypes;

export default ProductItem;
