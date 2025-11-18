import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { routes } from "@/lib/routes"

/**
 * Middleware for route protection and accessibility management
 * Protects all /dashboard routes and redirects unauthenticated users to login
 */
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname

    // If user is authenticated and tries to access login/register, redirect to dashboard
    if (token && (pathname === routes.login || pathname === routes.register)) {
      return NextResponse.redirect(new URL(routes.overview, req.url))
    }

    // Allow access to public routes
    if (pathname === routes.login || pathname === routes.register || pathname === routes.home) {
      return NextResponse.next()
    }

    // For protected routes, NextAuth middleware will handle authentication
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        // Public routes don't require authentication
        const publicRoutes = [routes.login, routes.register, routes.home, "/api/auth"]
        if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route))) {
          return true
        }

        // Protected routes require authentication
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/api")) {
          return !!token
        }

        return true
      },
    },
    pages: {
      signIn: routes.login,
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

