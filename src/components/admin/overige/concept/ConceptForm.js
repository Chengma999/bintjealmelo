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
function ConceptForm({ concept, updateConcept }) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    updateConcept(values);
  };
  useEffect(() => {
    console.log(concept);
    form.setFieldsValue({ ...concept });
  });
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="introduction"
          label="Introductie"
          {...layout}
          rules={[
            {
              required: true,
              message: "Vul je introductie in !",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="menu1"
          label="Titel 1"
          {...layout}
          rules={[
            {
              required: true,
              message: "Vul je titel 1 in!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price1"
          label="concept prijs 1"
          {...layout}
          rules={[
            {
              required: true,
              message: "Vul je concept prijs 1 in !",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="menu2" label="Titel 2" {...layout}>
          <Input />
        </Form.Item>
        <Form.Item name="price2" label="Prijs 2" {...layout}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="remark" label="opmerking" {...layout}>
          <Input.TextArea />
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

export default ConceptForm;
