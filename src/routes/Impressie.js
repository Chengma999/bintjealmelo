import React from "react";
import PropTypes from "prop-types";
import ImpressiePage from "../components/impressie/ImpressiePage";
import { connect } from "dva";
const propTypes = {};

function Impressie(props) {
  return (
    <div>
      <ImpressiePage {...props} />
    </div>
  );
}

Impressie.propTypes = propTypes;
const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(Impressie);
