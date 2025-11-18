"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useFinancialSummary, useHotelsFinancialSummary } from "@/lib/queries/financial-queries"
import { useStatistics } from "@/lib/queries/statistics-queries"
import { Loading } from "@/components/ui/loading"
import { constants } from "@/lib/config"
import {
  TrendingUp,
  DollarSign,
  TrendingDown,
  Monitor,
  Building,
  Bed,
  Calendar,
  Users,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"

/**
 * Format currency for display
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: constants.DEFAULT_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Financial Summary Cards Component
 */
function FinancialSummaryCards() {
  const { data, isLoading } = useFinancialSummary()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-card" />
        ))}
      </div>
    )
  }

  const summary = data || {
    reservationRevenue: 0,
    commissionEarned: 0,
    platformCosts: 0,
    amountToPayHotel: 0,
  }

  const cards = [
    {
      title: "Rezervasyon Geliri",
      value: formatCurrency(summary.reservationRevenue),
      description: "Airbnb/Booking'den gelecek toplam",
      icon: TrendingUp,
      iconColor: "text-green-500",
    },
    {
      title: "Komisyon Kazancı",
      value: formatCurrency(summary.commissionEarned),
      description: "Platform komisyon geliri",
      icon: DollarSign,
      iconColor: "text-yellow-500",
    },
    {
      title: "Platform Maliyetleri",
      value: formatCurrency(summary.platformCosts),
      description: "Stripe, Wise vb. kesintiler",
      icon: TrendingDown,
      iconColor: "text-red-500",
    },
    {
      title: "Otel Sahibine Ödenecek Tutar",
      value: formatCurrency(summary.amountToPayHotel),
      description: "Komisyon ve platform kesintileri düşüldükten sonra",
      icon: Monitor,
      iconColor: "text-blue-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <p className="mt-2 text-2xl font-bold">{card.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <card.icon className={`h-3 w-3 ${card.iconColor}`} />
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Financial Summary Table Component
 */
function FinancialSummaryTable() {
  const { data: hotels, isLoading } = useHotelsFinancialSummary()

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <Loading text="Yükleniyor..." />
      </div>
    )
  }

  const hotelsData = hotels || []

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between border-b p-6">
        <h2 className="text-lg font-semibold">Finansal Özet - Tüm Oteller</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ara"
            className="pl-9"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Otel Adı
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Şehir
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Rezervasyon Sayısı
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Rezervasyon Geliri
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Platform Kazancı
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Otel Sahibine Ödenecek Tutar
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                Platformdan Bekl
              </th>
            </tr>
          </thead>
          <tbody>
            {hotelsData.map((hotel) => (
              <tr key={hotel.id} className="border-b hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{hotel.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{hotel.city}</td>
                <td className="px-6 py-4">{hotel.reservationCount}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">
                      {formatCurrency(hotel.reservationRevenue)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Airbnb/Booking&apos;den gelecek
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">
                      {formatCurrency(hotel.platformEarnings)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Komisyon geliri
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">
                      {formatCurrency(hotel.amountToPayHotel)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Komisyon ve platform kesintileri düşüldükten sonra
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">
                      {formatCurrency(hotel.expectedFromPlatform)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {hotel.delayedAmount > 0
                        ? `Gecikmiş: ${formatCurrency(hotel.delayedAmount)}`
                        : hotel.collectionPending
                        ? "Tahsilat beklenmiyor"
                        : ""}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          sayfa başına 10
        </div>
      </div>
    </div>
  )
}

/**
 * Statistics Cards Component
 */
function StatisticsCards() {
  const { data, isLoading } = useStatistics()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-card" />
        ))}
      </div>
    )
  }

  const stats = data || {
    totalFacilities: 0,
    activeFacilities: 0,
    totalRooms: 0,
    activeRooms: 0,
    totalReservations: 0,
    reservationsYear: new Date().getFullYear(),
    totalUsers: 0,
    adminUsers: 0,
  }

  const cards = [
    {
      title: "Toplam Tesis",
      value: stats.totalFacilities.toString(),
      description: `Aktif: ${stats.activeFacilities}`,
      icon: Building,
    },
    {
      title: "Toplam Oda",
      value: stats.totalRooms.toString(),
      description: `Aktif: ${stats.activeRooms}`,
      icon: Bed,
    },
    {
      title: "Toplam Rezervasyon",
      value: stats.totalReservations.toString(),
      description: `${stats.reservationsYear} yılı`,
      icon: Calendar,
    },
    {
      title: "Kullanıcılar",
      value: stats.totalUsers.toString(),
      description: `Yönetici: ${stats.adminUsers}`,
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <p className="mt-2 text-2xl font-bold">{card.value}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <card.icon className="h-3 w-3" />
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Dashboard Overview Page
 */
export default function OverviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Genel Bakış</h1>
          <p className="text-muted-foreground">
            Finansal özet ve genel istatistikler
          </p>
        </div>

        <FinancialSummaryCards />

        <FinancialSummaryTable />

        <StatisticsCards />
      </div>
    </DashboardLayout>
  )
}

