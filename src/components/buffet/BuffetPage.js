import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Buffet from "./Buffet";
import NotFound from "../common/NotFound";
function BuffetPage(props) {
  const { isEnabled } = props.basicinfo.buffet;
  const cateringIsEnabled = props.basicinfo.catering.isEnabled;
  const { pathname } = props.location;
  return (
    <LayoutWrapper {...props}>
      {(pathname === "/buffet" && isEnabled) ||
      (pathname === "/catering" && cateringIsEnabled) ? (
        <Buffet name={pathname} basicinfo={props.basicinfo} />
      ) : (
        <NotFound />
      )}
    </LayoutWrapper>
  );
}

export default BuffetPage;
