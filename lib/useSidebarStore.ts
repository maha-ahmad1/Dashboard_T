import { create } from "zustand"

interface SidebarState {
  open: boolean
  toggle: () => void
  close: () => void
  openSidebar: () => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  close: () => set({ open: false }),
  openSidebar: () => set({ open: true }),
}))