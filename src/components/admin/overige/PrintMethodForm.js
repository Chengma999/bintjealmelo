import React, { useEffect } from "react";
import { Form, Switch, Button, Input } from "antd";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;

const PrintMethodForm = ({
  printMethod,
  updatePrintMethod,
  deletePrintMethod,
}) => {
  const { printWithoutSoftware, targetIp, printOnlyKitchen } = printMethod;
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    values.restaurant_id = restaurant_id;
    updatePrintMethod(values);
  };
  useEffect(() => {
    form.setFieldsValue({ printWithoutSoftware, targetIp, printOnlyKitchen });
  }, [printWithoutSoftware, targetIp, printOnlyKitchen]);
  return (
    <div>
      <b>{printWithoutSoftware ? "AAN" : "UIT"}</b>
      <Form name="basic" form={form} onFinish={onFinish}>
        <Form.Item
          name="printWithoutSoftware"
          label="Raw printing (modem)"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        {printWithoutSoftware ? (
          <Form.Item
            name="targetIp"
            label="Ipadres"
            rules={[
              {
                required: true,
                message: "Vul Ipadres in!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : null}
        <Form.Item
          name="printOnlyKitchen"
          label="Print alleen keukenbon"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {
          // <Button type="error" onClick={deletePrintMethod}>
          //   Clear
          // </Button>
        }
      </Form>
    </div>
  );
};

export default PrintMethodForm;
