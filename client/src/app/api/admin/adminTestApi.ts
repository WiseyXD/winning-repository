import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { TTest } from "@wiseyxd/winning-project-common";

type TTestOutput = {
    tests: TTest[];
    message: string;
};

export const adminTestApi = createApi({
    reducerPath: "adminTestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_ADMIN_TEST,
        prepareHeaders: (headers, { getState }) => {
            const authState = (getState() as RootState).root.auth;
            const token = authState ? authState.token : null;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createTest: builder.mutation<null, TTest>({
            query: (credentials) => ({
                url: "/create",
                method: "POST",
                body: credentials,
            }),
        }),
        deleteTest: builder.mutation<null, string>({
            query: (id) => ({
                url: "/delete/" + id,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useDeleteTestMutation, useCreateTestMutation } = adminTestApi;
