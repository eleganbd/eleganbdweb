import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Heart, 
  Zap, 
  Filter, 
  SlidersHorizontal,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { TrouserProduct, SizeNumber } from '../types';

interface CategoryPageProps {
  categoryTitle: string;
  categorySlug: string;
  products: TrouserProduct[];
  onBack: () => void;
  onSelectProduct: (product: TrouserProduct) => void;
  onQuickOrder: (product: TrouserProduct, size: SizeNumber) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryTitle,
  categorySlug,
  products,
  onBack,
  onSelectProduct,
  onQuickOrder,
  onToggleWishlist,
  wishlistIds
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, SizeNumber>>({});
  const [sortOption, setSortOption] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [colorFilter, setColorFilter] = useState<string>('all');

  // Filter products by category
  const categoryProducts = useMemo(() => {
    const slug = categorySlug.toLowerCase();
    const title = categoryTitle.toLowerCase();

    return products.filter(p => {
      const pCat = (p.category || 'Formal Pant').toLowerCase();
      const pName = p.name.toLowerCase();

      if (slug.includes('pant') || slug.includes('trouser') || title.includes('pant') || title.includes('trouser')) {
        return pCat.includes('pant') || pCat.includes('trouser') || !p.category || pName.includes('pant') || pName.includes('trouser');
      }
      if (slug.includes('shirt') || slug.includes('polo') || title.includes('shirt') || title.includes('polo')) {
        return pCat.includes('shirt') || pCat.includes('polo') || pName.includes('shirt') || pName.includes('polo');
      }
      if (slug.includes('blazer') || title.includes('blazer')) {
        return pCat.includes('blazer') || pName.includes('blazer');
      }
      return pCat.includes(slug) || pCat.includes(title) || slug.includes(pCat);
    });
  }, [products, categorySlug, categoryTitle]);

  // Apply secondary color filter
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];
    if (colorFilter !== 'all') {
      result = result.filter(p => p.colorFamily === colorFilter);
    }
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [categoryProducts, colorFilter, sortOption]);

  const handleSizeSelect = (productId: string, size: SizeNumber, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const formattedTitle = categoryTitle.toUpperCase().includes('PANT')
    ? 'FORMAL PANT COLLECTION'
    : categoryTitle.toUpperCase().includes('SHIRT')
    ? 'FORMAL SHIRT COLLECTION'
    : `${categoryTitle.toUpperCase()} COLLECTION`;

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#0f172a] pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200/80 mb-6">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <button 
              onClick={onBack}
              className="hover:text-black transition-colors flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>HOME</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-400">CATEGORIES</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[#0f172a] font-extrabold">{formattedTitle}</span>
          </nav>

          <button
            onClick={onBack}
            className="text-xs font-bold text-[#725b38] hover:text-[#111111] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Store
          </button>
        </div>

        {/* Category Hero Banner */}
        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-8 sm:mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-[#725b38] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-md mb-3 sm:mb-4">
              {categoryProducts.length} PRODUCTS AVAILABLE
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
              {formattedTitle}
            </h1>
          </div>
        </div>

        {/* Sort & Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-xs mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <Filter className="w-4 h-4 text-[#725b38]" />
            <span>Showing {filteredProducts.length} Items</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500 font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-auto"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-8 max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-2">No items found in this category</h3>
            <p className="text-xs text-gray-500 mb-6">Explore our iconic formal pants and signature shirt collection.</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#725b38] transition-colors"
            >
              Browse All Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const currentSize = selectedSizes[product.id] || null;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                      <img 
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Wishlist Icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-[#ba1a1a] transition-colors shadow-sm"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : ''}`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-3.5 sm:p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
                        <span>{product.colorName}</span>
                        <span className="text-[#725b38]">{product.stockStatus || 'In Stock'}</span>
                      </div>

                      <h3 className="font-bold text-xs sm:text-[15px] text-[#0f172a] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Size Selector */}
                      <div className="mt-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Select Size:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.availableSizes.map((sz) => {
                            const isSelected = currentSize === sz;
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={(e) => handleSizeSelect(product.id, sz as SizeNumber, e)}
                                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-colors ${
                                  isSelected 
                                    ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400'
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Quick Order */}
                  <div className="p-3.5 sm:p-5 pt-0 mt-2">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base sm:text-lg font-extrabold text-[#0f172a]">
                        ৳{product.price.toLocaleString('en-BD')}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through font-normal">
                          ৳{product.originalPrice.toLocaleString('en-BD')}
                        </span>
                      )}
                    </div>

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
                      className="w-full py-2.5 bg-[#725b38] hover:bg-[#0f172a] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{currentSize ? `Quick Order (Size ${currentSize})` : 'Select Size to Order'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Guarantee Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#725b38] shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Fast Islandwide Delivery</h4>
              <p className="text-[11px] text-gray-500">Dhaka 24hrs (৳70) • Outside Dhaka 48hrs (৳130)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#725b38] shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">100% Cash On Delivery</h4>
              <p className="text-[11px] text-gray-500">Inspect fabric & fit before making payment</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#725b38] shrink-0" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">7-Day Hassle-Free Exchange</h4>
              <p className="text-[11px] text-gray-500">Instant size or shade replacement at your doorstep</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
