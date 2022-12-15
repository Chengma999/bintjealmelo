import React, { useEffect } from "react";
import { Form, Switch, Button } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;

const BezorgstatusForm = ({
  bezorgstatus,
  updateBezorgstatus,
  t,
  UppercaseFC,
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateBezorgstatus(values);
  };
  useEffect(() => {
    form.setFieldsValue({ bezorgstatus });
  }, [bezorgstatus]);
  return (
    <div>
      <b>{bezorgstatus ? UppercaseFC(t("on")) : UppercaseFC(t("off"))}</b>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item name="bezorgstatus" label="" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BezorgstatusForm;
