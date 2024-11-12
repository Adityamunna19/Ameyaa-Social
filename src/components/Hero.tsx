import React from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  const scrollToContact = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Your
            <span className="relative whitespace-nowrap text-[#B31B1B]">
              <span className="relative"> Music Studio </span>
            </span>
            Booking Made Simple
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            "Music is the universal language of mankind" - Henry Wadsworth Longfellow
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <button
              onClick={() => navigate('/auth')}
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#B31B1B] text-white hover:bg-[#B31B1B]/90 active:bg-[#B31B1B]/90 focus-visible:outline-[#B31B1B]"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Your Slot
            </button>
            <button
              onClick={scrollToContact}
              className="group inline-flex ring-1 ring-slate-200 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-[#B31B1B] focus-visible:ring-slate-300"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#B31B1B] to-[#FFC40C] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}