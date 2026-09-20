import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Globe, 
  Plus, 
  FileText, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  PieChart,
  Calendar,
  Layers
} from 'lucide-react';
import { DollarExpense, Partnership, GeneralExpense, OrderDetails } from '../../types';

interface AdminFinanceProps {
  orders: OrderDetails[];
  dollarExpenses: DollarExpense[];
  partnerships: Partnership[];
  generalExpenses: GeneralExpense[];
  onAddDollarExpense: (exp: DollarExpense) => void;
  onAddGeneralExpense: (exp: GeneralExpense) => void;
  onAddPartnership: (part: Partnership) => void;
}

export const AdminFinance: React.FC<AdminFinanceProps> = ({
  orders,
  dollarExpenses,
  partnerships,
  generalExpenses,
  onAddDollarExpense,
  onAddGeneralExpense,
  onAddPartnership
}) => {
  const [activeFinanceTab, setActiveFinanceTab] = useState<'overview' | 'dollar' | 'partnership' | 'expenses'>('overview');

  // Modal States
  const [isDollarModalOpen, setIsDollarModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // Dollar Expense Form
  const [usdDesc, setUsdDesc] = useState('');
  const [usdAmount, setUsdAmount] = useState<number>(50);
  const [usdRate, setUsdRate] = useState<number>(122.5);
  const [usdCat, setUsdCat] = useState<DollarExpense['category']>('Facebook Ads');
  const [usdInvoice, setUsdInvoice] = useState('');

  // General Expense Form
  const [expTitle, setExpTitle] = useState('');
  const [expCat, setExpCat] = useState<GeneralExpense['category']>('Marketing');
  const [expAmount, setExpAmount] = useState<number>(2500);
  const [expNote, setExpNote] = useState('');

  // Financial Computations
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalUsdSpent = dollarExpenses.reduce((sum, d) => sum + d.usdAmount, 0);
  const totalDollarBdtSpent = dollarExpenses.reduce((sum, d) => sum + d.bdtAmount, 0);
  const totalGeneralExpenses = generalExpenses.reduce((sum, g) => sum + g.amount, 0);
  const totalProductCostEstimate = Math.round(totalGrossRevenue * 0.38); // 38% estimated COGS
  const totalAllExpenses = totalDollarBdtSpent + totalGeneralExpenses + totalProductCostEstimate;
  const netEstimatedProfit = Math.max(totalGrossRevenue - totalAllExpenses, 0);

  const handleSaveDollarExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usdDesc.trim() || usdAmount <= 0) return;

    const newDollar: DollarExpense = {
      id: `dexp-${Date.now()}`,
      date: '19 Sep 2026',
      description: usdDesc.trim(),
      usdAmount: Number(usdAmount),
      exchangeRate: Number(usdRate),
      bdtAmount: Math.round(Number(usdAmount) * Number(usdRate)),
      category: usdCat,
      invoiceNo: usdInvoice.trim() || `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'paid'
    };

    onAddDollarExpense(newDollar);
    setIsDollarModalOpen(false);
    setUsdDesc('');
    setUsdAmount(50);
  };

  const handleSaveGeneralExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || expAmount <= 0) return;

    const newExp: GeneralExpense = {
      id: `gexp-${Date.now()}`,
      date: '19 Sep 2026',
      title: expTitle.trim(),
      category: expCat,
      amount: Number(expAmount),
      note: expNote.trim()
    };

    onAddGeneralExpense(newExp);
    setIsExpenseModalOpen(false);
    setExpTitle('');
    setExpAmount(2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Accounting & Finance Hub
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            মোট আয়, ডলার অ্যাড কস্ট, পার্টনারশিপ ইকুইটি ও প্রফিট লেজার
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-200/70 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveFinanceTab('overview')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFinanceTab === 'overview' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveFinanceTab('dollar')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFinanceTab === 'dollar' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600'
            }`}
          >
            💵 Dollar Expense (${totalUsdSpent})
          </button>
          <button
            onClick={() => setActiveFinanceTab('partnership')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFinanceTab === 'partnership' ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-600'
            }`}
          >
            🤝 Partnership
          </button>
          <button
            onClick={() => setActiveFinanceTab('expenses')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFinanceTab === 'expenses' ? 'bg-black text-white shadow-xs' : 'text-gray-600'
            }`}
          >
            📝 Local Expenses
          </button>
        </div>
      </div>

      {/* 1. FINANCIAL OVERVIEW */}
      {activeFinanceTab === 'overview' && (
        <div className="space-y-6">
          {/* Main 4 Metric Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold uppercase text-gray-500 mb-1">Gross Sales Revenue</div>
              <div className="text-2xl font-black text-gray-900">৳{totalGrossRevenue.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">From total customer orders</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-emerald-200 bg-emerald-50/30 shadow-xs">
              <div className="text-xs font-bold uppercase text-emerald-800 mb-1">Net Estimated Profit</div>
              <div className="text-2xl font-black text-emerald-900">৳{netEstimatedProfit.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">After Ads, COGS & logistics</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs">
              <div className="text-xs font-bold uppercase text-amber-800 mb-1">Total Dollar Ads (USD)</div>
              <div className="text-2xl font-black text-amber-900">${totalUsdSpent.toFixed(2)}</div>
              <div className="text-[11px] text-gray-500 mt-1">৳{totalDollarBdtSpent.toLocaleString()} (Rate: 122.5 BDT)</div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
              <div className="text-xs font-bold uppercase text-gray-500 mb-1">Operational & Local Cost</div>
              <div className="text-2xl font-black text-gray-900">৳{totalGeneralExpenses.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 mt-1">Packaging, rent, courier & studio</div>
            </div>
          </div>

          {/* Quick breakdown & actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center justify-between">
                <span>Recent Dollar Ad Invoices (Meta & Google)</span>
                <button
                  onClick={() => setIsDollarModalOpen(true)}
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add USD Ad Cost</span>
                </button>
              </h3>

              <div className="space-y-3">
                {dollarExpenses.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-gray-900">{exp.description}</div>
                      <div className="text-[10px] text-gray-500">{exp.date} • {exp.category} • {exp.invoiceNo}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-emerald-700">${exp.usdAmount.toFixed(2)}</div>
                      <div className="text-[10px] text-gray-500">৳{exp.bdtAmount.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center justify-between">
                <span>Partnership Equity & Profit Shares</span>
                <button
                  onClick={() => setActiveFinanceTab('partnership')}
                  className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer"
                >
                  View Details
                </button>
              </h3>

              <div className="space-y-3">
                {partnerships.map((p) => (
                  <div key={p.id} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-gray-900">{p.partnerName}</div>
                      <div className="text-[11px] text-indigo-700 font-semibold">{p.equityShare}% Equity Share</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">Inv: ৳{p.totalInvestment.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-500">Withdrawn: ৳{p.profitWithdrawn.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DOLLAR EXPENSES SUB-PAGE */}
      {activeFinanceTab === 'dollar' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900">Dollar Expense Tracker (Meta / Google Ads / USD Imports)</h3>
            <button
              onClick={() => setIsDollarModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record USD Expense</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Date & Invoice</th>
                  <th className="py-3 px-4">Expense Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">USD Amount ($)</th>
                  <th className="py-3 px-4">Rate (BDT)</th>
                  <th className="py-3 px-4">Total BDT (৳)</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dollarExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900">{exp.date}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{exp.invoiceNo}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-800">{exp.description}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-emerald-700 text-sm">${exp.usdAmount.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">৳{exp.exchangeRate}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">৳{exp.bdtAmount.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase">
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PARTNERSHIP SUB-PAGE */}
      {activeFinanceTab === 'partnership' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-gray-900">Partnership & Capital Account</h3>
              <p className="text-xs text-gray-500">পার্টনারদের ইকুইটি শেয়ার ও মোট বিনিয়োগ হিসেব</p>
            </div>
            <button
              onClick={() => setIsPartnerModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Partner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerships.map((partner) => (
              <div key={partner.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base">
                      {partner.partnerName.charAt(0)}
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-extrabold text-xs rounded-full">
                      {partner.equityShare}% Equity
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-gray-900 mb-1">{partner.partnerName}</h4>
                  <div className="text-xs text-gray-500">{partner.email} • {partner.phone}</div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Total Capital</div>
                    <div className="text-sm font-black text-gray-900 mt-0.5">৳{partner.totalInvestment.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Profit Withdrawn</div>
                    <div className="text-sm font-black text-emerald-700 mt-0.5">৳{partner.profitWithdrawn.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. LOCAL GENERAL EXPENSES */}
      {activeFinanceTab === 'expenses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900">Local Operational Expenses Ledger</h3>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record Expense</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Expense Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4 text-right">Amount (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {generalExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-4 font-semibold text-gray-900">{exp.date}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-800">{exp.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-bold">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500">{exp.note || '-'}</td>
                    <td className="py-3.5 px-4 font-black text-gray-900 text-right">
                      ৳{exp.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Record Dollar Expense */}
      {isDollarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-xs" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Record USD Dollar Expense (Ads / Import)
            </h3>
            <form onSubmit={handleSaveDollarExpense} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Description *</label>
                <input
                  type="text"
                  required
                  value={usdDesc}
                  onChange={e => setUsdDesc(e.target.value)}
                  placeholder="e.g. Meta / Facebook Conversion Campaign"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">USD Amount ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={usdAmount}
                    onChange={e => setUsdAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Exchange Rate (BDT)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={usdRate}
                    onChange={e => setUsdRate(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 font-bold flex justify-between">
                <span>Calculated BDT Cost:</span>
                <span>৳{Math.round(usdAmount * usdRate).toLocaleString()}</span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Category *</label>
                <select
                  value={usdCat}
                  onChange={e => setUsdCat(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Fabric Import">Fabric Import</option>
                  <option value="Software / Tools">Software / Tools</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDollarModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  Save USD Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Record General Expense */}
      {isExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-xs" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Record Operational Expense (BDT)
            </h3>
            <form onSubmit={handleSaveGeneralExpense} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Expense Title *</label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  placeholder="e.g. Courier Delivery Advance / Packaging Boxes"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Amount (৳) *</label>
                  <input
                    type="number"
                    required
                    value={expAmount}
                    onChange={e => setExpAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Category</label>
                  <select
                    value={expCat}
                    onChange={e => setExpCat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="Packaging">Packaging</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Rent">Rent</option>
                    <option value="Staff">Staff</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={expNote}
                  onChange={e => setExpNote(e.target.value)}
                  placeholder="Receipt number or supplier details..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl resize-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsExpenseModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-xl font-bold"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
