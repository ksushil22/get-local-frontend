import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: sessionStorage.getItem("username") || null,
    name: sessionStorage.getItem("name") || null,
    token: {
        access: sessionStorage.getItem("access") || null,
        refresh: sessionStorage.getItem("refresh") || null
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { username, name, access, refresh } = action.payload;

            state.username = username;
            state.name = name;
            state.token.access = access;
            state.token.refresh = refresh;

            sessionStorage.setItem("username", username);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("access", access);
            sessionStorage.setItem("refresh", refresh);
        },
        logOut: (state) => {
            state.username = null;
            state.name = null;
            state.token.access = null;
            state.token.refresh = null;

            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("refresh");
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.auth.username;
