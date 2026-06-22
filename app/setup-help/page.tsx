"use client";
import { useRouter } from "next/navigation";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { FiArrowLeft, FiHelpCircle, FiCheck, FiInfo } from "react-icons/fi";

const rules = [
  "Length: Between 4 and 20 characters",
  "Characters: A-Z, 0-9, and underscores (_)",
  "No spaces or special symbols (except underscore)"
]

const faqs = [
  {
    question: "What is a Unique Wallet Identifier?",
    answer: "Your Wallet Identifier serves as your public username (e.g. \`@company_finance\`) on the Ledger Pro network. It allows clients, institutions, or other nodes to quickly send or route funds to you without exposing long cryptographic public key addresses."
  },
  {
    question: "Handle formatting requirements",
    answer: rules,
  },
  {
    question: "Is this public information?",
    answer: "Yes, other users on the network can lookup this username handle in order to initiate asset transfers. No private keys, passwords, or transaction details are publicly associated with the handle itself."
  },
]

export default function SetupHelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-8 relative overflow-hidden">

      <div className="mx-auto w-full max-w-xl relative z-10 pt-4 flex items-center justify-between border-b border-gray-200/50 dark:border-slate-800/50 pb-4">
        <span className="text-xs font-black tracking-tight text-gray-900 dark:text-white uppercase">
          Ledger Pro Help Center
        </span>
        <button
          onClick={() => router.push("/setup")}
          className="text-xs font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="h-4.5 w-4.5" />
          <span>Back to Onboarding</span>
        </button>
      </div>

      <main className="flex-grow flex items-center justify-center py-10 relative z-10">
        <Card className="w-full max-w-xl p-8 md:p-10 shadow-lg border-gray-150 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900">
          <div className="flex items-center space-x-3 mb-6">
            <span className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FiHelpCircle className="h-5.5 w-5.5" />
            </span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Wallet Setup Help
            </h2>
          </div>

          <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300">
            {
              faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]"></span>
                    <span>{faq.question}</span>
                  </h3>
                  {
                    Array.isArray(faq.answer) && (
                      <ul className="space-y-1.5 pl-3.5 list-none text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {faq.answer.map((answer, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <FiCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>{answer}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  {
                    !Array.isArray(faq.answer) && (
                      <p className="leading-relaxed pl-3.5">
                        {faq.answer}
                      </p>
                    )
                  }
                </div>
              ))
            }
          </div>

          {/* Action Back Button */}
          <div className="mt-8 pt-6 border-t border-gray-150 dark:border-slate-800">
            <Button
              type="button"
              variant="primary"
              className="w-full py-3.5 bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 rounded-xl font-bold shadow-md transition-all text-sm"
              onClick={() => router.push("/setup")}
            >
              Continue to Wallet Setup
            </Button>
          </div>
        </Card>
      </main>

      <footer className="w-full text-center pb-4 text-xs font-semibold text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-1.5">
        <FiInfo className="h-4 w-4 text-gray-400" />
        <span>For any other support, contact tanujatiwari04@gmail.com</span>
      </footer>
    </div>
  );
}
