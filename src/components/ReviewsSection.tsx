import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { REVIEWS } from '../data/products';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewQuote, setNewReviewQuote] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewQuote.trim()) return;

    const initials = newReviewAuthor
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      rating: newReviewRating,
      author: newReviewAuthor,
      location: newReviewLocation ? `${newReviewLocation} • Verified Buyer` : 'Dhaka • Verified Buyer',
      quote: `"${newReviewQuote}"`,
      verified: true,
      avatarText: initials || 'GB'
    };

    setReviewsList([created, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewQuote('');
    setShowReviewModal(false);
  };

  return (
    <section id="reviews-section" className="w-full py-24 bg-[#fbf9f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        
        {/* Reviews Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#e5e2de]">
          <div>
            <div className="flex items-center gap-1.5 text-[#725b38] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#725b38] text-[#725b38]" />
              ))}
              <span className="text-[11px] font-bold tracking-wider text-[#111111] uppercase ml-1.5">
                4.9 / 5.0 RATING
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111]">
              Gentlemen of Elegan BD
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-[#444748] max-w-md leading-relaxed">
              Over 15,000 corporate leaders, barristers, architects, and bankers across Bangladesh choose our formal pants.
            </p>
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 bg-[#f5f3ef] hover:bg-[#eae8e4] text-[#111111] px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 border border-[#e5e2de]"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#725b38]" />
              <span>Share Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsList.map((review) => (
            <div 
              key={review.id}
              className="bg-white p-8 rounded-xl shadow-md flex flex-col justify-between gap-6 hover:shadow-xl transition-all border border-[#e5e2de]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1 text-[#725b38]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#725b38] text-[#725b38]" />
                  ))}
                </div>
                <p className="text-sm text-[#111111] leading-relaxed italic">
                  {review.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#f5f3ef]">
                <div className="w-11 h-11 rounded-full bg-[#eae8e4] flex items-center justify-center font-serif text-sm text-[#111111] font-bold border border-[#e5e2de]">
                  {review.avatarText}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-[#111111]">{review.author}</span>
                    {review.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#725b38] fill-[#fedeb2]" />
                    )}
                  </div>
                  <span className="text-xs text-[#747878]">{review.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-[#e5e2de]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f5f3ef]">
              <h3 className="font-serif text-xl text-[#111111]">Gentleman's Feedback</h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="text-[#747878] hover:text-[#111111] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="flex flex-col gap-4 pt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Full Name
                </label>
                <input 
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Barrister Salman Chowdhury"
                  className="w-full bg-[#f5f3ef] px-3.5 py-2.5 rounded text-sm border border-[#e5e2de] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Area & City
                </label>
                <input 
                  type="text"
                  required
                  value={newReviewLocation}
                  onChange={(e) => setNewReviewLocation(e.target.value)}
                  placeholder="e.g. Uttara, Dhaka"
                  className="w-full bg-[#f5f3ef] px-3.5 py-2.5 rounded text-sm border border-[#e5e2de] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1"
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          star <= newReviewRating 
                            ? 'fill-[#725b38] text-[#725b38]' 
                            : 'text-[#c4c7c7]'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-[#725b38] ml-2">{newReviewRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#444748] mb-1">
                  Your Sartorial Experience
                </label>
                <textarea 
                  required
                  rows={3}
                  value={newReviewQuote}
                  onChange={(e) => setNewReviewQuote(e.target.value)}
                  placeholder="Share details regarding the fabric feel, drape, crease retention, or doorstep cash delivery..."
                  className="w-full bg-[#f5f3ef] px-3.5 py-2.5 rounded text-sm border border-[#e5e2de] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#111111]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-xs font-semibold uppercase text-[#747878] hover:text-[#111111]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111111] hover:bg-[#725b38] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
