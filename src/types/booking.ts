export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export interface Booking {
  id: string;
  userId: string;
  date: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'cancelled';
  phone: string;
  userName: string;
  adminConfirmed?: boolean;
}

export interface BookingState {
  bookings: Booking[];
  createBooking: (date: string, timeSlot: TimeSlot, phone: string) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  getAvailableSlots: (date: string) => Promise<TimeSlot[]>;
  confirmBooking?: (bookingId: string) => Promise<void>;
}