import { db } from '../db/index';
import { Booking, TimeSlot } from '../types/booking';
import { whatsappService } from './whatsappService';
import { authService } from './authService';

export const bookingService = {
  async createBooking(userId: string, date: string, timeSlot: TimeSlot, phone: string): Promise<Booking> {
    // Check if slot is available
    const existingBookings = await db.bookings
      .where(['date', 'timeSlot'])
      .equals([date, timeSlot])
      .and(booking => booking.status === 'confirmed')
      .toArray();

    if (existingBookings.length > 0) {
      throw new Error('Slot already booked');
    }

    // Get user details
    const user = await db.users.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const booking = {
      userId,
      date,
      timeSlot,
      status: 'pending' as const,
      phone,
      userName: user.name,
      adminConfirmed: false
    };

    const bookingId = await db.createBooking(booking);

    // Send WhatsApp notification to admin
    await whatsappService.sendBookingNotification({
      userName: user.name,
      userId,
      phone,
      date,
      timeSlot
    });

    return {
      id: bookingId,
      ...booking
    };
  },

  async getUserBookings(userId: string): Promise<Booking[]> {
    return await db.getUserBookings(userId);
  },

  async cancelBooking(bookingId: string): Promise<void> {
    await db.updateBookingStatus(bookingId, 'cancelled');
  },

  async confirmBooking(bookingId: string): Promise<void> {
    const booking = await db.bookings.get(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    await db.bookings.update(bookingId, {
      status: 'confirmed',
      adminConfirmed: true
    });

    // Send confirmation WhatsApp message to user
    await whatsappService.sendBookingConfirmation({
      userName: booking.userName,
      phone: booking.phone,
      date: booking.date,
      timeSlot: booking.timeSlot
    });
  },

  async getAvailableSlots(date: string): Promise<TimeSlot[]> {
    const allSlots: TimeSlot[] = ['morning', 'afternoon', 'evening', 'night'];
    const bookedSlots = await db.bookings
      .where('date')
      .equals(date)
      .and(booking => booking.status === 'confirmed')
      .toArray();

    const bookedSlotTimes = bookedSlots.map(booking => booking.timeSlot);
    return allSlots.filter(slot => !bookedSlotTimes.includes(slot));
  }
};