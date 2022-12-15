import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Select, Button, Radio } from "antd";
import styles from "../../../css/form.less";
import bankIssuers from "./options/bankIssuerOptions";
import takeTime from "./options/timeOptions";
import moment from "moment";
import { daysOptions } from "./options/timeOptions";
import KortingcodeForm from "./KortingcodeForm";
import { changeURLArg } from "./changeURLArg";
import { CloseDays } from "Utilities/close";
import gegevens, { changeFormat } from "Utilities/gegevens";
import PayMethodFormItem from "./PayMethodFormItem";
import BankIssuersFormItem from "./BankIssuersFormItem";
const { restaurant_id } = gegevens;
const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};
let selectOptions = [];
const AfhaalForm = (props) => {
  const {
    discountAmount,
    orderId,
    onDisable,
    disabled,
    transactiekosten,
    closeday,
    radioValue,
    setRadioValue,
    openingstijden,
    paybycash,
    site,
    timeInterval,
    waitingTimeFirstOrder,
    limitedNumberOfOrders,
    orderedOrders,
    locale,
    enterDiscountcode,
    basket,
    payMethod,
    zsmTakeaway,
    calTotalPrice,
    _closeday,
    t,
  } = props;
  const rules = {
    email: [
      {
        type: "email",
        message: t("error_invalid_email"),
      },
      {
        required: true,
        message: t("error_empty_email"),
      },
    ],
    name: [
      {
        required: true,
        message: t("error_name"),
      },
    ],
    number: [
      {
        required: true,
        message: t("error_number"),
      },
    ],
    delevertime: [
      {
        required: true,
        message: t("error_afhaaltijd"),
      },
    ],
    bankissuers: [
      {
        required: true,
        message: t("error_bank"),
      },
    ],
    paymethod: [
      {
        required: true,
        message: t("error_paymethod"),
      },
    ],
  };

  const [err, setErr] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(payMethod[0]);
    form.setFieldsValue({ paymethod: payMethod[0] });
    setRadioValue(payMethod[0]);
  }, [payMethod[0]]);
  const onChangeRadioValue = ({ target }) => {
    setRadioValue(target.value);
  };

  const onFinish = async (values) => {
    const closedayInstance = new CloseDays(_closeday, openingstijden);
    const extra_closed = closedayInstance.extra_closed();
    const normal_closed = closedayInstance.normal_closed();
    let { data } = await axios.get(
      `/api/checkorder/isPaid/${restaurant_id}?orderId=${orderId}`
    );
    if (extra_closed.closed) {
      setErr(
        `Vanaf ${moment(extra_closed.begin).format("DD-MM-YYYY")} t/m ${moment(
          extra_closed.end
        ).format("DD-MM-YYYY")} zijn we gesloten i.v.m. ${extra_closed.reason}.`
      );
    } else if (normal_closed) {
      const day = daysOptions.find((day) => day.value === moment().day());
      setErr(`Op ${day.text} zijn we gesloten.`);
    } else if (data.paid) {
      setErr(
        "Deze bestelling is al eerder geplaatst. Controleer s.v.p. je bevestigingsmail."
      );
    } else {
      onDisable();
      const totalPrice = await calTotalPrice({
        orderType: "afhalen",
        paymethod: radioValue,
        transactiekosten,
      });
      values.orderId = orderId;
      values.orderType = "afhalen";
      values.paymethod = radioValue;
      values.discountAmount = discountAmount;
      values.totalPrice = totalPrice;
      if (radioValue === "cash") {
        let { data } = await axios.post(`/api/submit/${restaurant_id}`, values);
        const { doc } = data;
        await axios.post(`/api/ready_to_pay/cash/${restaurant_id}`, {
          ...doc,
          totalPrice,
          discountAmount,
        });
        const redirectUrl =
          process.env.NODE_ENV === "production"
            ? `${site}/redirect?orderId=${doc.orderId}&restaurant_id=${restaurant_id}`
            : `http://localhost:${gegevens.port_client_test}/redirect?orderId=${doc.orderId}&restaurant_id=${restaurant_id}`;
        window.location.href = redirectUrl;
        return;
      }
      if (radioValue !== "cash") {
        values.transactiekosten = transactiekosten;
        let link =
          process.env.NODE_ENV === "production"
            ? `${site}/api/ready_to_pay/${restaurant_id}?orderId=${props.orderId}&paymethod=${values.paymethod}&selectedIssuer=${values.bankissuers}`
            : `http://localhost:${gegevens.port_express}/api/ready_to_pay/${restaurant_id}?orderId=${props.orderId}&paymethod=${values.paymethod}&selectedIssuer=${values.bankissuers}`;
        const { data } = await axios.post(
          `/api/submit/${restaurant_id}`,
          values
        );
        link = await changeURLArg(link, "totalPrice", totalPrice);
        link = await changeURLArg(link, "orderType", "afhalen");
        link = await changeURLArg(link, "discountAmount", discountAmount);
        window.location.href = link;
      }
    }
  };
  const onFinishFailed = async ({ values }) => {
    let { data } = await axios.get(
      `/api/checkorder/isPaid/${restaurant_id}?orderId=${orderId}`
    );
    // if (closeday.includes(moment().day())) {
    //   const day = daysOptions.find((day) => day.value === moment().day());
    //   setErr(`Op ${day} zijn we gesloten m.u.v feestdagen.`);
    // }
    if (data.paid) {
      setErr(
        "Deze bestelling is al eerder geplaatst. Controleer s.v.p. je bevestigingsmail."
      );
    }
    console.log(values);
  };

  const foundIndex = openingstijden.findIndex(
    (openingstijd) => openingstijd.day === moment().day()
  );
  if (foundIndex > -1) {
    const begin =
      openingstijden[foundIndex] !== undefined
        ? openingstijden[foundIndex].begin
        : 16;
    const end =
      openingstijden[foundIndex] !== undefined
        ? openingstijden[foundIndex].end
        : 20;

    selectOptions = takeTime({
      begin,
      end,
      timeInterval,
      waitingTimeFirstOrder,
      limitedNumberOfOrders,
      orderedOrders,
      zsmTakeaway,
    });
  }
  const secondIndex = openingstijden
    .map((item) => item.day)
    .indexOf(
      moment().day(),
      openingstijden.map((item) => item.day).indexOf(moment().day()) + 1
    );
  if (foundIndex > -1 && secondIndex > -1) {
    const begin = openingstijden[secondIndex].begin;

    const end = openingstijden[secondIndex].end;
    selectOptions = selectOptions.concat(
      takeTime({
        begin,
        end,
        timeInterval,
        waitingTimeFirstOrder,
        limitedNumberOfOrders,
        orderedOrders,
        zsmTakeaway,
      })
    );
  }
  selectOptions = selectOptions.map((item, i) => {
    return (
      <Option value={item.value} key={i} disabled={item.available < 1}>
        {item.text +
          (item.available < 1 ? " HELAAS NIET MEER BESCHIKBAAR..." : "")}
      </Option>
    );
  });

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="checkoutAfhaal"
      // initialValues={{ paymethod: locale === "BE" ? "bancontact" : "ideal" }}
      // initialValues={{ paymethod: payMethod[0] }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <div className={styles.checkoutstep}>{t("Hoe ben je te bereiken ?")}</div>
      <div className={styles.fieldName}>
        <Form.Item name="name" label={t("Naam")} rules={rules.name} hasFeedback>
          <Input />
        </Form.Item>
      </div>
      <div className={styles.fieldEmail}>
        <Form.Item
          name="email"
          label={t("E-mail")}
          rules={rules.email}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </div>
      <div className={styles.fieldTelNumber}>
        <Form.Item
          name="number"
          label={t("Telefoonnummer")}
          rules={rules.number}
          hasFeedback
        >
          <Input type="number" />
        </Form.Item>
      </div>

      <div className={styles.fieldCompName}>
        <Form.Item name="compName" label={t("Bedrijfsnaam")}>
          <Input />
        </Form.Item>
      </div>
      <div className={styles.checkoutstep}>
        {t("Hoe laat wil je het eten afhalen ?")}
      </div>
      <div className={styles.fieldDelevertime}>
        <Form.Item
          name="delevertime"
          label={t("Gewenste afhaaltijd")}
          rules={rules.delevertime}
          hasFeedback
        >
          <Select>{selectOptions}</Select>
        </Form.Item>
      </div>

      <div className={styles.fieldNotes}>
        <Form.Item name="notes" label={t("Opmerking voor ons restaurant")}>
          <TextArea placeholder={t(gegevens.opmerking_place_holder)} />
        </Form.Item>
      </div>
      <PayMethodFormItem
        styles={styles}
        rules={rules}
        onChangeRadioValue={onChangeRadioValue}
        payMethod={payMethod}
        t={t}
      />

      <BankIssuersFormItem
        rules={rules}
        styles={styles}
        radioValue={radioValue}
        bankIssuers={bankIssuers}
        transactiekosten={transactiekosten}
        changeFormat={changeFormat}
        t={t}
      />
      <KortingcodeForm
        enterDiscountcode={enterDiscountcode}
        basket={basket}
        deliveryMethod="afhalen"
        t={t}
      />
      <div className={styles.error}>{err && err} </div>
      <Form.Item {...tailFormItemLayout} className={styles.fieldFormButton}>
        <Button type="primary" htmlType="submit" disabled={disabled}>
          {t("nu kopen")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AfhaalForm;
