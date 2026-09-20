import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Scissors, 
  Ruler, 
  Maximize2, 
  Award,
  PhoneCall
} from 'lucide-react';
import { NAVY_IMAGE } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-[#fbf9f5]" id="fabric-story">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Side with Atelier Blueprint Spec Callout */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-[#efeeea] relative border border-[#e5e2de]">
              <img 
                src={NAVY_IMAGE} 
                alt="Sartorial craft detail showing clean silhouette"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent"></div>

              {/* Atelier Spec Overlay Box */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-lg shadow-2xl border border-[#e5e2de]">
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e2de]">
                  <span className="text-[11px] font-semibold uppercase text-[#725b38] tracking-widest">
                    Internal Engineering
                  </span>
                  <span className="text-[11px] font-mono text-[#747878] font-bold">
                    SPEC-BD-2025
                  </span>
                </div>
                <ul className="pt-3 flex flex-col gap-2.5 text-xs text-[#111111]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Anti-slip shirt gripper silicon inner waistband</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Heavy-duty auto-locking brass zipper from YKK</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#725b38] shrink-0" />
                    <span>Double-piped besom back pockets with horn buttons</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Copy Side */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-[11px] uppercase text-[#725b38] tracking-[0.2em]">
                Why Elegan BD Over Elephant Road Tailors
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] leading-tight">
                An Architectural Approach to Everyday Menswear
              </h2>
              <p className="text-base text-[#444748] leading-relaxed">
                Most local trousers wrinkle after one car ride or feel rigid during prolonged office seating. Elegan BD was created to merge European luxury proportions with export-grade active performance.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-5 bg-[#f5f3ef] rounded-lg flex flex-col gap-2 border border-[#e5e2de]">
                <div className="flex items-center gap-3 text-[#725b38]">
                  <Layers className="w-5 h-5 text-[#725b38]" />
                  <span className="font-semibold text-base text-[#111111]">Export-Twill Fabric</span>
                </div>
                <p className="text-xs text-[#444748] leading-relaxed">
                  68% Poly, 28% Rayon, 4% Spandex high-density weave. Breathable, cool to the skin, completely anti-wrinkle in Dhaka heat.
                </p>
              </div>

              <div className="p-5 bg-[#f5f3ef] rounded-lg flex flex-col gap-2 border border-[#e5e2de]">
                <div className="flex items-center gap-3 text-[#725b38]">
                  <Scissors className="w-5 h-5 text-[#725b38]" />
                  <span className="font-semibold text-base text-[#111111]">Artisan Tailoring</span>
                </div>
                <p className="text-xs text-[#444748] leading-relaxed">
                  14 precision stitches per inch. Reinforced diamond crotch gusset prevents accidental blowout while climbing stairs or squatting.
                </p>
              </div>

              <div className="p-5 bg-[#f5f3ef] rounded-lg flex flex-col gap-2 border border-[#e5e2de]">
                <div className="flex items-center gap-3 text-[#725b38]">
                  <Ruler className="w-5 h-5 text-[#725b38]" />
                  <span className="font-semibold text-base text-[#111111]">The Razor Silhouette</span>
                </div>
                <p className="text-xs text-[#444748] leading-relaxed">
                  Clean mid-rise cut that sits gracefully on the waist. 14.5" to 15.5" ankle taper falls cleanly over loafers without bunching fabric.
                </p>
              </div>

              <div className="p-5 bg-[#f5f3ef] rounded-lg flex flex-col gap-2 border border-[#e5e2de]">
                <div className="flex items-center gap-3 text-[#725b38]">
                  <Maximize2 className="w-5 h-5 text-[#725b38]" />
                  <span className="font-semibold text-base text-[#111111]">Bi-Stretch Freedom</span>
                </div>
                <p className="text-xs text-[#444748] leading-relaxed">
                  4-way mechanical recovery ensures your trouser regains razor-sharp knee creases instantly after long flights or office sessions.
                </p>
              </div>

            </div>

            {/* Bottom Quality Guarantee */}
            <div className="p-4 bg-[#fedeb2]/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#fedeb2]">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#725b38] shrink-0" />
                <span className="text-xs font-semibold text-[#111111]">
                  100% Quality Inspected at our Gulshan Atelier
                </span>
              </div>
              <a 
                href="tel:+8801700ELEGAN" 
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase text-[#725b38] hover:text-[#111111] tracking-wider transition-colors shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Speak with Tailor</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
