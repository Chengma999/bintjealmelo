import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import Contact from "./Contact";

function ContactPage(props) {
  return (
    <LayoutWrapper {...props}>
      <Contact basicinfo={props.basicinfo} />
    </LayoutWrapper>
  );
}

export default ContactPage;
