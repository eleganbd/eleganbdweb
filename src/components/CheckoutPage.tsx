import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ChevronDown, 
  User, 
  Phone, 
  MapPin, 
  Truck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { CartItem, OrderDetails, SizeNumber, CustomerAccount } from '../types';
import { BANGLADESH_64_DISTRICTS } from '../data/bangladeshDistricts';

interface CheckoutPageProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onUpdateSize?: (id: string, size: SizeNumber) => void;
  onRemoveItem: (id: string) => void;
  onOrderPlaced: (order: OrderDetails) => void;
  onAddMoreProducts: () => void;
  activeCustomer?: CustomerAccount | null;
  onOpenCustomerModal?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onBack,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
  onOrderPlaced,
  onAddMoreProducts,
  activeCustomer,
  onOpenCustomerModal
}) => {
  const [name, setName] = useState(activeCustomer?.name || '');
  const [phone, setPhone] = useState(activeCustomer?.phone || '');
  const [district, setDistrict] = useState(activeCustomer?.district || 'Dhaka');
  const [address, setAddress] = useState(activeCustomer?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<OrderDetails | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Free delivery logic: 3 formal pants = free delivery
  const isFreeDelivery = totalItemCount >= 3;
  const isDhaka = district === 'Dhaka';
  const standardShipping = isDhaka ? 70 : 130;
  const shippingCost = items.length === 0 ? 0 : (isFreeDelivery ? 0 : standardShipping);
  const total = subtotal + shippingCost;

  // Available sizes for formal pants
  const availableSizes: SizeNumber[] = [28, 30, 32, 34, 36, 38];

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || items.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `ELG-${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        district,
        shippingZone: isDhaka ? 'dhaka' : 'outside',
        shippingCost,
        items: [...items],
        subtotal,
        discount: isFreeDelivery ? standardShipping : 0,
        total,
        createdAt: 'Just now',
        status: 'confirmed'
      };

      onOrderPlaced(newOrder);
      setOrderSuccess(newOrder);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">
            অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            আপনার অর্ডার আইডি: <strong className="text-black font-mono">{orderSuccess.orderId}</strong>
          </p>

          <div className="my-6 p-4 rounded-xl bg-gray-50 text-left border border-gray-100 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">গ্রাহকের নাম:</span>
              <span className="font-bold text-gray-900">{orderSuccess.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">মোবাইল নম্বর:</span>
              <span className="font-bold text-gray-900">{orderSuccess.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ডেলিভারি ঠিকানা:</span>
              <span className="font-bold text-gray-900 text-right">{orderSuccess.address}, {orderSuccess.district}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">পেমেন্ট মেথড:</span>
              <span className="font-bold text-emerald-700">ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে পরিশোধ)</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
              <span>সর্বমোট প্রদেয়:</span>
              <span>৳{orderSuccess.total.toLocaleString('en-BD')}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            আমাদের কাস্টমার কেয়ার টিম থেকে অর্ডারটি কনফার্ম করার জন্য শীঘ্রই আপনাকে কল করা হবে।
          </p>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-4 bg-black hover:bg-gray-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-6 sm:py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-50 transition-all active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] tracking-tight uppercase">
            CHECKOUT
          </h1>
        </div>

        {/* Main 2-Column Layout matching screenshot */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ================= LEFT COLUMN: Form Inputs & Payment ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Checkout Details Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <h2 className="text-lg sm:text-xl font-bold text-[#1e3a8a] mb-6">
                Checkout
              </h2>

              <div className="space-y-4">
                {/* Your Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>

                {/* Select District */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={district}
                    onChange={handleDistrictChange}
                    className="w-full pl-11 pr-10 py-3.5 bg-white rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select district</option>
                    {BANGLADESH_64_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Address (house, road, area) */}
                <div className="relative">
                  <div className="absolute top-4 left-4 pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address (house, road, area)"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHOD Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <h3 className="font-sans font-black text-sm uppercase tracking-wider text-black">
                  PAYMENT METHOD
                </h3>
              </div>

              {/* Cash On Delivery Option Box */}
              <div className="border border-black rounded-xl p-4 sm:p-5 flex items-center justify-between bg-white shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-xl border border-emerald-200">
                    💵
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-black uppercase tracking-tight">
                        CASH ON DELIVERY (COD)
                      </span>
                      <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন (Pay with cash upon delivery)
                    </p>
                  </div>
                </div>

                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs">
              
              {/* Order Summary Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-black font-black uppercase text-sm tracking-wider">
                  <span className="text-base">🛍️</span>
                  <span>ORDER SUMMARY</span>
                </div>
                <span className="text-[11px] font-bold text-black uppercase bg-gray-100 px-2.5 py-1 rounded-full">
                  {totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1 mb-4">
                Manage size, qty or remove items below
              </p>

              {/* Free Delivery Progress Banner */}
              <div className="mb-4 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                <div className="flex items-center justify-between text-xs text-amber-900 font-bold mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>
                      {totalItemCount >= 3 
                        ? '🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন!'
                        : `${totalItemCount}/3 প্যান্ট যুক্ত — আর মাত্র ${3 - totalItemCount}টি ফরমাল প্যান্টে ফ্রি ডেলিভারি!`}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-700">
                    {totalItemCount >= 3 ? '100%' : `${Math.round((totalItemCount / 3) * 100)}%`}
                  </span>
                </div>
                <div className="w-full bg-amber-200/70 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (totalItemCount / 3) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Add More Product Button */}
              <button
                type="button"
                onClick={onAddMoreProducts}
                className="w-full py-3 px-4 mb-4 rounded-xl border border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD MORE PRODUCT / প্রোডাক্ট যোগ করুন</span>
              </button>

              {/* Product Items List */}
              <div className="space-y-3 mb-6">
                {items.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-xs">
                    আপনার ব্যাগে কোনো পণ্য নেই।
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border border-gray-900/80 shadow-xs flex items-center gap-3.5"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 relative">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info & Controls */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-extrabold text-xs text-[#0f172a] uppercase truncate">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-600 p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Size Dropdown */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[11px] font-bold uppercase text-gray-500">
                            SIZE:
                          </span>
                          <div className="relative">
                            <select
                              value={item.size}
                              onChange={(e) => {
                                if (onUpdateSize) {
                                  onUpdateSize(item.id, Number(e.target.value) as SizeNumber);
                                }
                              }}
                              className="text-xs font-bold bg-white border border-gray-300 rounded-md px-2.5 py-0.5 pr-6 focus:outline-none focus:border-black appearance-none cursor-pointer"
                            >
                              {availableSizes.map(sz => (
                                <option key={sz} value={sz}>{sz}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Qty Stepper and Price */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase text-gray-500">
                              QTY:
                            </span>
                            <div className="inline-flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 active:scale-95"
                              >
                                —
                              </button>
                              <span className="w-7 text-center text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 active:scale-95"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <span className="font-extrabold text-sm text-[#0f172a]">
                            ৳{(item.price * item.quantity).toLocaleString('en-BD')}
                          </span>
                        </div>

                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculation Rows */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs font-bold uppercase">
                <div className="flex justify-between text-gray-600">
                  <span>SUBTOTAL</span>
                  <span className="text-black font-extrabold">৳{subtotal.toLocaleString('en-BD')}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>SHIPPING ({isDhaka ? 'INSIDE DHAKA' : 'OUTSIDE DHAKA'})</span>
                  <span className="text-black font-extrabold">
                    {isFreeDelivery ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `৳${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline text-black">
                  <span className="text-sm font-black">TOTAL</span>
                  <span className="text-2xl font-black tracking-tight">৳{total.toLocaleString('en-BD')}</span>
                </div>
              </div>

              {/* CONFIRM & PLACE ORDER Button */}
              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 px-4 bg-[#1e3a8a] hover:bg-[#172554] active:scale-[0.99] disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  ) : (
                    <span>CONFIRM & PLACE ORDER — ৳{total.toLocaleString('en-BD')}</span>
                  )}
                </button>

                {/* Delivery Time Pill */}
                <div className="text-center">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-gray-400">
                    ESTIMATED DELIVERY: 24-48 HOURS
                  </span>
                </div>

                {/* SECURE CHECKOUT GUARANTEED Pill */}
                <div className="w-full py-2.5 px-3 bg-[#1d4ed8] text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SECURE CHECKOUT GUARANTEED</span>
                </div>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed pt-1">
                  By placing your order, you agree to our Terms of Use and Privacy Policy. Delivery typically takes 1 business day.
                </p>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
