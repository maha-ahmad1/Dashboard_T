import { create } from "zustand"

export interface BaseItem {
  id: number | string
  [key: string]: any
}

export interface Tag {
  name: string
  color: string
  textColor: string
  count: number
}

export interface FilterConfig<T extends BaseItem> {
  searchFields: (keyof T)[]
  tagField?: keyof T
  customFilters?: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
  }>
}

export interface DataStoreConfig<T extends BaseItem> {
  fetchUrl: string
  transformData: (rawData: any[]) => T[]
  filterConfig: FilterConfig<T>
  initialPageSize?: number
}

interface BaseDataStore<T extends BaseItem> {
  items: T[]
  filteredItems: T[]
  searchQuery: string
  selectedTags: string[]
  selectedFilters: Record<string, string[]>
  isLoading: boolean
  error: string | null
  currentPage: number
  pageSize: number
  totalPages: number

  fetchItems: () => Promise<void>
  setSearchQuery: (query: string) => void
  toggleTag: (tag: string) => void
  setFilter: (filterKey: string, values: string[]) => void
  clearFilters: () => void
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  applyFilters: () => void
}

export function createDataStore<T extends BaseItem>(config: DataStoreConfig<T>) {
  return create<BaseDataStore<T>>((set, get) => ({
    items: [],
    filteredItems: [],
    searchQuery: "",
    selectedTags: [],
    selectedFilters: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    pageSize: config.initialPageSize || 20,
    totalPages: 1,

    fetchItems: async () => {
      set({ isLoading: true, error: null })
      try {
        const response = await fetch(config.fetchUrl)
        if (!response.ok) throw new Error(`Failed to fetch data from ${config.fetchUrl}`)

        const rawData = await response.json()
        console.log(" Raw API data:", rawData.slice(0, 2))
        const items = config.transformData(rawData)
        console.log("Transformed items:", items.slice(0, 2))

        set({
          items,
          filteredItems: items,
          isLoading: false,
          totalPages: Math.ceil(items.length / get().pageSize),
        })
      } catch (error) {
        console.log(" Fetch error:", error)
        set({ error: (error as Error).message, isLoading: false })
      }
    },

    setSearchQuery: (query: string) => {
      set({ searchQuery: query, currentPage: 1 })
      get().applyFilters()
    },

    toggleTag: (tag: string) => {
      const { selectedTags } = get()
      const newSelectedTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]

      set({ selectedTags: newSelectedTags, currentPage: 1 })
      get().applyFilters()
    },

    setFilter: (filterKey: string, values: string[]) => {
      const { selectedFilters } = get()
      set({
        selectedFilters: { ...selectedFilters, [filterKey]: values },
        currentPage: 1,
      })
      get().applyFilters()
    },

    clearFilters: () => {
      const { items } = get()
      set({
        searchQuery: "",
        selectedTags: [],
        selectedFilters: {},
        filteredItems: items,
        currentPage: 1,
        totalPages: Math.ceil(items.length / get().pageSize),
      })
    },

    setPage: (page: number) => {
      set({ currentPage: page })
    },

    setPageSize: (size: number) => {
      set({ pageSize: size, currentPage: 1 })
      get().applyFilters()
    },

    applyFilters: () => {
      const { items, searchQuery, selectedTags, selectedFilters, pageSize } = get()
      console.log("Applying filters:", { searchQuery, selectedTags, selectedFilters })
      let filtered = [...items]

      if (searchQuery) {
        filtered = filtered.filter((item) =>
          config.filterConfig.searchFields.some((field) => {
            const value = item[field]
            if (typeof value === "string") {
              return value.toLowerCase().includes(searchQuery.toLowerCase())
            }
            if (Array.isArray(value)) {
              return value.some((v:any) => typeof v === "string" && v.toLowerCase().includes(searchQuery.toLowerCase()))
            }
            return false
          }),
        )
      }

      if (selectedTags.length > 0 && config.filterConfig.tagField) {
        filtered = filtered.filter((item) => {
          const tags = item[config.filterConfig.tagField!] as Tag[] | undefined
          return tags?.some((tag) => selectedTags.includes(tag.name))
        })
      }

      Object.entries(selectedFilters).forEach(([filterKey, values]) => {
        if (values.length > 0) {
          filtered = filtered.filter((item) => {
            const itemValue = item[filterKey]
            return values.includes(String(itemValue))
          })
        }
      })

      console.log("Filtered results:", filtered.length, "items")
      set({
        filteredItems: filtered,
        totalPages: Math.ceil(filtered.length / pageSize),
      })
    },
  }))
}
