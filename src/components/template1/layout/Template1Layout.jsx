import React, {useEffect, useState} from "react";
import {Button, Layout, Row} from "antd";
import Template1NavBar from "./Template1NavBar";
import {Content, Footer} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import BusinessContactInformation from "./BusinessContactInformation";

const Template1Layout = () => {

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Layout style={{
            minHeight: '100vh',
            backgroundColor: 'white'
        }}>
            <BusinessContactInformation />
            <Template1NavBar />
            <Content>
                <Outlet />
            </Content>
            <Footer>
                <Row style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                }}>
                    © 2024 Neo Corporation, All rights reserved.
                </Row>
            </Footer>
            <div onClick={handleBackToTop} style={{
                position: 'fixed',
                top: '90%',
                right: '2%',
                background: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                color: '#676767',
                padding: 10,
                cursor: 'pointer',
                borderRadius: 5,
                visibility: showBackToTop ? 'visible': 'hidden',
                opacity: showBackToTop ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }} > &#x2191; Back to top </div>
        </Layout>)
}

export default Template1Layout;
