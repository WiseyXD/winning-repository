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
                url: "signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials: TLogin) => ({
                url: "login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
