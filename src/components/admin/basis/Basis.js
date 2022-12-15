import React from "react";
import { connect } from "dva";
import AdminPage from "../AdminPage";
import ThemeColorForm from "./ThemeColorForm";
import { Table } from "antd";
import AfhaaltextForm from "../overige/AfhaaltextForm";
import { useTranslation } from "react-i18next";
import styles from "../admin.less";
import LanguageSwitcher from "../../common/LanguageSwitcher";

import {
  updateResAddress,
  updateResPostcode,
  updateResMail,
  updateResTelnr,
  updateThemeColor,
} from "../../../actions/index";
const columns = [
  {
    title: "",
    dataIndex: "keys",
    width: 50,
    render: (text) => <div style={{ fontWeight: "600" }}>{text}</div>,
  },
  {
    title: "",
    dataIndex: "values",
    width: 150,
  },
];

function Basis(props) {
  const { t } = useTranslation();
  const {
    basicinfo,
    updateThemeColor,
    updateResAddress,
    updateResPostcode,
    updateResMail,
    updateResTelnr,
  } = props;
  const data = [
    {
      key: "resAddress",
      keys: t("address"),
      values: (
        <AfhaaltextForm
          text={basicinfo.resAddress}
          updateText={updateResAddress}
        />
      ),
    },
    {
      key: "resPostcode",
      keys: t("postcode"),
      values: (
        <AfhaaltextForm
          text={basicinfo.resPostcode}
          updateText={updateResPostcode}
        />
      ),
    },
    {
      key: "resMail",
      keys: t("e-mail"),
      values: (
        <AfhaaltextForm text={basicinfo.resMail} updateText={updateResMail} />
      ),
    },
    {
      key: "resTelnr",
      keys: t("Telefoonnummer"),
      values: (
        <AfhaaltextForm text={basicinfo.resTelnr} updateText={updateResTelnr} />
      ),
    },
    {
      key: "themeColor",
      keys: t("themecolor"),
      values: (
        <ThemeColorForm
          ele={basicinfo.themeColor}
          updateEle={updateThemeColor}
          name="themeColor"
        />
      ),
    },
  ];

  return (
    <div>
      <AdminPage page="basis" reservation={basicinfo.reservation} t={t} />
      <div id="barsMenuAndLanguageSwitcherWrapper">
        <div id="languageSwitcherWrapper">
          <LanguageSwitcher />
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({ basicinfo }) => ({
  basicinfo,
});
export default connect(mapStateToProps, {
  updateThemeColor,
  updateResAddress,
  updateResPostcode,
  updateResMail,
  updateResTelnr,
})(Basis);
