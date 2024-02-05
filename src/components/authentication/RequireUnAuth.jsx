import React from 'react'
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useValidateTokenQuery} from "../../redux/services/authAPI";
import CustomSpinner from "../util/customSpinner/CustomSpinner";
import {logOut} from "../../redux/slicers/authSlicer";

export default function () {
    const dispatch = useDispatch();

    if (localStorage.getItem('access')) {
        const {
            data: isValidToken,
            isLoading,
            error
        } = useValidateTokenQuery(localStorage.getItem('access'));
        if (isLoading) {
            return <CustomSpinner />;
        }else if (error) {
            dispatch(logOut());
            return <Outlet />
        }else {
            return <Navigate to="/" />
        }
    } else {
        return <Outlet />
    }
}
