import React, { useEffect } from "react";
import { Form, Switch, Button, Select } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
const { Option } = Select;

const optionsValues = [
  { value: "cash", label: "Contant", src: "https://i.ibb.co/1KKvyWQ/cash.png" },
  {
    value: "ideal",
    label: "Ideal",
    src: "https://mollie.com/external/icons/payment-methods/ideal.svg",
  },
  {
    value: "bancontact",
    label: "Bancontact",
    src: "https://mollie.com/external/icons/payment-methods/bancontact.svg",
  },
  {
    value: "creditcard",
    label: "Credit Card",
    src: "https://mollie.com/external/icons/payment-methods/creditcard.svg",
  },
  {
    value: "paypal",
    label: "Paypal",
    src: "https://mollie.com/external/icons/payment-methods/paypal.svg",
  },
  {
    value: "applepay",
    label: "Apple Pay",
    src: "https://mollie.com/external/icons/payment-methods/applepay.svg",
  },
];
const options = optionsValues.map((opt) => (
  <Option value={opt.value}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{opt.label}</div>
      <div>
        <img src={opt.src} width={25} alt={opt.value} />
      </div>
    </div>
  </Option>
));
function PayMethod({ updatePayMethod, payMethod, t }) {
  const { takeaway, delivery } = payMethod;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ takeaway, delivery });
  }, [takeaway.toString(), delivery.toString()]);
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    console.log(values);
    updatePayMethod(values);
  };
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          label={t("pick-up")}
          name="takeaway"
          rules={[
            {
              required: true,
              message: "Kies een of meer betaalmethoden voor afhalen.",
            },
          ]}
        >
          <Select mode="multiple">{options}</Select>
        </Form.Item>
        <Form.Item
          label={t("delivery")}
          name="delivery"
          rules={[
            {
              required: true,
              message: "Kies een of meer betaalmethoden voor bezorgen.",
            },
          ]}
        >
          <Select mode="multiple">{options}</Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PayMethod;
