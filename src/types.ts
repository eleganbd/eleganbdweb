export type SizeNumber = 28 | 30 | 32 | 34 | 36 | 38 | 40;
export type ShirtSize = 'M' | 'L' | 'XL' | 'XXL';
export type AnySize = SizeNumber | ShirtSize | string;

export type HemStyle = 'standard' | 'cuffed' | 'letout';

export type ProductCategory = 'Formal Pant' | 'Pant' | 'Shirt' | 'Blazer' | 'Others' | string;

export interface TrouserProduct {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeType: 'bestseller' | 'trending' | 'premium' | 'limited';
  colorName: string;
  colorHex: string;
  colorFamily: 'obsidian' | 'navy' | 'beige' | 'offwhite' | 'olive' | 'slate';
  category?: ProductCategory;
  price: number;
  originalPrice: number;
  stockStatus: string;
  stockNote?: string;
  imageUrl: string;
  galleryImages?: string[];
  description: string;
  fabricSpecs: string[];
  availableSizes: (SizeNumber | ShirtSize | string)[];
  stockPerSize?: Record<string, number>;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  colorName: string;
  size: SizeNumber | ShirtSize | string;
  hemStyle: HemStyle;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface SizeDimension {
  size: SizeNumber;
  exactWaist: string;
  thighCircumference: string;
  kneeWidth: string;
  ankleOpening: string;
  standardLength: string;
  isPopular?: boolean;
}

export interface ReviewItem {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
  verified: boolean;
  avatarText: string;
  status?: 'approved' | 'pending' | 'hidden';
  date?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  district: string;
  shippingZone: 'dhaka' | 'outside';
  shippingCost: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  voucherCode?: string;
  total: number;
  createdAt: string;
  status: 'confirmed' | 'inspecting' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'cancelled';
  notes?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount?: number;
  imageUrl?: string;
}

export interface StockLog {
  id: string;
  date: string;
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  type: 'in' | 'out';
  reason: string;
  note?: string;
  batchNumber?: string;
  recordedBy: string;
}

export interface DollarExpense {
  id: string;
  date: string;
  description: string;
  usdAmount: number;
  exchangeRate: number; // e.g. 122 BDT per USD
  bdtAmount: number;
  category: 'Facebook Ads' | 'Google Ads' | 'Fabric Import' | 'Software / Tools' | 'Logistics' | 'Others';
  invoiceNo?: string;
  status: 'paid' | 'pending';
}

export interface Partnership {
  id: string;
  partnerName: string;
  phone: string;
  email: string;
  equityShare: number; // e.g. 50 (%)
  totalInvestment: number; // BDT
  profitWithdrawn: number; // BDT
  joinedDate: string;
}

export interface GeneralExpense {
  id: string;
  date: string;
  title: string;
  category: 'Marketing' | 'Logistics' | 'Packaging' | 'Rent' | 'Staff' | 'Others';
  amount: number;
  note?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Order Manager' | 'Inventory Manager' | 'Finance Manager';
  status: 'active' | 'suspended';
  lastLogin: string;
  phone?: string;
}

export interface CMSBanner {
  headline: string;
  subheadline: string;
  badge: string;
  buttonText: string;
  imageUrl: string; // Desktop banner (1920 × 700 px)
  mobileImageUrl?: string; // Mobile banner (800 × 900 px / 1080 × 1080 px)
}

export interface StoreSettings {
  storeName: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  address: string;
  deliveryDhaka: number;
  deliveryOutside: number;
  freeDeliveryMinItems: number;
  codEnabled: boolean;
  orderAutoConfirm: boolean;
  metaPixelId?: string;
  metaPixelEnabled?: boolean;
  testEventCode?: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  password?: string;
  address?: string;
  district?: string;
  preferredWaist?: SizeNumber | string;
  preferredSilhouette?: string;
  createdAt: string;
  ordersCount?: number;
  totalSpend?: number;
}


