import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Reviews } from '../components/Reviews';
import { BookingCalendar } from '../components/booking/BookingCalendar';

export function HomePage() {
  return (
    <>
      <Hero />
      <section id="booking" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Book Your Session</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose your preferred date and time slot
            </p>
          </div>
          <BookingCalendar />
        </div>
      </section>
      <Features />
      <Reviews />
    </>
  );
}