import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import LoginPage from "../components/login/LoginPage";
import { logIn } from "../actions/index";
const propTypes = {
  logIn: PropTypes.func.isRequired,
};

function Login(props) {
  return (
    <div>
      <LoginPage {...props} />
    </div>
  );
}

Login.propTypes = propTypes;

const mapStateToProps = ({ products, categories, loading, cart, login }) => {
  return {
    products,
    categories,
    loading,
    cart,
    login,
  };
};

export default connect(mapStateToProps, { logIn })(Login);
