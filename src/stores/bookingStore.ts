import { create } from 'zustand';
import { BookingState, TimeSlot, Booking } from '../types/booking';
import { useAuthStore } from './authStore';

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],

  createBooking: async (date: string, timeSlot: TimeSlot) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      date,
      timeSlot,
      status: 'confirmed',
    };

    set((state) => ({
      bookings: [...state.bookings, newBooking],
    }));
  },

  cancelBooking: async (bookingId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ),
    }));
  },

  getAvailableSlots: (date: string) => {
    const allSlots: TimeSlot[] = ['morning', 'afternoon', 'evening', 'night'];
    const bookedSlots = get().bookings
      .filter((b) => b.date === date && b.status === 'confirmed')
      .map((b) => b.timeSlot);

    return allSlots.filter((slot) => !bookedSlots.includes(slot));
  },
}));