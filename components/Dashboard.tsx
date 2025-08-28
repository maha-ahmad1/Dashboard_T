"use client"

import type { ReactNode } from "react"
import { SearchHeader, type SearchHeaderProps } from "./SearchHeader"
import { DataTable, type DataTableProps } from "./DataTable"

export interface Tab {
  id: string
  label: string
  active?: boolean
  onClick?: () => void
}

export interface DashboardProps<T> extends Omit<DataTableProps<T>, "items" | "isLoading" | "error" | "onRetry"> {
  headerProps: SearchHeaderProps

  tabs?: Tab[]

  items: T[]
  isLoading: boolean
  error: string | null
  onRetry: () => void

  additionalFilters?: ReactNode
  className?: string
}

export function ReusableDashboard<T extends { id: string | number }>({
  headerProps,
  tabs,
  items,
  isLoading,
  error,
  onRetry,
  additionalFilters,
  className = "",
  ...tableProps
}: DashboardProps<T>) {
  return (
    <div className={`flex-1 min-w-0 bg-white ml-4 ${className}`}>
      <SearchHeader {...headerProps} />

      {tabs && tabs.length > 0 && (
        <div className="bg-white border-[#ebebeb] px-4 lg:px-6 mt-4 sm:mt-8 mb-4 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center sm:justify-between gap-4">
            <div className="flex border border-[#ebebeb] bg-[#A3A3A3]/12 rounded-lg h-10 min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={tab.onClick}
                  className={`px-4 sm:px-12 py-0 text-sm whitespace-nowrap transition-colors ${
                    tab.active
                      ? "text-[#171717] border border-[#ebebeb] bg-white rounded-lg shadow-sm"
                      : "text-[#7b7b7b] hover:text-[#171717]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {additionalFilters && <div className="flex-shrink-0">{additionalFilters}</div>}
          </div>
        </div>
      )}

      <div className="px-4 lg:px-6 pb-6">
        <DataTable items={items} isLoading={isLoading} error={error} onRetry={onRetry} {...tableProps} />
      </div>
    </div>
  )
}
