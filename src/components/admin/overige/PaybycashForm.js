import React, { useEffect } from "react";
import { Form, Switch, Button, Select } from "antd";
import gegevens from "Utilities/gegevens";
import { getDiscountArr } from "Utilities/toolStore";
const { restaurant_id } = gegevens;
const { Option } = Select;

let discountArr = getDiscountArr();

const discountOptions = discountArr.map((item, i) => (
  <Option key={i} value={item.value}>
    {item.label}
  </Option>
));

const PaybycashForm = ({
  name,
  paybycash,
  updatePaybycash,
  discountTakeAway,
  updateDiscountTakeAway,
  t,
}) => {
  const [form] = Form.useForm();
  useEffect(
    () => {
      if (name !== "discountTakeAway") {
        form.setFieldsValue({ paybycash });
      } else {
        const { isEnabled, amount } = discountTakeAway;
        form.setFieldsValue({ isEnabled, amount });
      }
    },
    name !== "discountTakeAway"
      ? [paybycash]
      : [discountTakeAway.isEnabled, discountTakeAway.amount]
  );
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    if (name !== "discountTakeAway") {
      updatePaybycash(values);
      return;
    }
    updateDiscountTakeAway(values);
  };

  return (
    <div>
      <b>
        {name !== "discountTakeAway"
          ? paybycash
            ? t("on").toUpperCase()
            : t("off").toUpperCase()
          : discountTakeAway.isEnabled
          ? t("on").toUpperCase()
          : t("off").toUpperCase()}
      </b>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name={name !== "discountTakeAway" ? "paybycash" : "isEnabled"}
          label=""
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: t("turn_on_or_off"),
            },
          ]}
        >
          <Switch />
        </Form.Item>
        {name !== "discountTakeAway" || !discountTakeAway.isEnabled ? null : (
          <Form.Item
            name="amount"
            label="Korting"
            rules={[
              {
                required: true,
                message: t("choose_discount_value"),
              },
            ]}
          >
            <Select placeholder={t("products_discount_placeholder")}>
              {discountOptions}
            </Select>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PaybycashForm;
