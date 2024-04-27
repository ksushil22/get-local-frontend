import React from 'react'
import BusinessHeading from "../util/BusinessHeading";
import {useGetBusinessReviewsQuery} from "../../redux/services/businessAPI";
import {useSelector} from "react-redux";
import CustomSpinner, {DISPLAY_TYPES_ENUM, SPINNERS} from "../util/customSpinner/CustomSpinner";
import {Image, List, Row} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {GET_BUSINESS} from "../../redux/api_url";
import "./businessReview.css"
import GetRating from "../util/GetRating";

const BASE_URL = process.env.BASE_API_URL;

const BusinessReview = () => {
    const businessId = useSelector((state) => state.business.businessId);

    const {
        data: reviews,
        isLoading: loadingReviews
    } = useGetBusinessReviewsQuery({businessId: businessId})
    if (loadingReviews) {
        return <CustomSpinner spinner={SPINNERS.CUSTOM} display={DISPLAY_TYPES_ENUM.FULLSCREEN}/>
    }

    return (

        <Row>
            <BusinessHeading heading={"Reviews"}/>
            <List
                itemLayout="vertical"
                style={{
                    width: '100%',
                    marginTop: 50
                }}
                size="large"
                dataSource={reviews}
                renderItem={(review) => (
                    <ReviewCards
                        item={review}
                        businessId={businessId}
                    />)}
                locale={{
                    emptyText: <>
                        <FontAwesomeIcon icon={faExclamation} size={"5x"}/>
                        <p>No Review Available</p>
                    </>
                }}
            />
        </Row>

    )

}
const ReviewCards = ({item, businessId}) => {
    const screens = useBreakpoint();
    const cardMargin = screens.md || screens.lg || screens.xl || screens.xxl ? 50 : 12;

    return <List.Item
        className={"item-card"}
        style={{
            marginRight: cardMargin,
            marginLeft: cardMargin
        }}
        colStyle={{
            border: '1px solid red'
        }}
        extra={
        <div>
            <Image
                width={200}
                alt={item.fullName}
                src={`${BASE_URL}${GET_BUSINESS}free/${businessId}/image/${item.imageId}`}
                style={{
                    borderRadius: '5px'
                }}
            />
        </div>

        }
        key={item.id}
    >
        <List.Item.Meta
            title={<p style={{
                margin: 0,
                fontWeight: 'bolder',
                fontSize: 'x-large',
                color: 'gray'
            }}>{item.fullName}</p>}
            description={
                <GetRating readOnly={true} initialRating={item.rating} onSelect={() => {}}/>}
        />
        <p style={{fontSize: 'large'}}>{item.comment}</p>
    </List.Item>
}

export default BusinessReview;
