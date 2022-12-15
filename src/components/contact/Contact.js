import React from "react";
import { connect } from "dva";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import styles from "../../css/checkout.less";
import contactStyles from "../../css/contact.less";
import layoutStyles from "../../css/layout.less";
import { useTranslation } from "react-i18next";
import { isIos, CapitalizeFC } from "Utilities/toolStore";
const regex = / /gi;
const replace = "%20";

const convertTime = (time) =>
  moment(
    (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
    "hmm"
  ).format("HH:mm");
function Contact({ basicinfo }) {
  const { t } = useTranslation();
  const weekdaysarr = [
    { day: 1, weekday: t("monday") },
    { day: 2, weekday: t("tuesday") },
    { day: 3, weekday: t("wednesday") },
    { day: 4, weekday: t("thursday") },
    { day: 5, weekday: t("friday") },
    { day: 6, weekday: t("saturday") },
    { day: 0, weekday: t("sunday") },
  ];
  const {
    restaurantName,
    resAddress,
    resPostcode,
    resMail,
    resTelnr,
    kvknr,
    openingstijden,
    backgroundImages,
    _closeday,
  } = basicinfo;
  let background_image = {
    backgroundImage: `url(${backgroundImages.bottom})`,
  };
  if (isIos()) {
    console.log(isIos());
    background_image.backgroundAttachment = "scroll";
  }
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });
  const mapAddress = resAddress && resAddress.replace(regex, replace);
  const mapPostcode = resPostcode && resPostcode.replace(regex, replace);
  const src =
    "https://www.google.com/maps/embed/v1/search?q=" +
    mapAddress +
    "+" +
    mapPostcode +
    "&key=AIzaSyBa8_peSfROuQXvdJ1hZA8J1TOg44RtKpM";
  let openingsarr = weekdaysarr.map((e) => {
    const index = openingstijden
      .sort((a, b) => a.begin - b.begin)

      .findIndex((tijd) => tijd.day === e.day);
    const secondIndex = openingstijden
      .sort((a, b) => a.begin - b.begin)
      .map((item) => item.day)
      .indexOf(
        e.day,
        openingstijden
          .sort((a, b) => a.begin - b.begin)
          .map((item) => item.day)
          .indexOf(e.day) + 1
      );
    let openingstext;
    if (index > -1) {
      openingstext =
        convertTime(openingstijden[index].begin) +
        " - " +
        convertTime(openingstijden[index].end);
    }
    if (secondIndex > -1) {
      openingstext +=
        "  " +
        convertTime(openingstijden[secondIndex].begin) +
        " - " +
        convertTime(openingstijden[secondIndex].end);
    }
    if (index === -1 || openingstijden[index]?.isopen === false) {
      openingstext = t("closed");
    }
    return {
      weekday: e.weekday,
      openingstext,
    };
  });
  openingsarr = openingsarr.map((e, i) => {
    return (
      <div key={i}>
        <div className={contactStyles.day}>{e.weekday}</div>
        <div className={contactStyles.time}>{e.openingstext}</div>
      </div>
    );
  });
  const extrasluitingsdagen = _closeday.map((item) => (
    <div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 700,
          textAlign: "center",
          fontStyle: "oblique",
        }}
      >
        {" "}
        {item.reason}
      </div>
      <div style={{ paddingBottom: "15px" }}>
        {moment(item.begin).format("DD-MM-YYYY")} t/m{" "}
        {moment(item.end).format("DD-MM-YYYY")}
      </div>
    </div>
  ));

  return (
    <div style={{ textAlign: "center" }}>
      <div id="contact" className={styles.fullTitle}>
        <span className={styles.bestelling}>{t("contact")} &</span>
        {t("openingstijden")}
      </div>
      <div className={styles.subBackground} style={background_image}></div>
      <div className={layoutStyles.fullSpecials}>
        <div className={contactStyles.contact}>
          <p>
            {restaurantName}
            <br />
            {resAddress}
            <br />
            {resPostcode}
            <br />
            {t("tel")}: {resTelnr}
            <br />
            Email: {resMail} <br />
            {t("company_number")}: {kvknr} <br />
          </p>
        </div>
        <div className={contactStyles.openingstijden}>
          <p> {t("openingstijden").toUpperCase()}</p>
          {openingsarr}
        </div>
        {_closeday.length === 0 ? null : (
          <div className={contactStyles.openingstijden}>
            <p> {t("extra sluitingsdag(en)").toUpperCase()}</p>
            {extrasluitingsdagen}
          </div>
        )}
        <div
          style={{ clear: "both", paddingTop: "30px", marginBottom: "30px" }}
        >
          <iframe
            title="locatie"
            key={resPostcode}
            width={!isSmallscreen ? "80%" : "100%"}
            height={!isSmallscreen ? "450" : "400"}
            frameborder="0"
            style={{ border: "0" }}
            src={src}
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ basicinfo }) => {
  return { basicinfo };
};
export default connect(mapStateToProps)(Contact);
