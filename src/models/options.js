import axios from "axios";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;

export default {
  namespace: "options",

  state: [],

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((props) => {
        if (props.pathname === "/admin/products") {
          dispatch({ type: "fetch" });
        }
      });
      // eslint-disable-line
    },
  },

  effects: {
    *getOptions({ payload }, { call, put, select }) {
      try {
        const options = yield select((state) => state.options);
        if (options.length === 0) {
          const { data } = yield call(
            axios.get,
            `/api/options/getOptions/${restaurant_id}`
          );
          yield put({ type: "basicinfo/options/success", options: data });
          return data;
        }
        return options;
      } catch (e) {
        yield put({ type: "getOptions/error", error: e.message });
      }
    },
    *addGroup({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/addGroup/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
        return data;
      } catch (e) {
        yield put({ type: "getOptions/error", error: e.message });
      }
    },
    *updateGroup({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/updateGroup/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
        return data;
      } catch (e) {
        yield put({ type: "getOptions/error", error: e.message });
      }
    },
    *deleteGroup({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/deleteGroup/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
        return data;
      } catch (e) {
        yield put({ type: "getOptions/error", error: e.message });
      }
    },
    *copyGroup({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/copyGroup/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
        return data;
      } catch (e) {
        yield put({ type: "getOptions/error", error: e.message });
      }
    },
    *addGroupOption({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/addGroupOption/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
      } catch (err) {
        yield put({ type: "addGroupOption/error", error: err.message });
      }
    },
    *updateGroupOption({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/updateGroupOption/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
      } catch (err) {
        yield put({ type: "updateGroupOption/error", error: err.message });
      }
    },
    *deleteGroupOption({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/options/deleteGroupOption/${restaurant_id}`,
          payload
        );
        yield put({ type: "basicinfo/options/success", options: data });
        return data;
      } catch (err) {
        yield put({ type: "deleteGroupOption/error", error: err.message });
      }
    },
  },

  reducers: {},
};
