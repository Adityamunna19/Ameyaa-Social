import React from 'react';
import { Music2, Twitter, Youtube, Facebook, Github, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <Music2 className="h-8 w-8 text-[#FFC40C]" />
              <span className="ml-2 text-xl font-bold text-white">Ameyaa Social</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#FFC40C]">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://youtube.com/@ameyaasocial" className="text-gray-400 hover:text-[#FFC40C]" target='_blank'>
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FFC40C]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://wa.me/+919704136398" className="text-gray-400 hover:text-[#FFC40C]" target='_blank'>
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Contact Information</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li className="flex items-center text-gray-300">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>contact@ameyaasocial.com</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Manikonda,Hyderabad</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Quick Links</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <a href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Ameyaa Social. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}