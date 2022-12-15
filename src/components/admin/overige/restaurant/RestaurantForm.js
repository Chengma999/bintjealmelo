import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function RestaurantForm({ restaurant, updateRestaurantPage }) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    updateRestaurantPage(values);
  };
  useEffect(() => {
    console.log(restaurant);
    form.setFieldsValue({ ...restaurant });
  });
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="text"
          label="Tekst"
          {...layout}
          rules={[
            {
              required: true,
              message: "Vul je tekst in !",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="image"
          label="Afbeelding"
          {...layout}
          rules={[
            {
              required: true,
              message: "Vul je afbeelding link in!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RestaurantForm;
