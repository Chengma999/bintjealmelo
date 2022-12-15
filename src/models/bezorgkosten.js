import axios from 'axios'

export default {

  namespace: 'bezorgkosten',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen((props) => {
        if (props.pathname==="/"||props.pathname==="/online_bestellen"||props.pathname.includes("/checkout")||props.pathname.includes("/admin")) {
           dispatch({type:'fetch'})
        }

        })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const {data} = yield call(axios.get, '/api/bezorgkosten');
        yield put({ type: "fetch/success", bezorgkosten: data });
      } catch(e) {
         yield put({ type: "fetch/error", error: e.message });
      }
    },
  },

  reducers: {
    'fetch/success'(state, action) {
      return {
        fee:action.bezorgkosten,
        error:null
      };
    },
    'fetch/error'(state,action){
      return {
         fee:0,
         error:action.error}
    }
  },

};
