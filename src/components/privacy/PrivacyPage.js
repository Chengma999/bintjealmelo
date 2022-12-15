import React, { Component } from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import LayoutWrapper from "../common/LayoutWrapper";
import { useTranslation } from "react-i18next";

const PrivacyPage = (props) => {
  const { t } = useTranslation();
  const { basicinfo } = props;
  const { restaurantName, resAddress, resMail, resPostcode, resTelnr } =
    basicinfo;
  return (
    <LayoutWrapper {...props}>
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}>{t("privacy")} &</span>
        {t("cookies")}
      </div>
      <div className={layoutStyles.fullSpecials}>
        {t("privacyandcookies", {
          returnObjects: true,
          restaurantName,
        }).map((item) => {
          return (
            <div>
              <div style={{ fontSize: "16px", fontWeight: 700 }}>
                {item.title}
              </div>
              <div>
                {item.content}
                <br />
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: "16px", lineHeight: 1.5, padding: "10px" }}>
          <div>{restaurantName}</div>
          <div>{resAddress}</div>
          <div>{resMail}</div>
          <div>{resPostcode}</div>
          <div>{resTelnr}</div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default PrivacyPage;
