import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import formalPantImg from '../assets/images/category_formal_pant_1789811562881.jpg';
import solidShirtImg from '../assets/images/category_solid_shirt_1789811576240.jpg';
import blazerImg from '../assets/images/category_blazer_1789811594948.jpg';
import poloImg from '../assets/images/category_polo_1789811614458.jpg';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  linkText: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'formal-pant',
    name: 'FORMAL PANT',
    image: formalPantImg,
    linkText: 'EXPLORE'
  },
  {
    id: 'solid-shirt',
    name: 'SOLID SHIRT',
    image: solidShirtImg,
    linkText: 'EXPLORE'
  },
  {
    id: 'tailored-blazer',
    name: 'TAILORED BLAZER',
    image: blazerImg,
    linkText: 'EXPLORE'
  },
  {
    id: 'knit-polo',
    name: 'KNIT POLO',
    image: poloImg,
    linkText: 'EXPLORE'
  },
  {
    id: 'chinos-trousers',
    name: 'CHINOS & TROUSERS',
    image: formalPantImg,
    linkText: 'EXPLORE'
  }
];

interface ShopByCategoryProps {
  categories?: import('../types').CategoryItem[];
  onSelectCategory?: (categoryId: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ categories = [], onSelectCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const displayCategories = categories.length > 0 
    ? categories.map(c => ({
        id: c.slug || c.id,
        name: c.name,
        image: c.imageUrl || formalPantImg,
        linkText: 'EXPLORE'
      }))
    : CATEGORIES;

  // Auto Side Scroll Effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Advance by approx one card width (responsive)
        const scrollStep = container.clientWidth < 640 ? container.clientWidth / 2 + 6 : 280;

        if (container.scrollLeft + scrollStep >= maxScroll - 10) {
          // Reset to start smoothly
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth < 640 
        ? (direction === 'left' ? -(container.clientWidth / 2 + 6) : (container.clientWidth / 2 + 6))
        : (direction === 'left' ? -320 : 320);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-8 sm:py-14 border-b border-gray-100 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header with Title Centered and Navigation Buttons on the Right */}
        <div className="relative flex items-center justify-between mb-5 sm:mb-10">
          
          {/* Spacer on the left for balance */}
          <div className="hidden sm:block w-20" aria-hidden="true" />

          {/* Centered Heading */}
          <div className="flex-1 text-center">
            <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#0f172a] uppercase tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>

          {/* Arrow Buttons on the Far Right */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous categories"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 hover:border-gray-500 bg-white flex items-center justify-center text-gray-700 hover:text-black transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next categories"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 hover:border-gray-500 bg-white flex items-center justify-center text-gray-700 hover:text-black transition-colors shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Scrollable Category Cards Carousel (2 items on mobile, auto-scrolling) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Resume after 2 seconds
            setTimeout(() => setIsPaused(false), 2000);
          }}
          className="flex items-center gap-2.5 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-0.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory?.(category.id)}
              className="group relative flex-shrink-0 w-[calc(50%-5px)] sm:w-[260px] md:w-[280px] lg:w-[290px] h-[230px] sm:h-[380px] md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 bg-gray-100"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-6 text-white flex flex-col justify-end">
                <h3 className="font-sans font-black text-xs sm:text-xl tracking-wide uppercase text-white drop-shadow-sm leading-tight">
                  {category.name}
                </h3>
                
                <div className="flex items-center gap-1 text-[9px] sm:text-xs font-bold tracking-widest text-white/90 uppercase mt-0.5 sm:mt-1 group-hover:text-white group-hover:translate-x-1 transition-all">
                  <span>{category.linkText}</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
