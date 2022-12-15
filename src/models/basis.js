import axios from "axios";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default {
  namespace: "basis",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *updateThemeColor({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/basis/updateThemeColor/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/themeColor/updateThemeColor",
          themeColor: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state };
    },
  },
};
