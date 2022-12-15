import axios from "axios";
import { routerRedux } from "dva/router";
import gegevens from "Utilities/gegevens";
const { restaurant_id } = gegevens;

export default {
  namespace: "login",

  state: {
    token: undefined,
    usernameIsWrong: false,
    passwordIsWrong: false,
    connectionError: false,
    errorText: undefined,
  },

  subscriptions: {
    // setup({ dispatch, history }) {   },
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.post,
          `/api/auth/${restaurant_id}`,
          payload
        );
        const { token, usernameIsWrong, passwordIsWrong } = data;
        if (token) {
          localStorage.setItem("jwtToken", token);
          yield put(routerRedux.push("/admin"));
          yield put({ type: "success", token });
        }
        yield put({ type: "error", usernameIsWrong, passwordIsWrong });

        return data;
      } catch (e) {
        console.log(e);
        yield put({ type: "error", connectionError: true });
      }
    },
  },

  reducers: {
    success(state, { token }) {
      return { ...state, token };
    },
    error(state, { usernameIsWrong, passwordIsWrong, connectionError }) {
      const errorText = usernameIsWrong
        ? "De geruikersnaam bestaat niet."
        : passwordIsWrong
        ? "De wachtwoord is fout."
        : connectionError
        ? "Er is fout ontdekt met de verbinding"
        : null;
      return {
        ...state,
        usernameIsWrong,
        passwordIsWrong,
        connectionError,
        errorText,
        token: undefined,
      };
    },
  },
};
