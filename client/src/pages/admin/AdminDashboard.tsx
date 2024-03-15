import { RootState } from "@/app/store";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    return (
        <>
            <Navbar isAuthorized={isAuthorized} />
            <Separator />
        </>
    );
}
