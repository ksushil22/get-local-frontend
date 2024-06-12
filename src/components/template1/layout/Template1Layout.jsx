import React from "react";
import {Layout, Row} from "antd";
import Template1NavBar from "./Template1NavBar";
import {Content, Footer} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import BusinessContactInformation from "./BusinessContactInformation";

const Template1Layout = () => {

    return (
        <Layout style={{
            minHeight: '100vh'
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
        </Layout>)
}

export default Template1Layout;
