"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"

/**
 * Dashboard layout wrapper
 * Applies DashboardLayout to all routes under /dashboard/*
 * This eliminates the need to wrap each page component with DashboardLayout
 */
export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}

