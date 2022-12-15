import React, { useEffect } from "react";
import { Form, Select, Button } from "antd";
import gegevens from "Utilities/gegevens";
import moment from "moment";
import { daysOptions } from "../../checkout/form/options/timeOptions";
const { restaurant_id } = gegevens;
const { Option } = Select;

const ClosedayForm = ({ closeday, updateCloseday }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    console.log(values);
    updateCloseday(values);
  };
  const optionsArr = daysOptions.map((day, i) => {
    return (
      <Option value={day.value} key={i}>
        {day.text}
      </Option>
    );
  });
  useEffect(() => {
    if (closeday !== undefined && Array.isArray(closeday)) {
      form.setFieldsValue({ closeday });
    }
  }, [closeday]);
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="closeday"
          rules={[
            {
              required: true,
              message: "Kies de dag wanneer je gesloten bent!",
            },
          ]}
        >
          <Select mode="multiple">{optionsArr}</Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ClosedayForm;
