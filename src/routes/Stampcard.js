import React from "react";
import PropTypes from "prop-types";
import StampcardRulesPage from "../components/stampcardrules/StampcardRulesPage";
import { connect } from "dva";
const propTypes = {};

function Stampcard(props) {
  return (
    <div>
      <StampcardRulesPage {...props} />
    </div>
  );
}

Stampcard.propTypes = propTypes;
const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(Stampcard);
