import React from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
function Restaurant({ basicinfo }) {
  const { text, image } = basicinfo.restaurant;
  return (
    <div>
      <div className={styles.fullTitle}>
        <span id="afhaallijst" className={styles.bestelling}></span>
        Ons Restaurant
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
          <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
            <img src={image} alt="restaurantimage" width={"100%"} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Restaurant;
