import React, { useState, useEffect } from "react";
import axios from "axios";
import { Radio, Popover, Affix } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import styles from "../../css/checkout.less";
import layoutStyles from "../../css/layout.less";
import Basket from "../checkout/Basket";
import FormComponent from "./form/FormComponent";
import WinkelwagenDrawer from "../winkelwagen/WinkelwagenDrawer";
import { InfoCircleOutlined } from "@ant-design/icons";
import LayoutWrapper from "../common/LayoutWrapper";
import { calcFee } from "Utilities/toolStore";
import gegevens from "Utilities/gegevens";
import { PriceManuplation } from "Utilities/toolStore";
const { restaurant_id } = gegevens;
const content = "De bezorgdienst is momenteel uitgeschakeld.";
const CheckoutPage = (props) => {
  const {
    fetchBasketOrder,
    match,
    basicinfo,
    basket,
    updateCheckoutPrice,
    calTotalPrice,
    cart,
    loading,
    factors,
    chooseBezorgGebied,
    enterDiscountcode,
    selectTip,
  } = props;
  const { t } = useTranslation();
  const [min_value, setMin_value] = useState(0);
  const [todayBezorgen, setTodayBezorgen] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [winkelwagenMargin, setWinkelwagenMargin] = useState(false);
  const [radioValue, setRadioValue] = useState(1); //bezorgen is 1, afhalen is 2
  const [disabled, setDisabled] = useState(false);
  const [paymethodRadioValue, setPaymethodRadioValue] = useState("ideal");
  const {
    bezorggebied,
    bezorgstatus,
    // deliverytijden,
    locale,
    bezorgchosen,
    transactieKosten,
    discountTakeAway,
    payMethod,
  } = basicinfo;
  // const totalPrice = !basket ? 0 : basket.totalPrice;

  const startup = async () => {
    const order = await fetchBasketOrder({ orderId: match.params.id });
    setTotalPrice(order.totalPrice);
    const { data } = await axios.get(`/api/basicinfo/${restaurant_id}`);
    updateCheckoutPrice({
      deliveryMethod: "bezorgen",
    });
    const { deliverytijden, bezorgstatus, bezorggebied } = data;
    const priceinitialization = new PriceManuplation({
      deliverytijden,
      bezorgstatus,
      bezorggebied,
      todayBezorgen,
      radioValue,
      totalPrice: order.totalPrice,
    });
    priceinitialization.operate({
      setTodayBezorgen,
      setRadioValue,
      setDisabled,
      updateCheckoutPrice,
      setMin_value,
    });
  };

  useEffect(() => {
    startup();
  }, []);
  useEffect(() => {
    if (bezorggebied && bezorgchosen) {
      setMin_value(
        bezorggebied.find((item) => item.postcode === bezorgchosen).min_value
      );
    }
  }, [JSON.stringify(bezorggebied), bezorgchosen]);
  const setPaymethodRadioValueAndUpdatePrice = (paymethodRadioValue) => {
    setPaymethodRadioValue(paymethodRadioValue);
    if (!paymethodRadioValue) {
      return;
    }
    if (paymethodRadioValue === "cash") {
      updateCheckoutPrice({
        payMethod: "cash",
      });
      return;
    }
    updateCheckoutPrice({
      payMethod: "online",
    });
    return;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setRadioValue(value);
    if (value === 1) {
      updateCheckoutPrice({
        deliveryMethod: "bezorgen",
      });

      return;
    }
    updateCheckoutPrice({
      deliveryMethod: "afhalen",
    });
    return;
  };

  const fee = calcFee(totalPrice, bezorgchosen, bezorggebied);
  return (
    <LayoutWrapper {...props}>
      <div className={styles.fullTitle}>
        <span className={styles.bestelling}>{t("bestelling")}</span>
        {t("afronden")}
      </div>
      <div className={layoutStyles.fullSpecials}>
        <div className={styles.checkoutForm}>
          <Radio.Group
            name="radiogroup"
            onChange={handleChange}
            value={radioValue}
            style={{ marginBottom: "20px", marginTop: "10px" }}
          >
            <div>
              <Radio value={1} disabled={disabled}>
                {t("Ik wil mijn eten laten bezorgen.")}{" "}
              </Radio>
              {!bezorgstatus || !todayBezorgen ? (
                <Popover
                  content={t(content)}
                  placement="bottom"
                  trigger="click"
                >
                  <InfoCircleOutlined />
                </Popover>
              ) : (
                ""
              )}
            </div>
            <div>
              <Radio value={2}>{t("Ik wil mijn eten afhalen.")}</Radio>
            </div>
          </Radio.Group>
          <FormComponent
            levering={radioValue}
            orderId={match.params.id}
            loading={loading}
            basket={basket}
            factors={factors}
            min_value={min_value}
            chooseBezorgGebied={chooseBezorgGebied}
            fee={fee}
            setRadioValue={setPaymethodRadioValueAndUpdatePrice}
            radioValue={paymethodRadioValue}
            bezorggebied={bezorggebied}
            basicinfo={basicinfo}
            enterDiscountcode={enterDiscountcode}
            calTotalPrice={calTotalPrice}
            t={t}
            selectTip={selectTip}
          />
        </div>
        <Affix
          offsetTop={20}
          onChange={(affixed) => {
            if (affixed) {
              setWinkelwagenMargin(true);
            }
            if (!affixed) {
              setWinkelwagenMargin(false);
            }
          }}
        >
          <div
            className={
              winkelwagenMargin
                ? layoutStyles.winkelwagenWhenScroll
                : layoutStyles.winkelwagen
            }
          >
            <Basket
              basket={basket}
              levering={radioValue}
              min_value={min_value}
              loading={loading}
              factors={factors}
              fee={fee}
              transactiekosten={transactieKosten}
              setRadioValue={setPaymethodRadioValueAndUpdatePrice}
              radioValue={paymethodRadioValue}
              discountTakeAway={discountTakeAway}
              t={t}
            />
          </div>
        </Affix>
        <div className={layoutStyles.winkelwagenDrawer}>
          <WinkelwagenDrawer
            type="Basket"
            cart={cart}
            basket={basket}
            levering={radioValue}
            min_value={min_value}
            factors={factors}
            loading={loading}
            fee={fee}
            setRadioValue={setPaymethodRadioValueAndUpdatePrice}
            radioValue={paymethodRadioValue}
            transactiekosten={transactieKosten}
            discountTakeAway={discountTakeAway}
            t={t}
          />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default CheckoutPage;
