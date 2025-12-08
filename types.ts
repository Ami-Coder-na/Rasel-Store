
export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  brand: string; // Added brand
  description: string;
  images: string[];
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  arEnabled: boolean;
  stock: number;
  carbonFootprint: string; // e.g., "Low", "Neutral"
  colors?: string[]; // Hex codes or names
  sizes?: string[]; // e.g., S, M, L, XL or Storage sizes
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface UserContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  location: string;
  deviceType: 'mobile' | 'desktop';
  theme: 'light' | 'dark';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate?: string;
  address?: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
  paymentMethod: string;
  trackingNumber?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  icon: 'login' | 'security' | 'order' | 'edit';
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART_CHECKOUT = 'CART_CHECKOUT',
  AR_VIEW = 'AR_VIEW',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  COMPARE = 'COMPARE',
  PROFILE = 'PROFILE',
  TRACK_ORDER = 'TRACK_ORDER'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}