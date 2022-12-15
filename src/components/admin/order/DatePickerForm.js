import React from "react";
import { Form, Button, DatePicker } from "antd";
import styles from "../../../css/form.less";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 4, span: 16 },
  },
};

const DatePickerForm = ({ t, onFinish, onChange }) => {
  return (
    <Form {...layout} name="basic" onFinish={onFinish}>
      <div className={styles.datePicker}>
        <Form.Item
          label={t("choose_date")}
          name="date"
          rules={[
            {
              required: true,
              message: t("choose_date"),
            },
          ]}
        >
          <DatePicker
            format={dateFormatList}
            onChange={onChange}
            placeholder="vandaag"
            // value={this.state.value}
          />
        </Form.Item>
      </div>

      <Form.Item {...tailLayout}>
        <Button type="primary" block htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default DatePickerForm;
