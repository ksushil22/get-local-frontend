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
                console.log("Dispatching action:", action);
                const result = next(action);
                console.log("State after action:", store.getState());
                return result;
            }
        ),
    devTools: true,
});

export default store;
