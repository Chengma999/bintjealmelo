import axios from "axios";
import moment from "moment";
import gegevens from "Utilities/gegevens";
import { calcFee, remain2Decimals } from "Utilities/toolStore";
const { restaurant_id } = gegevens;
export default {
  namespace: "basket",

  state: {
    basket: [],
    subtotalPrice: 0,
    discountAmount: 0,
    korting: 0,
    discountcode_id: null,
    checkoutPrice: 0,
    discountTakeAwayApplied: false,
    fee: 0,
    tip: 0,
    successMessage: undefined,
    errorMessage: undefined,
    payMethod: undefined,
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (!pathname.includes("/checkout")) {
          dispatch({ type: "/updateCheckoutPrice/clear" });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      const { orderId } = payload;
      try {
        const { data } = yield call(
          axios.get,
          `/api/checkout/${restaurant_id}?orderId=${orderId}`
        );
        yield put({ type: "fetch/success", payload: { ...data } });
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    *updateCheckoutPrice({ payload }, { call, put, select }) {
      const { deliveryMethod, payMethod } = payload;
      const { bezorggebied, bezorgchosen } = yield select(
        (state) => state.basicinfo
      );
      const { subtotalPrice } = yield select((state) => state.basket);
      const { discountTakeAway, transactieKosten } = yield select(
        (state) => state.basicinfo
      );
      if (deliveryMethod) {
        const fee = calcFee(subtotalPrice, bezorgchosen, bezorggebied);
        yield put({
          type: "updateCheckoutPrice/deliveryMethod",
          ...payload,
          fee,
          discountTakeAway,
        });
      }
      if (payMethod) {
        yield put({
          type: "updateCheckoutPrice/payMehtod",
          ...payload,
          transactieKosten,
        });
      }

      yield put({ type: "calCheckoutPriceAsync" });
    },
    *calTotalPrice({ payload }, { call, put, select }) {
      let { subtotalPrice, korting } = yield select((state) => state.basket);
      while (subtotalPrice === 0) {
        yield put({
          type: "fetch",
        });
        subtotalPrice = yield select((state) => state.basket.subtotalPrice);
        korting = yield select((state) => state.basket.korting);
      }
      let { discountTakeAway } = yield select((state) => state.basicinfo);
      const { orderType, paymethod, transactiekosten, deliveryFee } = payload;

      if (orderType !== "afhalen") {
        subtotalPrice += deliveryFee;
      }
      if (orderType === "afhalen" && discountTakeAway.isEnabled) {
        subtotalPrice -= subtotalPrice * discountTakeAway.amount;
      }
      if (paymethod !== "cash") {
        subtotalPrice += transactiekosten;
      }
      subtotalPrice -= korting;
      return subtotalPrice;
    },

    *calCheckoutPriceAsync({ payload }, { call, put, select }) {
      let { transactieKosten } = yield select((state) => state.basicinfo);
      yield put({ type: "calCheckoutPrice", transactieKosten });
    },
    // *discountcodeSuccessAsync({ payload }, { call, put, select }) {
    //   const { _id, discount } = payload;
    //   yield call(
    //     axios.post,
    //     `/api/overige/minusNumberOfUseOfDiscountcode/${restaurant_id}`,
    //     _id
    //   );
    //   yield put({ type: "discountcode/success", discount });
    // },
  },

  reducers: {
    "fetch/success"(state, { payload }) {
      const { cartProducts, subtotalPrice, discountAmount } = payload;
      return {
        ...state,
        subtotalPrice,
        basket: [...cartProducts],
        discountAmount,
        checkoutPrice: state.checkoutPrice + subtotalPrice,
      };
    },
    "discountcode/outofdate"(state, { payload }) {
      return {
        ...state,
        korting: 0,
        discountcode_id: null,
        successMessage: undefined,
        errorMessage: "action_out_of_date_message",
      };
    },
    "discountcode/alreadyused"(state, { payload }) {
      return {
        ...state,
        korting: 0,
        discountcode_id: null,
        successMessage: undefined,
        errorMessage: "action_already_used_message",
      };
    },
    "discountcode/success"(state, { payload }) {
      const { korting, checkoutPrice, subtotalPrice } = state;
      const { discount, _id } = payload;
      return {
        ...state,
        korting: discount < 1 ? state.subtotalPrice * discount : discount,
        errorMessage: undefined,
        successMessage: "action_succeed_message",
        discountcode_id: _id,
        checkoutPrice:
          korting !== 0
            ? checkoutPrice
            : discount < 1
            ? checkoutPrice - remain2Decimals(subtotalPrice * discount)
            : checkoutPrice - remain2Decimals(discount),
      };
    },
    "discountcode/error"(state, { payload }) {
      const { korting, checkoutPrice } = state;
      return {
        ...state,
        korting: 0,
        discountcode_id: null,
        successMessage: undefined,
        errorMessage: "action_not_valid_message",
        checkoutPrice:
          korting > 0
            ? checkoutPrice + remain2Decimals(korting)
            : checkoutPrice,
      };
    },
    "updateCheckoutPrice/deliveryMethod"(
      state,
      { deliveryMethod, fee, discountTakeAway }
    ) {
      const { isEnabled, amount } = discountTakeAway;
      const { checkoutPrice, discountTakeAwayApplied, subtotalPrice } = state;
      if (deliveryMethod === "afhalen") {
        if (isEnabled && amount > 0) {
          return {
            ...state,
            checkoutPrice:
              checkoutPrice - fee - remain2Decimals(amount * subtotalPrice),
            discountTakeAwayApplied: true,
            discountAmount: amount * subtotalPrice,
            fee: 0,
          };
        }

        return {
          ...state,
          checkoutPrice: checkoutPrice - fee,
          fee: 0,
        };
      }
      //bij bezorgen discount Takeaway wel of niet al toegepast, 2 situaties
      if (discountTakeAwayApplied) {
        return {
          ...state,
          checkoutPrice:
            checkoutPrice + fee + remain2Decimals(amount * subtotalPrice),
          discountTakeAwayApplied: false,
          fee,
          discountAmount: 0,
        };
      }
      return {
        ...state,
        checkoutPrice: checkoutPrice + fee,
        fee,
      };
    },
    "updateCheckoutPrice/payMehtod"(state, { payMethod, transactieKosten }) {
      const { checkoutPrice } = state;
      // if (
      //   payMethod === state.payMethod ||
      //   (payMethod === "cash" && state.payMethod === undefined)
      // ) {

      // }
      if (
        [undefined, "cash"].includes(state.payMethod) &&
        payMethod === "online"
      ) {
        return {
          ...state,
          checkoutPrice: checkoutPrice + transactieKosten,
          payMethod,
        };
      }
      if (state.payMethod === "online" && payMethod === "cash") {
        return {
          ...state,
          checkoutPrice: checkoutPrice - transactieKosten,
          payMethod,
        };
      }
      return { ...state, payMethod };
    },
    "updateCheckoutPrice/bezorgchosen"(state, { fee }) {
      return {
        ...state,
        checkoutPrice: state.checkoutPrice - state.fee + fee,
        fee,
      };
    },
    "/updateCheckoutPrice/clear"(state) {
      return {
        ...state,
        checkoutPrice: 0,
        fee: 0,
        discountTakeAwayApplied: false,
        korting: 0,
        discountcode_id: null,
        errorMessage: undefined,
        successMessage: undefined,
        payMethod: undefined,
      };
    },
    selectTip(state, { payload }) {
      const old_checkoutPrice = state.checkoutPrice;
      const old_tip = state.tip;
      return {
        ...state,
        tip: payload,
        checkoutPrice: old_checkoutPrice - old_tip + payload,
      };
    },
    calCheckoutPrice(state, { transactieKosten }) {
      console.log("calcheckoutprice", transactieKosten);
      const { subtotalPrice, fee, tip, korting, discountAmount, payMethod } =
        state;
      let checkoutPrice =
        subtotalPrice +
        fee +
        tip -
        korting -
        discountAmount +
        (payMethod === "online" ? transactieKosten : 0);
      if (checkoutPrice < 0) {
        checkoutPrice = 0;
      }
      return { ...state, checkoutPrice };
    },
  },
};
