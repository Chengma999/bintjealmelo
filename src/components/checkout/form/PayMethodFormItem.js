import React from "react";
import { Radio, Form } from "antd";
function PayMethodFormItem({
  rules,
  styles,
  onChangeRadioValue,
  payMethod,
  t,
}) {
  const arr = [
    {
      value: "ideal",
      name: "IDEAL",
      src: "https://mollie.com/external/icons/payment-methods/ideal.svg",
    },
    {
      value: "bancontact",
      name: "BANCONTACT",
      src: "https://mollie.com/external/icons/payment-methods/bancontact.svg",
    },
    {
      value: "cash",
      name: t("contant"),
      src: "https://i.ibb.co/1KKvyWQ/cash.png",
    },
    {
      value: "creditcard",
      name: "CREDIT CARD",
      src: "https://mollie.com/external/icons/payment-methods/creditcard.svg",
    },
    {
      value: "paypal",
      name: "PAYPAL",
      src: "https://mollie.com/external/icons/payment-methods/paypal.svg",
    },
    {
      value: "applepay",
      name: "APPLE PAY",
      src: "https://mollie.com/external/icons/payment-methods/applepay.svg",
    },
  ];
  const optionArr = payMethod.map((item, i) => {
    const index = arr.findIndex((ele) => ele.value === item);
    return (
      <Radio.Button value={arr[index].value}>
        <img src={arr[index].src} width={60} alt={arr[index].name} />
        <div>{arr[index].name}</div>
      </Radio.Button>
    );
  });
  return (
    <div className={styles.fieldRadioButton}>
      <div style={{ clear: "both" }}></div>
      <Form.Item
        name="paymethod"
        label={t("Betaalmethode")}
        rules={rules.paymethod}
      >
        <Radio.Group
          onChange={onChangeRadioValue}
          buttonStyle="solid"
          style={{ marginTop: 16 }}
        >
          {optionArr}
          {
            // {locale === "BE" ? (
            //   <Radio.Button value="bancontact">
            //     <img src="https://i.imgur.com/QWTzCRG.png" width="60" />
            //     <div>BANCONTACT</div>
            //   </Radio.Button>
            // ) : (
            //   <Radio.Button value="ideal">
            //     <img src="https://i.ibb.co/BjQLW89/ideal.png" width="60" />
            //     <div>IDEAL</div>
            //   </Radio.Button>
            // )}
            // {!paybycash ? null : (
            //   <Radio.Button value="cash">
            //     <img src="https://i.ibb.co/3fVZwbQ/cash.png" width="60" />
            //     <div>CONTANT/PIN</div>
            //   </Radio.Button>
            // )}
          }
        </Radio.Group>
      </Form.Item>
    </div>
  );
}

export default PayMethodFormItem;
