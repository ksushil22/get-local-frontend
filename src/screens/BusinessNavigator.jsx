import React, {useEffect} from 'react';
import CustomSpinner, {DISPLAY, SPINNERS} from "../components/util/customSpinner/CustomSpinner";
import {useNavigate, useParams} from "react-router-dom";
import {useGetTemplateInformationQuery} from "../redux/services/businessAPI";
import {setCurrentBusiness} from "../redux/slicers/businessSlicer";
import {useDispatch} from "react-redux";

const BusinessNavigator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {businessUsername: businessUsername} = useParams();
    const {data: templateInformation} = useGetTemplateInformationQuery({businessUsername: businessUsername})

    useEffect(() => {
        if (templateInformation) {
            dispatch(setCurrentBusiness({id: templateInformation?.id}))
            navigate(`/${templateInformation.templateId}/home/`);
        }
    }, [templateInformation]);


    return <CustomSpinner display={DISPLAY.FULLSCREEN} spinner={SPINNERS.CUSTOM}/>
}

export default BusinessNavigator;
