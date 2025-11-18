"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useUIStore } from "@/lib/store"
import { UserMenu } from "./user-menu"

export function Header() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  return (
    <header className="sticky top-0 z-20 flex h-14 sm:h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <UserMenu />
      </div>
    </header>
  )
}

