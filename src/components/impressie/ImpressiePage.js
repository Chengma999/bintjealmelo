import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Impressie from "./Impressie";

function ImpressiePage(props) {
  const { carouselImages } = props.basicinfo;
  return (
    <LayoutWrapper {...props}>
      <Impressie carouselImages={carouselImages} />
    </LayoutWrapper>
  );
}

export default ImpressiePage;
