import React, { useState, useEffect } from "react";
import { Form, Button, Switch, InputNumber } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default function PlasticTasForm({ plastictas, updatePlasticTas }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onChange = (value) => {
    setVisible(value);
  };
  useEffect(() => {
    form.setFieldsValue({
      isEnabled: plastictas.isEnabled,
      fee: plastictas.fee,
    });
    setVisible(plastictas.isEnabled);
  }, [plastictas.isEnabled, plastictas.fee]);

  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    // console.log(values);
    updatePlasticTas(values);
  };
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          label="status"
          name="isEnabled"
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
            label="kosten"
            name="fee"
            rules={[
              {
                required: true,
                message: "Vul fee in!",
              },
            ]}
          >
            <InputNumber step={0.01} />
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
