import { configureStore } from "@reduxjs/toolkit";
import { rootAPI } from "./services/rootAPI.js";
import authSlicer from "./slicers/authSlicer";

export const store = configureStore({
    reducer: {
        [rootAPI.reducerPath]: rootAPI.reducer,
        authSlicer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            rootAPI.middleware,
            (store) => (next) => (action) => {
                return next(action);
            }
        ),
    devTools: true,
});

export default store;
