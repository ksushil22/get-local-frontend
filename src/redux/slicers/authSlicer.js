import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "getLocalAuth",
    initialState: { username: null, name:null, token: {access: null, refresh: null} },
    reducers: {
        setCredentials: (state, action) => {
            console.log(action)
            // set the token and user name here
            const token = {
                access: action.payload.access,
                refresh: action.payload.refresh,
            };

            const { username, name } = action.payload;

            state.username = username;
            state.token = token;
            state.name = name;

            // set the token in localStorage
            if(token) {
                localStorage.setItem("access", token.access)
                localStorage.setItem("refresh", token.refresh)
            }
        },
        logOut: (state, action) => {
            state.username = null;
            state.token.access = null;
            state.token.refresh = null;
            state.name=''
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.username;
