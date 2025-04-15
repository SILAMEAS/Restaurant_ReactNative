import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Env} from "@/services/Env";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        baseUrl:Env.baseUrl+ 'api/',
        fetchFn: customFetchFn, // Use the custom fetch with increased timeout
        prepareHeaders:async (headers) => {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
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
