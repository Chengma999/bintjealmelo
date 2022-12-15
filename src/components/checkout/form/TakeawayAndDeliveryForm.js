import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Select, Button, DatePicker } from "antd";
import styles from "../../../css/form.less";
import bankIssuers from "./options/bankIssuerOptions";
import { daysOptions } from "./options/timeOptions";
import moment from "moment";
import gegevens, { changeFormat } from "Utilities/gegevens";
import { changeURLArg } from "./changeURLArg";
import { CloseDays } from "Utilities/close";
import KortingcodeForm from "./KortingcodeForm";
import PayMethodFormItem from "./PayMethodFormItem";
import BankIssuersFormItem from "./BankIssuersFormItem";
import { TakeTimeOptions } from "Utilities/takeTimeOptions";
import { fooiArr, CapitalizeFC } from "Utilities/toolStore";
import locale from "Utilities/locale";
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
const TakeawayAndDeliveryForm = (props) => {
  const [takeTime, setTakeTime] = useState([]);
  const [chosenDate, setChosenDate] = useState(moment());
  const {
    orderType,
    discountAmount,
    orderId,
    onDisable,
    disabled,
    transactiekosten,
    radioValue,
    setRadioValue,
    openingstijden,
    site,
    timeInterval,
    waitingTimeFirstOrder,
    limitedNumberOfOrders,
    enterDiscountcode,
    basket,
    payMethod,
    zsmTakeaway,
    calTotalPrice,
    _closeday,
    t,
    bezorggebied,
    nettoPrice,
    fee,
    min_value,
    deliverytijden,
    zsmDelivery,
    showtip,
    selectTip,
    orderinadvance,
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
    tip: [
      {
        required: false,
      },
    ],
  };

  const [err, setErr] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ paymethod: payMethod[0] });
    setRadioValue(payMethod[0]);
  }, [payMethod[0]]);
  const onChangeRadioValue = ({ target }) => {
    setRadioValue(target.value);
  };

  const datePickerOnChange = (value) => {
    console.log(value);
    setChosenDate(moment(value._d));
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
    } else if (orderType === "bezorgen" && nettoPrice < min_value) {
      setErr(
        `Minimum bestelbedrag (${changeFormat(
          min_value
        )}) voor het bezorgen naar door u gekozen postcode niet bereikt.`
      );
    } else {
      onDisable();
      // const totalPrice = await calTotalPrice({
      //   orderType,
      //   paymethod: radioValue,
      //   transactiekosten,
      //   deliveryFee: fee,
      // });
      // console.log(basket.checkoutPrice);
      values.orderId = orderId;
      values.orderType = orderType;
      values.paymethod = radioValue;
      values.discountAmountByCode = basket.korting;
      if (orderType === "afhalen") {
        values.discountAmount = discountAmount;
      }
      values.totalPrice = basket.checkoutPrice;
      if (orderType === "bezorgen") {
        values.deliveryFee = fee;
      }
      if (radioValue === "cash") {
        values.transactiekosten = 0;
        let { data } = await axios.post(`/api/submit/${restaurant_id}`, values);
        const { doc } = data;
        let dataObj = {
          ...doc,
          totalPrice: basket.checkoutPrice,
          discountcode_id: basket.discountcode_id,
        };
        if (orderType === "afhalen") {
          dataObj.discountAmount = discountAmount;
        }
        await axios.post(`/api/ready_to_pay/cash/${restaurant_id}`, dataObj);
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
            ? `${site}/api/ready_to_pay/${restaurant_id}?orderId=${props.orderId}&paymethod=${values.paymethod}&selectedIssuer=${values.bankissuers}&discountcode_id=${basket.discountcode_id}`
            : `http://localhost:${gegevens.port_express}/api/ready_to_pay/${restaurant_id}?orderId=${props.orderId}&paymethod=${values.paymethod}&selectedIssuer=${values.bankissuers}&discountcode_id=${basket.discountcode_id}`;
        const { data } = await axios.post(
          `/api/submit/${restaurant_id}`,
          values
        );
        console.log(values);
        link = await changeURLArg(link, "totalPrice", basket.checkoutPrice);
        link = await changeURLArg(link, "orderType", orderType);
        if (orderType === "afhalen") {
          link = await changeURLArg(link, "discountAmount", discountAmount);
        }
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

  useEffect(async () => {
    const getTodayPaidOrders = async () => {
      const { data } = await axios.get(
        `/api/checkorder/getTodayPaidOrders/${restaurant_id}`
      );
      if (orderType === "bezorgen") {
        return data.delivery;
      }
      if (orderType === "afhalen") {
        return data.takeaway;
      }
    };
    const orderedOrders = await getTodayPaidOrders();

    const takeTimeOptions = new TakeTimeOptions(
      { openingstijden, deliverytijden, zsmDelivery, zsmTakeaway },
      orderType,
      {
        timeInterval,
        waitingTimeFirstOrder,
        limitedNumberOfOrders,
        orderedOrders,
      }
    );
    setTakeTime(takeTimeOptions.cal_select_tijden(chosenDate));
  }, [openingstijden, deliverytijden, orderType, JSON.stringify(chosenDate)]);
  useEffect(() => {
    form.resetFields(["delevertime"]);
  }, [orderType]);
  useEffect(() => {
    const cusInfo = localStorage.getItem("_hisight_cus_info");
    console.log(JSON.parse(cusInfo));
    if (cusInfo) {
      const {
        customerName,
        email,
        postcode,
        adres,
        cityname,
        telefoon,
        bedrijfsnaam,
      } = JSON.parse(cusInfo);
      form.setFieldsValue({
        name: customerName,
        email,
        postcode,
        address: adres,
        plaatsnaam: cityname,
        number: telefoon,
        compName: bedrijfsnaam,
      });
    }
    console.log(cusInfo);
  }, []);
  const fooiOptions = fooiArr().map((item, i) => {
    return (
      <Option value={item}>
        {item === 0 ? CapitalizeFC(t("geen")) : changeFormat(item)}
      </Option>
    );
  });
  const customFormat = (value) => {
    if (value.startOf("day").isSame(moment().startOf("day"))) {
      return t("today");
    }
    if (value.startOf("day").isSame(moment().startOf("day").add(1, "day"))) {
      return t("tomorrow");
    }
    if (value.startOf("day").isSame(moment().startOf("day").add(2, "day"))) {
      return t("thedayaftertomorrow");
    }
    return value.format("DD-MM-YYYY");
  };
  const disabledDate = (current) => {
    const opendays = openingstijden.map((openingstijd) => openingstijd.day);
    const closedayInstance = new CloseDays(_closeday, openingstijden);

    return (
      (current && current < moment().startOf("day")) ||
      !opendays.includes(current.day()) ||
      closedayInstance.extra_closed(current).closed ||
      current.startOf("day").isAfter(
        moment()
          .startOf("day")
          .add(7 * orderinadvance.period, "day"),
        "day"
      )
    );
  };
  const selectOptions = takeTime.map((item, i) => {
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
      name={orderType}
      // initialValues={{ paymethod: locale === "BE" ? "bancontact" : "ideal" }}
      initialValues={{ tip: 0, date: moment() }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      {orderType !== "bezorgen" ? null : (
        <div>
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
        </div>
      )}
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
        {orderType === "bezorgen"
          ? t("Hoe laat wil je het eten ontvangen ?")
          : t("Hoe laat wil je het eten afhalen ?")}
      </div>
      {orderinadvance.isEnabled ? (
        <div className={styles.fieldDelevertime}>
          <Form.Item
            name="date"
            label={CapitalizeFC(t("date"))}
            rules={rules.delevertime}
            hasFeedback
          >
            <DatePicker
              locale={locale}
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              format={customFormat}
              onChange={datePickerOnChange}
              // dateRender={(currentDate, today) => {
              //   console.log(currentDate, today);
              //   return <div>{moment(currentDate._d).date()}</div>;
              // }}
            />
          </Form.Item>
        </div>
      ) : null}
      <div className={styles.fieldDelevertime}>
        <Form.Item
          name="delevertime"
          label={
            orderType === "bezorgen"
              ? t("Gewenste bezorgtijd")
              : t("Gewenste afhaaltijd")
          }
          rules={rules.delevertime}
          hasFeedback
        >
          <Select>{selectOptions}</Select>
        </Form.Item>
      </div>
      {!showtip.isEnabled ? null : (
        <div className={styles.fieldDelevertime}>
          <Form.Item
            name="tip"
            label={CapitalizeFC(t("tip"))}
            rules={rules.tip}
            hasFeedback
          >
            <Select onChange={selectTip}>{fooiOptions}</Select>
          </Form.Item>
        </div>
      )}
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
        deliveryMethod={orderType}
        t={t}
      />
      <div className={styles.error}>{err && err} </div>
      <div style={{ padding: "10px 0 15px 0" }}>
        Door het plaatsen van uw bestelling gaat u akkoord met onze algemene
        voorwaarden, ons privacybeleid en geeft u toestemming om uw gegevens te
        verwerken.
      </div>
      <Form.Item {...tailFormItemLayout} className={styles.fieldFormButton}>
        <Button
          type="primary"
          style={{ fontSize: "18px", fontWeight: 700 }}
          htmlType="submit"
          disabled={disabled}
        >
          {t("nu kopen")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TakeawayAndDeliveryForm;
