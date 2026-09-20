import React, { useState } from 'react';
import { 
  Package, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Layers, 
  Plus, 
  Search, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  History
} from 'lucide-react';
import { TrouserProduct, StockLog } from '../../types';

interface AdminInventoryProps {
  products: TrouserProduct[];
  stockLogs: StockLog[];
  onAddStockLog: (log: StockLog) => void;
  onUpdateProductStock: (productId: string, sizeStockMap: Record<string, number>) => void;
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({
  products,
  stockLogs,
  onAddStockLog,
  onUpdateProductStock
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'current' | 'stock_in' | 'stock_out'>('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStockProduct, setEditingStockProduct] = useState<TrouserProduct | null>(null);
  const [tempStockMap, setTempStockMap] = useState<Record<string, number>>({});

  const openEditStockModal = (prod: TrouserProduct) => {
    setEditingStockProduct(prod);
    const initialMap: Record<string, number> = {};
    prod.availableSizes.forEach(sz => {
      initialMap[String(sz)] = (prod.stockPerSize && prod.stockPerSize[String(sz)] !== undefined) 
        ? prod.stockPerSize[String(sz)] 
        : 25;
    });
    setTempStockMap(initialMap);
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStockProduct) return;
    onUpdateProductStock(editingStockProduct.id, tempStockMap);
    setEditingStockProduct(null);
  };

  // Stock In Form State
  const [inProductId, setInProductId] = useState<string>(products[0]?.id || '');
  const [inSize, setInSize] = useState<string>('32');
  const [inQuantity, setInQuantity] = useState<number>(30);
  const [inReason, setInReason] = useState<string>('New Batch Production');
  const [inBatchNumber, setInBatchNumber] = useState<string>('BATCH-2026-SEP');
  const [inNote, setInNote] = useState<string>('');

  // Stock Out Form State
  const [outProductId, setOutProductId] = useState<string>(products[0]?.id || '');
  const [outSize, setOutSize] = useState<string>('32');
  const [outQuantity, setOutQuantity] = useState<number>(1);
  const [outReason, setOutReason] = useState<string>('Offline Showroom Sale');
  const [outNote, setOutNote] = useState<string>('');

  // Handle Stock In Submission
  const handleStockInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === inProductId);
    if (!prod) return;

    const newLog: StockLog = {
      id: `stk-in-${Date.now()}`,
      date: 'Just now',
      productId: inProductId,
      productName: prod.name,
      size: inSize,
      quantity: Number(inQuantity),
      type: 'in',
      reason: inReason,
      note: inNote.trim(),
      batchNumber: inBatchNumber.trim(),
      recordedBy: 'Admin (eleganbd@gmail.com)'
    };

    onAddStockLog(newLog);
    alert(`সফলভাবে ${inQuantity} পিস ${prod.name} (Size ${inSize}) স্টক-ইন করা হয়েছে!`);
    setInQuantity(10);
    setInNote('');
  };

  // Handle Stock Out Submission
  const handleStockOutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === outProductId);
    if (!prod) return;

    const newLog: StockLog = {
      id: `stk-out-${Date.now()}`,
      date: 'Just now',
      productId: outProductId,
      productName: prod.name,
      size: outSize,
      quantity: Number(outQuantity),
      type: 'out',
      reason: outReason,
      note: outNote.trim(),
      recordedBy: 'Admin (eleganbd@gmail.com)'
    };

    onAddStockLog(newLog);
    alert(`সফলভাবে ${outQuantity} পিস ${prod.name} (Size ${outSize}) স্টক-আউট এন্ট্রি করা হয়েছে!`);
    setOutQuantity(1);
    setOutNote('');
  };

  const selectedInProd = products.find(p => p.id === inProductId) || products[0];
  const selectedOutProd = products.find(p => p.id === outProductId) || products[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            সাইজ-ভিত্তিক স্টক পর্যবেক্ষণ, স্টক-ইন ও স্টক-আউট লেজার
          </p>
        </div>

        {/* 3 Dedicated Sub-Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-200/70 rounded-xl">
          <button
            onClick={() => setActiveSubTab('current')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'current'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Current Stock
          </button>
          <button
            onClick={() => setActiveSubTab('stock_in')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'stock_in'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowDownLeft className="w-3.5 h-3.5" />
            <span>Stock In (আলাদা পেজ)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('stock_out')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'stock_out'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Stock Out (আলাদা পেজ)</span>
          </button>
        </div>
      </div>

      {/* 1. CURRENT STOCK SUB-PAGE */}
      {activeSubTab === 'current' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products in inventory..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Size-wise stock breakdown table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#725b38]" />
                <span>Size-Wise Live Stock Matrix</span>
              </h3>
              <span className="text-xs text-gray-500">
                Total Products: {products.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Product Info</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Available Sizes & Stock Level</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products
                    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((prod) => (
                      <tr key={prod.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img src={prod.imageUrl} alt={prod.name} className="w-10 h-12 rounded-lg object-cover border border-gray-200" />
                            <div>
                              <div className="font-bold text-gray-900">{prod.name}</div>
                              <div className="text-[11px] text-gray-500">{prod.colorName} • ৳{prod.price}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-semibold text-[11px]">
                            {prod.category || 'Pant'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1.5">
                            {prod.availableSizes.map((sz) => {
                              const qty = (prod.stockPerSize && prod.stockPerSize[String(sz)] !== undefined) 
                                ? prod.stockPerSize[String(sz)] 
                                : 25;
                              return (
                                <div key={sz} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg text-xs">
                                  <span className="font-bold text-gray-800">{sz}:</span>
                                  <span className="text-emerald-700 font-bold">{qty} pcs</span>
                                </div>
                              );
                            })}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            prod.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {prod.stockStatus}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditStockModal(prod)}
                              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold text-xs cursor-pointer"
                            >
                              Edit Stock
                            </button>
                            <button
                              onClick={() => {
                                setInProductId(prod.id);
                                setActiveSubTab('stock_in');
                              }}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold text-xs cursor-pointer"
                            >
                              + Stock In
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stock Quantity Modal */}
      {editingStockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-base text-gray-900">Edit Size-wise Stock</h3>
                <p className="text-gray-500">{editingStockProduct.name} ({editingStockProduct.colorName})</p>
              </div>
              <button onClick={() => setEditingStockProduct(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStock} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                {editingStockProduct.availableSizes.map((sz) => (
                  <div key={sz} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <label className="block font-bold text-gray-700 mb-1">
                      Size {sz} Quantity (pcs):
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={tempStockMap[String(sz)] !== undefined ? tempStockMap[String(sz)] : 25}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setTempStockMap({
                          ...tempStockMap,
                          [String(sz)]: val
                        });
                      }}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:border-black"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStockProduct(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl font-bold uppercase transition-all shadow-md cursor-pointer"
                >
                  Save Stock Quantities
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. STOCK IN ALADA PAGE */}
      {activeSubTab === 'stock_in' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Form */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">New Stock In Entry</h3>
                <p className="text-[11px] text-gray-500">ফ্যাক্টরি থেকে নতুন লট ইনভেন্টরিতে যুক্ত করুন</p>
              </div>
            </div>

            <form onSubmit={handleStockInSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Select Product *</label>
                <select
                  value={inProductId}
                  onChange={(e) => {
                    setInProductId(e.target.value);
                    const p = products.find(prod => prod.id === e.target.value);
                    if (p && p.availableSizes.length > 0) setInSize(String(p.availableSizes[0]));
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.colorName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Size *</label>
                  <select
                    value={inSize}
                    onChange={(e) => setInSize(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                  >
                    {selectedInProd?.availableSizes.map((sz) => (
                      <option key={sz} value={String(sz)}>Size {sz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Quantity (Pcs) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={inQuantity}
                    onChange={(e) => setInQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Reason / Source *</label>
                <select
                  value={inReason}
                  onChange={(e) => setInReason(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                >
                  <option value="New Batch Production">New Batch Production (ফ্যাক্টরি উৎপাদন)</option>
                  <option value="Restock Lot">Restock Lot (পুনরায় আমদানি)</option>
                  <option value="Return to Inventory">Return to Inventory (কাস্টমার রিটার্ন)</option>
                  <option value="Showroom Adjustment">Showroom Adjustment</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Batch / Lot Number</label>
                <input
                  type="text"
                  value={inBatchNumber}
                  onChange={(e) => setInBatchNumber(e.target.value)}
                  placeholder="e.g. BATCH-2026-SEP-01"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Notes / Remarks</label>
                <textarea
                  rows={2}
                  value={inNote}
                  onChange={(e) => setInNote(e.target.value)}
                  placeholder="Additional batch notes or factory QC info..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>CONFIRM STOCK IN ENTRY</span>
              </button>
            </form>
          </div>

          {/* Right: Stock In Logs Ledger */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              <span>Stock In Historical Ledger</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-y border-gray-100">
                  <tr>
                    <th className="py-2.5 px-3">Date & Batch</th>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Qty Added</th>
                    <th className="py-2.5 px-3">Reason & User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stockLogs.filter(l => l.type === 'in').map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/70">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-gray-900">{log.date}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{log.batchNumber || 'N/A'}</div>
                      </td>
                      <td className="py-3 px-3 font-bold text-gray-800">{log.productName}</td>
                      <td className="py-3 px-3 font-bold text-emerald-800">Size {log.size}</td>
                      <td className="py-3 px-3 font-black text-emerald-600 text-sm">+{log.quantity} pcs</td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-gray-700">{log.reason}</div>
                        <div className="text-[10px] text-gray-400">{log.recordedBy}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. STOCK OUT ALADA PAGE */}
      {activeSubTab === 'stock_out' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Form */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-red-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">New Stock Out Entry</h3>
                <p className="text-[11px] text-gray-500">বিক্রয়, ড্যামেজ বা স্যাম্পল বাদ দিতে এন্ট্রি করুন</p>
              </div>
            </div>

            <form onSubmit={handleStockOutSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Select Product *</label>
                <select
                  value={outProductId}
                  onChange={(e) => {
                    setOutProductId(e.target.value);
                    const p = products.find(prod => prod.id === e.target.value);
                    if (p && p.availableSizes.length > 0) setOutSize(String(p.availableSizes[0]));
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.colorName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Size *</label>
                  <select
                    value={outSize}
                    onChange={(e) => setOutSize(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                  >
                    {selectedOutProd?.availableSizes.map((sz) => (
                      <option key={sz} value={String(sz)}>Size {sz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Quantity (Pcs) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={outQuantity}
                    onChange={(e) => setOutQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Reason / Type *</label>
                <select
                  value={outReason}
                  onChange={(e) => setOutReason(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none"
                >
                  <option value="Offline Showroom Sale">Offline Showroom Sale (শোরুম বিক্রয়)</option>
                  <option value="Damaged / Fabric Defect">Damaged / Fabric Defect (নষ্ট / ডিফেক্ট)</option>
                  <option value="Showroom Display Sample">Showroom Display Sample (ডিসপ্লে স্যাম্পল)</option>
                  <option value="Gift / Influencer Promo">Gift / Influencer Promo</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Notes / Remarks</label>
                <textarea
                  rows={2}
                  value={outNote}
                  onChange={(e) => setOutNote(e.target.value)}
                  placeholder="Reason details or showroom reference..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span>CONFIRM STOCK OUT ENTRY</span>
              </button>
            </form>
          </div>

          {/* Right: Stock Out Logs Ledger */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-red-600" />
              <span>Stock Out Historical Ledger</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-y border-gray-100">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Qty Removed</th>
                    <th className="py-2.5 px-3">Reason & User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {stockLogs.filter(l => l.type === 'out').map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/70">
                      <td className="py-3 px-3 font-semibold text-gray-900">{log.date}</td>
                      <td className="py-3 px-3 font-bold text-gray-800">{log.productName}</td>
                      <td className="py-3 px-3 font-bold text-red-800">Size {log.size}</td>
                      <td className="py-3 px-3 font-black text-red-600 text-sm">-{log.quantity} pcs</td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-gray-700">{log.reason}</div>
                        <div className="text-[10px] text-gray-400">{log.recordedBy}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
