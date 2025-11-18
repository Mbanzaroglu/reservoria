"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
import { apiEndpoints, env } from "@/lib/config"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"
import { Loader2 } from "lucide-react"
import { AuthBackground } from "@/components/auth/auth-background"

/**
 * Register page component
 * Handles user registration via external API with Zod validation
 */
export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${env.API_BASE_URL}${apiEndpoints.auth.register}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: data.name,
      //     email: data.email,
      //     password: data.password,
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
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <AuthBackground />
      
      <div className="relative w-full max-w-md space-y-8 rounded-lg border bg-card/95 backdrop-blur-sm p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Reservoria</h1>
          <p className="mt-2 text-muted-foreground">Yeni hesap oluşturun</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Soyad</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Adınız Soyadınız"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre Tekrar</FormLabel>
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
                  Kayıt yapılıyor...
                </>
              ) : (
                "Kayıt Ol"
              )}
            </Button>
          </form>
        </Form>

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

