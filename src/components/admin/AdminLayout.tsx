import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Users, 
  Boxes, 
  Star, 
  DollarSign, 
  Image as ImageIcon, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Store, 
  Bell, 
  ChevronRight,
  Sparkles,
  Database
} from 'lucide-react';

// Sub-components
import { AdminDashboard } from './AdminDashboard';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminCustomers } from './AdminCustomers';
import { AdminInventory } from './AdminInventory';
import { AdminFinance } from './AdminFinance';
import { AdminBannerCMS } from './AdminBannerCMS';
import { AdminUsers } from './AdminUsers';
import { AdminSettings } from './AdminSettings';
import { AdminSupabase } from './AdminSupabase';

import { 
  OrderDetails, 
  TrouserProduct, 
  CategoryItem, 
  StockLog, 
  DollarExpense, 
  Partnership, 
  GeneralExpense, 
  AdminUser, 
  CMSBanner, 
  StoreSettings, 
  ReviewItem 
} from '../../types';

interface AdminLayoutProps {
  orders: OrderDetails[];
  products: TrouserProduct[];
  categories: CategoryItem[];
  stockLogs: StockLog[];
  dollarExpenses: DollarExpense[];
  partnerships: Partnership[];
  generalExpenses: GeneralExpense[];
  adminUsers: AdminUser[];
  cmsBanner: CMSBanner;
  storeSettings: StoreSettings;
  reviews: ReviewItem[];

  onUpdateOrderStatus: (orderId: string, status: OrderDetails['status']) => void;
  onDeleteOrder?: (orderId: string) => void;
  onAddProduct: (product: TrouserProduct) => void;
  onUpdateProduct: (product: TrouserProduct) => void;
  onDeleteProduct: (id: string) => void;
  onAddCategory: (cat: CategoryItem) => void;
  onUpdateCategory: (cat: CategoryItem) => void;
  onDeleteCategory: (id: string) => void;
  onAddStockLog: (log: StockLog) => void;
  onUpdateProductStock: (productId: string, sizeStockMap: Record<string, number>) => void;
  onAddDollarExpense: (exp: DollarExpense) => void;
  onAddGeneralExpense: (exp: GeneralExpense) => void;
  onAddPartnership: (part: Partnership) => void;
  onAddReview: (review: ReviewItem) => void;
  onDeleteReview: (id: string) => void;
  onAddAdmin: (user: AdminUser) => void;
  onDeleteAdmin: (id: string) => void;
  onUpdateBanner: (banner: CMSBanner) => void;
  onUpdateSettings: (settings: StoreSettings) => void;

  onLogout: () => void;
  onGoToStorefront: () => void;
}

export type AdminTab = 
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'customers'
  | 'inventory'
  | 'finance'
  | 'supabase'
  | 'banner'
  | 'admin_users'
  | 'settings';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  orders,
  products,
  categories,
  stockLogs,
  dollarExpenses,
  partnerships,
  generalExpenses,
  adminUsers,
  cmsBanner,
  storeSettings,
  reviews,
  onUpdateOrderStatus,
  onDeleteOrder,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onAddStockLog,
  onUpdateProductStock,
  onAddDollarExpense,
  onAddGeneralExpense,
  onAddPartnership,
  onAddReview,
  onDeleteReview,
  onAddAdmin,
  onDeleteAdmin,
  onUpdateBanner,
  onUpdateSettings,
  onLogout,
  onGoToStorefront
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOrderModal, setSelectedOrderModal] = useState<OrderDetails | null>(null);

  const pendingOrdersCount = orders.filter(o => o.status === 'confirmed').length;

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'supabase', label: 'Supabase Cloud', icon: Database },
    { id: 'banner', label: 'Banner & CMS', icon: ImageIcon },
    { id: 'admin_users', label: 'Admin Users', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1f2937] flex flex-col font-sans">
      
      {/* 1. TOP EXECUTIVE HEADER */}
      <header className="h-14 sm:h-16 bg-[#111317] text-white border-b border-white/10 flex items-center justify-between px-3 sm:px-6 shrink-0 sticky top-0 z-40">
        {/* Left: 3-line Toggle + Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 sm:p-2 text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Toggle Sidebar Menu"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif font-black tracking-tight text-base sm:text-lg text-white">
              ELEGAN BD
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#725b38]/40 text-[#fedeb2] border border-[#725b38]/50">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Right: Live store, Admin status, Notification, Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onGoToStorefront}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold transition-colors border border-white/10 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Store</span>
          </button>

          {/* Pending notification bell */}
          <div className="relative">
            <button
              onClick={() => setActiveTab('orders')}
              className="p-1.5 sm:p-2 text-gray-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              title="Pending Orders"
            >
              <Bell className="w-4 h-4" />
              {pendingOrdersCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              )}
            </button>
          </div>

          {/* Admin User Badge */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="w-7 h-7 rounded-lg bg-[#725b38] text-white flex items-center justify-center font-bold text-xs">
              E
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-white text-[11px] leading-tight">eleganbd@gmail.com</div>
              <div className="text-[9.5px] text-emerald-400 font-semibold">Super Admin</div>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="p-1.5 sm:p-2 text-gray-300 hover:text-red-400 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Logout from Admin Panel"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN BODY: SIDEBAR + CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR (Compact box, larger text) */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-52 sm:w-56' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'
          } bg-[#151821] text-white transition-all duration-300 ease-in-out shrink-0 border-r border-white/5 flex flex-col justify-between overflow-y-auto z-30`}
        >
          {/* Menu Options */}
          <div className="p-2 space-y-0.5">
            <div className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 ${!isSidebarOpen && 'hidden md:block md:text-center md:px-0'}`}>
              {isSidebarOpen ? 'Navigation' : '•'}
            </div>

            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#725b38] text-white shadow-sm font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className={`${!isSidebarOpen && 'hidden'} truncate text-[13.5px] sm:text-sm`}>{item.label}</span>
                  
                  {item.badge !== undefined && isSidebarOpen && (
                    <span className="ml-auto bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer: Logout */}
          <div className="p-2 border-t border-white/5">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-[18px] h-[18px] shrink-0" />
              <span className={`${!isSidebarOpen && 'hidden'}`}>Logout</span>
            </button>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            
            {activeTab === 'dashboard' && (
              <AdminDashboard
                orders={orders}
                products={products}
                onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
                onViewOrder={(ord) => {
                  setSelectedOrderModal(ord);
                  setActiveTab('orders');
                }}
              />
            )}

            {activeTab === 'orders' && (
              <AdminOrders
                orders={orders}
                onUpdateOrderStatus={onUpdateOrderStatus}
                onDeleteOrder={onDeleteOrder}
                selectedOrderModal={selectedOrderModal}
                onSelectOrder={setSelectedOrderModal}
              />
            )}

            {activeTab === 'products' && (
              <AdminProducts
                products={products}
                categories={categories}
                onAddProduct={onAddProduct}
                onUpdateProduct={onUpdateProduct}
                onDeleteProduct={onDeleteProduct}
              />
            )}

            {activeTab === 'categories' && (
              <AdminCategories
                categories={categories}
                products={products}
                onAddCategory={onAddCategory}
                onUpdateCategory={onUpdateCategory}
                onDeleteCategory={onDeleteCategory}
              />
            )}

            {activeTab === 'customers' && (
              <AdminCustomers
                orders={orders}
                onViewOrder={(ord) => {
                  setSelectedOrderModal(ord);
                  setActiveTab('orders');
                }}
              />
            )}

            {activeTab === 'inventory' && (
              <AdminInventory
                products={products}
                stockLogs={stockLogs}
                onAddStockLog={onAddStockLog}
                onUpdateProductStock={onUpdateProductStock}
              />
            )}

            {activeTab === 'finance' && (
              <AdminFinance
                orders={orders}
                dollarExpenses={dollarExpenses}
                partnerships={partnerships}
                generalExpenses={generalExpenses}
                onAddDollarExpense={onAddDollarExpense}
                onAddGeneralExpense={onAddGeneralExpense}
                onAddPartnership={onAddPartnership}
              />
            )}

            {activeTab === 'supabase' && (
              <AdminSupabase
                orders={orders}
                products={products}
                stockLogs={stockLogs}
                dollarExpenses={dollarExpenses}
                generalExpenses={generalExpenses}
                reviews={reviews}
              />
            )}

            {activeTab === 'banner' && (
              <AdminBannerCMS
                banner={cmsBanner}
                settings={storeSettings}
                products={products}
                onUpdateBanner={onUpdateBanner}
                onUpdateSettings={onUpdateSettings}
              />
            )}

            {activeTab === 'admin_users' && (
              <AdminUsers
                adminUsers={adminUsers}
                onAddAdmin={onAddAdmin}
                onDeleteAdmin={onDeleteAdmin}
              />
            )}

            {activeTab === 'settings' && (
              <AdminSettings
                settings={storeSettings}
                onUpdateSettings={onUpdateSettings}
              />
            )}

          </div>
        </main>
      </div>

    </div>
  );
};
