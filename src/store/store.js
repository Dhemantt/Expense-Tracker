import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from '../feature/uiSlice'

 const store = configureStore({
    reducer : {
        user : authReducer
    }
})
 
export default store;
