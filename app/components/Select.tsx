import React from "react";
import { FiChevronDown } from "react-icons/fi";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: (string | SelectOption)[];
  icon?: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  icon,
  className = "",
  value,
  onChange,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-gray-400 dark:text-gray-500 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          className={`appearance-none w-full bg-white border border-gray-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white rounded-xl py-2.5 text-xs font-bold text-gray-700 dark:text-gray-250 focus:outline-none focus:ring-2 focus:ring-accent-mint/50 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm ${
            icon ? "pl-10" : "pl-4"
          } pr-10 ${className}`}
          {...rest}
        >
          {options.map((opt, idx) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={idx} value={val} className="dark:bg-slate-900 dark:text-white text-gray-700">
                {lbl}
              </option>
            );
          })}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-450 dark:text-gray-500 pointer-events-none">
          <FiChevronDown className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
};

export default Select;
