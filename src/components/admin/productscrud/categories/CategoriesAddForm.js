import React, { useState } from "react";
import styles from "../../admin.less";
import {
  Typography,
  Modal,
  Button,
  Form,
  Result,
  Input,
  InputNumber,
  Select,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CapitalizeFC } from "Utilities/toolStore";
import { useTranslation } from "react-i18next";
export default CategoriesAddForm;

const { Option } = Select;
export function CategoriesAddForm({ categories, addCategorie }) {
  const [showResult, setShowResult] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
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
    <div>
      <Button type="primary" size="large" shape="round" onClick={showModal}>
        {t("add_categorie")}
        <PlusCircleOutlined
          style={{ fontSize: "18px", color: "white", fontWeight: "800" }}
        />
      </Button>
      <Modal
        title={t("add_categorie")}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <TheForm
          addCategorie={addCategorie}
          showResult={showResult}
          setShowResult={setShowResult}
          categories={categories}
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
  showResult,
  setShowResult,
  addCategorie,
  categories,
  t,
}) => {
  const categoriesnames = categories.map((cat) => cat.cat_name);
  const categoriesOptions = categories.map((cat, i) => (
    <Option key={i} value={cat.cat_code}>
      {cat.cat_name}
    </Option>
  ));
  const onFinish = (values) => {
    console.log(values);
    const { image_link, cat_code, cat_name, sort_number, cat_description } =
      values;
    addCategorie({
      image_link,
      cat_code,
      cat_name,
      sort_number,
      cat_description,
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
    >
      <Form.Item
        label={t("categorie_code")}
        name="cat_code"
        rules={[
          {
            required: true,
            message: t("categorie_code_message"),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value) {
                return Promise.resolve();
              }
              if (categories.map((item) => item.cat_code).includes(value)) {
                return Promise.reject(t("categorie_code_duplicated_message"));
              }
              if (value.substring(0, 3) !== "cat") {
                return Promise.reject(t("categories_code_beginletter_message"));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Categoriesnaam"
        name="cat_name"
        rules={[
          {
            required: true,
            message: t("categorie_name_message"),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!categoriesnames.includes(value)) {
                return Promise.resolve();
              }
              return Promise.reject(t("categories_name_duplicated_message"));
            },
          }),
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("categorie_order")}
        name="sort_number"
        rules={[
          {
            required: true,
            message: t("categorie_order_message"),
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label={t("description")}
        name="cat_description"
        rules={[
          {
            required: false,
            message: t("categorie_description_message"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("image_url")}
        name="image_link"
        rules={[{ required: false, message: t("image_url_placeholder") }]}
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
