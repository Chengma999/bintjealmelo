import React from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import { useTranslation } from "react-i18next";
import { changeFormat } from "Utilities/gegevens";
import { changenumToPercent } from "Utilities/toolStore";
function StampcardRules({ stampcard }) {
  const { pointValue, fullcardPoints, fullcardValue } = stampcard;
  const { t } = useTranslation();
  return (
    <div id="stampcard">
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}></span>
        {t("stampcard")}
      </div>
      <div className={layoutStyles.fullSpecials}>
        <div
          className={layoutStyles.textAlign}
          style={{ fontSize: "20px", fontWeight: 400 }}
        >
          <div>
            {t("stampcardrules", {
              pointValue: changeFormat(pointValue),
              fullcardPoints,
              fullcardValue:
                fullcardValue < 1
                  ? changenumToPercent(fullcardValue)
                  : changeFormat(fullcardValue),
            })}
          </div>
          <div style={{ paddingTop: "20px" }}>
            {t("stampcardrules_onlyfor_online")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StampcardRules;
