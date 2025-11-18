"use client"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useUIStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { PageTransition } from "@/components/ui/page-transition"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/50 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-7xl">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  )
}

