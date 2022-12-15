import React, { useEffect } from "react";
import { Form, Select, Button } from "antd";
import gegevens from "Utilities/gegevens";
import { useTranslation } from "react-i18next";
const { restaurant_id } = gegevens;
const { Option } = Select;

const arrTimeInterval = [1 / 12, 1 / 6, 1 / 4];
let arrWaitingTimeFirstOrder = [];
for (let i = 1; i < 16; i++) {
  arrWaitingTimeFirstOrder.push((i * 5) / 60);
}
let arrLimitedNumberOfOrders = [];
for (let i = 0; i < 16; i++) {
  arrLimitedNumberOfOrders.push(i);
}

const TimeIntervalForm = ({ timeInterval, updateTimeInterval, component }) => {
  const { t } = useTranslation();
  const constructArr = (arr) =>
    arr.map((time, i) => {
      const label = time * 60 + " minuten";
      return (
        <Option value={time} key={i}>
          {label}
        </Option>
      );
    });
  const { takeaway, delivery } = timeInterval;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updateTimeInterval(values);
  };
  const optionsArr =
    component === "timeInterval"
      ? constructArr(arrTimeInterval)
      : component === "waitingTimeFirstOrder"
      ? constructArr(arrWaitingTimeFirstOrder)
      : arrLimitedNumberOfOrders.map((num, i) => (
          <Option key={i} value={num}>
            {num}
          </Option>
        ));

  useEffect(() => {
    form.setFieldsValue({ takeaway, delivery });
  }, [takeaway, delivery]);

  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          label={
            <div style={{ textTransform: "capitalize" }}>{t("pick-up")}</div>
          }
          name="takeaway"
          rules={[
            {
              required: true,
              message:
                component === "timeInterval"
                  ? "Vul tijdsinterval voor afhalen in!"
                  : component === "waitingTimeFirstOrder"
                  ? "Vul wachttijd voor eerste bestelling voor afhalen in!"
                  : "Vul aantal bestellingen per tijdstip voor afhalen in!",
            },
          ]}
        >
          <Select>{optionsArr}</Select>
        </Form.Item>
        <Form.Item
          label={
            <div style={{ textTransform: "capitalize" }}>{t("delivery")}</div>
          }
          name="delivery"
          rules={[
            {
              required: true,
              message:
                component === "timeInterval"
                  ? "Vul tijdsinterval voor bezorgen in!"
                  : component === "waitingTimeFirstOrder"
                  ? "Vul wachttijd voor eerste bestelling voor bezorgen in!"
                  : "Vul aantal bestellingen per tijdstip voor bezorgen in!",
            },
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

export default TimeIntervalForm;
