import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <>
            <Navbar isAuthorized={"true"} />
            <Separator />
            <div className="max-w-[90%] w-full mx-auto mt-4 max-h-screen">
                <p className="text-neutral-300">Hey</p>Heelo
            </div>
        </>
    );
}
