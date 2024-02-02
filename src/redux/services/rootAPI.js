import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../slicers/authSlicer.js";
import { REFRESH_TOKEN_API } from "../api_url.jsx";
import {message} from "antd";


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.BASE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {

        const access = localStorage.getItem("access")
        if(access) {
            headers.set("Authorization", `Bearer ${access}`);
        }
        headers.set("Access-Control-Allow-Origin", 'true')

        return headers
    }
})

const baseQueryWithReauth = async(args, api, extraOption, overrideRoute) => {

    let result = await baseQuery(args, api, extraOption)

    if(result?.error?.status === 401) {
        localStorage.setItem("access", "")

        // send refresh token to get new access token
        const refreshResult = await baseQuery(
            {
                url: REFRESH_TOKEN_API,
                method: 'POST',
                body: {
                    refreshToken: localStorage.getItem("refresh"),
                },
            },
            api,
            extraOption
        );


        if(refreshResult?.data) {
            const user = api.getState().auth.username

            //  store the new token
            refreshResult.data['refresh'] = localStorage.getItem("refresh")

            api.dispatch(setCredentials({...refreshResult.data, user}))

            // retry the original query with new access token
            result = await baseQuery(args, api, extraOption)
        } else {
            // if refresh token is also invalid set the credentials to null and navigate user to login page
            api.dispatch(logOut())
        }
    } else if (result?.error) {
        message.open({
            content: result.error.data,
            duration: 2.5,
            className: 'antd-error'
        })
    }
    return result
}

export const rootAPI = createApi({
    reducerPath: 'api',
    tagTypes: ['User'],
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
