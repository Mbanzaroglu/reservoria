"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CardSkeleton } from "@/components/ui/skeleton"
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { format, startOfMonth, endOfMonth, addMonths, subMonths, addWeeks, subWeeks, isToday, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, parseISO } from "date-fns"
import { tr } from "date-fns/locale"
import { useCalendarReservations, useFacilities, useRooms } from "@/lib/queries/calendar-queries"
import { cn } from "@/lib/utils"
import type { CalendarReservation } from "@/lib/queries/calendar-queries"
import { ReservationDetailModal } from "@/components/calendar/reservation-detail-modal"

/**
 * Format date to YYYY-MM-DD
 */
function formatDateForAPI(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

/**
 * Get days of week in Turkish
 */
const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]

/**
 * Calendar view types
 */
type CalendarView = "month" | "week"

export default function ReservationCalendarPage() {
  const [selectedFacility, setSelectedFacility] = useState<string>("")
  const [selectedRoom, setSelectedRoom] = useState<string>("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2025, 10, 1)) // November 2025
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2025, 10, 30)) // November 2025
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 10, 1)) // November 2025
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date(2025, 10, 1)) // November 2025
  const [view, setView] = useState<CalendarView>("month")
  const [selectedReservation, setSelectedReservation] = useState<CalendarReservation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch data
  const { data: facilities, isLoading: facilitiesLoading } = useFacilities()
  const { data: rooms, isLoading: roomsLoading } = useRooms(selectedFacility || undefined)
  const { data: reservations, isLoading: reservationsLoading } = useCalendarReservations({
    facilityId: selectedFacility || undefined,
    roomId: selectedRoom || undefined,
    startDate: startDate,
    endDate: endDate,
  })

  // Reset room when facility changes
  useEffect(() => {
    setSelectedRoom("")
  }, [selectedFacility])

  // Navigation handlers
  const goToPrevious = () => {
    if (view === "month") {
      setCurrentMonth(subMonths(currentMonth, 1))
    } else {
      setCurrentWeek(subWeeks(currentWeek, 1))
    }
  }

  const goToNext = () => {
    if (view === "month") {
      setCurrentMonth(addMonths(currentMonth, 1))
    } else {
      setCurrentWeek(addWeeks(currentWeek, 1))
    }
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    setCurrentWeek(today)
  }

  // Get reservations for a specific date
  const getReservationsForDate = (date: Date): CalendarReservation[] => {
    if (!reservations) return []
    const dateStr = formatDateForAPI(date)
    return reservations.filter((res) => {
      const checkIn = parseISO(res.checkIn)
      const checkOut = parseISO(res.checkOut)
      return date >= checkIn && date <= checkOut
    })
  }

  // Calendar grid for month view
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }) // Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  // Calendar grid for week view
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDaysList = eachDayOfInterval({ start: weekStart, end: weekEnd })

  return (
    <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Rezervasyon Takvimi</h1>
        </div>

        {/* Filters Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Facility Select */}
          <div className="space-y-2">
            <Label htmlFor="facility">Tesis Seçin</Label>
            {facilitiesLoading ? (
              <CardSkeleton className="h-10" />
            ) : (
              <Select value={selectedFacility || "all"} onValueChange={(value) => setSelectedFacility(value === "all" ? "" : value)}>
                <SelectTrigger id="facility">
                  <SelectValue placeholder="Tesis seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Tesisler</SelectItem>
                  {facilities?.map((facility) => (
                    <SelectItem key={facility.id} value={facility.id}>
                      {facility.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Room Select */}
          <div className="space-y-2">
            <Label htmlFor="room">Oda Seçin</Label>
            {roomsLoading ? (
              <CardSkeleton className="h-10" />
            ) : (
              <Select
                value={selectedRoom || "all"}
                onValueChange={(value) => setSelectedRoom(value === "all" ? "" : value)}
                disabled={!selectedFacility}
              >
                <SelectTrigger id="room">
                  <SelectValue placeholder="Oda seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Odalar</SelectItem>
                  {rooms?.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date">
              Başlangıç Tarihi <span className="text-destructive">*</span>
            </Label>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Başlangıç tarihi"
              required
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end-date">
              Bitiş Tarihi <span className="text-destructive">*</span>
            </Label>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="Bitiş tarihi"
              required
            />
          </div>
        </div>

        {/* Calendar View */}
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          {/* Calendar Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={goToToday}
                className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              >
                Bugün
              </Button>
            </div>

            {/* View Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant={view === "month" ? "default" : "outline"}
                onClick={() => setView("month")}
                className={cn(
                  view === "month"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                )}
              >
                Ay
              </Button>
              <Button
                variant={view === "week" ? "default" : "outline"}
                onClick={() => {
                  setView("week")
                  setCurrentWeek(currentMonth) // Sync week with current month when switching
                }}
                className={cn(
                  view === "week"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                )}
              >
                Hafta
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          {reservationsLoading ? (
            <CardSkeleton className="h-96" />
          ) : view === "month" ? (
            <div className="space-y-4">
              {/* Month Header */}
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {format(currentMonth, "MMMM yyyy", { locale: tr })}
                </h2>
              </div>

              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayReservations = getReservationsForDate(day)
                  const isCurrentMonth = isSameMonth(day, currentMonth)
                  const isTodayDate = isToday(day)

                  return (
                    <div
                      key={index}
                      className={cn(
                        "min-h-[80px] sm:min-h-[100px] border rounded-md p-2 text-sm",
                        !isCurrentMonth && "opacity-40 bg-muted/30",
                        isTodayDate && "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                      )}
                    >
                      <div
                        className={cn(
                          "font-medium mb-1",
                          isTodayDate && "text-green-600 dark:text-green-400"
                        )}
                      >
                        {format(day, "d")}
                      </div>
                      <div className="space-y-1">
                        {dayReservations.slice(0, 2).map((res) => (
                          <div
                            key={res.id}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-1.5 py-0.5 rounded truncate cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                            title={`${res.guestName} - ${res.roomName}`}
                            onClick={() => {
                              setSelectedReservation(res)
                              setIsModalOpen(true)
                            }}
                          >
                            {res.guestName}
                          </div>
                        ))}
                        {dayReservations.length > 2 && (
                          <div 
                            className="text-xs text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => {
                              // Show first reservation if more than 2
                              if (dayReservations.length > 2) {
                                setSelectedReservation(dayReservations[0])
                                setIsModalOpen(true)
                              }
                            }}
                          >
                            +{dayReservations.length - 2} daha
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Week Header */}
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {format(weekStart, "d MMMM", { locale: tr })} - {format(weekEnd, "d MMMM yyyy", { locale: tr })}
                </h2>
              </div>

              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-1">
                {weekDaysList.map((day, index) => {
                  const dayReservations = getReservationsForDate(day)
                  const isTodayDate = isToday(day)

                  return (
                    <div
                      key={index}
                      className={cn(
                        "min-h-[200px] sm:min-h-[300px] border rounded-md p-3 text-sm",
                        isTodayDate && "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                      )}
                    >
                      <div
                        className={cn(
                          "font-medium mb-2",
                          isTodayDate && "text-green-600 dark:text-green-400"
                        )}
                      >
                        {format(day, "d MMMM", { locale: tr })}
                      </div>
                      <div className="space-y-2">
                        {dayReservations.map((res) => (
                          <div
                            key={res.id}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1.5 rounded cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                            title={`${res.guestName} - ${res.roomName}`}
                            onClick={() => {
                              setSelectedReservation(res)
                              setIsModalOpen(true)
                            }}
                          >
                            <div className="font-medium">{res.guestName}</div>
                            <div className="text-muted-foreground">{res.roomName}</div>
                          </div>
                        ))}
                        {dayReservations.length === 0 && (
                          <div className="text-xs text-muted-foreground text-center py-4">
                            Rezervasyon yok
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Reservation Detail Modal */}
        <ReservationDetailModal
          reservation={selectedReservation}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
  )
}

