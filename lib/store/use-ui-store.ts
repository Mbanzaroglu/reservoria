import { create } from "zustand"

/**
 * UI state management store
 * For simple UI state that doesn't require server sync
 */
interface UIState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state: UIState) => ({ sidebarOpen: !state.sidebarOpen })),
}))

