import React from "react";
import { Check } from "lucide-react";
import { BookingCalendar } from "../components/booking/BookingCalendar";

const plans = [
  {
    name: "Basic",
    price: "₹999",
    duration: "per session",
    features: [
      "2-hour session",
      "Basic equipment access",
      "Single room usage",
      "Basic mixing support",
    ],
  },
  {
    name: "Pro",
    price: "₹1,999",
    duration: "per session",
    features: [
      "4-hour session",
      "Premium equipment access",
      "Multiple room access",
      "Professional mixing support",
      "Basic mastering",
    ],
  },
  {
    name: "Premium",
    price: "₹3,999",
    duration: "per session",
    features: [
      "8-hour session",
      "All equipment access",
      "Full studio access",
      "Professional mixing & mastering",
      "Video recording",
      "Digital distribution support",
    ],
  },
];

export function PricingPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-4">
                  <span className="text-4xl font-bold text-[#B31B1B]">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">{plan.duration}</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-[#B31B1B] mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Book Your Session Now
          </h2>
          <BookingCalendar />
        </div>
      </div>
    </div>
  );
}
