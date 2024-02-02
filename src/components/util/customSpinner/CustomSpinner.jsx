import React from "react";
import {Col, Layout, Row, Skeleton, Spin} from "antd";
import CustomIndicator from "./CustomIndicator";

export const DISPLAY_TYPES_ENUM = {
    FULLSCREEN: 0,
    AREA: 1
};

export const LOADER_TYPES_ENUM = {
    SKELETON: 0,
    SPINNER: 1
};
export default function ({
                             display = DISPLAY_TYPES_ENUM.FULLSCREEN,
                             loaderType = LOADER_TYPES_ENUM.SPINNER,
                             useBackground = true,
                             text = "Loading..."
                         }) {
    const containerStyle = (display === DISPLAY_TYPES_ENUM.FULLSCREEN)
        ? {...loaderStyles.centerAlign}
        : {...loaderStyles.areaContainer};

    const displayedSpinner = (display === DISPLAY_TYPES_ENUM.FULLSCREEN)
        ? (
            <Col>
                <Row>
                    <CustomIndicator text={text}/>
                </Row>
            </Col>
        )
        : (
            <Skeleton active={true} paragraph={{row: 2}}/>
        )
    ;
    return (
        <div style={(useBackground) ? containerStyle : {}}>
            {displayedSpinner}
        </div>
    )
}


const loaderStyles = {
    areaContainer: {
        width: '100%',
        height: '100%'
    },
    centerAlign: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    }
};

