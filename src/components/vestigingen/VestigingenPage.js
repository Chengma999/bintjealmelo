import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Vestigingen from "./Vestigingen";

function VestigingenPage(props) {
  return (
    <LayoutWrapper {...props}>
      <Vestigingen />
    </LayoutWrapper>
  );
}

export default VestigingenPage;
