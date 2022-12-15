import React from "react";
import { Layout, Button } from "antd";
import { Link } from "dva/router";
import gegevens from "Utilities/gegevens";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import styles from "../../css/footer.less";
import { colorPurple } from "Utilities/toolStore";
import { useTranslation } from "react-i18next";
const { Footer } = Layout;
const propTypes = {};

function FooterComponent({ basicinfo }) {
  const { t } = useTranslation();
  const { restaurantName, resAddress, resPostcode, facebookUrl, themeColor } =
    basicinfo;
  return (
    <Layout
      className={
        themeColor === colorPurple ? styles.backgroundPurple : styles.background
      }
    >
      <Footer>
        <div className={styles.container}>
          <div className={styles.contact}>
            <h3>Contact</h3>
            <p>
              {restaurantName}
              <br />
              {resAddress}
              <br />
              {resPostcode}
            </p>
          </div>

          <Info t={t} />

          {!gegevens.homePage ? null : (
            <div className={styles.socialMedia}>
              <h3>{t("Social")}</h3>
              <p>{t("Like ons op social media")}</p>
              <div className={styles.buttonWidget}>
                <Button
                  type="primary"
                  block
                  className={styles.facebook}
                  icon={<FacebookOutlined />}
                  size="large"
                  href={facebookUrl}
                >
                  Facebook
                </Button>
                {
                  // <Button type="primary" block className={styles.instagram} icon={<InstagramOutlined />} size="large" href='https://www.instagram.com/intenzhellendoorn/'>
                  // Instagram
                  // </Button>
                }
              </div>
            </div>
          )}
        </div>
      </Footer>
    </Layout>
  );
}

FooterComponent.propTypes = propTypes;

export default FooterComponent;

const Info = ({ t }) => {
  return (
    <div className={styles.links}>
      <h3>Info</h3>
      <div>
        <Link to="/algemenevoorwaarden">{t("Algemene voorwaarden")}</Link>
      </div>
      <div>
        <Link to="/privacy">{t("Privacy statement & cookies")}</Link>
      </div>
    </div>
  );
};
