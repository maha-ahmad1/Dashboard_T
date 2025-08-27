import { create } from "zustand"

export interface Lead {
  id: number
  name: string
  email: string
  tags: Array<{ name: string; color: string; count: number ,textColor:string}>
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

interface LeadsStore {
  leads: Lead[]
  filteredLeads: Lead[]
  searchQuery: string
  selectedTags: string[]
  isLoading: boolean
  error: string | null
  fetchLeads: () => Promise<void>
  setSearchQuery: (query: string) => void
  toggleTag: (tag: string) => void
  clearFilters: () => void
}




const tagStyles: Record<
  string,
  { bg: string; text: string }
> = {
  Team: { bg: "#EBF1FF", text: "#335CFF" },       
  "GITEX DUBAI": { bg: "#E0FAEC", text: "#1FC16B" }, 
  Summit: { bg: "#FFF3EB", text: "#FA7319" },       
  
}

const tagNames = Object.keys(tagStyles)

const transformPostToLead = (post: any): Lead => {
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
}

export const useLeadsStore = create<LeadsStore>((set, get) => ({
  leads: [],
  filteredLeads: [],
  searchQuery: "",
  selectedTags: [],
  isLoading: false,
  error: null,

  fetchLeads: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      if (!response.ok) throw new Error("Failed to fetch leads")

      const posts = await response.json()
      const leads = posts.slice(0, 20).map(transformPostToLead)

      set({ leads, filteredLeads: leads, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
    const { leads, selectedTags } = get()

    let filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(query.toLowerCase()) ||
        lead.email.toLowerCase().includes(query.toLowerCase()) ||
        lead.tags.some((tag) => tag.name.toLowerCase().includes(query.toLowerCase())),
    )

    if (selectedTags.length > 0) {
      filtered = filtered.filter((lead) => lead.tags.some((tag) => selectedTags.includes(tag.name)))
    }

    set({ filteredLeads: filtered })
  },

  toggleTag: (tag: string) => {
    const { selectedTags, leads, searchQuery } = get()
    const newSelectedTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag]

    let filtered = leads

    if (searchQuery) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.tags.some((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (newSelectedTags.length > 0) {
      filtered = filtered.filter((lead) => lead.tags.some((tag) => newSelectedTags.includes(tag.name)))
    }

    set({ selectedTags: newSelectedTags, filteredLeads: filtered })
  },

  clearFilters: () => {
    const { leads } = get()
    set({ searchQuery: "", selectedTags: [], filteredLeads: leads })
  },
}))
