"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Card } from "../components/Card";
import { FiCheckSquare, FiUserCheck, FiAlertTriangle, FiBookOpen, FiCheck } from "react-icons/fi";
import { termsOfServiceSections } from "../utils/constants";

const sectionIcons = [FiUserCheck, FiCheckSquare, FiAlertTriangle];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-3xl p-8 md:p-12 shadow-lg border-gray-150 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">

          <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-100 dark:border-slate-800">
            <span className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FiBookOpen className="h-5.5 w-5.5" />
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Terms of Service
            </h1>
          </div>

          <div className="space-y-8 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              Welcome to Ledger Pro. By creating a digital wallet and accessing our platform, you agree to comply with the terms and conditions outlined below.
            </p>

            {termsOfServiceSections.map((section, idx) => {
              const SectionIcon = sectionIcons[idx] || FiBookOpen;
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
              For support regarding the Terms of Service, contact <a href="mailto:tanujatiwari04@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">tanujatiwari04@gmail.com</a>.
            </div>
          </div>

        </Card>
      </main>

      <Footer />
    </div>
  );
}

