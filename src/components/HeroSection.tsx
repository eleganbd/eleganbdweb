import React, { useState, useEffect } from 'react';
import { HERO_IMAGE } from '../data/products';
import { CMSBanner } from '../types';

interface HeroSectionProps {
  banner?: CMSBanner;
  onExploreCollection?: () => void;
  onExploreFitMatrix?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  banner,
  onExploreCollection
}) => {
  const desktopBannerUrl = banner?.imageUrl?.trim() || HERO_IMAGE;
  const mobileBannerUrl = banner?.mobileImageUrl?.trim() || desktopBannerUrl;

  const [desktopSrc, setDesktopSrc] = useState<string>(desktopBannerUrl);
  const [mobileSrc, setMobileSrc] = useState<string>(mobileBannerUrl);

  // Sync when banner props change from admin panel
  useEffect(() => {
    const dUrl = banner?.imageUrl?.trim() || HERO_IMAGE;
    const mUrl = banner?.mobileImageUrl?.trim() || dUrl;
    setDesktopSrc(dUrl);
    setMobileSrc(mUrl);
  }, [banner?.imageUrl, banner?.mobileImageUrl]);

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#111111] cursor-default select-none shadow-xs"
    >
      {/* 💻 Desktop Banner Container (Displays full wide banner crisply, locked & no zoom) */}
      <div className="hidden md:block w-full max-h-[700px] relative overflow-hidden bg-[#111111] pointer-events-none">
        <img 
          src={desktopSrc} 
          alt={banner?.headline || "Elegan BD Luxury Formal Pants - Desktop Banner"} 
          onError={() => setDesktopSrc(HERO_IMAGE)}
          referrerPolicy="no-referrer"
          className="w-full h-auto max-h-[700px] object-cover object-center mx-auto block"
        />
      </div>

      {/* 📱 Mobile Hero Banner Container (100% full width, uncropped, locked & no zoom) */}
      <div className="block md:hidden w-full relative overflow-hidden bg-[#111111] pointer-events-none">
        <img 
          src={mobileSrc} 
          alt={banner?.headline || "Elegan BD Luxury Formal Pants - Mobile Banner"} 
          onError={() => {
            if (mobileSrc !== desktopSrc) {
              setMobileSrc(desktopSrc);
            } else {
              setMobileSrc(HERO_IMAGE);
            }
          }}
          referrerPolicy="no-referrer"
          className="w-full h-auto block object-contain object-center mx-auto"
        />
      </div>
    </section>
  );
};
