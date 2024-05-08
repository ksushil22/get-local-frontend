import React from "react";
import {Col, Row, Skeleton} from "antd";
import CustomIndicator from "./CustomIndicator";

export const DISPLAY_TYPES_ENUM = {
    FULLSCREEN: 0,
    AREA: 1
};
export const SPINNERS = {
    CUSTOM: 0,
    SKELETON: 1
};
export default function ({
                             display = DISPLAY_TYPES_ENUM.FULLSCREEN,
                             useBackground = true,
                             text = "Loading...",
                             spinner = SPINNERS.CUSTOM,
                             skeletonRows = 6
                         }) {
    const containerStyle = (display === DISPLAY_TYPES_ENUM.FULLSCREEN)
        ? {...loaderStyles.centerAlign}
        : {...loaderStyles.areaContainer};

    const displayedSpinner = (spinner === SPINNERS.CUSTOM)
        ? (
            <Col>
                <Row>
                    <CustomIndicator text={text}/>
                </Row>
            </Col>
        )
        : (
            <Skeleton active={true}
                      paragraph={{
                          rows: skeletonRows,
                      }}/>
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

