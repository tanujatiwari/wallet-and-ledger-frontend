"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowDownLeft, FiArrowUpRight, FiCreditCard, FiPlus, FiRefreshCw } from "react-icons/fi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Modal } from "../components/Modal";
import { Column, Table } from "../components/Table";

interface Transaction {
  id: string;
  dateTime: string;
  type: string;
  walletId: string;
  amount: string;
  isNegative: boolean;
  status: "Completed" | "Processing" | "Pending";
  description?: string;
  icon: string | React.ComponentType<any>;
  iconColor?: string;
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    dateTime: "Oct 24, 2023 03:45 PM",
    type: "Sent",
    walletId: "Apple Store Wallet",
    amount: "-₹107,000.00",
    isNegative: true,
    status: "Completed",
    description: "Purchase of MacBook Pro",
    icon: "FiArrowUpRight",
    iconColor: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400"
  },
  {
    id: "2",
    dateTime: "Oct 23, 2023 01:15 PM",
    type: "Sent",
    walletId: "Blue Ribbon Sushi",
    amount: "-₹6,900.00",
    isNegative: true,
    status: "Completed",
    description: "Team Lunch",
    icon: "FiArrowUpRight",
    iconColor: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400"
  },
  {
    id: "3",
    dateTime: "Oct 22, 2023 11:00 AM",
    type: "Received",
    walletId: "ACH Transfer ACH-981",
    amount: "+₹410,000.00",
    isNegative: false,
    status: "Processing",
    description: "External Bank Transfer",
    icon: "FiArrowDownLeft",
    iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400"
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  FiArrowUpRight: FiArrowUpRight,
  FiArrowDownLeft: FiArrowDownLeft,
  FiPlus: FiPlus
};

const chartData = [
  { month: "May", credit: 45000, debit: 30000 },
  { month: "Jun", credit: 55000, debit: 45000 },
  { month: "Jul", credit: 35000, debit: 20000 },
  { month: "Aug", credit: 68000, debit: 38000 },
  { month: "Sep", credit: 42000, debit: 35000 },
  { month: "Oct", credit: 84250, debit: 42100 },
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
      icon: (row) => {
        if (typeof row.icon === "string") {
          return iconMap[row.icon] || FiArrowUpRight;
        }
        return row.icon;
      },
      iconColor: (row) => row.iconColor || "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300",
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
        Processing: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
        Pending: "bg-gray-100 text-gray-650 dark:bg-slate-805 dark:text-gray-400",
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

export default function DashboardPage() {
  const router = useRouter();
  const [balance, setBalance] = useState(202979);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedBalance = localStorage.getItem("ledger_inr_balance");
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    } else {
      localStorage.setItem("ledger_inr_balance", "202979");
    }

    const savedTx = localStorage.getItem("ledger_inr_transactions");
    if (savedTx) {
      try {
        setTransactionsList(JSON.parse(savedTx));
      } catch (e) {
        console.error("Failed to parse INR transactions, resetting", e);
        setTransactionsList(defaultTransactions);
        localStorage.setItem("ledger_inr_transactions", JSON.stringify(defaultTransactions));
      }
    } else {
      setTransactionsList(defaultTransactions);
      localStorage.setItem("ledger_inr_transactions", JSON.stringify(defaultTransactions));
    }
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleAddMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 flex flex-col gap-8">

        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/10 border-gray-150 dark:border-slate-800">
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-2.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Total Balance
                </span>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className={`p-0.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-slate-800 ${isRefreshing ? "animate-spin" : ""
                    }`}
                  title="Refresh Balance"
                >
                  <FiRefreshCw className="h-2.5 w-2.5" />
                </button>
              </div>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                ₹{balance.toLocaleString("en-IN")}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddMoneyOpen(true)}
                className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-neutral-800 dark:bg-accent-mint dark:text-black dark:hover:bg-[#3cd09d] font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all uppercase tracking-wider"
              >
                <FiPlus className="h-3.5 w-3.5 stroke-[3]" />
                Add Money
              </button>
            </div>
            <div className="bg-[#4df0b0]/20 border border-[#4df0b0]/30 p-3 rounded-xl shadow-sm text-emerald-700 dark:text-[#4df0b0]">
              <FiCreditCard className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="border-gray-150 dark:border-slate-800" noPadding>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Recent Transactions
            </h3>
            <button
              onClick={() => router.push("/dashboard/transactions")}
              className="text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              View All
            </button>
          </div>

          <Table
            columns={columns}
            data={transactionsList}
            rowKey={(row) => row.id}
          />
        </Card>
      </div>

      <div className="flex flex-col gap-8">
        <Card className="border-gray-150 dark:border-slate-800 p-5 flex flex-col gap-2" noPadding>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Monthly Cash Flow
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold mt-0.5">
              Comparison of Debit vs Credit volume
            </p>
          </div>

          <div className="relative mt-4 w-full h-40">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeWidth={0.5} />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={10}
                    fontWeight="bold"
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={9}
                    fontWeight="bold"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${val / 1000}k`}
                    dx={-4}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950/95 border border-slate-800 rounded-xl p-3 shadow-2xl backdrop-blur-md">
                            <p className="text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                              {payload[0].payload.month}
                            </p>
                            <div className="space-y-1 text-[11px] font-bold">
                              <div className="flex items-center justify-between gap-4 text-[#4df0b0]">
                                <span>Credit:</span>
                                <span>₹{payload[0].value?.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4 text-rose-500">
                                <span>Debit:</span>
                                <span>₹{payload[1].value?.toLocaleString("en-IN")}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ fill: "rgba(30, 41, 59, 0.2)", radius: 4 }}
                  />
                  <Bar dataKey="credit" fill="#4df0b0" radius={[3, 3, 0, 0]} barSize={8} />
                  <Bar dataKey="debit" fill="#f43f5e" radius={[3, 3, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-500">
                Loading analytics...
              </div>
            )}
          </div>
        </Card>

        <Modal
          isOpen={isAddMoneyOpen}
          onClose={() => setIsAddMoneyOpen(false)}
          title="Add Funds to Wallet"
        >
          <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold -mt-2">
            Fund your Ledger Pro wallet instantly.
          </p>

          <form onSubmit={handleAddMoneySubmit} className="mt-6 space-y-5">
            <Input
              label="Amount (INR)"
              type="number"
              placeholder="0"
              required
              min="1"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              icon={<span className="text-gray-450 dark:text-gray-400 font-black text-lg">₹</span>}
              className="text-lg font-bold bg-gray-50"
            />
            <div className="flex gap-3 pt-2 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddMoneyOpen(false)}
                className="flex-1 py-3 rounded-xl text-xs font-bold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1 py-3 bg-black hover:bg-neutral-800 dark:bg-[#4df0b0] dark:text-black dark:hover:bg-[#3cd09d] rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Confirm & Pay
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
