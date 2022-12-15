import React, { useState } from "react";
import styles from "../../admin.less";
import locale from "Utilities/locale";
import moment from "moment";
import gegevens from "Utilities/gegevens";
import {
  Divider,
  Modal,
  Button,
  Form,
  Result,
  Select,
  Input,
  DatePicker,
  InputNumber,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { generateDiscountArr, discountTimesArr } from "Utilities/toolStore";
const { restaurant_id } = gegevens;
const { Option } = Select;

let discountArr = [];
for (var i = 0; i < 20; i++) {
  const discount = {};
  discount.value = Number((0.05 * i).toFixed(2));
  discount.label = Number((discount.value * 100).toFixed(2)) + "%";
  discountArr.push({ ...discount });
}
const discountOptions = generateDiscountArr().map((item, i) => (
  <Option key={i} value={item.value}>
    {item.label}
  </Option>
));
const discountTimesOptions = discountTimesArr().map((item, i) => (
  <Option key={i} value={item.value}>
    {item.label}
  </Option>
));
const disabledDate = (current) => {
  return current && current < moment().startOf("day");
};

function DiscountcodeAddForm({ addDiscountcode, t, CapitalizeFC }) {
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
      <Divider orientation="left">{CapitalizeFC(t("discountcode"))}</Divider>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" size="large" shape="round" onClick={showModal}>
          {CapitalizeFC(t("create_discountcode"))}
          <PlusCircleOutlined
            style={{ fontSize: "18px", color: "white", fontWeight: "800" }}
          />
        </Button>
      </div>
      <Modal
        title={CapitalizeFC(t("create_discountcode"))}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        afterClose={afterClose}
      >
        <TheForm
          addDiscountcode={addDiscountcode}
          showResult={showResult}
          setShowResult={setShowResult}
          t={t}
          CapitalizeFC={CapitalizeFC}
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

export default DiscountcodeAddForm;

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
const TheForm = ({
  addDiscountcode,
  showResult,
  setShowResult,
  t,
  CapitalizeFC,
}) => {
  const onFinish = (values) => {
    const { discountcode, discount, validTo, times } = values;
    addDiscountcode({
      discountcode,
      discount,
      validTo,
      times,
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
        label={CapitalizeFC(t("discountcode"))}
        name="discountcode"
        rules={[
          {
            required: true,
            message: t("discountcode_discountcode_message"),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={CapitalizeFC(t("discount"))}
        name="discount"
        rules={[
          {
            required: true,
            message: t("discountcode_discountvalue_message"),
          },
        ]}
      >
        <Select placeholder="Selecteer een optie">{discountOptions}</Select>
      </Form.Item>

      <Form.Item
        label={CapitalizeFC(t("valid_to"))}
        name="validTo"
        rules={[
          {
            required: true,
            message: t("discountcode_valid_to_message"),
          },
        ]}
      >
        <DatePicker
          locale={locale}
          style={{ width: "100%" }}
          disabledDate={disabledDate}
        />
      </Form.Item>
      <Form.Item
        label={CapitalizeFC(t("times"))}
        name="times"
        rules={[
          {
            required: true,
            message: t("discountcode_times_message"),
          },
        ]}
      >
        <Select>{discountTimesOptions}</Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {CapitalizeFC(t("add"))}
        </Button>
      </Form.Item>
    </Form>
  );
};
