import React, { useState, useEffect } from "react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { TimeSlot } from "../../types/booking";

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [phone, setPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const handleDateSelect = (date: Date) => {
    if (!isBefore(date, startOfToday())) {
      setSelectedDate(date);
    }
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowPhoneInput(true);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !phone) return;

    try {
      alert(
        "Thank you for your booking request! We will contact you shortly on WhatsApp to confirm your slot."
      );
      // Reset states
      setPhone("");
      setShowPhoneInput(false);
      setSelectedSlot(null);
    } catch (error) {
      alert("Failed to create booking. Please try again.");
    }
  };

  const availableSlots: TimeSlot[] = [
    "morning",
    "afternoon",
    "evening",
    "night",
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Date</h2>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => {
            const date = addDays(startOfToday(), i);
            const isSelected =
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

            return (
              <button
                key={i}
                onClick={() => handleDateSelect(date)}
                className={`p-4 rounded-lg text-center ${
                  isSelected
                    ? "bg-[#B31B1B] text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="text-sm">{format(date, "EEE")}</div>
                <div className="text-lg font-semibold">{format(date, "d")}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Available Slots
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => handleSlotSelect(slot)}
              className="p-4 rounded-lg flex flex-col items-center bg-gray-50 hover:bg-gray-100"
            >
              <Clock className="h-6 w-6 mb-2" />
              <span className="capitalize">{slot}</span>
            </button>
          ))}
        </div>
      </div>

      {showPhoneInput && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">
            Enter Your Phone Number
          </h3>
          <div className="flex gap-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter WhatsApp number"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B31B1B]"
            />
            <button
              onClick={handleBooking}
              className="px-6 py-2 bg-[#B31B1B] text-white rounded-md hover:bg-[#B31B1B]/90"
            >
              Book Now
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            You'll receive booking confirmation on this WhatsApp number
          </p>
        </div>
      )}
    </div>
  );
}
