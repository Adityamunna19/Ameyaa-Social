import React, { useState } from 'react';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useBookingStore } from '../../stores/bookingStore';
import { TimeSlot } from '../../types/booking';
import { useAuthStore } from '../../stores/authStore';
import { AuthModal } from '../auth/AuthModal';

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { getAvailableSlots, createBooking } = useBookingStore();

  const availableSlots = getAvailableSlots(format(selectedDate, 'yyyy-MM-dd'));

  const handleDateSelect = (date: Date) => {
    if (!isBefore(date, startOfToday())) {
      setSelectedDate(date);
    }
  };

  const handleSlotSelect = async (slot: TimeSlot) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      await createBooking(format(selectedDate, 'yyyy-MM-dd'), slot);
      alert('Booking confirmed!');
    } catch (error) {
      alert('Failed to create booking');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Date</h2>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => {
            const date = addDays(startOfToday(), i);
            const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            
            return (
              <button
                key={i}
                onClick={() => handleDateSelect(date)}
                className={`p-4 rounded-lg text-center ${
                  isSelected
                    ? 'bg-[#B31B1B] text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-sm">{format(date, 'EEE')}</div>
                <div className="text-lg font-semibold">{format(date, 'd')}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Slots</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['morning', 'afternoon', 'evening', 'night'] as TimeSlot[]).map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            
            return (
              <button
                key={slot}
                onClick={() => isAvailable && handleSlotSelect(slot)}
                disabled={!isAvailable}
                className={`p-4 rounded-lg flex flex-col items-center ${
                  isAvailable
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : 'bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <Clock className="h-6 w-6 mb-2" />
                <span className="capitalize">{slot}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}