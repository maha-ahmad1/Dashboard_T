"use client"

import { useState } from "react"
import { Filter, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLeadsStore } from "@/lib/store"

export default function SearchFilter() {
  const [showFilters, setShowFilters] = useState(false)
  const { searchQuery, selectedTags, setSearchQuery, toggleTag, clearFilters, leads } = useLeadsStore()

  // Get unique tags from all leads
  const availableTags = Array.from(new Set(leads.flatMap((lead) => lead.tags.map((tag) => tag.name))))

  return (
    <div className="space-y-4">
      {/* Filter Toggle */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-[#7b7b7b] border-[#d1d1d1] bg-transparent"
        >
          <Filter className="h-4 w-4" />
          Filter
          {selectedTags.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedTags.length}
            </Badge>
          )}
        </Button>

        {(searchQuery || selectedTags.length > 0) && (
          <Button variant="ghost" onClick={clearFilters} className="text-[#7b7b7b] hover:text-[#171717]">
            Clear all
            <X className="h-4 w-4 ml-1" />
          </Button>
        )}

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 text-[#7b7b7b] border-[#d1d1d1] bg-transparent">
            Export <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white border border-[#ebebeb] rounded-lg p-4">
          <h3 className="text-[#171717] font-medium mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
                className={
                  selectedTags.includes(tag)
                    ? "bg-[#7d52f4] hover:bg-[#6828ee]"
                    : "border-[#d1d1d1] text-[#7b7b7b] hover:border-[#7d52f4]"
                }
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
