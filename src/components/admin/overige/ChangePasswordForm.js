import React, { useEffect } from "react";
import { Form, Button, Input, Result } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
const ChangePasswordForm = (props) => {
  const { password, updatePassword, clearPasswordResult, t } = props;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updatePassword(values);
  };
  useEffect(() => {
    return function () {
      const payload = { isSucceed: null };
      clearPasswordResult(payload);
    };
  }, []);
  return (
    <div>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="oldpassword"
          label={
            <div style={{ textTransform: "capitalize" }}>
              {t("old_password")}{" "}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Vul je oude wachtwoord in!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newpassword"
          label={
            <div style={{ textTransform: "capitalize" }}>
              {t("new_password")}{" "}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Vul je nieuwe wachtwoord in!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={
            <div style={{ textTransform: "capitalize" }}>
              {t("confirm_password")}{" "}
            </div>
          }
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Bevestig je wachtwoord!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newpassword") === value) {
                  return Promise.resolve();
                }

                return Promise.reject("Twee wachtwoorden zijn niet hetzelfde!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
      {password.isSucceed === null ? null : (
        <Result
          status={password.isSucceed ? "success" : "error"}
          subTitle={
            password.isSucceed
              ? "Wachtwoord gewijzigd."
              : "De oude wachtwoord is onjuist."
          }
        />
      )}
    </div>
  );
};

export default ChangePasswordForm;
