"use client";

import { ReactNode } from "react";
import { FiBell, FiSearch, FiSettings } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-150 dark:bg-slate-900 dark:border-slate-800 flex items-center justify-between px-8 flex-shrink-0 transition-colors">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="w-64 hidden md:block">
              <Input
                type="text"
                placeholder="Search transactions..."
                icon={<FiSearch className="h-4 w-4" />}
                className="py-2 bg-gray-50 border-gray-200 focus:bg-white dark:bg-slate-800 dark:border-slate-700 transition-all text-xs"
              />
            </div>

            <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer relative p-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
            </button>

            <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer p-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
              <FiSettings className="h-5 w-5" />
            </button>

            <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700 bg-slate-800 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

