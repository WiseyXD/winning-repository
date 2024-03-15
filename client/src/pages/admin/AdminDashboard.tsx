import { RootState } from "@/app/store";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useSelector } from "react-redux";
import {
  BookCheck,
  BookCheckIcon,
  GraduationCap,
  GraduationCapIcon,
} from "lucide-react";
import Tests from "@/components/Tests";
import Sidebar from "@/components/Sidebar";
export default function AdminDashboard() {
  const isAuthorized = useSelector((state: RootState) => state.root.auth.token);
  return (
    <>
      <Navbar isAuthorized={isAuthorized} />
      <Separator />
      <div className="min-h-[94vh] flex ">
        <Sidebar />
        <Tests />
      </div>
    </>
  );
}
