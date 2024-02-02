import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import CustomSpinner from './components/util/customSpinner/CustomSpinner';
import RequireAuth from "./components/authentication/RequireAuth";
import "./index.css"

const RegistrationScreen = lazy(async () => import('./screens/RegistrationScreen'));
const LoginScreen = lazy(async () => import('./screens/LoginScreen'));
const HomeScreen = lazy(async () => import('./screens/HomeScreen'));
const DisabledUserScreen = lazy(async () => import('./screens/DisabledUserScreen'));

const GetLocalsRoutes = () => {
    return (
        <Suspense fallback={<CustomSpinner />}>
            <Provider store={store}>
                <Routes>
                    <Route path={'/authenticate'} element={<LoginScreen />} />
                    <Route path={'/authenticate/registration'} element={<RegistrationScreen />} />
                    <Route path={'/disabled-user'} element={<DisabledUserScreen />} />
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<HomeScreen />} />
                    </Route>
                </Routes>
            </Provider>
        </Suspense>
    );
};

const RenderedApp = () => {
    return (
        <BrowserRouter>
            <GetLocalsRoutes />
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById('root'));

root.render(
    <RenderedApp />
);
