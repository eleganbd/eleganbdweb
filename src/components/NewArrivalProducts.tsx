import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import whitePantImg from '../assets/images/pant_white_1789811810774.jpg';
import navyPantImg from '../assets/images/pant_navy_1789811850541.jpg';
import creamPantImg from '../assets/images/pant_cream_1789811869967.jpg';
import blackPantImg from '../assets/images/pant_black_1789811888427.jpg';
import olivePantImg from '../assets/images/pant_olive_1789812161315.jpg';
import greyPantImg from '../assets/images/pant_grey_1789812180201.jpg';
import { TrouserProduct, SizeNumber, HemStyle } from '../types';

export interface NewArrivalItem {
  id: string;
  category: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  colorName: string;
}

export const NEW_ARRIVAL_LIST: NewArrivalItem[] = [
  {
    id: 'new-formal-pant-white',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - White",
    price: 1049,
    originalPrice: 1399,
    image: whitePantImg,
    badge: 'NEW',
    colorName: 'Crisp White'
  },
  {
    id: 'new-formal-pant-navy',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Nevy Blue",
    price: 1049,
    originalPrice: 1399,
    image: navyPantImg,
    badge: 'NEW',
    colorName: 'Navy Blue'
  },
  {
    id: 'new-formal-pant-cream',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Cream",
    price: 1049,
    originalPrice: 1399,
    image: creamPantImg,
    badge: 'NEW',
    colorName: 'Cream Beige'
  },
  {
    id: 'new-formal-pant-black',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Black",
    price: 1049,
    originalPrice: 1399,
    image: blackPantImg,
    badge: 'NEW',
    colorName: 'Jet Black'
  },
  {
    id: 'new-formal-pant-olive',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Olive",
    price: 1049,
    originalPrice: 1399,
    image: olivePantImg,
    badge: 'NEW',
    colorName: 'Olive Green'
  },
  {
    id: 'new-formal-pant-grey',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Slate Grey",
    price: 1049,
    originalPrice: 1399,
    image: greyPantImg,
    badge: 'NEW',
    colorName: 'Slate Grey'
  }
];

interface NewArrivalProductsProps {
  products?: TrouserProduct[];
  onSelectProduct?: (product: TrouserProduct) => void;
  onQuickOrder?: (product: TrouserProduct, size: SizeNumber, hem?: HemStyle) => void;
}

export const NewArrivalProducts: React.FC<NewArrivalProductsProps> = ({ products = [], onSelectProduct }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayList = products.length > 0 ? products : [];

  if (displayList.length === 0) {
    return null;
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleItemClick = (item: NewArrivalItem) => {
    if (onSelectProduct) {
      const mappedProduct: TrouserProduct = {
        id: item.id,
        name: item.title,
        subtitle: 'New Arrival Atelier Cut',
        badge: 'New Arrival • Export Spec',
        badgeType: 'trending',
        colorName: item.colorName,
        colorHex: item.id.includes('white') ? '#f8fafc' : item.id.includes('navy') ? '#1e3a8a' : item.id.includes('cream') ? '#fef3c7' : item.id.includes('olive') ? '#3f4f38' : item.id.includes('grey') ? '#94a3b8' : '#0f172a',
        colorFamily: item.id.includes('white') ? 'offwhite' : item.id.includes('navy') ? 'navy' : item.id.includes('cream') ? 'beige' : item.id.includes('olive') ? 'olive' : item.id.includes('grey') ? 'slate' : 'obsidian',
        price: item.price,
        originalPrice: item.originalPrice,
        stockStatus: 'In Stock',
        stockNote: 'Fresh atelier batch just arrived',
        imageUrl: item.image,
        galleryImages: [item.image, navyPantImg, creamPantImg, blackPantImg, whitePantImg],
        description: `New Arrival: Premium export-grade tailored formal trousers in ${item.colorName}. Engineered with anti-wrinkle tropical bi-stretch fabric, precision waist grip, and crisp permanent front crease.`,
        fabricSpecs: [
          '68% Poly, 28% Eco Rayon, 4% High-Recovery Spandex',
          'Anti-wrinkle weave engineered for tropical humid weather',
          'Internal silicon shirt-gripper waistband to keep shirts tucked',
          'Heavy-duty YKK auto-locking brass zipper with horn button closure',
          '2-inch internal waist let-out allowance'
        ],
        availableSizes: [28, 30, 32, 34, 36, 38]
      };
      onSelectProduct(mappedProduct);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Centered Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] uppercase tracking-tight">
            NEW ARRIVAL PRODUCTS
          </h2>
        </div>

        {/* Carousel Container with floating Left/Right Arrows */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Previous products"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Next products"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1 -mx-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayList.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct?.(product)}
                className="w-[240px] sm:w-[270px] lg:w-[285px] flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      {(!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category}
                    </span>
                    <h3 className="font-bold text-[15px] text-[#0f172a] leading-snug group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-2 mt-3 pt-1">
                    <span className="text-base sm:text-[17px] font-extrabold text-[#0f172a]">
                      {product.price.toLocaleString('en-BD')}.00৳
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through font-normal">
                        {product.originalPrice.toLocaleString('en-BD')}.00৳
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
