"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FiCalendar,
  FiGrid,
  FiList,
  FiLogOut,
  FiSend
} from "react-icons/fi";
import { RiBankLine } from "react-icons/ri";
import { removeCookie } from "../utils/cookies";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/dashboard/send-money", label: "Send Money", icon: FiSend },
  { href: "/dashboard/scheduled", label: "Scheduled", icon: FiCalendar },
  { href: "/dashboard/transactions", label: "Transactions", icon: FiList },
];


export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    window.location.href = "/login";
    // await logout()
  };

  const bottomItems = [
    { label: "Logout", icon: FiLogOut, action: handleLogout },
  ];

  return (
    <aside className="w-64 h-screen border-r border-gray-150 bg-[#f8fafc] dark:bg-slate-900 dark:border-slate-800 flex flex-col justify-between p-5 transition-all">
      <div className="flex flex-col gap-8">
        <div className="flex items-center space-x-3 px-2">
          <div className="bg-gray-100 dark:bg-slate-800 p-2 rounded-lg text-gray-800 dark:text-gray-100">
            <RiBankLine className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-none">
              Ledger Pro
            </h1>
            <span className="text-[10px] uppercase font-semibold text-gray-400 dark:text-gray-500 tracking-wider">
              Institutional Grade
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 ${isActive
                  ? "bg-[#4df0b0] text-gray-900 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-gray-900" : "text-gray-500 dark:text-gray-450"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-gray-200 dark:border-slate-800 pt-4">
        {bottomItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-150 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white`}
              onClick={item.action}
            >
              <Icon className="h-4.5 w-4.5 text-gray-500 dark:text-gray-450" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

