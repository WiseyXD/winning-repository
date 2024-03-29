import { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "./app/store";
import { useSelector } from "react-redux";
import Home from "./pages/Home";

import VideoStream from "./pages/Camera3";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/toaster";
import LandingPage from "./pages/LandingPage";
import WebSocketClient from "./pages/WebSocket";
import TestSubmitted from "./pages/TestSubmitted";

function App() {
    const [count, setCount] = useState(0);

    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    const isAdmin = useSelector((state: RootState) => state.root.auth.admin);

    return (
        <>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            <Toaster />

            <Routes>
                <Route
                    path="/signup"
                    element={
                        !isAuthorized ? (
                            <Signup isAdmin={false} />
                        ) : (
                            <Navigate to={"/"} />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        !isAuthorized ? (
                            <Login isAdmin={false} />
                        ) : (
                            <Navigate to={"/"} />
                        )
                    }
                />

                {/* Path will be /tests */}
                <Route
                    path="/"
                    element={
                        isAuthorized ? (
                            isAdmin ? (
                                <Navigate to={"/admin"} />
                            ) : (
                                <Home />
                            )
                        ) : (
                            <LandingPage />
                        )
                    }
                />

                <Route
                    path="/:testId"
                    element={
                        isAuthorized ? (
                            isAdmin ? (
                                <Navigate to={"/admin"} />
                            ) : (
                                <WebSocketClient />
                            )
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route
                    path="/:testId/submit"
                    element={
                        isAuthorized ? (
                            isAdmin ? (
                                <Navigate to={"/admin"} />
                            ) : (
                                <TestSubmitted />
                            )
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                {/* <Route
                        path="/:todoId"
                        element={
                            isAuthorized ? (
                                isAdmin ? (
                                    <Navigate to={"/admin"} />
                                ) : (
                                    <TodoOverview />
                                )
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/premium"
                        element={
                            isAuthorized ? (
                                isAdmin ? (
                                    <Navigate to={"/admin"} />
                                ) : (
                                    <BuyPremium />
                                )
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    /> */}
                {/* Admin Routes */}
                <Route
                    path="/admin/signup"
                    element={
                        !isAuthorized ? (
                            <Signup isAdmin={true} />
                        ) : (
                            <Navigate to={"/admin"} />
                        )
                    }
                />
                <Route
                    path="/admin/login"
                    element={
                        !isAuthorized ? (
                            <Login isAdmin={true} />
                        ) : (
                            <Navigate to={"/admin"} />
                        )
                    }
                />
                <Route
                    path="/admin"
                    element={
                        isAuthorized ? (
                            isAdmin ? (
                                <AdminDashboard />
                            ) : (
                                <Navigate to={"/"} />
                            )
                        ) : (
                            <Navigate to={"/admin/login"} />
                        )
                    }
                />

                {/* wildcard*/}
                {/* <Route
                        path="/*"
                        element={
                            isAuthorized ? (
                                isAdmin ? (
                                    <AdminDashboard />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    /> */}
            </Routes>
            {/* </div> */}
            {/* </ThemeProvider> */}
        </>
    );
}

export default App;
