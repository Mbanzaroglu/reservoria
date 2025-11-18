"use client"

import React from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Error Boundary component for catching and displaying React errors
 */
interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorFallbackProps {
  error: Error | null
  resetError: () => void
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      const Fallback = this.props.fallback || DefaultErrorFallback
      return (
        <Fallback error={this.state.error} resetError={this.resetError} />
      )
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-bold">Bir hata oluştu</h1>
        <p className="text-muted-foreground max-w-md">
          {error?.message || "Beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenileyin."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={resetError} variant="outline">
          Tekrar Dene
        </Button>
        <Button onClick={() => window.location.reload()} variant="default">
          Sayfayı Yenile
        </Button>
      </div>
    </div>
  )
}

export { ErrorBoundary, type ErrorFallbackProps }

