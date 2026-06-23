"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";
import { GoogleIcon } from "../utils/svgs";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard page
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-16">
        <Card className="w-full max-w-[460px] p-8 md:p-10 shadow-lg rounded-2xl bg-white border border-gray-150 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex flex-col text-center space-y-2 mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome
            </h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Access your institutional-grade ledger.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full py-3 flex items-center justify-center font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 shadow-sm transition-all"
            onClick={() => router.push("/dashboard")}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-gray-400 dark:bg-slate-900">or</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="name@company.com"
              icon={<FiMail className="h-4.5 w-4.5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              icon={<FiLock className="h-4.5 w-4.5" />}
              rightLabelAction={
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline transition-all"
                >
                  Forgot Password?
                </Link>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center space-x-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-accent-mint/50 dark:border-slate-700 dark:bg-slate-800"
              />
              <label
                htmlFor="remember"
                className="text-xs font-semibold text-gray-600 dark:text-gray-400 select-none cursor-pointer"
              >
                Remember this device
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 rounded-xl font-bold shadow-sm transition-all mt-6 text-sm"
            >
              Sign In
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

