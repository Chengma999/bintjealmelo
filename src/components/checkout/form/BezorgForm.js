import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Select, Button, Radio } from "antd";
import styles from "../../../css/form.less";
import bankIssuers from "./options/bankIssuerOptions";
import { daysOptions } from "./options/timeOptions";
import moment from "moment";
import gegevens, { changeFormat } from "Utilities/gegevens";
import { changeURLArg } from "./changeURLArg";
import { CloseDays } from "Utilities/close";
import takeTime from "./options/timeOptions";
import KortingcodeForm from "./KortingcodeForm";
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
const BezorgForm = (props) => {
  const {
    bezorggebied,
    payMethod,
    nettoPrice,
    calTotalPrice,
    orderId,
    onDisable,
    disabled,
    closeday,
    fee,
    transactiekosten,
    min_value,
    radioValue,
    setRadioValue,
    bezorgtijden,
    deliverytijden,
    site,
    timeInterval,
    waitingTimeFirstOrder,
    limitedNumberOfOrders,
    orderedOrders,
    locale,
    enterDiscountcode,
    basket,
    zsmDelivery,
    openingstijden,
    _closeday,
    t,
  } = props;
  const rules = {
    address: [
      {
        required: true,
        message: t("error_address"),
      },
      () => ({
        validator(rule, value) {
          if (!value || (value.match(/\d+/g) && value.match(/[a-z]|[A-Z]/g))) {
            return Promise.resolve();
          }
          if (!value.match(/[a-z]|[A-Z]/g)) {
            return Promise.reject(t("error_street"));
          }
          return Promise.reject(t("error_housenumber"));
        },
      }),
    ],
    postcode: [
      {
        required: true,
        message: t("error_postcode"),
      },
      () => ({
        validator(rule, value) {
          let bezorgchosen = Number(value.substring(0, 4));
          const index = bezorggebied.findIndex(
            (ele) => ele.postcode === bezorgchosen
          );
          if (
            !value ||
            (bezorggebied
              .map((e) => e.postcode.toString())
              .includes(value.substring(0, 4)) &&
              index > -1 &&
              [true, undefined].includes(bezorggebied[index].isEnabled) &&
              ![
                "5461LD",
                "5461XL",
                "5462GH",
                "5462JA",
                "5463LC",
                "5463PH",
                "5463XD",
                "5464TB",
                "5464VG",
                "5464RD",
                "5464WG",
              ].includes(
                value.replace(/\s+/g, "").toUpperCase().substring(0, 6)
              ))
          ) {
            props.chooseBezorgGebied({
              bezorgchosen,
            });
            return Promise.resolve();
          }
          if (index > -1 && bezorggebied[index].isEnabled === false) {
            return Promise.reject(
              t("postcode_turned_off", {
                postcode: value
                  .replace(/\s+/g, "")
                  .toUpperCase()
                  .substring(0, 6),
                restaurantName: props.restaurantName,
              })
            );
          }
          return Promise.reject(
            t("postcode_unable_delivery", {
              restaurantName: props.restaurantName,
              postcode: value.replace(/\s+/g, "").toUpperCase().substring(0, 6),
            })
          );
        },
      }),
    ],
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
        message: t("error_bezorgtijd"),
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

  // const { begin, end } = bezorgtijden;
  const [err, setErr] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
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
    } else if (nettoPrice < min_value) {
      setErr(
        `Minimum bestelbedrag (${changeFormat(
          min_value
        )}) voor het bezorgen naar door u gekozen postcode niet bereikt.`
      );
    }

    // else if (closeday.includes(moment().day())) {
    //   const day = daysOptions.find((day) => day.value === moment().day());
    //   setErr(`Op ${day.text} zijn we gesloten m.u.v feestdagen.`);
    // }
    else if (data.paid) {
      setErr(
        "Deze bestelling is al eerder geplaatst. Controleer s.v.p. je bevestigingsmail."
      );
    } else {
      onDisable();
      const totalPrice = await calTotalPrice({
        orderType: "bezorgen",
        paymethod: radioValue,
        transactiekosten,
        deliveryFee: fee,
      });
      values.orderId = orderId;
      values.orderType = "bezorgen";
      values.totalPrice = totalPrice;
      values.paymethod = radioValue;
      values.deliveryFee = fee;
      if (radioValue === "cash") {
        let { data } = await axios.post(`/api/submit/${restaurant_id}`, values);
        const { doc } = data;
        await axios.post(`/api/ready_to_pay/cash/${restaurant_id}`, {
          ...doc,
          totalPrice,
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
        const { doc } = data;
        link = await changeURLArg(link, "totalPrice", doc.totalPrice);
        link = await changeURLArg(link, "orderType", "bezorgen");
        window.location.href = link;
      }
    }
  };
  const foundIndex = deliverytijden.findIndex(
    (tijd) => tijd.day === moment().day()
  );
  if (foundIndex > -1) {
    const begin =
      deliverytijden[foundIndex] !== undefined
        ? deliverytijden[foundIndex].begin
        : 16;
    const end =
      deliverytijden[foundIndex] !== undefined
        ? deliverytijden[foundIndex].end
        : 20;

    selectOptions = takeTime({
      begin,
      end,
      timeInterval,
      waitingTimeFirstOrder,
      limitedNumberOfOrders,
      orderedOrders,
      zsmDelivery,
    });
  }
  const secondIndex = deliverytijden
    .map((item) => item.day)
    .indexOf(
      moment().day(),
      deliverytijden.map((item) => item.day).indexOf(moment().day()) + 1
    );
  if (foundIndex > -1 && secondIndex > -1) {
    const begin = deliverytijden[secondIndex].begin;

    const end = deliverytijden[secondIndex].end;
    selectOptions = selectOptions.concat(
      takeTime({
        begin,
        end,
        timeInterval,
        waitingTimeFirstOrder,
        limitedNumberOfOrders,
        orderedOrders,
        zsmDelivery,
      })
    );
  }
  selectOptions = selectOptions.map((item) => {
    return (
      <Option value={item.value} disabled={item.available < 1}>
        {item.text +
          (item.available < 1 ? " HELAAS NIET MEER BESCHIKBAAR..." : "")}
      </Option>
    );
  });

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="checkoutBezorgen"
      // initialValues={{ paymethod: locale === "BE" ? "bancontact" : "ideal" }}
      onFinish={onFinish}
      scrollToFirstError
    >
      <div className={styles.checkoutstep}>
        {t("Waar wil je dat je bestelling bezorgd wordt ?")}
      </div>
      <div className={styles.fieldAddress}>
        <Form.Item
          label={t("Straatnaam en huisnummer")}
          name="address"
          rules={rules.address}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </div>

      <div className={styles.fieldPostcode}>
        <Form.Item
          label={t("Postcode")}
          name="postcode"
          rules={rules.postcode}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </div>
      <div className={styles.fieldCityName}>
        <Form.Item label={t("Plaatsnaam")} name="plaatsnaam">
          <Input />
        </Form.Item>
      </div>
      <div className={styles.checkoutstep}>{t("Hoe ben je te bereiken ?")}</div>
      <div className={styles.fieldName}>
        <Form.Item label={t("Naam")} name="name" rules={rules.name} hasFeedback>
          <Input />
        </Form.Item>
      </div>
      <div className={styles.fieldEmail}>
        <Form.Item
          label={t("E-mail")}
          name="email"
          rules={rules.email}
          hasFeedback
        >
          <Input />
        </Form.Item>
      </div>
      <div className={styles.fieldTelNumber}>
        <Form.Item
          label={t("Telefoonnummer")}
          name="number"
          rules={rules.number}
          hasFeedback
        >
          <Input type="number" />
        </Form.Item>
      </div>
      <div className={styles.fieldCompName}>
        <Form.Item label={t("Bedrijfsnaam")} name="compName">
          <Input />
        </Form.Item>
      </div>
      <div className={styles.checkoutstep}>
        {t("Hoe laat wil je het eten ontvangen ?")}
      </div>

      <div className={styles.fieldDelevertime}>
        <Form.Item
          name="delevertime"
          label={t("Gewenste bezorgtijd")}
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
        deliveryMethod="bezorgen"
        t={t}
      />
      <div className={styles.error}>{err && err} </div>
      <Form.Item {...tailFormItemLayout} className={styles.fieldFormButton}>
        <Button type="primary" htmlType="submit" block disabled={disabled}>
          {t("nu kopen")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BezorgForm;
