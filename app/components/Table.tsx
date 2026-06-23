import React from "react";

export interface Column<T> {
  header: string;
  type?: "text" | "chip" | "card";
  accessor: (row: T) => any;
  className?: string;
  props?: {
    colorMap?: Record<string, string>;
    icon?: (row: T) => React.ComponentType<any>;
    iconColor?: (row: T) => string;
    subtitle?: (row: T) => string;
    isNegative?: (row: T) => boolean;
  };
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  actions?: (row: T) => React.ReactNode;
  className?: string;
}

export function Table<T extends unknown>({
  columns,
  data,
  rowKey,
  actions,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100 dark:bg-slate-950/30 dark:border-slate-800">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-6 py-3.5 text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-slate-400 ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3.5 text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-slate-400 text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-8 text-center text-sm font-semibold text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-all group"
              >
                {columns.map((col, idx) => {
                  let cellContent: React.ReactNode;
                  const val = col.accessor(row);

                  if (col.type === "chip") {
                    const colorClass = col.props?.colorMap?.[val] || "bg-gray-100 text-gray-650 dark:bg-slate-800 dark:text-gray-300";
                    cellContent = (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${colorClass}`}>
                        {val}
                      </span>
                    );
                  } else if (col.type === "card") {
                    const Icon = col.props?.icon?.(row);
                    const iconColor = col.props?.iconColor?.(row) || "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300";
                    const subtitle = col.props?.subtitle?.(row);
                    cellContent = (
                      <div className="flex items-center space-x-3">
                        {Icon && (
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${iconColor}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-black transition-colors">
                            {val}
                          </p>
                          {subtitle && (
                            <p className="text-[11px] font-medium text-gray-450">
                              {subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  } else {
                    const isNeg = col.props?.isNegative?.(row);
                    cellContent = (
                      <span className={isNeg !== undefined ? (isNeg ? "text-rose-600 dark:text-rose-450 text-sm font-bold" : "text-emerald-600 dark:text-emerald-400 text-sm font-bold") : "text-sm font-semibold text-gray-650 dark:text-gray-300"}>
                        {val}
                      </span>
                    );
                  }

                  return (
                    <td key={idx} className={`px-6 py-4.5 ${col.className || ""}`}>
                      {cellContent}
                    </td>
                  );
                })}
                {actions && (
                  <td className="px-6 py-4.5 text-right whitespace-nowrap">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
