import React, {useEffect} from 'react';
import CustomSpinner, {DISPLAY, SPINNERS} from "../components/util/customSpinner/CustomSpinner";
import {useNavigate, useParams} from "react-router-dom";
import {useGetTemplateInformationQuery} from "../redux/services/businessAPI";

const BusinessNavigator = () => {
    const navigate = useNavigate();
    const {businessUsername: businessUsername} = useParams();
    const {data: templateInformation} = useGetTemplateInformationQuery({businessUsername: businessUsername})

    useEffect(() => {
        if (templateInformation) {
            sessionStorage.setItem("businessId", templateInformation.id)
            navigate(`/${templateInformation.templateId}/home/`);
        }
    }, [templateInformation]);


    return <CustomSpinner display={DISPLAY.FULLSCREEN} spinner={SPINNERS.CUSTOM}/>
}

export default BusinessNavigator;
