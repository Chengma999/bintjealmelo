import React, { useEffect } from "react";
import { Form, Switch, Button } from "antd";
import gegevens from "Utilities/gegevens";
import { useTranslation } from "react-i18next";
const { restaurant_id } = gegevens;

const ZsmForm = ({ zsm, updateZsm }) => {
  const { t } = useTranslation();
  const { takeaway, delivery } = zsm;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateZsm(values);
  };
  useEffect(() => {
    form.setFieldsValue({ takeaway, delivery });
  }, [takeaway, delivery]);
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="takeaway"
          label={
            <div style={{ textTransform: "capitalize" }}>{t("pick-up")}</div>
          }
          rules={[
            {
              required: true,
              message: "Kies een of meer betaalmethoden voor afhalen.",
            },
          ]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="delivery"
          label={
            <div style={{ textTransform: "capitalize" }}>{t("delivery")}</div>
          }
          rules={[
            {
              required: true,
              message: "Kies een of meer betaalmethoden voor bezorgen.",
            },
          ]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ZsmForm;
