import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";
import AfhaalijstPage from "../components/afhaallijst/AfhaallijstPage";

const propTypes = {};

function Afhaalijst(props) {
  return (
    <div>
      <AfhaalijstPage {...props} />
    </div>
  );
}

Afhaalijst.propTypes = propTypes;

const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(Afhaalijst);
