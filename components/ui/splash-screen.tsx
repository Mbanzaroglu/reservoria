"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * Splash Screen component for initial app loading only
 * Shows only on first app load, not on page transitions
 */
interface SplashScreenProps {
  children: React.ReactNode
  minDisplayTime?: number // Minimum time to show splash screen in ms
}

const SPLASH_SEEN_KEY = "reservoria-splash-seen"

export function SplashScreen({ children, minDisplayTime = 1000 }: SplashScreenProps) {
  // Initialize with localStorage check to avoid flash
  const [isLoading, setIsLoading] = useState(() => {
    // Only check on client side
    if (typeof window === "undefined") {
      return true // SSR: show splash initially
    }
    // If splash was seen before, don't show it
    return localStorage.getItem(SPLASH_SEEN_KEY) !== "true"
  })
  
  const [startTime] = useState(() => Date.now())

  useEffect(() => {
    // If splash was already seen, nothing to do
    if (!isLoading) {
      return
    }

    const loadApp = async () => {
      // Double-check localStorage (in case it changed)
      const splashSeen = typeof window !== "undefined" 
        ? localStorage.getItem(SPLASH_SEEN_KEY) === "true"
        : false

      // If splash was seen before, skip it immediately
      if (splashSeen) {
        setIsLoading(false)
        return
      }

      // Wait for minimum display time
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDisplayTime - elapsed)
      
      await new Promise((resolve) => setTimeout(resolve, remaining))
      
      // Mark splash as seen
      if (typeof window !== "undefined") {
        localStorage.setItem(SPLASH_SEEN_KEY, "true")
      }
      
      setIsLoading(false)
    }

    loadApp()
  }, [isLoading, startTime, minDisplayTime])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold text-primary">Reservoria</div>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}

