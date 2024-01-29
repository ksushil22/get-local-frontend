import React from 'react';
import {Button, Form, Input} from "antd";
import Login from "../components/authentication/Login";
import {useNavigate} from "react-router-dom";
import {useValidateTokenQuery} from "../redux/services/authAPI";
import CustomSpinner from "../components/util/CustomSpinner";

export default function () {
    // const navigate = useNavigate();
    //
    // if (localStorage.getItem('access')) {
    //     const {
    //         data: isValidToken,
    //         isLoading,
    //         error
    //     } = useValidateTokenQuery(localStorage.getItem('access'));
    //     if (isLoading) {
    //         return <CustomSpinner text={'Validating..'}/>
    //     }else if (error) {
    //         console.error(error)
    //     }else if (isValidToken) {
    //         navigate('/')
    //     }
    // }
    return <Login />
}
