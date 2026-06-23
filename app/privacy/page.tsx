"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Card } from "../components/Card";
import { FiShield, FiLock, FiEye, FiFileText, FiCheck } from "react-icons/fi";
import { privacyPolicySections } from "../utils/constants";

const sectionIcons = [FiEye, FiLock, FiFileText];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-3xl p-8 md:p-12 shadow-lg border-gray-150 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">

          <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-100 dark:border-slate-800">
            <span className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FiShield className="h-5.5 w-5.5" />
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>

          <div className="space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              Last updated: October 24, 2026. This Privacy Policy describes how Ledger Pro collects, uses, and discloses your personal data when using our institutional-grade ledger and wallet service.
            </p>

            {privacyPolicySections.map((section, idx) => {
              const SectionIcon = sectionIcons[idx] || FiShield;
              return (
                <div key={idx} className="space-y-3.5">
                  <h2 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center space-x-2.5">
                    <SectionIcon className="h-4.5 w-4.5 text-gray-400" />
                    <span>{section.title}</span>
                  </h2>
                  <ul className="space-y-2.5 pl-7 list-none">
                    {section.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start space-x-2.5 text-gray-500 dark:text-gray-400">
                        <FiCheck className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 text-xs font-semibold text-gray-500 dark:text-gray-400">
              For privacy audits or general inquiries, contact <a href="mailto:tanujatiwari04@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">tanujatiwari04@gmail.com</a>.
            </div>
          </div>

        </Card>
      </main>

      <Footer />
    </div>
  );
}

