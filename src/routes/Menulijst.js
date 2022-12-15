import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import MenulijstPage from "../components/menulijst/MenulijstPage";

const propTypes = {};

function Menulijst(props) {
  return (
    <div>
      <MenulijstPage {...props} />
    </div>
  );
}

Menulijst.propTypes = propTypes;

const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(Menulijst);
