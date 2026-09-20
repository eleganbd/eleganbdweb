import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Truck, 
  Star, 
  Phone, 
  ChevronDown, 
  Menu, 
  X,
  ShieldCheck,
  UserPlus,
  LogIn
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { TrouserProduct, CustomerAccount } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTrackOrder: () => void;
  onOpenAtelierModal?: () => void;
  onOpenCustomerAccount: () => void;
  activeCustomer?: CustomerAccount | null;
  onOpenAdminLogin?: () => void;
  onSelectProduct: (product: TrouserProduct) => void;
  onNavigateHome?: () => void;
  onFilterChange?: (filter: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTrackOrder,
  onOpenCustomerAccount,
  activeCustomer,
  onOpenAdminLogin,
  onSelectProduct,
  onNavigateHome,
  onFilterChange,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when search popover opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.colorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleCategorySelect = (familyId: string) => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateHome) onNavigateHome();
    if (onFilterChange) onFilterChange(familyId);
    const el = document.getElementById('featured-collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReviewsClick = () => {
    if (onNavigateHome) onNavigateHome();
    setMobileMenuOpen(false);
    const el = document.getElementById('reviews-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCollectionsClick = () => {
    if (onNavigateHome) onNavigateHome();
    setMobileMenuOpen(false);
    const el = document.getElementById('featured-collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    if (onNavigateHome) onNavigateHome();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto h-16 sm:h-20 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* ================= 1. LEFT: BRAND TYPOGRAPHY ================= */}
        <div className="flex items-center">
          <button 
            type="button"
            onClick={handleHomeClick}
            className="flex items-center shrink-0 py-1 text-left group cursor-pointer"
          >
            <span className="font-sans text-xl sm:text-2xl font-black tracking-tight uppercase text-black">
              ELEGAN BD
            </span>
          </button>
        </div>

        {/* ================= 2. CENTER: NAVIGATION LINKS (DESKTOP) ================= */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          
          {/* HOME */}
          <button
            type="button"
            onClick={handleHomeClick}
            className="text-[13px] font-bold uppercase tracking-wider text-gray-900 hover:text-[#725b38] transition-colors"
          >
            HOME
          </button>

          {/* Categories ⌵ */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              onMouseEnter={() => setCategoriesOpen(true)}
              className="flex items-center gap-1 text-[13px] font-bold text-gray-900 hover:text-[#725b38] transition-colors py-2"
            >
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-700 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {categoriesOpen && (
              <div 
                onMouseLeave={() => setCategoriesOpen(false)}
                className="absolute top-full left-0 w-64 bg-white mt-1 border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
              >
                <div className="px-4 py-2 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Select Collection Category
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(false);
                    if (onSelectCategory) onSelectCategory('formal-pant');
                  }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-800 hover:bg-gray-50 hover:text-[#725b38] flex items-center justify-between transition-colors border-b border-gray-100"
                >
                  <span>Formal Pant Collection</span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">4 Items</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(false);
                    if (onSelectCategory) onSelectCategory('solid-shirt');
                  }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold text-gray-800 hover:bg-gray-50 hover:text-[#725b38] flex items-center justify-between transition-colors border-b border-gray-100"
                >
                  <span>Formal Shirt Collection</span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">2 Items</span>
                </button>

                {PRODUCTS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setCategoriesOpen(false);
                      onSelectProduct(p);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-[#725b38] flex items-center gap-2.5 transition-colors"
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-sm"
                      style={{ backgroundColor: p.colorHex }}
                    />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COLLECTIONS */}
          <button
            type="button"
            onClick={handleCollectionsClick}
            className="text-[13px] font-bold uppercase tracking-wider text-gray-900 hover:text-[#725b38] transition-colors"
          >
            COLLECTIONS
          </button>

          {/* 🚚 TRACK ORDER */}
          <button
            type="button"
            onClick={onOpenTrackOrder}
            className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-gray-900 hover:text-[#2563eb] transition-colors"
          >
            <Truck className="w-4 h-4 text-[#2563eb]" />
            <span>TRACK ORDER</span>
          </button>

          {/* ☆ REVIEWS */}
          <button
            type="button"
            onClick={handleReviewsClick}
            className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-gray-900 hover:text-[#2563eb] transition-colors"
          >
            <Star className="w-4 h-4 text-[#2563eb]" />
            <span>REVIEWS</span>
          </button>

        </nav>

        {/* ================= 3. RIGHT: ACTION ICONS (MATCHING SCREENSHOT) ================= */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* 1. Search Icon */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="p-2 text-gray-800 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Search Popover */}
            {searchOpen && (
              <div className="absolute top-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-3 w-80 sm:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 z-50 animate-fadeIn">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search trousers, color or size..."
                    className="w-full text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button 
                      type="button" 
                      onClick={() => setSearchQuery('')}
                      className="text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {searchQuery.trim().length > 0 && (
                  <div className="mt-3 max-h-64 overflow-y-auto divide-y divide-gray-100">
                    {filteredProducts.length === 0 ? (
                      <div className="p-4 text-xs text-center text-gray-500">
                        No tailored trousers found for "{searchQuery}"
                      </div>
                    ) : (
                      filteredProducts.map(p => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onSelectProduct(p);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="py-2.5 px-2 hover:bg-gray-50 cursor-pointer rounded-lg flex items-center justify-between transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img src={p.imageUrl} alt={p.name} className="w-9 h-11 object-cover rounded" />
                            <div>
                              <div className="text-xs font-semibold text-gray-900">{p.name}</div>
                              <div className="text-[11px] text-gray-500">{p.colorName}</div>
                            </div>
                          </div>
                          <div className="text-xs font-bold text-[#725b38]">
                            ৳ {p.price.toLocaleString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Shopping Bag Icon with Cart Badge */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Cart"
            className="relative p-2 text-gray-800 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* 3. User Profile / Customer Account Icon */}
          <button
            type="button"
            onClick={onOpenCustomerAccount}
            aria-label="Customer Account Profile"
            title={activeCustomer ? `Customer Account: ${activeCustomer.name}` : "Sign In / Sign Up (অ্যাকাউন্ট খুলুন)"}
            className={`p-1.5 transition-all rounded-full flex items-center gap-1.5 cursor-pointer ${
              activeCustomer 
                ? 'bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111] pr-2.5' 
                : 'text-gray-800 hover:text-black hover:bg-gray-100 p-2'
            }`}
          >
            {activeCustomer ? (
              <>
                <div className="w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center text-xs font-bold font-serif shadow-sm">
                  {activeCustomer.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-gray-800 hidden md:inline max-w-[85px] truncate">
                  {activeCustomer.name.split(' ')[0]}
                </span>
              </>
            ) : (
              <User className="w-5 h-5 stroke-[2]" />
            )}
          </button>

          {/* 4. Mobile Hamburger Menu Toggle Button (Far Right on Mobile) */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            className="lg:hidden p-2 text-gray-800 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Admin Lock Access Icon (Desktop) */}
          {onOpenAdminLogin && (
            <button
              type="button"
              onClick={onOpenAdminLogin}
              aria-label="Admin Portal"
              title="Admin Portal Login"
              className="hidden lg:block p-2 text-gray-700 hover:text-[#725b38] hover:bg-[#725b38]/10 transition-colors rounded-full cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 stroke-[2]" />
            </button>
          )}

          {/* Vertical Divider (Desktop) */}
          <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden xl:block" />

          {/* Support 24/7 Pill Button (Desktop) */}
          <a
            href="tel:01327772213"
            className="hidden xl:flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gray-200/90 bg-[#f8f9fa] hover:bg-gray-100 transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#ea580c] shrink-0" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                SUPPORT 24/7
              </span>
              <span className="text-[13px] font-bold text-gray-900 tracking-tight">
                01327772213
              </span>
            </div>
          </a>

        </div>

      </div>

      {/* ================= 4. MOBILE DRAWER NAVIGATION ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between z-10 animate-fadeIn">
            <div>
              {/* Header with Logo & Close */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="font-sans font-black text-lg uppercase text-black">
                    ELEGAN BD
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-1 py-4 text-sm font-semibold">
                
                {/* Customer Account / Sign In Tile */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomerAccount();
                  }}
                  className="mb-2 p-3 bg-[#fbf9f5] border border-[#e5e2de] rounded-xl flex items-center justify-between text-left hover:bg-[#f5f3ef] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#725b38] text-white flex items-center justify-center font-bold text-sm">
                      {activeCustomer ? activeCustomer.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        {activeCustomer ? activeCustomer.name : 'Sign In / Sign Up'}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {activeCustomer ? `ID: ${activeCustomer.id}` : 'কাস্টমার অ্যাকাউন্ট খুলুন'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#725b38]">
                    {activeCustomer ? 'View Profile' : 'Open'}
                  </span>
                </button>

                {/* HOME */}
                <button 
                  type="button"
                  onClick={handleHomeClick}
                  className="py-3 px-2 text-left text-gray-900 hover:text-[#725b38] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  HOME
                </button>

                {/* Categories Accordion */}
                <div>
                  <button 
                    type="button"
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    className="w-full py-3 px-2 text-left text-gray-900 hover:text-[#725b38] hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>Categories</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="pl-4 pr-2 py-1 flex flex-col gap-1 bg-gray-50 rounded-lg my-1">
                      <button
                        type="button"
                        onClick={() => handleCategorySelect('all')}
                        className="py-2 px-2 text-left text-xs font-semibold text-gray-800 hover:text-[#725b38]"
                      >
                        All Formal Trousers (সব প্যান্ট)
                      </button>
                      {PRODUCTS.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onSelectProduct(p);
                          }}
                          className="py-2 px-2 text-left text-xs text-gray-600 hover:text-black flex items-center gap-2"
                        >
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" 
                            style={{ backgroundColor: p.colorHex }}
                          />
                          <span className="truncate">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* COLLECTIONS */}
                <button 
                  type="button"
                  onClick={handleCollectionsClick}
                  className="py-3 px-2 text-left text-gray-900 hover:text-[#725b38] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  COLLECTIONS
                </button>

                {/* 🚚 TRACK ORDER */}
                <button 
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrackOrder();
                  }}
                  className="py-3 px-2 text-left text-gray-900 hover:text-[#2563eb] hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-[#2563eb]" />
                  <span>TRACK ORDER</span>
                </button>

                {/* ☆ REVIEWS */}
                <button 
                  type="button"
                  onClick={handleReviewsClick}
                  className="py-3 px-2 text-left text-gray-900 hover:text-[#2563eb] hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Star className="w-4 h-4 text-[#2563eb]" />
                  <span>REVIEWS</span>
                </button>

                {/* 🔒 ADMIN PORTAL */}
                {onOpenAdminLogin && (
                  <button 
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdminLogin();
                    }}
                    className="py-3 px-2 text-left text-[#725b38] font-bold hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#725b38]" />
                    <span>ADMIN PORTAL</span>
                  </button>
                )}

              </div>
            </div>

            {/* Bottom Support Call Pill in Drawer */}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href="tel:01327772213"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-[#f8f9fa] hover:bg-gray-100 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#ea580c]" />
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                    SUPPORT 24/7
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    01327772213
                  </span>
                </div>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
