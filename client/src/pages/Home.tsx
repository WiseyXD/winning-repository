import { RootState } from "@/app/store";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Tests from "@/components/Tests";
import { Separator } from "@/components/ui/separator";
import { setDashboardComponenet } from "@/features/dashboardSlice/dashboardSlice";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const dispatch = useDispatch();
    const componentToRender = useSelector(
        (state: RootState) => state.dashboard.component
    );
    useEffect(() => {
        dispatch(setDashboardComponenet({ component: <Tests /> }));
    }, []);

    return (
        <>
            <Navbar isAuthorized={"true"} />
            <Separator />

            <div className="min-h-[94vh] flex ">
                <Sidebar />

                {componentToRender}
            </div>
        </>
    );
}
