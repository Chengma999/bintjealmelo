import React from "react";
import styles from "../../admin/admin.less";
import CategoriesAddForm from "./categories/CategoriesAddForm";
import CategoriesTable from "./categories/CategoriesTable";
import { Typography } from "antd";
const { Title } = Typography;

const CategoriesComponent = ({
  categories,
  addCategorie,
  updateCategorie,
  deleteCategorie,
  t,
}) => {
  return (
    <div className={styles.table}>
      <div
        style={{
          borderTop: "1px solid grey",
          margin: "0 10%",
          paddingTop: "30px",
          paddingBottom: "80px",
          textTransform: "uppercase",
        }}
      >
        <Title level={2}>{t("categories")}</Title>
        <CategoriesAddForm
          categories={categories}
          addCategorie={addCategorie}
        />
      </div>
      <CategoriesTable
        categories={categories}
        updateCategorie={updateCategorie}
        deleteCategorie={deleteCategorie}
      />
    </div>
  );
};

export default CategoriesComponent;
