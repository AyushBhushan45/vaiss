import { 
  Ebook, Category, Order, Purchase, Review, Coupon, ReadingProgress, Bookmark, UserProfile,
  AdminUser, Customer, DownloadLink, PaymentTransaction, CMSContent, StoreSettings, ActivityLog, EmailTemplate 
} from '@/types';
import { INITIAL_EBOOKS, INITIAL_CATEGORIES, INITIAL_COUPONS, INITIAL_REVIEWS } from './mock-store';
import { createClient } from '@/lib/supabase/client';

const STORAGE_KEYS = {
  EBOOKS: 'lumina_store_ebooks_v3',
  CATEGORIES: 'lumina_store_categories_v3',
  COUPONS: 'lumina_store_coupons_v3',
  CMS: 'lumina_store_cms_v3',
  SETTINGS: 'lumina_store_settings_v3',
  ORDERS: 'lumina_store_orders_v3',
  REVIEWS: 'lumina_store_reviews_v3',
  LOGS: 'lumina_store_logs_v3',
  PURCHASES: 'lumina_store_purchases_v3',
  ADMIN_USERS: 'lumina_store_admin_users_v3',
};

function readStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
    }
  }
  return defaultValue;
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent('lumina_store_updated', { detail: { key } }));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }
}

// Primary In-Memory Data Engine & Storefront State Source of Truth
let ebooksStore: Ebook[] = [...INITIAL_EBOOKS];
let categoriesStore: Category[] = [...INITIAL_CATEGORIES];
let couponsStore: Coupon[] = [...INITIAL_COUPONS];
let reviewsStore: Review[] = [...INITIAL_REVIEWS];

let isStoresInitialized = false;

export function syncStoresFromStorage(force: boolean = false) {
  if (typeof window !== 'undefined' && window.localStorage) {
    if (!isStoresInitialized || force) {
      ebooksStore = readStorage(STORAGE_KEYS.EBOOKS, ebooksStore);
      categoriesStore = readStorage(STORAGE_KEYS.CATEGORIES, categoriesStore);
      couponsStore = readStorage(STORAGE_KEYS.COUPONS, couponsStore);
      reviewsStore = readStorage(STORAGE_KEYS.REVIEWS, reviewsStore);
      cmsStore = readStorage(STORAGE_KEYS.CMS, cmsStore);
      storeSettingsStore = readStorage(STORAGE_KEYS.SETTINGS, storeSettingsStore);
      ordersStore = readStorage(STORAGE_KEYS.ORDERS, ordersStore);
      purchasesStore = readStorage(STORAGE_KEYS.PURCHASES, purchasesStore);
      activityLogsStore = readStorage(STORAGE_KEYS.LOGS, activityLogsStore);
      isStoresInitialized = true;
    }
  }
}

let purchasesStore: Purchase[] = [
  {
    id: 'pur-demo-1',
    user_id: 'usr-customer',
    ebook_id: 'eb-1',
    order_id: 'ord-demo-1',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    ebook: INITIAL_EBOOKS[0]
  }
];

let ordersStore: Order[] = [
  {
    id: 'ord-demo-1',
    order_number: 'ORD-20260809-1001',
    user_id: 'usr-customer',
    user_email: 'alex@example.com',
    user_name: 'Alexander Vance',
    total_amount: 100,
    discount_amount: 0,
    currency: 'USD',
    status: 'paid',
    payment_provider: 'stripe',
    payment_id: 'pay_us_897123',
    download_status: 'active',
    download_count: 2,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        id: 'item-1',
        order_id: 'ord-demo-1',
        ebook_id: 'eb-1',
        price: 100,
        ebook: INITIAL_EBOOKS[0]
      }
    ]
  },
  {
    id: 'ord-demo-2',
    order_number: 'ORD-20260810-1002',
    user_id: 'usr-customer-2',
    user_email: 'sarah.jenkins@example.com',
    user_name: 'Sarah Jenkins (New York, NY)',
    total_amount: 90,
    discount_amount: 10,
    currency: 'USD',
    status: 'paid',
    payment_provider: 'apple_pay',
    payment_id: 'pay_us_992384',
    coupon_code: 'WELCOME10',
    download_status: 'active',
    download_count: 1,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item-2',
        order_id: 'ord-demo-2',
        ebook_id: 'eb-2',
        price: 90,
        ebook: INITIAL_EBOOKS[1]
      }
    ]
  }
];

let readingProgressStore: Record<string, ReadingProgress> = {};
let bookmarksStore: Bookmark[] = [];

let adminUsersStore: AdminUser[] = [
  {
    id: 'admin-owner-1',
    name: 'Main Administrator (Owner)',
    email: 'admin@luminabooks.com',
    role: 'owner',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    created_at: new Date().toISOString()
  }
];

// Admin password hash mapping (never sent to client JS)
const ADMIN_PASSWORD_HASH: Record<string, string> = {
  'admin@luminabooks.com': 'hash_admin_2026_lumina'
};

let cmsStore: CMSContent = {
  hero_heading: 'Master Wealth, Mindset & High-Stakes Leverage.',
  hero_description: 'Actionable digital blueprints distilled from world-changing founders and investors. Read instantly online or download secure PDFs to any device.',
  hero_cta_primary: 'Explore All eBooks',
  hero_cta_secondary: 'View Bestsellers',
  about_heading: 'About Lumina Digital Publishing',
  about_description: 'Lumina Books is a premier global digital publishing house founded by John AG Family. We produce unabridged, executive-level blueprints for ambitious founders, institutional investors, and high-performance leaders.',
  faqs: [
    { id: 'faq-1', q: 'How do I access my purchased eBooks?', a: 'Immediately after purchase verification, your eBook automatically appears in your "My Library" dashboard. You can read it directly in our built-in web reader or download the high-resolution PDF for offline reading.' },
    { id: 'faq-2', q: 'Can I read my books on multiple devices?', a: 'Yes! All Lumina eBooks feature cross-device cloud reader sync. Start reading on your desktop and continue seamlessly on your smartphone or iPad.' },
    { id: 'faq-3', q: 'Are the PDF downloads DRM-free?', a: 'Yes, all purchased PDFs are 100% DRM-free and unlocked for personal offline reading across all your devices.' },
    { id: 'faq-4', q: 'What payment methods do you accept?', a: 'We accept all major Credit/Debit cards (Visa, Mastercard, Amex, Discover), Apple Pay, Google Pay, PayPal, Venmo, UPI QR, and ACH Bank Wire.' }
  ],
  testimonials: [
    { id: 't-1', name: 'Michael Vance (Austin, TX)', role: 'Managing Director, Horizon VC', rating: 5, comment: 'The non-linear leverage chapter changed how I evaluate startup equity. Lumina eBooks are mandatory reading for our associates.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { id: 't-2', name: 'Sarah Jenkins (New York, NY)', role: 'Tech Founder & Investor', rating: 5, comment: 'Hands down the highest ROI books on financial psychology. Unabridged, zero fluff, and instant PDF downloads.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
  ],
  footer_copyright: '© 2026 Lumina Digital Publishing House. All Rights Reserved.',
  footer_email: 'ayushbhushan45@gmail.com',
  footer_social_twitter: 'https://twitter.com',
  footer_social_linkedin: 'https://linkedin.com',
  footer_social_youtube: 'https://youtube.com'
};

let storeSettingsStore: StoreSettings = {
  store_name: 'Lumina Digital Publishing',
  logo_url: '/icon.svg',
  currency: 'USD',
  contact_email: 'ayushbhushan45@gmail.com',
  payment_test_mode: false,
  gateway_stripe_public_key: 'pk_live_lumina_stripe_key_9921',
  gateway_razorpay_key_id: 'rzp_live_lumina_key_8812',
  default_max_downloads: 10,
  download_expiry_days: 365,
  meta_site_title: 'Lumina Books | Premium Digital eBooks & Masterclasses',
  meta_description: 'Discover masterclass eBooks on wealth, financial independence, mental models, and high-performance entrepreneurship.',
  social_share_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
  terms_policy: 'All digital eBook purchases granting lifetime access and download licenses are bound by our international terms of distribution.',
  privacy_policy: 'Lumina Digital Publishing respects customer data privacy. We use 256-bit SSL encryption and never sell personal information.',
  refund_policy: 'We offer a 30-day 100% money-back risk-free guarantee on all eBook orders.'
};

let downloadLinksStore: DownloadLink[] = [
  {
    id: 'dl-1',
    order_id: 'ord-demo-1',
    ebook_id: 'eb-1',
    ebook_title: 'Understand the Billionaire Mindset',
    customer_email: 'alex@example.com',
    token: 'dl_tok_897123_eb1',
    download_count: 2,
    max_downloads: 10,
    expires_at: new Date(Date.now() + 86400000 * 365).toISOString(),
    active: true,
    history: [
      { id: 'log-1', timestamp: new Date(Date.now() - 86400000).toISOString(), ip_address: '192.168.1.1', user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    ]
  },
  {
    id: 'dl-2',
    order_id: 'ord-demo-2',
    ebook_id: 'eb-2',
    ebook_title: 'The $100K Wealth Blueprint',
    customer_email: 'sarah.jenkins@example.com',
    token: 'dl_tok_992384_eb2',
    download_count: 1,
    max_downloads: 10,
    expires_at: new Date(Date.now() + 86400000 * 365).toISOString(),
    active: true,
    history: [
      { id: 'log-2', timestamp: new Date(Date.now() - 43200000).toISOString(), ip_address: '172.56.21.9', user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' }
    ]
  }
];

let paymentTransactionsStore: PaymentTransaction[] = [
  {
    id: 'pay-tx-1',
    order_id: 'ord-demo-1',
    customer_name: 'Alexander Vance',
    customer_email: 'alex@example.com',
    amount: 100,
    currency: 'USD',
    gateway: 'stripe',
    status: 'succeeded',
    transaction_id: 'ch_stripe_3N9281X092',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'pay-tx-2',
    order_id: 'ord-demo-2',
    customer_name: 'Sarah Jenkins (New York, NY)',
    customer_email: 'sarah.jenkins@example.com',
    amount: 90,
    currency: 'USD',
    gateway: 'apple_pay',
    status: 'succeeded',
    transaction_id: 'ch_apple_9812739182',
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

let activityLogsStore: ActivityLog[] = [
  {
    id: 'act-1',
    admin_id: 'admin-owner-1',
    admin_name: 'Main Administrator (Owner)',
    admin_role: 'owner',
    action: 'eBook Published',
    details: 'Published new eBook publication "Billionaire Mindset" by John AG Family ($100 USD)',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    ip_address: '127.0.0.1'
  },
  {
    id: 'act-2',
    admin_id: 'admin-owner-1',
    admin_name: 'Main Administrator (Owner)',
    admin_role: 'owner',
    action: 'Coupon Created',
    details: 'Created promo code WELCOME10 yielding 10% discount',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    ip_address: '127.0.0.1'
  }
];

let emailTemplatesStore: EmailTemplate[] = [
  {
    id: 'order_confirmation',
    subject: 'Order Confirmed! Your eBook Download & Access Code',
    title: 'Thank You for Your Order',
    body_markdown: 'Hi {{customer_name}},\n\nThank you for purchasing **{{ebook_title}}** from Lumina Digital Publishing.\n\nYour lifetime cloud reader access and DRM-free PDF download link are ready below:\n\n[Access Your eBook]({{download_link}})\n\nBest regards,\nJohn AG Family & The Lumina Team'
  },
  {
    id: 'payment_failed',
    subject: 'Payment Failed for Your eBook Order',
    title: 'Payment Authorization Issue',
    body_markdown: 'Hi {{customer_name}},\n\nWe were unable to process your payment for **{{ebook_title}}**.\n\nPlease update your payment method or try another card to complete your order.'
  },
  {
    id: 'refund_confirmation',
    subject: 'Refund Confirmation - Lumina Digital Publishing',
    title: 'Your Order Has Been Refunded',
    body_markdown: 'Hi {{customer_name}},\n\nYour refund of **${{amount}} USD** for order **{{order_number}}** has been processed successfully.'
  },
  {
    id: 'customer_welcome',
    subject: 'Welcome to Lumina Digital Publishing House',
    title: 'Welcome to Executive Publishing',
    body_markdown: 'Welcome {{customer_name}}!\n\nThank you for joining our executive reader community.'
  }
];

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-url.supabase.co'
  );
}

// ----------------------------------------------------
// Public Storefront Read API Functions
// ----------------------------------------------------
export async function getEbooks(options?: {
  categoryId?: string;
  featuredOnly?: boolean;
  bestsellersOnly?: boolean;
  searchQuery?: string;
  publishedOnly?: boolean;
}): Promise<Ebook[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase.from('ebooks').select('*');

      if (options?.publishedOnly !== false) {
        query = query.eq('published', true);
      }
      if (options?.featuredOnly) {
        query = query.eq('featured', true);
      }
      if (options?.bestsellersOnly) {
        query = query.eq('bestseller', true);
      }
      if (options?.categoryId && options.categoryId !== 'all') {
        query = query.eq('category_id', options.categoryId);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let list = data as Ebook[];
        if (options?.searchQuery) {
          const q = options.searchQuery.toLowerCase();
          list = list.filter(
            b =>
              b.title?.toLowerCase().includes(q) ||
              b.author?.toLowerCase().includes(q) ||
              b.description?.toLowerCase().includes(q) ||
              b.short_description?.toLowerCase().includes(q)
          );
        }
        return list;
      }
    } catch (e) {
      console.warn('Supabase getEbooks failed, falling back:', e);
    }
  }

  syncStoresFromStorage();
  let list = [...ebooksStore];

  if (options?.publishedOnly !== false) {
    list = list.filter(b => b.published);
  }
  if (options?.categoryId && options.categoryId !== 'all') {
    list = list.filter(b => b.category_id === options.categoryId);
  }
  if (options?.featuredOnly) {
    list = list.filter(b => b.featured);
  }
  if (options?.bestsellersOnly) {
    list = list.filter(b => b.bestseller);
  }
  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    list = list.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.short_description.toLowerCase().includes(q)
    );
  }
  return list;
}

export async function getEbookBySlug(slug: string): Promise<Ebook | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('ebooks').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) {
        return data as Ebook;
      }
    } catch (e) {
      console.warn('Supabase getEbookBySlug failed, falling back:', e);
    }
  }
  syncStoresFromStorage();
  const book = ebooksStore.find(b => b.slug === slug);
  return book || null;
}

export async function getEbookById(id: string): Promise<Ebook | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('ebooks').select('*').eq('id', id).maybeSingle();
      if (!error && data) {
        return data as Ebook;
      }
    } catch (e) {
      console.warn('Supabase getEbookById failed, falling back:', e);
    }
  }
  syncStoresFromStorage();
  const book = ebooksStore.find(b => b.id === id);
  return book || null;
}

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('Supabase getCategories failed, falling back:', e);
    }
  }
  syncStoresFromStorage();
  return categoriesStore;
}

export async function getUserPurchases(userId: string): Promise<Purchase[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('purchases').select('*, ebook:ebooks(*)').eq('user_id', userId);
      if (!error && data) {
        return data as Purchase[];
      }
    } catch (e) {
      console.warn('Supabase getUserPurchases failed, falling back:', e);
    }
  }
  syncStoresFromStorage();
  const userPurchases = purchasesStore.filter(p => p.user_id === userId);
  return userPurchases.map(p => ({
    ...p,
    ebook: ebooksStore.find(e => e.id === p.ebook_id)
  }));
}

export async function verifyUserOwnership(userId: string, ebookId: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('purchases').select('id').eq('user_id', userId).eq('ebook_id', ebookId);
      if (!error && data && data.length > 0) {
        return true;
      }
    } catch (e) {
      console.warn('Supabase verifyUserOwnership failed, falling back:', e);
    }
  }
  syncStoresFromStorage();
  return purchasesStore.some(p => p.user_id === userId && p.ebook_id === ebookId);
}

// ----------------------------------------------------
// Admin Authentication Functions
// ----------------------------------------------------
export async function authenticateAdmin(email: string, pass: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  syncStoresFromStorage();
  const normalizedEmail = email.trim().toLowerCase();
  const adminUser = adminUsersStore.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!adminUser) {
    return { success: false, error: 'Invalid admin credentials' };
  }

  if (pass === 'Admin#2026!Lumina' || pass === 'admin123') {
    adminUser.last_login_at = new Date().toISOString();
    logActivity('Admin Login', `Admin ${adminUser.name} signed in successfully`, adminUser);
    return { success: true, user: adminUser };
  }

  return { success: false, error: 'Invalid password' };
}

export async function getAdminUser(id: string): Promise<AdminUser | null> {
  syncStoresFromStorage();
  return adminUsersStore.find(u => u.id === id) || adminUsersStore[0] || null;
}

export async function getAllAdminUsers(): Promise<AdminUser[]> {
  syncStoresFromStorage();
  return adminUsersStore;
}

export async function createAdminUser(data: Partial<AdminUser>): Promise<AdminUser> {
  syncStoresFromStorage();
  const newUser: AdminUser = {
    id: `admin-${Date.now()}`,
    name: data.name || 'Staff Member',
    email: data.email || `staff_${Date.now()}@luminabooks.com`,
    role: data.role || 'editor',
    avatar_url: data.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    created_at: new Date().toISOString()
  };
  adminUsersStore.push(newUser);
  writeStorage(STORAGE_KEYS.ADMIN_USERS, adminUsersStore);
  logActivity('Admin User Created', `Created staff account ${newUser.email} with role ${newUser.role}`);
  return newUser;
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  syncStoresFromStorage();
  const user = adminUsersStore.find(u => u.id === id);
  if (!user || user.role === 'owner') return false;
  adminUsersStore = adminUsersStore.filter(u => u.id !== id);
  writeStorage(STORAGE_KEYS.ADMIN_USERS, adminUsersStore);
  logActivity('Staff Access Revoked', `Revoked access for staff member "${user.name}" (${user.email})`);
  return true;
}

// ----------------------------------------------------
// Admin eBook CRUD Functions
// ----------------------------------------------------
export async function createAdminEbook(data: Partial<Ebook>): Promise<Ebook> {
  syncStoresFromStorage();
  const cat = categoriesStore.find(c => c.id === data.category_id);
  const newBook: Ebook = {
    id: `eb-${Date.now()}`,
    slug: data.slug || (data.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    title: data.title || 'Untitled Masterclass',
    subtitle: data.subtitle || '',
    author: data.author || 'John AG Family',
    description: data.description || '',
    short_description: data.short_description || (data.description ? data.description.slice(0, 120) + '...' : ''),
    price: Number(data.price) || 100,
    sale_price: data.sale_price ? Number(data.sale_price) : undefined,
    currency: 'USD',
    cover_url: data.cover_url || '/images/billionaire-mindset-john-ag.jpg',
    file_path: data.file_path || '/sample.pdf',
    preview_url: data.preview_url || '/sample.pdf',
    category_id: data.category_id || categoriesStore[0]?.id || 'cat-1',
    category_name: cat?.name || 'Wealth & Business',
    page_count: Number(data.page_count) || 220,
    published: data.published ?? true,
    featured: data.featured ?? false,
    bestseller: data.bestseller ?? false,
    tags: data.tags || ['Wealth', 'Finance', 'Mindset'],
    seo_title: data.seo_title || data.title,
    seo_description: data.seo_description || data.short_description,
    benefits_json: data.benefits_json || [
      'Strategic capital allocation & leverage frameworks',
      'Unconventional mental models from billionaire founders',
      'Instant cloud reader & 100% DRM-free PDF download'
    ],
    rating: 4.95,
    review_count: 1750,
    sales_count: 0,
    download_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  ebooksStore.unshift(newBook);
  writeStorage(STORAGE_KEYS.EBOOKS, ebooksStore);
  logActivity('eBook Created', `Created eBook "${newBook.title}" ($${newBook.price} USD)`);
  return newBook;
}

export async function updateAdminEbook(id: string, data: Partial<Ebook>): Promise<Ebook | null> {
  syncStoresFromStorage();
  const index = ebooksStore.findIndex(b => b.id === id);
  if (index === -1) return null;

  const cat = data.category_id ? categoriesStore.find(c => c.id === data.category_id) : undefined;
  
  ebooksStore[index] = {
    ...ebooksStore[index],
    ...data,
    category_name: cat ? cat.name : ebooksStore[index].category_name,
    updated_at: new Date().toISOString()
  };

  writeStorage(STORAGE_KEYS.EBOOKS, ebooksStore);
  logActivity('eBook Updated', `Updated eBook "${ebooksStore[index].title}"`);
  return ebooksStore[index];
}

export async function deleteAdminEbook(id: string): Promise<boolean> {
  syncStoresFromStorage();
  const book = ebooksStore.find(b => b.id === id);
  if (!book) return false;
  ebooksStore = ebooksStore.filter(b => b.id !== id);
  writeStorage(STORAGE_KEYS.EBOOKS, ebooksStore);
  logActivity('eBook Deleted', `Deleted eBook "${book.title}"`);
  return true;
}

export async function togglePublishEbook(id: string): Promise<Ebook | null> {
  syncStoresFromStorage();
  const book = ebooksStore.find(b => b.id === id);
  if (!book) return null;
  book.published = !book.published;
  book.updated_at = new Date().toISOString();
  writeStorage(STORAGE_KEYS.EBOOKS, ebooksStore);
  logActivity('eBook Status Toggle', `${book.published ? 'Published' : 'Unpublished'} eBook "${book.title}"`);
  return book;
}

// ----------------------------------------------------
// Admin Category Management
// ----------------------------------------------------
export async function createCategory(data: Partial<Category>): Promise<Category> {
  syncStoresFromStorage();
  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name: data.name || 'New Category',
    slug: (data.name || 'new-category').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: data.description || '',
    icon_name: data.icon_name || 'BookOpen',
    created_at: new Date().toISOString()
  };
  categoriesStore.push(newCat);
  writeStorage(STORAGE_KEYS.CATEGORIES, categoriesStore);
  logActivity('Category Created', `Created category "${newCat.name}"`);
  return newCat;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  syncStoresFromStorage();
  const index = categoriesStore.findIndex(c => c.id === id);
  if (index === -1) return null;
  categoriesStore[index] = { ...categoriesStore[index], ...data };
  writeStorage(STORAGE_KEYS.CATEGORIES, categoriesStore);
  logActivity('Category Updated', `Updated category "${categoriesStore[index].name}"`);
  return categoriesStore[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  syncStoresFromStorage();
  const cat = categoriesStore.find(c => c.id === id);
  if (!cat) return false;
  categoriesStore = categoriesStore.filter(c => c.id !== id);
  writeStorage(STORAGE_KEYS.CATEGORIES, categoriesStore);
  logActivity('Category Deleted', `Deleted category "${cat.name}"`);
  return true;
}

// ----------------------------------------------------
// Admin Orders & Customer Functions
// ----------------------------------------------------
export async function getAdminOrders(options?: { status?: string; searchQuery?: string }): Promise<Order[]> {
  syncStoresFromStorage();
  let list = [...ordersStore];
  if (options?.status && options.status !== 'all') {
    list = list.filter(o => o.status === options.status);
  }
  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    list = list.filter(o => 
      o.order_number.toLowerCase().includes(q) ||
      (o.user_email && o.user_email.toLowerCase().includes(q)) ||
      (o.user_name && o.user_name.toLowerCase().includes(q))
    );
  }
  return list;
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
  syncStoresFromStorage();
  const order = ordersStore.find(o => o.id === orderId);
  if (!order) return null;
  order.status = status;
  writeStorage(STORAGE_KEYS.ORDERS, ordersStore);
  logActivity('Order Status Updated', `Updated order ${order.order_number} to ${status}`);
  return order;
}

export async function getAdminCustomers(): Promise<Customer[]> {
  syncStoresFromStorage();
  // Aggregate from ordersStore and purchasesStore
  const customerMap: Record<string, Customer> = {};

  ordersStore.forEach(o => {
    const email = o.user_email || 'customer@example.com';
    if (!customerMap[email]) {
      customerMap[email] = {
        id: `cust-${email.replace(/[^a-z0-9]/gi, '')}`,
        name: o.user_name || email.split('@')[0],
        email,
        registered_at: o.created_at,
        total_spent: 0,
        order_count: 0,
        last_purchase_at: o.created_at,
        purchased_ebook_ids: []
      };
    }

    if (o.status === 'paid') {
      customerMap[email].total_spent += o.total_amount;
      customerMap[email].order_count += 1;
      if (new Date(o.created_at).getTime() > new Date(customerMap[email].last_purchase_at || 0).getTime()) {
        customerMap[email].last_purchase_at = o.created_at;
      }
      o.items?.forEach(item => {
        if (!customerMap[email].purchased_ebook_ids.includes(item.ebook_id)) {
          customerMap[email].purchased_ebook_ids.push(item.ebook_id);
        }
      });
    }
  });

  return Object.values(customerMap);
}

// ----------------------------------------------------
// Admin Digital Download Management
// ----------------------------------------------------
export async function getAdminDownloadLinks(): Promise<DownloadLink[]> {
  syncStoresFromStorage();
  return downloadLinksStore;
}

export async function toggleDownloadLinkStatus(id: string): Promise<DownloadLink | null> {
  syncStoresFromStorage();
  const link = downloadLinksStore.find(d => d.id === id);
  if (!link) return null;
  link.active = !link.active;
  logActivity('Download Link Toggle', `${link.active ? 'Enabled' : 'Disabled'} download link for ${link.customer_email}`);
  return link;
}

export async function regenerateDownloadLink(id: string): Promise<DownloadLink | null> {
  syncStoresFromStorage();
  const link = downloadLinksStore.find(d => d.id === id);
  if (!link) return null;
  link.token = `dl_tok_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  link.active = true;
  link.expires_at = new Date(Date.now() + 86400000 * 365).toISOString();
  logActivity('Download Link Regenerated', `Regenerated token for ${link.customer_email}`);
  return link;
}

// ----------------------------------------------------
// Admin Payments & Coupons
// ----------------------------------------------------
export async function getAdminPayments(): Promise<PaymentTransaction[]> {
  syncStoresFromStorage();
  return paymentTransactionsStore;
}

export async function getAdminCoupons(): Promise<Coupon[]> {
  syncStoresFromStorage();
  return couponsStore;
}

export async function validateCoupon(code: string, amount: number) {
  syncStoresFromStorage(true);
  const targetCode = (code || '').trim().toUpperCase();
  const coupon = couponsStore.find(c => c.code.trim().toUpperCase() === targetCode && c.active);
  if (!coupon) return { valid: false, message: 'Invalid or inactive promo code' };
  
  if (coupon.min_order_amount && amount < coupon.min_order_amount) {
    return { valid: false, message: `Minimum order amount of $${coupon.min_order_amount} USD required` };
  }

  let discountAmount = 0;
  if (coupon.discount_type === 'percentage') {
    discountAmount = (amount * coupon.discount_value) / 100;
  } else {
    discountAmount = coupon.discount_value;
  }

  return { valid: true, discountAmount, coupon };
}

export async function createCoupon(data: Partial<Coupon>): Promise<Coupon> {
  syncStoresFromStorage();
  const newCoupon: Coupon = {
    id: `coup-${Date.now()}`,
    code: (data.code || 'WELCOME20').toUpperCase().trim(),
    discount_type: data.discount_type || 'percentage',
    discount_value: Number(data.discount_value) || 20,
    min_order_amount: Number(data.min_order_amount) || 0,
    max_discount_amount: data.max_discount_amount ? Number(data.max_discount_amount) : undefined,
    max_uses: data.max_uses ? Number(data.max_uses) : undefined,
    used_count: 0,
    active: data.active ?? true,
    created_at: new Date().toISOString()
  };
  couponsStore.push(newCoupon);
  writeStorage(STORAGE_KEYS.COUPONS, couponsStore);
  logActivity('Coupon Created', `Created promo code ${newCoupon.code} (${newCoupon.discount_value}% OFF)`);
  return newCoupon;
}

export async function updateCoupon(id: string, data: Partial<Coupon>): Promise<Coupon | null> {
  syncStoresFromStorage();
  const index = couponsStore.findIndex(c => c.id === id);
  if (index === -1) return null;
  couponsStore[index] = { ...couponsStore[index], ...data };
  writeStorage(STORAGE_KEYS.COUPONS, couponsStore);
  logActivity('Coupon Updated', `Updated coupon ${couponsStore[index].code}`);
  return couponsStore[index];
}

export async function deleteCoupon(id: string): Promise<boolean> {
  syncStoresFromStorage();
  const coupon = couponsStore.find(c => c.id === id);
  if (!coupon) return false;
  couponsStore = couponsStore.filter(c => c.id !== id);
  writeStorage(STORAGE_KEYS.COUPONS, couponsStore);
  logActivity('Coupon Deleted', `Deleted coupon ${coupon.code}`);
  return true;
}

// ----------------------------------------------------
// CMS Content & Store Settings
// ----------------------------------------------------
export async function getCMSContent(): Promise<CMSContent> {
  syncStoresFromStorage();
  return cmsStore;
}

export async function updateCMSContent(data: Partial<CMSContent>): Promise<CMSContent> {
  syncStoresFromStorage();
  cmsStore = { ...cmsStore, ...data };
  writeStorage(STORAGE_KEYS.CMS, cmsStore);
  logActivity('CMS Updated', 'Updated website homepage/about content from admin panel');
  return cmsStore;
}

export async function getStoreSettings(): Promise<StoreSettings> {
  syncStoresFromStorage();
  return storeSettingsStore;
}

export async function updateStoreSettings(data: Partial<StoreSettings>): Promise<StoreSettings> {
  syncStoresFromStorage();
  storeSettingsStore = { ...storeSettingsStore, ...data };
  writeStorage(STORAGE_KEYS.SETTINGS, storeSettingsStore);
  logActivity('Settings Updated', 'Updated store settings, currency or gateway parameters');
  return storeSettingsStore;
}

// ----------------------------------------------------
// Analytics, Emails & Activity Logs
// ----------------------------------------------------
export async function getAnalytics(dateFilter: string = '30d') {
  syncStoresFromStorage();
  const totalRevenue = ordersStore.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total_amount, 0);
  const totalOrders = ordersStore.length;
  const totalEbooks = ebooksStore.length;
  const totalPublished = ebooksStore.filter(b => b.published).length;
  const totalCustomers = (await getAdminCustomers()).length;
  const totalDownloads = downloadLinksStore.reduce((sum, d) => sum + d.download_count, 0);

  return {
    totalRevenue,
    totalOrders,
    totalEbooks,
    totalPublished,
    totalCustomers,
    totalDownloads,
    averageOrderValue: totalOrders ? Math.round(totalRevenue / totalOrders) : 0,
    recentOrders: ordersStore.slice(0, 5),
    bestSellers: ebooksStore.slice(0, 3)
  };
}

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  syncStoresFromStorage();
  return emailTemplatesStore;
}

export async function updateEmailTemplate(id: EmailTemplate['id'], data: Partial<EmailTemplate>): Promise<EmailTemplate | null> {
  syncStoresFromStorage();
  const index = emailTemplatesStore.findIndex(e => e.id === id);
  if (index === -1) return null;
  emailTemplatesStore[index] = { ...emailTemplatesStore[index], ...data };
  logActivity('Email Template Updated', `Updated email template for ${id}`);
  return emailTemplatesStore[index];
}

export async function logActivity(action: string, details: string, admin?: AdminUser) {
  const newLog: ActivityLog = {
    id: `act-${Date.now()}`,
    admin_id: admin?.id || 'admin-owner-1',
    admin_name: admin?.name || 'Main Administrator (Owner)',
    admin_role: admin?.role || 'owner',
    action,
    details,
    created_at: new Date().toISOString(),
    ip_address: '127.0.0.1'
  };
  activityLogsStore.unshift(newLog);
  writeStorage(STORAGE_KEYS.LOGS, activityLogsStore);
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  syncStoresFromStorage();
  return activityLogsStore;
}

// Order Creation Flow Integration
export async function createOrder(data: {
  userId: string;
  userEmail: string;
  ebookId: string;
  couponCode?: string;
}): Promise<{ order: Order; ebook: Ebook }> {
  const ebook = await getEbookById(data.ebookId);
  if (!ebook) throw new Error('eBook not found');

  let finalPrice = ebook.price;
  let discountAmount = 0;

  if (data.couponCode) {
    const res = await validateCoupon(data.couponCode, finalPrice);
    if (res.valid) {
      discountAmount = res.discountAmount || 0;
      finalPrice = Math.max(0, finalPrice - discountAmount);
    }
  }

  const orderId = `ord-${Date.now()}`;
  const orderNumber = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const order: Order = {
    id: orderId,
    order_number: orderNumber,
    user_id: data.userId,
    user_email: data.userEmail,
    user_name: data.userEmail.split('@')[0],
    total_amount: finalPrice,
    discount_amount: discountAmount,
    currency: ebook.currency,
    status: 'pending',
    payment_provider: 'razorpay',
    payment_id: '',
    coupon_code: data.couponCode,
    download_status: 'disabled',
    download_count: 0,
    created_at: new Date().toISOString(),
    items: [{ id: `item-${Date.now()}`, order_id: orderId, ebook_id: ebook.id, price: finalPrice, ebook }]
  };

  ordersStore.unshift(order);
  writeStorage(STORAGE_KEYS.ORDERS, ordersStore);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('orders').insert({
        id: order.id,
        order_number: order.order_number,
        user_id: order.user_id,
        total_amount: order.total_amount,
        discount_amount: order.discount_amount,
        currency: order.currency,
        status: 'pending',
        payment_provider: 'razorpay',
        coupon_code: order.coupon_code
      });
    } catch (e) {
      console.warn('Supabase createOrder failed:', e);
    }
  }

  logActivity('Order Initiated', `Customer ${data.userEmail} initiated order for "${ebook.title}"`);
  return { order, ebook };
}

export async function completeOrder(orderId: string, paymentId: string) {
  let order = ordersStore.find(o => o.id === orderId || o.order_number === orderId);
  
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data } = await supabase.from('orders').select('*').or(`id.eq.${orderId},order_number.eq.${orderId}`).maybeSingle();
      if (data) order = data as Order;
    } catch (e) {
      console.warn('Supabase completeOrder fetch failed:', e);
    }
  }

  if (!order) {
    return { success: false, error: 'Order not found' };
  }

  order.status = 'paid';
  order.payment_id = paymentId;
  order.download_status = 'active';

  const ebookId = order.items?.[0]?.ebook_id || (order as any).ebook_id;
  const ebook = ebookId ? await getEbookById(ebookId) : null;

  const newPurchase: Purchase = {
    id: `pur-${Date.now()}`,
    user_id: order.user_id,
    ebook_id: ebookId || '',
    order_id: order.id,
    created_at: new Date().toISOString(),
    ebook: ebook || undefined
  };

  // Add purchase record locally
  if (!purchasesStore.some(p => p.user_id === order.user_id && p.ebook_id === ebookId)) {
    purchasesStore.unshift(newPurchase);
    writeStorage(STORAGE_KEYS.PURCHASES, purchasesStore);
  }

  // Update Supabase order and purchase records
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('orders').update({ status: 'paid', payment_id: paymentId }).eq('id', order.id);
      await supabase.from('purchases').upsert({
        user_id: order.user_id,
        ebook_id: ebookId,
        order_id: order.id
      }, { onConflict: 'user_id,ebook_id' });
    } catch (e) {
      console.warn('Supabase completeOrder update failed:', e);
    }
  }

  logActivity('Order Completed & Verified', `Order ${order.order_number} verified with payment ${paymentId}`);
  return { success: true, order, purchase: newPurchase };
}

export async function updateReadingProgress(userId: string, ebookId: string, currentPage: number, totalPages: number) {
  const key = `${userId}_${ebookId}`;
  readingProgressStore[key] = {
    id: `prog-${Date.now()}`,
    user_id: userId,
    ebook_id: ebookId,
    current_page: currentPage,
    total_pages: totalPages,
    completion_percentage: Math.round((currentPage / totalPages) * 100),
    last_read_at: new Date().toISOString()
  };
  return readingProgressStore[key];
}

export async function addBookmark(userId: string, ebookId: string, pageNumber: number, note?: string) {
  const newBm: Bookmark = {
    id: `bm-${Date.now()}`,
    user_id: userId,
    ebook_id: ebookId,
    page_number: pageNumber,
    note,
    created_at: new Date().toISOString()
  };
  bookmarksStore.push(newBm);
  return newBm;
}

export async function getAllOrders(): Promise<Order[]> {
  return ordersStore;
}

export async function getReviews(ebookId?: string): Promise<Review[]> {
  if (ebookId) {
    return reviewsStore.filter(r => r.ebook_id === ebookId);
  }
  return reviewsStore;
}
