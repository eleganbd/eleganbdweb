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
  const rawDesktop = banner?.imageUrl?.trim();
  const rawMobile = banner?.mobileImageUrl?.trim();

  const desktopBannerUrl = rawDesktop || HERO_IMAGE;
  const mobileBannerUrl = rawMobile || rawDesktop || HERO_IMAGE;

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
      className="relative w-full overflow-hidden bg-[#0f172a] cursor-pointer select-none shadow-sm"
      onClick={onExploreCollection}
    >
      {/* 💻 Desktop Banner Container (1920 × 700 px Aspect Ratio) */}
      <div className="hidden md:block w-full aspect-[1920/700] relative overflow-hidden bg-[#0f172a]">
        <img 
          key={desktopSrc}
          src={desktopSrc} 
          alt="Elegan BD Luxury Formal Pants - Desktop Banner" 
          onError={() => {
            if (desktopSrc !== HERO_IMAGE) {
              setDesktopSrc(HERO_IMAGE);
            }
          }}
          className="w-full h-full object-cover object-center block"
        />
      </div>

      {/* 📱 Mobile Hero Banner Container (800 × 900 px Aspect Ratio) */}
      <div className="block md:hidden w-full aspect-[800/900] relative overflow-hidden bg-[#0f172a]">
        <img 
          key={mobileSrc}
          src={mobileSrc} 
          alt="Elegan BD Luxury Formal Pants - Mobile Banner" 
          onError={() => {
            if (mobileSrc !== desktopSrc && desktopSrc !== HERO_IMAGE) {
              setMobileSrc(desktopSrc);
            } else if (mobileSrc !== HERO_IMAGE) {
              setMobileSrc(HERO_IMAGE);
            }
          }}
          className="w-full h-full object-cover object-center block"
        />
      </div>
    </section>
  );
};


