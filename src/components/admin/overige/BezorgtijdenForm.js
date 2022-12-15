import React, { useEffect } from "react";
import { Form, Select, Button } from "antd";
import gegevens from "Utilities/gegevens";
import moment from "moment";
const { restaurant_id } = gegevens;
const { Option } = Select;

const arr = [];
const a = 8;
const n = 23.75;
const index = (n - a) / 0.25;
for (let i = 0; i < index + 1; i++) {
  arr.push(a + i * 0.25);
}

const BezorgtijdenForm = ({ bezorgtijden, updateBezorgtijden }) => {
  const { begin, end } = bezorgtijden;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateBezorgtijden(values);
  };
  const optionsArr = arr.map((time, i) => {
    const label = moment(
      (Math.floor(time) * 100 + (time - Math.floor(time)) * 60).toString(),
      "hmm"
    ).format("HH:mm");
    return (
      <Option value={time} key={i}>
        {label}
      </Option>
    );
  });
  useEffect(() => form.setFieldsValue({ begin, end }), [begin, end]);

  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          label="begin"
          name="begin"
          rules={[
            {
              required: true,
              message: "Vul beginbezorgtijd in!",
            },
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>
        <Form.Item
          label="eind"
          name="end"
          rules={[
            {
              required: true,
              message: "Vul eindbezorgtijd in!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("begin") < value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "Eindtijd moet later zijn dan begintijd!"
                );
              },
            }),
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BezorgtijdenForm;
