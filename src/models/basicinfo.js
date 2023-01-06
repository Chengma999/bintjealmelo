import axios from "axios";
import gegevens from "Utilities/gegevens";
import { calcFee } from "Utilities/toolStore";
const { restaurant_id } = gegevens;

export default {
  namespace: "basicinfo",

  state: {
    restaurantName: null,
    onlinebestellen: true,
    restaurantType: "cafetaria",
    namespace: null,
    target: null,
    kvknr: null,
    text_1: null,
    text_2: null,
    resAddress: null,
    resPostcode: null,
    resTelnr: null,
    resMail: null,
    locale: null,
    options: [],
    categories: [],
    mainCategories: [],
    checkbox: [],
    bezorgstatus: true,
    afhaalstatus: true,
    paybycash: false,
    closeday: [],
    _closeday: [],
    bezorgtijden: { begin: 16, end: 20 },
    zsm: { takeaway: false, delivery: false },
    bezorggebied: [],
    openingstijden: [],
    deliverytijden: [],
    liveKey: null,
    facebookUrl: null,
    emailLogoUrl: null,
    bezorgchosen: null,
    printMethod: {
      printWithoutSoftware: false,
      targetIp: null,
      printOnlyKitchen: false,
    },
    carouselImages: [],
    backgroundImages: { top: null, middle: null, bottom: null },
    menulijsts: [],
    timeInterval: { takeaway: 0.25, delivery: 0.25 },
    waitingTimeFirstOrder: { takeaway: 0.25, delivery: 0.5 },
    limitedNumberOfOrders: { takeaway: 4, delivery: 4 },
    payMethod: { takeaway: [], delivery: [] },
    password: { isSucceed: null },
    transactieKosten: 0.29,
    plastictas: { isEnabled: false, fee: 0 },
    showtip: { isEnabled: false },
    orderinadvance: { isEnabled: false, period: 1 },
    stampcard: {
      isEnabled: false,
      pointValue: 1,
      fullcardPoints: 1,
      fullcardValue: 1,
    },
    discountTakeAway: { isEnabled: false, amount: 0 },
    discountcode: [],
    themeColor: "#1371fa",
    jobOffer: { isEnabled: false, text: undefined },
    buffet: { isEnabled: false, text: undefined, images: [] },
    catering: { isEnabled: false, text: undefined, images: undefined },
    reservation: {
      isEnabled: false,
      available: true,
      begintime: 12,
      endtime: 18,
      timeinterval: 0.5,
    },
    concept: { isEnabled: false, introduction: undefined },
    restaurant: { isEnabled: false, text: undefined },
    printgroups: [],
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      const { pathname } = history.location;
      history.listen((props) => {
        if (
          props.pathname === "/" ||
          props.pathname === "/online_bestellen" ||
          props.pathname === "/admin/orders" ||
          props.pathname === "/admin/products" ||
          props.pathname === "/admin/overige" ||
          props.pathname === "/admin/basis" ||
          props.pathname === "/privacy" ||
          props.pathname === "/algemenevoorwaarden" ||
          props.pathname === "/menulijst" ||
          props.pathname === "/werkenbijons" ||
          props.pathname === "/stampcard" ||
          props.pathname === "/buffet" ||
          props.pathname === "/catering" ||
          props.pathname === "/afhaallijst" ||
          props.pathname === "/contact" ||
          props.pathname === "/restaurant" ||
          props.pathname === "/concept" ||
          props.pathname.includes("/admin/overige") ||
          props.pathname.includes("/checkout") ||
          pathname.includes("/redirect") ||
          pathname.includes("/checkout") ||
          pathname.includes("/reserveren")
        ) {
          dispatch({ type: "fetch" });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      try {
        const basicinfo = yield select((state) => state.basicinfo);
        if (!basicinfo.restaurantName) {
          const { data } = yield call(
            axios.get,
            `/api/basicinfo/${restaurant_id}`
          );
          yield put({ type: "save", basicinfo: data });
          return data;
        }
        return;
      } catch (err) {
        yield put({ type: "fetch/error", error: err.message });
        console.log(err);
      }
    },
    *"bezorggebied/choose"({ payload }, { call, put, select }) {
      const { bezorgchosen } = payload;
      const { bezorggebied } = yield select((state) => state.basicinfo);
      const { subtotalPrice } = yield select((state) => state.basket);
      const fee = calcFee(subtotalPrice, bezorgchosen, bezorggebied);
      yield put({ type: "bezorggebied/choose/success", bezorgchosen });
      yield put({ type: "basket/updateCheckoutPrice/bezorgchosen", fee });
    },
  },

  reducers: {
    save(state, { basicinfo }) {
      const { locale, paybycash } = basicinfo;
      let remainState = {};
      if (!basicinfo.timeInterval) {
        remainState.timeInterval = state.timeInterval;
      }
      if (!basicinfo.waitingTimeFirstOrder) {
        remainState.waitingTimeFirstOrder = state.waitingTimeFirstOrder;
      }
      if (!basicinfo.limitedNumberOfOrders) {
        remainState.limitedNumberOfOrders = state.limitedNumberOfOrders;
      }
      if (!basicinfo.bezorgtijden) {
        remainState.bezorgtijden = state.bezorgtijden;
      }
      if (
        basicinfo.deliverytijden.length === 0 &&
        basicinfo.openingstijden.length > 0
      ) {
        remainState.deliverytijden = basicinfo.openingstijden.map(
          (openingstijd) => ({ ...openingstijd, ...state.bezorgtijden })
        );
      }
      if (!basicinfo.printMethod) {
        remainState.printMethod = state.printMethod;
      }
      if (!basicinfo.payMethod) {
        let takeaway = [];
        if (paybycash) {
          takeaway.push("cash");
        }
        if (locale === "BE") {
          takeaway.push("bancontact");
        } else {
          takeaway.push("ideal");
        }
        remainState.payMethod = {
          takeaway,
          delivery: locale === "BE" ? ["bancontact"] : ["ideal"],
        };
      }
      if (!basicinfo.zsm) {
        remainState.zsm = state.zsm;
      }
      if (
        basicinfo.transactieKosten === null ||
        basicinfo.transactieKosten === undefined ||
        basicinfo.transactieKosten < 0
      ) {
        remainState.transactieKosten = state.transactieKosten;
      }
      remainState.buffet = { ...state.buffet, ...basicinfo.buffet };
      remainState.reservation = {
        ...state.reservation,
        ...basicinfo.reservation,
      };
      remainState.password = state.password;
      return { ...state, ...basicinfo, ...remainState };
    },
    "categories/updateCategorie"(state, { categories }) {
      return { ...state, categories };
    },
    "categories/updateMainCategorie"(state, { mainCategories }) {
      return { ...state, mainCategories };
    },
    "checkbox/updateCheckbox"(state, { checkbox }) {
      return { ...state, checkbox };
    },
    "options/success"(state, { options }) {
      return { ...state, options: [...options] };
    },
    "kvknr/updateKvknr"(state, { kvknr }) {
      return { ...state, kvknr };
    },
    "jobOffer/updateJobOffer"(state, { jobOffer }) {
      return { ...state, jobOffer };
    },
    "buffet/updateBuffetText"(state, { buffet }) {
      return {
        ...state,
        buffet: !buffet.images ? { ...buffet, images: [] } : { ...buffet },
      };
    },
    "buffet/updateBuffetImage"(state, { buffet }) {
      return { ...state, buffet };
    },
    "resAddress/updateResAddress"(state, { resAddress }) {
      return { ...state, resAddress };
    },
    "resPostcode/updateResPostcode"(state, { resPostcode }) {
      return { ...state, resPostcode };
    },
    "resMail/updateResMail"(state, { resMail }) {
      return { ...state, resMail };
    },
    "resTelnr/updateResTelnr"(state, { resTelnr }) {
      return { ...state, resTelnr };
    },
    "themeColor/updateThemeColor"(state, { themeColor }) {
      return { ...state, themeColor };
    },
    "transactieKosten/updateTransactieKosten"(state, { transactieKosten }) {
      return { ...state, transactieKosten };
    },
    "plastictas/updatePlasticTas"(state, { plastictas }) {
      return { ...state, plastictas };
    },
    "showtip/updateShowtip"(state, { showtip }) {
      return { ...state, showtip };
    },
    "orderinadvance/updateOrderInAdvance"(state, { orderinadvance }) {
      return { ...state, orderinadvance };
    },
    "stampcard/updateStampcard"(state, { stampcard }) {
      return { ...state, stampcard };
    },
    "liveKey/updateLiveKey"(state, { liveKey }) {
      return { ...state, liveKey };
    },
    "facebookUrl/updateFacebookUrl"(state, { facebookUrl }) {
      return { ...state, facebookUrl };
    },
    "emailLogoUrl/updateEmailLogoUrl"(state, { emailLogoUrl }) {
      return { ...state, emailLogoUrl };
    },
    "text_1/updateText_1"(state, { text_1 }) {
      return { ...state, text_1 };
    },
    "text_2/updateText_2"(state, { text_2 }) {
      return { ...state, text_2 };
    },
    "bezorgstatus/updateBezorgstatus"(state, { bezorgstatus }) {
      return { ...state, bezorgstatus };
    },
    "paybycash/updatePaybycash"(state, { paybycash }) {
      return { ...state, paybycash };
    },
    "payMethod/updatePayMethod"(state, { payMethod }) {
      return { ...state, payMethod };
    },
    "bezorggebied/updateBezorggebied"(state, { bezorggebied }) {
      return { ...state, bezorggebied: [...bezorggebied] };
    },
    "bezorggebied/choose/success"(state, { bezorgchosen }) {
      return {
        ...state,
        bezorgchosen,
      };
    },
    "discountcode/updateDiscountcode"(state, { discountcode }) {
      return { ...state, discountcode: [...discountcode] };
    },
    "openingstijden/updateOpeningstijden"(state, { openingstijden }) {
      return { ...state, openingstijden: [...openingstijden] };
    },
    "deliverytijden/updateDeliverytijden"(state, { deliverytijden }) {
      return { ...state, deliverytijden: [...deliverytijden] };
    },
    "bezorgtijden/updateBezorgtijden"(state, { bezorgtijden }) {
      return { ...state, bezorgtijden: { ...bezorgtijden } };
    },
    "zsm/updateZsm"(state, { zsm }) {
      return { ...state, zsm: { ...zsm } };
    },
    "timeInterval/updateTimeInterval"(state, { timeInterval }) {
      return { ...state, timeInterval: { ...timeInterval } };
    },
    "waitingTimeFirstOrder/updateWaitingTimeFirstOrder"(
      state,
      { waitingTimeFirstOrder }
    ) {
      return { ...state, waitingTimeFirstOrder: { ...waitingTimeFirstOrder } };
    },
    "limitedNumberOfOrders/updateLimitedNumberOfOrders"(
      state,
      { limitedNumberOfOrders }
    ) {
      return { ...state, limitedNumberOfOrders: { ...limitedNumberOfOrders } };
    },
    "closeday/updateCloseday"(state, { closeday }) {
      return { ...state, closeday: [...closeday] };
    },
    "_closeday/updateCloseDay"(state, { _closeday }) {
      return { ...state, _closeday: [..._closeday] };
    },
    "printMethod/updatePrintMethod"(state, { printMethod }) {
      return { ...state, printMethod: { ...printMethod } };
    },
    "discountTakeAway/updateDiscountTakeAway"(state, { discountTakeAway }) {
      return { ...state, discountTakeAway: { ...discountTakeAway } };
    },
    "backgroundImages/updateBackgroundImages"(state, { backgroundImages }) {
      return { ...state, backgroundImages: { ...backgroundImages } };
    },
    "carouselImages/updateCarouselImage"(state, { carouselImages }) {
      return { ...state, carouselImages: [...carouselImages] };
    },
    "menulijsts/updateMenulijst"(state, { menulijsts }) {
      return { ...state, menulijsts: [...menulijsts] };
    },
    "password/updatePassword"(state, { password }) {
      return { ...state, password: { ...password } };
    },
    "password/clearPasswordResult"(state, { payload }) {
      return { ...state, password: { ...payload } };
    },
    "reservation/updateReservation"(state, { reservation }) {
      return { ...state, reservation: { ...reservation } };
    },
  },
};
