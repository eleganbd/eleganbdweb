import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  RotateCcw
} from 'lucide-react';
import { TrouserProduct, SizeNumber, HemStyle } from '../types';
import ashBackImg from '../assets/images/pant_ash_back_1789812670313.jpg';

interface ProductDetailModalProps {
  product: TrouserProduct | null;
  onClose: () => void;
  onAddToCart: (product: TrouserProduct, size: SizeNumber, hem: HemStyle, qty?: number) => void;
  onQuickOrder: (product: TrouserProduct, size: SizeNumber, hem: HemStyle, qty?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickOrder,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState<SizeNumber | null>(null);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'delivery'>('description');

  const thumbnails = product.galleryImages && product.galleryImages.length > 0
    ? Array.from(new Set([product.imageUrl, ...product.galleryImages])).filter(Boolean).slice(0, 4)
    : [product.imageUrl];

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

  const sizeList: (SizeNumber | 40)[] = [28, 30, 32, 34, 36, 38, 40];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-gray-200 p-4 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-black hover:text-white transition-colors flex items-center justify-center shadow-md border border-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Breadcrumbs inside modal */}
        <div className="mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            HOME / {((!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category).toUpperCase()} / <strong className="text-black">{product.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* ================= LEFT: Images & Thumbnails ================= */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-start">
            
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2.5 shrink-0 overflow-x-auto sm:overflow-visible w-full sm:w-20">
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

            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
              <img 
                src={selectedImage} 
                alt={product.name} 
                referrerPolicy="no-referrer"
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

          {/* ================= RIGHT: Info & Purchase ================= */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Category Pill Tag */}
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded">
                {(!product.category || product.category.toLowerCase() === 'pant') ? 'Formal Pant' : product.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#0f172a] uppercase tracking-tight leading-tight">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                ৳{product.price.toLocaleString('en-BD')}
              </span>
              <del className="text-base sm:text-lg text-gray-400 font-normal">
                ৳{product.originalPrice.toLocaleString('en-BD')}
              </del>
            </div>

            {/* Waist Size Selector */}
            <div className={`pt-2 p-2.5 rounded-xl transition-all ${sizeError ? 'bg-red-50 border border-red-300 ring-2 ring-red-200' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a]">
                  SELECT WAIST SIZE
                </label>
                {sizeError && (
                  <span className="text-xs font-bold text-red-600 animate-pulse">
                    ⚠️ সাইজ সিলেক্ট করুন
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
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
                      className={`w-11 h-11 flex items-center justify-center rounded-lg text-sm font-bold transition-all border ${
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

            {/* Quantity */}
            <div className="pt-1">
              <label className="block text-xs font-black uppercase tracking-wider text-[#0f172a] mb-2">
                QUANTITY
              </label>
              <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons (ADD TO BAG & ORDER NOW) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3.5 px-3 bg-[#1d4ed8] hover:bg-[#1e40af] active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow transition-all flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedNotice ? 'ADDED TO BAG!' : 'ADD TO BAG'}</span>
              </button>

              <button
                type="button"
                onClick={handleQuick}
                className="w-full py-3.5 px-3 bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 text-center leading-tight"
              >
                <Zap className="w-4 h-4 fill-white shrink-0" />
                <span>ORDER NOW (CASH ON DELIVERY)</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="pt-3 border-t border-gray-200 mt-1">
              <div className="flex items-center gap-5 border-b border-gray-200 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`text-[11px] font-black uppercase tracking-wider pb-1 transition-all ${
                    activeTab === 'description' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  DESCRIPTION
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className={`text-[11px] font-black uppercase tracking-wider pb-1 transition-all ${
                    activeTab === 'reviews' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  REVIEWS (0)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('delivery')}
                  className={`text-[11px] font-black uppercase tracking-wider pb-1 transition-all ${
                    activeTab === 'delivery' ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  DELIVERY POLICY
                </button>
              </div>

              <div className="pt-3 text-sm sm:text-base text-[#0f172a] space-y-2">
                {activeTab === 'description' && (
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-[#0f172a] leading-relaxed">
                      <strong className="font-extrabold text-black">Material:</strong> Blended with 2% Spandex
                    </p>
                    <p className="text-sm sm:text-base text-[#0f172a] leading-relaxed">
                      <strong className="font-extrabold text-black">Color:</strong> {product.colorName}
                    </p>
                    <p className="text-sm sm:text-base text-[#0f172a] leading-relaxed">
                      <strong className="font-extrabold text-black">Pattern:</strong> Straight fit
                    </p>
                    <p className="pt-2 text-sm sm:text-base text-black font-semibold leading-relaxed whitespace-pre-line border-t border-gray-200 mt-2">
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
                    <p>• ঢাকা মেট্রো এলাকায় ডেলিভারি ২৪ থেকে ৪৮ ঘণ্টার মধ্যে।</p>
                    <p>• সারা দেশে (৬৪ জেলায়) হোম ডেলিভারি ৩ থেকে ৪ কার্যদিবসের মধ্যে।</p>
                    <p>• ১০০% ক্যাশ অন ডেলিভারি সুবিধা।</p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
