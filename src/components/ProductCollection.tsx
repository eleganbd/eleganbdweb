import React, { useState } from 'react';
import { Heart, Zap } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { TrouserProduct, SizeNumber } from '../types';

interface ProductCollectionProps {
  onSelectProduct: (product: TrouserProduct) => void;
  onQuickOrder: (product: TrouserProduct, size: SizeNumber) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  onSelectProduct,
  onQuickOrder,
  onToggleWishlist,
  wishlistIds,
  activeFilter,
  onFilterChange
}) => {
  // Local state to track selected size per product card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, SizeNumber | string>>({
    'sovereign-charcoal': 28,
    'riviera-sand-beige': 30,
    'executive-midnight-navy': 32,
    'milano-pearl-offwhite': 34
  });

  const handleSizeClick = (productId: string, size: SizeNumber | string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'obsidian') return p.colorFamily === 'obsidian';
    if (activeFilter === 'navy') return p.colorFamily === 'navy';
    if (activeFilter === 'beige') return p.colorFamily === 'beige';
    if (activeFilter === 'offwhite') return p.colorFamily === 'offwhite';
    return true;
  });

  return (
    <section className="w-full py-20 bg-[#fbf9f5]" id="featured-collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        
        {/* Section Header with Editorial Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#e5e2de]">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="font-semibold text-[11px] uppercase text-[#725b38] tracking-[0.2em]">
              Handcrafted in Dhaka Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-tight">
              Iconic Tailored Trousers
            </h2>
            <p className="text-sm text-[#444748] leading-relaxed">
              Precision cut from custom-woven bi-stretch wool-touch blend with zero-break drape.
            </p>
          </div>

          {/* Filter Pill Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => onFilterChange('all')}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider rounded font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111]'
              }`}
            >
              All Shades (18)
            </button>
            <button 
              onClick={() => onFilterChange('obsidian')}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider rounded font-semibold transition-all ${
                activeFilter === 'obsidian'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111]'
              }`}
            >
              Obsidian
            </button>
            <button 
              onClick={() => onFilterChange('navy')}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider rounded font-semibold transition-all ${
                activeFilter === 'navy'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111]'
              }`}
            >
              Navy
            </button>
            <button 
              onClick={() => onFilterChange('beige')}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider rounded font-semibold transition-all ${
                activeFilter === 'beige'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111]'
              }`}
            >
              Riviera Beige
            </button>
            <button 
              onClick={() => onFilterChange('offwhite')}
              className={`px-4 py-2 text-[11px] uppercase tracking-wider rounded font-semibold transition-all ${
                activeFilter === 'offwhite'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111]'
              }`}
            >
              Off-White
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || null;
            const isWishlisted = wishlistIds.includes(product.id);
            const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

            let badgeClass = 'bg-[#111111] text-white';
            if (product.badgeType === 'trending') badgeClass = 'bg-[#725b38] text-white';
            if (product.badgeType === 'premium') badgeClass = 'bg-[#131c2a] text-[#dae3f6]';
            if (product.badgeType === 'limited') badgeClass = 'bg-[#eae8e4] text-[#111111]';

            return (
              <div 
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/70 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Visual Image Container with Hover Action */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#efeeea]">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Wishlist Button */}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label="Add to Wishlist"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#111111] flex items-center justify-center hover:text-[#ba1a1a] hover:bg-white transition-colors shadow-xs"
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : ''}`} />
                  </button>

                  {/* Hover Quick Order Action */}
                  <div className="hidden sm:block absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!currentSize) {
                          onSelectProduct(product);
                          return;
                        }
                        onQuickOrder(product, currentSize as SizeNumber);
                      }}
                      className="w-full py-2.5 bg-[#725b38] text-white text-[11px] font-semibold uppercase tracking-wider rounded shadow-lg hover:bg-[#111111] transition-colors flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      {currentSize ? `Quick Order (Size ${currentSize})` : 'Select Size to Order'}
                    </button>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between gap-2.5 sm:gap-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#444748] mb-0.5 sm:mb-1">
                      <span>{(!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category} • {product.colorName}</span>
                      <span className="text-[#725b38] font-semibold">{product.stockStatus}</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-base text-[#111111] group-hover:text-[#725b38] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Size Selector */}
                  <div className="hidden sm:block">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#444748] mb-2 uppercase tracking-wider">
                      <span>SELECT WAIST (INCH)</span>
                      <a 
                        href="#fit-guide" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#725b38] hover:underline"
                      >
                        Guide
                      </a>
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                      {product.availableSizes.map((sz) => {
                        const stockQty = product.stockPerSize && product.stockPerSize[String(sz)] !== undefined 
                          ? product.stockPerSize[String(sz)] 
                          : 25;
                        const isOutOfStock = stockQty === 0;
                        const isSelected = currentSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            disabled={isOutOfStock}
                            onClick={(e) => {
                              if (!isOutOfStock) handleSizeClick(product.id, sz, e);
                            }}
                            title={isOutOfStock ? "Stock Out" : `Size ${sz}`}
                            className={`py-1.5 text-center text-[11px] font-semibold rounded transition-colors relative ${
                              isSelected
                                ? 'bg-[#111111] text-white shadow-sm'
                                : isOutOfStock
                                ? 'bg-gray-100 text-gray-300 line-through cursor-not-allowed'
                                : 'bg-[#f5f3ef] text-[#1b1c1a] hover:bg-[#eae8e4]'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pricing & Discount */}
                  <div className="flex items-center justify-between pt-1 sm:pt-2 border-t border-[#f5f3ef]">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-[13px] sm:text-xl font-bold text-[#111111]">
                        ৳ {product.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#747878] line-through opacity-70">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="bg-[#fedeb2] text-[#78603e] px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold">
                      -{discountPct}%
                    </span>
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
