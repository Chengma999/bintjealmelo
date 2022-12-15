import React from "react";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import { isIos } from "Utilities/toolStore";
function Afhaallijst({ basicinfo }) {
  const { restaurantName, text_1, text_2, backgroundImages } = basicinfo;
  let background_image = {
    backgroundImage: `url(${backgroundImages.middle})`,
  };
  if (isIos()) {
    console.log(isIos())
    background_image.backgroundAttachment = "scroll";
  }
  return (
    <div>
      <div className={styles.fullTitle}>
        <span id="afhaallijst" className={styles.bestelling}></span>
        {restaurantName}
      </div>
      <div className={layoutStyles.fullSpecials}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "myFamily",
            fontSize: "20px",
            color: "black",
            lineHeight: "2",
          }}
          className={layoutStyles.textAlign}
        >
          {text_1}
        </div>
      </div>
      <div className={styles.subBackground1} style={background_image}></div>
      <div className={layoutStyles.fullSpecials}>
        <div
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "myFamily",
            fontSize: "20px",
            color: "black",
            lineHeight: "2",
          }}
          className={layoutStyles.textAlign}
        >
          {text_2}
        </div>
      </div>
      {
        //   <div className={layoutStyles.menukaartParent}>
        //   <div className={layoutStyles.menukaartRow}>
        //     <div className={layoutStyles.menukaart}>
        //       <a href={baconboss} target="_blank">
        //         <img src={baconbossscreenshot} alt="bacon boss" />
        //       </a>
        //       <p>Bacon Boss</p>
        //     </div>
        //     <div className={layoutStyles.menukaart}>
        //       <a href={menukaart} target="_blank">
        //         <img src={menukaar1screenshot} alt="Menukaart 2020" />
        //       </a>
        //       <p>Menukaart 2020</p>
        //     </div>
        //     <div className={layoutStyles.menukaart}>
        //       <a href={menukaart} target="_blank">
        //         <img src={menukaar2screenshot} alt="Menukaart 2020" />
        //       </a>
        //       <p>Menukaart 2020</p>
        //     </div>
        //   </div>
        // </div>
      }
    </div>
  );
}

export default Afhaallijst;
