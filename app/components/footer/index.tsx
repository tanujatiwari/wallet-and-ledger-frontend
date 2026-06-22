import React from "react";
import Link from "next/link";

const links = [
  {
    href: "/privacy",
    label: "Privacy Policy"
  },
  {
    href: "/terms",
    label: "Terms of Service"
  },
]

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 dark:bg-slate-900 dark:border-slate-800 transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400">

        <div className="text-center sm:text-left font-medium">
          &copy; 2026 Ledger Pro. All rights reserved.
        </div>

        <div className="flex items-center justify-center space-x-6 font-medium">
          {
            links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gray-800 dark:hover:text-white transition-colors">
                {link.label}
              </Link>
            ))
          }
        </div>
      </div>
    </footer>
  );
};

export default Footer;
