import {rootAPI} from "./rootAPI";
import {GET_BUSINESS_TYPES, REGISTER_BUSINESS} from "../api_url";

const BASE_URL = process.env.BASE_API_URL;

export const businessAPI = rootAPI.injectEndpoints({
    endpoints: builder => ({
        getTypes: builder.query({
            query: () => `${BASE_URL}${GET_BUSINESS_TYPES}`
        }),
        registerBusiness: builder.mutation({
            query: credentials => ({
                url: `${BASE_URL}${REGISTER_BUSINESS}`,
                method: 'POST',
                body: {...credentials}
            })
        })
    })
});

export const {
    useGetTypesQuery,
    useRegisterBusinessMutation,
} = businessAPI
