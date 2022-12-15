import React from "react";
import StampcardRules from "./StampcardRules";
import LayoutWrapper from "../common/LayoutWrapper";
import NotFound from "../common/NotFound";
export default function StampcardRulesPage(props) {
  const { location, basicinfo } = props;
  return (
    <LayoutWrapper {...props}>
      {location.pathname === "/stampcard" && basicinfo.stampcard.isEnabled ? (
        <StampcardRules stampcard={basicinfo.stampcard} />
      ) : (
        <NotFound />
      )}
    </LayoutWrapper>
  );
}
