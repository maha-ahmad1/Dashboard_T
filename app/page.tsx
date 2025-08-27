"use client"

import { useEffect, useState } from "react"
import { Bell, ExternalLink, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import SearchFilter from "@/components/search-filter"
import { useLeadsStore } from "@/lib/store"
import Image from "next/image"

export default function LeadsDashboard() {
  const { filteredLeads, isLoading, error, fetchLeads,searchQuery, setSearchQuery } = useLeadsStore()
 const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

 
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#171717] mb-2">Error loading leads</h2>
          <p className="text-[#7b7b7b] mb-4">{error}</p>
          <Button onClick={fetchLeads}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-w-0 bg-white ml-4">
      {/* Header */}
      <div className="bg-white border-b border-[#ebebeb] px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src="/image5.png" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="min-w-0">
              <h1 className="text-[#171717] font-semibold text-base sm:text-lg truncate">Sophia Williams</h1>
              <p className="text-[#7b7b7b] text-xs sm:text-sm truncate">Welcome back to Synergy 👋</p>
            </div>
          </div>
             <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              {isSearchOpen && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or tags..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-40 sm:w-64 px-3 py-2 text-sm border border-[#d1d1d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7d52f4] focus:border-transparent"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#7b7b7b] hover:text-[#171717]"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}
              <button onClick={handleSearchClick} className="p-1 hover:bg-[#f5f5f5] rounded transition-colors">
                <Search className="h-4 w-4 sm:h-5 sm:w-5  text-[#7b7b7b]" />
              </button>
            </div>
            <div className="relative">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-[#7b7b7b]" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 border border-white rounded-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-[#ebebeb] px-4 lg:px-6 mt-4 sm:mt-8 mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex overflow-x-auto border border-[#ebebeb] bg-[#A3A3A3]/12 rounded-lg h-10 min-w-0">
            <button className="px-6 sm:px-12 py-0 text-[#171717] text-sm border border-[#ebebeb] bg-white rounded-lg shadow-sm hover:bg-[#f9f9f9] transition-colors whitespace-nowrap">
              Leads
            </button>
            <button className="px-4 sm:px-6 py-0 text-[#7b7b7b] text-sm whitespace-nowrap hover:text-[#171717] transition-colors">
              Lead Quality Score
            </button>
            <button className="px-4 sm:px-6 py-0 text-[#7b7b7b] text-sm whitespace-nowrap hover:text-[#171717] transition-colors">
              Leaderboard
            </button>
          </div>
          <div className="flex-shrink-0">
            <SearchFilter />
          </div>
        </div>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-4 px-4 lg:px-6 py-4 bg-[#A3A3A3]/12 border border-[#ebebeb] rounded-lg mb-4 mx-4 lg:mx-6">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 text-[#7d52f4] border-gray-300 rounded" />
          <span className="text-[#7b7b7b] text-sm font-medium">Lead</span>
        </div>
        <div className="text-[#7b7b7b] text-sm font-medium">Tags</div>
        <div className="text-[#7b7b7b] text-sm font-medium">Connected with</div>
        <div className="text-[#7b7b7b] text-sm font-medium">Date</div>
        <div className="text-[#7b7b7b] text-sm font-medium">Export</div>
      </div>

      {/* Table Content */}
      <div className="px-4 lg:px-6 pb-6">
        <div className="bg-white rounded-lg border border-[#ebebeb] overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7d52f4] mx-auto mb-4"></div>
              <p className="text-[#7b7b7b]">Loading leads...</p>
            </div>
          ) : (
            <>
              {filteredLeads.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-[#7b7b7b]">No leads found matching your criteria.</p>
                </div>
              ) : (
                filteredLeads.map((lead, index) => (
                  <div
                    key={lead.id}
                    className={`px-4 lg:px-6 py-4 ${
                      index !== filteredLeads.length - 1 ? "border-b border-[#ebebeb]" : ""
                    }`}
                  >
                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#ffc0c5] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#681219] font-medium text-xs sm:text-sm">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[#171717] font-medium text-sm sm:text-base truncate">{lead.name}</div>
                          <div className="text-[#7b7b7b] text-xs sm:text-sm truncate">{lead.email}</div>
                        </div>
                      </div>

                      {lead.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          {lead.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className="flex items-center gap-1">
                              <Badge
                                style={{
                                  backgroundColor: tag.color,
                                  color: tag.textColor,
                                }}
                                className="text-xs font-medium px-2 py-1"
                              >
                                {tag.name}
                              </Badge>
                              <span className="text-[#7b7b7b] text-xs sm:text-sm">+{tag.count}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="text-[#7b7b7b] text-xs sm:text-sm flex-1">{lead.date.replace("\n", " ")}</div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {lead.hasExport && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#7b7b7b] border-[#d1d1d1] bg-transparent h-8 w-8 p-0"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                          {lead.hasIntegration && (
                               <div className="flex items-center  space-x-[-24px]">
                            <div className="h-10 w-10 rounded flex items-center justify-center">
                              <Image
                                src="/Table.png"
                                alt="integration"
                                width={32}
                                height={32}
                                className="w-14 h-14 object-contain"
                              />
                            </div>
                            <div className="h-10 w-10 rounded flex items-center justify-center">
                              <Image
                                src="/Mock.png"
                                alt="integration"
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                              />
                            </div>
                            <div className="h-10 w-10 rounded flex items-center justify-center">
                              <Image
                                src="/Table.png"
                                alt="integration"
                                width={32}
                                height={32}
                                className="w-14 h-14 object-contain"
                              />
                            </div>
                          </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-center">
                      {/* Lead */}
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-[#7d52f4] border-gray-300 rounded flex-shrink-0"
                        />
                        <div className="h-12 w-12 rounded-full bg-[#ffc0c5] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#681219] font-medium text-sm">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[#171717] font-medium text-sm truncate">{lead.name}</div>
                          <div className="text-[#7b7b7b] text-sm truncate">{lead.email}</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-2 min-w-0">
                        {lead.tags.length > 0 ? (
                          <div className="flex items-center gap-1 flex-wrap">
                            {lead.tags.map((tag, tagIndex) => (
                              <div key={tagIndex} className="flex items-center gap-1">
                                <Badge
                                  style={{
                                    backgroundColor: tag.color,
                                    color: tag.textColor,
                                  }}
                                  className="text-xs font-medium px-2 py-1"
                                >
                                  {tag.name}
                                </Badge>
                                <span className="text-[#7b7b7b] text-sm border rounded-full px-2 bg-[#F5F5F5]">
                                  +{tag.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[#7b7b7b] text-sm font-medium border rounded-full px-2 bg-[#F5F5F5]">
                            No tags added
                          </span>
                        )}
                      </div>

                      {/* Connected with */}
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={lead.connectedWith.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {lead.connectedWith.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="text-[#171717] font-medium text-sm truncate">{lead.connectedWith.name}</div>
                          <div className="text-[#7b7b7b] text-sm truncate">{lead.connectedWith.email}</div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="text-[#171717] text-sm whitespace-pre-line">{lead.date}</div>

                      {/* Export */}
                      <div className="flex items-center gap-2">
                        {lead.hasExport && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#7b7b7b] border-[#d1d1d1] bg-transparent"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Export
                          </Button>
                        )}
                        {lead.hasIntegration && (
                          <div className="flex items-center  space-x-[-24px]">
                            <div className="h-10 w-10 rounded flex items-center justify-center">
                              <Image
                                src="/Table.png"
                                alt="integration"
                                width={32}
                                height={32}
                                className="w-14 h-14 object-contain"
                              />
                            </div>
                            <div className="h-10 w-10 rounded flex items-center justify-center">
                              <Image
                                src="/Mock.png"
                                alt="integration"
                                width={24}
                                height={24}
                                className="w-6 h-6 object-contain"
                              />
                            </div>
                            <div className="h-10 w-10 rounded flex items-center justify-center">
                              <Image
                                src="/Table.png"
                                alt="integration"
                                width={32}
                                height={32}
                                className="w-14 h-14 object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}



