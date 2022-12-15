import axios from "axios";
import gegevens from "Utilities/gegevens";
import { calcFee } from "Utilities/toolStore";
import moment from "moment";
const { restaurant_id } = gegevens;
export default {
  namespace: "overige",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *updateKvknr({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateKvknr/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/kvknr/updateKvknr",
          kvknr: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateResAddress({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateResAddress/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/resAddress/updateResAddress",
          resAddress: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateResPostcode({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateResPostcode/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/resPostcode/updateResPostcode",
          resPostcode: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateResMail({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateResMail/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/resMail/updateResMail",
          resMail: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateResTelnr({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateResTelnr/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/resTelnr/updateResTelnr",
          resTelnr: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateTransactieKosten({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateTransactieKosten/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/transactieKosten/updateTransactieKosten",
          transactieKosten: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updatePlasticTas({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updatePlasticTas/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/plastictas/updatePlasticTas",
          plastictas: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateShowtip({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateShowtip/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/showtip/updateShowtip",
          showtip: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateOrderInAdvance({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateOrderInAdvance/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/orderinadvance/updateOrderInAdvance",
          orderinadvance: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateStampcard({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateStampcard/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/stampcard/updateStampcard",
          stampcard: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    *updateLiveKey({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateLiveKey/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/liveKey/updateLiveKey",
          liveKey: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateFacebookUrl({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateFacebookUrl/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/facebookUrl/updateFacebookUrl",
          facebookUrl: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateEmailLogoUrl({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateEmailLogoUrl/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/emailLogoUrl/updateEmailLogoUrl",
          emailLogoUrl: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateText_1({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateText_1/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/text_1/updateText_1",
          text_1: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateText_2({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateText_2/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/text_2/updateText_2",
          text_2: data,
        });
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateJobOffer({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateJobOffer/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/jobOffer/updateJobOffer",
          jobOffer: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBuffetText({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateBuffetText/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/buffet/updateBuffetText",
          buffet: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBezorgstatus({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateBezorgstatus/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorgstatus/updateBezorgstatus",
          bezorgstatus: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updatePaybycash({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updatePaybycash/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/paybycash/updatePaybycash",
          paybycash: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updatePayMethod({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updatePayMethod/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/payMethod/updatePayMethod",
          payMethod: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateDiscountTakeAway({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateDiscountTakeAway/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/discountTakeAway/updateDiscountTakeAway",
          discountTakeAway: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBezorgtijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateBezorgtijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorgtijden/updateBezorgtijden",
          bezorgtijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateZsm({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateZsm/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/zsm/updateZsm",
          zsm: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateTimeInterval({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateTimeInterval/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/timeInterval/updateTimeInterval",
          timeInterval: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateWaitingTimeFirstOrder({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateWaitingTimeFirstOrder/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/waitingTimeFirstOrder/updateWaitingTimeFirstOrder",
          waitingTimeFirstOrder: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateLimitedNumberOfOrders({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateLimitedNumberOfOrders/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/limitedNumberOfOrders/updateLimitedNumberOfOrders",
          limitedNumberOfOrders: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addCloseDay({ payload }, { call, put, select }) {
      try {
        console.log(payload);
        const { data } = yield call(
          axios.post,
          `/api/overige/addCloseDay/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/_closeday/updateCloseDay",
          _closeday: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateCloseDay({ payload }, { call, put, select }) {
      try {
        console.log(payload);
        const { data } = yield call(
          axios.post,
          `/api/overige/update_CloseDay/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/_closeday/updateCloseDay",
          _closeday: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteCloseDay({ payload }, { call, put, select }) {
      try {
        console.log(payload);
        const { data } = yield call(
          axios.post,
          `/api/overige/deleteCloseDay/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/_closeday/updateCloseDay",
          _closeday: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateCloseday({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateCloseday/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/closeday/updateCloseday",
          closeday: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBackgroundImages({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateBackgroundImages/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/backgroundImages/updateBackgroundImages",
          backgroundImages: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addBezorggebied({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/addBezorggebied/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorggebied/updateBezorggebied",
          bezorggebied: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBezorggebied({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateBezorggebied/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorggebied/updateBezorggebied",
          bezorggebied: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteBezorggebied({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/deleteBezorggebied/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorggebied/updateBezorggebied",
          bezorggebied: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addDiscountcode({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/addDiscountcode/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/discountcode/updateDiscountcode",
          discountcode: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateDiscountcode({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateDiscountcode/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/discountcode/updateDiscountcode",
          discountcode: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *enterDiscountcode({ payload }, { call, put, select }) {
      const { discountcode, bezorggebied, bezorgchosen } = yield select(
        (state) => state.basicinfo
      );
      const { subtotalPrice } = yield select((state) => state.basket);
      const { deliveryMethod } = payload;
      const index = discountcode.findIndex(
        (obj) => obj.discountcode === payload.discountcode
      );
      if (index === -1) {
        yield put({
          type: "basket/discountcode/error",
        });
      } else if (moment().isAfter(discountcode[index].validTo, "day")) {
        yield put({
          type: "basket/discountcode/outofdate",
        });
      } else if (discountcode[index].times < 1) {
        yield put({
          type: "basket/discountcode/alreadyused",
        });
      } else {
        yield put({
          type: "basket/discountcode/success",
          payload: {
            ...discountcode[index],
            fee: calcFee(subtotalPrice, bezorgchosen, bezorggebied),
            deliveryMethod,
          },
        });
      }
      yield put({
        type: "basket/calCheckoutPriceAsync",
      });
      return;
    },
    *deleteDiscountcode({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/deleteDiscountcode/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/discountcode/updateDiscountcode",
          discountcode: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addOpeningstijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/addOpeningstijden/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/openingstijden/updateOpeningstijden",
          openingstijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateOpeningstijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/update_Openingstijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/openingstijden/updateOpeningstijden",
          openingstijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteOpeningstijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/delete_Openingstijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/openingstijden/updateOpeningstijden",
          openingstijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addDeliverytijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/add_Deliverytijden/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/deliverytijden/updateDeliverytijden",
          deliverytijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateDeliverytijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/update_Deliverytijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/deliverytijden/updateDeliverytijden",
          deliverytijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteDeliverytijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/delete_Deliverytijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/deliverytijden/updateDeliverytijden",
          deliverytijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addCarouselImage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/addCarouselImage/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/carouselImages/updateCarouselImage",
          carouselImages: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateCarouselImage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateCarouselImage/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/carouselImages/updateCarouselImage",
          carouselImages: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    *deleteCarouselImage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/deleteCarouselImage/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/carouselImages/updateCarouselImage",
          carouselImages: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addBuffetImage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/addBuffetImage/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/buffet/updateBuffetImage",
          buffet: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBuffetImage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateBuffetImage/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/buffet/updateBuffetImage",
          buffet: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteBuffetImage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/deleteBuffetImage/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/buffet/updateBuffetImage",
          buffet: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addMenulijst({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/addMenulijst/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/menulijsts/updateMenulijst",
          menulijsts: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateMenulijst({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateMenulijst/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/menulijsts/updateMenulijst",
          menulijsts: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    *deleteMenulijst({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/deleteMenulijst/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/menulijsts/updateMenulijst",
          menulijsts: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },

    *updatePrintMethod({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updatePrintMethod/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/printMethod/updatePrintMethod",
          printMethod: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deletePrintMethod({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/deletePrintMethod/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/printMethod/updatePrintMethod",
          printMethod: {
            printWithoutSoftware: false,
            targetIp: null,
            printOnlyKitchen: false,
          },
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updatePassword({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updatePassword/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/password/updatePassword",
          password: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateReservation({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateReservation/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/reservation/updateReservation",
          reservation: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateConcept({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateConcept/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/concept/updateConcept",
          concept: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateRestaurantPage({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/overige/updateRestaurantPage/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/restaurant/updateRestaurantPage",
          restaurant: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    save(state, action) {
      const { afhaaltext } = action;
      return { ...state, afhaaltext };
    },
  },
};
