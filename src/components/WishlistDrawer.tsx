import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { TrouserProduct } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onRemoveWishlist: (id: string) => void;
  onSelectProduct: (product: TrouserProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveWishlist,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col justify-between border-l border-[#e5e2de]">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#e5e2de] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#ba1a1a] fill-[#ba1a1a]" />
              <h2 className="font-serif text-xl text-[#111111] font-semibold">
                Saved Atelier Pieces ({wishlistIds.length})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-[#747878] hover:text-[#111111] rounded-full hover:bg-[#f5f3ef]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {wishlistedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center my-auto py-16 text-center text-[#747878] gap-4">
                <Heart className="w-12 h-12 text-[#e5e2de]" />
                <p className="font-serif text-lg text-[#111111]">No saved trousers yet</p>
                <p className="text-xs text-[#747878]">
                  Click the heart icon on any formal trouser to save it for your fitting session.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-white p-4 rounded-xl border border-[#e5e2de] shadow-sm flex gap-4 items-center justify-between"
                >
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded bg-[#efeeea]"
                  />

                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#725b38]">
                      {product.colorName}
                    </span>
                    <h4 className="font-semibold text-xs text-[#111111] line-clamp-1">{product.name}</h4>
                    <span className="text-xs font-bold text-[#111111]">৳ {product.price.toLocaleString()}</span>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <button 
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-xs text-[#747878] hover:text-[#ba1a1a]"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-[#111111] hover:bg-[#725b38] text-white text-[11px] font-semibold uppercase tracking-wider rounded transition-colors"
                    >
                      View & Fit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-white border-t border-[#e5e2de] text-center text-xs text-[#747878]">
            Cash on delivery nationwide • Free exchange within 7 days
          </div>

        </div>
      </div>
    </div>
  );
};
