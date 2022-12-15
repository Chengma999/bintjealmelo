import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import gegevens from "Utilities/gegevens";
import styles from "../../css/layout.less";
import "animate.css";
import { Link } from "dva/router";
import { NewIconFont } from "Utilities/toolStore";
import LanguageSwitcher from "./LanguageSwitcher";
import menuIconSVG from "../../assets/menuicon.svg";
const { Header } = Layout;

const HeaderComponent = ({
  pathname,
  restaurantName,
  menulijsts,
  basicinfo,
  t,
}) => {
  const { isEnabled } = basicinfo.jobOffer;
  const onlinebestellenIsEnabled =
    basicinfo.onlinebestellen ||
    ([undefined, null].includes(basicinfo.onlinebestellen) ? true : false);
  const buffetIsEnabled = basicinfo.buffet.isEnabled;
  const restaurantIsEnabled = basicinfo.restaurant.isEnabled;
  const conceptIsEnabled = basicinfo.concept.isEnabled;
  const reservationIsEnabled = basicinfo.reservation.isEnabled;
  const [current, setCurrent] = useState("2");
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    if (pathname === "/") {
      setCurrent("Home");
      return;
    }
    if (pathname === "/online_bestellen") {
      setCurrent("Online bestellen");
      return;
    }
    if (pathname === "/afhaallijst") {
      setCurrent("Overons");
      return;
    }
    if (pathname === "/concept") {
      setCurrent("Concept");
      return;
    }
    if (pathname === "/restaurant") {
      setCurrent("Restaurant");
      return;
    }
    if (pathname === "/contact") {
      setCurrent("Contact");
      return;
    }
    if (pathname === "/werkenbijons") {
      setCurrent("Werken bij ons");
      return;
    }
  }, []);

  const bestellenbutton =
    gegevens.homePage && onlinebestellenIsEnabled ? (
      <span className={styles.bestellen}>
        {gegevens.external_orderlink ? (
          <a href={gegevens.external_orderlink}>
            <Button
              type="primary"
              danger
              icon={<NewIconFont type="icon-55" className={styles.iconMenu} />}
            >
              {t("Bestellen")}
            </Button>
          </a>
        ) : (
          <Link to="/online_bestellen">
            <Button
              type="primary"
              danger
              icon={<NewIconFont type="icon-55" className={styles.iconMenu} />}
            >
              {t("Bestellen")}
            </Button>
          </Link>
        )}
      </span>
    ) : (
      <span className={styles.bestellen}>
        <Link to={"/menulijst"}>
          <Button
            type="primary"
            danger
            icon={
              <NewIconFont
                type="icon-menu_ic_zdgjjl"
                className={styles.iconMenu}
              />
            }
          >
            {t("Menukaart")}
          </Button>
        </Link>
      </span>
    );
  const reserverenbutton = reservationIsEnabled ? (
    <span className={styles.reseveren}>
      <Link to="/reserveren">
        <Button
          type="primary"
          danger
          icon={
            <NewIconFont type="icon-calender" className={styles.iconMenu} />
          }
        >
          {t("Reserveren")}
        </Button>
      </Link>
    </span>
  ) : null;
  const menu = (mode) => {
    const jobOfferPage = isEnabled ? (
      <Menu.Item key="Werken bij ons">
        <Link to="/werkenbijons">
          <span className={styles.nav}>{t("Werken bij ons")}</span>
        </Link>
      </Menu.Item>
    ) : null;
    const restaurantPage = restaurantIsEnabled ? (
      <Menu.Item key="Restaurant">
        <Link to="/restaurant">
          <span className={styles.nav}>{t("Restaurant")}</span>
        </Link>
      </Menu.Item>
    ) : null;
    const buffetPage = buffetIsEnabled ? (
      <Menu.Item key="Buffet">
        <Link to="/buffet">
          <span className={styles.nav}>{t("Buffet")}</span>
        </Link>
      </Menu.Item>
    ) : null;
    const homePage = gegevens.homePage ? (
      <Menu.Item key="Home">
        <Link to="/">
          <span className={styles.nav}>{t("Home")}</span>
        </Link>
      </Menu.Item>
    ) : null;
    const onlineBestellenPage =
      !onlinebestellenIsEnabled ? null : gegevens.homePage ? (
        <Menu.Item key="Online bestellen">
          {gegevens.external_orderlink ? (
            <a href={gegevens.external_orderlink}>
              <span className={styles.nav}>{t("Online bestellen")}</span>
            </a>
          ) : (
            <Link to="/online_bestellen">
              <span className={styles.nav}>{t("Online bestellen")}</span>
            </Link>
          )}
        </Menu.Item>
      ) : (
        <Menu.Item key="Online bestellen">
          <Link to="/">
            <span className={styles.nav}>{t("Online bestellen")}</span>
          </Link>
        </Menu.Item>
      );
    const overonsPage = !gegevens.afhaallijstPage ? null : (
      <Menu.Item key="Overons">
        <Link
          to={
            gegevens.homePage
              ? { pathname: "/", hash: "#afhaallijst" }
              : "/afhaallijst"
          }
        >
          <span className={styles.nav}>{t("Over ons")}</span>
        </Link>
      </Menu.Item>
    );
    const menulijstPage =
      menulijsts.length === 0 ? null : (
        <Menu.Item key="Menulijst">
          <Link to="/menulijst">
            <span className={styles.nav}>{t("Menulijst")}</span>
          </Link>
        </Menu.Item>
      );
    const stampcardRulesPage = !basicinfo.stampcard.isEnabled ? null : (
      <Menu.Item key="Stampcard">
        <Link
          to={
            gegevens.homePage
              ? { pathname: "/", hash: "#stampcard" }
              : { pathname: "/stampcard" }
          }
        >
          <span className={styles.nav}>{t("stampcard")}</span>
        </Link>
      </Menu.Item>
    );
    const conceptPage = conceptIsEnabled ? (
      <Menu.Item key="Concept">
        <Link to="/concept">
          <span className={styles.nav}>{t("Concept")}</span>
        </Link>
      </Menu.Item>
    ) : null;

    const impressiePage =
      gegevens.homePage && gegevens.impressiePage ? (
        <Menu.Item key="Impressie">
          <Link to={{ pathname: "/", hash: "#impressie" }}>
            <span className={styles.nav}>{t("Impressie")}</span>
          </Link>
        </Menu.Item>
      ) : !gegevens.homePage && gegevens.impressiePage ? (
        <Menu.Item key="Impressie">
          <Link to={"/impressie"}>
            <span className={styles.nav}>{t("Impressie")}</span>
          </Link>
        </Menu.Item>
      ) : null;
    const vestigingenPage =
      gegevens.homePage && gegevens.vestigingenPage ? (
        <Menu.Item key="Vestigingen">
          <Link to={{ pathname: "/", hash: "#vestigingen" }}>
            <span className={styles.nav}>{t("Onze Vestigingen")}</span>
          </Link>
        </Menu.Item>
      ) : !gegevens.homePage && gegevens.vestigingenPage ? (
        <Menu.Item key="Vestigingen">
          <Link to={"/vestigingen"}>
            <span className={styles.nav}>{t("Onze Vestigingen")}</span>
          </Link>
        </Menu.Item>
      ) : null;
    const contactPage = (
      <Menu.Item key="Contact">
        <Link
          to={
            gegevens.homePage ? { pathname: "/", hash: "#contact" } : "/contact"
          }
        >
          <span className={styles.nav}>{t("contact")}</span>
        </Link>
      </Menu.Item>
    );

    return (
      <Menu
        mode={mode}
        selectedKeys={[current]}
        style={{ lineHeight: "64px" }}
        onClick={handleClick}
        className={styles.navBar}
      >
        {homePage}
        {onlineBestellenPage}
        {overonsPage}
        {restaurantPage}
        {conceptPage}
        {menulijstPage}
        {buffetPage}
        {impressiePage}
        {stampcardRulesPage}
        {vestigingenPage}
        {contactPage}
        {jobOfferPage}
      </Menu>
    );
  };
  return (
    <Layout
      className={
        (gegevens.homePage && pathname === "/") || pathname === "/restaurant"
          ? styles.homeHeader
          : styles.customHeader
      }
    >
      <Header className={styles.header}>
        <div className={styles.menuPc}>{menu("horizontal")}</div>
        <div id="barsMenuAndLanguageSwitcherWrapper">
          <div className={styles.barsMenu} type="primary" onClick={showDrawer}>
            <NewIconFont type="icon-menu" className={styles.iconMenu} />
          </div>
          <div id="languageSwitcherWrapper">
            <LanguageSwitcher />
          </div>
        </div>
        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          {menu("vertical")}
        </Drawer>
        <div>
          <h1 className={styles.title}>
            {restaurantName && restaurantName.toUpperCase()}
          </h1>
        </div>
        {pathname === "/" ? (
          <div className={styles.buttonSets}>
            {bestellenbutton}
            {reserverenbutton}
          </div>
        ) : pathname === "/restaurant" ? (
          <div className={styles.buttonSets}>{reserverenbutton}</div>
        ) : null}
      </Header>
    </Layout>
  );
};

export default HeaderComponent;
