import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Affix, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddForm from "./AddForm";
import styles from "../admin.less";
import { useTranslation } from "react-i18next";
export default function AddNewItem({
  addInDb,
  loading,
  categories,
  products,
  options,
  printgroups,
}) {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [showResult, setShowResult] = useState(false);
  const { t } = useTranslation();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setShowResult(false);
    form.resetFields();
  };
  return (
    <div style={{ margin: "10px auto 10px auto", textAlign: "center" }}>
      <Affix offsetTop={10}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showModal}
        />
      </Affix>
      <Modal
        className={styles.modalOneButton}
        visible={visible}
        title={t("add_a_product")}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading.effects["admincrud/add"] === true}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <AddForm
          addInDb={addInDb}
          loading={loading}
          options={options}
          categories={categories}
          products={products}
          printgroups={printgroups}
          form={form}
          showResult={showResult}
          setShowResult={setShowResult}
          t={t}
        />
      </Modal>
    </div>
  );
}
