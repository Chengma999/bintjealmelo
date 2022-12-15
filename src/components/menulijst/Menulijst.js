import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import styles from "../../css/checkout.less";

function Menulijst({ basicinfo }) {
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });
  const { menulijsts } = basicinfo;
  if (menulijsts.length !== 0) {
    menulijsts.sort((a, b) => a.sort_number - b.sort_number);
  }
  const menulijstDisplay =
    menulijsts.length === 0
      ? null
      : menulijsts.map((menulijst) => {
          return (
            <div>
              <div>
                <img
                  src={menulijst.src}
                  alt={menulijst.name}
                  width={!isSmallscreen ? 600 : "100%"}
                />
              </div>
              <div style={{ margin: "20px auto" }}>
                <div>
                  <p>{menulijst.name}</p>
                </div>
                <Button
                  href={menulijst.src}
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                >
                  Download {menulijst.name}
                </Button>
              </div>
            </div>
          );
        });
  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <div className={styles.fullTitle}>
        <span id="afhaallijst" className={styles.bestelling}>
          Onze
        </span>
        Menulijst
      </div>
      {menulijstDisplay}
    </div>
  );
}

export default Menulijst;
