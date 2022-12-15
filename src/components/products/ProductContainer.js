import React, { useState } from "react";
import ProductItem from "./ProductItem";
import MultipleChoices from "./MultipleChoices";
import HalfPortion from "./HalfPortion";
import { Modal, Checkbox, Typography, Select, Button, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import { changeFormat } from "Utilities/gegevens";
import styles from "../../css/product.less";
import { colorPurple, colorBlue, colorBlack } from "Utilities/toolStore";
const { Title } = Typography;
const { Option } = Select;
const ProductContainer = ({
  options,
  basicinfo,
  products,
  itemAdd,
  dispatch,
  history,
  categories,
  t,
}) => {
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [modalProductTitle, setModalProductTitle] = useState("");
  const [menuKind, setMenuKind] = useState([]);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]);
  const [productCategorie, setProductCategorie] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsChiCha, setSelectedOptionsChiCha] = useState([]);
  const [selectedOptionPrice, setSelectedOptionPrice] = useState(0);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [halfPortion, setHalfPortion] = useState(false);
  const showModal = (
    productId,
    modalProductTitle,
    menuKind,
    productCategorie,
    extra,
    discount
  ) => {
    const { restaurantType } = basicinfo;
    let initialPrice = 0;
    let initialOptions = [];
    let initialOptionsChiCha = [];
    menuKind.forEach((ele, i) => {
      const index = options.findIndex((option) => option.title === ele);

      if (index > -1) {
        const isSingleChoice = options[index].kind_of_choice !== "multiple";
        if (!isSingleChoice) {
          initialOptions.push("");
        }
        if (isSingleChoice) {
          initialPrice +=
            options[index].options.length === 0
              ? 0
              : options[index].options[0].option_price;
          initialOptions.push(
            options[index].options.length === 0
              ? ""
              : options[index].options[0].option_title
          );
        }
        if (restaurantType === "chinees" && isSingleChoice) {
          initialOptionsChiCha.push(
            options[index].options.length === 0
              ? ""
              : options[index].options[0].option_chi_cha ||
                  options[index].options[0].option_title
          );
        }
        if (restaurantType === "chinees" && !isSingleChoice) {
          initialOptionsChiCha.push("");
        }
      }
    });

    setVisible(true);
    setProductId(productId);
    setModalProductTitle(modalProductTitle);
    setMenuKind(menuKind);
    setDiscount(discount);
    setProductCategorie(productCategorie);
    setSelectedOptions(initialOptions);
    setSelectedOptionsChiCha(initialOptionsChiCha);
    setSelectedOptionPrice(initialPrice);
    setSelectedExtra(extra);
  };
  const handleCancel = (e) => {
    setVisible(false);
    setSelectedCheckBox([]);
  };
  const getPrice = (id, isHalfPortion, discount) => {
    if (isHalfPortion) {
      let price = products.products.find((element) => element.id === id)[
        "price_half"
      ];
      if (discount && discount < 1) {
        price = price * (1 - discount);
      }
      if (discount && discount >= 1) {
        price -= discount;
      }
      return price;
    }

    let price = products.products.find((element) => element.id === id)["price"];
    if (discount && discount < 1) {
      price = price * (1 - discount);
    }
    if (discount && discount >= 1) {
      price -= discount;
    }
    return price;
  };
  const handleOk = (e) => {
    const { restaurantType } = basicinfo;

    const subTotal =
      getPrice(productId, halfPortion, discount) + selectedOptionPrice;
    if (restaurantType === "chinees") {
      itemAdd({
        id: productId,
        option: [...selectedOptions],
        option_chi_cha: [...selectedOptionsChiCha],
        subTotal,
        discount,
        halfPortion,
      });
    }
    if (restaurantType !== "chinees") {
      itemAdd({
        id: productId,
        option: selectedOptions,
        subTotal,
        discount,
        halfPortion,
      });
    }

    selectedCheckBox.forEach((id) => {
      itemAdd({ id, subTotal: getPrice(id), halfPortion: false });
    });

    setVisible(false);
    setSelectedCheckBox([]);
    setSelectedOptions([]);
    setSelectedOptionsChiCha([]);
  };

  const onChange = (selectedCheckBox) => {
    setSelectedCheckBox(selectedCheckBox);
  };

  const selectOnChange = (index_of_menuKind, index_of_options, value) => {
    const { restaurantType } = basicinfo;
    let newSelectedOptions = [...selectedOptions];
    let newSelectedOptionsChiCha = [...selectedOptionsChiCha];
    let newSelectedOptionPrice = selectedOptionPrice;
    const valueIsArray = Array.isArray(value);
    const optionsData = options[index_of_options].options;
    let index_of_optionsData; // number| [number]
    let index_of_current_in_optionData; //number| [number]
    if (!valueIsArray) {
      newSelectedOptions.splice(index_of_menuKind, 1, value);
      index_of_optionsData = optionsData.findIndex(
        (option) => option.option_title === value
      );
      index_of_current_in_optionData = optionsData.findIndex(
        (option) => option.option_title === selectedOptions[index_of_menuKind]
      );
      newSelectedOptionPrice -=
        optionsData[index_of_current_in_optionData].option_price;
      newSelectedOptionPrice += optionsData[index_of_optionsData].option_price;
    }
    if (valueIsArray) {
      newSelectedOptions.splice(index_of_menuKind, 1, value.toString());
      index_of_optionsData = value.map((item) =>
        optionsData.findIndex((option) => option.option_title === item)
      );
      if (selectedOptions[index_of_menuKind]) {
        const multipleSelectedOptions =
          selectedOptions[index_of_menuKind].split(",");
        index_of_current_in_optionData = multipleSelectedOptions.map((item) =>
          optionsData.findIndex((option) => option.option_title === item)
        );
        index_of_current_in_optionData.forEach((index) => {
          if (index > -1) {
            newSelectedOptionPrice -= optionsData[index].option_price;
          }
        });
      }
      index_of_optionsData.forEach((index) => {
        newSelectedOptionPrice += optionsData[index].option_price;
      });
    }

    if (restaurantType !== "chinees") {
      setSelectedOptions(newSelectedOptions);
      setSelectedOptionPrice(newSelectedOptionPrice);
      return;
    }
    if (restaurantType === "chinees") {
      if (!valueIsArray) {
        newSelectedOptionsChiCha.splice(
          index_of_menuKind,
          1,
          optionsData[index_of_optionsData].option_chi_cha ||
            optionsData[index_of_optionsData].option_title
        );
      }
      if (valueIsArray) {
        let multipleOptionChiCha = "";
        index_of_optionsData.forEach(
          (index) =>
            (multipleOptionChiCha +=
              (optionsData[index].option_chi_cha ||
                optionsData[index].option_title) + ",")
        );
        newSelectedOptionsChiCha.splice(
          index_of_menuKind,
          1,
          multipleOptionChiCha
        );
      }

      setSelectedOptions(newSelectedOptions);
      setSelectedOptionsChiCha(newSelectedOptionsChiCha);
      setSelectedOptionPrice(newSelectedOptionPrice);
    }
  };

  const { checkbox, themeColor, mainCategories } = basicinfo;

  let data;
  const afhalenbezorgenproducts = products.products.filter(
    (prod) =>
      !Array.isArray(prod.usedAt) ||
      prod.usedAt.length === 0 ||
      prod.usedAt.includes("afhalen/bezorgen")
  );
  categories.categories.sort((a, b) => a.sort_number - b.sort_number);
  if (
    Array.isArray(categories.categories) &&
    Array.isArray(products.products)
  ) {
    data = categories.categories
      .filter((cat) => {
        return (
          afhalenbezorgenproducts.findIndex((item) =>
            item.categorie.includes(cat.cat_code)
          ) > -1
        );
      })
      .map((cat) => {
        const items = afhalenbezorgenproducts.map((product) => {
          if (product.categorie.includes(cat.cat_code)) {
            return (
              <ProductItem
                productTitle={product.title}
                productId={product.id}
                productCategorie={product.categorie}
                allergy={product.allergy}
                productDiscription={product.discription}
                productImgUrl={product.img_url}
                menuKind={product.menukind}
                extra={product.extra}
                discount={product.discount}
                productPrice={product.price}
                price_half={product.price_half}
                outofstock={product.outofstock}
                discountedPrice={changeFormat(
                  product.discount < 1
                    ? product.price * (1 - product.discount)
                    : product.price - product.discount > 0
                    ? product.price - product.discount
                    : 0
                )}
                dispatch={dispatch}
                itemAdd={itemAdd}
                showModal={showModal}
                getPrice={getPrice}
                closeday={basicinfo.closeday}
                restaurantName={basicinfo.restaurantName}
                history={history}
                themeColor={basicinfo.themeColor}
                openingstijden={basicinfo.openingstijden}
                _closeday={basicinfo._closeday}
              />
            );
          }
        });
        return (
          <CategoriesAndItems cat={cat} items={items} themeColor={themeColor} />
        );
      });
  }
  // optionArr function
  const product = products.products.find((prod) => prod.id === productId);
  return (
    <div>
      {data}
      <Modal
        title={modalProductTitle}
        className={styles.modal}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={() => setHalfPortion(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            {t("Toevoegen")}
          </Button>,
        ]}
      >
        <div>
          {!(product && product.price_half) ? null : (
            <HalfPortion
              halfPortion={halfPortion}
              setHalfPortion={setHalfPortion}
              price_half={product.price_half}
              productPrice={product.price}
            />
          )}
          {Array.isArray(menuKind)
            ? menuKind.map((element_of_menuKind, index_of_menuKind) => {
                const index_of_options = options.findIndex(
                  (option) => option.title === element_of_menuKind
                );
                if (index_of_options > -1) {
                  return (
                    <div>
                      <h3>{options[index_of_options].description}:</h3>
                      {options[index_of_options].kind_of_choice !==
                      "multiple" ? (
                        <Select
                          value={selectedOptions[index_of_menuKind]}
                          style={{ diplay: "inline" }}
                          onChange={selectOnChange.bind(
                            this,
                            index_of_menuKind,
                            index_of_options
                          )}
                        >
                          {options[index_of_options].options.map((item) => {
                            return (
                              <Option value={item.option_title}>
                                {item.option_name}
                              </Option>
                            );
                          })}
                        </Select>
                      ) : (
                        <MultipleChoices
                          index_of_menuKind={index_of_menuKind}
                          index_of_options={index_of_options}
                          selectOnChange={selectOnChange}
                          selectedOptions={selectedOptions}
                          checkboxOptions={options[index_of_options].options}
                        />
                      )}
                    </div>
                  );
                }
              })
            : null}
          {!selectedExtra ? null : (
            <div className={styles.checkboxes}>
              <h3>Extra's</h3>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={onChange}
                value={selectedCheckBox}
              >
                <Row>
                  {checkbox.map((item) => (
                    <Col span={24}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProductContainer;

function CategoriesAndItems({ cat, items, themeColor }) {
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });
  return (
    <div id={cat.cat_code}>
      <Title
        level={3}
        style={{
          marginBottom: "20px",
          color: themeColor === colorPurple ? colorPurple : colorBlack,
          textAlign: "center",
          fontSize: isSmallscreen ? "24px" : "30px",
          fontWeight: "800",
          textShadow: "1px 0px 1px grey",
        }}
      >
        {cat.cat_name}
      </Title>
      <div
        style={{
          fontSize: isSmallscreen ? "16px" : "18px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {cat.cat_description || null}
      </div>
      <div className={styles.ul}>{items}</div>
    </div>
  );
}
