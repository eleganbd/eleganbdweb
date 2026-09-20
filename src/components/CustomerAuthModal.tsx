import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Lock, 
  Mail, 
  MapPin, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Award, 
  Package, 
  Truck, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Ruler,
  Clock
} from 'lucide-react';
import { CustomerAccount, OrderDetails, SizeNumber } from '../types';
import { BANGLADESH_64_DISTRICTS } from '../data/bangladeshDistricts';
import { supabaseService } from '../lib/supabase';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCustomer: CustomerAccount | null;
  onLogin: (customer: CustomerAccount) => void;
  onLogout: () => void;
  onUpdateCustomer: (customer: CustomerAccount) => void;
  orders: OrderDetails[];
  onOpenTrack: () => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  activeCustomer,
  onLogin,
  onLogout,
  onUpdateCustomer,
  orders,
  onOpenTrack
}) => {
  // Tabs: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Sign In state
  const [signInIdentifier, setSignInIdentifier] = useState(''); // phone or email
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpDistrict, setSignUpDistrict] = useState('Dhaka');
  const [signUpAddress, setSignUpAddress] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Profile preferences edit
  const [selectedWaist, setSelectedWaist] = useState<string>('32');
  const [selectedSilhouette, setSelectedSilhouette] = useState<string>('Slim Tapered');

  // Status feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync profile preferences when activeCustomer loads
  useEffect(() => {
    if (activeCustomer) {
      if (activeCustomer.preferredWaist) {
        setSelectedWaist(String(activeCustomer.preferredWaist));
      }
      if (activeCustomer.preferredSilhouette) {
        setSelectedSilhouette(activeCustomer.preferredSilhouette);
      }
    }
  }, [activeCustomer]);

  // Reset errors on mode change
  useEffect(() => {
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [authMode, isOpen]);

  if (!isOpen) return null;

  // Helper to get registered accounts from local storage
  const getRegisteredAccounts = (): CustomerAccount[] => {
    try {
      const stored = localStorage.getItem('elegan_customer_accounts');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return [];
  };

  // Save registered accounts
  const saveRegisteredAccounts = (accounts: CustomerAccount[]) => {
    try {
      localStorage.setItem('elegan_customer_accounts', JSON.stringify(accounts));
    } catch {
      // ignore
    }
  };

  // ==========================================
  // SIGN UP HANDLER (Create New Account)
  // ==========================================
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const name = signUpName.trim();
    const phone = signUpPhone.trim();
    const email = signUpEmail.trim().toLowerCase();
    const password = signUpPassword.trim();
    const confirmPassword = signUpConfirmPassword.trim();
    const address = signUpAddress.trim();
    const district = signUpDistrict;

    // Validations
    if (!name) {
      setErrorMsg('অনুগ্রহ করে আপনার পুরো নাম লিখুন (Please enter your full name).');
      return;
    }

    if (!phone) {
      setErrorMsg('অনুগ্রহ করে আপনার মোবাইল নম্বর লিখুন (Please enter your mobile number).');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 11) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)।');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('পাসওয়ার্ড ন্যূনতম ৪ অক্ষরের হতে হবে (Password must be at least 4 characters).');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('উভয় পাসওয়ার্ড মিলছে না, পুনরায় চেষ্টা করুন (Passwords do not match).');
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      let accounts = getRegisteredAccounts();

      // Check if phone or email is already registered locally or in Supabase
      const phoneExists = accounts.some(acc => acc.phone.replace(/[^0-9]/g, '') === cleanPhone);
      if (phoneExists) {
        setErrorMsg('এই মোবাইল নম্বরে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে! দয়া করে সাইন ইন করুন (Phone already registered).');
        setIsLoading(false);
        return;
      }

      if (email && accounts.some(acc => acc.email && acc.email.toLowerCase() === email)) {
        setErrorMsg('এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে! দয়া করে সাইন ইন করুন (Email already registered).');
        setIsLoading(false);
        return;
      }

      // Create new customer account
      const newCustomer: CustomerAccount = {
        id: `ELG-CL-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone: cleanPhone,
        email: email || undefined,
        password,
        address: address || undefined,
        district: district || 'Dhaka',
        preferredWaist: '32',
        preferredSilhouette: 'Slim Tapered',
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        ordersCount: 0,
        totalSpend: 0
      };

      const updatedAccounts = [newCustomer, ...accounts];
      saveRegisteredAccounts(updatedAccounts);

      // Async push to Supabase
      await supabaseService.saveCustomer(newCustomer);

      setIsLoading(false);
      setSuccessMsg('আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! স্বাগতম।');

      setTimeout(() => {
        onLogin(newCustomer);
      }, 700);

    }, 450);
  };

  // ==========================================
  // SIGN IN HANDLER (Login to Existing Account)
  // ==========================================
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const identifier = signInIdentifier.trim();
    const password = signInPassword.trim();

    if (!identifier) {
      setErrorMsg('অনুগ্রহ করে মোবাইল নম্বর বা ইমেইল লিখুন (Please enter phone or email).');
      return;
    }

    if (!password) {
      setErrorMsg('অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন (Please enter your password).');
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      let accounts = getRegisteredAccounts();

      const cleanId = identifier.replace(/[^0-9]/g, '');
      const lowerId = identifier.toLowerCase();

      // Find matching customer in local accounts
      let found = accounts.find(acc => {
        const phoneMatch = cleanId.length >= 10 && acc.phone.replace(/[^0-9]/g, '').includes(cleanId);
        const emailMatch = acc.email && acc.email.toLowerCase() === lowerId;
        return phoneMatch || emailMatch;
      });

      // If not found in local, check Supabase remote
      if (!found) {
        const remoteAccounts = await supabaseService.getCustomers();
        if (remoteAccounts && remoteAccounts.length > 0) {
          found = remoteAccounts.find(acc => {
            const phoneMatch = cleanId.length >= 10 && acc.phone.replace(/[^0-9]/g, '').includes(cleanId);
            const emailMatch = acc.email && acc.email.toLowerCase() === lowerId;
            return phoneMatch || emailMatch;
          });
          if (found) {
            // merge into local cache
            saveRegisteredAccounts([...accounts, found]);
          }
        }
      }

      if (!found) {
        setIsLoading(false);
        setErrorMsg('কোনো অ্যাকাউন্ট পাওয়া যায়নি। আপনি যদি নতুন হয়ে থাকেন, তবে প্রথমে নিচে "নতুন অ্যাকাউন্ট তৈরি করুন (Sign Up)" এ ক্লিক করে অ্যাকাউন্ট খুলুন।');
        return;
      }

      if (found.password && found.password !== password) {
        setIsLoading(false);
        setErrorMsg('ভুল পাসওয়ার্ড! দয়া করে সঠিক পাসওয়ার্ড দিন (Incorrect password).');
        return;
      }

      setIsLoading(false);
      setSuccessMsg(`স্বাগতম, ${found.name}! লগইন সফল হয়েছে।`);

      setTimeout(() => {
        onLogin(found);
      }, 500);

    }, 450);
  };

  // Customer Orders Filter
  const customerOrders = orders.filter(o => 
    activeCustomer && (
      o.phone.replace(/[^0-9]/g, '') === activeCustomer.phone.replace(/[^0-9]/g, '') ||
      o.customerName.toLowerCase() === activeCustomer.name.toLowerCase()
    )
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e5e2de] max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* VIEW 1: ACTIVE LOGGED IN CUSTOMER DASHBOARD / PROFILE        */}
        {/* ============================================================ */}
        {activeCustomer ? (
          <div className="flex flex-col gap-5">
            {/* Header / Client Info */}
            <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#725b38] to-[#99794d] text-white flex items-center justify-center text-xl font-bold font-serif shadow-md ring-2 ring-[#fedeb2]">
                {activeCustomer.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#fedeb2]/70 text-[#78603e] rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Award className="w-3 h-3" />
                  Verified Atelier Client
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#111111] font-bold truncate">
                  {activeCustomer.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                  <span>ID: {activeCustomer.id}</span>
                  <span>•</span>
                  <span>{activeCustomer.phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#fbf9f5] border border-[#e5e2de] p-3.5 rounded-xl">
                <span className="text-[11px] text-gray-500 font-medium block">Total Orders</span>
                <span className="text-xl font-bold text-[#111111]">
                  {customerOrders.length} {customerOrders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>
              <div className="bg-[#fbf9f5] border border-[#e5e2de] p-3.5 rounded-xl">
                <span className="text-[11px] text-gray-500 font-medium block">Saved District</span>
                <span className="text-base font-bold text-[#725b38] truncate block">
                  {activeCustomer.district || 'Dhaka'}
                </span>
              </div>
            </div>

            {/* Saved Bespoke Fit Profile */}
            <div className="bg-[#f5f3ef] p-4 rounded-xl border border-[#e5e2de]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-xs uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#725b38]" />
                  Saved Bespoke Fit Profile
                </span>
                <span className="text-[#725b38] text-[11px] font-bold">Dhaka Atelier</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 block text-[10px] uppercase font-semibold">Waist (Inches)</label>
                  <select 
                    value={selectedWaist} 
                    onChange={(e) => {
                      setSelectedWaist(e.target.value);
                      onUpdateCustomer({ ...activeCustomer, preferredWaist: e.target.value });
                    }}
                    className="mt-1 w-full bg-white p-2 rounded-lg text-xs border border-gray-200 font-semibold focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                  >
                    {['28', '30', '32', '34', '36', '38', '40'].map(s => (
                      <option key={s} value={s}>{s} Inches</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-500 block text-[10px] uppercase font-semibold">Preferred Silhouette</label>
                  <select 
                    value={selectedSilhouette} 
                    onChange={(e) => {
                      setSelectedSilhouette(e.target.value);
                      onUpdateCustomer({ ...activeCustomer, preferredSilhouette: e.target.value });
                    }}
                    className="mt-1 w-full bg-white p-2 rounded-lg text-xs border border-gray-200 font-semibold focus:outline-none focus:ring-1 focus:ring-[#725b38]"
                  >
                    <option value="Slim Tapered">Slim Tapered (14.5" Leg)</option>
                    <option value="Classic Tailored">Classic Tailored (15.5" Leg)</option>
                    <option value="Relaxed Drape">Relaxed Drape (16.5" Leg)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Saved Delivery Address */}
            <div className="p-3.5 bg-white rounded-xl border border-gray-200 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#725b38] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-gray-900 block">Default Shipping Address</span>
                <p className="text-gray-600 mt-0.5 leading-relaxed">
                  {activeCustomer.address ? `${activeCustomer.address}, ${activeCustomer.district}` : 'ঠিকানা সেভ করা নেই (Address not set yet)'}
                </p>
              </div>
            </div>

            {/* Customer Recent Orders List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#725b38]" />
                  My Orders (আমার অর্ডারসমূহ)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTrack();
                  }}
                  className="text-[11px] font-bold text-[#2563eb] hover:underline flex items-center gap-1"
                >
                  <Truck className="w-3 h-3" />
                  Live Tracking
                </button>
              </div>

              {customerOrders.length === 0 ? (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-xs text-gray-500">
                  এখনো কোনো অর্ডার প্লেস করা হয়নি। কার্ট থেকে এখনই অর্ডার করুন!
                </div>
              ) : (
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {customerOrders.map(order => (
                    <div 
                      key={order.orderId}
                      className="p-3 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200 flex items-center justify-between transition-colors text-xs"
                    >
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          <span>#{order.orderId}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500">
                          {order.items.length} Item(s) • ৳{order.total.toLocaleString()} • {order.createdAt}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenTrack();
                        }}
                        className="px-2.5 py-1 bg-[#111111] text-white text-[10px] font-bold rounded-lg hover:bg-[#725b38] transition-colors"
                      >
                        Track
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Action */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out (লগআউট করুন)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl hover:bg-[#725b38] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* VIEW 2: CUSTOMER AUTHENTICATION (SIGN IN / SIGN UP TABS)     */
          /* ============================================================ */
          <div className="flex flex-col">
            {/* Modal Header */}
            <div className="text-center pb-5 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#fbf9f5] border border-[#e5e2de] text-[#725b38] flex items-center justify-center mx-auto mb-2 shadow-sm">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                ELEGAN BD Customer Portal
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {authMode === 'signin' 
                  ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' 
                  : 'নতুন অ্যাকাউন্ট তৈরি করে বিশেষ সুবিধা উপভোগ করুন'}
              </p>
            </div>

            {/* Switch Tabs: Sign In / Sign Up */}
            <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-xl my-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-2.5 rounded-lg transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Sign In (লগইন)
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-2.5 rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Sign Up (নতুন অ্যাকাউন্ট)
              </button>
            </div>

            {/* Error / Success Alerts */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <div className="flex-1 leading-snug">{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 1: SIGN IN FORM                                  */}
            {/* ==================================================== */}
            {authMode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Phone / Email (মোবাইল নম্বর বা ইমেইল) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      required
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      placeholder="e.g. 01712345678 বা ইমেইল"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Password (পাসওয়ার্ড) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type={showSignInPassword ? 'text' : 'password'}
                      required
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="আপনার পাসওয়ার্ড দিন"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#111111] hover:bg-[#725b38] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Switch link */}
                <div className="text-center pt-2">
                  <p className="text-xs text-gray-500">
                    অ্যাকাউন্ট নেই?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="font-bold text-[#725b38] hover:underline"
                    >
                      নতুন অ্যাকাউন্ট খুলুন (Sign Up)
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* ==================================================== */}
            {/* TAB 2: SIGN UP FORM                                  */}
            {/* ==================================================== */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name (আপনার পুরো নাম) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Mobile Number (মোবাইল নম্বর) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel"
                      required
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      maxLength={14}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address (ইমেইল - ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showSignUpPassword ? 'text' : 'password'}
                        required
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="পাসওয়ার্ড"
                        className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showSignUpPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Confirm <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type={showSignUpPassword ? 'text' : 'password'}
                      required
                      value={signUpConfirmPassword}
                      onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                      placeholder="পুনরায় পাসওয়ার্ড"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                    />
                  </div>
                </div>

                {/* District Selector (64 Districts) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    District (জেলা)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={signUpDistrict}
                      onChange={(e) => setSignUpDistrict(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900 cursor-pointer"
                    >
                      {BANGLADESH_64_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Delivery Address (বাসা/রোড/ঠিকানা - ঐচ্ছিক)
                  </label>
                  <input 
                    type="text"
                    value={signUpAddress}
                    onChange={(e) => setSignUpAddress(e.target.value)}
                    placeholder="রোড নম্বর, বাড়ি নম্বর, এরিয়া"
                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-[#725b38] focus:ring-1 focus:ring-[#725b38] transition-all font-medium text-gray-900"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#725b38] hover:bg-[#111111] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#fedeb2]" />
                      <span>Create Account (অ্যাকাউন্ট তৈরি করুন)</span>
                    </>
                  )}
                </button>

                {/* Switch link */}
                <div className="text-center pt-1">
                  <p className="text-xs text-gray-500">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="font-bold text-[#111111] hover:underline"
                    >
                      Sign In করুন
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* Privacy note */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>আপনার ব্যক্তিগত তথ্য ১০০% নিরাপদ ও এনক্রিপ্টেড</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
