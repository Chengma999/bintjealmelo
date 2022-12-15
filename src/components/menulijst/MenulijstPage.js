import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Menulijst from "./Menulijst";

function MenulijstPage(props) {
  return (
    <LayoutWrapper {...props}>
      <Menulijst basicinfo={props.basicinfo} />
    </LayoutWrapper>
  );
}

export default MenulijstPage;
