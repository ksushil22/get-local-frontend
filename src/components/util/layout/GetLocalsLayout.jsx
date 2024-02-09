import React, {memo} from 'react'
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import MainNavigation from "./MainNavigation";
import "./layout.css"

export default function GetLocalsLayout() {
    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <MainNavigation />
            <Content style={{
                background: 'var(--primary-background)',
                paddingTop: 20,
                paddingLeft: '20%'
            }}>
                <Outlet />
            </Content>
            <Footer>
                asdfsadf
            </Footer>
        </Layout>
    )
}
