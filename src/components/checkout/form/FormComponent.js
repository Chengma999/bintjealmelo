import React, { useState, useEffect } from "react";
import axios from "axios";
import BezorgForm from "./BezorgForm";
import AfhaalForm from "./AfhaalForm";
import TakeawayAndDeliveryForm from "./TakeawayAndDeliveryForm";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;

const FormComponent = (props) => {
  const [disabled, setDisabled] = useState(false);
  const onDisable = () => {
    setDisabled(true);
  };
  const {
    levering,
    loading,
    basket,
    orderId,
    factors,
    min_value,
    chooseBezorgGebied,
    enterDiscountcode,
    fee,
    radioValue,
    setRadioValue,
    basicinfo,
    calTotalPrice,
    t,
    selectTip,
  } = props;
  const { transactieKosten, discountTakeAway } = basicinfo;
  const { isEnabled, amount } = discountTakeAway;
  const totalPrice = !basket ? 0 : basket.subtotalPrice;
  return (
    <div>
      <TakeawayAndDeliveryForm
        orderType={levering === 1 ? "bezorgen" : "afhalen"}
        orderId={orderId}
        nettoPrice={totalPrice}
        disabled={disabled}
        onDisable={onDisable}
        factors={factors}
        min_value={min_value}
        fee={fee}
        transactiekosten={transactieKosten}
        // totalPrice={basket.checkoutPrice}
        calTotalPrice={calTotalPrice}
        chooseBezorgGebied={chooseBezorgGebied}
        radioValue={radioValue}
        setRadioValue={setRadioValue}
        deliverytijden={basicinfo.deliverytijden}
        bezorggebied={basicinfo.bezorggebied}
        openingstijden={basicinfo.openingstijden}
        closeday={basicinfo.closeday}
        restaurantName={basicinfo.restaurantName}
        site={basicinfo.target}
        timeInterval={
          levering === 1
            ? basicinfo.timeInterval.delivery
            : basicinfo.timeInterval.takeaway
        }
        waitingTimeFirstOrder={
          levering === 1
            ? basicinfo.waitingTimeFirstOrder.delivery
            : basicinfo.waitingTimeFirstOrder.takeaway
        }
        limitedNumberOfOrders={
          levering === 1
            ? basicinfo.limitedNumberOfOrders.delivery
            : basicinfo.limitedNumberOfOrders.takeaway
        }
        locale={basicinfo.locale}
        // orderedOrders={
        //   levering === 1 ? orderedOrdersDelivery : orderedOrdersTakeAway
        // }
        enterDiscountcode={enterDiscountcode}
        basket={basket}
        payMethod={
          levering === 1
            ? basicinfo.payMethod.delivery
            : basicinfo.payMethod.takeaway
        }
        zsmDelivery={basicinfo.zsm.delivery}
        _closeday={basicinfo._closeday}
        t={t}
        discountAmount={
          !isEnabled || !amount || amount === 0
            ? "n.v.t"
            : basket.subtotalPrice * amount
        }
        // totalPrice={basket.checkoutPrice}
        zsmTakeaway={basicinfo.zsm.takeaway}
        showtip={basicinfo.showtip}
        selectTip={selectTip}
        orderinadvance={basicinfo.orderinadvance}
        discountcode={basicinfo.discountcode}
      />
    </div>
  );
};
export default FormComponent;
