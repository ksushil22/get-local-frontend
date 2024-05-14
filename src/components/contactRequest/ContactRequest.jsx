import React, {useEffect, useState} from "react";
import {Image, List, Row} from "antd";
import BusinessHeading from "../util/BusinessHeading";
import {useGetAllContactRequestsQuery} from "../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import CustomSpinner, {DISPLAY, SPINNERS} from "../util/customSpinner/CustomSpinner";
import {GET_BUSINESS} from "../../redux/api_url";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import NoDataGIF from "../util/NoDataGIF";


const BASE_URL = process.env.BASE_API_URL;

const ContactRequest = () => {
    const businessId = useSelector((state) => state.business.businessId);
    const {
        data: contactRequests,
        isLoading: loadingContactRequests,
        refetch: refetchContactRequests
    } = useGetAllContactRequestsQuery({businessId}, {skip: businessId === null});

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalData, setModalData] = useState(null)
    useEffect(() => {
        if (businessId) {
            refetchContactRequests();
        }
    }, [businessId])

    const ContactItemCard = ({item}) => {
        return <List.Item
            onClick={() => {
                setModalData(item)
                setIsModalVisible(true)
            }}
            className={"contact-request-card"}
            key={item.id}
            extra={
                <Image
                    width={200}
                    alt={item.fullName}
                    src={`${BASE_URL}${GET_BUSINESS}free/${businessId}/image/${item.imageId}`}
                    style={{
                        borderRadius: '5px'
                    }}
                    loading={"lazy"}
                />
            }
        >
            <List.Item.Meta
                title={item.fullName}
                description={item.message}
            />
        </List.Item>
    }

    return <Row>
        <BusinessHeading heading={"Contact Requests"}/>
        {loadingContactRequests ? <CustomSpinner spinner={SPINNERS.SKELETON} display={DISPLAY.AREA}/> :
            <List
                itemLayout="vertical"
                style={{
                    width: '100%',
                    marginTop: 50
                }}
                size="large"
                dataSource={contactRequests}
                renderItem={(request) => (
                    <ContactItemCard
                        item={request}
                    />)}
                locale={{
                    emptyText: <NoDataGIF message={"No Request Available."}/>
                }}
            />
        }

    </Row>
}

export default ContactRequest;
