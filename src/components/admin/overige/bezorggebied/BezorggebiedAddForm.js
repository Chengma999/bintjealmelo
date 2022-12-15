import React, { useState } from "react";
import styles from "../../admin.less";
import gegevens from "Utilities/gegevens";
import {
  Divider,
  Modal,
  Button,
  Form,
  Result,
  InputNumber,
  Switch,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { CapitalizeFC } from "Utilities/toolStore";
const { restaurant_id } = gegevens;
function BezorggebiedAddForm({ addBezorggebied, t }) {
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
    <div style={{ margin: "auto auto", width: "80%" }}>
      <Divider orientation="left">
        {CapitalizeFC(t("delivery_postalcodes"))}
      </Divider>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" size="large" shape="round" onClick={showModal}>
          {CapitalizeFC(t("add_postalcode"))}
          <PlusCircleOutlined
            style={{ fontSize: "18px", color: "white", fontWeight: "800" }}
          />
        </Button>
      </div>
      <Modal
        title="Postcode toevoegen"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <TheForm
          addBezorggebied={addBezorggebied}
          showResult={showResult}
          setShowResult={setShowResult}
          t={t}
        />
        {!showResult ? null : (
          <div style={{ textAlign: "center" }}>
            <Result status="success" title="Add gelukt!" />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default BezorggebiedAddForm;

// the form at Modal

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
const TheForm = ({ addBezorggebied, showResult, setShowResult, t }) => {
  const onFinish = (values) => {
    const { postcode, fee, min_value, freeAt, isEnabled } = values;
    addBezorggebied({
      postcode,
      fee,
      min_value,
      restaurant_id,
      freeAt,
      isEnabled,
    }).then((res) => {
      console.log(res);
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
      initialValues={{ freeAt: 1000, isEnabled: true }}
    >
      <Form.Item
        label={t("postalcode")}
        name="postcode"
        rules={[
          {
            required: true,
            message: `${t("postalcode_required_message")}`,
          },
        ]}
      >
        <InputNumber step={1} min={0} />
      </Form.Item>

      <Form.Item
        label={CapitalizeFC(t("Bezorgkosten"))}
        name="fee"
        rules={[
          {
            required: true,
            message: `${t("bezorgkosten_required_message")}`,
          },
        ]}
      >
        <InputNumber step={0.01} min={0} />
      </Form.Item>
      <Form.Item
        label={CapitalizeFC(t("min_order_value"))}
        name="min_value"
        rules={[
          {
            required: true,
            message: `${t("min_order_value_required_message")}`,
          },
        ]}
      >
        <InputNumber step={0.01} min={0} />
      </Form.Item>
      <Form.Item
        label={CapitalizeFC(t("free_delivery_from"))}
        name="freeAt"
        rules={[
          {
            required: true,
            message: `${t("free_delivery_from_required_message")}`,
          },
        ]}
      >
        <InputNumber step={0.01} min={0} />
      </Form.Item>
      <Form.Item
        label={CapitalizeFC(t("delivery_status"))}
        name="isEnabled"
        rules={[
          {
            required: true,
            message: "Kies je een bezorgstatus van deze postcode.",
          },
        ]}
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {CapitalizeFC(t("toevoegen"))}
        </Button>
      </Form.Item>
    </Form>
  );
};
