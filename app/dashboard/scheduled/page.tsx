"use client";

import { useState } from "react";
import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Column, Table } from "../../components/Table";

interface ScheduledTransaction {
  id: string;
  recipient: string;
  amount: string;
  scheduledAt: string;
  status: string;
}

export default function ScheduledTransactionsPage() {
  const [scheduledList, setScheduledList] = useState<ScheduledTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this scheduled transaction?")) {
      const updatedList = scheduledList.filter((tx) => tx.id !== id);
      setScheduledList(updatedList);
      localStorage.setItem("ledger_scheduled_transactions", JSON.stringify(updatedList));
    }
  };

  const columns: Column<ScheduledTransaction>[] = [
    {
      header: "Scheduled Date & Time",
      type: "text",
      accessor: (row) => row.scheduledAt,
    },
    {
      header: "Recipient Wallet",
      type: "chip",
      accessor: (row) => `@${row.recipient}`,
      className: "font-mono text-xs",
    },
    {
      header: "Amount",
      type: "text",
      accessor: (row) => row.amount,
      className: "text-emerald-600 dark:text-emerald-450 font-bold",
    },
    {
      header: "Status",
      type: "chip",
      accessor: (row) => row.status,
      className: "text-center",
      props: {
        colorMap: {
          Scheduled: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
        },
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Scheduled Transactions
          </h2>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            View, track, or cancel your upcoming scheduled payments.
          </p>
        </div>
      </div>

      <Card className="border-gray-150 dark:border-slate-800" noPadding>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/20 dark:bg-slate-900/10">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-700 dark:text-gray-250">
            <FiCalendar className="h-4 w-4 text-gray-400" />
            <span>Upcoming Scheduled Transfers ({scheduledList.length})</span>
          </div>
        </div>

        <Table
          columns={columns}
          data={scheduledList}
          rowKey={(row) => row.id}
          actions={(row) => (
            <Button
              variant="outline"
              size="sm"
              className="py-1.5 px-3 border-rose-200 dark:border-rose-950 text-rose-600 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-all ml-auto"
              onClick={() => handleCancel(row.id)}
            >
              <FiTrash2 className="h-3.5 w-3.5" />
              Cancel
            </Button>
          )}
          pagination={{
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            onPageChange: setCurrentPage,
            itemName: "transfers",
          }}
        />
      </Card>
    </div>
  );
}
