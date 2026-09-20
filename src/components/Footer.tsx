import React from 'react';
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenTrackOrder: () => void;
  onFilterChange: (filter: string) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrackOrder, onFilterChange, onOpenAdminLogin }) => {
  return (
    <footer className="w-full bg-[#0c0e12] text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Box System as shown in the picture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Box 1: Brand Info & Socials */}
          <div className="bg-[#151821] border border-white/5 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Brand Name */}
              <div className="flex items-center">
                <span className="font-sans text-lg font-black tracking-tight uppercase text-white">
                  ELEGAN BD
                </span>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-[13px] text-gray-400 leading-relaxed mt-5">
                Premium formal wear for the modern gentleman. Crafted with precision, designed for elegance.
              </p>
            </div>

            {/* Social & Call Icons */}
            <div className="flex items-center gap-3 mt-6 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-gray-700/80 hover:border-gray-500 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-gray-700/80 hover:border-gray-500 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="tel:+8801327772213" 
                aria-label="Call"
                className="w-9 h-9 rounded-full border border-gray-700/80 hover:border-gray-500 bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Box 2: Quick Links */}
          <div className="bg-[#151821] border border-white/5 rounded-2xl p-6 sm:p-7 flex flex-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white mb-5">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col space-y-3.5 text-xs sm:text-[13px] text-gray-400">
              <li>
                <button 
                  onClick={() => onFilterChange('all')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onFilterChange('all')}
                  className="hover:text-white transition-colors text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <a 
                  href="#size-matrix" 
                  className="hover:text-white transition-colors block"
                >
                  Returns &amp; Exchange
                </a>
              </li>
              {onOpenAdminLogin && (
                <li className="pt-1">
                  <button 
                    onClick={onOpenAdminLogin}
                    className="text-[#fedeb2] hover:text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🔒 Admin Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Box 3: Customer Care */}
          <div className="bg-[#151821] border border-white/5 rounded-2xl p-6 sm:p-7 flex flex-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white mb-5">
              CUSTOMER CARE
            </h4>
            <ul className="flex flex-col space-y-3.5 text-xs sm:text-[13px] text-gray-400">
              <li>
                <button 
                  onClick={onOpenTrackOrder}
                  className="text-white font-medium hover:text-[#fedeb2] transition-colors text-left"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-white transition-colors block">
                  About Elegan BD
                </a>
              </li>
              <li>
                <a href="tel:+8801327772213" className="hover:text-white transition-colors block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#size-matrix" className="hover:text-white transition-colors block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#size-matrix" className="hover:text-white transition-colors block">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Box 4: Contact Info */}
          <div className="bg-[#151821] border border-white/5 rounded-2xl p-6 sm:p-7 flex flex-col">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-white mb-5">
              CONTACT INFO
            </h4>
            <div className="flex flex-col space-y-4">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    ADDRESS
                  </span>
                  <span className="text-xs text-gray-200 font-medium leading-snug mt-0.5">
                    Ma Villa, House #11, Road #3, Block F, Section #1, Mirpur, Dhaka-1216
                  </span>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    EMAIL US
                  </span>
                  <a 
                    href="mailto:eleganbdltd@gmail.com" 
                    className="text-xs text-gray-200 font-medium hover:text-white transition-colors mt-0.5"
                  >
                    eleganbdltd@gmail.com
                  </a>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-gray-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    CALL US
                  </span>
                  <a 
                    href="tel:+8801327772213" 
                    className="text-xs text-gray-200 font-medium hover:text-white transition-colors mt-0.5"
                  >
                    +8801327772213
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
