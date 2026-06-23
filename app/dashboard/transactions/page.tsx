"use client";

import { useState } from "react";
import {
  FiArrowDownLeft,
  FiArrowUpRight,
  FiCalendar,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiPlus,
  FiSearch
} from "react-icons/fi";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Column, Table } from "../../components/Table";

interface Transaction {
  id: string;
  dateTime: string;
  type: string;
  walletId: string;
  amount: string;
  isNegative: boolean;
  status: string;
  description?: string;
  icon: React.ComponentType<any>;
  iconColor: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    dateTime: "Oct 28, 2023 09:42 AM",
    type: "Sent",
    walletId: "0x71C...9A2F",
    amount: "-$4,200.00",
    isNegative: true,
    status: "Completed",
    description: "External Wallet Transfer",
    icon: FiArrowUpRight,
    iconColor: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400"
  },
  {
    id: "2",
    dateTime: "Oct 27, 2023 02:15 PM",
    type: "Received",
    walletId: "0xBC4...128E",
    amount: "+$12,500.00",
    isNegative: false,
    status: "Completed",
    description: "Salary Payout",
    icon: FiArrowDownLeft,
    iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400"
  },
  {
    id: "3",
    dateTime: "Oct 27, 2023 11:05 AM",
    type: "Added",
    walletId: "External Bank (Chase)",
    amount: "+$50,000.00",
    isNegative: false,
    status: "Pending",
    description: "Deposit from Chase Account",
    icon: FiPlus,
    iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400"
  },
  {
    id: "4",
    dateTime: "Oct 26, 2023 05:30 PM",
    type: "Sent",
    walletId: "0x4F1...EE67",
    amount: "-$850.00",
    isNegative: true,
    status: "Completed",
    description: "Peer to Peer Payment",
    icon: FiArrowUpRight,
    iconColor: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400"
  }
];

const columns: Column<Transaction>[] = [
  {
    header: "Date & Time",
    type: "text",
    accessor: (row) => row.dateTime,
  },
  {
    header: "Type",
    type: "card",
    accessor: (row) => row.type,
    props: {
      icon: (row) => row.icon,
      iconColor: (row) => row.iconColor,
    },
  },
  {
    header: "Wallet ID",
    type: "chip",
    accessor: (row) => row.walletId,
    className: "font-mono text-xs",
  },
  {
    header: "Amount",
    type: "text",
    accessor: (row) => row.amount,
    className: "text-right",
    props: {
      isNegative: (row) => row.isNegative,
    },
  },
  {
    header: "Status",
    type: "chip",
    accessor: (row) => row.status,
    className: "text-center",
    props: {
      colorMap: {
        Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
        Pending: "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400",
      },
    },
  },
  {
    header: "Description",
    type: "text",
    accessor: (row) => row.description || "—",
    className: "text-gray-400 dark:text-gray-500",
  },
];

export default function TransactionsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionType, setTransactionType] = useState("All Types");

  const filteredTransactions = initialTransactions.filter((tx) => {
    const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
    const matchesType = transactionType === "All Types" || tx.type === transactionType;
    const matchesSearch = searchQuery === "" || tx.walletId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Transaction Ledger
          </h2>
        </div>

        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <FiSearch className="h-4.5 w-4.5" />
          </span>
          <input
            type="text"
            placeholder="Search Wallet ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-mint/50 focus:border-accent-mint dark:bg-slate-900 dark:border-slate-800 dark:text-white transition-all shadow-sm"
          />
        </div>
      </div>
      <Card className="border-gray-150 dark:border-slate-800" noPadding>
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-6 py-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/20 dark:bg-slate-900/10">
          <div className="flex flex-wrap items-center gap-4">

            <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-250 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              <FiCalendar className="h-4 w-4 text-gray-400" />
              <span>Oct 01 - Oct 31, 2023</span>
            </div>

            <div className="relative">
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-gray-700 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-250 focus:outline-none focus:ring-2 focus:ring-accent-mint/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <option>All Types</option>
                <option>Sent</option>
                <option>Received</option>
                <option>Added</option>
              </select>
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <FiChevronDown className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-xl p-0.75 bg-white dark:bg-slate-900 shadow-sm">
              {["All", "Completed", "Pending"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${statusFilter === status
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : "text-gray-500 hover:text-gray-800 dark:text-gray-450 dark:hover:text-white"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              className="py-2.5 px-4 font-bold border-gray-200 dark:border-slate-800 shadow-sm text-gray-750 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 gap-1.5 text-xs"
              onClick={() => alert("Exporting transactions to CSV...")}
            >
              <FiDownload className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredTransactions}
          rowKey={(row) => row.id}
        />

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-slate-800 text-xs font-semibold text-gray-500 dark:text-gray-400">
          <span>Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} transactions</span>

          <div className="flex items-center space-x-1.5">
            <button type="button" className="p-2 border border-gray-200 dark:border-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
              <FiChevronLeft className="h-4 w-4 text-gray-400" />
            </button>
            <button type="button" className="px-3.5 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold shadow-sm cursor-pointer">
              1
            </button>
            <button type="button" className="px-3.5 py-1.5 border border-gray-250 dark:border-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
              2
            </button>
            <button type="button" className="px-3.5 py-1.5 border border-gray-250 dark:border-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
              3
            </button>
            <button type="button" className="p-2 border border-gray-200 dark:border-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
              <FiChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
