import axios from "axios";
export default {
  namespace: "redirect",

  state: {},

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((props) => {
        if (props.pathname === "/redirect") {
          dispatch({ type: "fetch", payload: { search: props.search } });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const { data } = yield call(
          axios.get,
          `/api/redirect${payload.search}`
        );
        if (data && !data.error) {
          const {
            customerName,
            postcode,
            adres,
            cityname,
            telefoon,
            bedrijfsnaam,
            email,
          } = data;
          localStorage.setItem(
            "_hisight_cus_info",
            JSON.stringify({
              customerName,
              postcode,
              adres,
              cityname,
              telefoon,
              bedrijfsnaam,
              email,
            })
          );
        }
        // console.log(data)
        yield put({ type: "fetch/success", data });
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
  },

  reducers: {
    "fetch/success"(state, action) {
      const { data } = action;
      if (data.error) {
        return {
          error: data.error,
          order: null,
        };
      } else {
        return {
          error: null,
          order: data,
        };
      }
    },

    "fetch/error"(state, action) {
      const { error } = action;
      return {
        error: error,
        order: null,
      };
    },
  },
};
