import React from 'react';
import blackPantImg from '../assets/images/pant_black_1789811888427.jpg';
import whitePantImg from '../assets/images/pant_white_1789811810774.jpg';
import creamPantImg from '../assets/images/pant_cream_1789811869967.jpg';
import navyPantImg from '../assets/images/pant_navy_1789811850541.jpg';
import { TrouserProduct, SizeNumber, HemStyle } from '../types';
import { HERO_IMAGE } from '../data/products';

export interface CollectionItem {
  id: string;
  category: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  colorName: string;
  colorHex: string;
  colorFamily: 'obsidian' | 'navy' | 'beige' | 'offwhite';
}

export const ALL_COLLECTIONS_LIST: CollectionItem[] = [
  {
    id: 'collection-pant-black',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Black",
    price: 1050,
    originalPrice: 1399,
    image: blackPantImg,
    colorName: 'Jet Black',
    colorHex: '#0f172a',
    colorFamily: 'obsidian'
  },
  {
    id: 'collection-pant-white',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - White",
    price: 1050,
    originalPrice: 1399,
    image: whitePantImg,
    colorName: 'Crisp White',
    colorHex: '#f8fafc',
    colorFamily: 'offwhite'
  },
  {
    id: 'collection-pant-cream',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Cream",
    price: 1050,
    originalPrice: 1399,
    image: creamPantImg,
    colorName: 'Cream Beige',
    colorHex: '#fef3c7',
    colorFamily: 'beige'
  },
  {
    id: 'collection-pant-navy',
    category: 'FORMAL PANT',
    title: "Man's Formal Pant - Nevy Blue",
    price: 1050,
    originalPrice: 1399,
    image: navyPantImg,
    colorName: 'Navy Blue',
    colorHex: '#1e3a8a',
    colorFamily: 'navy'
  }
];

interface AllCollectionsProps {
  products?: TrouserProduct[];
  onSelectProduct?: (product: TrouserProduct) => void;
  onQuickOrder?: (product: TrouserProduct, size: SizeNumber, hem?: HemStyle) => void;
}

export const AllCollections: React.FC<AllCollectionsProps> = ({ products = [], onSelectProduct }) => {
  const displayList = products.length > 0 ? products : [];

  if (displayList.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#fcfcfd] py-8 sm:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header with Centered Title */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#0f172a] uppercase tracking-tight">
            ALL COLLECTIONS
          </h2>
        </div>

        {/* 2 Column Product Grid on Mobile, 4 Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayList.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct?.(product)}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/70 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = HERO_IMAGE;
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5 sm:mb-1">
                    {(!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category}
                  </span>
                  <h3 className="font-bold text-xs sm:text-[14px] text-[#0f172a] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-0.5">
                  <span className="text-[13px] sm:text-base font-extrabold text-[#0f172a]">
                    {product.price.toLocaleString('en-BD')}.00৳
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-[10px] sm:text-xs text-gray-400 line-through font-normal">
                      {product.originalPrice.toLocaleString('en-BD')}.00৳
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
