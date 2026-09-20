import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLOR_CAPSULES } from '../data/products';

interface ColorCapsuleSectionProps {
  onSelectPalette: (familyId: string) => void;
}

export const ColorCapsuleSection: React.FC<ColorCapsuleSectionProps> = ({ onSelectPalette }) => {
  return (
    <section className="w-full py-20 bg-[#f5f3ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-semibold text-[11px] uppercase text-[#725b38] tracking-[0.2em]">
              Sartorial Tonal Edit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] mt-1">
              Shop By Color Capsule
            </h2>
          </div>
          <p className="text-sm text-[#444748] max-w-md leading-relaxed">
            Curated tone palettes designed to effortlessly pair with your crisp poplin shirts, blazers, and luxury knitwear.
          </p>
        </div>

        {/* 4 Color Palette Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLOR_CAPSULES.map((capsule) => (
            <div
              key={capsule.id}
              onClick={() => onSelectPalette(capsule.id)}
              className="group relative h-96 rounded-lg overflow-hidden bg-[#111111] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6 cursor-pointer border border-[#e5e2de]"
            >
              {/* Background with Dark Subtle Gradient */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={capsule.image} 
                  alt={capsule.name} 
                  className="w-full h-full object-cover object-center opacity-70 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent"></div>
              </div>

              {/* Capsule Content */}
              <div className="relative z-10 flex flex-col gap-2 text-white">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3.5 h-3.5 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: capsule.swatch }}
                  ></span>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#fedeb2]">
                    {capsule.count}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-white">
                  {capsule.name}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {capsule.description}
                </p>

                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#fedeb2] uppercase tracking-widest pt-2 group-hover:translate-x-1.5 transition-transform">
                  <span>Explore Palette</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
