import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import HomeComponent from "../components/common/HomeComponent";

const propTypes = {};

function HomePage(props) {
  return (
    <div>
      <HomeComponent {...props} />
    </div>
  );
}

HomePage.propTypes = propTypes;

const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(HomePage);
