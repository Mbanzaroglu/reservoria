"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { type ReactNode } from "react"

/**
 * Session Provider wrapper for NextAuth
 * Handles session storage and refresh mechanisms
 */
interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      // Refetch session every 5 minutes
      refetchInterval={5 * 60}
      // Refetch session when window gets focused
      refetchOnWindowFocus={true}
    >
      {children}
    </NextAuthSessionProvider>
  )
}

