import { RootState } from "@/app/store";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BookCheck,
    BookCheckIcon,
    GraduationCap,
    GraduationCapIcon,
} from "lucide-react";
import Tests from "@/components/Tests";
import Sidebar from "@/components/Sidebar";
import { setDashboardComponenet } from "@/features/dashboardSlice/dashboardSlice";
export default function AdminDashboard() {
    const isAuthorized = useSelector(
        (state: RootState) => state.root.auth.token
    );
    const componentToRender = useSelector(
        (state: RootState) => state.dashboard.component
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDashboardComponenet({ component: <Tests /> }));
    }, []);
    return (
        <>
            <Navbar isAuthorized={isAuthorized} />
            <Separator />
            <div className="min-h-[94vh] flex ">
                <Sidebar />
                {componentToRender}
            </div>
        </>
    );
}
