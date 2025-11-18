"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { SessionProvider } from "./session-provider"
import { QueryProvider } from "./query-provider"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { SplashScreen } from "@/components/ui/splash-screen"

/**
 * Central App Providers wrapper
 * Combines all providers in the correct order
 */
interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <SplashScreen>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </SplashScreen>
    </ErrorBoundary>
  )
}

