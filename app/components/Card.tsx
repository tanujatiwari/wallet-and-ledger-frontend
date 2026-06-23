// Card component – reusable container with optional header/footer slots
import React from "react";

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, header, footer, className = "", noPadding = false }) => {
  return (
    <div className={`rounded-2xl bg-white shadow-sm border border-gray-150 dark:bg-slate-900 dark:border-slate-800 transition-all ${className}`}>
      {header && <div className="border-b border-gray-150 px-6 py-4 dark:border-slate-800">{header}</div>}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
      {footer && <div className="border-t border-gray-150 px-6 py-4 dark:border-slate-800">{footer}</div>}
    </div>
  );
};

export default Card;

