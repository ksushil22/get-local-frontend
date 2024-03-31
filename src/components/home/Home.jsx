import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useUserProfileQuery} from "../../redux/services/authAPI";
import {Row} from "antd";
import "./home.css"
import AboutUs from "./AboutUs";
import {useLazyGetBusinessQuery} from "../../redux/services/businessAPI";
import GetUpload from "../util/upload/GetUpload";
import CustomPopover from "../util/CustomPopover";
import BusinessSelector from "../util/BusinessSelector";

export default function Home() {
    const {data: userProfileData, isLoading} = useUserProfileQuery();
    const [triggerBusinessQuery, {
        data: businessData,
        isLoading: loadingBusinessData
    }] = useLazyGetBusinessQuery();
    const businessId = useSelector((state) => state.business.businessId)

    useEffect(() => {
        if (businessId) {
            triggerBusinessQuery(businessId)
        }
    }, [businessId, triggerBusinessQuery]);

    const user = userProfileData ? userProfileData.user : null;

    return (
        <Row>
            <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                <div>
                    <BusinessSelector />
                </div>

                <div>
                    <h1 style={homeStyle.heading}>Welcome {user ? user.name.split(' ')[0] : ''}!</h1>
                </div>
            </div>
            <AboutUs aboutUs={businessData?.aboutUs} isLoading={loadingBusinessData}/>
            <div style={{
                width: '100%'
            }}>
                <p style={{
                    fontSize: 20
                }}>Upload Carousel Pictures <CustomPopover
                    content={"We suggest uploading authentic pictures clicked by you. This will be displayed" +
                        " on the very top."}/></p>
                <GetUpload
                    type={"CAROUSEL"}
                    maxUploads={3}
                    accept="image/png, image/jpeg"/>
            </div>
        </Row>
    );
}


const homeStyle = {
    heading: {
        fontWeight: 'bolder',
        fontSize: '2.5em',
        paddingLeft: '30px',
        color: '#605f5f',
        margin: 0
    }
}