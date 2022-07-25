import { SET_ORDER, DELETE_ORDER } from './constant'

export const setOrder = data => ({
    type: SET_ORDER,
    payload: data,
})

export const deleteOrder = data => ({
    type: DELETE_ORDER,
    payload: data,
})