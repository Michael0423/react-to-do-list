import { createSlice } from '@reduxjs/toolkit'
import * as firebase from '../firebaseAPI'

export const loginSlice = createSlice({
    name: 'isLogin',
    initialState: {
        value: true
    },
    reducers: {
        login: (state) => {
            // Promise.resolve(firebase.login()).then(rs => {
            //     console.log(rs);  
            // });
              
            state.value = true;
        },
        logout: (state) => {
            state.value = false
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer