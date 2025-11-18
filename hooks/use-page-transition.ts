"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Hook for managing page transitions with contextual loading feedback
 * Implements the loading pattern:
 * - 0-150ms: No feedback (perceived as instant)
 * - 150ms-1s: Light, contextual feedback (skeleton, fade)
 */
export function usePageTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)

  useEffect(() => {
    // Reset transition state on pathname change
    setIsTransitioning(false)
    setShowSkeleton(false)
  }, [pathname])

  const startTransition = () => {
    setIsTransitioning(true)
    
    // Show skeleton after 150ms if transition takes longer
    const skeletonTimeout = setTimeout(() => {
      setShowSkeleton(true)
    }, 150)

    return () => {
      clearTimeout(skeletonTimeout)
      setIsTransitioning(false)
      setShowSkeleton(false)
    }
  }

  return {
    isTransitioning,
    showSkeleton,
    startTransition,
  }
}

