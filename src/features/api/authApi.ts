// src/features/api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
    password: string;
    email: string;
}

interface LoginResponse {
    token: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

interface PasswordUpdateRequest {
    oldPassword: string;
    newPassword: string;
}

interface ForgotPasswordRequest {
    email: string;
    newPassword: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000', credentials: 'include' }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
        updatePassword: builder.mutation<void, PasswordUpdateRequest>({
            query: (data) => ({
                url: '/updatePassword',
                method: 'POST',
                body: data,
            }),
        }),
        forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
            query: (data) => ({
                url: '/forgotPassword',
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useUpdatePasswordMutation,
    useForgotPasswordMutation,
    useLogoutMutation,
} = authApi;
