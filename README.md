# Reservoria - Otel Yönetim Sistemi

Rezervasyon ve otel yönetim platformu

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment değişkenlerini kontrol edin:
`.env.local` dosyası proje root'unda oluşturulmuştur. Eğer yoksa, aşağıdaki değişkenleri ekleyin:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=reservoria-development-secret-key-min-32-chars-2024
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

**ÖNEMLİ:** `.env.local` dosyası oluşturulduktan sonra sunucuyu **mutlaka yeniden başlatın**!

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcıda açın: [http://localhost:3000](http://localhost:3000)

## Proje Yapısı

- `app/` - Next.js App Router sayfaları
- `components/` - React bileşenleri
  - `ui/` - Shadcn/ui bileşenleri
  - `layout/` - Layout bileşenleri
  - `providers/` - Context ve Provider bileşenleri
- `lib/` - Yardımcı fonksiyonlar ve yapılandırmalar
  - `config.ts` - Merkezi yapılandırma (constants, API endpoints, env)
  - `routes.ts` - Route yapılandırması
  - `store/` - Zustand store'ları
  - `queries/` - React Query hooks
  - `data/` - Dummy data constants
- `types/` - TypeScript tip tanımlamaları

## Özellikler

- ✅ Theme Provider (Light/Dark mode)
- ✅ NextAuth Session Provider
- ✅ Zustand (Basit state management)
- ✅ React Query (API data fetching ve caching)
- ✅ Merkezi Toaster, Loading, Splash Screen, Error Handling
- ✅ Dummy data yapısı (API bağlantısı için hazır)
- ✅ Dashboard sayfası (Genel Bakış)

## API Bağlantısı

Şu anda tüm veriler dummy data'dan gelmektedir. API'yi bağlamak için:

1. `lib/queries/` klasöründeki query dosyalarında TODO yorumlarını bulun
2. Dummy data fetch'lerini gerçek API çağrılarıyla değiştirin
3. `lib/data/dummy-data.ts` dosyasını silmek zorunda değilsiniz, sadece kullanmayın

## Teknolojiler

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui
- NextAuth
- React Query (TanStack Query)
- Zustand

