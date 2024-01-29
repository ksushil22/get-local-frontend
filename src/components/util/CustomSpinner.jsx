import React from "react";
import {Col, Layout, Row, Skeleton, Spin} from "antd";
import {Loading3QuartersOutlined} from "@ant-design/icons";
import "./spinner.css"

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
                             text='Loading...'
                         }) {
    const customIndicator = <Loading3QuartersOutlined style={{fontSize: '100px'}} spin={true}/>;
    const containerStyle = (display === DISPLAY_TYPES_ENUM.FULLSCREEN)
        ? {...loaderStyles.fullScreenContainer, ...loaderStyles.centerAlign}
        : {...loaderStyles.areaContainer};

    const displayedSpinner = (loaderType === LOADER_TYPES_ENUM.SPINNER)
        ? (
            <Spin indicator={customIndicator} tip={text} size="large"
                  style={{...loaderStyles.loader, ...loaderStyles.spinnerContainer}}>
                <div className="loader-content" style={loaderStyles.areaContainer}/>
            </Spin>
        )
        : (
            <Skeleton active={true} paragraph={{row: 2}}/>
        )
    ;
    return (
        <Layout style={(useBackground) ? containerStyle : {}}>
            {displayedSpinner}
        </Layout>
    )
}


const loaderStyles = {
    areaContainer: {
        width: '100%',
        height: '100%'
    },
    fullScreenContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
    },
    centerAlign: {
        display: 'flex',
        flexDirection: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader: {
        width: '100%',
        fontWeight: 800,
        fontSize: '500px',
        color: '#495c52'
    },
    spinnerContainer: {
        animation: "spinAndFade 2s linear infinite",
    },
};

