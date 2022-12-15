import axios from "axios";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default {
  namespace: "checkbox",

  state: [],

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *updateCheckbox({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/checkbox/updateCheckbox/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/checkbox/updateCheckbox",
          checkbox: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    "fetch/success"(state, action) {
      return action.checkbox;
    },
    "fetch/error"(state, action) {
      return [{ error: action.error }];
    },
  },
};
