import React, { useState } from 'react';
import { Settings, Save, Check, Truck, CreditCard, Phone, Globe, Shield, Bell } from 'lucide-react';
import { StoreSettings } from '../../types';

interface AdminSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [storeName, setStoreName] = useState(settings.storeName);
  const [contactNumber, setContactNumber] = useState(settings.contactNumber);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [email, setEmail] = useState(settings.email);
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [address, setAddress] = useState(settings.address);
  const [deliveryDhaka, setDeliveryDhaka] = useState<number>(settings.deliveryDhaka);
  const [deliveryOutside, setDeliveryOutside] = useState<number>(settings.deliveryOutside);
  const [freeDeliveryMinItems, setFreeDeliveryMinItems] = useState<number>(settings.freeDeliveryMinItems);
  const [codEnabled, setCodEnabled] = useState<boolean>(settings.codEnabled);
  const [orderAutoConfirm, setOrderAutoConfirm] = useState<boolean>(settings.orderAutoConfirm);
  const [metaPixelId, setMetaPixelId] = useState<string>(settings.metaPixelId || '');
  const [metaPixelEnabled, setMetaPixelEnabled] = useState<boolean>(settings.metaPixelEnabled ?? false);
  const [testEventCode, setTestEventCode] = useState<string>(settings.testEventCode || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreSettings = {
      storeName: storeName.trim(),
      contactNumber: contactNumber.trim(),
      whatsappNumber: whatsappNumber.trim(),
      email: email.trim(),
      facebookUrl: facebookUrl.trim(),
      instagramUrl: instagramUrl.trim(),
      address: address.trim(),
      deliveryDhaka: Number(deliveryDhaka),
      deliveryOutside: Number(deliveryOutside),
      freeDeliveryMinItems: Number(freeDeliveryMinItems),
      codEnabled,
      orderAutoConfirm,
      metaPixelId: metaPixelId.trim(),
      metaPixelEnabled,
      testEventCode: testEventCode.trim()
    };

    onUpdateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-xl sm:text-2xl text-gray-900">
            Store & Commerce Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            লোগো, ফোন/হোয়াটসঅ্যাপ নম্বর, ডেলিভারি চার্জ ও পেমেন্ট কনফিগারেশন
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>সকল সেটিংস সফলভাবে সংরক্ষিত হয়েছে!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {/* 1. Contact & Social Information */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#725b38]" />
            <span>Brand Information & Official Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Brand Name</label>
              <input
                type="text"
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Support Phone Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                placeholder="01631496122"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">WhatsApp Concierge Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="01631496122"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-emerald-700 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Facebook Page URL</label>
              <input
                type="url"
                value={facebookUrl}
                onChange={e => setFacebookUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Instagram Profile URL</label>
              <input
                type="url"
                value={instagramUrl}
                onChange={e => setInstagramUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block font-bold text-gray-700 uppercase mb-1">Atelier Studio Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery & Courier Charges */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>Delivery Charges & Free Shipping Policy</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Inside Dhaka Delivery (৳)</label>
              <input
                type="number"
                value={deliveryDhaka}
                onChange={e => setDeliveryDhaka(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
              />
              <p className="text-[10px] text-gray-400 mt-1">স্ট্যান্ডার্ড চার্জ: ৳৭০</p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Outside Dhaka Delivery (৳)</label>
              <input
                type="number"
                value={deliveryOutside}
                onChange={e => setDeliveryOutside(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
              />
              <p className="text-[10px] text-gray-400 mt-1">সমগ্র বাংলাদেশ: ৳১৩০</p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Free Delivery Threshold (Min Items)</label>
              <input
                type="number"
                value={freeDeliveryMinItems}
                onChange={e => setFreeDeliveryMinItems(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-emerald-700"
              />
              <p className="text-[10px] text-gray-400 mt-1">৩টি বা তার বেশি আইটেম নিলে ফ্রি ডেলিভারি</p>
            </div>
          </div>
        </div>

        {/* 3. Payment Methods & Order Automation */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-600" />
            <span>Payment Methods & Order Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">Cash on Delivery (ক্যাশ অন ডেলিভারি)</div>
                <div className="text-[11px] text-gray-500">পণ্য হাতে পেয়ে মূল্য পরিশোধ সুবিধা সক্রিয় রাখুন</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={codEnabled}
                  onChange={e => setCodEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">Instant Order Auto-Confirm</div>
                <div className="text-[11px] text-gray-500">কাস্টমার অর্ডার দিলে স্বয়ংক্রিয়ভাবে নিশ্চিত হবে</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={orderAutoConfirm}
                  onChange={e => setOrderAutoConfirm(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 4. Meta Pixel & Conversion API Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Meta Pixel & Facebook Ads Integration (মেটা পিক্সেল)</span>
            </h3>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider self-start sm:self-auto ${
              metaPixelEnabled && metaPixelId.trim()
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}>
              {metaPixelEnabled && metaPixelId.trim() ? '● Pixel Active' : '○ Inactive'}
            </span>
          </div>

          <p className="text-[11px] text-gray-600 leading-relaxed">
            ফেসবুক অ্যাডস থেকে আসা কাস্টমার ট্র্যাক করতে আপনার <strong>Meta Pixel ID</strong> প্রবেশ করান। পিক্সেল অন করলে স্টোরফ্রন্টে স্বয়ংক্রিয়ভাবে <strong>PageView, ViewContent, AddToCart, InitiateCheckout, Purchase</strong> ইভেন্টসমূহ ফেসবুক ট্র্যাকিংয়ে সেন্ড হবে।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="sm:col-span-2 p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900 text-xs">Enable Meta Pixel Tracking (পিক্সেল অ্যাক্টিভ ট্র্যাকিং)</div>
                <div className="text-[11px] text-gray-500">অন থাকলে স্টোরফ্রন্টে পিক্সেল স্ক্রিপ্ট লোড হবে</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={metaPixelEnabled}
                  onChange={e => setMetaPixelEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Meta Pixel ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={metaPixelId}
                onChange={e => {
                  const val = e.target.value;
                  setMetaPixelId(val);
                  if (val.trim().length > 0 && !metaPixelEnabled) {
                    setMetaPixelEnabled(true);
                  }
                }}
                placeholder="e.g. 102938475610293"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:border-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">Meta Events Manager থেকে ১৫ ডিজিটের Pixel ID কপি করে বসান</p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Test Event Code (Optional)
              </label>
              <input
                type="text"
                value={testEventCode}
                onChange={e => setTestEventCode(e.target.value)}
                placeholder="e.g. TEST12345"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:border-black"
              />
              <p className="text-[10px] text-gray-400 mt-1">ফেসবুক টেস্ট ইভেন্ট রিয়েল-টাইম টেস্ট করতে ব্যবহার করতে পারেন</p>
            </div>
          </div>

          {/* Auto Tracked Events Overview */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 mt-2">
            <div className="text-[11px] font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
              অটোমেটিক ট্র্যাকিং ইভেন্টসমূহ:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] text-gray-600">
              <div className="bg-white p-2 rounded-lg border border-gray-200 text-center font-medium">
                👁️ PageView
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200 text-center font-medium">
                🛍️ ViewContent
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200 text-center font-medium">
                🛒 AddToCart
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200 text-center font-medium">
                💳 InitiateCheckout
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200 text-center font-medium">
                🎉 Purchase
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
            <span>SAVE ALL STORE SETTINGS</span>
          </button>
        </div>

      </form>
    </div>
  );
};
