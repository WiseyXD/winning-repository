import {
  BookCheck,
  BookCheckIcon,
  GraduationCap,
  GraduationCapIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import Tests from "./Tests";
import { setDashboardComponenet } from "@/features/dashboardSlice/dashboardSlice";
import { RootState } from "@/app/store";
import GivenTests from "./GivenTests";
import AddTest from "./AddTest";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.root.auth.admin);
  const selectedItem = useSelector(
    (state: RootState) => state.dashboard.component
  );
  return !isAdmin ? (
    <div className="basis-2/12 flex flex-col bg-zinc-900 border-r border-r-slate-800">
      <div className="">
        {sidebarItems.map((item, index) => {
          return (
            <div
              className={
                "hover:bg-zinc-700 transition ease-in-out duration-300" +
                (selectedItem === item.component ? " bg-zinc-950" : "")
              }
            >
              <div
                className="px-6 py-4 flex gap-2 justify-start items-center "
                role="button"
                onClick={() =>
                  dispatch(
                    setDashboardComponenet({
                      component: item.component,
                    })
                  )
                }
              >
                {item.icon}
                <p>{item.title}</p>
              </div>
              <Separator />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="basis-2/12 flex flex-col bg-zinc-900 border-r border-r-slate-800">
      <div className="">
        {adminSidebarItems.map((item, index) => {
          return (
            <div
              className={
                "hover:bg-zinc-700 transition ease-in-out duration-300" +
                (selectedItem === item.component ? " bg-zinc-950" : "")
              }
            >
              <div
                className="px-6 py-4 flex gap-2 justify-start items-center "
                role="button"
                onClick={() =>
                  dispatch(
                    setDashboardComponenet({
                      component: item.component,
                    })
                  )
                }
              >
                {item.icon}
                <p>{item.title}</p>
              </div>
              <Separator />
            </div>
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
    component: <Tests />,
  },
  {
    title: "Given Tests",
    icon: <BookCheckIcon />,
    component: <GivenTests />,
  },
];
const adminSidebarItems = [
  {
    title: "Tests",
    icon: <GraduationCapIcon />,
    component: <Tests />,
  },
  {
    title: "Add Test",
    icon: <BookCheckIcon />,
    component: <AddTest />,
  },
];
