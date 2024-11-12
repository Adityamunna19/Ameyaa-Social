import React from 'react';
import { Music } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ameyaa Social</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your premier destination for professional music recording and practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, Ameyaa Social has been at the forefront of providing
              exceptional music studio services to artists of all levels.
            </p>
            <p className="text-gray-600 mb-4">
              Our state-of-the-art facilities and professional-grade equipment ensure
              that every session delivers outstanding results.
            </p>
            <div className="flex items-center mt-8">
              <Music className="h-12 w-12 text-[#B31B1B] mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Professional Equipment</h3>
                <p className="text-gray-600">Industry-standard recording gear</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Recording Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}