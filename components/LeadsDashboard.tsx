"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ReusableDashboard } from "./Dashboard"
import type { Column } from "./DataTable"
import { createDataStore, type DataStoreConfig } from "@/lib/use-data-store"
import SearchFilter from "@/components/search-filter"
import Image from "next/image"

export interface Lead {
  id: number
  name: string
  email: string
  tags: Array<{ name: string; color: string; count: number; textColor: string }>
  connectedWith: {
    name: string
    email: string
    avatar: string
  }
  date: string
  hasExport?: boolean
  hasIntegration?: boolean
  title: string
  body: string
}

const leadsConfig: DataStoreConfig<Lead> = {
  fetchUrl: "https://jsonplaceholder.typicode.com/posts",
  transformData: (posts: any[]) => {
    const tagStyles: Record<string, { bg: string; text: string }> = {
      Team: { bg: "#EBF1FF", text: "#335CFF" },
      "GITEX DUBAI": { bg: "#E0FAEC", text: "#1FC16B" },
      Summit: { bg: "#FFF3EB", text: "#FA7319" },
    }
    const tagNames = Object.keys(tagStyles)

    return posts.slice(0, 20).map((post: any): Lead => {
      const randomTag =
        Math.random() > 0.3
          ? (() => {
              const tagName = tagNames[Math.floor(Math.random() * tagNames.length)]
              return {
                name: tagName,
                color: tagStyles[tagName].bg,
                textColor: tagStyles[tagName].text,
                count: Math.floor(Math.random() * 5) + 1,
              }
            })()
          : null

      return {
        id: post.id,
        name: post.title
          .split(" ")
          .slice(0, 2)
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        email: `user${post.userId}@company.com`,
        tags: randomTag ? [randomTag] : [],
        connectedWith: {
          name: post.title
            .split(" ")
            .slice(0, 2)
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          email: `user${post.userId}@alignui.com`,
          avatar: "/image5.png",
        },
        date: "Tuesday\nAug 04 - 2025",
        hasExport: Math.random() > 0.5,
        hasIntegration: Math.random() > 0.5,
        title: post.title,
        body: post.body,
      }
    })
  },
  filterConfig: {
    searchFields: ["name", "email", "tags"],
    tagField: "tags",
  },
}

const useLeadsStore = createDataStore<Lead>(leadsConfig)

export default function LeadsDashboardReusable() {
  const {
    filteredItems: filteredLeads,
    isLoading,
    error,
    fetchItems: fetchLeads,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useLeadsStore()

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const columns: Column<Lead>[] = [
    {
      key: "select",
      label: "Lead",
      render: (lead) => (
        <div className="flex items-center gap-3 min-w-0">
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
      ),

    },
    {
      key: "tags",
      label: "Tags",
      render: (lead) => (
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
                  <span className="text-[#7b7b7b] text-sm border rounded-full px-2 bg-[#F5F5F5]">+{tag.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-[#7b7b7b] text-sm font-medium border rounded-full px-2 bg-[#F5F5F5]">
              No tags added
            </span>
          )}
        </div>
      ),
    },
    {
      key: "connectedWith",
      label: "Connected with",
      render: (lead) => (
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
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (lead) => <div className="text-[#171717] text-sm whitespace-pre-line">{lead.date}</div>,
    },
    {
      key: "hasExport",
      label: "Export",
      render: (lead) => (
        <div className="flex items-center gap-2">
          {lead.hasExport && (
            <Button variant="outline" size="sm" className="text-[#7b7b7b] border-[#d1d1d1] bg-transparent">
              <ExternalLink className="h-4 w-4 mr-1" />
              Export
            </Button>
          )}
          {lead.hasIntegration && (
            <div className="flex items-center space-x-[-24px]">
              <div className="h-10 w-10 rounded flex items-center justify-center">
                <Image src="/Table.png" alt="integration" width={32} height={32} className="w-14 h-14 object-contain" />
              </div>
              <div className="h-10 w-10 rounded flex items-center justify-center">
                <Image src="/Mock.png" alt="integration" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <div className="h-10 w-10 rounded flex items-center justify-center">
                <Image src="/Table.png" alt="integration" width={32} height={32} className="w-14 h-14 object-contain" />
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]

  const handleItemSelect = (lead: Lead, selected: boolean) => {
    const newSelected = new Set(selectedItems)
    if (selected) {
      newSelected.add(lead.id)
    } else {
      newSelected.delete(lead.id)
    }
    setSelectedItems(newSelected)
  }

  const mobileLayout = (lead: Lead, index: number) => (
    <div className="space-y-4">
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
            <Button variant="outline" size="sm" className="text-[#7b7b7b] border-[#d1d1d1] bg-transparent h-8 w-8 p-0">
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
          {lead.hasIntegration && (
            <div className="flex items-center space-x-[-24px]">
              <div className="h-10 w-10 rounded flex items-center justify-center">
                <Image src="/Table.png" alt="integration" width={32} height={32} className="w-14 h-14 object-contain" />
              </div>
              <div className="h-10 w-10 rounded flex items-center justify-center">
                <Image src="/Mock.png" alt="integration" width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <div className="h-10 w-10 rounded flex items-center justify-center">
                <Image src="/Table.png" alt="integration" width={32} height={32} className="w-14 h-14 object-contain" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <ReusableDashboard
      headerProps={{
        user: {
          name: "Sophia Williams",
          subtitle: "Welcome back to Synergy 👋",
          avatar: "/image5.png",
          isOnline: true,
        },
        searchQuery,
        onSearchChange: setSearchQuery,
        searchPlaceholder: "Search leads by name, email, or tags...",
      }}
      tabs={[
        { id: "leads", label: "Leads", active: true },
        { id: "quality", label: "Lead Quality Score" },
        { id: "leaderboard", label: "Leaderboard" },
      ]}
      items={filteredLeads}
      columns={columns}
      isLoading={isLoading}
      error={error}
      onRetry={fetchLeads}
      mobileLayout={mobileLayout}
      onItemSelect={handleItemSelect}
      selectedItems={selectedItems}
      emptyMessage="No leads found matching your criteria."
      additionalFilters={
        <SearchFilter selectedTags={selectedTags} onToggleTag={toggleTag} onClearFilters={clearFilters} />
      }
    />
  )
}
