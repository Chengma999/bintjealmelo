import React from "react";
import { Layout } from "antd";
import { connect } from "dva";
import styles from "../../css/checkout.less";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import { useTranslation } from "react-i18next";

const LayoutWrapper = ({ basicinfo, location, children }) => {
  const { t } = useTranslation();
  const { pathname } = location;
  const { backgroundImages, menulijsts } = basicinfo;
  return (
    <div className={styles.layoutBackground}>
      <Layout className={styles.customHeader}>
        <HeaderComponent
          pathname={pathname}
          restaurantName={basicinfo.restaurantName}
          basicinfo={basicinfo}
          menulijsts={menulijsts}
          t={t}
        />
        <Layout
          style={{ background: "rgb(249, 249, 250)", paddingBottom: "30px" }}
        >
          <div className="full">{children}</div>
        </Layout>
        <div
          className={styles.homeBackground}
          style={{ backgroundImage: `url(${backgroundImages.top})` }}
        />
        <FooterComponent basicinfo={basicinfo} />
      </Layout>
    </div>
  );
};
const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});
export default connect(mapStateToProps)(LayoutWrapper);
