import React, { useEffect } from "react";
import { Form, Button, Input, InputNumber } from "antd";
import moment from "moment";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
const AfhaaltextForm = (props) => {
  const { text, updateText, name } = props;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateText(values);
  };
  useEffect(() => form.setFieldsValue({ text }), [text]);
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="text"
          rules={[
            {
              required: true,
              message: "Vul iets in!",
            },
          ]}
        >
          {name === "transactieKosten" ? <InputNumber /> : <Input.TextArea />}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AfhaaltextForm;
