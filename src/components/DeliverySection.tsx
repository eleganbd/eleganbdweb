import React from 'react';
import { Truck, Check } from 'lucide-react';

export const DeliverySection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#f5f3ef] border-t border-[#e5e2de]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-2 max-w-2xl mx-auto">
          <span className="font-semibold text-[11px] uppercase text-[#725b38] tracking-[0.2em]">
            Nationwide Logistics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111]">
            Delivery Transparency
          </h2>
          <p className="text-sm text-[#444748] leading-relaxed">
            Honest flat-rate shipping across all 64 districts of Bangladesh. Zero hidden charges, zero advance payments.
          </p>
        </div>

        {/* 2 Delivery Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inside Dhaka */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-[#e5e2de] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#f5f3ef]">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#725b38]" />
                  <h3 className="font-bold text-lg text-[#111111]">Inside Dhaka</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#111111]">৳ 70</span>
                  <span className="text-xs text-[#747878] block">Flat Rate</span>
                </div>
              </div>

              <div className="py-4">
                <span className="inline-block px-3 py-1 bg-[#fedeb2]/40 text-[#78603e] rounded font-semibold text-xs uppercase tracking-wider mb-3">
                  24–48 Hours Delivery
                </span>
                <ul className="flex flex-col gap-2.5 text-xs text-[#444748]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Delivered to your door via our dedicated atelier courier team</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Full inspection permitted before cash payment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Gulshan, Banani, Dhanmondi, Uttara, Mirpur, Motijheel & all metro zones</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f5f3ef] text-[11px] text-[#747878] flex items-center justify-between">
              <span>Same-day dispatch for orders before 2:00 PM</span>
              <span className="font-semibold text-[#111111]">Cash On Delivery</span>
            </div>
          </div>

          {/* Outside Dhaka */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-[#e5e2de] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#f5f3ef]">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#725b38]" />
                  <h3 className="font-bold text-lg text-[#111111]">Outside Dhaka (64 Districts)</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#111111]">৳ 130</span>
                  <span className="text-xs text-[#747878] block">Flat Rate</span>
                </div>
              </div>

              <div className="py-4">
                <span className="inline-block px-3 py-1 bg-[#fedeb2]/40 text-[#78603e] rounded font-semibold text-xs uppercase tracking-wider mb-3">
                  48–72 Hours Express
                </span>
                <ul className="flex flex-col gap-2.5 text-xs text-[#444748]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Express air & road courier via Steadfast / Paperfly logistics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Open parcel and test fabric prior to paying courier in cash</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Chittagong, Sylhet, Rajshahi, Khulna, Barisal, Rangpur & all upazilas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f5f3ef] text-[11px] text-[#747878] flex items-center justify-between">
              <span>Includes SMS tracking link upon dispatch</span>
              <span className="font-semibold text-[#111111]">Cash On Delivery</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
