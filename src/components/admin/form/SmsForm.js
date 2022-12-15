import React from "react";
import { Form, Select, Button, Spin, Result } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = (
  <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
);
const { Option } = Select;

let arr = [];
for (let i = 2; i < 13; i++) {
  arr.push(i * 5);
}
const CalculateEndTime = (takeTime, addMinutes) => {
  let newTime = moment(takeTime, "HH:mm", true);
  newTime.add(addMinutes, "minutes");
  return newTime.format("HH:mm");
};

class SmsForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  onFinish = (values) => {
    const {
      number,
      email,
      orderId,
      orderType,
      sendMail,
      takeTime,
      customerName,
    } = this.props;
    values.number = number;
    values.email = email;
    values.orderId = orderId;
    values.orderType = orderType;
    values.customerName = customerName;
    values.end_time = CalculateEndTime(takeTime, values.wait_time);
    console.log("Received values of form: ", values);
    sendMail(values);
  };

  render() {
    const { orderId, takeTime } = this.props;
    const options = arr.map((ele) => {
      const end_time = CalculateEndTime(takeTime, ele);

      return (
        <Option value={ele}>
          {end_time} (+ {ele} minuten ){" "}
        </Option>
      );
    });

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form
        {...formItemLayout}
        onFinish={this.onFinish}
        initialValues={{
          wait_time: 10,
        }}
      >
        <Form.Item
          name="wait_time"
          label="Verwachte tijd"
          rules={[{ required: true, message: "Kies een verwachte tijd!" }]}
        >
          <Select>{options}</Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Verzenden
          </Button>
        </Form.Item>
        {this.props.loading.effects["admincrud/sms_send"] === true ? (
          <Spin indicator={antIcon} />
        ) : this.props.admincrud["mail" + orderId] === undefined ? (
          ""
        ) : this.props.admincrud["mail" + orderId].isSucceeded === true ? (
          <div>
            <Result status="success" title="Verzending gelukt!" />
          </div>
        ) : (
          <div>
            <Result
              status="error"
              title="Niet gelukt.."
              subTitle={this.props.admincrud["mail" + orderId].error}
            />
          </div>
        )}
      </Form>
    );
  }
}

export default SmsForm;
