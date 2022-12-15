import React from "react";
import PropTypes from "prop-types";
import styles from "../../css/winkelwagen.less";
import { createFromIconfontCN } from "@ant-design/icons";
import CartSummary from "./CartSummary";
import { totalOptions } from "../products/productOptions";
import { IconFont, colorPurple } from "Utilities/toolStore";

const propTypes = {
  itemAdd: PropTypes.func.isRequired,
  goCheckout: PropTypes.func.isRequired,
};

function WinkelwagenPage(props) {
  const {
    itemAdd,
    itemDelete,
    goCheckout,
    min_value,
    bezorgstatus,
    categories,
    themeColor,
    restaurantType,
    t,
  } = props;
  const { cart, discountAmount, subtotalPrice, totalPrice } = props.cart;
  const { products } = props.products;
  let dataList;
  let emptyMessage = (
    <h3>{t("Kies iets lekkers uit het menu en plaats je bestelling.")}</h3>
  );
  if (cart.length === 0) {
    dataList = <div className={styles.emptyMessage}>{emptyMessage}</div>;
  } else {
    dataList = cart.map((cartItem, i) => {
      const { option } = cartItem;
      const regex = /\B\s*,+,*|,\s*$/gi;
      let foundItem = products.find(function (element) {
        return element.id === cartItem.id;
      });

      const priceineuro = new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
      }).format(cartItem.subTotal);

      const iconsRow = (
        <div className="wagen_icons">
          <span>
            <button
              onClick={() => {
                if (option) {
                  itemDelete({
                    id: cartItem.id,
                    option: option,
                    subTotal: cartItem.subTotal,
                    halfPortion: cartItem.halfPortion,
                  });
                } else {
                  itemDelete({
                    id: cartItem.id,
                    subTotal: cartItem.subTotal,
                    halfPortion: cartItem.halfPortion,
                  });
                }
              }}
            >
              <IconFont
                type={
                  themeColor === "#6f1c75"
                    ? "icon-roundMinus-copy"
                    : "icon-roundMinus"
                }
                className="wagen_plusminIcon"
              />
            </button>
          </span>
          <span>
            <button
              onClick={() => {
                if (option) {
                  itemAdd({
                    id: cartItem.id,
                    option: option,
                    subTotal: cartItem.subTotal,
                    location: "winkelwagen",
                    discount: cartItem.discount,
                    halfPortion: cartItem.halfPortion,
                  });
                } else {
                  itemAdd({
                    id: cartItem.id,
                    subTotal: cartItem.subTotal,
                    location: "winkelwagen",
                    discount: cartItem.discount,
                    halfPortion: cartItem.halfPortion,
                  });
                }
              }}
            >
              <IconFont
                type={
                  themeColor === colorPurple
                    ? "icon-roundPlus-copy"
                    : "icon-roundPlus"
                }
                className="wagen_plusminIcon"
              />
            </button>
          </span>
        </div>
      );
      return (
        <div key={i} className="wagen_cartItem">
          {iconsRow}

          <div className={styles.wagen_cartItemDescription}>
            <span className="wagen_itemQuantity">{cartItem.quantity}x</span>
            <span className="wagen_itemTitle">
              {cartItem.halfPortion ? "1/2 " : null}
              {foundItem.title}{" "}
              {option &&
                //两次用正则，保证任何情况下没有不必要的逗号
                option.toString().replace(regex, "").replace(regex, "")}
            </span>
            <span className="wagen_itemPrice">{priceineuro}</span>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="wagen_winkelwagenTitle">
        <h2>
          <span>{t("Bekijk bestelling")}</span>
          <span></span>
        </h2>
      </div>
      <div style={{ padding: "8px" }}>
        <div className={styles.winkelwagenContainer}>
          <div style={{ paddingBottom: "6px" }}>{dataList}</div>
          <CartSummary
            goCheckout={goCheckout}
            categories={categories}
            products={products}
            cart={props.cart}
            totalOptions={totalOptions}
            min_value={min_value}
            bezorgstatus={bezorgstatus}
            restaurantType={restaurantType}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}

WinkelwagenPage.propTypes = propTypes;

export default WinkelwagenPage;
