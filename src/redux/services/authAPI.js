import {rootAPI} from "./rootAPI";
import {AUTH_TOKEN_API, REGISTER_API} from "../api_url.jsx";

export const authAPI = rootAPI.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: `${process.env.BASE_API_URL}${AUTH_TOKEN_API}`,
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: `${process.env.BASE_API_URL}${REGISTER_API}`,
                method: 'POST',
                body: {...credentials}
            })
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation
} = authAPI