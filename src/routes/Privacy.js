import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import PrivacyPage from "../components/privacy/PrivacyPage";

const propTypes = {};

function Privacy(props) {
  return (
    <div>
      <PrivacyPage {...props} />
    </div>
  );
}

Privacy.propTypes = propTypes;
const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(Privacy);
