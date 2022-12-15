import axios from "axios";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;

export default {
  namespace: "products",

  state: {
    products: [],
    succeedId: null,
    updateSucceed: false,
    deleteSucceed: false,
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((props) => {
        if (
          props.pathname === "/" ||
          props.pathname === "/online_bestellen" ||
          props.pathname === "/admin/products"
        ) {
          dispatch({ type: "fetch", payload: {} });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const { ignoreProductsExition } = payload;
        const products = yield select((state) => state.products.products);
        if (products.length === 0 || ignoreProductsExition) {
          const { data } = yield call(
            axios.get,
            `/api/products/${restaurant_id}`
          );
          yield put({ type: "fetch/success", products: data });
        }
        return;
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *addProduct({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.post,
          "/api/products/addProduct",
          payload
        );
        yield put({ type: "add", products: data });
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *updateProduct({ payload }, { call, put, select }) {
      const { oldId, id, _id, ignoreIdDuplication } = payload;
      try {
        const products = yield select((state) => state.products.products);
        const originalProducts = products.slice();
        const indexOldId = originalProducts.findIndex((item) => {
          return item.id === oldId && item._id === _id;
        });
        // originalProducts.splice(indexOldId, 1);
        const indexId = originalProducts.findIndex((item) => item.id === id);
        if (!ignoreIdDuplication && indexId > -1 && oldId !== id) {
          return { err: "Product Id mag niet hetzelfde zijn." };
        }
        payload._id = originalProducts[indexOldId]._id;
        const { data } = yield call(
          axios.post,
          "/api/products/updateProduct",
          payload
        );
        yield put({
          type: "update",
          product: { ...originalProducts[indexOldId], ...payload },
          _id,
        });
        return data;
      } catch (e) {
        yield put({ type: "update/error", error: e.message, id });
      }
    },
    *bulkUpdateProducts({ payload }, { call, put, select }) {
      try {
        payload.restaurant_id = restaurant_id;
        const { data } = yield call(
          axios.post,
          "/api/products/bulkUpdateProducts",
          payload
        );
        if (data.ok === 1) {
          yield put({
            type: "bulkUpdate",
            payload,
          });
        }
        return data;
      } catch (e) {
        yield put({ type: "update/error", error: e.message });
      }
    },
    *deleteProduct({ payload }, { call, put }) {
      const { id } = payload;
      try {
        yield call(axios.post, "/api/products/deleteProduct", payload);
        yield put({ type: "delete", id });
      } catch (e) {
        yield put({ type: "delete/error", error: e.message, id });
      }
    },
  },

  reducers: {
    "fetch/success"(state, { products }) {
      return {
        ...state,
        error: null,
        products,
      };
    },

    "fetch/error"(state, action) {
      return {
        error: action.error,
        products: [],
      };
    },
    add(state, { products }) {
      const copiedProducts = state.products.slice();
      copiedProducts.push(...products);
      copiedProducts.sort((a, b) => a.id - b.id);
      return {
        ...state,
        error: null,
        products: copiedProducts,
        succeedId: products[0].id,
      };
    },
    delete(state, { id }) {
      const copiedProducts = state.products.slice();
      const index = copiedProducts.findIndex(
        (copiedProduct) => copiedProduct.id === id
      );
      copiedProducts.splice(index, 1);
      return {
        ...state,
        error: null,
        products: copiedProducts,
        deleteSucceed: true,
      };
    },
    update(state, { product, _id }) {
      const originalProducts = state.products.slice();
      const index = originalProducts.findIndex(
        (originalProduct) => originalProduct._id === _id
      );
      delete product["oldId"];
      originalProducts.splice(index, 1, product);
      originalProducts.sort((a, b) => a.id - b.id);
      return {
        ...state,
        error: null,
        products: originalProducts,
        updateSucceed: true,
      };
    },
    bulkUpdateProducts(state, { payload }) {
      const {
        beginId,
        endId,
        categorie,
        menukind,
        discount,
        extra,
        allergy,
        printgroup,
        btw,
      } = payload;
      let update = {};
      if (categorie) {
        update.categorie = categorie;
      }
      if (menukind) {
        update.menukind = menukind;
      }
      if (discount !== undefined) {
        update.discount = discount;
      }
      if (extra !== undefined) {
        update.extra = extra;
      }
      if (allergy) {
        update.allergy = allergy;
      }

      if (printgroup) {
        update.printgroup = printgroup;
      }

      if (btw) {
        update.btw = btw;
      }

      const originalProducts = state.products.slice();
      const productsAfterBulkUpdate = originalProducts.map((product) => {
        if (product.id <= endId && product.id >= beginId) {
          for (const key in update) {
            product[key] = update[key];
          }
          return product;
        }
        return product;
      });
      return {
        ...state,
        products: productsAfterBulkUpdate,
      };
    },
    cancel(state, { product, oldId }) {
      return {
        ...state,
        error: null,
        updateSucceed: false,
        deleteSucceed: false,
        succeedId: null,
      };
    },
  },
};
