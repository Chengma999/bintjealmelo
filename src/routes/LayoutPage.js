import React from "react";
import { connect } from "dva";
import { Layout } from "antd";
import PropTypes from "prop-types";
import LayoutComponent from "../components/common/LayoutComponent";
import { itemAdd, itemDelete, goCheckout, getOptions } from "../actions/index";

function LayoutPage(props) {
  return <LayoutComponent {...props} />;
}

Layout.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = ({
  products,
  categories,
  loading,
  cart,
  checkbox,
  factors,
  bezorgstatus,
  admincrud,
  basicinfo,
}) => {
  return {
    products,
    categories,
    loading,
    cart,
    checkbox,
    factors,
    bezorgstatus,
    admincrud,
    basicinfo,
  };
};

export default connect(mapStateToProps, {
  itemAdd,
  itemDelete,
  goCheckout,
  getOptions,
})(LayoutPage);
