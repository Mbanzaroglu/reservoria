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

    // If user is not authenticated and tries to access protected routes, redirect to login
    if (!token && pathname.startsWith("/dashboard")) {
      const loginUrl = new URL(routes.login, req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
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
        const publicRoutes = [
          routes.login, 
          routes.register, 
          routes.home, 
          "/api/auth",
          "/_next",
          "/favicon.ico"
        ]
        
        // Check if pathname matches any public route
        const isPublicRoute = publicRoutes.some((route) => {
          if (route === "/_next") {
            return pathname.startsWith("/_next")
          }
          return pathname === route || pathname.startsWith(route)
        })

        if (isPublicRoute) {
          return true
        }

        // Protected routes (dashboard and other app routes) require authentication
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }

        // For other routes, allow if authenticated
        return !!token
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
     * - api/auth (NextAuth endpoints)
     */
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api/auth).*)",
  ],
}

