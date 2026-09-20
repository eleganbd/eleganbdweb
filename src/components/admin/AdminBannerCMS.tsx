import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Sparkles, Check, Save, Layers, Phone, Upload, Monitor, Smartphone, Info, RefreshCw, Loader2 } from 'lucide-react';
import { CMSBanner, StoreSettings, TrouserProduct } from '../../types';
import { supabaseService } from '../../lib/supabase';

interface AdminBannerCMSProps {
  banner: CMSBanner;
  settings: StoreSettings;
  products: TrouserProduct[];
  onUpdateBanner: (banner: CMSBanner) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export const AdminBannerCMS: React.FC<AdminBannerCMSProps> = ({
  banner,
  settings,
  products,
  onUpdateBanner,
  onUpdateSettings
}) => {
  const [headline, setHeadline] = useState(banner.headline);
  const [subheadline, setSubheadline] = useState(banner.subheadline);
  const [badge, setBadge] = useState(banner.badge);
  const [buttonText, setButtonText] = useState(banner.buttonText);
  const [imageUrl, setImageUrl] = useState(banner.imageUrl);
  const [mobileImageUrl, setMobileImageUrl] = useState(banner.mobileImageUrl || '');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [isUploadingDesktop, setIsUploadingDesktop] = useState(false);
  const [isUploadingMobile, setIsUploadingMobile] = useState(false);

  const desktopFileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setHeadline(banner.headline);
    setSubheadline(banner.subheadline);
    setBadge(banner.badge);
    setButtonText(banner.buttonText);
    setImageUrl(banner.imageUrl);
    setMobileImageUrl(banner.mobileImageUrl || '');
  }, [banner]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Helper function to process uploaded files (resizes if huge for fast loading)
  const processImageFile = async (file: File, isMobile: boolean) => {
    if (!file) return;
    if (isMobile) setIsUploadingMobile(true);
    else setIsUploadingDesktop(true);

    try {
      // 1. Try uploading to Supabase Storage first
      const publicStorageUrl = await supabaseService.uploadAssetFile(file, isMobile ? 'mobile-banners' : 'desktop-banners');
      if (publicStorageUrl) {
        if (isMobile) setMobileImageUrl(publicStorageUrl);
        else setImageUrl(publicStorageUrl);
        return;
      }

      // 2. Fallback: Compress using HTML5 Canvas to lightweight JPEG
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Target compact dimensions (1200px desktop, 800px mobile)
          const maxDim = isMobile ? 800 : 1200;
          const quality = 0.75;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            if (isMobile) {
              setMobileImageUrl(compressedDataUrl);
            } else {
              setImageUrl(compressedDataUrl);
            }
          } else {
            const rawUrl = event.target?.result as string;
            if (isMobile) setMobileImageUrl(rawUrl);
            else setImageUrl(rawUrl);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.warn('Image processing error:', err);
    } finally {
      setIsUploadingDesktop(false);
      setIsUploadingMobile(false);
    }
  };

  const handleDesktopFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file, false);
  };

  const handleMobileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file, true);
  };

  // About & Contact state
  const [aboutText, setAboutText] = useState('ELEGAN BD crafts bespoke and ready-to-wear luxury formal trousers designed for Bangladesh’s dynamic professionals.');
  const [contactPhone, setContactPhone] = useState(settings.contactNumber);
  const [contactEmail, setContactEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBanner({
      headline: headline.trim(),
      subheadline: subheadline.trim(),
      badge: badge.trim(),
      buttonText: buttonText.trim(),
      imageUrl: imageUrl.trim(),
      mobileImageUrl: mobileImageUrl.trim(),
      updatedAt: Date.now()
    });

    onUpdateSettings({
      ...settings,
      contactNumber: contactPhone.trim(),
      email: contactEmail.trim(),
      address: address.trim()
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Banner & Storefront CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            ডিভাইস থেকে সরাসরি ফটো আপলোড করে হোমপেজ ব্যানার (Desktop 1920×700 & Mobile 800×900) রিয়েল-টাইম সেট করুন
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>হোমপেজ ব্যানার লাইভ আপডেট হয়েছে!</span>
          </div>
        )}
      </div>

      {/* Recommended Pixel Size Guide Banner */}
      <div className="bg-[#f8f5ee] border border-[#e2d8c3] rounded-2xl p-4 sm:p-5 text-gray-800 space-y-3">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#725b38]">
          <Info className="w-4 h-4" />
          <span>Hero Banner-এর জন্য সবচেয়ে পারফেক্ট ও রেকমেন্ডেড সাইজ (Pixels Guide)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Desktop Guide Card */}
          <div className="bg-white/80 p-3.5 rounded-xl border border-[#e2d8c3]/60 space-y-1">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Monitor className="w-4 h-4 text-blue-600" />
              <span>১. 💻 Desktop Hero Banner (ডেস্কটপ সাইজ)</span>
            </div>
            <div className="text-[11px] text-gray-600 space-y-0.5 pl-6">
              <p>• <b>রেকমেন্ডেড সাইজ:</b> <span className="text-blue-700 font-semibold">1920 × 700 pixels</span> (সবচেয়ে ক্রিস্প ডিসপ্লে)</p>
              <p>• <b>Aspect Ratio:</b> 1920:700 (ওয়াইড স্ক্রিন ল্যান্ডস্কেপ)</p>
            </div>
          </div>

          {/* Mobile Guide Card */}
          <div className="bg-white/80 p-3.5 rounded-xl border border-[#e2d8c3]/60 space-y-1">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>২. 📱 Mobile Hero Banner (মোবাইল সাইজ)</span>
            </div>
            <div className="text-[11px] text-gray-600 space-y-0.5 pl-6">
              <p>• <b>রেকমেন্ডেড সাইজ:</b> <span className="text-purple-700 font-semibold">800 × 900 pixels</span> (পোর্ট্রেট ফিট)</p>
              <p>• <b>Aspect Ratio:</b> 800:900 (মোবাইল স্কয়ার/পোর্ট্রেট)</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveBanner} className="space-y-6">
        {/* Hero Banner Section */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-sans font-bold text-base text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#725b38]" />
              <span>Homepage Hero Banner Settings</span>
            </h2>

            {/* Live Preview Switcher */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl gap-1 text-xs">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewDevice === 'desktop' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (1920×700)</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  previewDevice === 'mobile' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (800×900)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* 1. Desktop Banner Upload & URL */}
            <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>💻 Desktop Banner Image (1920 × 700 px)</span>
                </label>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                  1920×700
                </span>
              </div>

              {/* Device File Input */}
              <input 
                type="file" 
                ref={desktopFileInputRef} 
                onChange={handleDesktopFileChange} 
                accept="image/*" 
                className="hidden" 
              />

              <div 
                onClick={() => !isUploadingDesktop && desktopFileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white p-3.5 rounded-xl text-center cursor-pointer transition-colors group relative"
              >
                {isUploadingDesktop ? (
                  <div className="py-2 flex flex-col items-center justify-center">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin mb-1" />
                    <span className="font-bold text-blue-700 text-xs">ইমেজ প্রসেস ও আপলোড হচ্ছে...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-blue-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-blue-700 block">
                      মোবাইল বা কম্পিউটার থেকে ছবি সিলেক্ট করুন
                    </span>
                    <span className="text-[10px] text-gray-500">
                      (PNG, JPG, WEBP, JPEG সাপোর্টেড)
                    </span>
                  </>
                )}
              </div>

              <div className="relative">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="অথবা ইমেজ ইউআরএল বসান..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* 2. Mobile Banner Upload & URL */}
            <div className="bg-purple-50/40 p-4 rounded-xl border border-purple-100/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-purple-600" />
                  <span>📱 Mobile Banner Image (800 × 900 px)</span>
                </label>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                  800×900
                </span>
              </div>

              {/* Mobile Device File Input */}
              <input 
                type="file" 
                ref={mobileFileInputRef} 
                onChange={handleMobileFileChange} 
                accept="image/*" 
                className="hidden" 
              />

              <div 
                onClick={() => !isUploadingMobile && mobileFileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-200 hover:border-purple-400 bg-white p-3.5 rounded-xl text-center cursor-pointer transition-colors group relative"
              >
                {isUploadingMobile ? (
                  <div className="py-2 flex flex-col items-center justify-center">
                    <Loader2 className="w-6 h-6 text-purple-600 animate-spin mb-1" />
                    <span className="font-bold text-purple-700 text-xs">ইমেজ প্রসেস ও আপলোড হচ্ছে...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-purple-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-purple-700 block">
                      মোবাইল ব্যানার সিলেক্ট করুন
                    </span>
                    <span className="text-[10px] text-gray-500">
                      (ডিভাইস থেকে পছন্দমতো মোবাইল সাইজ ছবি বেছে নিন)
                    </span>
                  </>
                )}
              </div>

              <div className="relative">
                <input
                  type="url"
                  value={mobileImageUrl}
                  onChange={(e) => setMobileImageUrl(e.target.value)}
                  placeholder="অথবা মোবাইল ইমেজ ইউআরএল বসান..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Live Visual Preview Frame */}
            <div className="md:col-span-2 bg-gray-900 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-gray-400 text-[11px]">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#fedeb2]" />
                  <span>Live Aspect Ratio Preview: {previewDevice === 'desktop' ? 'Desktop Screen (1920 × 700 px)' : 'Mobile Screen (800 × 900 px)'}</span>
                </span>
                <span>{previewDevice === 'desktop' ? '1920:700' : '800:900'}</span>
              </div>

              <div className="flex justify-center items-center py-2 bg-black/40 rounded-xl overflow-hidden">
                {previewDevice === 'desktop' ? (
                  <div className="w-full aspect-[1920/700] max-h-[220px] rounded-lg overflow-hidden bg-black relative border border-white/10 flex items-center justify-center">
                    <img 
                      src={imageUrl || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop'} 
                      alt="Desktop Preview" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                      1920 × 700 px (Desktop)
                    </div>
                  </div>
                ) : (
                  <div className="w-[200px] sm:w-[240px] aspect-[800/900] max-h-[300px] rounded-xl overflow-hidden bg-black relative border-2 border-white/20 shadow-2xl flex items-center justify-center p-0.5">
                    <img 
                      src={mobileImageUrl || imageUrl || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop'} 
                      alt="Mobile Preview" 
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                      800 × 900 px (Mobile)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products & About Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Featured Products Highlight</span>
            </h3>
            <p className="text-xs text-gray-500">
              হোমপেজের 'Best Selling' সেকশনে প্রদর্শিত প্রোডাক্টসমূহ:
            </p>
            <div className="space-y-2">
              {products.slice(0, 3).map((p) => (
                <div key={p.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={p.imageUrl} alt={p.name} className="w-8 h-10 object-cover rounded" />
                    <div>
                      <div className="font-bold text-gray-900">{p.name}</div>
                      <div className="text-[10px] text-gray-500">৳{p.price}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                    Featured
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-600" />
              <span>About Us & Contact Information</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">About Elegan BD</label>
                <textarea
                  rows={2}
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Support Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Atelier Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#725b38] hover:bg-[#856b43] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>SAVE BANNER & CMS CHANGES</span>
          </button>
        </div>
      </form>
    </div>
  );
};

