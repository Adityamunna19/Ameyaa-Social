import { create } from 'zustand';
import { BookingState, TimeSlot, Booking } from '../types/booking';
import { bookingService } from '../services/bookingService';
import { useAuthStore } from './authStore';

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],

  createBooking: async (date: string, timeSlot: TimeSlot) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    const booking = await bookingService.createBooking(user.id, date, timeSlot);
    set((state) => ({
      bookings: [...state.bookings, booking],
    }));
  },

  cancelBooking: async (bookingId: string) => {
    await bookingService.cancelBooking(bookingId);
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      ),
    }));
  },

  getAvailableSlots: async (date: string) => {
    return await bookingService.getAvailableSlots(date);
  },
}));