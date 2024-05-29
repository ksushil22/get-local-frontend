import {rootAPI} from "./rootAPI";
import {BUSINESS_API, PUBLIC_BUSINESS_API} from "../api_url";

const BASE_URL = process.env.BASE_API_URL;

export const businessAPI = rootAPI.injectEndpoints({
    endpoints: builder => ({
        getTypes: builder.query({
            query: () => `${BASE_URL}${PUBLIC_BUSINESS_API}types/`
        }),
        registerBusiness: builder.mutation({
            query: credentials => ({
                url: `${BASE_URL}${BUSINESS_API}register/`,
                method: 'POST',
                body: {...credentials}
            })
        }),
        getBusiness: builder.query({
            query: (id) => `${BASE_URL}${BUSINESS_API}${id}/`
        }),
        getBusinessImages: builder.query({
            query: ({businessId, type}) => `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/images/${type}/`
        }),
        updateAboutUs: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}${BUSINESS_API}about-us/${data.id}/`,
                method: 'PUT',
                params: {aboutUs: data.aboutUs}
            })
        }),
        deleteImage: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}${BUSINESS_API}image/${id}/`,
                method: 'DELETE'
            })
        }),
        getBusinessItemCategories: builder.query({
            query: (id) => `${BASE_URL}${PUBLIC_BUSINESS_API}${id}/item-category/`,
            providesTags: ['categories']
        }),
        createBusinessItemCategory: builder.mutation({
            query: ({businessId, category}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/item-category/`,
                method: 'POST',
                params: {
                    name: category
                }
            }),
            invalidatesTags: ['categories']
        }),
        deleteBusinessItemCategory: builder.mutation({
            query: ({businessId, categoryId}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/item-category/${categoryId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['categories']
        }),
        getMenuItems: builder.query({
            query: ({businessId, categoryId}) => `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/item-category/${categoryId}/item/`,
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
                url: `${BASE_URL}${BUSINESS_API}${businessId}/item-category/${categoryId}/item/`,
                method: 'PUT',
                body: {...itemDTO}
            }),
            invalidatesTags: ['menu-items']
        }),
        deleteMenuItem: builder.mutation({
            query: ({itemId}) => ({
                url: `${BASE_URL}${BUSINESS_API}item/${itemId}/`,
                method: 'DELETE'
            }),
            invalidatesTags: ['menu-items']
        }),
        getBusinessReviews: builder.query({
            query:({businessId}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/reviews/`,
                method: 'GET'
            })
        }),
        getBusinessTimings: builder.query({
            query:({businessId}) => ({
                url: `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/timings/`,
                method: 'GET'
            })
        }),
        updateBusinessTimings: builder.mutation({
            query: ({businessId, timings}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/timing/`,
                method: 'PUT',
                body: timings
            })
        }),
        getBusinessOperationStatus: builder.query({
            query: ({businessId, tomorrow}) => ({
                url: `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/business-operation-status/`,
                method: 'GET',
                params: {tomorrow: tomorrow, today: !tomorrow}
            })
        }),
        updateBusinessOperationStatus: builder.mutation({
            query: ({businessId, status}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/business-operation-status/`,
                method: 'PUT',
                params: {status: status}
            })
        }),
        getAllContactRequests: builder.query({
            query: ({businessId}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/contact-requests/`,
                method: 'GET'
            })
        }),
        createEmployeeInfo: builder.mutation({
            query: ({businessId, employeeDTO}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/employee-info/`,
                method: 'POST',
                body: employeeDTO
            }),
            invalidatesTags: ['employee-info']
        }),
        updateEmployeeInfo: builder.mutation({
            query: ({businessId, employeeDTO}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/employee-info/`,
                method: 'PUT',
                body: employeeDTO
            }),
            invalidatesTags: ['employee-info']
        }),
        getEmployees: builder.query({
            query: ({businessId}) => ({
                url: `${BASE_URL}${PUBLIC_BUSINESS_API}${businessId}/employee-info/`,
                method: 'GET'
            }),
            providesTags: ['employee-info']
        }),
        deleteEmployee: builder.mutation({
            query: ({businessId, employeeId}) => ({
                url: `${BASE_URL}${BUSINESS_API}${businessId}/employee-info/`,
                method: 'DELETE',
                params: {'employeeId': employeeId}
            }),
            invalidatesTags: ['employee-info']
        })
    })
});

export const {
    useGetTypesQuery,
    useRegisterBusinessMutation,
    useLazyGetBusinessQuery,
    useGetBusinessImagesQuery,
    useUpdateAboutUsMutation,
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
    useGetAllContactRequestsQuery,
    useCreateEmployeeInfoMutation,
    useUpdateEmployeeInfoMutation,
    useGetEmployeesQuery,
    useDeleteEmployeeMutation
} = businessAPI
