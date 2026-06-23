import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  rightLabelAction?: React.ReactNode;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, rightLabelAction, className = "", ...rest }) => {
  const inputClass = `w-full rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-mint/50 focus:border-accent-mint dark:text-white transition-all shadow-sm ${icon ? "pl-10" : ""} ${className}`;

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <div className="flex justify-between items-center">
        {label && <label className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">{label}</label>}
        {rightLabelAction}
      </div>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-gray-400 dark:text-gray-500 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input className={inputClass} {...rest} />
      </div>
    </div>
  );
};

export default Input;

