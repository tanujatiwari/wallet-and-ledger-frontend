"use client";

import React, { useState } from "react";
import { FiCalendar, FiCreditCard } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";

export default function SendMoneyPage() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [scheduleLater, setScheduleLater] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transfer of $${amount} to ${recipient} initiated!`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Send Money
          </h2>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
            Transfer funds instantly to any Ledger Pro wallet.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-white border border-gray-150 p-4 rounded-2xl shadow-sm dark:bg-slate-900 dark:border-slate-800 self-start md:self-auto min-w-[240px]">
          <div className="h-10 w-10 bg-[#4df0b0]/20 rounded-xl flex items-center justify-center text-gray-900 dark:text-[#4df0b0]">
            <FiCreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
              Total Balance
            </p>
            <p className="text-lg font-black text-gray-900 dark:text-white leading-tight">
              $124,592.00
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-8 border-gray-150 dark:border-slate-800">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Input
                label="Recipient Wallet ID"
                placeholder="e.g. PX-9283-KLA-11"
                required
                icon={<span className="text-gray-400 font-bold font-mono text-sm">@</span>}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">
                Verify the ID before confirming
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  Amount (USD)
                </label>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4.5 text-gray-400 dark:text-gray-500 font-bold text-lg pointer-events-none">
                  $
                </div>
                <input
                  type="text"
                  placeholder="0.00"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-24 py-4 text-xl font-bold bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-mint/50 focus:border-accent-mint dark:text-white transition-all"
                />
                <button
                  type="button"
                  className="absolute right-4 text-xs font-bold text-[#10b981] hover:text-[#0ca678] dark:text-[#4df0b0] hover:underline cursor-pointer"
                  onClick={() => setAmount("124592.00")}
                >
                  Send Max
                </button>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 dark:text-gray-500">
                <span>Fee: $0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-150 dark:border-slate-800 pt-6">
              <div
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/30 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
                onClick={() => setScheduleLater(!scheduleLater)}
              >
                <div className="flex items-center space-x-3.5">
                  <FiCalendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                    Schedule for later
                  </span>
                </div>
                <div className="relative flex items-center">
                  <div className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out ${scheduleLater ? "bg-[#4df0b0]" : "bg-gray-200 dark:bg-slate-800"}`}>
                    <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out mt-0.75 ml-0.75 ${scheduleLater ? "translate-x-4" : "translate-x-0"}`}></div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 rounded-xl font-bold shadow-md transition-all text-sm uppercase tracking-wider"
            >
              Send Money
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
