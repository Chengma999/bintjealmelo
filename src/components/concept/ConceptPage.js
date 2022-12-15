import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Concept from "./Concept";
import NotFound from "../common/NotFound";
function ConceptPage(props) {
  const { isEnabled } = props.basicinfo.concept;
  return (
    <LayoutWrapper {...props}>
      {isEnabled ? <Concept basicinfo={props.basicinfo} /> : <NotFound />}
    </LayoutWrapper>
  );
}

export default ConceptPage;
