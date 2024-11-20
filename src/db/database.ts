import Dexie, { Table } from 'dexie';
import { User } from '../types/auth';
import { Booking } from '../types/booking';

export class AppDatabase extends Dexie {
  users!: Table<User & { password: string }>;
  bookings!: Table<Booking>;

  constructor() {
    super('ameyaaSocialDB');
    
    this.version(1).stores({
      users: '++id, email, name, role',
      bookings: '++id, userId, date, timeSlot, status, phone, userName, adminConfirmed'
    });
  }

  async findUserByEmail(email: string): Promise<(User & { password: string }) | undefined> {
    return await this.users.where('email').equals(email).first();
  }

  async createUser(user: User & { password: string }): Promise<string> {
    const id = await this.users.add(user);
    return id.toString();
  }

  async createBooking(booking: Omit<Booking, 'id'>): Promise<string> {
    const id = await this.bookings.add(booking as Booking);
    return id.toString();
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return await this.bookings.where('userId').equals(userId).toArray();
  }

  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
    await this.bookings.update(bookingId, { status });
  }

  async exportData(): Promise<{ users: any[], bookings: any[] }> {
    const users = await this.users.toArray();
    const bookings = await this.bookings.toArray();
    return { users, bookings };
  }

  async importData(data: { users: any[], bookings: any[] }): Promise<void> {
    await this.transaction('rw', this.users, this.bookings, async () => {
      await this.users.clear();
      await this.bookings.clear();
      await this.users.bulkAdd(data.users);
      await this.bookings.bulkAdd(data.bookings);
    });
  }
}