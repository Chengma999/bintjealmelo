import axios from "axios";
import gegevens from "Utilities/gegevens";
export default {
  namespace: "factors",

  state: { tijden: [] },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      try {
        const { data } = yield call(
          axios.get,
          "/api/admincrud/getbezorgtijden"
        );
        yield put({ type: "fetch/success", bezorgtijden: data });
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *fetchAfhaaltijden({ payload }, { call, put }) {
      // eslint-disable-line
      try {
        const { data } = yield call(
          axios.get,
          "/api/admincrud/getafhaaltijden"
        );
        yield put({ type: "fetchAfhaaltijden/success", afhaaltijden: data });
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *fetchcloseday({ payload }, { call, put }) {
      try {
        const { data } = yield call(axios.get, "/api/admincrud/getcloseday");
        console.log(data);
        yield put({ type: "fetchcloseday/success", closeday: data.closeday });
      } catch (e) {
        yield put({ type: "fetchcloseday/error", error: e.message });
      }
    },
    *fetchbezorggebied({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.get,
          "/api/admincrud/getbezorggebied"
        );
        yield put({ type: "fetchbezorggebied/success", bezorggebied: data });
        return data;
      } catch (e) {
        yield put({ type: "fetchbezorggebied/error", error: e.message });
      }
    },
  },

  reducers: {
    "fetch/success"(state, action) {
      return {
        ...state,
        tijden: action.bezorgtijden,
        error: null,
      };
    },
    "fetch/error"(state, action) {
      return {
        ...state,
        tijden: [],
        error: action.error,
      };
    },
    "fetchAfhaaltijden/success"(state, action) {
      return {
        ...state,
        afhaaltijden: action.afhaaltijden,
        afhaalerror: null,
      };
    },
    "fetchAfhaaltijden/error"(state, action) {
      return {
        ...state,
        afhaaltijden: [],
        afhaalerror: action.error,
      };
    },
    "fetchcloseday/success"(state, action) {
      return {
        ...state,
        closeday: action.closeday,
        closedayerror: null,
      };
    },
    "fetchcloseday/error"(state, action) {
      return {
        ...state,
        closeday: null,
        closedayerror: action.error,
      };
    },
    "fetchbezorggebied/success"(state, action) {
      return {
        ...state,
        bezorggebied: action.bezorggebied,
        bezorgerror: null,
      };
    },
    "fetchbezorggebied/choose"(state, { payload }) {
      return {
        ...state,
        bezorgchosen: payload.bezorggebied,
      };
    },
    "fetchbezorggebied/error"(state, action) {
      return {
        ...state,
        bezorggebied: [],
        bezorgerror: action.error,
      };
    },
  },
};
