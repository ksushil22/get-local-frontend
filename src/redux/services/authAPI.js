import {rootAPI} from "./rootAPI";
import {AUTH_TOKEN_API, REGISTER_API, VALIDATE_TOKEN} from "../api_url.jsx";

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
        }),
        validateToken: builder.query({
            query: (token) =>
                `${process.env.BASE_API_URL}${VALIDATE_TOKEN}${token}/`
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useValidateTokenQuery
} = authAPI