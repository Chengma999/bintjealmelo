import React from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import LayoutWrapper from "../common/LayoutWrapper";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

function RedirectPage(props) {
  const { t } = useTranslation();
  const { redirect, loading } = props;
  return (
    <LayoutWrapper {...props}>
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}>Order</span>
        Bevestiging
      </div>
      <div className={layoutStyles.fullSpecials}>
        {loading.effects["redirect/fetch"] === undefined ||
        loading.effects["redirect/fetch"] === true ? (
          <Spin />
        ) : redirect.error ? (
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontWeight: "500",
                fontFamily: "sans-serif",
                color: "#555555",
              }}
            >
              {t("order_error")}
            </h1>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                fontFamily: "sans-serif",
                color: "#555555",
              }}
            >
              {t("order_confirm", {
                cus_orderId: redirect.order.cus_orderId,
                email: redirect.order.email,
              })}
            </h1>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}

export default RedirectPage;
