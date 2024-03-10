import React from 'react'
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import MainNavigation from "./MainNavigation";
import "./layout.css"
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

export default function GetLocalsLayout() {

    const screens = useBreakpoint();
    const padding = screens.lg || screens.xl || screens.xxl ? '12%' : '0';

    return (
        <Layout style={{
            minHeight: '100vh',
        }}>
            <MainNavigation/>
            <Content
                style={{
                    background: '#fff',
                    padding: 20,
                    marginLeft: padding,
                    marginRight: padding,
                    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)'
                }}>
                <Outlet/>
            </Content>
            <Footer>
                <div >
                        asdlfkjasldjf
                </div>
            </Footer>
        </Layout>
    )
}
