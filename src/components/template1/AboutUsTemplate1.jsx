import React from 'react';
import {COLORS} from "./constants";
import {Image} from "antd";
import {getImageUrl} from "../util/Commons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const AboutUsTemplate1 = ({about, businessOwnerImageId, businessId, businessName}) => {
    const imageUrl = getImageUrl(businessId, businessOwnerImageId)

    const screens = useBreakpoint();

    return <div
        id={'about-us'}
        style={{
        display: 'flex',
        flexDirection: screens.md ? 'row' : 'column',
        width: '100vw',
        backgroundColor: COLORS.PRIMARY_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10
    }}>
        <div className="image-container" style={{ display: 'flex', justifyContent: 'center', flex: screens.md ? '0 0 40%' : '1',  }}>
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
        </div>
    </div>
}

export default AboutUsTemplate1;
