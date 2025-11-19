/**
 * React Query hooks for facilities data
 * Uses dummy data for development - replace with API calls when ready
 */

import { useQuery } from "@tanstack/react-query"
import { dummyHotels } from "@/lib/data/dummy-data"

export interface Facility {
  id: string
  name: string
  city: string
  country: string
  createdAt: string
  status: "active" | "inactive"
  imageUrl?: string
}

/**
 * Hook to fetch facilities list with pagination and filters
 */
export function useFacilitiesList(params?: {
  page?: number
  limit?: number
  search?: string
  status?: "active" | "inactive"
}) {
  return useQuery({
    queryKey: ["facilities-list", params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      
      let facilities = dummyHotels.map((hotel) => ({
        id: hotel.id,
        name: hotel.name,
        city: hotel.city,
        country: "Türkiye", // Default country
        createdAt: "2025-11-18", // Default creation date
        status: "active" as const,
      }))
      
      // Apply search filter
      if (params?.search) {
        const searchLower = params.search.toLowerCase()
        facilities = facilities.filter(
          (f) =>
            f.name.toLowerCase().includes(searchLower) ||
            f.city.toLowerCase().includes(searchLower) ||
            f.country.toLowerCase().includes(searchLower)
        )
      }
      
      // Apply status filter
      if (params?.status) {
        facilities = facilities.filter((f) => f.status === params.status)
      }
      
      // Apply pagination
      const page = params?.page || 1
      const limit = params?.limit || 10
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      
      const paginatedFacilities = facilities.slice(startIndex, endIndex)
      
      return Promise.resolve({
        data: paginatedFacilities,
        total: facilities.length,
        page,
        limit,
        totalPages: Math.ceil(facilities.length / limit),
      })
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

