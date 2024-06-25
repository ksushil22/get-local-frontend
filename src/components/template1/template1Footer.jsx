import React from 'react';
import {useSelector} from "react-redux";

const Template1Footer = () => {
    const businessId = useSelector((state) => state.business.businessId);
}

export default Template1Footer;
