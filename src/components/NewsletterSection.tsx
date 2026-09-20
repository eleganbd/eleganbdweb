import React, { useState } from 'react';
import { Mail, Check, Copy, Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  onApplyVoucher: (code: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onApplyVoucher }) => {
  const [contactInput, setContactInput] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setClaimed(true);
    onApplyVoucher('ELEGAN150');
  };

  const copyCode = () => {
    navigator.clipboard?.writeText('ELEGAN150');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-20 bg-[#111111] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center gap-6">
        
        <span className="font-semibold text-[11px] uppercase text-[#fedeb2] tracking-[0.2em] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#fedeb2]" />
          VIP Sartorial Club
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal">
          Receive ৳150 Voucher On Your First Tailored Order
        </h2>

        <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
          Join 25,000+ members receiving private access to seasonal fabric drops, trunk shows, and styling digests.
        </p>

        {!claimed ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-2 mt-4">
            <div className="relative flex-grow">
              <input 
                type="text"
                required
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="Enter email or 017XXXXXXXX..."
                className="w-full bg-white/10 px-4 py-3.5 pl-10 rounded text-sm text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-[#fedeb2]"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-4" />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#725b38] hover:bg-white hover:text-[#111111] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-lg"
            >
              Claim ৳150 Voucher
            </button>
          </form>
        ) : (
          <div className="bg-white/10 p-6 rounded-xl border border-[#fedeb2]/40 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-md">
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-[#fedeb2] text-xs font-semibold uppercase tracking-wider mb-1">
                <Check className="w-4 h-4" />
                Voucher Activated!
              </div>
              <div className="text-sm font-bold text-white tracking-widest font-mono">
                ELEGAN150 (৳ 150 OFF)
              </div>
              <div className="text-[11px] text-white/60">
                Automatically applied to your checkout cart
              </div>
            </div>

            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#111111] rounded text-xs font-bold uppercase tracking-wider hover:bg-[#fedeb2] transition-colors shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        )}

        <div className="text-[11px] text-white/40 tracking-wider">
          Instant code activation • Valid on all orders above ৳1,500 • Cash on delivery applicable
        </div>

      </div>
    </section>
  );
};
