import React, { useEffect } from 'react';
import GetLoader, { DISPLAY, SPINNERS } from "../components/util/customSpinner/GetLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTemplateInformationQuery } from "../redux/services/businessAPI";
import { setCurrentBusiness } from "../redux/slicers/businessSlicer";
import { useDispatch } from "react-redux";

const BusinessNavigator = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { businessUsername } = useParams();
    const { data: templateInformation, error, isLoading } = useGetTemplateInformationQuery({ businessUsername });

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                // Handle the error, e.g., navigate to an error page or show a message
                navigate('/error');
            } else if (templateInformation) {
                dispatch(setCurrentBusiness({ id: templateInformation?.id }));
                navigate(`/${templateInformation.templateId}/home/`);
            }
        }
    }, [isLoading, templateInformation, error, dispatch, navigate]);

    if (isLoading) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.ROTATING_DOT_SPINNER} />;
    }

    return null;
}

export default BusinessNavigator;
