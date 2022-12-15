import React from "react";
import RestaurantPage from "../components/restaurant/RestaurantPage";
import { connect } from "dva";
const propTypes = {};

function Restaurant(props) {
  return (
    <div>
      <RestaurantPage {...props} />
    </div>
  );
}

Restaurant.propTypes = propTypes;
const mapStateToProps = ({ basicinfo }) => ({ basicinfo });
export default connect(mapStateToProps)(Restaurant);
