import React, { useEffect } from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import moment from "moment";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
const { Option } = Select;
const standaardText =
  "Bij veranderingen of annulering van uw reservering, dient u minimaal 45 minuten vóór de gereserveerde tijdstip telefonisch door te geven.";
const standaardBevestiginsText = "Bedankt voor uw reservering!";
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
// begin time and end time
const arr = [];
const a = 8;
const n = 23.75;
const index = (n - a) / 0.25;
for (let i = 0; i < index + 1; i++) {
  arr.push(a + i * 0.25);
}
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
// time interval
const arrTimeInterval = [
  1 / 12,
  1 / 6,
  1 / 4,
  1 / 2,
  3 / 4,
  1,
  3 / 2,
  2,
  5 / 2,
  11 / 4,
  3,
];
const arrTimeIntervalOptions = arrTimeInterval.map((time, i) => {
  const label = time * 60 + " minuten";
  return (
    <Option value={time} key={i}>
      {label}
    </Option>
  );
});
function ReservationForm({ reservation, updateReservation }) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    updateReservation(values);
  };
  useEffect(() => {
    form.setFieldsValue({ ...reservation });
  });
  return (
    <div>
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        initialValues={{
          available: true,
          text: standaardText,
          confirm_text: standaardBevestiginsText,
        }}
      >
        <Form.Item
          name="available"
          label="Beschikbaar"
          {...layout}
          rules={[
            {
              required: true,
              message: "kies aan of uit!",
            },
          ]}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="begintime"
          label="Begintijd"
          {...layout}
          rules={[
            {
              required: true,
              message: "Kies je optie!",
            },
          ]}
        >
          <Select style={{ width: 200 }}>{optionsArr}</Select>
        </Form.Item>
        <Form.Item
          name="endtime"
          label="Eindtijd"
          {...layout}
          rules={[
            {
              required: true,
              message: "Kies je optie!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || value > getFieldValue("begintime")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "Eindtijd moet groter zijn dan begintijd!"
                );
              },
            }),
          ]}
        >
          <Select style={{ width: 200 }}>{optionsArr}</Select>
        </Form.Item>
        <Form.Item
          name="timeinterval"
          label="Tijdsinterval"
          {...layout}
          rules={[
            {
              required: true,
              message: "Kies je optie!",
            },
          ]}
        >
          <Select style={{ width: 200 }}>{arrTimeIntervalOptions}</Select>
        </Form.Item>
        <Form.Item name="text" label="Tekst" {...layout}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="confirm_text" label="Bevestigingstekst" {...layout}>
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

export default ReservationForm;
