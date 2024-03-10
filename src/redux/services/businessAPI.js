import {rootAPI} from "./rootAPI";
import {BUSINESS_UPLOAD, GET_BUSINESS, GET_BUSINESS_TYPES, REGISTER_BUSINESS, UPDATE_ABOUT_US} from "../api_url";

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
        }),
        getBusiness: builder.query({
            query: (id) => `${BASE_URL}${GET_BUSINESS}${id}/`
        }),
        getBusinessImages: builder.query({
            query: ({businessId, type}) => `${BASE_URL}${GET_BUSINESS}${businessId}/images/${type}/`
        }),
        updateAboutUs: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}${UPDATE_ABOUT_US}${data.id}/`,
                method: 'PUT',
                params: {aboutUs: data.aboutUs}
            })
        }),
        uploadBusinessFile: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}${BUSINESS_UPLOAD}`,
                method: 'POST',
                body: data
            })
        }),
        deleteImage: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}${GET_BUSINESS}image/${id}/`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetTypesQuery,
    useRegisterBusinessMutation,
    useLazyGetBusinessQuery,
    useGetBusinessImagesQuery,
    useUpdateAboutUsMutation,
    useUploadBusinessFileMutation,
    useDeleteImageMutation
} = businessAPI
