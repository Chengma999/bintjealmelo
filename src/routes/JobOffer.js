import React from "react";
import { connect } from "dva";
import JobOfferPage from "../components/joboffer/JobOfferPage";
function JobOffer(props) {
  return (
    <div>
      <JobOfferPage {...props} />
    </div>
  );
}

const mapStateToProps = ({ basicinfo }) => ({ basicinfo });
export default connect(mapStateToProps)(JobOffer);
