import axios from "axios";
import { routerRedux } from "dva/router";

export default {
  namespace: "cart",

  state: { cart: [], totalPrice: 0, discountAmount: 0, subtotalPrice: 0 },

  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    },
    *ready_to_pay({ payload }, { call, put, select }) {
      try {
        const { isEnabled, fee } = yield select(
          (state) => state.basicinfo.plastictas
        );
        if (
          isEnabled &&
          payload.cartProducts.findIndex(
            (product) => product.title === "tas"
          ) === -1
        ) {
          payload.cartProducts = [
            ...payload.cartProducts,
            {
              id: 987987,
              title: "tas",
              price: fee,
              chi_cha: "tas",
              quantity: 1,
              subTotal: fee,
            },
          ];
          payload.subtotalPrice += fee;
          payload.totalPrice += fee;
        }
        const { data } = yield call(axios.post, "/api/checkout", payload);
        const { orderId } = data;
        yield put(routerRedux.push(`/checkout/${orderId}`));
      } catch (e) {
        console.log(e);
      }
    },
    *add({ payload }, { call, put, select }) {
      const products = yield select((state) => state.products.products);
      const restaurantType = yield select(
        (state) => state.basicinfo.restaurantType
      );
      yield put({
        type: "reducer/add",
        payload: { products, restaurantType, ...payload },
      });
    },
    *delete({ payload }, { call, put, select }) {
      const products = yield select((state) => state.products.products);
      const restaurantType = yield select(
        (state) => state.basicinfo.restaurantType
      );
      yield put({
        type: "reducer/delete",
        payload: { products, restaurantType, ...payload },
      });
    },
  },

  reducers: {
    "reducer/add"(state, { payload }) {
      const {
        id,
        option,
        option_chi_cha,
        subTotal,
        products,
        discount,
        restaurantType,
        halfPortion,
      } = payload;
      let arr = state.cart.slice();
      if (payload.option === undefined) {
        let found = arr.find(function (element) {
          return element.id === id;
        });
        let foundIndex = arr.findIndex(function (element) {
          return element.id === id;
        });
        if (foundIndex === -1) {
          arr.push({
            id: id,
            quantity: 1,
            subTotal: subTotal,
            discount,
            halfPortion,
          });
        } else if (payload.location === "winkelwagen") {
          arr.splice(foundIndex, 1, {
            id: id,
            quantity: found.quantity + 1,
            subTotal: (subTotal / found.quantity) * (found.quantity + 1),
            discount,
            halfPortion: found.halfPortion,
          });
        } else {
          arr.splice(foundIndex, 1, {
            id: payload.id,
            quantity: found.quantity + 1,
            subTotal: payload.subTotal + found.subTotal,
            discount,
            halfPortion,
          });
        }
      } else {
        let found = arr.find(function (element) {
          return (
            element.id === id &&
            element.option.sort().toString() === option.sort().toString() &&
            element.halfPortion === halfPortion
          );
        });
        let foundIndex = arr.findIndex(function (element) {
          return (
            element.id === id &&
            element.option.sort().toString() === option.sort().toString() &&
            element.halfPortion === halfPortion
          );
        });
        if (foundIndex === -1) {
          arr.push(
            restaurantType === "chinees"
              ? {
                  id: id,
                  option: option,
                  option_chi_cha: option_chi_cha,
                  quantity: 1,
                  subTotal: subTotal,
                  discount,
                  halfPortion,
                }
              : {
                  id: id,
                  option: option,
                  quantity: 1,
                  subTotal: subTotal,
                  discount,
                  halfPortion,
                }
          );
        } else if (payload.location === "winkelwagen") {
          const oldArr = [...state.cart];
          const found_chi_cha = oldArr[foundIndex].option_chi_cha;

          arr.splice(
            foundIndex,
            1,
            restaurantType === "chinees"
              ? {
                  id: id,
                  option: option,
                  option_chi_cha: [...found_chi_cha],
                  quantity: found.quantity + 1,
                  subTotal: (subTotal / found.quantity) * (found.quantity + 1),
                  discount,
                  halfPortion,
                }
              : {
                  id: id,
                  option: option,
                  quantity: found.quantity + 1,
                  subTotal: (subTotal / found.quantity) * (found.quantity + 1),
                  discount,
                  halfPortion,
                }
          );
        } else {
          arr.splice(
            foundIndex,
            1,
            restaurantType === "chinees"
              ? {
                  id: id,
                  option: option,
                  option_chi_cha: option_chi_cha,
                  quantity: found.quantity + 1,
                  subTotal: subTotal + found.subTotal,
                  discount,
                  halfPortion,
                }
              : {
                  id: id,
                  option: option,
                  quantity: found.quantity + 1,
                  subTotal: subTotal + found.subTotal,
                  discount,
                  halfPortion,
                }
          );
        }
      }
      let discountAmount = 0;
      let subtotalPrice = 0;
      let totalPrice = 0;

      arr.forEach((item) => {
        subtotalPrice += item.subTotal;
      });

      totalPrice = subtotalPrice;
      arr = arr.map((arrprod) => {
        const found = products.find((prod) => prod.id === arrprod.id);
        return { ...arrprod, printgroup: found.printgroup };
      });
      return { cart: arr, discountAmount, subtotalPrice, totalPrice };
    },

    "reducer/delete"(state, { payload }) {
      const { id, option, subTotal, products, restaurantType, halfPortion } =
        payload;
      let arr = state.cart.slice();
      if (payload.option === undefined) {
        let found = arr.find(function (element) {
          return element.id === payload.id;
        });
        let foundIndex = arr.findIndex(function (element) {
          return element.id === payload.id;
        });
        if (foundIndex === -1) {
          arr.push({ id: payload.id, quantity: 1, subTotal: payload.subTotal });
        } else if (found.quantity === 1) {
          arr.splice(foundIndex, 1);
        } else {
          arr.splice(foundIndex, 1, {
            id: payload.id,
            quantity: found.quantity - 1,
            subTotal:
              (payload.subTotal / found.quantity) * (found.quantity - 1),
            discount: found.discount,
          });
        }
      } else {
        let found = arr.find(function (element) {
          return (
            element.id === id &&
            element.option.sort().toString() === option.sort().toString() &&
            element.halfPortion === halfPortion
          );
        });
        let foundIndex = arr.findIndex(function (element) {
          return (
            element.id === id &&
            element.option.sort().toString() === option.sort().toString() &&
            element.halfPortion === halfPortion
          );
        });
        if (foundIndex === -1) {
          arr.push({ id: id, option: option, quantity: 1, subTotal: subTotal });
        } else if (found.quantity === 1) {
          arr.splice(foundIndex, 1);
        } else {
          const oldArr = [...state.cart];
          const found_chi_cha = oldArr[foundIndex].option_chi_cha;

          arr.splice(
            foundIndex,
            1,
            restaurantType === "chinees"
              ? {
                  id: id,
                  option: option,
                  option_chi_cha: [...found_chi_cha],
                  quantity: found.quantity - 1,
                  subTotal: (subTotal / found.quantity) * (found.quantity - 1),
                  halfPortion,
                }
              : {
                  id: id,
                  option: option,
                  quantity: found.quantity - 1,
                  subTotal: (subTotal / found.quantity) * (found.quantity - 1),
                  discount: found.discount,
                  halfPortion,
                }
          );
        }
      }
      let discountAmount = 0;
      let subtotalPrice = 0;
      let totalPrice = 0;

      arr.forEach((item) => {
        subtotalPrice += item.subTotal;
      });

      totalPrice = subtotalPrice;
      arr = arr.map((arrprod) => {
        const found = products.find((prod) => prod.id === arrprod.id);
        return { ...arrprod, printgroup: found.printgroup };
      });
      return { cart: arr, discountAmount, subtotalPrice, totalPrice };
    },
  },
};
