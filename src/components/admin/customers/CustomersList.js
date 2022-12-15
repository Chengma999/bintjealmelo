import React from "react";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import AdminPage from "../AdminPage";
import { List, Avatar } from "antd";
import { connect } from "dva";
import { useTranslation } from "react-i18next";
function CustomersList({ basicinfo, customers }) {
  const { t } = useTranslation();
  return (
    <div>
      <AdminPage page="customers" reservation={basicinfo.reservation} t={t} />
      <div id="barsMenuAndLanguageSwitcherWrapper">
        <div id="languageSwitcherWrapper">
          <LanguageSwitcher />
        </div>
      </div>

      <List
        size="large"
        itemLayout="horizontal"
        dataSource={customers.customers}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="" />}
              title={<a href="https://ant.design">{item.customerName}</a>}
              description={<Description item={item} />}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

function Description({ item }) {
  const { email, telefoon, adres, postcode, stampcard } = item;
  return (
    <div>
      <div>{email}</div>
      <div>{telefoon}</div>
      <div>{adres && adres}</div>
      <div>{postcode && postcode}</div>
      <div> huidige punten: {stampcard.currentPoints}</div>
    </div>
  );
}
const mapStateToProps = ({ basicinfo, customers }) => ({
  basicinfo,
  customers,
});
export default connect(mapStateToProps)(CustomersList);
