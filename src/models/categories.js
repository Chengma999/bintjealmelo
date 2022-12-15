import axios from "axios";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default {
  namespace: "categories",

  state: { categories: [] },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathname === "/" ||
          pathname === "/online_bestellen" ||
          pathname === "/admin/products"
        ) {
          dispatch({ type: "fetch" });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const categories = yield select((state) => state.categories.categories);
        if (categories.length === 0) {
          const { data } = yield call(
            axios.get,
            `/api/categories/${restaurant_id}`
          );
          yield put({ type: "fetch/success", categories: data });
          return data;
        }
        return categories;
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *addMainCategorie({ payload }, { call, put, select }) {
      try {
        console.log(payload);
        const { data } = yield call(
          axios.post,
          `/api/categories/addMainCategorie/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/categories/updateMainCategorie",
          mainCategories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateMainCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/categories/updateMainCategorie/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/categories/updateMainCategorie",
          mainCategories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteMainCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/categories/deleteMainCategorie/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/categories/updateMainCategorie",
          mainCategories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/categories/addCategorie/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/categories/updateCategorie",
          categories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/categories/updateCategorie/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/categories/updateCategorie",
          categories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/categories/deleteCategorie/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/categories/updateCategorie",
          categories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    "fetch/success"(state, action) {
      return {
        error: null,
        categories: action.categories,
      };
    },

    "fetch/error"(state, action) {
      return {
        error: action.error,
        categories: [],
      };
    },
  },
};
