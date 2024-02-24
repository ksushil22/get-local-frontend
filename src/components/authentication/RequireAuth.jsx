import React, { useContext, useEffect } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const RequireAuth = () => {

    const dispatch = useDispatch();

    //check if we have a token
    const token = sessionStorage?.getItem("access");
    const location = useLocation();

    // useEffect hook to listen to the history and scroll the user to the top of the page when they change components
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location]);
    if (token) {
        
    }

    return token ? <Outlet /> : <Navigate to="/authenticate" state={{ from: location }} />;
};

export default RequireAuth;
