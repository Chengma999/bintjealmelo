import React, { Component } from "react";
import { Link } from "dva/router";
import PropTypes from "prop-types";
import { Layout, Button, BackTop, Divider } from "antd";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import LayoutWrapper from "../common/LayoutWrapper";
import { Typography } from "antd";
import gegevens from "Utilities/gegevens";
import Afhaallijst from "../afhaallijst/Afhaallijst";
import Impressie from "../impressie/Impressie";
import Vestigingen from "../vestigingen/Vestigingen";
import Contact from "../contact/Contact";
import { IconFont } from "Utilities/toolStore";
import StampcardRules from "../stampcardrules/StampcardRules";
const { Paragraph } = Typography;

const HomeComponent = (props) => {
  return (
    <LayoutWrapper {...props}>
      {!gegevens.afhaallijstPage ? null : (
        <Afhaallijst basicinfo={props.basicinfo} />
      )}
      {!gegevens.impressiePage ? null : (
        <Impressie carouselImages={props.basicinfo.carouselImages} />
      )}
      {!props.basicinfo.stampcard.isEnabled ? null : (
        <StampcardRules stampcard={props.basicinfo.stampcard} />
      )}
      {!gegevens.vestigingenPage ? null : <Vestigingen />}
      <Contact />
      <BackTop>
        <div className={layoutStyles.iconBackTop}>
          <IconFont type="icon-back-top" className={layoutStyles.iconMenu} />
        </div>
      </BackTop>
    </LayoutWrapper>
  );
};

export default HomeComponent;
