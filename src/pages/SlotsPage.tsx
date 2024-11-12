import React from 'react';
import { BookingCalendar } from '../components/booking/BookingCalendar';

export function SlotsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Slots</h1>
          <p className="text-lg text-gray-600">Book your preferred time slot</p>
        </div>
        <BookingCalendar />
      </div>
    </div>
  );
}