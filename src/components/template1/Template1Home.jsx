import React, {useEffect, useState} from 'react';
import {Row} from "antd";
import {useGetBusinessImagesQuery, useGetPublicBusinessInfoQuery} from "../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../util/customSpinner/GetLoader";
import GetCarousel from "../util/carousel/GetCarousel";
import {COLORS, StyledDiv} from "./constants";
import AboutUsTemplate1 from "./AboutUsTemplate1";
import TeamTemplate1 from "./TeamTemplate1";
import ReviewTemplate1 from "./ReviewTemplate1";

const Template1Home = ({
                           businessId
                       }) => {
    const [images, setImages] = useState([]);
    const {data: carouselImages, isLoading: loadingCarouselImages} = useGetBusinessImagesQuery({
        'businessId': businessId, 'type': 'CAROUSEL'
    })

    const {
        data: businessData,
        isLoading: loadingBusinessData,
        refetch: refetchBusinessInfo
    } = useGetPublicBusinessInfoQuery({businessId: businessId}, {skip: businessId === null});

    useEffect(() => {
        if (businessId) {
            refetchBusinessInfo()
        }
    }, [businessId, refetchBusinessInfo]);

    useEffect(() => {
        if (carouselImages) {
            const carouselImagesFormatted = [];
            carouselImages.map((carouselImage) => {
                carouselImagesFormatted.push({
                    uid: carouselImage?.id,
                    name: carouselImage?.name,
                    status: 'done',
                    url: `data:${carouselImage?.extension};base64,${carouselImage?.image}`
                });
            })

            setImages(carouselImagesFormatted);
        }

    }, [carouselImages, setImages])

    if (loadingBusinessData || loadingCarouselImages) {
        return <GetLoader display={DISPLAY.FULLSCREEN} spinner={SPINNERS.MOVING_DOT_SPINNER}/>
    }
    return <StyledDiv style={{
        width: '100%'
    }}>
        {loadingCarouselImages ? (
            <GetLoader spinner={SPINNERS.MOVING_DOT_SPINNER} display={DISPLAY.AREA}/>
        ) : (
            <GetCarousel images={images} background={COLORS.PRIMARY_BACKGROUND}/>
        )}
        <AboutUsTemplate1 about={businessData?.aboutUs}
                          businessId={businessId}
                          businessOwnerImageId={businessData?.ownerImageId}
                          businessName={businessData?.name}/>
        <TeamTemplate1 businessId={businessId} />
        <ReviewTemplate1 />
    </StyledDiv>
}

export default Template1Home;

const Template1HomeStyles = {
    carouselContent: {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79'
    }
}
