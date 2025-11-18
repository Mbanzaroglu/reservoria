"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { routes } from "@/lib/routes"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { Loader2 } from "lucide-react"
import { AuthBackground } from "@/components/auth/auth-background"

/**
 * Login page component
 * Handles user authentication via NextAuth with Zod validation
 */
export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const callbackUrl = searchParams.get("callbackUrl") || routes.overview
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
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
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <AuthBackground />
      
      <div className="relative w-full max-w-md space-y-8 rounded-lg border bg-card/95 backdrop-blur-sm p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Reservoria</h1>
          <p className="mt-2 text-muted-foreground">Hesabınıza giriş yapın</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>

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

