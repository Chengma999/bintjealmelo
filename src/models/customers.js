import axios from "axios";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;
export default {
  namespace: "customers",

  state: {
    customers: [],
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((props) => {
        if (props.pathname === "/admin/customers") {
          dispatch({ type: "fetchCustomers", payload: {} });
        }
      });
    },
  },

  effects: {
    *fetchCustomers({ payload }, { call, put, select }) {
      try {
        const customers = yield select((state) => state.customers.customers);
        if (customers.length === 0) {
          const { data } = yield call(
            axios.get,
            `/api/customers/${restaurant_id}`
          );
          yield put({ type: "fetchCustomers/success", customers: data });
        }
        return;
      } catch (e) {
        yield put({ type: "fetchCustomers/error", error: e.message });
      }
    },
  },
  reducers: {
    "fetchCustomers/success"(state, { customers }) {
      return {
        ...state,
        error: null,
        customers,
      };
    },
    "fetchCustomers/error"(state, action) {
      return {
        error: action.error,
        customers: [],
      };
    },
  },
};
