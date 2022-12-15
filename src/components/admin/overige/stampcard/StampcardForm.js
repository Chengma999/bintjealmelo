import React, { useState, useEffect } from "react";
import { Form, Button, Switch, InputNumber, Select } from "antd";
import gegevens from "Utilities/gegevens";
import {
  numberOfWeeks,
  pointValueArr,
  fullcardPointsArr,
  fullcardValueArr,
} from "Utilities/toolStore";
import { t } from "i18next";
const { restaurant_id } = gegevens;
const { Option } = Select;
export default function StampcardForm({ stampcard, updateStampcard }) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onChange = (value) => {
    setVisible(value);
  };
  useEffect(() => {
    form.setFieldsValue({
      isEnabled: stampcard.isEnabled,
      pointValue: stampcard.pointValue,
      fullcardPoints: stampcard.fullcardPoints,
      fullcardValue: stampcard.fullcardValue,
    });
    setVisible(stampcard.isEnabled);
  }, [
    stampcard.isEnabled,
    stampcard.pointValue,
    stampcard.fullcardPoints,
    stampcard.fullcardValue,
  ]);

  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    console.log(values);
    updateStampcard(values);
  };

  const pointValueOptions = pointValueArr().map((num) => (
    <Option value={num}>{num} euro</Option>
  ));
  const fullcardPointsOptions = fullcardPointsArr().map((num) => (
    <Option value={num}>
      {num} {num > 1 ? "punten" : "punt"}
    </Option>
  ));
  const fullcardValueOptions = fullcardValueArr().map((num) => (
    <Option value={num}>
      {num >= 1 ? `€ ${num} korting` : `${(num * 100).toFixed(0)}% korting`}
    </Option>
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
            name="pointValue"
            label={t("pointValueLabel")}
            rules={[
              {
                required: true,
                message: "Selecteer een optie!",
              },
            ]}
          >
            <Select>{pointValueOptions}</Select>
          </Form.Item>
        )}

        {!visible ? null : (
          <Form.Item
            name="fullcardPoints"
            label={t("fullcardPointsLabel")}
            rules={[
              {
                required: true,
                message: "Selecteer een optie!",
              },
            ]}
          >
            <Select>{fullcardPointsOptions}</Select>
          </Form.Item>
        )}
        {!visible ? null : (
          <Form.Item
            name="fullcardValue"
            label={t("fullcardValueLabel")}
            rules={[
              {
                required: true,
                message: "Selecteer een optie!",
              },
            ]}
          >
            <Select>{fullcardValueOptions}</Select>
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
