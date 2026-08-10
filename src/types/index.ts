export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_name?: string;
  created_at: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  page: number;
  subsections?: { title: string; page: number }[];
}

export interface EbookChapter {
  id: string;
  title: string;
  pageNumber: number;
  content: string;
}

export interface Ebook {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  short_description: string;
  price: number;
  sale_price?: number;
  currency: string;
  cover_url: string;
  file_path: string;
  preview_url?: string;
  category_id: string;
  category_name?: string;
  page_count: number;
  published: boolean;
  featured: boolean;
  bestseller: boolean;
  tags?: string[];
  seo_title?: string;
  seo_description?: string;
  preview_content?: string;
  toc_json?: TableOfContentsItem[];
  benefits_json?: string[];
  chapters?: EbookChapter[];
  rating?: number;
  review_count?: number;
  sales_count?: number;
  download_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  ebook_id: string;
  order_id?: string;
  created_at: string;
  ebook?: Ebook;
}

export interface OrderItem {
  id: string;
  order_id: string;
  ebook_id: string;
  price: number;
  ebook?: Ebook;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  user_email?: string;
  user_name?: string;
  total_amount: number;
  discount_amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_provider: string;
  payment_id?: string;
  coupon_code?: string;
  download_status?: 'active' | 'expired' | 'disabled';
  download_count?: number;
  created_at: string;
  items?: OrderItem[];
}

export interface ReadingProgress {
  id: string;
  user_id: string;
  ebook_id: string;
  current_page: number;
  total_pages: number;
  completion_percentage: number;
  last_read_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  ebook_id: string;
  page_number: number;
  note?: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  max_uses?: number;
  used_count: number;
  per_customer_limit?: number;
  applicable_ebook_ids?: string[];
  expires_at?: string;
  active: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  user_name?: string;
  ebook_id: string;
  ebook_title?: string;
  rating: number;
  review_text: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface PaymentOrderResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId?: string;
}

export interface PaymentVerificationPayload {
  orderId: string;
  paymentId: string;
  signature: string;
  ebookId: string;
  userId: string;
  couponCode?: string;
}

export * from './admin';
