import React from "react";
import PropTypes from "prop-types";
import styles from "../../css/winkelwagen.less";
import { Button } from "antd";
import axios from "axios";
import gegevens, { changeFormat } from "Utilities/gegevens";
import { v4 as uuidv4 } from "uuid";
const { restaurant_id } = gegevens;
const propTypes = {
  goCheckout: PropTypes.func.isRequired,
};
const regex = /\B\s*,+,*|,\s*$/gi;
const regexChiCha = /\s*,+\s*,*|,\s*$/gi;
const regexBeginningAndEnding = /^,|,$/gi;
function CartSummary(props) {
  const {
    goCheckout,
    products,
    categories,
    min_value,
    bezorgstatus,
    restaurantType,
    t,
  } = props;
  const { cart, discountAmount, subtotalPrice, totalPrice } = props.cart;
  const cartProducts = cart.map((cartItem) => {
    const { option, option_chi_cha } = cartItem;
    let foundItem = products.find(function (element) {
      return element.id === cartItem.id;
    });
    //
    const itemcategories = foundItem.categorie;
    let itemsort_number = itemcategories.map((ele) => {
      const index = categories.categories.findIndex(
        (cat) => cat.cat_code === ele
      );
      return categories.categories[index].sort_number;
    });

    itemsort_number = Math.max.apply(null, itemsort_number);
    const foundOptionName = option
      ? //两次用正则，保证任何情况下没有不必要的逗号
        option.toString().replace(regex, "").replace(regex, "")
      : "";
    const foundOptionChiCha = option_chi_cha
      ? option_chi_cha
          .toString()
          .replace(regexChiCha, ",")
          .replace(regexChiCha, ",")
          .replace(regexBeginningAndEnding, "")
      : "";
    return {
      id: cartItem.id,
      title: (cartItem.halfPortion ? "1/2 " : "") + foundItem.title,
      chi_cha: foundItem.chi_cha
        ? (cartItem.halfPortion ? "1/2 " : "") + foundItem.chi_cha
        : "",
      price: foundItem.price,
      option:
        option === undefined
          ? ""
          : restaurantType === "chinees"
          ? {
              title: foundOptionName,
              chi_cha: foundOptionChiCha,
              price: cartItem.subTotal - foundItem.price,
            }
          : {
              title: foundOptionName,
              price: cartItem.subTotal - foundItem.price,
            },
      quantity: cartItem.quantity,
      subTotal: cartItem.subTotal,
      printgroup: cartItem.printgroup,
      sort_number: itemsort_number,
    };
  });

  const handleGoCheckout = async () => {
    let data = {
      orderId: uuidv4(),
      cartProducts,
      discountAmount,
      subtotalPrice,
      totalPrice,
      restaurant_id,
    };
    let res = await axios.get(
      `/api/checkorder/isExist/${restaurant_id}?orderId=${data.orderId}`
    );
    while (res.data.found) {
      data.orderId = uuidv4();
      res = await axios.get(
        `/api/checkorder/isExist/${restaurant_id}?orderId=${data.orderId}`
      );
    }
    goCheckout(data);
  };

  const subData =
    totalPrice === 0 ? null : (
      <div style={{ width: "100%" }}>
        {discountAmount === 0 ? null : (
          <div>
            <div className="cartSumBorder"></div>
            <div className="cartSumRow">
              <span className="cartSumName">{t("Uw korting")}: </span>
              <span className={styles.cartSumPrice}>
                - {changeFormat(discountAmount)}
              </span>
            </div>
          </div>
        )}
        <div className="cartSumBorder"></div>
        <div className="cartSumSubtotal">
          <span className="cartSumName">{t("Subtotaal")}: </span>
          <span className={styles.cartSumPrice}>
            {changeFormat(totalPrice)}
          </span>
        </div>
      </div>
    );
  const subButton = (
    <Button
      disabled={totalPrice === 0}
      type="primary"
      block
      onClick={handleGoCheckout}
    >
      {totalPrice === 0 || min_value - totalPrice <= 0 || !bezorgstatus
        ? t("Bestellen")
        : t("Verder gaan")}
    </Button>
  );
  const min_value_warning =
    totalPrice === 0 || min_value - totalPrice <= 0 || !bezorgstatus ? null : (
      <div>
        <div className="basket_basketLevering">
          <span className="basket_basketWarningName">
            {t(
              "Benodigd bedrag om de minimum bestelwaarde te bereiken voor bezorgen"
            )}
          </span>
          <span className="basket_basketWarningPrice">
            {changeFormat(min_value - totalPrice)}
          </span>
        </div>
        <br />
        <div className={styles.uppercase}>
          {t("Voor afhalen kunt u gewoon door gaan.")}
        </div>
      </div>
    );
  return (
    <div>
      <div className={totalPrice !== 0 ? "cartSum" : null}>{subData}</div>
      {min_value_warning}
      <div className={styles.subButton}>{subButton}</div>
    </div>
  );
}

CartSummary.propTypes = propTypes;

export default CartSummary;
