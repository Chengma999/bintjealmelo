import React from "react";
import Discount from "./Discount";
function DiscountAndTotalPrice({
  discountAmount,
  changeFormat,
  levering,
  isEnabled,
  amount,
  originTotalPrice,
  subtotalPrice,
  korting,
  totalPrice,
  t,
  checkoutPrice,
}) {
  return (
    <div>
      <div className="basket_border"></div>
      {discountAmount === 0 ? null : (
        <Discount
          name="discount"
          changeFormat={changeFormat}
          discountAmount={discountAmount}
          t={t}
        />
      )}
      {
        //   levering === 1 || !isEnabled || !amount || amount === 0 ? null : (
        //   <Discount
        //     name="discountTakeAway"
        //     changeFormat={changeFormat}
        //     originTotalPrice={originTotalPrice}
        //     amount={amount}
        //     t={t}
        //     subtotalPrice={subtotalPrice}
        //   />
        // )
      }
      {[0, undefined].includes(korting) ? null : (
        <Discount
          name="kortingscode"
          changeFormat={changeFormat}
          korting={korting}
          t={t}
        />
      )}
      {korting === 0 &&
      discountAmount === 0 &&
      (levering === 1 || !isEnabled || amount === 0) ? null : (
        <div className="basket_border" style={{ marginTop: "10px" }}></div>
      )}
      <div className="basket_total">
        <span>{t("Totaal")}</span>
        <span className="basket_totalPrice">{changeFormat(checkoutPrice)}</span>
      </div>
    </div>
  );
}

export default DiscountAndTotalPrice;
