/**
 * React Query hooks for calendar/reservation data
 * Uses dummy data for development - replace with API calls when ready
 */

import { useQuery } from "@tanstack/react-query"
import { dummyCalendarReservations, dummyHotels, dummyRooms } from "@/lib/data/dummy-data"

export interface CalendarReservation {
  id: string
  facilityId: string
  facilityName: string
  roomId: string
  roomName: string
  guestName: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled"
  adultCount: number
  childCount: number
  totalPrice: number
  source: string
}

export interface CalendarFilters {
  facilityId?: string
  roomId?: string
  startDate?: Date
  endDate?: Date
}

/**
 * Hook to fetch calendar reservations
 */
export function useCalendarReservations(filters?: CalendarFilters) {
  return useQuery({
    queryKey: ["calendar-reservations", filters],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      let filtered = [...dummyCalendarReservations]
      
      if (filters?.facilityId) {
        filtered = filtered.filter((r) => r.facilityId === filters.facilityId)
      }
      
      if (filters?.roomId) {
        filtered = filtered.filter((r) => r.roomId === filters.roomId)
      }
      
      if (filters?.startDate) {
        const startDateStr = filters.startDate.toISOString().split("T")[0]
        filtered = filtered.filter((r) => r.checkIn >= startDateStr || r.checkOut >= startDateStr)
      }
      
      if (filters?.endDate) {
        const endDateStr = filters.endDate.toISOString().split("T")[0]
        filtered = filtered.filter((r) => r.checkIn <= endDateStr || r.checkOut <= endDateStr)
      }
      
      return Promise.resolve(filtered as CalendarReservation[])
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook to fetch facilities for dropdown
 */
export function useFacilities() {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return Promise.resolve(dummyHotels)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook to fetch rooms for a specific facility
 */
export function useRooms(facilityId?: string) {
  return useQuery({
    queryKey: ["rooms", facilityId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      if (!facilityId) {
        return Promise.resolve([])
      }
      const filtered = dummyRooms.filter((r) => r.hotelId === facilityId)
      return Promise.resolve(filtered)
    },
    enabled: !!facilityId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

