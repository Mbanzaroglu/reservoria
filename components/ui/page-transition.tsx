"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

/**
 * Page Transition wrapper component
 * Provides smooth fade transitions between pages
 * Implements loading pattern: 0-150ms no feedback, 150ms+ light feedback
 */
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname
      
      // Start fade out
      setIsVisible(false)

      // After fade out completes, update children and fade in
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsVisible(true)
      }, 150) // Match the 150ms threshold

      return () => clearTimeout(timer)
    } else {
      // Pathname didn't change, just update children
      setDisplayChildren(children)
    }
  }, [pathname, children])

  return (
    <div
      className={cn(
        "transition-opacity duration-150",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {displayChildren}
    </div>
  )
}

