"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"
import { Loader2 } from "lucide-react"

/**
 * Login page component
 * Handles user authentication via NextAuth
 */
export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const callbackUrl = searchParams.get("callbackUrl") || routes.overview

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      console.log("Sign in result:", result)

      if (result?.error) {
        console.error("Sign in error:", result.error)
        
        let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin."
        
        if (result.error === "CredentialsSignin") {
          errorMessage = "Email veya şifre hatalı. Lütfen tekrar deneyin."
        } else if (result.error === "Configuration") {
          errorMessage = "Sunucu yapılandırma hatası. Lütfen sunucuyu yeniden başlatın."
        }
        
        toast({
          title: "Giriş başarısız",
          description: errorMessage,
          variant: "destructive",
        })
      } else if (result?.ok) {
        toast({
          title: "Giriş başarılı",
          description: "Yönlendiriliyorsunuz...",
        })
        // Small delay to show toast and ensure session is saved
        setTimeout(() => {
          // Refresh to get updated session
          router.refresh()
          // Navigate to callback URL
          router.push(callbackUrl)
        }, 500)
      } else {
        toast({
          title: "Giriş başarısız",
          description: "Beklenmeyen bir hata oluştu.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Bir hata oluştu",
        description: error instanceof Error ? error.message : "Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Reservoria</h1>
          <p className="mt-2 text-muted-foreground">Hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@email.com"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              "Giriş Yap"
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Hesabınız yok mu? </span>
          <Link
            href={routes.register}
            className="font-medium text-primary hover:underline"
          >
            Kayıt olun
          </Link>
        </div>
      </div>
    </div>
  )
}

