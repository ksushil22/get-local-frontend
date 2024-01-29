import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logOut} from "../redux/slicers/authSlicer";

export default function () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <>
        hell yeah!!
        <button onClick={() => {
            dispatch(logOut())
            navigate('/authenticate')
        }}>Logout</button>
    </>
}
