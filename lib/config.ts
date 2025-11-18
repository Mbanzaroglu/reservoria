/**
 * Central configuration file for constants, API endpoints, and environment variables
 */

// Environment Variables
export const env = {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
} as const;

// API Endpoints
export const apiEndpoints = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  // Hotel/Facility endpoints
  hotels: {
    list: '/hotels',
    detail: (id: string) => `/hotels/${id}`,
    create: '/hotels',
    update: (id: string) => `/hotels/${id}`,
    delete: (id: string) => `/hotels/${id}`,
  },
  // Reservation endpoints
  reservations: {
    list: '/reservations',
    detail: (id: string) => `/reservations/${id}`,
    create: '/reservations',
    update: (id: string) => `/reservations/${id}`,
    delete: (id: string) => `/reservations/${id}`,
  },
  // Financial endpoints
  financial: {
    summary: '/financial/summary',
    receivables: '/financial/receivables',
    manualCollections: '/financial/manual-collections',
    hotelPayments: '/financial/hotel-payments',
    reports: '/financial/reports',
  },
  // Room endpoints
  rooms: {
    list: '/rooms',
    detail: (id: string) => `/rooms/${id}`,
    create: '/rooms',
    update: (id: string) => `/rooms/${id}`,
    delete: (id: string) => `/rooms/${id}`,
  },
  // User endpoints
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
} as const;

// Application Constants
export const constants = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Timeouts
  REQUEST_TIMEOUT: 30000,
  TOAST_DURATION: 3000,
  
  // Date formats
  DATE_FORMAT: 'DD.MM.YYYY',
  DATETIME_FORMAT: 'DD.MM.YYYY HH:mm',
  
  // Currency
  DEFAULT_CURRENCY: 'TRY',
  CURRENCY_SYMBOL: '₺',
  
  // Commission rates (example - should come from API/config)
  DEFAULT_COMMISSION_RATE: 0.10, // 10%
  PLATFORM_FEE_RATE: 0.02, // 2%
} as const;

// Feature Flags
export const features = {
  ENABLE_DARK_MODE: true,
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
} as const;

