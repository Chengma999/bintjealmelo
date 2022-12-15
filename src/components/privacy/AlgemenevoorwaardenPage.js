import React from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import LayoutWrapper from "../common/LayoutWrapper";
import { useTranslation } from "react-i18next";

function AlgemenevoorwaardenPage(props) {
  const { t } = useTranslation();
  const { basicinfo } = props;
  const { restaurantName, resAddress, resMail, resPostcode, resTelnr, kvknr } =
    basicinfo;
  return (
    <LayoutWrapper {...props}>
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}>{t("Algemene voorwaarden")}</span>
      </div>
      <div className={layoutStyles.fullSpecials}>
        <TheContent
          t={t}
          obj={{
            restaurantName,
            resAddress,
            resMail,
            resPostcode,
            resTelnr,
            kvknr,
          }}
        />
      </div>
    </LayoutWrapper>
  );
}

export default AlgemenevoorwaardenPage;

function TheContent({ obj, t }) {
  console.log(
    t("termsandconditions_page", {
      returnObjects: true,
      restaurantName: obj.restaurantName,
    })
  );
  return (
    <div>
      {t("termsandconditions_page", {
        returnObjects: true,
        restaurantName: obj.restaurantName,
      }).map((item, i) => {
        if (i === 1) {
          return (
            <div>
              <div style={{ fontSize: "18px", fontWeight: 600 }}>
                {item.title}
              </div>
              <div
                style={{ fontSize: "16px", lineHeight: 1.5, padding: "10px" }}
              >
                <div>{obj.restaurantName}</div>
                <div>{obj.resAddress}</div>
                <div>{obj.resMail}</div>
                <div>{obj.resPostcode}</div>
                <div>{obj.resTelnr}</div>
                <div>{obj.kvknr}</div>
              </div>
            </div>
          );
        }
        return (
          <div>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              {item.title}
            </div>
            <div>{item.content}</div>
            <br />
          </div>
        );
      })}
    </div>
  );
}
