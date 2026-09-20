import React from 'react';
import { DollarSign, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export const ValuePillars: React.FC = () => {
  return (
    <section className="w-full bg-[#f5f3ef] py-12 border-b border-[#e5e2de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 border border-[#e5e2de]">
            <div className="w-10 h-10 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#78603e] mb-1">
              <DollarSign className="w-5 h-5 text-[#78603e]" />
            </div>
            <h3 className="font-semibold text-base text-[#111111] tracking-wide">Full Cash On Delivery</h3>
            <p className="text-xs text-[#444748] leading-relaxed">
              Pay safely only after unboxing and feeling the fabric texture. Nationwide availability across all 64 districts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 border border-[#e5e2de]">
            <div className="w-10 h-10 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#78603e] mb-1">
              <ShieldCheck className="w-5 h-5 text-[#78603e]" />
            </div>
            <h3 className="font-semibold text-base text-[#111111] tracking-wide">No Advance Payment</h3>
            <p className="text-xs text-[#444748] leading-relaxed">
              No bKash fee, no credit card or advance security deposit requested. We believe in sartorial trust and customer honor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 border border-[#e5e2de]">
            <div className="w-10 h-10 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#78603e] mb-1">
              <RefreshCw className="w-5 h-5 text-[#78603e]" />
            </div>
            <h3 className="font-semibold text-base text-[#111111] tracking-wide">Hassle-Free Exchange</h3>
            <p className="text-xs text-[#444748] leading-relaxed">
              Need a 32 instead of 30? Our delivery partner comes right to your door with the new size and takes the return instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 border border-[#e5e2de]">
            <div className="w-10 h-10 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#78603e] mb-1">
              <Truck className="w-5 h-5 text-[#78603e]" />
            </div>
            <h3 className="font-semibold text-base text-[#111111] tracking-wide">Express Dispatch</h3>
            <p className="text-xs text-[#444748] leading-relaxed">
              Dhaka Metropol: 24–48 hours (৳70 flat rate). Outside Dhaka Divisions: 48–72 hours (৳130 flat rate).
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
