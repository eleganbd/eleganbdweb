import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Zap, 
  ChevronRight, 
  Truck, 
  RotateCcw
} from 'lucide-react';
import { TrouserProduct, SizeNumber, HemStyle } from '../types';
import { PRODUCTS, HERO_IMAGE } from '../data/products';
import ashBackImg from '../assets/images/pant_ash_back_1789812670313.jpg';

interface ProductDetailPageProps {
  product: TrouserProduct;
  allProducts?: TrouserProduct[];
  onBack: () => void;
  onSelectProduct: (product: TrouserProduct) => void;
  onAddToCart: (product: TrouserProduct, size: SizeNumber, hem: HemStyle, qty?: number) => void;
  onQuickOrder: (product: TrouserProduct, size: SizeNumber, hem: HemStyle, qty?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onAddToCart,
  onQuickOrder,
  isWishlisted,
  onToggleWishlist,
  wishlistIds
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState<SizeNumber | null>(null);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'delivery'>('description');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  // Gallery items for thumbnail list
  const thumbnails = product.galleryImages && product.galleryImages.length > 0
    ? Array.from(new Set([product.imageUrl, ...product.galleryImages])).filter(Boolean).slice(0, 4)
    : [product.imageUrl];

  // Update main image when product changes
  useEffect(() => {
    setSelectedImage(product.imageUrl);
    setSelectedSize(null);
    setSizeError(false);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Filter related products
  const pool = (allProducts && allProducts.length > 0 ? allProducts : PRODUCTS).filter(p => p.id !== product.id);
  const sameCat = pool.filter(p => p.category === product.category);
  const otherCat = pool.filter(p => p.category !== product.category);
  const relatedProducts = [...sameCat, ...otherCat].slice(0, 4);

  const discountAmount = product.originalPrice - product.price;
  const discountPct = Math.round((discountAmount / product.originalPrice) * 100);

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onAddToCart(product, selectedSize, 'standard', quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleQuick = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onQuickOrder(product, selectedSize, 'standard', quantity);
  };

  // Available sizes matching the screenshot [28, 30, 32, 34, 36, 38, 40]
  const sizeList: (SizeNumber | 40)[] = [28, 30, 32, 34, 36, 38, 40];

  return (
    <div className="w-full bg-[#fcfcfd] min-h-screen py-6 sm:py-8 animate-fadeIn">
      
      {/* 1. Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
          <button 
            onClick={onBack}
            className="hover:text-black transition-colors"
          >
            HOME
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button 
            onClick={onBack}
            className="hover:text-black transition-colors"
          >
            {((!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category).toUpperCase()}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-black font-extrabold truncate max-w-[280px]">
            {product.name}
          </span>
        </nav>
      </div>

      {/* 2. Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT: Images & Thumbnails ================= */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-5 items-start">
            
            {/* Left Thumbnails List */}
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible w-full sm:w-20">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all bg-gray-100 shrink-0 ${
                    selectedImage === img 
                      ? 'border-blue-600 ring-1 ring-blue-600 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>

            {/* Big Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
              <img 
                src={selectedImage} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = HERO_IMAGE;
                }}
                className="w-full h-full object-cover object-center"
              />

              {/* Heart Wishlist Button */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Wishlist"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-gray-700 hover:text-red-600 flex items-center justify-center shadow-md transition-all active:scale-95"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

          </div>

          {/* ================= RIGHT: Product Info & Order Panel ================= */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Category Pill Tag */}
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded">
                {(!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-[32px] text-[#0f172a] uppercase tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                ৳{product.price.toLocaleString('en-BD')}
              </span>
              <del className="text-lg text-gray-400 font-normal">
                ৳{product.originalPrice.toLocaleString('en-BD')}
              </del>
            </div>

            {/* Waist Size Selector */}
            <div className={`pt-2 p-3 rounded-xl transition-all ${sizeError ? 'bg-red-50 border border-red-300 ring-2 ring-red-200' : ''}`}>
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                  SELECT WAIST SIZE
                </label>
                {sizeError && (
                  <span className="text-xs font-bold text-red-600 animate-pulse">
                    ⚠️ অনুগ্রহ করে একটি সাইজ সিলেক্ট করুন
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {sizeList.map((sz) => {
                  const stockQty = product.stockPerSize && product.stockPerSize[String(sz)] !== undefined 
                    ? product.stockPerSize[String(sz)] 
                    : 25;
                  const isOutOfStock = stockQty === 0;
                  const isSelected = selectedSize === sz;

                  return (
                    <button
                      key={sz}
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => {
                        if (!isOutOfStock) {
                          setSelectedSize(sz as SizeNumber);
                          setSizeError(false);
                        }
                      }}
                      className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg text-sm font-bold transition-all border ${
                        isSelected
                          ? 'bg-black text-white border-black shadow ring-2 ring-black'
                          : isOutOfStock
                          ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed line-through'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-black hover:bg-gray-50'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="pt-1">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a] mb-2">
                QUANTITY
              </label>
              <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-base font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-base font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons (ADD TO BAG & ORDER NOW) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* ADD TO BAG Button (Royal Blue) */}
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 px-4 bg-[#1d4ed8] hover:bg-[#1e40af] active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'ADDED TO BAG!' : 'ADD TO BAG'}</span>
              </button>

              {/* ORDER NOW (CASH ON DELIVERY) Button (Black) */}
              <button
                type="button"
                onClick={handleQuick}
                className="w-full py-4 px-4 bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-center leading-tight"
              >
                <Zap className="w-4 h-4 fill-white shrink-0" />
                <span>ORDER NOW (CASH ON DELIVERY)</span>
              </button>

            </div>

            {/* Tabs (DESCRIPTION | REVIEWS (0) | DELIVERY POLICY) */}
            <div className="pt-4 border-t border-gray-200 mt-2">
              <div className="flex items-center gap-6 border-b border-gray-200 pb-2.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`text-xs font-black uppercase tracking-wider pb-1 transition-all ${
                    activeTab === 'description'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  DESCRIPTION
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`text-xs font-black uppercase tracking-wider pb-1 transition-all ${
                    activeTab === 'reviews'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  REVIEWS (0)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('delivery')}
                  className={`text-xs font-black uppercase tracking-wider pb-1 transition-all ${
                    activeTab === 'delivery'
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  DELIVERY POLICY
                </button>
              </div>

              {/* Tab Contents */}
              <div className="pt-4 text-sm sm:text-base text-[#0f172a] space-y-2">
                {activeTab === 'description' && (
                  <div className="space-y-2.5">
                    <p className="text-sm sm:text-base text-[#0f172a] leading-relaxed">
                      <strong className="font-extrabold text-black">Material:</strong> Blended with 2% Spandex
                    </p>
                    <p className="text-sm sm:text-base text-[#0f172a] leading-relaxed">
                      <strong className="font-extrabold text-black">Color:</strong> {product.colorName}
                    </p>
                    <p className="text-sm sm:text-base text-[#0f172a] leading-relaxed">
                      <strong className="font-extrabold text-black">Pattern:</strong> Straight fit
                    </p>
                    <p className="pt-3 text-sm sm:text-base text-black font-semibold leading-relaxed whitespace-pre-line border-t border-gray-200 mt-2">
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="py-2 text-sm sm:text-base text-black font-medium">
                    There are no reviews yet. Be the first to review "{product.name}".
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-2 text-sm sm:text-base text-black font-semibold leading-relaxed">
                    <p>• ঢাকা মেট্রো এলাকায় ডেলিভারি ২৪ থেকে ৪৮ ঘণ্টার মধ্যে সম্পন্ন হয়।</p>
                    <p>• সারা দেশে (৬৪ জেলায়) হোম ডেলিভারি ৩ থেকে ৪ কার্যদিবসের মধ্যে।</p>
                    <p>• ১০০% ক্যাশ অন ডেলিভারি সুবিধা (ডেলিভারি ম্যানের সামনে পণ্য দেখে মূল্য পরিশোধ করুন)।</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#725b38] block mb-1">
                  EXPLORE MORE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
                  Related Products (সম্পর্কিত প্রোডাক্টস)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                You may also like these executive tailored garments
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => {
                const isRelWishlisted = wishlistIds.includes(relProduct.id);
                const relDiscount = relProduct.originalPrice > relProduct.price 
                  ? Math.round(((relProduct.originalPrice - relProduct.price) / relProduct.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={relProduct.id}
                    onClick={() => {
                      onSelectProduct(relProduct);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                        <img 
                          src={relProduct.imageUrl}
                          alt={relProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />

                        {relDiscount > 0 && (
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#ba1a1a] text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm">
                            {relDiscount}% OFF
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(relProduct.id);
                          }}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-[#ba1a1a] transition-colors shadow-sm"
                          aria-label="Wishlist product"
                        >
                          <Heart className={`w-4 h-4 ${isRelWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : ''}`} />
                        </button>
                      </div>

                      {/* Product Meta */}
                      <div className="p-3.5 sm:p-5 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
                          <span>{relProduct.colorName}</span>
                          <span className="text-[#725b38]">{relProduct.stockStatus || 'In Stock'}</span>
                        </div>

                        <h3 className="font-bold text-xs sm:text-[15px] text-[#0f172a] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {relProduct.name}
                        </h3>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="p-3.5 sm:p-5 pt-0">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base sm:text-lg font-extrabold text-[#0f172a]">
                          ৳{relProduct.price.toLocaleString('en-BD')}
                        </span>
                        {relProduct.originalPrice > relProduct.price && (
                          <del className="text-xs text-gray-400 font-normal">
                            ৳{relProduct.originalPrice.toLocaleString('en-BD')}
                          </del>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(relProduct);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full py-2.5 bg-black hover:bg-gray-800 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>View Product</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
