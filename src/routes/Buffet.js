import React from "react";
import { connect } from "dva";
import BuffetPage from "../components/buffet/BuffetPage";
function Buffet(props) {
  return (
    <div>
      <BuffetPage {...props} />
    </div>
  );
}

const mapStateToProps = ({ basicinfo }) => ({ basicinfo });
export default connect(mapStateToProps)(Buffet);
