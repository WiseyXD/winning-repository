import {
    BookCheck,
    BookCheckIcon,
    GraduationCap,
    GraduationCapIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";

export default function Sidebar() {
    return (
        <div className="basis-2/12 flex flex-col bg-zinc-900">
            <div>
                {sidebarItems.map((item, index) => {
                    return (
                        <>
                            <div className="px-6 my-4 flex gap-2 justify-start items-center">
                                {item.icon}
                                <p>{item.title}</p>
                            </div>
                            <Separator />
                        </>
                    );
                })}
            </div>
        </div>
    );
}

const sidebarItems = [
    {
        title: "Upcoming Tests",
        icon: <GraduationCapIcon />,
    },
    {
        title: "Given Tests",
        icon: <BookCheckIcon />,
    },
];
