export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  arEnabled: boolean;
  stock: number;
  carbonFootprint: string; // e.g., "Low", "Neutral"
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
}

export enum ViewState {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART_CHECKOUT = 'CART_CHECKOUT',
  AR_VIEW = 'AR_VIEW',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}