import React, { useState, useEffect } from "react";
import { Form, Button, Switch, InputNumber, Select } from "antd";
import gegevens from "Utilities/gegevens";
import { numberOfWeeks } from "Utilities/toolStore";
const { restaurant_id } = gegevens;
const { Option } = Select;
export default function PlasticTasForm({
  orderinadvance,
  updateOrderInAdvance,
}) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onChange = (value) => {
    setVisible(value);
  };
  useEffect(() => {
    form.setFieldsValue({
      isEnabled: orderinadvance.isEnabled,
      period: orderinadvance.period,
    });
    setVisible(orderinadvance.isEnabled);
  }, [orderinadvance.isEnabled, orderinadvance.period]);

  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    // console.log(values);
    updateOrderInAdvance(values);
  };
  const selectOptions = numberOfWeeks().map((num) => (
    <Option value={num}>{num + " week"}</Option>
  ));
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="isEnabled"
          label="status"
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
        {!visible ? null : (
          <Form.Item
            name="period"
            label="periode"
            rules={[
              {
                required: true,
                message: "Selecteer een periode!",
              },
            ]}
          >
            <Select>{selectOptions}</Select>
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
