import { createClient } from '@supabase/supabase-js';
import { CustomerAccount, OrderDetails, TrouserProduct, ReviewItem, GeneralExpense, DollarExpense, CMSBanner, StoreSettings } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://afwislqtlcfglimaacxk.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6hhesP3nklqpR3SovQhUpQ_l47YNy6M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const supabaseService = {
  // ==============================
  // 1. CUSTOMERS
  // ==============================
  async saveCustomer(customer: CustomerAccount): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('customers')
        .upsert({
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
          email: customer.email || null,
          password: customer.password || null,
          address: customer.address || null,
          district: customer.district || 'Dhaka',
          preferred_waist: customer.preferredWaist ? String(customer.preferredWaist) : '32',
          preferred_silhouette: customer.preferredSilhouette || 'Slim Tapered',
          created_at: customer.createdAt || new Date().toISOString(),
          orders_count: customer.ordersCount || 0,
          total_spend: customer.totalSpend || 0
        }, { onConflict: 'phone' });

      if (error) {
        console.warn('Supabase customer save note (will retain in local store):', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase saveCustomer error:', err);
      return false;
    }
  },

  async getCustomers(): Promise<CustomerAccount[] | null> {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*');

      if (error || !data) return null;

      return data.map(row => ({
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email || undefined,
        password: row.password || undefined,
        address: row.address || undefined,
        district: row.district || 'Dhaka',
        preferredWaist: row.preferred_waist || '32',
        preferredSilhouette: row.preferred_silhouette || 'Slim Tapered',
        createdAt: row.created_at || '',
        ordersCount: row.orders_count || 0,
        totalSpend: row.total_spend || 0
      }));
    } catch (err) {
      console.warn('Supabase getCustomers error:', err);
      return null;
    }
  },

  // ==============================
  // 2. ORDERS
  // ==============================
  async saveOrder(order: OrderDetails): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('orders')
        .upsert({
          order_id: order.orderId,
          customer_name: order.customerName,
          phone: order.phone,
          address: order.address,
          district: order.district,
          shipping_zone: order.shippingZone,
          shipping_cost: order.shippingCost,
          items: order.items,
          subtotal: order.subtotal,
          discount: order.discount,
          voucher_code: order.voucherCode || null,
          total: order.total,
          status: order.status,
          created_at: order.createdAt,
          notes: order.notes || null
        }, { onConflict: 'order_id' });

      if (error) {
        console.warn('Supabase order save note:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase saveOrder error:', err);
      return false;
    }
  },

  async getOrders(): Promise<OrderDetails[] | null> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map(row => ({
        orderId: row.order_id,
        customerName: row.customer_name,
        phone: row.phone,
        address: row.address,
        district: row.district,
        shippingZone: row.shipping_zone,
        shippingCost: Number(row.shipping_cost),
        items: row.items || [],
        subtotal: Number(row.subtotal),
        discount: Number(row.discount || 0),
        voucherCode: row.voucher_code || undefined,
        total: Number(row.total),
        status: row.status,
        createdAt: row.created_at,
        notes: row.notes || undefined
      }));
    } catch (err) {
      console.warn('Supabase getOrders error:', err);
      return null;
    }
  },

  async updateOrderStatus(orderId: string, status: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('order_id', orderId);

      if (error) {
        console.warn('Supabase order status update note:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase updateOrderStatus error:', err);
      return false;
    }
  },

  async deleteOrder(orderId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('order_id', orderId);

      if (error) {
        console.warn('Supabase deleteOrder error:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase deleteOrder error:', err);
      return false;
    }
  },

  // ==============================
  // 3. REVIEWS & PRODUCTS SYNC
  // ==============================
  async saveReview(review: ReviewItem): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reviews')
        .upsert({
          id: review.id,
          rating: review.rating,
          quote: review.quote,
          author: review.author,
          location: review.location,
          verified: review.verified,
          avatar_text: review.avatarText,
          status: review.status || 'approved',
          date: review.date || new Date().toISOString()
        });
      return !error;
    } catch {
      return false;
    }
  },

  async saveProduct(product: TrouserProduct): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .upsert({
          id: product.id,
          name: product.name,
          subtitle: product.subtitle || '',
          category: product.category || 'Pant',
          price: product.price,
          original_price: product.originalPrice || product.price,
          badge: product.badge || '',
          color_name: product.colorName || '',
          image_url: product.imageUrl || '',
          description: product.description || '',
          stock_status: product.stockStatus || 'In Stock',
          available_sizes: (product.availableSizes || []).map(String)
        }, { onConflict: 'id' });

      if (error) {
        console.warn('Supabase saveProduct table note:', error.message);
      }
      return !error;
    } catch (err) {
      console.warn('Supabase saveProduct error:', err);
      return false;
    }
  },

  async saveProductsList(products: TrouserProduct[]): Promise<boolean> {
    try {
      // 1. Save complete JSON array in site_settings for 100% fidelity & speed
      const { error: settingsErr } = await supabase
        .from('site_settings')
        .upsert({
          key: 'products_list',
          value: products,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

      if (settingsErr) {
        console.warn('Supabase site_settings products_list upsert note:', settingsErr.message);
      }

      // 2. Also try individual product upserts for SQL table consistency
      let tableSuccess = true;
      for (const p of products) {
        const ok = await this.saveProduct(p);
        if (!ok) tableSuccess = false;
      }

      return !settingsErr || tableSuccess;
    } catch (err) {
      console.warn('Supabase saveProductsList error:', err);
      return false;
    }
  },

  async getProducts(): Promise<TrouserProduct[] | null> {
    try {
      // First try fetching full products_list from site_settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'products_list')
        .maybeSingle();

      if (settingsData && settingsData.value && Array.isArray(settingsData.value) && settingsData.value.length > 0) {
        return settingsData.value as TrouserProduct[];
      }

      // Fallback to products table
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error || !data || data.length === 0) return null;

      return data.map(row => ({
        id: row.id,
        name: row.name,
        subtitle: row.subtitle || '',
        category: row.category || 'Formal Pant',
        price: Number(row.price),
        originalPrice: Number(row.original_price || row.price),
        badge: row.badge || '',
        badgeType: row.badge_type || 'bestseller',
        colorName: row.color_name || 'Black',
        colorHex: row.color_hex || '#141414',
        colorFamily: row.color_family || 'obsidian',
        stockStatus: row.stock_status || 'In Stock',
        stockNote: row.stock_note || '',
        imageUrl: row.image_url || '',
        galleryImages: row.gallery_images || [row.image_url],
        description: row.description || '',
        fabricSpecs: row.fabric_specs || [],
        availableSizes: (row.available_sizes || ['28', '30', '32', '34', '36', '38']).map((s: string | number) => isNaN(Number(s)) ? s : Number(s)) as any
      }));
    } catch (err) {
      console.warn('Supabase getProducts error:', err);
      return null;
    }
  },

  async deleteProduct(productId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      return !error;
    } catch {
      return false;
    }
  },

  // ==============================
  // 4. SITE SETTINGS & BANNER
  // ==============================
  async saveBanner(banner: CMSBanner): Promise<boolean> {
    try {
      const payload = {
        key: 'hero_banner',
        value: {
          ...banner,
          updatedAt: banner.updatedAt || Date.now()
        },
        updated_at: new Date().toISOString()
      };
      const { error } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'key' });

      if (error) {
        console.warn('Supabase saveBanner note:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase saveBanner error:', err);
      return false;
    }
  },

  async getBanner(): Promise<CMSBanner | null> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'hero_banner')
        .maybeSingle();

      if (error || !data || !data.value) return null;
      return data.value as CMSBanner;
    } catch (err) {
      console.warn('Supabase getBanner error:', err);
      return null;
    }
  },

  async saveStoreSettings(settings: StoreSettings): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'store_settings',
          value: settings
        }, { onConflict: 'key' });
      return !error;
    } catch (err) {
      console.warn('Supabase saveStoreSettings error:', err);
      return false;
    }
  },

  async getStoreSettings(): Promise<StoreSettings | null> {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'store_settings')
        .maybeSingle();

      if (error || !data || !data.value) return null;
      return data.value as StoreSettings;
    } catch (err) {
      console.warn('Supabase getStoreSettings error:', err);
      return null;
    }
  }
};
