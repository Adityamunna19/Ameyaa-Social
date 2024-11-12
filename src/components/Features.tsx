import React from 'react';
import { Calendar, Shield, Zap, Music } from 'lucide-react';

const features = [
  {
    name: 'Easy Booking',
    description: 'Book your studio sessions with just a few clicks',
    icon: Calendar,
  },
  {
    name: 'Fast and Reliable',
    description: 'Quick confirmation and hassle-free experience',
    icon: Zap,
  },
  {
    name: 'Secure Bookings',
    description: 'Your bookings are protected and guaranteed',
    icon: Shield,
  },
  {
    name: 'Professional Setup',
    description: 'State-of-the-art equipment and acoustics',
    icon: Music,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#B31B1B]">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for your music
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-[#FFC40C]/10">
                  <feature.icon className="h-8 w-8 text-[#B31B1B]" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}