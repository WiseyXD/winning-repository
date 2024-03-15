import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { TTest } from "@wiseyxd/winning-project-common";

type TTestOutput = {
    tests: TTest[];
    message: string;
};

export const testApi = createApi({
    reducerPath: "testApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_TEST,
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
    tagTypes: ["Tests"],
    endpoints: (builder) => ({
        getAllTests: builder.query<TTestOutput, null>({
            query: () => "",
            providesTags: ["Tests"],
        }),
        getTestOverview: builder.query({
            query: (id) => `/${id}`,
        }),
    }),
});

export const { useGetAllTestsQuery, useGetTestOverviewQuery } = testApi;
