import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import NotFound from "../common/NotFound";
import Reserveren from "./Reserveren";
const ReserverenPage = (props) => {
  const { isEnabled } = props.basicinfo.reservation;
  return (
    <LayoutWrapper {...props}>
      {isEnabled ? (
        <Reserveren
          reservation={props.basicinfo.reservation}
          openingstijden={props.basicinfo.openingstijden}
        />
      ) : (
        <NotFound />
      )}
    </LayoutWrapper>
  );
};

export default ReserverenPage;
