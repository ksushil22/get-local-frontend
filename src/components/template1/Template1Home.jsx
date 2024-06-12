import React, {useEffect, useState} from 'react';
import {Carousel, Row} from "antd";
import {useGetBusinessImagesQuery} from "../../redux/services/businessAPI";
import GetLoader, {DISPLAY, SPINNERS} from "../util/customSpinner/GetLoader";
import GetCarousel from "../util/carousel/GetCarousel";
import {COLORS} from "./constants";

const Template1Home = ({
   businessId
}) => {
    const {data: carouselImages, isLoading: loadingCarouselImages} = useGetBusinessImagesQuery({
        'businessId': businessId, 'type': 'CAROUSEL'
    })
    const [images, setImages] = useState([]);
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

    return <Row>
        {loadingCarouselImages ? (
            <GetLoader spinner={SPINNERS.MOVING_DOT_SPINNER} display={DISPLAY.AREA} />
        ) : (
            <GetCarousel images={images} background={COLORS.PRIMARY_BACKGROUND}/>
        )}
        <Row>
        </Row>
    </Row>
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
