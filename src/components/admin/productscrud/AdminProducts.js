import React, { Component } from "react";
import { List, Card, Modal, Typography } from "antd";
import { connect } from "dva";
import UpdateForm from "../form/UpdateForm";
import AddNewItem from "../form/AddNewItem";
import BulkOperation from "../form/BulkOperation";
import { SettingOutlined } from "@ant-design/icons";
import Productdnd from "../dnd/Productdnd";
import styles from "../admin.less";
import { withTranslation } from "react-i18next";

import LanguageSwitcher from "../../common/LanguageSwitcher";
import {
  updateInDb,
  bulkUpdateProducts,
  deleteInDb,
  addInDb,
  fetchCategories,
  addCategorie,
  updateCategorie,
  updateMainCategorie,
  deleteCategorie,
  deleteMainCategorie,
  updateCheckbox,
  cancelProductModal,
  addGroup,
  updateGroup,
  deleteGroup,
  copyGroup,
  addGroupOption,
  updateGroupOption,
  deleteGroupOption,
  addMainCategorie,
  fetchProducts,
} from "../../../actions/index";
import AdminPage from "../AdminPage";
import CheckboxTable from "./CheckboxTable";
import CategoriesComponent from "./CategoriesComponent";
import OptionsComponent from "./OptionsComponent";
import MainCategoriesAddForm from "./maincategorie/MainCategoriesAddForm";
import MainCategoriesTable from "./maincategorie/MainCategoriesTable";
const { Title } = Typography;

const convertInEuro = (totalPrice) => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(totalPrice);
};

class AdminProducts extends Component {
  formRef = React.createRef();
  state = {
    visible: false,
    current: {},
    showGroepdnd: false,
    showProductdnd: false,
    selectedCat: null,
  };
  showModal = (item) => {
    this.setState({
      visible: true,
      current: item,
    });
  };
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      visible: false,
      showProductdnd: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
      current: {},
      showGroepdnd: false,
      showProductdnd: false,
    });
    this.props.cancelProductModal();
  };
  setShowGroepdnd = (bool) => {
    this.setState({
      showGroepdnd: bool,
    });
  };
  setShowProductdnd = (bool) => {
    this.setState({
      showProductdnd: bool,
    });
  };
  getAfhalenBezorgenProducten = (products, cat_code) => {
    return products.products.filter((product) => {
      const isAfhalenBezorgen =
        !product.usedAt ||
        product.usedAt.length === 0 ||
        product.usedAt.includes("afhalen/bezorgen");
      return product.categorie.includes(cat_code) && isAfhalenBezorgen;
    });
  };
  componentDidUpdate(prevProps) {
    const { products } = this.props.products;
    const prevProducts = prevProps.products.products;
    if (
      Array.isArray(products) &&
      Array.isArray(prevProducts) &&
      products.length === prevProducts.length &&
      JSON.stringify(products) !== JSON.stringify(prevProducts) &&
      this.state.visible
    ) {
      const { current } = this.state;
      const index = products.findIndex(
        (product) => product._id === current._id
      );

      this.setState({ current: products[index] });
    }
  }

  render() {
    const {
      products,
      categories,
      loading,
      updateInDb,
      bulkUpdateProducts,
      deleteInDb,
      addInDb,
      fetchCategories,
      admincrud,
      basicinfo,
      addCategorie,
      updateCategorie,
      updateMainCategorie,
      deleteCategorie,
      deleteMainCategorie,
      updateCheckbox,
      addGroup,
      updateGroup,
      deleteGroup,
      copyGroup,
      addGroupOption,
      updateGroupOption,
      deleteGroupOption,
      addMainCategorie,
      fetchProducts,
      username,
      t,
    } = this.props;
    const { current, showGroepdnd, selectedCat } = this.state;
    const productsLoading = loading.effects["products/fetch"];
    const categoriesLoading = loading.effects["basicinfo/fetch"];

    const productsdnd = this.getAfhalenBezorgenProducten(products, selectedCat);
    return (
      <div>
        <AdminPage page="products" reservation={basicinfo.reservation} t={t} />
        <div id="barsMenuAndLanguageSwitcherWrapper">
          <div id="languageSwitcherWrapper">
            <LanguageSwitcher />
          </div>
        </div>
        <AddNewItem
          addInDb={addInDb}
          loading={loading}
          admincrud={admincrud}
          categories={categories}
          products={products}
          options={basicinfo.options}
          printgroups={basicinfo.printgroups}
        />
        <BulkOperation
          addInDb={addInDb}
          bulkUpdateProducts={bulkUpdateProducts}
          loading={loading}
          admincrud={admincrud}
          categories={categories}
          products={products}
          options={basicinfo.options}
          printgroups={basicinfo.printgroups}
        />
        <div
          style={{
            borderTop: "1px solid grey",
            margin: "0 10%",
            paddingTop: "30px",
            textTransform: "uppercase",
          }}
        >
          <Title level={2}>
            {t("pick-up")}/{t("delivery")} {t("products")}
          </Title>
        </div>
        {categoriesLoading
          ? null
          : basicinfo.categories.map((cat) => {
              const afhalenBezorgenProducten = this.getAfhalenBezorgenProducten(
                products,
                cat.cat_code
              );
              // products.products.filter(
              //   (product) => {
              //     const isAfhalenBezorgen =
              //       !product.usedAt ||
              //       product.usedAt.length === 0 ||
              //       product.usedAt.includes("afhalen/bezorgen");
              //     return (
              //       product.categorie.includes(cat.cat_code) &&
              //       isAfhalenBezorgen
              //     );
              //   }
              // );
              return afhalenBezorgenProducten.length === 0 ? null : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Title level={4}>{cat.cat_name}</Title>
                    <SettingOutlined
                      style={{
                        fontSize: "1.6em",
                        cursor: "pointer",
                        paddingLeft: "8px",
                      }}
                      onClick={() =>
                        this.setState({
                          showProductdnd: true,
                          selectedCat: cat.cat_code,
                        })
                      }
                    />
                  </div>
                  {productsLoading ? null : (
                    <List
                      className={styles.lists}
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                      }}
                      dataSource={afhalenBezorgenProducten}
                      renderItem={(item) => {
                        const title = `${item.id} - ${item.title}`;
                        return (
                          <List.Item onClick={() => this.showModal(item)}>
                            <Card title={title}>
                              {convertInEuro(item.price)}
                              <br />
                              {item.chi_cha} - {item.discription} -{" "}
                              {item.menukind}
                              <br />
                            </Card>
                          </List.Item>
                        );
                      }}
                    />
                  )}
                </div>
              );
            })}
        <div
          style={{
            borderTop: "1px solid grey",
            margin: "0 10%",
            paddingTop: "30px",
            textTransform: "uppercase",
          }}
        >
          <Title level={2}>
            {t("restaurant")} {t("products")}
          </Title>
        </div>
        {categoriesLoading
          ? null
          : basicinfo.categories
              // .filter((cat) => cat.usedAt.includes("restaurant"))
              .map((cat) => {
                const restaurantProducten = products.products.filter(
                  (product) => {
                    const isRestaurant =
                      Array.isArray(product.usedAt) &&
                      product.usedAt.includes("restaurant");
                    return (
                      product.categorie.includes(cat.cat_code) && isRestaurant
                    );
                  }
                );
                return restaurantProducten.length === 0 ? null : (
                  <div style={{ textAlign: "center" }}>
                    <Title level={4}>{cat.cat_name}</Title>
                    {productsLoading ? null : (
                      <List
                        className={styles.lists}
                        grid={{
                          gutter: 16,
                          xs: 1,
                          sm: 2,
                          md: 4,
                          lg: 4,
                          xl: 6,
                          xxl: 3,
                        }}
                        dataSource={restaurantProducten}
                        renderItem={(item) => {
                          const title = `${item.id} - ${item.title}`;
                          return (
                            <List.Item onClick={() => this.showModal(item)}>
                              <Card title={title}>
                                {convertInEuro(item.price_r)}
                                <br />
                                {item.chi_cha} - {item.discription} -{" "}
                                {item.menukind}
                                <br />
                              </Card>
                            </List.Item>
                          );
                        }}
                      />
                    )}
                  </div>
                );
              })}

        <CategoriesComponent
          categories={basicinfo.categories}
          fetchCategories={fetchCategories}
          addCategorie={addCategorie}
          updateCategorie={updateCategorie}
          deleteCategorie={deleteCategorie}
          t={t}
        />
        <MainCategoriesAddForm
          addMainCategorie={addMainCategorie}
          mainCategories={basicinfo.mainCategories}
          categories={basicinfo.categories}
          t={t}
        />
        <MainCategoriesTable
          categories={basicinfo.categories}
          updateMainCategorie={updateMainCategorie}
          deleteMainCategorie={deleteMainCategorie}
          mainCategories={basicinfo.mainCategories}
        />
        <div
          style={{
            borderTop: "1px solid grey",
            margin: "0 10%",
            paddingTop: "30px",
            textTransform: "uppercase",
          }}
        >
          <Title level={2}>Checkboxes</Title>
        </div>
        <CheckboxTable
          checkbox={basicinfo.checkbox}
          updateCheckbox={updateCheckbox}
        />
        <div
          style={{
            borderTop: "1px solid grey",
            margin: "0 10%",
            paddingTop: "30px",
            textTransform: "uppercase",
          }}
        >
          <Title level={2}>
            {t("groups")} & {t("options")}
          </Title>
        </div>
        <OptionsComponent
          restaurantType={basicinfo.restaurantType}
          options={basicinfo.options}
          addGroup={addGroup}
          updateGroup={updateGroup}
          deleteGroup={deleteGroup}
          copyGroup={copyGroup}
          addGroupOption={addGroupOption}
          updateGroupOption={updateGroupOption}
          deleteGroupOption={deleteGroupOption}
          username={username}
        />
        <Modal //producten
          className={styles.modalOneButton}
          title={
            current.title !== undefined
              ? current.id.toString().concat(" ", current.title)
              : ""
          }
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          cancelText="Return"
        >
          <UpdateForm
            item={current}
            updateInDb={updateInDb}
            deleteInDb={deleteInDb}
            loading={loading}
            options={basicinfo.options}
            categories={categories}
            products={products}
            printgroups={basicinfo.printgroups}
            showGroepdnd={showGroepdnd}
            setShowGroepdnd={this.setShowGroepdnd}
          />
        </Modal>
        <Modal
          title={
            "Zet de producten van " +
            (basicinfo.categories.find(
              (cat) => cat.cat_code === this.state.selectedCat
            )
              ? basicinfo.categories.find(
                  (cat) => cat.cat_code === this.state.selectedCat
                ).cat_name
              : "") +
            " op de gewenste volgorde."
          }
          className={styles.modalOneButton}
          visible={this.state.showProductdnd}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          cancelText="Return"
        >
          <Productdnd
            originProducts={productsdnd}
            updateInDb={updateInDb}
            selectedCat={selectedCat}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({
  products,
  loading,
  admincrud,
  categories,
  checkbox,
  basicinfo,
}) => ({
  products,
  loading,
  admincrud,
  categories,
  checkbox,
  basicinfo,
});

export default withTranslation()(
  connect(mapStateToProps, {
    updateInDb,
    bulkUpdateProducts,
    deleteInDb,
    addInDb,
    fetchCategories,
    addCategorie,
    updateCategorie,
    updateMainCategorie,
    deleteCategorie,
    deleteMainCategorie,
    updateCheckbox,
    cancelProductModal,
    addGroup,
    updateGroup,
    deleteGroup,
    copyGroup,
    addGroupOption,
    updateGroupOption,
    deleteGroupOption,
    addMainCategorie,
    fetchProducts,
  })(AdminProducts)
);
