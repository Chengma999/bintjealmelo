import React from "react";

function Discount({
  name,
  discountAmount,
  changeFormat,
  originTotalPrice,
  subtotalPrice,
  amount,
  korting,
  t,
}) {
  return (
    <div>
      <div
        className="basket_discount"
        style={{ color: name === "kortingscode" ? "#28a745" : "red" }}
      >
        <span className="basket_basketLeveringName">
          {name === "kortingscode" ? " Actie:" : t("Uw korting") + ":"}
        </span>
        <span
          style={{ whiteSpace: "nowrap" }}
          className="basket_basketLeveringPrice"
        >
          -{" "}
          {changeFormat(
            name === "discount"
              ? discountAmount
              : name === "discountTakeAway"
              ? subtotalPrice * amount
              : korting
          )}
        </span>
      </div>
    </div>
  );
}

export default Discount;
