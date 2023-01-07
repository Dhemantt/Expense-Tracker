import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    email : '',
    token : '',
    isloggedIn : false
} 

 const uiSlice = createSlice({

    name: "user",
    initialState : initialState,
    reducers: {
        login : (state, action) => {
            console.log(action)
            state.token = action.payload.idToken
            state.email = action.payload.email
            state.isloggedIn = !!state.token 
        },
        logout : (state) => {
            state.token = ''
            state.email = ''
            state.isloggedIn = !!state.token
        }
    }
});

// export const {login, logout} = useSlice.actions;
export const auth = uiSlice.actions;

export default uiSlice.reducer;