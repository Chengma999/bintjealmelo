import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Restaurant from "./Restaurant";
import NotFound from "../common/NotFound";
function RestaurantPage(props) {
  const { isEnabled } = props.basicinfo.restaurant;
  return (
    <LayoutWrapper {...props}>
      {isEnabled ? <Restaurant basicinfo={props.basicinfo} /> : <NotFound />}
    </LayoutWrapper>
  );
}

export default RestaurantPage;
