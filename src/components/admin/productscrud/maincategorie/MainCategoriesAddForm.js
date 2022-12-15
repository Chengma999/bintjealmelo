import React, { useState } from "react";
import {
  Typography,
  Modal,
  Button,
  Form,
  Result,
  Input,
  Select,
  Checkbox,
} from "antd";
import gegevens from "Utilities/gegevens";
import { CapitalizeFC } from "Utilities/toolStore";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
const { restaurant_id } = gegevens;
const { Title } = Typography;
const { Option } = Select;
function MainCategorie({ addMainCategorie, categories, mainCategories, t }) {
  const [showResult, setShowResult] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const afterClose = () => {
    setShowResult(false);
  };
  return (
    <div
      style={{
        borderTop: "1px solid grey",
        margin: "0 10%",
        paddingTop: "30px",
        paddingBottom: "80px",
        textTransform: "uppercase",
      }}
    >
      <Title level={2}>{t("main_categories")}</Title>
      <Button type="primary" size="large" shape="round" onClick={showModal}>
        Voeg Hoofdcategorie toe
        <PlusCircleOutlined
          style={{ fontSize: "18px", color: "white", fontWeight: "800" }}
        />
      </Button>
      <Modal
        title={t("add_main_categorie")}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <TheForm
          addMainCategorie={addMainCategorie}
          showResult={showResult}
          setShowResult={setShowResult}
          categories={categories}
          mainCategories={mainCategories}
          t={t}
        />
        {!showResult ? null : (
          <div style={{ textAlign: "center" }}>
            <Result status="success" title={t("add_result_succeed")} />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MainCategorie;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const TheForm = ({
  addMainCategorie,
  showResult,
  setShowResult,
  categories,
  mainCategories,
  t,
}) => {
  const plainOptions = [
    { value: "afhalen/bezorgen", label: t("takeaway_and_pickup") },
    { value: "restaurant", label: t("Restaurant") },
  ];

  const mainCategoriesnames = mainCategories.map(
    (cat) => cat.maincategoriename
  );
  const categoriesOptions = categories.map((cat, i) => (
    <Option key={i} value={cat.cat_code}>
      {cat.cat_name}
    </Option>
  ));
  const onFinish = (values) => {
    console.log(values);
    const { containsCategories, image_link, maincategoriename, usedAt } =
      values;
    addMainCategorie({
      containsCategories,
      image_link,
      maincategoriename,
      usedAt,
    }).then((res) => {
      setShowResult(true);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      preserve="false"
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ usedAt: ["afhalen/bezorgen"] }}
    >
      <Form.Item
        label={CapitalizeFC(t("main_categorie_name"))}
        name="maincategoriename"
        rules={[
          {
            required: true,
            message: t("main_categorie_name_message"),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!mainCategoriesnames.includes(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                t("main_categorie_name_duplicated_message")
              );
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="usedAt"
        label="Gebruikt voor"
        rules={[
          {
            required: true,
            message: t("main_categorie_used_for_message"),
          },
        ]}
      >
        <Checkbox.Group options={plainOptions} />
      </Form.Item>
      <Form.Item
        label="Bevat categories"
        name="containsCategories"
        rules={[
          {
            required: true,
            message: t("main_categorie_contains_categorie_message"),
          },
        ]}
      >
        <Select mode="multiple">{categoriesOptions}</Select>
      </Form.Item>
      <Form.Item
        label="Afbeeldingslink"
        name="image_link"
        rules={[
          { required: false, message: "Vul je hier afbeelding link in!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {CapitalizeFC(t("add"))}
        </Button>
      </Form.Item>
    </Form>
  );
};
