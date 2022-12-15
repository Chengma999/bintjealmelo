import React, { useState } from "react";
import layoutStyles from "../../css/layout.less";
import gegevens from "Utilities/gegevens";
import { Form, Input, InputNumber, Button, DatePicker, Select } from "antd";
import locale from "Utilities/locale";
import axios from "axios";
import { reservationTimeFunc } from "../checkout/form/options/timeOptions";
import Recaptcha from "react-recaptcha";
import styles from "../../css/form.less";
import moment from "moment";
import { useMediaQuery } from "react-responsive";
const { Option } = Select;
const { restaurant_id } = gegevens;
const standaardText =
  "Bij veranderingen of annulering van uw reservering, dient u minimaal 45 minuten vóór de gereserveerde tijdstip telefonisch door te geven.";
const standaardBevestiginsText = "Bedankt voor uw reservering!";

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 10,
  },
};

const validateMessages = {
  required: "Dit veld is verplicht!",
  types: {
    email: "Dit veld moet een geldige email zijn!",
    number: "Dit veld moet een geldige telefoonnumber zijn!",
  },
  number: {
    range: "Aantal mag niet kleiner zijn dan 1 of groter zijn dan 99.",
  },
};

const TheForm = (props) => {
  const {
    setFormVisible,
    setConfirmationVisible,
    setIsVerified,
    isVerified,
    setVerificationErr,
    verificationErr,
    reservation,
    openingstijden,
  } = props;
  const { isEnabled, available, begintime, endtime, timeinterval } =
    reservation;
  const obj = isEnabled
    ? { begintime, endtime, timeinterval }
    : { begintime: 12, endtime: 21, timeinterval: 0.5 };
  const time = reservationTimeFunc(obj);
  const disabledDate = (current) => {
    const opendays = openingstijden.map((openingstijd) => openingstijd.day);
    console.log(current.day());
    return (
      (current && current < moment().startOf("day")) ||
      !opendays.includes(current.day())
    );
  };
  const onFinish = async (values) => {
    if (!available) {
      setVerificationErr(
        "Het reserveringsformulier is tijdelijk uitgeschakeld. Heeft u een vraag? Neem a.u.b. contact met ons op."
      );
      return;
    }
    if (!isVerified) {
      console.log("failed. not verified");

      setVerificationErr("U bent nog niet geverifieerd.");
      return;
    }

    // values.user.date = values.user.date.format("DD-MM-YYYY");
    values.user.restaurant_id = restaurant_id;
    await axios.post(`/api/reserveren/${restaurant_id}`, values);
    setFormVisible(false);
    setConfirmationVisible(true);
  };

  const onloadCallback = () => {};
  const verifyCallback = (response) => {
    if (!response) {
      setIsVerified(false);
      setVerificationErr("U bent nog niet geverifieerd.");
      return;
    }
    if (response) {
      setIsVerified(true);
      setVerificationErr(null);
    }
  };
  const selectOptions = time.map((item) => {
    return <Option value={item.value}>{item.label}</Option>;
  });
  return (
    <Form
      size="large"
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      style={{ marginTop: "50px" }}
    >
      <Form.Item
        name={["user", "date"]}
        label="Datum"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker
          locale={locale}
          style={{ width: "100%" }}
          disabledDate={disabledDate}
        />
      </Form.Item>
      <Form.Item
        name={["user", "time"]}
        label="Tijd"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>{selectOptions}</Select>
      </Form.Item>
      <Form.Item
        name={["user", "number_of_persons"]}
        label="Aantal personen"
        rules={[
          {
            type: "number",
            min: 1,
            max: 99,
            required: true,
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name={["user", "name"]}
        label="Uw naam"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "mail_address"]}
        label="Uw Email"
        rules={[
          {
            type: "email",
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["user", "tel_number"]}
        label="Telefoonnummer"
        rules={[
          {
            type: "number",

            required: true,
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name={["user", "opmerking"]} label="Opmerking">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={["user", "captcha"]}
        wrapperCol={{ ...layout.wrapperCol, offset: 7 }}
      >
        <Recaptcha
          sitekey="6LdnY7YZAAAAAP_1u9f2dh4xisGXAZW9cNfBTJsI"
          render="explicit"
          onloadCallback={onloadCallback}
          verifyCallback={verifyCallback}
          size="compact"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
        <Button type="primary" htmlType="submit">
          Reserveren
        </Button>
        <div className={styles.error}>{verificationErr}</div>
      </Form.Item>
    </Form>
  );
};

function ReserverenForm({ reservation, openingstijden }) {
  const isSmallscreen = useMediaQuery({ maxWidth: 857 });
  const { text, confirm_text } = reservation;
  const [formVisible, setFormVisible] = useState(true);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationErr, setVerificationErr] = useState(null);
  return (
    <div>
      <div
        style={{
          color: "rgba(0, 0, 0, 0.85)",
          fontWeight: 700,
          fontSize: isSmallscreen ? "1.8em" : "2.2em",
          paddingBottom: "20px",
          paddingTop: "20px",
          textAlign: "center",
        }}
      >
        Voordat u reserveert:
      </div>
      <div
        id="voor_reserveren_text"
        style={{
          fontFamily: "myFamily",
          fontSize: isSmallscreen ? "18px" : "22px",
          whiteSpace: "pre-wrap",
        }}
        className={layoutStyles.textAlign}
      >
        {text || standaardText}
      </div>
      {formVisible ? (
        <div id="form_case" className={layoutStyles.form_case}>
          <TheForm
            setFormVisible={setFormVisible}
            setConfirmationVisible={setConfirmationVisible}
            setIsVerified={setIsVerified}
            isVerified={isVerified}
            setVerificationErr={setVerificationErr}
            verificationErr={verificationErr}
            reservation={reservation}
            openingstijden={openingstijden}
          />
        </div>
      ) : null}
      {confirmationVisible ? (
        <div id="confirmation" className={layoutStyles.confirmation_case}>
          {confirm_text || standaardBevestiginsText}
        </div>
      ) : null}
    </div>
  );
}

export default ReserverenForm;
