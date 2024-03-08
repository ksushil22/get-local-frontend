import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useUserProfileQuery} from "../../redux/services/authAPI";
import {setCurrentBusiness} from "../../redux/slicers/businessSlicer";
import {Dropdown, Row, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import "./home.css"
import AboutUs from "./AboutUs";
import {useLazyGetBusinessQuery} from "../../redux/services/businessAPI";
import UploadPictures from "../util/upload/UploadPicture";
import CustomPopover from "../util/CustomPopover";

export default function Home() {
    const dispatch = useDispatch();
    const { data: userProfileData, isLoading } = useUserProfileQuery();
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [triggerBusinessQuery, {
        data: businessData,
        isLoading: loadingBusinessData
    }] = useLazyGetBusinessQuery();

    useEffect(() => {
        if (!isLoading && userProfileData && userProfileData.businesses.length > 0) {
            setSelectedBusiness({
                id: userProfileData.businesses[0].id,
                name: userProfileData.businesses[0].name
            });
        }
    }, [isLoading, userProfileData]);
    

    useEffect(() => {
        if (selectedBusiness) {
            dispatch(setCurrentBusiness({ id: selectedBusiness.id }));
            triggerBusinessQuery(selectedBusiness.id)
        }
    }, [selectedBusiness, dispatch, triggerBusinessQuery]);

    const handleMenuClick = (e) => {
        setSelectedBusiness({
            id: e.key,
            name: e.label
        });
    };

    const user = userProfileData ? userProfileData.user : null;
    const businesses = userProfileData ? userProfileData.businesses || [] : [];

    const items = businesses.map(business => ({
        label: <p style={{fontWeight: 'bold'}}>{business.name}</p>,
        key: business.id
    }));

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Row>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <div>
                    {businesses.length !== 0 ?
                        businesses.length === 1 ?
                            <p style={{ borderBottom: '1px solid black', display: 'inline-block', fontSize: 'medium', height: '30px', padding: 0, fontWeight: 'bold', float: 'right' }}>
                                {businesses[0].name}
                            </p> :
                            <Dropdown menu={menuProps}>
                                <button style={{ border: 'none', background: 'none', borderBottom: '1px solid black', fontSize: 'medium', height: '50px' , fontWeight: 'bold', float: 'right'}}>
                                    <Space>Your Businesses <DownOutlined /></Space>
                                </button>
                            </Dropdown> :
                        <p>Register a business</p>}
                </div>

                <div >
                    <h1 style={homeStyle.heading}>Welcome {user ? user.name.split(' ')[0] : ''}!</h1>
                </div>
            </div>
            <AboutUs aboutUs={businessData?.aboutUs} isLoading={loadingBusinessData}/>
            <div style={{
                width: '100%'
            }}>
                <p style={{
                    fontSize: 20
                }}>Upload Carousel Pictures <CustomPopover content={"We suggest uploading authentic pictures clicked by you. This will be displayed" +
                    " on the very top."}/> </p>
                <UploadPictures style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: '100%'
                }} maxUploads={3} accept="image/png, image/jpeg"/>
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
