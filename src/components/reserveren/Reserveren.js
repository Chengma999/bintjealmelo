import React from "react";
import ReserverenForm from "./ReserverenForm";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
function Reserveren({ reservation, openingstijden }) {
  return (
    <div>
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}>Onze</span>
        Reserveren
      </div>
      <div className={layoutStyles.fullSpecials}>
        <ReserverenForm
          reservation={reservation}
          openingstijden={openingstijden}
        />
      </div>
    </div>
  );
}

export default Reserveren;
