"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchFilterProps {
  selectedTags?: string[];
  onToggleTag?: (tag: string) => void;
  onClearFilters?: () => void;
}

export default function SearchFilter({
  selectedTags = [],
  onToggleTag,
  onClearFilters,
}: SearchFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { id: "Team", label: "Team" },
    { id: "GITEX DUBAI", label: "GITEX DUBAI" },
    { id: "Summit", label: "Summit" },
  ];

  const toggleFilter = (filterId: string) => {
    if (onToggleTag) {
      onToggleTag(filterId);
    }
  };

  const clearAll = () => {
    if (onClearFilters) {
      onClearFilters();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-[#7b7b7b] border-[#d1d1d1] bg-white hover:bg-[#f9f9f9]"
        >
          Filter
          <ChevronDown className="h-4 w-4" />
          {selectedTags.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-[#7d52f4] text-white rounded-full">
              {selectedTags.length}
            </span>
          )}
        </Button>
        <div className=" flex items-center gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-[#7b7b7b] border-[#d1d1d1] bg-transparent"
          >
            Export <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isOpen && (
        <div
          className="
    absolute 
    left-0 md:right-0 top-full mt-2 
    w-48 bg-white border border-[#ebebeb] 
    rounded-lg shadow-lg z-10
  "
        >
          <div className="p-2">
            <div className="text-sm font-medium text-[#171717] mb-2">
              Filter by:
            </div>
            {filterOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 p-2 hover:bg-[#f5f5f5] rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(option.id)}
                  onChange={() => toggleFilter(option.id)}
                  className="w-4 h-4 text-[#7d52f4] border-gray-300 rounded"
                />
                <span className="text-sm text-[#171717]">{option.label}</span>
              </label>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="border-t border-[#ebebeb] p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="w-full text-[#7b7b7b] hover:text-[#171717]"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
