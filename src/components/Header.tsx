import React from 'react';
import { Music2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Slots', path: '/slots' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Music2 className="h-8 w-8 text-[#B31B1B]" />
            <span className="ml-2 text-xl font-bold text-gray-900">Ameyaa Social</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-[#B31B1B] px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="px-4 py-2 text-sm font-medium text-white bg-[#B31B1B] rounded-md hover:bg-[#B31B1B]/90 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#B31B1B] transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-white bg-[#B31B1B] rounded-md hover:bg-[#B31B1B]/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}