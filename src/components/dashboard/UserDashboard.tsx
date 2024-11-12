import React, { useState } from 'react';
import { Calendar, Clock, X, Download, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import { csvAuth } from '../../services/csvAuth';
import { AdminDashboard } from './AdminDashboard';
import { BookingCalendar } from '../booking/BookingCalendar';

export function UserDashboard() {
  const { user } = useAuthStore();
  const { bookings, cancelBooking } = useBookingStore();
  const [showNewBooking, setShowNewBooking] = useState(false);

  // If user is admin, show admin dashboard
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  const userBookings = bookings.filter(booking => booking.userId === user?.id);
  const activeBookings = userBookings.filter(booking => booking.status !== 'cancelled');
  const pastBookings = userBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < new Date() || booking.status === 'cancelled';
  });

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      alert('Booking cancelled successfully');
    } catch (error) {
      alert('Failed to cancel booking');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h2>
            <p className="text-gray-600">Manage your bookings</p>
          </div>
          <button
            onClick={() => setShowNewBooking(!showNewBooking)}
            className="flex items-center px-4 py-2 bg-[#B31B1B] text-white rounded-md hover:bg-[#B31B1B]/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Booking
          </button>
        </div>

        {showNewBooking ? (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Book New Session</h3>
            <BookingCalendar />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Bookings */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Bookings</h3>
              {activeBookings.length === 0 ? (
                <p className="text-gray-600">No active bookings</p>
              ) : (
                <div className="grid gap-4">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-6 w-6 text-[#B31B1B]" />
                        <div>
                          <p className="font-semibold">
                            {format(new Date(booking.date), 'MMMM d, yyyy')}
                          </p>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="capitalize">{booking.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Past Bookings</h3>
              {pastBookings.length === 0 ? (
                <p className="text-gray-600">No past bookings</p>
              ) : (
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-6 w-6 text-gray-400" />
                        <div>
                          <p className="font-semibold text-gray-600">
                            {format(new Date(booking.date), 'MMMM d, yyyy')}
                          </p>
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="capitalize">{booking.timeSlot}</span>
                            {booking.status === 'cancelled' && (
                              <span className="ml-2 text-red-500">(Cancelled)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}