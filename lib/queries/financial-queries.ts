import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { dummyFinancialSummary, dummyHotels } from "@/lib/data/dummy-data"
import { apiEndpoints, constants } from "@/lib/config"

/**
 * Financial data queries and mutations
 * Currently using dummy data - replace fetch logic when API is connected
 */

// Financial Summary Query
export function useFinancialSummary() {
  return useQuery({
    queryKey: ["financial", "summary"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}${apiEndpoints.financial.summary}`)
      // return response.json()
      
      // Dummy data from constant
      return Promise.resolve(dummyFinancialSummary)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hotels Financial Summary Query
export function useHotelsFinancialSummary() {
  return useQuery({
    queryKey: ["financial", "hotels-summary"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}${apiEndpoints.financial.summary}`)
      // return response.json()
      
      // Dummy data from constant
      return Promise.resolve(dummyHotels)
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Update Financial Summary Mutation
export function useUpdateFinancialSummary() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: typeof dummyFinancialSummary) => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}${apiEndpoints.financial.summary}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // })
      // return response.json()
      
      // Dummy mutation - just return the data
      return Promise.resolve(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financial"] })
    },
  })
}

