/**
 * Route configuration file for all application routes
 */

export const routes = {
  // Public routes
  home: '/',
  login: '/login',
  register: '/register',
  
  // Dashboard
  dashboard: '/dashboard',
  overview: '/dashboard/overview',
  
  // Reports
  reports: '/dashboard/reports',
  
  // Calendar
  reservationCalendar: '/dashboard/reservation-calendar',
  
  // Facilities
  facilities: '/dashboard/facilities',
  facilityDetail: (id: string) => `/dashboard/facilities/${id}`,
  facilityCreate: '/dashboard/facilities/create',
  facilityEdit: (id: string) => `/dashboard/facilities/${id}/edit`,
  
  // iCal Integrations
  icalIntegrations: '/dashboard/ical-integrations',
  
  // Rooms
  rooms: '/dashboard/rooms',
  roomDetail: (id: string) => `/dashboard/rooms/${id}`,
  roomCreate: '/dashboard/rooms/create',
  roomEdit: (id: string) => `/dashboard/rooms/${id}/edit`,
  
  // Reservations
  reservations: '/dashboard/reservations',
  reservationDetail: (id: string) => `/dashboard/reservations/${id}`,
  reservationCreate: '/dashboard/reservations/create',
  reservationEdit: (id: string) => `/dashboard/reservations/${id}/edit`,
  
  // Users
  users: '/dashboard/users',
  userDetail: (id: string) => `/dashboard/users/${id}`,
  userCreate: '/dashboard/users/create',
  userEdit: (id: string) => `/dashboard/users/${id}/edit`,
  
  // Logs
  logs: '/dashboard/logs',
  
  // Pricing
  pricingRules: '/dashboard/pricing-rules',
  
  // Financial
  financialSummary: '/dashboard/financial-summary',
  receivables: '/dashboard/receivables',
  manualCollections: '/dashboard/manual-collections',
  hotelPayments: '/dashboard/hotel-payments',
  financialReports: '/dashboard/financial-reports',
  
  // Settings
  settings: '/dashboard/settings',
} as const;

// Helper function to check if route requires authentication
export const isProtectedRoute = (pathname: string): boolean => {
  return pathname.startsWith('/dashboard') || pathname.startsWith('/api');
};

// Helper function to get route title
export const getRouteTitle = (pathname: string): string => {
  const routeMap: Record<string, string> = {
    [routes.overview]: 'Genel Bakış',
    [routes.reports]: 'Raporlar',
    [routes.reservationCalendar]: 'Rezervasyon Takvimi',
    [routes.facilities]: 'Tesisler',
    [routes.icalIntegrations]: 'iCal Entegrasyonları',
    [routes.rooms]: 'Odalar',
    [routes.reservations]: 'Rezervasyonlar',
    [routes.users]: 'Kullanıcılar',
    [routes.logs]: 'Loglar',
    [routes.pricingRules]: 'Fiyat Kuralları',
    [routes.financialSummary]: 'Finansal Özet',
    [routes.receivables]: 'Alacaklar',
    [routes.manualCollections]: 'Manuel Tahsilatlar',
    [routes.hotelPayments]: 'Otel Ödemeleri',
    [routes.financialReports]: 'Finansal Raporlar',
    [routes.settings]: 'Ayarlar',
  };
  
  return routeMap[pathname] || 'Reservoria';
};

