"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"
import { apiEndpoints, env } from "@/lib/config"
import { Loader2 } from "lucide-react"

/**
 * Register page component
 * Handles user registration via external API
 */
export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Şifreler eşleşmiyor",
        description: "Lütfen şifrelerin aynı olduğundan emin olun.",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Şifre çok kısa",
        description: "Şifre en az 6 karakter olmalıdır.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}${apiEndpoints.auth.register}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // })

      // if (!response.ok) {
      //   const error = await response.json()
      //   throw new Error(error.message || "Kayıt başarısız")
      // }

      // Dummy registration - simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Kayıt başarılı",
        description: "Hesabınız oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...",
      })

      // Redirect to login after successful registration
      setTimeout(() => {
        router.push(routes.login)
      }, 1500)
    } catch (error) {
      toast({
        title: "Kayıt başarısız",
        description:
          error instanceof Error
            ? error.message
            : "Bir hata oluştu. Lütfen tekrar deneyin.",
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
          <p className="mt-2 text-muted-foreground">Yeni hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Adınız Soyadınız"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

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
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kayıt yapılıyor...
              </>
            ) : (
              "Kayıt Ol"
            )}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Zaten hesabınız var mı? </span>
          <Link
            href={routes.login}
            className="font-medium text-primary hover:underline"
          >
            Giriş yapın
          </Link>
        </div>
      </div>
    </div>
  )
}

