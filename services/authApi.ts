// api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Env} from "@/services/Env";

export interface LoginResponse {
    accessToken: string|null;
    refreshToken: string|null;
    userId:number;
    role:string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl:Env.baseUrl}), // Replace with your API base URL
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (body) => ({
                url: 'sign-in', // Replace with your login endpoint
                method: 'POST',
                body: body,
            }),
        }),
        signup: builder.mutation<LoginResponse, { email: string; password: string; name: string }>({
            query: (userData) => ({
                url: 'signup', // Replace with your signup endpoint
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;