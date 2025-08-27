"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T, value: any) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  items: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyMessage?: string;
  className?: string;
  mobileLayout?: (item: T, index: number) => ReactNode;
  onItemSelect?: (item: T, selected: boolean) => void;
  selectedItems?: Set<string | number>;
}

export function DataTable<T extends { id: string | number }>({
  items,
  columns,
  isLoading,
  error,
  onRetry,
  emptyMessage = "No items found",
  className = "",
  mobileLayout,
  onItemSelect,
  selectedItems = new Set(),
}: DataTableProps<T>) {
  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#171717] mb-2">
            Error loading data
          </h2>
          <p className="text-[#7b7b7b] mb-4">{error}</p>
          {onRetry && <Button onClick={onRetry}>Try Again</Button>}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7d52f4] mx-auto mb-4"></div>
        <p className="text-[#7b7b7b]">Loading...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#7b7b7b]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg border border-[#ebebeb] overflow-hidden ${className}`}
    >
      {/* Desktop Header */}
      <div
        className={`hidden lg:grid gap-4 px-4 lg:px-6 py-3 bg-[#A3A3A3]/12 border-b border-[#ebebeb]`}
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((column) => (
          <div
            key={String(column.key)}
            className={`text-[#7b7b7b] text-sm font-medium truncate ${
              column.className || ""
            }`}
          >
            {onItemSelect && column.key === "select" ? (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#7d52f4] border-gray-300 rounded"
                />
                <span>{column.label}</span>
              </div>
            ) : (
              column.label
            )}
          </div>
        ))}
      </div>

      {/* Table Content */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`px-4 lg:px-6 py-4 ${
            index !== items.length - 1 ? "border-b border-[#ebebeb]" : ""
          }`}
        >
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {mobileLayout ? (
              mobileLayout(item, index)
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-4 space-y-2 border border-gray-100">
                {columns.map((column) => {
                  const value =
                    column.key === "select" ? null : item[column.key as keyof T];
                  return (
                    <div
                      key={String(column.key)}
                      className="flex justify-between items-start text-sm"
                    >
                      <span className="font-medium text-gray-500">
                        {column.label}
                      </span>
                      <span className="text-gray-800 max-w-[70%] text-right truncate">
                        {column.render
                          ? column.render(item, value)
                          : String(value || "")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div
            className={`hidden lg:grid gap-4 items-center`}
            style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
          >
            {columns.map((column) => {
              const value =
                column.key === "select" ? null : item[column.key as keyof T];

              if (column.key === "select") {
                return (
                  <div
                    key={String(column.key)}
                    className="flex items-center gap-2 min-w-0"
                  >
                    {onItemSelect && (
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#7d52f4] border-gray-300 rounded"
                        checked={selectedItems.has(item.id)}
                        onChange={(e) => onItemSelect(item, e.target.checked)}
                      />
                    )}
                    <div className="truncate min-w-0">
                      {column.render
                        ? column.render(item, value)
                        : String(value || "")}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={String(column.key)}
                  className={`truncate min-w-0 ${
                    column.className ? column.className : ""
                  }`}
                >
                  {column.render
                    ? column.render(item, value)
                    : String(value || "")}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
