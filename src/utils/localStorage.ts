export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  location: string;
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'upcoming';
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  image: string;
  rating: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  createdAt: Date;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rooms: number;
  rating: number;
  status: 'active' | 'maintenance' | 'inactive';
  description?: string;
  createdAt: Date;
}

// Local storage keys
const STORAGE_KEYS = {
  BOOKINGS: 'hotel_bookings',
  USERS: 'hotel_users',
  HOTELS: 'hotel_hotels',
  CURRENT_USER: 'current_user',
} as const;

// Utility functions for local storage
export const storage = {
  // Bookings
  getBookings: (): Booking[] => {
    try {
      const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (!bookings) return getSampleBookings();
      return JSON.parse(bookings).map((booking: any) => ({
        ...booking,
        checkIn: new Date(booking.checkIn),
        checkOut: new Date(booking.checkOut),
        createdAt: new Date(booking.createdAt),
      }));
    } catch {
      return getSampleBookings();
    }
  },

  saveBookings: (bookings: Booking[]) => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const bookings = storage.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `HTB${Date.now().toString().slice(-6)}`,
      createdAt: new Date(),
    };
    bookings.unshift(newBooking);
    storage.saveBookings(bookings);
    return newBooking;
  },

  updateBooking: (id: string, updates: Partial<Booking>) => {
    const bookings = storage.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates };
      storage.saveBookings(bookings);
      return bookings[index];
    }
    return null;
  },

  cancelBooking: (id: string) => {
    return storage.updateBooking(id, { status: 'cancelled' });
  },

  // Users
  getUsers: (): User[] => {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      if (!users) return getSampleUsers();
      return JSON.parse(users).map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt),
      }));
    } catch {
      return getSampleUsers();
    }
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  addUser: (user: Omit<User, 'id' | 'createdAt'>) => {
    const users = storage.getUsers();
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    users.push(newUser);
    storage.saveUsers(users);
    return newUser;
  },

  updateUser: (id: string, updates: Partial<User>) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storage.saveUsers(users);
      return users[index];
    }
    return null;
  },

  // Hotels
  getHotels: (): Hotel[] => {
    try {
      const hotels = localStorage.getItem(STORAGE_KEYS.HOTELS);
      if (!hotels) return getSampleHotels();
      return JSON.parse(hotels).map((hotel: any) => ({
        ...hotel,
        createdAt: new Date(hotel.createdAt),
      }));
    } catch {
      return getSampleHotels();
    }
  },

  saveHotels: (hotels: Hotel[]) => {
    localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotels));
  },

  addHotel: (hotel: Omit<Hotel, 'id' | 'createdAt'>) => {
    const hotels = storage.getHotels();
    const newHotel: Hotel = {
      ...hotel,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    hotels.push(newHotel);
    storage.saveHotels(hotels);
    return newHotel;
  },

  updateHotel: (id: string, updates: Partial<Hotel>) => {
    const hotels = storage.getHotels();
    const index = hotels.findIndex(h => h.id === id);
    if (index !== -1) {
      hotels[index] = { ...hotels[index], ...updates };
      storage.saveHotels(hotels);
      return hotels[index];
    }
    return null;
  },

  deleteHotel: (id: string) => {
    const hotels = storage.getHotels();
    const filtered = hotels.filter(h => h.id !== id);
    storage.saveHotels(filtered);
    return true;
  },

  // Current User
  getCurrentUser: (): User | null => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (!user) return null;
      const parsed = JSON.parse(user);
      return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
      };
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },
};

// Sample data functions
function getSampleBookings(): Booking[] {
  return [
    {
      id: "HTB123456",
      hotelId: "1",
      hotelName: "Grand Himalaya Hotel",
      location: "Thamel, Kathmandu",
      roomType: "Deluxe Room",
      checkIn: new Date("2024-03-15"),
      checkOut: new Date("2024-03-18"),
      guests: 2,
      rooms: 1,
      totalAmount: 25500,
      status: "confirmed",
      guestName: "John Doe",
      guestEmail: "john.doe@email.com",
      guestPhone: "+977-9841234567",
      image: "/src/assets/hotel-room-1.jpg",
      rating: 4.8,
      createdAt: new Date("2024-03-10"),
    },
    {
      id: "HTB123457",
      hotelId: "2",
      hotelName: "Royal Palace Resort",
      location: "Lakeside, Pokhara",
      roomType: "Executive Suite",
      checkIn: new Date("2024-02-10"),
      checkOut: new Date("2024-02-13"),
      guests: 2,
      rooms: 1,
      totalAmount: 36000,
      status: "completed",
      guestName: "John Doe",
      guestEmail: "john.doe@email.com",
      guestPhone: "+977-9841234567",
      image: "/src/assets/hotel-room-2.jpg",
      rating: 4.6,
      createdAt: new Date("2024-02-05"),
    },
    {
      id: "HTB123458",
      hotelId: "3",
      hotelName: "Mountain View Lodge",
      location: "Nagarkot, Bhaktapur",
      roomType: "Standard Room",
      checkIn: new Date("2024-04-20"),
      checkOut: new Date("2024-04-22"),
      guests: 1,
      rooms: 1,
      totalAmount: 19000,
      status: "upcoming",
      guestName: "John Doe",
      guestEmail: "john.doe@email.com",
      guestPhone: "+977-9841234567",
      image: "/src/assets/hotel-room-1.jpg",
      rating: 4.7,
      createdAt: new Date("2024-04-15"),
    }
  ];
}

function getSampleUsers(): User[] {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      profile: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+977-9841234567",
        address: "Kathmandu, Nepal"
      },
      createdAt: new Date("2023-12-15"),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@email.com",
      profile: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@email.com",
        phone: "+977-9851234567",
        address: "Pokhara, Nepal"
      },
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@email.com",
      profile: {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike@email.com",
        phone: "+977-9861234567",
        address: "Bhaktapur, Nepal"
      },
      createdAt: new Date("2024-02-20"),
    }
  ];
}

function getSampleHotels(): Hotel[] {
  return [
    {
      id: "1",
      name: "Grand Himalaya Hotel",
      location: "Thamel, Kathmandu",
      rooms: 45,
      rating: 4.8,
      status: "active",
      description: "Luxury hotel in the heart of Kathmandu",
      createdAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      name: "Royal Palace Resort",
      location: "Lakeside, Pokhara",
      rooms: 60,
      rating: 4.6,
      status: "active",
      description: "Beautiful resort by the lake",
      createdAt: new Date("2023-02-20"),
    },
    {
      id: "3",
      name: "Business Central Hotel",
      location: "New Baneshwor, Kathmandu",
      rooms: 30,
      rating: 4.4,
      status: "maintenance",
      description: "Modern business hotel",
      createdAt: new Date("2023-03-10"),
    }
  ];
}