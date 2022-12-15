import React from "react";
import { Button } from "antd";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import { useMediaQuery } from "react-responsive";
import { DownloadOutlined } from "@ant-design/icons";
function Buffet({ basicinfo, name }) {
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });
  const { text } = name === "/buffet" ? basicinfo.buffet : basicinfo.catering;
  const { images } = name === "/buffet" ? basicinfo.buffet : basicinfo.catering;
  if (images.length !== 0) {
    images.sort((a, b) => a.sort_number - b.sort_number);
  }
  const imagesDisplay =
    images.length === 0
      ? null
      : images.map((image) => {
          return (
            <div>
              <div>
                <img
                  src={image.src}
                  alt={image.name}
                  width={!isSmallscreen ? 600 : "100%"}
                />
              </div>
              <div style={{ margin: "20px auto" }}>
                <div>
                  <p>{image.name}</p>
                </div>
                <Button
                  href={image.src}
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                >
                  Download {image.name}
                </Button>
              </div>
            </div>
          );
        });
  return (
    <div>
      <div className={styles.fullTitle}>
        <span id="afhaallijst" className={styles.bestelling}></span>
        {name === "/buffet" ? "Diverse Buffet" : "Cateringen"}
      </div>
      {!text ? null : (
        <div
          className={layoutStyles.fullSpecials}
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "myFamily",
            fontSize: "20px",
            color: "black",
            lineHeight: "2",
          }}
        >
          {text}
          <div
            style={{
              width: "80%",
              margin: "30px auto auto auto",
              textAlign: "center",
            }}
          >
            {imagesDisplay}
          </div>
        </div>
      )}
    </div>
  );
}

export default Buffet;
