import React from 'react';
import {Button, Form, Input} from "antd";
import Login from "../components/authentication/Login";
import {useNavigate} from "react-router-dom";
import {useValidateTokenQuery} from "../redux/services/authAPI";
import CustomSpinner from "../components/util/customSpinner/CustomSpinner";
import {useDispatch} from "react-redux";
import {logOut} from "../redux/slicers/authSlicer";

export default function () {

    return <Login />
}
