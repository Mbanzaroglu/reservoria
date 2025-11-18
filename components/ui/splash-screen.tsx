"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * Splash Screen component for initial app loading
 */
interface SplashScreenProps {
  children: React.ReactNode
  minDisplayTime?: number // Minimum time to show splash screen in ms
}

export function SplashScreen({ children, minDisplayTime = 1000 }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const loadApp = async () => {
      // Wait for minimum display time
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minDisplayTime - elapsed)
      
      await new Promise((resolve) => setTimeout(resolve, remaining))
      setIsLoading(false)
    }

    loadApp()
  }, [startTime, minDisplayTime])

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold text-primary">Reservoria</div>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}

