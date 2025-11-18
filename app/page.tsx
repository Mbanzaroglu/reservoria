import { redirect } from "next/navigation"
import { routes } from "@/lib/routes"

/**
 * Root page - redirects to dashboard overview
 * Middleware will handle authentication check
 */
export default function HomePage() {
  redirect(routes.overview)
}

