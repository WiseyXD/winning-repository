import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import TestPage from "./pages/TestPage";
import { Camera } from "./pages/Camera";
import VideoStream from "./pages/Camera3";
import Navbar from "./components/Navbar";
import { Separator } from "./components/ui/separator";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
    const [count, setCount] = useState(0);
    const isAuthorized = true;
    const isAdmin = false;

    return (
        <>
            {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
            <Toaster />
            <Navbar isAuthorized={"true"} />
            <Separator />
            <div className="max-w-[90%] w-full mx-auto mt-4 max-h-screen">
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
            </div>
            {/* </ThemeProvider> */}
        </>
    );
}

export default App;
