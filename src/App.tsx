/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AnnouncementMarquee } from './components/AnnouncementMarquee';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { ShopByCategory } from './components/ShopByCategory';
import { BestSellingProducts } from './components/BestSellingProducts';
import { AllCollections } from './components/AllCollections';
import { ReviewsSection } from './components/ReviewsSection';
import { DeliverySection } from './components/DeliverySection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CategoryPage } from './components/CategoryPage';
import { CheckoutPage } from './components/CheckoutPage';
import { TrackOrderModal } from './components/TrackOrderModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { MessageSquare, Phone } from 'lucide-react';
import { PRODUCTS, REVIEWS } from './data/products';
import { supabaseService } from './lib/supabase';
import { initMetaPixel, trackMetaPixelEvent } from './lib/metaPixel';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_STOCK_LOGS, 
  INITIAL_DOLLAR_EXPENSES, 
  INITIAL_PARTNERSHIPS, 
  INITIAL_GENERAL_EXPENSES, 
  INITIAL_ADMIN_USERS, 
  INITIAL_CMS_BANNER, 
  INITIAL_SETTINGS 
} from './data/adminInitialData';
import { 
  TrouserProduct, 
  CartItem, 
  SizeNumber, 
  HemStyle, 
  OrderDetails, 
  CategoryItem, 
  StockLog, 
  DollarExpense, 
  Partnership, 
  GeneralExpense, 
  AdminUser, 
  CMSBanner, 
  StoreSettings, 
  ReviewItem,
  CustomerAccount
} from './types';

export default function App() {
  // Customer Auth State (Saved in LocalStorage)
  const [activeCustomer, setActiveCustomer] = useState<CustomerAccount | null>(() => {
    try {
      const saved = localStorage.getItem('elegan_active_customer');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState<boolean>(false);

  // Admin Mode & Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Admin Manageable Entities
  const [productsList, setProductsList] = useState<TrouserProduct[]>(() => {
    try {
      const saved = localStorage.getItem('elegan_products_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('elegan_products_list', JSON.stringify(productsList));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [productsList]);
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('elegan_categories_list');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('elegan_categories_list', JSON.stringify(categoriesList));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [categoriesList]);
  const [stockLogsList, setStockLogsList] = useState<StockLog[]>(INITIAL_STOCK_LOGS);
  const [dollarExpensesList, setDollarExpensesList] = useState<DollarExpense[]>(INITIAL_DOLLAR_EXPENSES);
  const [partnershipsList, setPartnershipsList] = useState<Partnership[]>(INITIAL_PARTNERSHIPS);
  const [generalExpensesList, setGeneralExpensesList] = useState<GeneralExpense[]>(INITIAL_GENERAL_EXPENSES);
  const [adminUsersList, setAdminUsersList] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [cmsBannerData, setCmsBannerData] = useState<CMSBanner>(() => {
    try {
      const saved = localStorage.getItem('elegan_cms_banner');
      return saved ? JSON.parse(saved) : INITIAL_CMS_BANNER;
    } catch {
      return INITIAL_CMS_BANNER;
    }
  });
  const [storeSettingsData, setStoreSettingsData] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('elegan_store_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Initialize / Sync Meta Pixel
  useEffect(() => {
    initMetaPixel(storeSettingsData);
  }, [storeSettingsData]);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);

  // Shopping Cart State - preloaded with one luxury pair so the cart button has real total
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'sovereign-charcoal',
      name: 'The Sovereign Charcoal Slim',
      colorName: 'Charcoal Black',
      size: 32,
      hemStyle: 'standard',
      price: 1650,
      quantity: 1,
      imageUrl: PRODUCTS[0].imageUrl
    }
  ]);

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(['executive-midnight-navy']);

  // Filters and Product Details
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<TrouserProduct | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false);
  const [isAtelierModalOpen, setIsAtelierModalOpen] = useState<boolean>(false);

  // Track Meta Pixel ViewContent
  useEffect(() => {
    if (selectedProduct) {
      trackMetaPixelEvent('ViewContent', {
        content_name: selectedProduct.name,
        content_category: selectedProduct.category || 'Formal Pant',
        value: selectedProduct.price,
        currency: 'BDT'
      });
    }
  }, [selectedProduct]);

  // Track Meta Pixel InitiateCheckout
  useEffect(() => {
    if (isCartOpen) {
      trackMetaPixelEvent('InitiateCheckout', {
        num_items: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        value: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        currency: 'BDT'
      });
    }
  }, [isCartOpen]);

  // Voucher
  const [appliedVoucher, setAppliedVoucher] = useState<string>('');

  // Orders History - Dynamic state initialized empty, synced with localStorage & Supabase
  const [placedOrders, setPlacedOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('elegan_placed_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    try {
      localStorage.setItem('elegan_placed_orders', JSON.stringify(placedOrders));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [placedOrders]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const handleAddToCart = (product: TrouserProduct, size: SizeNumber, hem: HemStyle = 'standard', qty: number = 1) => {
    const existingIndex = cartItems.findIndex(
      item => item.productId === product.id && item.size === size && item.hemStyle === hem
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        name: product.name,
        colorName: product.colorName,
        size,
        hemStyle: hem,
        price: product.price,
        quantity: qty,
        imageUrl: product.imageUrl
      };
      setCartItems(prev => [newItem, ...prev]);
    }

    showToast(`Added ${product.name} (Size ${size}) to Bag`);

    // Track Meta Pixel AddToCart event
    trackMetaPixelEvent('AddToCart', {
      content_name: product.name,
      content_type: 'product',
      value: product.price * qty,
      currency: 'BDT'
    });
  };

  const handleQuickOrder = (product: TrouserProduct, size: SizeNumber, hem: HemStyle = 'standard', qty: number = 1) => {
    handleAddToCart(product, size, hem, qty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSize = (id: string, newSize: SizeNumber) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, size: newSize } : item)
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(prev => prev.filter(id => id !== productId));
      showToast('Removed from wishlist');
    } else {
      setWishlistIds(prev => [...prev, productId]);
      showToast('Saved to your private wishlist');
    }
  };

  // Load Supabase Data on App Mount (Orders, Products, Banner)
  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const remoteOrders = await supabaseService.getOrders();
        if (remoteOrders && remoteOrders.length > 0) {
          setPlacedOrders(prev => {
            const remoteIds = new Set(remoteOrders.map(o => o.orderId));
            const localOnly = prev.filter(o => !remoteIds.has(o.orderId));
            return [...remoteOrders, ...localOnly];
          });
        }

        const remoteProducts = await supabaseService.getProducts();
        if (remoteProducts && remoteProducts.length > 0) {
          setProductsList(prev => {
            const remoteIds = new Set(remoteProducts.map(p => p.id));
            const localOnly = prev.filter(p => !remoteIds.has(p.id));
            return [...remoteProducts, ...localOnly];
          });
        }

        const remoteBanner = await supabaseService.getBanner();
        if (remoteBanner) {
          setCmsBannerData(remoteBanner);
        }

        const remoteSettings = await supabaseService.getStoreSettings();
        if (remoteSettings) {
          setStoreSettingsData(remoteSettings);
        }
      } catch (e) {
        console.warn('Initial Supabase fetch note:', e);
      }
    };
    fetchRemoteData();
  }, []);

  const handleOrderPlaced = (order: OrderDetails) => {
    setPlacedOrders(prev => [order, ...prev]);
    setCartItems([]);
    showToast(`Order ${order.orderId} Confirmed with Cash on Delivery!`);
    
    // Track Meta Pixel Purchase event
    trackMetaPixelEvent('Purchase', {
      value: order.total,
      currency: 'BDT',
      num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
      order_id: order.orderId
    });

    // Async push to Supabase
    supabaseService.saveOrder(order);
  };

  // Customer Account Handlers
  const handleCustomerLogin = (customer: CustomerAccount) => {
    setActiveCustomer(customer);
    try {
      localStorage.setItem('elegan_active_customer', JSON.stringify(customer));
    } catch {
      // ignore
    }
    showToast(`স্বাগতম, ${customer.name}!`);
  };

  const handleCustomerLogout = () => {
    setActiveCustomer(null);
    try {
      localStorage.removeItem('elegan_active_customer');
    } catch {
      // ignore
    }
    showToast('লগআউট সফল হয়েছে');
  };

  const handleCustomerUpdate = (updated: CustomerAccount) => {
    setActiveCustomer(updated);
    try {
      localStorage.setItem('elegan_active_customer', JSON.stringify(updated));
      const accountsRaw = localStorage.getItem('elegan_customer_accounts');
      if (accountsRaw) {
        const accs: CustomerAccount[] = JSON.parse(accountsRaw);
        const updatedList = accs.map(a => a.id === updated.id ? updated : a);
        localStorage.setItem('elegan_customer_accounts', JSON.stringify(updatedList));
      }
    } catch {
      // ignore
    }
    // Async sync to Supabase
    supabaseService.saveCustomer(updated);
    showToast('Profile preferences saved');
  };

  // Admin Order Status Update & Deletion
  const handleUpdateOrderStatus = (orderId: string, status: OrderDetails['status']) => {
    setPlacedOrders(prev =>
      prev.map(o => o.orderId === orderId ? { ...o, status } : o)
    );
    // Async sync to Supabase
    supabaseService.updateOrderStatus(orderId, status);
    showToast(`Order #${orderId} status updated to ${status.toUpperCase()}`);
  };

  const handleDeleteOrder = async (orderId: string) => {
    setPlacedOrders(prev => prev.filter(o => o.orderId !== orderId));
    // Delete from Supabase Cloud Database
    await supabaseService.deleteOrder(orderId);
    showToast(`Order #${orderId} সফলভাবে Supabase ও স্টোর থেকে মুছে ফেলা হয়েছে`);
  };

  // Admin Products CRUD
  const handleAddProduct = (newProd: TrouserProduct) => {
    setProductsList(prev => [newProd, ...prev]);
    supabaseService.saveProduct(newProd);
    showToast(`Product "${newProd.name}" added & saved to Supabase`);
  };

  const handleUpdateProduct = (updatedProd: TrouserProduct) => {
    setProductsList(prev =>
      prev.map(p => p.id === updatedProd.id ? updatedProd : p)
    );
    supabaseService.saveProduct(updatedProd);
    showToast(`Product "${updatedProd.name}" updated & synced`);
  };

  const handleDeleteProduct = async (id: string) => {
    const target = productsList.find(p => p.id === id);
    setProductsList(prev => prev.filter(p => p.id !== id));
    await supabaseService.deleteProduct(id);
    showToast(`Product "${target?.name || id}" successfully deleted from store & Supabase`);
  };

  // Admin Categories CRUD
  const handleAddCategory = (newCat: CategoryItem) => {
    setCategoriesList(prev => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added`);
  };

  const handleUpdateCategory = (updatedCat: CategoryItem) => {
    setCategoriesList(prev =>
      prev.map(c => c.id === updatedCat.id ? updatedCat : c)
    );
    showToast(`Category "${updatedCat.name}" updated`);
  };

  const handleDeleteCategory = (id: string) => {
    setCategoriesList(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted');
  };

  // Admin Inventory Logs
  const handleAddStockLog = (log: StockLog) => {
    setStockLogsList(prev => [log, ...prev]);
    showToast(`Stock ${log.type === 'in' ? 'In' : 'Out'} logged successfully`);
  };

  const handleUpdateProductStock = (productId: string, sizeStockMap: Record<string, number>) => {
    setProductsList(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        stockPerSize: {
          ...(p.stockPerSize || {}),
          ...sizeStockMap
        }
      };
    }));
    showToast(`Stock updated successfully`);
  };

  // Admin Finance Handlers
  const handleAddDollarExpense = (exp: DollarExpense) => {
    setDollarExpensesList(prev => [exp, ...prev]);
    showToast(`USD Expense $${exp.usdAmount} recorded`);
  };

  const handleAddGeneralExpense = (exp: GeneralExpense) => {
    setGeneralExpensesList(prev => [exp, ...prev]);
    showToast(`Expense ৳${exp.amount} recorded`);
  };

  const handleAddPartnership = (partner: Partnership) => {
    setPartnershipsList(prev => [...prev, partner]);
    showToast(`Partner ${partner.partnerName} added`);
  };

  // Admin Reviews Handlers
  const handleAddReview = (rev: ReviewItem) => {
    setReviewsList(prev => [rev, ...prev]);
    showToast('Review added & published');
  };

  const handleDeleteReview = (id: string) => {
    setReviewsList(prev => prev.filter(r => r.id !== id));
    showToast('Review deleted');
  };

  // Admin Users Handlers
  const handleAddAdmin = (user: AdminUser) => {
    setAdminUsersList(prev => [...prev, user]);
    showToast(`Admin user "${user.name}" created`);
  };

  const handleDeleteAdmin = (id: string) => {
    setAdminUsersList(prev => prev.filter(u => u.id !== id));
    showToast('Admin user removed');
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ==========================================
  // IF ADMIN IS LOGGED IN, RENDER ADMIN LAYOUT
  // ==========================================
  if (isAdminLoggedIn) {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold tracking-wide border border-white/20 animate-fadeIn flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{toastMessage}</span>
          </div>
        )}

        <AdminLayout
          orders={placedOrders}
          products={productsList}
          categories={categoriesList}
          stockLogs={stockLogsList}
          dollarExpenses={dollarExpensesList}
          partnerships={partnershipsList}
          generalExpenses={generalExpensesList}
          adminUsers={adminUsersList}
          cmsBanner={cmsBannerData}
          storeSettings={storeSettingsData}
          reviews={reviewsList}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddStockLog={handleAddStockLog}
          onUpdateProductStock={handleUpdateProductStock}
          onAddDollarExpense={handleAddDollarExpense}
          onAddGeneralExpense={handleAddGeneralExpense}
          onAddPartnership={handleAddPartnership}
          onAddReview={handleAddReview}
          onDeleteReview={handleDeleteReview}
          onAddAdmin={handleAddAdmin}
          onDeleteAdmin={handleDeleteAdmin}
          onUpdateBanner={(b) => {
            setCmsBannerData(b);
            try {
              localStorage.setItem('elegan_cms_banner', JSON.stringify(b));
            } catch (e) {
              console.warn('Banner localStorage save error:', e);
            }
            supabaseService.saveBanner(b);
            showToast('হোমপেজ হিরো ব্যানার সফলভাবে আপডেট এবং সুপাবেসে সেভ হয়েছে!');
          }}
          onUpdateSettings={(s) => {
            setStoreSettingsData(s);
            try {
              localStorage.setItem('elegan_store_settings', JSON.stringify(s));
            } catch (e) {
              console.warn('Settings localStorage save error:', e);
            }
            supabaseService.saveStoreSettings(s);
            showToast('মেটা পিক্সেল ও স্টোর সেটিংস সফলভাবে সেভ হয়েছে!');
          }}
          onLogout={() => {
            setIsAdminLoggedIn(false);
            showToast('Admin logged out successfully');
          }}
          onGoToStorefront={() => {
            setIsAdminLoggedIn(false);
          }}
        />
      </>
    );
  }

  // ==========================================
  // OTHERWISE RENDER CUSTOMER STOREFRONT
  // ==========================================
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] relative selection:bg-[#725b38] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white px-5 py-3 rounded-full shadow-2xl text-xs font-semibold tracking-wide border border-white/20 animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#fedeb2]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar 
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenCustomerAccount={() => setIsCustomerModalOpen(true)}
        activeCustomer={activeCustomer}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onSelectProduct={(p) => {
          setIsCheckoutOpen(false);
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => {
          setIsCheckoutOpen(false);
          setSelectedProduct(null);
          setSelectedCategorySlug(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(category) => {
          setIsCheckoutOpen(false);
          setSelectedProduct(null);
          setSelectedCategorySlug(category);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFilterChange={(filter) => {
          setIsCheckoutOpen(false);
          setSelectedProduct(null);
          setSelectedCategorySlug(null);
          setActiveFilter(filter);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pt-16 sm:pt-20">
        {isCheckoutOpen ? (
          <CheckoutPage 
            items={cartItems}
            activeCustomer={activeCustomer}
            onOpenCustomerModal={() => setIsCustomerModalOpen(true)}
            onBack={() => {
              setIsCheckoutOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdateSize={handleUpdateSize}
            onRemoveItem={handleRemoveItem}
            onOrderPlaced={(order) => {
              handleOrderPlaced(order);
            }}
            onAddMoreProducts={() => {
              setIsCheckoutOpen(false);
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct}
            allProducts={productsList}
            onBack={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onQuickOrder={handleQuickOrder}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        ) : selectedCategorySlug ? (
          <CategoryPage 
            categoryTitle={
              selectedCategorySlug === 'formal-pant' || selectedCategorySlug === 'pant' ? 'Formal Pant' :
              selectedCategorySlug === 'solid-shirt' || selectedCategorySlug === 'shirt' ? 'Formal Shirt' :
              selectedCategorySlug === 'tailored-blazer' || selectedCategorySlug === 'blazer' ? 'Tailored Blazer' :
              selectedCategorySlug === 'knit-polo' || selectedCategorySlug === 'polo' ? 'Knit Polo' :
              selectedCategorySlug.replace('-', ' ')
            }
            categorySlug={selectedCategorySlug}
            products={productsList}
            onBack={() => {
              setSelectedCategorySlug(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickOrder={handleQuickOrder}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        ) : (
          <>
            {/* Top Announcement Marquee Bar (Above Hero Banner) */}
            <AnnouncementMarquee />

            {/* 1. Hero Section */}
            <HeroSection 
              banner={cmsBannerData}
              onExploreCollection={() => {
                const el = document.getElementById('shop-categories') || document.querySelector('section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreFitMatrix={() => {
                setSelectedProduct(productsList[0] || PRODUCTS[0]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Trust & Guarantee Bar (Hero Bottom) */}
            <TrustBar />

            {/* Shop By Category Slider */}
            <ShopByCategory 
              categories={categoriesList}
              onSelectCategory={(categoryId) => {
                setSelectedProduct(null);
                setSelectedCategorySlug(categoryId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Best Selling Products Grid */}
            <BestSellingProducts 
              products={productsList}
              onSelectProduct={(product) => {
                setSelectedProduct(product);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickOrder={handleQuickOrder}
            />

            {/* All Collections Grid */}
            <AllCollections 
              products={productsList}
              onSelectProduct={(product) => {
                setSelectedProduct(product);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickOrder={handleQuickOrder}
            />

            {/* 8. Nationwide Delivery Transparency */}
            <DeliverySection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onFilterChange={(filter) => {
          setSelectedProduct(null);
          setActiveFilter(filter);
          scrollToSection('featured-collection');
        }}
      />

      {/* Floating Fast Action WhatsApp Bar */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <a
          href="https://wa.me/8801631496122"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all text-xs font-bold uppercase tracking-wider group"
          title="Direct WhatsApp Concierge"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Concierge</span>
        </a>
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderPlaced={handleOrderPlaced}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={(code) => {
          setAppliedVoucher(code);
          showToast(`Voucher ${code} applied to bag`);
        }}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Track Order Modal */}
      <TrackOrderModal 
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        recentOrders={placedOrders}
      />

      {/* Customer Account & Auth Modal */}
      <CustomerAuthModal 
        isOpen={isCustomerModalOpen}
        onClose={() => setIsCustomerModalOpen(false)}
        activeCustomer={activeCustomer}
        onLogin={handleCustomerLogin}
        onLogout={handleCustomerLogout}
        onUpdateCustomer={handleCustomerUpdate}
        orders={placedOrders}
        onOpenTrack={() => setIsTrackOrderOpen(true)}
      />

      {/* Secure Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccessLogin={() => {
          setIsAdminLoginOpen(false);
          setIsAdminLoggedIn(true);
          showToast('Welcome to ELEGAN BD Admin Panel');
        }}
      />

    </div>
  );
}

