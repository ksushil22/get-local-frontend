import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    businessId: localStorage.getItem("businessId") || null
};

const templateBusiness = createSlice({
    name: "templateBusiness",
    initialState,
    reducers: {
        setCurrentBusiness: (state, action) => {
            state.businessId = action.payload.id;

            localStorage.setItem("businessId", action.payload.id);
        },
        removeBusiness: (state) => {
            state.businessId = null;

            sessionStorage.removeItem("businessId");
        },
    },
});

export const { setCurrentBusiness, removeBusiness } = templateBusiness.actions;

export default templateBusiness.reducer;

export const selectCurrentBusiness = (state) => state.business.businessId;
