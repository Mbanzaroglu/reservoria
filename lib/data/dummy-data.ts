/**
 * Dummy data constants for development
 * All data will be fetched from these constants until API is connected
 * Once API is connected, simply replace the fetch logic in queries/mutations
 */

// Financial Summary Dummy Data
export const dummyFinancialSummary = {
  reservationRevenue: 54000.00,
  commissionEarned: 6200.00,
  platformCosts: 0.00,
  amountToPayHotel: 47800.00,
}

// Hotels/Facilities Dummy Data
export const dummyHotels = [
  {
    id: "1",
    name: "Test-2",
    city: "Antalya",
    reservationCount: 2,
    reservationRevenue: 46000.00,
    platformEarnings: 4600.00,
    amountToPayHotel: 36800.00,
    expectedFromPlatform: 46000.00,
    delayedAmount: 46.00,
  },
  {
    id: "2",
    name: "Test-1",
    city: "izmir",
    reservationCount: 2,
    reservationRevenue: 8000.00,
    platformEarnings: 1600.00,
    amountToPayHotel: 6000.00,
    expectedFromPlatform: 8000.00,
    delayedAmount: 8000.00,
  },
  {
    id: "3",
    name: "deneme",
    city: "İstanbul",
    reservationCount: 0,
    reservationRevenue: 0.00,
    platformEarnings: 0.00,
    amountToPayHotel: 0.00,
    expectedFromPlatform: 0.00,
    delayedAmount: 0.00,
    collectionPending: true,
  },
]

// Statistics Dummy Data
export const dummyStatistics = {
  totalFacilities: 3,
  activeFacilities: 3,
  totalRooms: 4,
  activeRooms: 4,
  totalReservations: 4,
  reservationsYear: 2025,
  totalUsers: 4,
  adminUsers: 4,
}

// Reservations Dummy Data
export const dummyReservations = [
  {
    id: "1",
    hotelId: "1",
    hotelName: "Test-2",
    roomId: "1",
    roomName: "Deluxe Suite",
    guestName: "John Doe",
    checkIn: "2025-01-15",
    checkOut: "2025-01-20",
    totalAmount: 23000.00,
    status: "confirmed",
  },
  {
    id: "2",
    hotelId: "1",
    hotelName: "Test-2",
    roomId: "2",
    roomName: "Standard Room",
    guestName: "Jane Smith",
    checkIn: "2025-02-01",
    checkOut: "2025-02-05",
    totalAmount: 23000.00,
    status: "confirmed",
  },
  {
    id: "3",
    hotelId: "2",
    hotelName: "Test-1",
    roomId: "3",
    roomName: "Economy Room",
    guestName: "Bob Johnson",
    checkIn: "2025-01-10",
    checkOut: "2025-01-15",
    totalAmount: 4000.00,
    status: "confirmed",
  },
  {
    id: "4",
    hotelId: "2",
    hotelName: "Test-1",
    roomId: "4",
    roomName: "Family Room",
    guestName: "Alice Williams",
    checkIn: "2025-02-10",
    checkOut: "2025-02-15",
    totalAmount: 4000.00,
    status: "confirmed",
  },
]

// Rooms Dummy Data
export const dummyRooms = [
  {
    id: "1",
    hotelId: "1",
    hotelName: "Test-2",
    name: "Deluxe Suite",
    type: "suite",
    capacity: 2,
    price: 4600.00,
    status: "active",
  },
  {
    id: "2",
    hotelId: "1",
    hotelName: "Test-2",
    name: "Standard Room",
    type: "standard",
    capacity: 2,
    price: 2300.00,
    status: "active",
  },
  {
    id: "3",
    hotelId: "2",
    hotelName: "Test-1",
    name: "Economy Room",
    type: "economy",
    capacity: 1,
    price: 800.00,
    status: "active",
  },
  {
    id: "4",
    hotelId: "2",
    hotelName: "Test-1",
    name: "Family Room",
    type: "family",
    capacity: 4,
    price: 1600.00,
    status: "active",
  },
]

// Users Dummy Data
export const dummyUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@reservoria.com",
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@reservoria.com",
    role: "manager",
    status: "active",
  },
  {
    id: "3",
    name: "Staff User",
    email: "staff@reservoria.com",
    role: "staff",
    status: "active",
  },
  {
    id: "4",
    name: "Test User",
    email: "test@reservoria.com",
    role: "admin",
    status: "active",
  },
]

// Dummy Login Credentials for Testing
// These are only used in development mode
export const dummyLoginCredentials = [
  {
    email: "admin@reservoria.com",
    password: "admin123",
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@reservoria.com",
      role: "admin",
      accessToken: "dummy-access-token-1",
      refreshToken: "dummy-refresh-token-1",
    },
  },
  {
    email: "manager@reservoria.com",
    password: "manager123",
    user: {
      id: "2",
      name: "Manager User",
      email: "manager@reservoria.com",
      role: "manager",
      accessToken: "dummy-access-token-2",
      refreshToken: "dummy-refresh-token-2",
    },
  },
  {
    email: "staff@reservoria.com",
    password: "staff123",
    user: {
      id: "3",
      name: "Staff User",
      email: "staff@reservoria.com",
      role: "staff",
      accessToken: "dummy-access-token-3",
      refreshToken: "dummy-refresh-token-3",
    },
  },
  {
    email: "test@reservoria.com",
    password: "test123",
    user: {
      id: "4",
      name: "Test User",
      email: "test@reservoria.com",
      role: "admin",
      accessToken: "dummy-access-token-4",
      refreshToken: "dummy-refresh-token-4",
    },
  },
  {
    email: "dogukan@reservoria.com",
    password: "dogukan123",
    user: {
      id: "5",
      name: "Doğukan Gözeten",
      email: "dogukan@reservoria.com",
      role: "admin",
      accessToken: "dummy-access-token-5",
      refreshToken: "dummy-refresh-token-5",
    },
  },
]

