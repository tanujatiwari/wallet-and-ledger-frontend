"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { FiInfo, FiHelpCircle } from "react-icons/fi";
import Link from "next/link";

export default function SetupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-8 relative overflow-hidden">

      <div className="mx-auto w-full max-w-xl space-y-3.5 relative z-10 pt-4">
        <div className="flex justify-between items-end">
          <span className="text-xs font-black tracking-tight text-gray-900 dark:text-white uppercase">
            Ledger Pro
          </span>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            Step 1 of 2
          </span>
        </div>
        {/* Progress bar line */}
        <div className="w-full bg-gray-200/80 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
          <div className="bg-[#10b981] dark:bg-[#4df0b0] h-full w-1/2 rounded-full"></div>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center py-10 relative">
        <Card className="w-full max-w-xl p-8 md:p-10 shadow-lg border-gray-150 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
          <div className="flex flex-col text-center space-y-2 mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome to the Ledger
            </h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Let's set up your institutional-grade digital wallet.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2.5">
              <Input
                label="Unique Wallet Identifier"
                placeholder="username"
                required
                icon={<span className="text-gray-400 font-bold font-mono text-sm">@</span>}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500 font-medium">
                This identifier is unique to you. Others in the Ledger Pro network will use this handle to send funds securely to your account.
              </p>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl dark:bg-blue-950/20 dark:border-blue-900/30">
              <FiInfo className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-bold text-blue-800 dark:text-blue-300">
                Identifiers must be 4-20 characters long and can contain letters, numbers, and underscores.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 rounded-xl font-bold shadow-md transition-all text-sm flex items-center justify-center gap-1.5"
            >
              Continue
              <span className="font-bold text-lg leading-none">&rarr;</span>
            </Button>
          </form>
        </Card>
      </main>

      <footer className="w-full text-center relative pb-4">
        <Link
          href="/setup-help"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <FiHelpCircle className="h-4 w-4 text-gray-400" />
          <span>Need assistance with your setup?</span>
        </Link>
      </footer>
    </div>
  );
}

