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
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}

