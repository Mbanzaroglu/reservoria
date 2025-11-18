# Dummy Login Credentials

Bu dosya geliştirme ve test için kullanılan dummy login bilgilerini içerir.

## ⚠️ ÖNEMLİ

Bu bilgiler **sadece geliştirme ortamında** çalışır. Production'da gerçek API kullanılacaktır.

## Test Kullanıcıları

### 1. Admin Kullanıcı
- **Email:** `admin@reservoria.com`
- **Şifre:** `admin123`
- **Rol:** Admin

### 2. Manager Kullanıcı
- **Email:** `manager@reservoria.com`
- **Şifre:** `manager123`
- **Rol:** Manager

### 3. Staff Kullanıcı
- **Email:** `staff@reservoria.com`
- **Şifre:** `staff123`
- **Rol:** Staff

### 4. Test Kullanıcı
- **Email:** `test@reservoria.com`
- **Şifre:** `test123`
- **Rol:** Admin

### 5. Doğukan Gözeten
- **Email:** `dogukan@reservoria.com`
- **Şifre:** `dogukan123`
- **Rol:** Admin

## Kullanım

1. Login sayfasına gidin: `/login`
2. Yukarıdaki email ve şifrelerden birini kullanarak giriş yapın
3. Başarılı giriş sonrası dashboard'a yönlendirileceksiniz

## Notlar

- Bu dummy credentials sadece `NODE_ENV=development` modunda çalışır
- Production'da gerçek API entegrasyonu kullanılacaktır
- Dummy credentials `lib/data/dummy-data.ts` dosyasında tanımlıdır
- NextAuth authorize fonksiyonunda dummy auth mantığı bulunur

