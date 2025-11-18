import { useQuery } from "@tanstack/react-query"
import { dummyStatistics } from "@/lib/data/dummy-data"

/**
 * Statistics queries
 * Currently using dummy data - replace fetch logic when API is connected
 */

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}/statistics`)
      // return response.json()
      
      // Dummy data from constant
      return Promise.resolve(dummyStatistics)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

