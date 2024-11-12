export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Booking {
  id: string;
  userId: string;
  date: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BookingState {
  bookings: Booking[];
  createBooking: (date: string, timeSlot: TimeSlot) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  getAvailableSlots: (date: string) => TimeSlot[];
}