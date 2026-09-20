import React from 'react';
import { TrouserProduct, SizeNumber, HemStyle } from '../types';

interface BestSellingProductsProps {
  products?: TrouserProduct[];
  onSelectProduct?: (product: TrouserProduct) => void;
  onQuickOrder?: (product: TrouserProduct, size: SizeNumber, hem?: HemStyle) => void;
}

export const BestSellingProducts: React.FC<BestSellingProductsProps> = ({ 
  products = [], 
  onSelectProduct 
}) => {
  // If products are available, show them; filter for bestseller or take first 4-8
  const displayProducts = products.length > 0 
    ? products.filter(p => !p.badge || p.badge.toLowerCase().includes('best') || true).slice(0, 8)
    : [];

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#fcfcfd] py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="font-sans font-black text-xl sm:text-3xl lg:text-4xl text-[#0f172a] uppercase tracking-tight">
            BEST SELLING PRODUCTS
          </h2>
        </div>

        {/* 2 Column on Mobile, 4 Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((product) => {
            const discountPct = product.originalPrice && product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
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
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-0.5 sm:mb-1">
                      <span>{(!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category}</span>
                      {product.colorName && (
                        <span className="text-gray-400 font-normal">{product.colorName}</span>
                      )}
                    </div>
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
            );
          })}
        </div>

      </div>
    </section>
  );
};

