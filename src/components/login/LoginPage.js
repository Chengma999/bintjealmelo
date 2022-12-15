import React, { useState } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import styles from "../../css/login.less";

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 6, span: 12 },
  },
};

const LoginPage = ({ logIn, login }) => {
  const { token, errorText } = login;
  const onFinish = async (values) => {
    logIn(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.form}>
      <h1>Inloggen </h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Gebruikersnaam"
          name="username"
          rules={[
            {
              required: true,
              message: "Vul je gebruikersnaam in!",
            },
          ]}
        >
          <Input placeholder="gebruikersnaam" />
        </Form.Item>

        <Form.Item
          label="Wachtwoord"
          name="password"
          rules={[
            {
              required: true,
              message: "Vul je wachtwoord in!",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
          <div className={styles.error}>{!token ? errorText : null}</div>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" block htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
