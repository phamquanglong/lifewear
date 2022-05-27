import { createStore } from '@reduxjs/toolkit'
import rootReducer from './Reducer'

const store = () => createStore(rootReducer)

export default store