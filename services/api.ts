import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const customFetchFn = async (input:any, init:any) => {
    // Set a custom timeout (e.g., 120 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 seconds
    try {
        const response = await fetch(input, { ...init, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://wow-now-backend-springboot-jdke.onrender.com/api/',
        fetchFn: customFetchFn, // Use the custom fetch with increased timeout
        prepareHeaders: (headers) => {
            const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJNb24gQXByIDE0IDE2OjAxOjE5IElDVCAyMDI1IiwiZXhwIjoxNzQ1MjI2MDc5LCJlbWFpbCI6InNpbGEtZW5kQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjoiVVNFUiJ9.s9Mk6PYG0Id9mDuJQMvjy9dvH8q6t-3MzQ403rz59WNzJWpq1vWtbqa6vVkgcfWQUMO2AqtlNXUwSDGFpPHe7A";
            console.log('Making request to /restaurants');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getRestaurants: builder.query<any, void>({
            query: () => 'restaurants',
            keepUnusedDataFor: 0, // Disable caching
            // Add a transform to log the response or error
            transformResponse: (response) => {
                console.log('API Response:', response);
                return response;
            },
            transformErrorResponse: (error) => {
                console.log('API Error:', error);
                return error;
            },
        }),
    }),
});

export const { useGetRestaurantsQuery } = api;
