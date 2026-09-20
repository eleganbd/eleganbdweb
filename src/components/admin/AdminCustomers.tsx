import React, { useState } from 'react';
import { Users, Search, Phone, MapPin, ShoppingBag, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import { OrderDetails } from '../../types';

interface AdminCustomersProps {
  orders: OrderDetails[];
  onViewOrder: (order: OrderDetails) => void;
}

interface CustomerSummary {
  phone: string;
  name: string;
  district: string;
  address: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
  orders: OrderDetails[];
}

export const AdminCustomers: React.FC<AdminCustomersProps> = ({
  orders,
  onViewOrder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null);

  // Aggregate customer database from placed orders
  const customerMap = new Map<string, CustomerSummary>();

  orders.forEach(order => {
    const phoneKey = order.phone.trim();
    if (!phoneKey) return;

    if (!customerMap.has(phoneKey)) {
      customerMap.set(phoneKey, {
        phone: phoneKey,
        name: order.customerName,
        district: order.district,
        address: order.address,
        orderCount: 1,
        totalSpent: order.total,
        lastOrderDate: order.createdAt,
        orders: [order]
      });
    } else {
      const existing = customerMap.get(phoneKey)!;
      existing.orderCount += 1;
      existing.totalSpent += order.total;
      existing.orders.push(order);
    }
  });

  const customerList = Array.from(customerMap.values());

  const filteredCustomers = customerList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Customer Directory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            গ্রাহক তালিকা, মোবাইল নম্বর, ডেলিভারি ঠিকানা ও অর্ডার হিস্টোরি (Total: {customerList.length})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-600">
          <span>Unique Buyers: <b>{customerList.length}</b></span>
          <span className="text-gray-300">|</span>
          <span>Avg Lifetime Value: <b>৳{customerList.length ? Math.round(orders.reduce((s,o)=>s+o.total,0) / customerList.length).toLocaleString() : 0}</b></span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by Name, Phone, District, Address..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Location / District</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    কোন গ্রাহক পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.phone} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                          {cust.name.charAt(0)}
                        </div>
                        <span>{cust.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-mono text-gray-800 font-semibold">{cust.phone}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{cust.district}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">{cust.address}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-bold text-xs">
                        {cust.orderCount} {cust.orderCount === 1 ? 'Order' : 'Orders'}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-gray-900 text-sm">
                      ৳{cust.totalSpent.toLocaleString()}
                    </td>

                    <td className="py-4 px-4 text-gray-500 text-[11px]">
                      {cust.lastOrderDate}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-3 py-1.5 bg-[#151821] hover:bg-[#725b38] text-white rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        Profile & History
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-base">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-gray-500 font-mono text-[11px]">{selectedCustomer.phone}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              {/* Customer Stats Box */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Total Orders</div>
                  <div className="text-lg font-black text-gray-900 mt-0.5">{selectedCustomer.orderCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Total Revenue</div>
                  <div className="text-lg font-black text-[#725b38] mt-0.5">৳{selectedCustomer.totalSpent.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">Primary District</div>
                  <div className="text-lg font-black text-gray-900 mt-0.5">{selectedCustomer.district}</div>
                </div>
              </div>

              {/* Full Address */}
              <div className="p-3 bg-white border border-gray-200 rounded-xl">
                <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Registered Delivery Address</div>
                <div className="text-gray-800 font-medium">{selectedCustomer.address}, {selectedCustomer.district}</div>
              </div>

              {/* WhatsApp & Call Quick CTA */}
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/880${selectedCustomer.phone.replace(/^0+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Message</span>
                </a>
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  className="flex-1 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct Call</span>
                </a>
              </div>

              {/* Order History Timeline */}
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-2">Order History</h4>
                <div className="space-y-2">
                  {selectedCustomer.orders.map((ord) => (
                    <div key={ord.orderId} className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">Order #{ord.orderId}</div>
                        <div className="text-[11px] text-gray-500">{ord.createdAt} • {ord.items.length} items</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-gray-900">৳{ord.total.toLocaleString()}</div>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
