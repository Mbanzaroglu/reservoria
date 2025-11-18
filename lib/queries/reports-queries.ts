import { useQuery } from "@tanstack/react-query"
import { dummyReports } from "@/lib/data/dummy-data"

/**
 * Reports queries
 * Currently using dummy data - replace fetch logic when API is connected
 */

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}/reports`)
      // return response.json()
      
      // Dummy data from constant - no artificial delay
      return Promise.resolve(dummyReports)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

