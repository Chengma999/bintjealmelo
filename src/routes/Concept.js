import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import ConceptPage from "../components/concept/ConceptPage";

const propTypes = {};

function Concept(props) {
  return (
    <div>
      <ConceptPage {...props} />
    </div>
  );
}

Concept.propTypes = propTypes;

const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});
export default connect(mapStateToProps)(Concept);
