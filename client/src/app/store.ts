import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";
import socketReducer from "../features/socket/socketSlice";
import dashboardReducer from "@/features/dashboardSlice/dashboardSlice";
import { authApi } from "./api/authApi";
import { testApi } from "./api/student/testApi";
import testScoreReducer from "@/features/testScore/testScoreSlice";

const store = configureStore({
    reducer: {
        root: rootReducer,
        socket: socketReducer,
        dashboard: dashboardReducer,
        testScore: testScoreReducer,
        [authApi.reducerPath]: authApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, testApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
