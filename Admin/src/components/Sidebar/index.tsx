"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser, FaHandHoldingUsd, FaDonate } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import toast from "react-hot-toast";
import { logout } from "@/hooks/auth";
import { MdOutlineCategory } from "react-icons/md";
import useAuthStore from "@/store/authStore";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <LuLayoutDashboard className="fill-current" size={20} />,
        label: "Dashboard",
        route: "/",
      },
      {
        icon: <FaUser className="fill-current" size={20} />,
        label: "Users",
        route: "/users",
      },
      {
        icon: <FaHandHoldingUsd className="fill-current" size={20} />,
        label: "Fundraisers",
        route: "/fundraisers",
      },
      {
        icon: <FaDonate className="fill-current" size={20} />,
        label: "Donations",
        route: "/donations",
      },
      {
        icon: <MdOutlineCategory className="fill-current" size={20} />,
        label: "Categories",
        route: "#",
        children: [
          {
            label: "Education",
            route: "/categories/education",
          },
          {
            label: "Emergency",
            route: "/categories/emergency",
          },
          {
            label: "Medical",
            route: "/categories/medical",
          },
          {
            label: "Monthly Bill",
            route: "/categories/monthly-bill",
          },
          {
            label: "Memorial",
            route: "/categories/memorial",
          },
          {
            label: "Other",
            route: "/categories/other",
          },
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const { setUser, setToken } = useAuthStore();

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-wide text-white">
              Admin Panel
            </h1>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={() => {
                logout();
                setUser(null);
                setToken(null);
                toast.success("Logged out successfully");
              }}
              className="group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark  dark:hover:bg-meta-4"
            >
              <FaPowerOff className="fill-current" size={20} />
              Logout
            </button>
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
