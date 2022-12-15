import React from "react";
import { Divider } from "antd";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
function Concept({ basicinfo }) {
  const {
    introduction,
    menu1,
    price1,
    menu2,
    price2,
    remark,
  } = basicinfo.concept;
  return (
    <div>
      <div className={styles.fullTitle}>
        <span id="afhaallijst" className={styles.bestelling}></span>
        Ons Concept
      </div>
      {!introduction ? null : (
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
          {introduction}
          <div style={{ paddingTop: "20px", paddingBottom: "40px" }}>
            {!menu1 ? null : (
              <Divider orientation="center">
                <div className={layoutStyles.menuTitle}>{menu1}</div>
              </Divider>
            )}
            {!price1 ? null : (
              <div
                className={layoutStyles.prijzen}
                style={{ color: "rgba(0, 0, 0, 0.65)" }}
              >
                {price1}
              </div>
            )}
            {!menu2 ? null : (
              <Divider orientation="center">
                <div className={layoutStyles.menuTitle}>{menu2}</div>
              </Divider>
            )}
            {!price2 ? null : (
              <div
                className={layoutStyles.prijzen}
                style={{ color: "rgba(0, 0, 0, 0.65)" }}
              >
                {price2}
              </div>
            )}
            {!remark ? null : (
              <div className={layoutStyles.remark}>{remark}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Concept;
