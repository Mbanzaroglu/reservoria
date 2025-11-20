"use client"

import { useState, useEffect } from "react"
import { CardSkeleton, TableSkeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Building,
  Download,
  Filter,
  Search,
} from "lucide-react"
import { constants } from "@/lib/config"
import { useReports } from "@/lib/queries/reports-queries"

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
 * Format date for display
 */
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Hook to manage loading pattern: 0-150ms no feedback, 150ms+ show skeleton
 * Uses React Query's natural loading state - no artificial delays
 */
function useReportsWithLoadingPattern() {
  const { data, isLoading, isFetching } = useReports()
  const [showSkeleton, setShowSkeleton] = useState(false)

  useEffect(() => {
    // Only show skeleton if loading takes longer than 150ms
    if (isLoading || isFetching) {
      const timer = setTimeout(() => {
        // Double-check if still loading after 150ms
        setShowSkeleton(true)
      }, 150)

      return () => clearTimeout(timer)
    } else {
      // Loading completed, hide skeleton immediately
      setShowSkeleton(false)
    }
  }, [isLoading, isFetching])

  return {
    data: data || {
      reservationReports: [],
      financialReports: [],
      facilityReports: [],
    },
    isLoading: showSkeleton && (isLoading || isFetching),
  }
}

/**
 * Reservation Reports Section
 */
function ReservationReportsSection() {
  const { data, isLoading } = useReportsWithLoadingPattern()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReports = data.reservationReports.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Rezervasyon Raporları</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Rezervasyon Raporları</h2>
        <div className="flex gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rapor ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filtrele
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{report.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{report.period}</p>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Toplam Rezervasyon:</span>
                <span className="font-medium">{report.totalReservations}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Toplam Gelir:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(report.totalRevenue)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  report.status === "completed"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                }`}
              >
                {report.status === "completed" ? "Tamamlandı" : "İşleniyor"}
              </span>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" />
                İndir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Financial Reports Section
 */
function FinancialReportsSection() {
  const { data, isLoading } = useReportsWithLoadingPattern()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Finansal Raporlar</h2>
        <TableSkeleton rows={3} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Finansal Raporlar</h2>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Tarih Seç
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Rapor Adı</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Dönem</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Toplam Gelir</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Komisyon</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Otel Ödemeleri</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Durum</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {data.financialReports.map((report) => (
                <tr key={report.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium">{report.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{report.period}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold">
                    {formatCurrency(report.totalRevenue)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-green-600">
                    {formatCurrency(report.commission)}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {formatCurrency(report.hotelPayments)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        report.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {report.status === "completed" ? "Tamamlandı" : "İşleniyor"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/**
 * Facility Reports Section
 */
function FacilityReportsSection() {
  const { data, isLoading } = useReportsWithLoadingPattern()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tesis Raporları</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tesis Raporları</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.facilityReports.map((report) => (
          <div
            key={report.id}
            className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{report.facilityName}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{report.period}</p>
              </div>
              <Building className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Toplam Rezervasyon</p>
                <p className="mt-1 text-lg font-semibold">{report.totalReservations}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Toplam Gelir</p>
                <p className="mt-1 text-lg font-semibold text-green-600">
                  {formatCurrency(report.totalRevenue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Doluluk Oranı</p>
                <p className="mt-1 text-lg font-semibold">{report.occupancyRate}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ortalama Kalış</p>
                <p className="mt-1 text-lg font-semibold">{report.averageStay} gün</p>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Detaylı Rapor İndir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Reports Page Component
 */
export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"reservations" | "financial" | "facilities">(
    "reservations"
  )

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Raporlar</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Rezervasyon, finansal ve tesis raporlarını görüntüleyin ve indirin
            </p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Yeni Rapor Oluştur
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("reservations")}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "reservations"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calendar className="mr-2 inline h-4 w-4" />
              Rezervasyon Raporları
            </button>
            <button
              onClick={() => setActiveTab("financial")}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "financial"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <DollarSign className="mr-2 inline h-4 w-4" />
              Finansal Raporlar
            </button>
            <button
              onClick={() => setActiveTab("facilities")}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "facilities"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building className="mr-2 inline h-4 w-4" />
              Tesis Raporları
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "reservations" && <ReservationReportsSection />}
          {activeTab === "financial" && <FinancialReportsSection />}
          {activeTab === "facilities" && <FacilityReportsSection />}
        </div>
      </div>
  )
}

