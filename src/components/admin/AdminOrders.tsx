import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Printer, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  ChevronRight, 
  MessageSquare,
  Package,
  Eye,
  FileText,
  Trash2,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { OrderDetails } from '../../types';

interface AdminOrdersProps {
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, status: OrderDetails['status']) => void;
  selectedOrderModal: OrderDetails | null;
  onSelectOrder: (order: OrderDetails | null) => void;
  onDeleteOrder?: (orderId: string) => void;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({
  orders,
  onUpdateOrderStatus,
  selectedOrderModal,
  onSelectOrder,
  onDeleteOrder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [orderToDelete, setOrderToDelete] = useState<OrderDetails | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesDistrict = selectedDistrict === 'all' || order.district.toLowerCase() === selectedDistrict.toLowerCase();

    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    setIsDeleting(true);
    try {
      if (onDeleteOrder) {
        onDeleteOrder(orderToDelete.orderId);
      }
      if (selectedOrderModal && selectedOrderModal.orderId === orderToDelete.orderId) {
        onSelectOrder(null);
      }
    } finally {
      setIsDeleting(false);
      setOrderToDelete(null);
    }
  };

  const getStatusBadge = (status: OrderDetails['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> Pending</span>;
      case 'inspecting':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 flex items-center gap-1 w-fit"><Package className="w-3 h-3" /> Inspecting</span>;
      case 'dispatched':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1 w-fit"><Truck className="w-3 h-3" /> Dispatched</span>;
      case 'out_for_delivery':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 flex items-center gap-1 w-fit"><Truck className="w-3 h-3" /> Out For Delivery</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Delivered</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 flex items-center gap-1 w-fit"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return null;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Orders Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            সকল কাস্টমার অর্ডার, পেমেন্ট ও ডেলিভারি স্ট্যাটাস পরিচালনা করুন (Total: {orders.length})
          </p>
        </div>

        {/* Quick summary pill */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-600">
          <span>Pending: <b>{orders.filter(o => o.status === 'confirmed').length}</b></span>
          <span className="text-gray-300">|</span>
          <span>In Transit: <b>{orders.filter(o => o.status === 'dispatched' || o.status === 'out_for_delivery').length}</b></span>
          <span className="text-gray-300">|</span>
          <span>Delivered: <b>{orders.filter(o => o.status === 'delivered').length}</b></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, Customer Name, Phone, District..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'confirmed', 'inspecting', 'dispatched', 'delivered', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                statusFilter === tab
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'confirmed' ? 'Pending' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Delivery Location</th>
                <th className="py-3.5 px-4">Items & Sizes</th>
                <th className="py-3.5 px-4">Total (COD)</th>
                <th className="py-3.5 px-4">Status & Action</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    কোন অর্ডার পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 text-sm">{order.orderId}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{order.createdAt}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{order.customerName}</div>
                      <div className="text-gray-500 font-mono text-[11px] flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <a href={`tel:${order.phone}`} className="hover:underline text-gray-700">
                          {order.phone}
                        </a>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{order.district}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">{order.address}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-black"></span>
                            <span className="font-medium text-gray-800 line-clamp-1 max-w-[180px]">
                              {item.name}
                            </span>
                            <span className="px-1.5 py-0.2 bg-gray-100 text-gray-700 rounded text-[10px] font-bold">
                              Size {item.size}
                            </span>
                            <span className="text-gray-400">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-900 text-sm">৳{order.total.toLocaleString()}</div>
                      <div className="text-[10px] font-semibold text-emerald-700 uppercase bg-emerald-50 px-1.5 py-0.5 rounded w-fit mt-0.5">
                        Cash on Delivery
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-2">
                        {getStatusBadge(order.status)}
                        
                        {/* Quick status dropdown */}
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.orderId, e.target.value as OrderDetails['status'])}
                          className="text-[11px] py-1 px-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium cursor-pointer focus:outline-none"
                        >
                          <option value="confirmed">Pending (Confirmed)</option>
                          <option value="inspecting">Inspecting</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="out_for_delivery">Out For Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectOrder(order)}
                          className="px-3 py-1.5 bg-[#151821] hover:bg-[#725b38] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                          title="View Order Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderToDelete(order)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer"
                          title="Delete Order (মুছে ফেলুন)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Printable Invoice Modal */}
      {selectedOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-[#151821] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#fedeb2]" />
                <div>
                  <h2 className="font-bold text-base">Invoice / Order #{selectedOrderModal.orderId}</h2>
                  <p className="text-xs text-gray-400">Placed: {selectedOrderModal.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => onSelectOrder(null)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-800">
              
              {/* Customer & Shipping Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Customer Information
                  </div>
                  <div className="font-bold text-sm text-gray-900">{selectedOrderModal.customerName}</div>
                  <div className="text-gray-600 mt-1 font-mono">{selectedOrderModal.phone}</div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={`https://wa.me/880${selectedOrderModal.phone.replace(/^0+/, '')}?text=Hello%20${selectedOrderModal.customerName}%2C%20from%20Elegan%20BD%20regarding%20your%20Order%20${selectedOrderModal.orderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 hover:bg-emerald-100 font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Shipping & Delivery Address
                  </div>
                  <div className="font-bold text-gray-900">{selectedOrderModal.district} District</div>
                  <div className="text-gray-600 mt-1 leading-relaxed">{selectedOrderModal.address}</div>
                  <div className="mt-2 text-[11px] text-gray-500">
                    Zone: {selectedOrderModal.shippingZone === 'dhaka' ? 'Inside Dhaka (৳70)' : 'Outside Dhaka (৳130)'}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">Order Items</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-semibold text-[10px] uppercase border-b border-gray-200">
                      <tr>
                        <th className="py-2.5 px-3">Product</th>
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Unit Price</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedOrderModal.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-3 px-3">
                            <div className="font-bold text-gray-900">{item.name}</div>
                            <div className="text-gray-400 text-[11px]">{item.colorName}</div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-bold bg-gray-100 px-2 py-0.5 rounded">
                              {item.size}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-medium">৳{item.price.toLocaleString()}</td>
                          <td className="py-3 px-3 font-bold">{item.quantity}</td>
                          <td className="py-3 px-3 font-bold text-gray-900 text-right">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="flex justify-end">
                <div className="w-full sm:w-64 space-y-2 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>৳{selectedOrderModal.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Delivery:</span>
                    <span>৳{selectedOrderModal.shippingCost.toLocaleString()}</span>
                  </div>
                  {selectedOrderModal.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount / Free Ship:</span>
                      <span>-৳{selectedOrderModal.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-black text-sm text-gray-900">
                    <span>Total Bill (COD):</span>
                    <span>৳{selectedOrderModal.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOrderToDelete(selectedOrderModal)}
                  className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Order</span>
                </button>
                <div className="h-4 w-px bg-gray-200 mx-1 hidden sm:block"></div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">Status:</span>
                  {getStatusBadge(selectedOrderModal.status)}
                </div>
              </div>
              <button
                onClick={() => onSelectOrder(null)}
                className="px-4 py-2 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE ORDER MODAL */}
      {orderToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 text-center font-serif">
              অর্ডারটি মুছে ফেলতে চান?
            </h3>
            <p className="text-xs text-gray-500 text-center mt-1">
              Delete Order <span className="font-mono font-bold text-gray-900">#{orderToDelete.orderId}</span>
            </p>

            {/* Order summary card */}
            <div className="my-4 p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer Name:</span>
                <span className="font-bold text-gray-900">{orderToDelete.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-mono font-semibold text-gray-800">{orderToDelete.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">District:</span>
                <span className="font-medium text-gray-800">{orderToDelete.district}</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-gray-200">
                <span className="text-gray-500 font-semibold">Total Amount:</span>
                <span className="font-bold text-[#725b38]">৳{orderToDelete.total.toLocaleString()} (COD)</span>
              </div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-800 mb-5 leading-relaxed">
              ⚠️ <b>সতর্কতা:</b> এই অর্ডারটি মুছে ফেললে তা <b>Supabase Cloud Database</b> থেকেও স্থায়ীভাবে মুছে যাবে। এটি আর ফিরিয়ে আনা সম্ভব হবে না।
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                disabled={isDeleting}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                বাতিল (Cancel)
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>মুছছি...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>হ্যাঁ, মুছুন (Delete)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
