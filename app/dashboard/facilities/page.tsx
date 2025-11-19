"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableSkeleton } from "@/components/ui/skeleton"
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { useFacilitiesList } from "@/lib/queries/facilities-queries"
import { routes } from "@/lib/routes"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

/**
 * Format date for display
 */
function formatDate(dateString: string): string {
  return format(new Date(dateString), "dd.MM.yyyy", { locale: tr })
}

/**
 * Table column headers configuration
 */
const TABLE_COLUMNS = [
  { key: "checkbox", label: "", className: "w-12" },
  { key: "image", label: "Görsel", className: "" },
  { key: "name", label: "Tesis Adı", className: "" },
  { key: "city", label: "Şehir", className: "" },
  { key: "country", label: "Ülke", className: "" },
  { key: "createdAt", label: "Oluşturulma", className: "" },
  { key: "status", label: "Durum", className: "" },
  { key: "actions", label: "", className: "" },
] as const

const TABLE_HEADER_CLASS = "px-4 py-3 text-left text-sm font-semibold"
const TABLE_CELL_CLASS = "px-4 py-3"

/**ft
 * Facilities List Page
 */
export default function FacilitiesPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "all">("all")
  const [activeFilters, setActiveFilters] = useState(0)

  const { data, isLoading } = useFacilitiesList({
    page,
    limit,
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  })

  // Calculate active filters count
  useEffect(() => {
    let count = 0
    if (searchTerm) count++
    if (statusFilter !== "all") count++
    setActiveFilters(count)
  }, [searchTerm, statusFilter])

  const facilities = data?.data || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Tesisler</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ara"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1) // Reset to first page on search
                }}
                className="pl-9"
              />
            </div>

            {/* Filter Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrele
                  {activeFilters > 0 && (
                    <Badge
                      variant="destructive"
                      className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {activeFilters}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">
                    Durum
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => {
                      setStatusFilter(value as "active" | "inactive" | "all")
                      setPage(1)
                    }}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Pasif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
            >
              <Download className="mr-2 h-4 w-4" />
              İçe Aktar
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                // TODO: Navigate to create facility page
                window.location.href = routes.facilityCreate
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tesis Oluştur
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          {isLoading ? (
            <TableSkeleton rows={5} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      {TABLE_COLUMNS.map((column) => (
                        <th
                          key={column.key}
                          className={cn(
                            TABLE_HEADER_CLASS,
                            column.className || ""
                          )}
                        >
                          {column.key === "checkbox" ? (
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                            />
                          ) : (
                            column.label
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {facilities.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-8 text-center text-muted-foreground"
                        >
                          Tesis bulunamadı
                        </td>
                      </tr>
                    ) : (
                      facilities.map((facility) => (
                        <tr
                          key={facility.id}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className={TABLE_CELL_CLASS}>
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className={TABLE_CELL_CLASS}>
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                {facility.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className={cn(TABLE_CELL_CLASS, "font-medium")}>
                            {facility.name}
                          </td>
                          <td className={cn(TABLE_CELL_CLASS, "text-muted-foreground")}>
                            {facility.city}
                          </td>
                          <td className={cn(TABLE_CELL_CLASS, "text-muted-foreground")}>
                            {facility.country}
                          </td>
                          <td className={cn(TABLE_CELL_CLASS, "text-muted-foreground")}>
                            {formatDate(facility.createdAt)}
                          </td>
                          <td className={TABLE_CELL_CLASS}>
                            <div className="flex items-center gap-2">
                              {facility.status === "active" ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  <span className="text-green-600">Aktif</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    Pasif
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className={TABLE_CELL_CLASS}>
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => {
                                  // TODO: Handle delete
                                  console.log("Delete facility:", facility.id)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                onClick={() => {
                                  // TODO: Navigate to edit page
                                  window.location.href = routes.facilityEdit(
                                    facility.id
                                  )
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Düzenle
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {total > 0 && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t p-4">
                  <div className="text-sm text-muted-foreground">
                    Toplam {total} sonuçtan {Math.min((page - 1) * limit + 1, total)} ile{" "}
                    {Math.min(page * limit, total)} arası görüntüleniyor
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={limit.toString()}
                      onValueChange={(value) => {
                        setLimit(Number(value))
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      sayfa başına
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

