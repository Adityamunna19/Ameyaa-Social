import React, { useState, useEffect } from 'react';
import { Download, Database, Check, X } from 'lucide-react';
import { csvAuth } from '../../services/csvAuth';
import { DataView } from './DataView';
import { db } from '../../db';
import { bookingService } from '../../services/bookingService';
import { Booking } from '../../types/booking';
import { format } from 'date-fns';

export function AdminDashboard() {
  const [showDataView, setShowDataView] = useState(true);
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchPendingBookings = async () => {
      const bookings = await db.bookings
        .where('status')
        .equals('pending')
        .toArray();
      setPendingBookings(bookings);
    };
    fetchPendingBookings();
  }, []);

  const handleDownloadUsers = () => {
    csvAuth.downloadCsv();
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      await bookingService.confirmBooking(bookingId);
      setPendingBookings(pendingBookings.filter(booking => booking.id !== bookingId));
      alert('Booking confirmed successfully');
    } catch (error) {
      alert('Failed to confirm booking');
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      setPendingBookings(pendingBookings.filter(booking => booking.id !== bookingId));
      alert('Booking rejected successfully');
    } catch (error) {
      alert('Failed to reject booking');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600">Manage users and view system data</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowDataView(!showDataView)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Database className="h-5 w-5 mr-2" />
              {showDataView ? 'Hide Data' : 'View Data'}
            </button>
            <button
              onClick={handleDownloadUsers}
              className="flex items-center px-4 py-2 bg-[#B31B1B] text-white rounded-md hover:bg-[#B31B1B]/90 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download CSV
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Pending Bookings</h3>
          {pendingBookings.length === 0 ? (
            <p className="text-gray-600">No pending bookings</p>
          ) : (
            <div className="grid gap-4">
              {pendingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold">{booking.userName}</p>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{format(new Date(booking.date), 'MMMM d, yyyy')}</p>
                        <p className="capitalize">{booking.timeSlot}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirmBooking(booking.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRejectBooking(booking.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showDataView && <DataView />}
      </div>
    </div>
  );
}