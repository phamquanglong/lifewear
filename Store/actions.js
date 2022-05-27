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
  SET_BUY_NOW
} from './constant';

export const setCounter = num => ({
  type: SET_NUM,
  payload: num,
});

export const addCounter = num => ({
  type: ADD_NUM,
  payload: num,
});

export const deleteCounter = num => ({
  type: DELETE_NUM,
  payload: num,
});

export const setWishList = data => ({
  type: SET_WISH_LIST,
  payload: data,
});

export const addWishList = data => ({
  type: ADD_WISH_LIST,
  payload: data,
});

export const deleteWishlist = data => ({
  type: DELETE_WISH_LIST,
  payload: data,
});

export const setFingerprint = data => ({
  type: SET_FINGERPRINT,
  payload: data,
});

export const setAddressId = data => ({
  type: SET_ADDRESS_ID,
  payload: data,
});


export const setCountConfirmation = data => ({
    type: SET_COUNT_CONFIRMATION,
    payload: data,
})

export const setBuyNow = data => ({
  type: SET_BUY_NOW,
  payload: data,
})