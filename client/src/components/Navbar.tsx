import { Button } from "./ui/button";
import { useDispatch } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

import { unsetAuth } from "@/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavbarProps = {
    isAuthorized: null | string;
};

export default function Navbar({ isAuthorized }: NavbarProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    async function handleLogout() {
        dispatch(unsetAuth());
    }
    // Use seprator component for navbar from shadcn
    return (
        <div className="flex justify-between items-center px-4 py-2 transition-opacity bg-opacity-75">
            <p
                className="text-2xl font-semibold ghost"
                role="button"
                onClick={() => navigate("/")}
            >
                proctor.ai
            </p>
            {isAuthorized ? (
                <div className="flex gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div role="button">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate("/")}>
                                Profile
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : path === "/admin/login" ? (
                <div>
                    <Button
                        variant={"outline"}
                        onClick={() => navigate("/login")}
                    >
                        User
                    </Button>
                </div>
            ) : (
                <div>
                    <Button
                        variant={"outline"}
                        onClick={() => navigate("/admin/login")}
                    >
                        Admin
                    </Button>
                </div>
            )}
        </div>
    );
}
