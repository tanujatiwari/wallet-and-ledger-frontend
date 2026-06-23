import { footerLinks } from "@/app/utils/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-90">
          Ledger Pro
        </Link>

        <nav className="hidden sm:flex items-center space-x-8">
          {
            footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                {link.label}
              </Link>
            ))
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
