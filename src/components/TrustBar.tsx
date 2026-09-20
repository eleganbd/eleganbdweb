import React from 'react';
import { Truck, ShieldCheck, ArrowLeftRight, Headphones } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="w-full py-3 sm:py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl sm:rounded-3xl shadow-xs p-4 sm:p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
          
          {/* 1. Cash On Delivery */}
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] sm:text-[15px] font-bold text-[#0f172a] leading-tight">
                Cash On Delivery
              </span>
              <span className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 font-normal leading-snug">
                Check before you pay
              </span>
            </div>
          </div>

          {/* 2. 100% Premium Fabric */}
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb] flex items-center justify-center text-white shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] sm:text-[15px] font-bold text-[#0f172a] leading-tight">
                100% Premium Fabric
              </span>
              <span className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 font-normal leading-snug">
                Quality Guaranteed
              </span>
            </div>
          </div>

          {/* 3. Easy Exchange */}
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb] flex items-center justify-center text-white shrink-0 shadow-xs">
              <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] sm:text-[15px] font-bold text-[#0f172a] leading-tight">
                Easy Exchange
              </span>
              <span className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 font-normal leading-snug">
                Free size change in 7 days
              </span>
            </div>
          </div>

          {/* 4. 24/7 Support */}
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2563eb] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Headphones className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] sm:text-[15px] font-bold text-[#0f172a] leading-tight">
                24/7 Support
              </span>
              <span className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 font-normal leading-snug">
                Instant help via call or message
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
