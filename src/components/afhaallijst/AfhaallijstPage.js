import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Afhaallijst from "./Afhaallijst";

function AfhaallijstPage(props) {
  return (
    <LayoutWrapper {...props}>
      <Afhaallijst basicinfo={props.basicinfo} />
    </LayoutWrapper>
  );
}

export default AfhaallijstPage;
