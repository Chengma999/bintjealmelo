import React from "react";
import { Form, Button, DatePicker } from "antd";
import styles from "../../../css/form.less";

const dateFormatList = ["MM/YYYY", "MM/YY"];
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

const OmzetPrintForm = (props) => {
  const { onFinishDayReport, onFinishMonthReport, onChangeDatePicker, t } =
    props;
  return (
    <div style={{ width: "70%", margin: "auto", textAlign: "center" }}>
      <Form {...layout} name="dagelijks rapport">
        {
          // <Form.Item
          //   label=""
          //   name=""
          //   rules={[
          //     {
          //       required: true,
          //       message: "Kies een maand!",
          //     },
          //   ]}
          // ></Form.Item>
        }
        <Form.Item {...tailLayout}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            onClick={() => onFinishDayReport()}
          >
            {t("day_report")}
          </Button>
        </Form.Item>
      </Form>
      <Form
        {...layout}
        name="maandelijks rapport"
        onFinish={onFinishMonthReport}
      >
        <div className={styles.datePicker}>
          <Form.Item
            label={t("choose_month")}
            name="date"
            rules={[
              {
                required: true,
                message: t("choose_month"),
              },
            ]}
          >
            <DatePicker
              format={dateFormatList}
              picker="month"
              onChange={onChangeDatePicker}
              // value={this.state.value}
            />
          </Form.Item>
        </div>

        <Form.Item {...tailLayout}>
          <Button type="primary" block htmlType="submit">
            {t("month_report")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default OmzetPrintForm;
