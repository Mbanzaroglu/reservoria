import { z } from "zod"

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email gereklidir")
    .email("Geçerli bir email adresi giriniz"),
  password: z
    .string()
    .min(1, "Şifre gereklidir")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
})

export type LoginFormData = z.infer<typeof loginSchema>

/**
 * Register form validation schema
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Ad Soyad gereklidir")
      .min(2, "Ad Soyad en az 2 karakter olmalıdır")
      .max(100, "Ad Soyad en fazla 100 karakter olabilir"),
    email: z
      .string()
      .min(1, "Email gereklidir")
      .email("Geçerli bir email adresi giriniz"),
    password: z
      .string()
      .min(1, "Şifre gereklidir")
      .min(6, "Şifre en az 6 karakter olmalıdır")
      .max(100, "Şifre en fazla 100 karakter olabilir"),
    confirmPassword: z.string().min(1, "Şifre tekrar gereklidir"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

