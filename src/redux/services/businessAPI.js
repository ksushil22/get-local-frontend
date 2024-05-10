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
        }),
        getBusinessItemCategories: builder.query({
            query: (id) => `${BASE_URL}${GET_BUSINESS}${id}/item-category/`,
            providesTags: ['categories']
        }),
        createBusinessItemCategory: builder.mutation({
            query: ({businessId, category}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/item-category/`,
                method: 'POST',
                params: {
                    name: category
                }
            }),
            invalidatesTags: ['categories']
        }),
        deleteBusinessItemCategory: builder.mutation({
            query: ({businessId, categoryId}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/item-category/${categoryId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['categories']
        }),
        getMenuItems: builder.query({
            query: ({businessId, categoryId}) => `${BASE_URL}${GET_BUSINESS}${businessId}/item-category/${categoryId}/item/`,
            transformResponse: (items) => {
                const transformedData = [];
                items?.map((item) => {
                    let image = item.image;
                    if (image) {
                        image = {
                            uid: image?.id,
                            name: image?.name,
                            status: 'done',
                            url: `data:${image?.extension};base64,${image?.image}`
                        }
                    }
                    transformedData.push({
                        'id': item.id,
                        'name': item.name,
                        'displayName': item.name+" - "+item.currency+item.price,
                        'ingredients': item.ingredients,
                        'description': item.description,
                        'price': item.price,
                        'image': image
                    })
                })
                return transformedData;
            },
            providesTags: ['menu-items']
        }),
        createOrUpdateMenuItem: builder.mutation({
            query: ({businessId, categoryId, itemDTO}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/item-category/${categoryId}/item/`,
                method: 'PUT',
                body: {...itemDTO}
            }),
            invalidatesTags: ['menu-items']
        }),
        deleteMenuItem: builder.mutation({
            query: ({itemId}) => ({
                url: `${BASE_URL}${GET_BUSINESS}item/${itemId}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['menu-items']
        }),
        getBusinessReviews: builder.query({
            query:({businessId}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/reviews/`,
                method: 'GET'
            })
        }),
        getBusinessTimings: builder.query({
            query:({businessId}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/timings/`,
                method: 'GET'
            })
        }),
        updateBusinessTimings: builder.mutation({
            query: ({businessId, timings}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/timing/`,
                method: 'PUT',
                body: timings
            })
        }),
        getBusinessOperationStatus: builder.query({
            query: ({businessId, tomorrow}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/business-operation-status/`,
                method: 'GET',
                params: {tomorrow: tomorrow, today: !tomorrow}
            })
        }),
        updateBusinessOperationStatus: builder.mutation({
            query: ({businessId, status}) => ({
                url: `${BASE_URL}${GET_BUSINESS}${businessId}/business-operation-status/`,
                method: 'PUT',
                params: {status: status}
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
    useDeleteImageMutation,
    useGetBusinessItemCategoriesQuery,
    useCreateBusinessItemCategoryMutation,
    useDeleteBusinessItemCategoryMutation,
    useGetMenuItemsQuery,
    useCreateOrUpdateMenuItemMutation,
    useDeleteMenuItemMutation,
    useGetBusinessReviewsQuery,
    useGetBusinessTimingsQuery,
    useUpdateBusinessTimingsMutation,
    useGetBusinessOperationStatusQuery,
    useUpdateBusinessOperationStatusMutation,
} = businessAPI
