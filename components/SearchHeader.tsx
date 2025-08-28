"use client"

import type React from "react"

import { useState } from "react"
import { Search, Bell,Menu  } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebarStore } from "@/lib/useSidebarStore";

export interface SearchHeaderProps {
  user: {
    name: string
    subtitle: string
    avatar?: string
    isOnline?: boolean
  }
  searchQuery: string
  onSearchChange: (query: string) => void
  searchPlaceholder?: string
  showNotifications?: boolean
  notificationCount?: number
  className?: string
}

export function SearchHeader({
  user,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  showNotifications = true,
  notificationCount = 0,
  className = "",
  ...props
}: SearchHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { toggle ,open} = useSidebarStore()
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  const clearSearch = () => {
    onSearchChange("")
  }

  return (
    <div className={`bg-white border-b border-[#ebebeb] px-4 lg:px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-[#171717] font-semibold text-base sm:text-lg truncate">{user.name}</h1>
            <p className="text-[#7b7b7b] text-xs sm:text-sm truncate">{user.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            {isSearchOpen && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="w-24 md:w-32  lg:w-60 px-3 py-2 text-sm border border-[#d1d1d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d52f4] focus:border-transparent"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#7b7b7b] hover:text-[#171717]"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            <button onClick={handleSearchClick} className=" hover:bg-[#f5f5f5] rounded transition-colors">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#7b7b7b]" />
            </button>
          </div>

          {showNotifications && (
            <div className="relative">
              <Bell className="hidden sm:flex h-4 w-4 sm:h-5 sm:w-5 text-[#7b7b7b]" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 border border-white rounded-full"></span>
              )}
            </div>
            
          )}
            <button
            onClick={toggle}
            className=" rounded hover:bg-gray-100 md:hidden"
            aria-label="Toggle sidebar"
          >
               <Menu className="h-5 w-5" />       
          </button>
        </div>
      </div>
    </div>
  )
}
