import { Menu } from "antd";
import { Link } from "dva/router";
import React, { useState, useEffect } from "react";

const AdminPage = ({ page, reservation, t }) => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (page === "orders") {
      setCurrent("orders");
    } else if (page === "products") {
      setCurrent("products");
    } else if (page === "basis") {
      setCurrent("basis");
    } else if (page === "overige") {
      setCurrent("overige");
    } else if (page === "customers") {
      setCurrent("customers");
    }
  }, []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu
        theme="dark"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="orders">
          <Link to="/admin/orders">{t("orders_management")}</Link>
        </Menu.Item>
        <Menu.Item key="products">
          <Link to="/admin/products">{t("products_management")}</Link>
        </Menu.Item>
        <Menu.Item key="basis">
          <Link to="/admin/basis">{t("basic_settings")}</Link>
        </Menu.Item>
        <Menu.Item key="overige">
          <Link to="/admin/overige">{t("other_settings")}</Link>
        </Menu.Item>
        <Menu.Item key="customers">
          <Link to="/admin/customers">{t("customers_management")}</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminPage;
