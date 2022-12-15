import React from "react";
import { changeFormat } from "Utilities/gegevens";
import { Table } from "antd";
import styles from "./bezorgingsinfo.less";
const columns = [
  {
    title: "Postcode",
    dataIndex: "postcode",
    key: "postcode",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Bezorgkosten",
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: "Bezorgen vanaf",
    dataIndex: "min_value",
    key: "min_value",
  },
  // {
  //   title: "Gratis bezorgen vanaf",
  //   dataIndex: "freeAt",
  //   key: "freeAt",
  // },
  // {
  //   title: "In of uitgeschakeld",
  //   dataIndex: "isEnabled",
  //   key: "isEnabled",
  // },
];
export default function Bezorgingsinfo({ bezorggebied }) {
  const data = bezorggebied.map((gebied) => {
    const { postcode, fee, freeAt, min_value, isEnabled } = gebied;
    return {
      postcode,
      fee: changeFormat(fee),
      freeAt: freeAt >= 100 ? "N.V.T" : changeFormat(freeAt),
      min_value: changeFormat(min_value),
      isEnabled: isEnabled ? "Ja" : "Nee",
    };
  });
  return (
    <div className={styles.table}>
      <div> Bezorgingsinfo:</div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div></div>
    </div>
  );
}
