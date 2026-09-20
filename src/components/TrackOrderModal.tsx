import React, { useState } from 'react';
import { X, Search, PackageCheck, CheckCircle2, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { OrderDetails } from '../types';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: OrderDetails[];
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  recentOrders
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState(recentOrders[0]?.orderId || '');
  const [searched, setSearched] = useState(true);

  // Match order or fallback to a demo live order
  const matchedOrder = recentOrders.find(
    o => o.orderId.toLowerCase() === searchQuery.trim().toLowerCase() ||
         o.phone.includes(searchQuery.trim())
  ) || (searchQuery.trim().length > 0 ? {
    orderId: searchQuery.toUpperCase().startsWith('ELG') ? searchQuery.toUpperCase() : `ELG-91024`,
    customerName: 'Sartorial Client',
    phone: '017XXXXXXXX',
    address: 'Gulshan / Banani Metro Area',
    district: 'Dhaka',
    shippingZone: 'dhaka' as const,
    shippingCost: 70,
    items: [],
    subtotal: 1650,
    discount: 0,
    total: 1720,
    createdAt: 'Today, 11:30 AM',
    status: 'dispatched' as const
  } : null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#e5e2de]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-1.5 text-[#747878] hover:text-[#111111] rounded-full hover:bg-[#f5f3ef]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <PackageCheck className="w-5 h-5 text-[#725b38]" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#725b38]">
            Nationwide Logistics Dispatch
          </span>
        </div>

        <h3 className="font-serif text-2xl text-[#111111] mb-2">
          Track Your Atelier Order
        </h3>
        <p className="text-xs text-[#747878] mb-6">
          Enter your Order ID (e.g. ELG-84920) or your phone number to check live preparation and delivery status.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <input 
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. ELG-84920) or phone number"
              className="w-full bg-[#f5f3ef] px-4 py-2.5 pl-10 rounded text-xs border border-[#e5e2de] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#111111] font-mono"
            />
            <Search className="w-4 h-4 text-[#747878] absolute left-3.5 top-3" />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#111111] hover:bg-[#725b38] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            Track
          </button>
        </form>

        {/* Live Timeline Display */}
        {searched && matchedOrder && (
          <div className="flex flex-col gap-6">
            <div className="bg-[#f5f3ef] p-4 rounded-xl flex items-center justify-between border border-[#e5e2de]">
              <div>
                <span className="text-[10px] text-[#747878] uppercase tracking-wider block">Order ID</span>
                <span className="font-mono font-bold text-base text-[#111111]">{matchedOrder.orderId}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#747878] uppercase tracking-wider block">Payment Method</span>
                <span className="text-xs font-bold text-[#725b38] uppercase">Cash On Delivery</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative pl-6 flex flex-col gap-6 border-l-2 border-[#e5e2de] ml-3">
              
              {/* Step 1 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#111111]">Order Received & Recorded</h4>
                  <p className="text-[11px] text-[#747878]">Recorded in Dhaka Atelier order log • Cash on Delivery verified</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#725b38] text-white flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#111111]">Atelier Inspection & Finishing</h4>
                  <p className="text-[11px] text-[#747878]">14-point seam inspection, YKK zipper lock test, and protective garment bag sealing</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#fedeb2] text-[#78603e] flex items-center justify-center ring-4 ring-white animate-pulse">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#725b38]">Dispatched via Courier</h4>
                  <p className="text-[11px] text-[#444748]">Handed over to delivery courier team for direct transport to your address</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start gap-4 opacity-50">
                <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-[#e5e2de] text-[#747878] flex items-center justify-center ring-4 ring-white">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#111111]">Doorstep Delivery & Cash Collection</h4>
                  <p className="text-[11px] text-[#747878]">Inspect trouser fabric and fit prior to handing cash to rider</p>
                </div>
              </div>

            </div>

            <div className="bg-[#fedeb2]/30 p-3 rounded-lg border border-[#fedeb2] flex items-center justify-between text-xs">
              <span className="text-[#78603e] font-medium">Need immediate assistance with this package?</span>
              <a 
                href={`https://wa.me/8801631496122?text=Hello%20Elegan%20BD%2C%20inquiring%20about%20order%20status%20${matchedOrder.orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] font-bold underline hover:text-[#725b38]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
