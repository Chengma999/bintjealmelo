import React, { useState, useEffect } from "react";
import { Form, Button, Switch } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default function TipFom({ tip, updateShowtip }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onChange = (value) => {
    setVisible(value);
  };
  useEffect(() => {
    form.setFieldsValue({
      isEnabled: tip.isEnabled,
    });
    setVisible(tip.isEnabled);
  }, [tip.isEnabled]);

  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    // console.log(values);
    updateShowtip(values);
  };
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="isEnabled"
          label="stauts"
          rules={[
            {
              required: true,
              message: "Kies aan of uit!",
            },
          ]}
          valuePropName="checked"
        >
          <Switch onChange={onChange}></Switch>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
