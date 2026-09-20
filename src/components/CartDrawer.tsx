import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  CheckCircle2, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { BANGLADESH_64_DISTRICTS } from '../data/bangladeshDistricts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOrderPlaced: (order: OrderDetails) => void;
  appliedVoucher: string;
  onApplyVoucher: (code: string) => void;
  onProceedToCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
  appliedVoucher,
  onApplyVoucher,
  onProceedToCheckout
}) => {
  const [shippingZone, setShippingZone] = useState<'dhaka' | 'outside'>('dhaka');
  const [voucherInput, setVoucherInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Checkout form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [notes, setNotes] = useState('');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = items.length === 0 ? 0 : (shippingZone === 'dhaka' ? 70 : 130);
  const isVoucherValid = appliedVoucher.toUpperCase() === 'ELEGAN150';
  const discount = isVoucherValid ? Math.min(150, subtotal) : 0;
  const total = Math.max(0, subtotal + shippingCost - discount);

  const handleApplyVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherInput.trim()) {
      onApplyVoucher(voucherInput.trim().toUpperCase());
      setVoucherInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const newOrder: OrderDetails = {
      orderId: `ELG-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: name,
      phone,
      address,
      district,
      shippingZone,
      shippingCost,
      items: [...items],
      subtotal,
      discount,
      voucherCode: appliedVoucher || undefined,
      total,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }),
      status: 'confirmed'
    };

    setLastPlacedOrder(newOrder);
    onOrderPlaced(newOrder);
    setCheckoutStep('success');
  };

  const bangladeshDistricts = BANGLADESH_64_DISTRICTS;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col justify-between border-l border-[#e5e2de]">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#e5e2de] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#725b38]" />
              <h2 className="font-serif text-xl text-[#111111] font-semibold">
                {checkoutStep === 'cart' && 'Atelier Shopping Bag'}
                {checkoutStep === 'checkout' && 'Cash on Delivery Details'}
                {checkoutStep === 'success' && 'Order Confirmed'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-[#747878] hover:text-[#111111] rounded-full hover:bg-[#f5f3ef] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            
            {/* Step 1: Cart Items */}
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center my-auto py-16 text-center text-[#747878] gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#f5f3ef] flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-[#747878]/60" />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#111111]">Your bag is currently empty</p>
                      <p className="text-xs text-[#747878] mt-1">
                        Select your preferred waist size and add a formal trouser to begin.
                      </p>
                    </div>
                    <button 
                      onClick={onClose}
                      className="mt-2 px-6 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded"
                    >
                      Browse Tailored Pants
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#747878]">
                      Selected Garments ({items.length})
                    </div>
                    
                    {items.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 shadow-xs flex gap-3.5 items-start relative group"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden bg-[#f5f3ef] shrink-0 border border-gray-200/70 relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Content Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch pr-6">
                          <div>
                            <h4 className="font-extrabold text-xs sm:text-sm text-[#0f172a] leading-tight line-clamp-2">
                              {item.name}
                            </h4>
                            <div className="text-[11px] text-gray-500 font-medium flex items-center gap-2 mt-1">
                              <span>Waist: <b className="text-black font-extrabold">{item.size}"</b></span>
                              {item.hemStyle && (
                                <>
                                  <span>•</span>
                                  <span className="capitalize">{item.hemStyle} Hem</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                            <div className="font-black text-sm sm:text-base text-[#0f172a]">
                              ৳{(item.price * item.quantity).toLocaleString('en-BD')}
                              {item.quantity > 1 && (
                                <span className="text-[10px] text-gray-400 font-normal block">
                                  (৳{item.price.toLocaleString('en-BD')} × {item.quantity})
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                              <button 
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-extrabold text-black">
                                {item.quantity}
                              </span>
                              <button 
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-gray-200 active:scale-95 transition-all"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Trash Remove Button inside card */}
                        <button 
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Shipping Zone Selector */}
                    <div className="mt-4 bg-white p-4 rounded-lg border border-[#e5e2de] flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444748] flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#725b38]" />
                        Nationwide Delivery Zone
                      </span>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShippingZone('dhaka')}
                          className={`p-2.5 rounded text-left border transition-all ${
                            shippingZone === 'dhaka'
                              ? 'border-[#725b38] bg-[#fedeb2]/20 font-semibold'
                              : 'border-[#e5e2de] hover:bg-[#f5f3ef]'
                          }`}
                        >
                          <div className="text-xs text-[#111111]">Inside Dhaka</div>
                          <div className="text-[11px] text-[#725b38] font-bold">৳ 70 (24–48h)</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShippingZone('outside')}
                          className={`p-2.5 rounded text-left border transition-all ${
                            shippingZone === 'outside'
                              ? 'border-[#725b38] bg-[#fedeb2]/20 font-semibold'
                              : 'border-[#e5e2de] hover:bg-[#f5f3ef]'
                          }`}
                        >
                          <div className="text-xs text-[#111111]">Outside Dhaka</div>
                          <div className="text-[11px] text-[#725b38] font-bold">৳ 130 (48–72h)</div>
                        </button>
                      </div>
                    </div>

                    </div>
                )}
              </>
            )}

            {/* Step 2: Instant COD Checkout Form */}
            {checkoutStep === 'checkout' && (
              <form id="cod-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                <div className="bg-[#fedeb2]/30 p-3 rounded-lg border border-[#fedeb2] flex items-center gap-2 text-xs text-[#78603e]">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-[#725b38]" />
                  <span>100% Cash On Delivery. Zero advance payment needed. Inspect fabric before paying.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                    Your Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Md. Ashiqur Rahman"
                    className="w-full bg-white px-3.5 py-2.5 rounded text-xs border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                    Mobile Phone Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX or 018XXXXXXXX"
                    className="w-full bg-white px-3.5 py-2.5 rounded text-xs border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                  />
                  <span className="text-[10px] text-[#747878] mt-0.5 block">Delivery courier will call you before arrival</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                    District / Division *
                  </label>
                  <select 
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      if (e.target.value === 'Dhaka') setShippingZone('dhaka');
                      else setShippingZone('outside');
                    }}
                    className="w-full bg-white px-3 py-2.5 rounded text-xs border border-[#e5e2de] focus:outline-none"
                  >
                    {bangladeshDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                    Full Delivery Address *
                  </label>
                  <textarea 
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House, Road, Block/Sector, Area (e.g. House 42, Road 11, Banani)"
                    className="w-full bg-white px-3.5 py-2 rounded text-xs border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                    Special Delivery Notes (Optional)
                  </label>
                  <input 
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Deliver after 4:00 PM or leave at reception"
                    className="w-full bg-white px-3.5 py-2 rounded text-xs border border-[#e5e2de] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                  />
                </div>

                <div className="pt-2 text-[11px] text-[#747878] flex items-center justify-between border-t border-[#e5e2de]">
                  <span>Delivery Zone: <b className="text-[#111111]">{shippingZone === 'dhaka' ? 'Dhaka City' : 'Outside Dhaka'}</b></span>
                  <button 
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-[#725b38] underline font-semibold"
                  >
                    Edit Items
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Screen */}
            {checkoutStep === 'success' && lastPlacedOrder && (
              <div className="flex flex-col items-center justify-center my-auto py-8 text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#fedeb2] flex items-center justify-center text-[#78603e] shadow-md">
                  <CheckCircle2 className="w-9 h-9 text-[#78603e]" />
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#725b38]">
                    Order Placed Successfully
                  </span>
                  <h3 className="font-serif text-2xl text-[#111111] mt-1">
                    Thank You, {lastPlacedOrder.customerName}
                  </h3>
                  <p className="text-xs text-[#444748] max-w-xs mx-auto mt-1">
                    Your bespoke trousers are scheduled for quality inspection and doorstep cash on delivery dispatch.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="w-full bg-white p-4 rounded-xl border border-[#e5e2de] shadow-sm text-left flex flex-col gap-2.5 text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#f5f3ef]">
                    <span className="text-[#747878]">Order ID:</span>
                    <span className="font-mono font-bold text-[#111111]">{lastPlacedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747878]">Phone:</span>
                    <span className="font-medium text-[#111111]">{lastPlacedOrder.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747878]">Delivery to:</span>
                    <span className="font-medium text-[#111111] text-right truncate max-w-[200px]">{lastPlacedOrder.address}, {lastPlacedOrder.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#747878]">Expected Dispatch:</span>
                    <span className="font-medium text-[#725b38]">{lastPlacedOrder.shippingZone === 'dhaka' ? 'Within 24–48 Hours' : 'Within 48–72 Hours'}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#f5f3ef] font-bold text-sm">
                    <span>Payable on Delivery:</span>
                    <span className="text-[#725b38]">৳ {lastPlacedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <a 
                    href={`https://wa.me/8801700ELEGAN?text=Hello%20Elegan%20BD%2C%20I%20have%20placed%20order%20${lastPlacedOrder.orderId}%20for%20BDT%20${lastPlacedOrder.total}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#111111] hover:bg-[#725b38] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#fedeb2]" />
                    <span>WhatsApp Order Confirmation</span>
                  </a>

                  <button 
                    onClick={onClose}
                    className="w-full py-2.5 text-xs text-[#747878] hover:text-[#111111]"
                  >
                    Return to Atelier
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer Billing & Action Button */}
          {items.length > 0 && checkoutStep !== 'success' && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#e5e2de] flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#0f172a]">৳{subtotal.toLocaleString('en-BD')}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Delivery ({shippingZone === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span className="font-bold text-[#0f172a]">৳{shippingCost.toLocaleString('en-BD')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#725b38] font-bold">
                    <span>Voucher ({appliedVoucher})</span>
                    <span>- ৳{discount.toLocaleString('en-BD')}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2.5 border-t border-gray-200 text-sm sm:text-base font-black text-[#0f172a]">
                  <span>Total Payable (COD)</span>
                  <span className="text-lg sm:text-xl font-black text-[#0f172a]">৳{total.toLocaleString('en-BD')}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (onProceedToCheckout) {
                      onProceedToCheckout();
                    } else {
                      setCheckoutStep('checkout');
                    }
                  }}
                  className="w-full py-3.5 bg-[#0f172a] hover:bg-black text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.99]"
                >
                  <span>PROCEED TO CASH ON DELIVERY (৳{total.toLocaleString('en-BD')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="px-4 py-3.5 bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111] font-semibold text-xs uppercase tracking-wider rounded"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="cod-form"
                    className="flex-1 py-3.5 bg-[#725b38] hover:bg-[#111111] text-white font-semibold text-xs uppercase tracking-widest rounded transition-all duration-300 shadow-lg text-center"
                  >
                    Confirm Cash On Delivery Order
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
