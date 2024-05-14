import React from "react";
import ModalPopup from "../util/modals/ModalPopup";
import {Col, Image, Row} from "antd";
import {GET_BUSINESS} from "../../redux/api_url";
import {useSelector} from "react-redux";

const BASE_URL = process.env.BASE_API_URL;

const ContactRequestModal = ({
    visible,
    setVisible,
    request,
    setRequest
}) => {
    const businessId = useSelector((state) => state.business.businessId);

    return <ModalPopup
        visible={visible}
        title={request?.subject}
        handleCancel={() => {
            setRequest(null)
            setVisible(false)
        }}
        disableScreenTouch={false}
        showCancel={false}
    >
        <Row style={{
            textAlign: 'left'
        }}>
            {request?.imageId && (
                <Col style={{
                    textAlign: 'center'
                }} sm={24} md={24} lg={24}>
                    <Image
                        width={200}
                        alt={request?.fullName}
                        src={`${BASE_URL}${GET_BUSINESS}free/${businessId}/image/${request?.imageId}/`}
                        style={{
                            borderRadius: '5px'
                        }}
                        loading={"lazy"}
                    />
                </Col>
            )}
            <Col>
                <p>{request?.fullName}</p>
                <p>
                    <a style={{
                        color: 'gray',
                        marginLeft: 20
                    }} href={`mailto:${request?.email}`}>{request?.email}</a>
                </p>
                <p>{request?.message}</p>
            </Col>
        </Row>

    </ModalPopup>
}

export default ContactRequestModal;
