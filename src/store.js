import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './reducer/LoginReducer'

export default configureStore({
  reducer: {
    isLogin: LoginReducer
  }
})