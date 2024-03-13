import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import { Camera } from "./pages/Camera";
import VideoStream from "./pages/Camera3";

function App() {
    const [count, setCount] = useState(0);
    const isAuthorized = true;
    const isAdmin = false;

    return (
        <>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            {/* <Toaster />
                <Navbar isAuthorized={isAuthorized} />
                <Separator /> */}
            <div className="max-w-[90%] w-full mx-auto mt-4 max-h-screen">
                <Routes>
                    {/* <Route
                            path="/signup"
                            element={
                                !isAuthorized ? (
                                    <Register />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                !isAuthorized ? (
                                    <Login />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            }
                        /> */}

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
                                <Navigate to={"/login"} />
                            )
                        }
                    />

                    <Route
                        path="/:roomId"
                        element={
                            isAuthorized ? (
                                isAdmin ? (
                                    <Navigate to={"/admin"} />
                                ) : (
                                    <TestPage />
                                )
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />
                    <Route
                        path="/cam"
                        element={
                            isAuthorized ? (
                                isAdmin ? (
                                    <Navigate to={"/admin"} />
                                ) : (
                                    <VideoStream />
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
                    {/* <Route
                        path="/admin/signup"
                        element={
                            !isAuthorized ? (
                                <AdminSignup />
                            ) : (
                                <Navigate to={"/admin"} />
                            )
                        }
                    />
                    <Route
                        path="/admin/login"
                        element={
                            !isAuthorized ? (
                                <AdminLogin />
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
                    <Route
                        path="/admin/:todoId"
                        element={
                            isAuthorized ? (
                                isAdmin ? (
                                    <TodoOverview />
                                ) : (
                                    <Navigate to={"/"} />
                                )
                            ) : (
                                <Navigate to={"/admin/login"} />
                            )
                        }
                    /> */}
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
            </div>
            {/* </ThemeProvider> */}
        </>
    );
}

export default App;
