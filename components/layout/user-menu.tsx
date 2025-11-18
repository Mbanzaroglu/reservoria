"use client"

import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, Sun, Moon, Monitor, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { routes } from "@/lib/routes"
import { useEffect, useState } from "react"

/**
 * User menu dropdown component
 * Shows user info, theme switcher, and logout option
 */
export function UserMenu() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Get user initials for avatar
  const getUserInitials = () => {
    if (session?.user?.name) {
      const names = session.user.name.split(" ")
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase()
      }
      return session.user.name.substring(0, 2).toUpperCase()
    }
    return "DG"
  }

  // Get user display name
  const getUserName = () => {
    return session?.user?.name || "Doğukan Gözeten"
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push(routes.login)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <span className="text-sm font-semibold">{getUserInitials()}</span>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">{getUserInitials()}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium leading-none">{getUserName()}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Theme Switcher */}
        <div className="p-2">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant={theme === "light" ? "secondary" : "ghost"}
              size="icon"
              className={`h-8 w-8 ${theme === "light" ? "bg-muted" : ""}`}
              onClick={() => setTheme("light")}
            >
              <Sun className={`h-4 w-4 ${theme === "light" ? "text-green-600" : ""}`} />
            </Button>
            <Button
              variant={theme === "dark" ? "secondary" : "ghost"}
              size="icon"
              className={`h-8 w-8 ${theme === "dark" ? "bg-muted" : ""}`}
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button
              variant={theme === "system" ? "secondary" : "ghost"}
              size="icon"
              className={`h-8 w-8 ${theme === "system" ? "bg-muted" : ""}`}
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Oturumu kapat</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

