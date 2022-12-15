import React from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
function JobOffer({ basicinfo }) {
  const { text } = basicinfo.jobOffer;
  return (
    <div>
      <div className={styles.fullTitle}>
        <span id="afhaallijst" className={styles.bestelling}></span>
        Werken bij Ons
      </div>
      {!text ? null : (
        <div
          className={layoutStyles.fullSpecials}
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "myFamily",
            fontSize: "20px",
            color: "black",
            lineHeight: "2",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default JobOffer;
