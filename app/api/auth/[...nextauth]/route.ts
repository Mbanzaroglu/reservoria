import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { env, apiEndpoints } from "@/lib/config"
import { dummyLoginCredentials } from "@/lib/data/dummy-data"

/**
 * NextAuth configuration
 * Login/Register will come from external API, but session management
 * and refresh mechanisms will be handled by NextAuth
 */
export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials provider for external API authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // TODO: Replace with actual API call to external auth endpoint
        // For now, using dummy credentials for development/testing
        try {
          // In production, uncomment this and remove dummy auth logic below
          // const response = await fetch(`${env.API_BASE_URL}${apiEndpoints.auth.login}`, {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     email: credentials.email,
          //     password: credentials.password,
          //   }),
          // })
          // if (!response.ok) {
          //   return null
          // }
          // const user = await response.json()
          // return user

          // Dummy authentication for development/testing
          // This will be replaced with real API call in production
          console.log("Attempting login with:", credentials.email)
          
          const credential = dummyLoginCredentials.find(
            (cred) =>
              cred.email.toLowerCase().trim() === credentials.email.toLowerCase().trim() &&
              cred.password === credentials.password
          )

          if (credential) {
            console.log("Login successful for:", credential.user.email)
            return credential.user
          }

          console.log("Login failed: credentials not found")
          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.accessToken = token.accessToken as string
        session.user.refreshToken = token.refreshToken as string
      }
      return session
    },
  },
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

