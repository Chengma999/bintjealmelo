import React from "react";
import LayoutWrapper from "../common/LayoutWrapper";
import JobOffer from "./JobOffer";
import NotFound from "../common/NotFound";
function JobOfferPage(props) {
  const { isEnabled } = props.basicinfo.jobOffer;
  return (
    <LayoutWrapper {...props}>
      {isEnabled ? <JobOffer basicinfo={props.basicinfo} /> : <NotFound />}
    </LayoutWrapper>
  );
}

export default JobOfferPage;
