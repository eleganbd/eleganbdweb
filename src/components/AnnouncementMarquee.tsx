import React from 'react';

export const AnnouncementMarquee: React.FC = () => {
  const marqueeItems = [
    "VISIT US: MA VILLA, HOUSE #11, ROAD #3, BLOCK F, SECTION #1, MIRPUR, DHAKA-1216",
    "24/7 SUPPORT : INSTANT HELP VIA CALL OR MESSAGE (+8801327772213)",
    "EXPORT QUALITY PREMIUM FORMAL PANT",
    "100% QUALITY GUARANTEED & EASY 7-DAY EXCHANGE",
    "CASH ON DELIVERY ALL OVER BANGLADESH"
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 overflow-hidden py-2.5 select-none relative z-10 shadow-xs">
      <div className="flex animate-marquee whitespace-nowrap items-center text-xs sm:text-[13px] font-bold text-gray-900 tracking-wider uppercase">
        {/* Set 1 */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`marquee-1-${idx}`}>
              <span className="hover:text-blue-600 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-gray-400 font-black">•</span>
            </React.Fragment>
          ))}
        </div>

        {/* Set 2 (Duplicated for seamless loop) */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`marquee-2-${idx}`}>
              <span className="hover:text-blue-600 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-gray-400 font-black">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
