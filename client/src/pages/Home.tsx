import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Tests from "@/components/Tests";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <>
            <Navbar isAuthorized={"true"} />
            <Separator />

            <div className="min-h-[94vh] flex  ">
                <Sidebar />
                <Tests />
            </div>
        </>
    );
}
