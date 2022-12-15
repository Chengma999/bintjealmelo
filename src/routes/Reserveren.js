import React from "react";
import { connect } from "dva";
import ReserverenPage from "../components/reserveren/ReserverenPage";

const propTypes = {};

function Reserveren(props) {
  return (
    <div>
      <ReserverenPage {...props} />
    </div>
  );
}

Reserveren.propTypes = propTypes;

const mapStateToProps = ({ basicinfo }) => ({ basicinfo });
export default connect(mapStateToProps)(Reserveren);
