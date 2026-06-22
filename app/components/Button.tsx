// Button component – reusable styled button
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
const variantClasses = {
  primary: "bg-black text-white hover:bg-neutral-800 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-neutral-200",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300 dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700",
  outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:ring-gray-300 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-200 dark:hover:bg-slate-800",
};
const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return <button className={classes} {...rest} />;
};

export default Button;

