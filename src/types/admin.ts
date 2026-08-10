import { Ebook, Order, Category, Coupon } from './index';

export type AdminRole = 'owner' | 'editor' | 'support' | 'analyst';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar_url?: string;
  created_at: string;
  last_login_at?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  registered_at: string;
  total_spent: number;
  order_count: number;
  last_purchase_at?: string;
  purchased_ebook_ids: string[];
}

export interface DownloadLog {
  id: string;
  timestamp: string;
  ip_address: string;
  user_agent: string;
}

export interface DownloadLink {
  id: string;
  order_id: string;
  ebook_id: string;
  ebook_title: string;
  customer_email: string;
  token: string;
  download_count: number;
  max_downloads: number;
  expires_at: string;
  active: boolean;
  history: DownloadLog[];
}

export interface PaymentTransaction {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  gateway: 'stripe' | 'razorpay' | 'paypal' | 'apple_pay' | 'bank_wire';
  status: 'succeeded' | 'pending' | 'failed' | 'refunded';
  transaction_id: string;
  created_at: string;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface CMSContent {
  hero_heading: string;
  hero_description: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  about_heading: string;
  about_description: string;
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  footer_copyright: string;
  footer_email: string;
  footer_social_twitter: string;
  footer_social_linkedin: string;
  footer_social_youtube: string;
}

export interface StoreSettings {
  store_name: string;
  logo_url: string;
  currency: string;
  contact_email: string;
  payment_test_mode: boolean;
  gateway_stripe_public_key: string;
  gateway_razorpay_key_id: string;
  default_max_downloads: number;
  download_expiry_days: number;
  meta_site_title: string;
  meta_description: string;
  social_share_image: string;
  terms_policy: string;
  privacy_policy: string;
  refund_policy: string;
}

export interface ActivityLog {
  id: string;
  admin_id: string;
  admin_name: string;
  admin_role: AdminRole;
  action: string;
  details: string;
  created_at: string;
  ip_address?: string;
}

export interface EmailTemplate {
  id: 'order_confirmation' | 'payment_failed' | 'refund_confirmation' | 'customer_welcome';
  subject: string;
  title: string;
  body_markdown: string;
}
