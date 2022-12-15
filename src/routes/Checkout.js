import React from "react";
import PropTypes from "prop-types";
import CheckoutPage from "../components/checkout/CheckoutPage";
import { connect } from "dva";
import {
  chooseBezorgGebied,
  fetchBezorggebied,
  fetchBasketOrder,
  enterDiscountcode,
  updateCheckoutPrice,
  fetchBasicInfo,
  calTotalPrice,
  selectTip,
} from "../actions";
const propTypes = {
  basket: PropTypes.object.isRequired,
};

function Checkout(props) {
  return (
    <div>
      <CheckoutPage {...props} />
    </div>
  );
}

Checkout.propTypes = propTypes;

const mapStateToProps = ({ basket, cart, factors, basicinfo, loading }) => {
  return {
    basket,
    cart,
    loading,
    factors,
    basicinfo,
  };
};

export default connect(mapStateToProps, {
  fetchBezorggebied,
  chooseBezorgGebied,
  fetchBasketOrder,
  enterDiscountcode,
  updateCheckoutPrice,
  fetchBasicInfo,
  calTotalPrice,
  selectTip,
})(Checkout);
