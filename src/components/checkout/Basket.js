import React from "react";
import styles from "../../css/winkelwagen.less";
import DiscountAndTotalPrice from "./DiscountAndTotalPrice";
import { changeFormat } from "Utilities/gegevens";
import { remain2Decimals } from "Utilities/toolStore";
import { CapitalizeFC } from "Utilities/toolStore";
const propTypes = {};

function Basket(props) {
  const {
    basket,
    loading,
    levering,
    fee,
    radioValue,
    setRadioValue,
    transactiekosten,
    discountTakeAway,
    min_value,
    t,
  } = props;
  const { isEnabled, amount } = discountTakeAway;
  const { discountAmount, korting, checkoutPrice, tip, subtotalPrice } = basket;
  const originTotalPrice = basket.subtotalPrice;
  const basketProducts =
    loading.effects["basket/fetch"] === undefined ||
    loading.effects["basket/fetch"] === true
      ? []
      : basket.basket;
  // let fee = bezorgkosten.fee||0
  let totalPrice = originTotalPrice;
  const kosten = fee !== 0 ? changeFormat(fee) : "Gratis";

  const datalist = basketProducts.map((item, i) => {
    const priceineuro = changeFormat(item.subTotal);
    return (
      <div key={i} className="wagen_cartItem">
        <div className={styles.wagen_cartItemDescription}>
          <span className="wagen_itemQuantity">{item.quantity}x</span>
          <span className="wagen_itemTitle">
            {item.title} {item.option && item.option.title}
          </span>
          <span className="wagen_itemPrice">{priceineuro}</span>
        </div>
      </div>
    );
  });
  levering === 1 && radioValue !== "cash"
    ? (totalPrice += fee + transactiekosten)
    : levering === 1 && radioValue === "cash"
    ? (totalPrice += fee)
    : levering === 2 && radioValue === "cash"
    ? (totalPrice += 0)
    : (totalPrice += transactiekosten);
  if (levering === 2 && isEnabled && amount > 0) {
    totalPrice = totalPrice - remain2Decimals(subtotalPrice * amount);
  }
  if (korting > 0) {
    totalPrice -= remain2Decimals(korting);
  }
  totalPrice = changeFormat(totalPrice);
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
          <div style={{ paddingBottom: "6px" }}>
            {datalist}
            <div style={{ clear: "both" }}></div>
          </div>

          <div>
            {levering !== 1 ? null : (
              <div className="basket_basketLevering">
                <span className="basket_basketLeveringName">
                  {t("Bezorgkosten")}:
                </span>
                <span className="basket_basketLeveringPrice">{kosten}</span>
              </div>
            )}
            {tip > 0 ? (
              <div className="basket_basketLevering">
                <span className="basket_basketLeveringName">
                  {CapitalizeFC(t("tip") + ":")}
                </span>
                <span className="basket_basketLeveringPrice">
                  {changeFormat(tip)}
                </span>
              </div>
            ) : null}
            {radioValue === "cash" ? null : (
              <div className="basket_basketTransactiekosten">
                <span className="basket_basketLeveringName">
                  {t("Transactiekosten")}:
                </span>
                <span className="basket_basketLeveringPrice">
                  {changeFormat(transactiekosten)}
                </span>
              </div>
            )}
            {levering === 1 && originTotalPrice < min_value ? (
              <div className="basket_basketLevering">
                <span className="basket_basketWarningName">
                  Benodigd bedrag om de minimum bestelwaarde te bereiken voor
                  bezorgen
                </span>
                <span className="basket_basketWarningPrice">
                  {changeFormat(min_value - originTotalPrice)}
                </span>
              </div>
            ) : null}
          </div>

          {originTotalPrice >= min_value || levering === 2 ? (
            <DiscountAndTotalPrice
              discountAmount={discountAmount}
              changeFormat={changeFormat}
              levering={levering}
              isEnabled={isEnabled}
              amount={amount}
              originTotalPrice={originTotalPrice}
              subtotalPrice={subtotalPrice}
              korting={korting}
              totalPrice={totalPrice}
              t={t}
              checkoutPrice={checkoutPrice}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = propTypes;

export default Basket;
