import React from "react";
import styles from "../../css/checkout.less";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import layoutStyles from "../../css/layout.less";
import carouselStyles from "../restaurant/carousel.less";
import Slider from "react-slick";
import Video from "./video/Video";
import gegevens from "Utilities/gegevens";
import { useTranslation } from "react-i18next";

const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
};

function Impressie({ carouselImages }) {
  const { t } = useTranslation();
  carouselImages.sort((a, b) => a.sort_number - b.sort_number);
  return (
    <div id="impressie">
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}></span>
        {t("Impressie")}
      </div>
      <div className={layoutStyles.fullSpecials}>
        <div className={layoutStyles.textAlign}></div>
        <div className={carouselStyles.carousel}>
          <Slider {...settings}>
            {carouselImages.map((image) => {
              return (
                <div>
                  <img src={image.src} alt={"afbeelding " + image.name} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      {!gegevens.video ? null : (
        <div className={styles.iframe}>
          <Video />
        </div>
      )}
    </div>
  );
}

export default Impressie;
