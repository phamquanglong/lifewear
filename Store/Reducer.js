import {
  SET_NUM,
  DELETE_NUM,
  ADD_NUM,
  SET_WISH_LIST,
  DELETE_WISH_LIST,
  ADD_WISH_LIST,
  SET_FINGERPRINT,
  SET_ADDRESS_ID,
  SET_COUNT_CONFIRMATION,
  SET_BUY_NOW,
} from './constant';
import {
  SET_ORDER,
  DELETE_ORDER,
} from '../screens/Profile/Orders/Store/constant';

const initState = {
  num: 0,
  wishList: [],
  fingerprint: true,
  address: {},
  countConfirmation: 0,
  buyNow: [],
  orders: []
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_NUM:
      return {
        ...state,
        num: action.payload,
      };
    case ADD_NUM:
      return {
        ...state,
        num: state.num + action.payload,
      };
    case DELETE_NUM:
      return {
        ...state,
        num: state.num - action.payload,
      };
    case SET_WISH_LIST:
      return {
        ...state,
        wishList: action.payload,
      };
    case ADD_WISH_LIST:
      return {
        ...state,
        wishList: action.payload,
      };
    case DELETE_WISH_LIST:
      return {
        ...state,
        wishList: action.payload,
      };
    case SET_FINGERPRINT:
      return {
        ...state,
        fingerprint: action.payload,
      };
    case SET_ADDRESS_ID:
      return {
        ...state,
        address: action.payload,
      };
    case SET_COUNT_CONFIRMATION:
      return {
        ...state,
        countConfirmation: action.payload,
      };
    case SET_BUY_NOW:
      return {
        ...state,
        buyNow: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: [
          state.orders,
          action.payload,
        ]
      };
    default:
      return state;
  }
};

export default rootReducer;
