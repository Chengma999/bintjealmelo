import React, { useEffect } from "react";
import { Form, Button, Input, InputNumber, Select } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
const { Option } = Select;
const ThemeColorForm = (props) => {
  const { ele, updateEle, name } = props;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateEle(values);
  };
  useEffect(() => {
    form.setFieldsValue({ ele });
  }, [ele]);

  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="ele"
          rules={[
            {
              required: true,
              message: "Vul iets in!",
            },
          ]}
        >
          {name === "transactieKosten" ? (
            <InputNumber />
          ) : name === "themeColor" ? (
            <Select>
              <Option value="#1371fa">Blauw</Option>
              <Option value="#6f1c75">Paars</Option>
            </Select>
          ) : (
            <Input />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ThemeColorForm;
