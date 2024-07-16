import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter, Navigate, Route, Router, Routes} from 'react-router-dom';
import GetLoader from './components/util/customSpinner/GetLoader';
import RequireAuth from "./components/authentication/RequireAuth";
import "./index.css"
import RequireUnAuth from "./components/authentication/RequireUnAuth";
import GetLayout from "./components/layout/GetLayout";
import {ConfigProvider} from "antd";
import {ActiveNavigationMenuProvider} from "./context/ActiveNavigationProvider";
import Template1Layout from "./components/template1/layout/Template1Layout";
import "animate.css/animate.compat.css";
import {templateIds} from "./components/util/TemplateIdConstants";

const RegistrationScreen = lazy(async () => import('./screens/RegistrationScreen'));
const LoginScreen = lazy(async () => import('./screens/LoginScreen'));
const HomeScreen = lazy(async () => import('./screens/HomeScreen'));
const MenuScreen = lazy(async () => import('./screens/MenuScreen'));
const ReviewScreen = lazy(async () => import('./screens/ReviewScreen'));
const ContactRequestScreen = lazy(async () => import('./screens/ContactRequestScreen'));
const EmployeeInfoScreen = lazy(async () => import('./screens/EmployeeInfoScreen'));
const BusinessNavigator = lazy(async () => import("./screens/BusinessNavigator"));
const Template1HomeScreen = lazy(async () => import("./screens/template1/Template1HomeScreen"));
const Template1MenuScreen = lazy(async () => import("./screens/template1/Template1MenuScreen"));

const GetLocalsRoutes = () => {
    return (
        <Suspense fallback={<GetLoader />}>
            <Provider store={store}>
                <Routes>
                    <Route path={"*"} element={<Navigate to={"/authenticate"}/>} />
                    <Route element={<RequireUnAuth />}>
                        <Route path={'/authenticate/'} element={<LoginScreen />} />
                        <Route path={'/authenticate/registration'} element={<RegistrationScreen />} />
                    </Route>
                    <Route element={<RequireAuth />}>
                        <Route element={<GetLayout />}>
                            <Route path={"/business-admin/"}>
                                <Route path={"home/"} element={<HomeScreen />} />
                                <Route path={"menu-items/"} element={<MenuScreen />} />
                                <Route path={"reviews/"} element={<ReviewScreen />} />
                                <Route path={"contact-request/"} element={<ContactRequestScreen />} />
                                <Route path={"employee-info/"} element={<EmployeeInfoScreen />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path={":businessUsername/"} element={<BusinessNavigator />} />
                    {/* Routes for template 1 */}
                    <Route element={<Template1Layout />}>
                        <Route path={`${templateIds.Template1}`}>
                            <Route path={"home/"} element={<Template1HomeScreen />}/>
                            <Route path={"menu/"} element={<Template1MenuScreen />} /> 
                        </Route>
                    </Route>
                    <Route path="/" element={<Navigate to="/business-admin/home/" replace />} />
                </Routes>
            </Provider>
        </Suspense>
    );
};

const RenderedApp = () => {
    return (
        <BrowserRouter>
            <ActiveNavigationMenuProvider>
                <ConfigProvider theme={{token: {fontFamily: 'Montserrat'}}}>
                    <GetLocalsRoutes />
                </ConfigProvider>
            </ActiveNavigationMenuProvider>
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(
    <RenderedApp />
);
