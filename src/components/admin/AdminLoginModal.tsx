import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, X, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPass = password.trim();

      if (cleanEmail === 'eleganbd@gmail.com' && cleanPass === 'ebs@2026ssn') {
        localStorage.setItem('elegan_admin_session', JSON.stringify({
          authenticated: true,
          email: 'eleganbd@gmail.com',
          role: 'Super Admin',
          loginTime: new Date().toISOString()
        }));
        setIsLoading(false);
        onSuccessLogin();
      } else {
        setIsLoading(false);
        setError('ভুল ইমেইল অথবা পাসওয়ার্ড! দয়া করে সঠিক তথ্য দিয়ে চেষ্টা করুন।');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#111317] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#725b38]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#fedeb2] mb-3 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold tracking-tight text-white">
            ELEGAN BD Admin Portal
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            সুরক্ষিত এডমিন প্যানেলে প্রবেশ করতে লগইন করুন
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email address"
                className="w-full pl-10 pr-4 py-3 bg-[#191c24] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fedeb2] focus:ring-1 focus:ring-[#fedeb2] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#191c24] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fedeb2] focus:ring-1 focus:ring-[#fedeb2] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#725b38] hover:bg-[#856b43] active:scale-[0.99] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>SECURE LOGIN TO DASHBOARD</span>
              </>
            )}
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
          <span>Authorized Personnel Only</span>
          <span className="text-gray-500">256-bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
};
