import React from 'react';
import {COLORS} from "./constants";
import {Image} from "antd";
import {getImageUrl} from "../util/Commons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import ScrollAnimation from 'react-animate-on-scroll';

const AboutUsTemplate1 = ({about, businessOwnerImageId, businessId, businessName}) => {
    const imageUrl = getImageUrl(businessId, businessOwnerImageId)

    const screens = useBreakpoint();

    return <div style={{
        backgroundColor: COLORS.PRIMARY_BACKGROUND,
        margin: 10,
    }}>
        <div
            id={'about-us'}
            style={{
                display: 'flex',
                flexDirection: screens.md ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10
            }}>
            <div className="image-container"
                 style={{
                     display: 'flex',
                     justifyContent: 'center',
                     flex: screens.md ? '0 0 40%' : '1'}}>

                <ScrollAnimation
                    animateOnce={true}
                    animateIn={"fadeInLeft"}
                    duration={1}>
                    <Image
                        height={'70vh'}
                        width={'auto'}
                        style={{
                            objectFit: 'contain'
                        }}
                        src={imageUrl}
                        alt="image"
                        loading="lazy"
                        preview={false}
                    />
                </ScrollAnimation>
            </div>
            <div className="about-us-container" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flexWrap: 'wrap'
            }}>

                <ScrollAnimation
                    animateIn={"fadeInRight"}
                    animateOnce={true}
                    duration={1}>
                    <h1 style={{
                        position: 'relative',
                        top: 10,
                        marginTop: 0,
                        color: COLORS.PRIMARY_COLOR,
                        whiteSpace: 'nowrap'
                    }}>About <span style={{textTransform: 'uppercase'}}>{businessName}</span></h1>
                    <p style={{ color: COLORS.PRIMARY_COLOR }}> {/* Vertically center p */}
                        {about}
                    </p>
                </ScrollAnimation>
            </div>
        </div>
    </div>
}

export default AboutUsTemplate1;
