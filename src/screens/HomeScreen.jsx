import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logOut} from "../redux/slicers/authSlicer";
import Home from "../components/home/Home";

export default function () {

    return <Home />
}
