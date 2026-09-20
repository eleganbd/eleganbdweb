import React, { useState } from 'react';
import { Star, Plus, Trash2, CheckCircle2, Eye, EyeOff, ShieldCheck, MessageSquare } from 'lucide-react';
import { ReviewItem } from '../../types';

interface AdminReviewsProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
  onDeleteReview: (id: string) => void;
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({
  reviews,
  onAddReview,
  onDeleteReview
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState<number>(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim(),
      quote: quote.trim(),
      rating: Number(rating),
      verified: true,
      avatarText: author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'EB',
      status: 'approved',
      date: '19 Sep 2026'
    };

    onAddReview(newRev);
    setIsAddModalOpen(false);
    setAuthor('');
    setQuote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Customer Reviews & Ratings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            গ্রাহক পর্যালোচনা, ৫-স্টার রেটিং ও ভেরিফাইড রিভিউ অনুমোদন করুন (Total: {reviews.length})
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <button
                  onClick={() => onDeleteReview(rev.id)}
                  className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-700 italic leading-relaxed mb-4">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                  {rev.avatarText || rev.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    {rev.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-[10px] text-gray-400">{rev.location}</div>
                </div>
              </div>

              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                Approved
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 text-xs" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-base text-gray-900 mb-4 pb-2 border-b border-gray-100">
              Add Verified Customer Review
            </h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. Barrister Farhan Ahmed"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Banani, Dhaka"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Star Rating</label>
                  <select
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Average)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Review Quote / Feedback *</label>
                <textarea
                  rows={3}
                  required
                  value={quote}
                  onChange={e => setQuote(e.target.value)}
                  placeholder="Write the customer praise regarding fabric, stitching, delivery..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl resize-none"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#725b38] text-white rounded-xl font-bold"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
