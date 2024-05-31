import React from 'react';
import Template1Home from "../../components/template1/Template1Home";
import {useSelector} from "react-redux";

const Template1HomeScreen = () => {
    const businessId = useSelector((state) => state.business.businessId);


    return <Template1Home businessId={businessId}/>
}

export default Template1HomeScreen
