import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import AlgemenevoorwaardenPage from "../components/privacy/AlgemenevoorwaardenPage";

const propTypes = {};

function Algemenevoorwaarden(props) {
  return (
    <div>
      <AlgemenevoorwaardenPage {...props} />
    </div>
  );
}

Algemenevoorwaarden.propTypes = propTypes;
const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});

export default connect(mapStateToProps)(Algemenevoorwaarden);
