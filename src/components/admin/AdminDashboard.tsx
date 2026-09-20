import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle, 
  Plus, 
  Package, 
  Truck, 
  ExternalLink 
} from 'lucide-react';
import { OrderDetails, TrouserProduct } from '../../types';

interface AdminDashboardProps {
  orders: OrderDetails[];
  products: TrouserProduct[];
  onNavigateTab: (tab: string) => void;
  onViewOrder: (order: OrderDetails) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  onNavigateTab,
  onViewOrder
}) => {
  // Calculations - Strictly dynamic from live orders
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrdersCount = orders.length;
  
  const pendingOrders = orders.filter(o => o.status === 'confirmed' || o.status === 'inspecting');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const dispatchedOrders = orders.filter(o => o.status === 'dispatched' || o.status === 'out_for_delivery');

  // Unique customers based on phone number
  const uniquePhones = new Set(orders.map(o => o.phone.trim()).filter(Boolean));
  const totalCustomers = uniquePhones.size;

  // Total Sales (Gross billings across all placed orders)
  const totalSales = totalRevenue;

  // Low stock products
  const lowStockCount = products.filter(p => p.stockStatus === 'Fast Moving' || p.stockStatus === 'Low Stock').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Greeting */}
      <div className="bg-[#151821] border border-white/10 rounded-2xl p-6 sm:p-7 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Live Atelier Commerce Engine
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            ELEGAN BD Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            লাইভ বিক্রয়, রিয়েল-টাইম অর্ডার প্রসেসিং ও ইনভেন্টরি পরিস্থিতি এক নজরে পর্যবেক্ষণ করুন।
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigateTab('products')}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Manage Orders</span>
          </button>
        </div>
      </div>

      {/* Main 6 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* 1. TOTAL SALES */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">TOTAL SALES</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">
            ৳{totalSales.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{totalOrdersCount > 0 ? `${totalOrdersCount} Orders Active` : 'Real-time Live Sync'}</span>
          </div>
        </div>

        {/* 2. Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">
            {totalOrdersCount}
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-1">
            Lifetime orders recorded
          </div>
        </div>

        {/* 3. Pending Orders */}
        <div className="bg-white rounded-2xl p-5 border border-amber-200 bg-amber-50/20 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-amber-600 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Pending Orders</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-900 tracking-tight">
            {pendingOrders.length}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            Requires inspection & dispatch
          </div>
        </div>

        {/* 4. Delivered Orders */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Delivered Orders</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">
            {deliveredOrders.length}
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-1">
            Successfully completed
          </div>
        </div>

        {/* 5. Total Customers */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Total Customers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">
            {totalCustomers}
          </div>
          <div className="text-[11px] text-gray-500 font-medium mt-1">
            Verified buyer profiles
          </div>
        </div>

        {/* 6. মোট Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-[#725b38]/30 bg-[#fbf9f5] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#725b38] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#725b38]">মোট Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 tracking-tight">
            ৳{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#725b38] font-bold mt-1">
            Gross customer billings
          </div>
        </div>

      </div>

      {/* Grid: Recent Orders & Stock / Status Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-sans font-bold text-base text-gray-900">
                Recent Customer Orders
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                সরাসরি অর্ডার হিস্টোরি ও ট্র্যাকিং স্ট্যাটাস
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-[#725b38] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-y border-gray-100">
                <tr>
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Items</th>
                  <th className="py-3 px-3">Total (COD)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400">
                      <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="font-medium text-gray-600">এখনো কোনো অর্ডার নেই (No orders placed yet)</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">নতুন অর্ডার প্লেস হওয়ার সাথে সাথে এখানে রিয়েল-টাইমে শো করবে।</p>
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-3 font-bold text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-gray-900">{order.customerName}</div>
                        <div className="text-[11px] text-gray-500">{order.phone}</div>
                      </td>
                      <td className="py-3 px-3 text-gray-600">
                        {order.district}
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} pcs
                      </td>
                      <td className="py-3 px-3 font-bold text-gray-900">
                        ৳{order.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'out_for_delivery' || order.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'inspecting' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => onViewOrder(order)}
                          className="px-2.5 py-1 text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Quick Status & Inventory Alerts */}
        <div className="space-y-6">
          
          {/* Inventory Alert Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-sans font-bold text-sm text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Stock & Inventory Alert</span>
              </h3>
              <button 
                onClick={() => onNavigateTab('inventory')}
                className="text-xs font-bold text-[#725b38] hover:underline cursor-pointer"
              >
                Stock In/Out
              </button>
            </div>

            <div className="space-y-3">
              {products.slice(0, 3).map((prod) => (
                <div key={prod.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <img src={prod.imageUrl} alt={prod.name} className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-bold text-gray-900 line-clamp-1">{prod.name}</div>
                      <div className="text-[10px] text-gray-500">{prod.colorName}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    prod.stockStatus === 'Fast Moving' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {prod.stockStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hub Shortcuts */}
          <div className="bg-[#151821] rounded-2xl p-6 border border-white/10 text-white shadow-lg">
            <h3 className="font-sans font-bold text-sm text-white mb-3">
              Executive Direct Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab('inventory')}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-[#fedeb2] mb-1">📦 Stock In</div>
                <div className="text-[11px] text-gray-400">নতুন লট এন্ট্রি করুন</div>
              </button>
              <button
                onClick={() => onNavigateTab('finance')}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-emerald-400 mb-1">💵 Dollar Expense</div>
                <div className="text-[11px] text-gray-400">Ads ও খরচ হিসেব</div>
              </button>
              <button
                onClick={() => onNavigateTab('categories')}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-blue-400 mb-1">👔 Categories</div>
                <div className="text-[11px] text-gray-400">Shirt / Pant / Others</div>
              </button>
              <button
                onClick={() => onNavigateTab('settings')}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-purple-400 mb-1">⚙️ Delivery Setup</div>
                <div className="text-[11px] text-gray-400">Dhaka ৳70 / Outside ৳130</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
