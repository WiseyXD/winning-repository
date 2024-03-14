import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSignup, TLogin } from "@wiseyxd/winning-project-common";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_AUTH as string, // Assuming VITE_BASE_AUTH is a string
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials: TSignup) => ({
                url: "student/signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials: TLogin) => ({
                url: "student/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        adminSignup: builder.mutation({
            query: (credentials: TSignup) => ({
                url: "admin/signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        adminLogin: builder.mutation({
            query: (credentials: TLogin) => ({
                url: "admin/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useAdminLoginMutation,
    useAdminSignupMutation,
} = authApi;
