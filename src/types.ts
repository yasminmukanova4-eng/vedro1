export type ProductCategory = 'all' | 'potions' | 'horror' | 'sour' | 'chocolate' | 'limited';

export type PageType = 'catalog' | 'product' | 'cart' | 'checkout' | 'thank-you';

export interface ProductBadge {
  text: string;
  icon: string;
  type: 'potion' | 'sour' | 'hit' | 'spicy' | 'limited';
}

export interface SweetProduct {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  image: string;
  badge: ProductBadge;
  toxicityLevel: number; // 1 to 5
  toxicityLabel: string;
  description: string;
  composition: string;
  weight: string;
  shelfLife: string;
  storage: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
}

export interface CartItem {
  product: SweetProduct;
  quantity: number;
}

export interface DeliverySlot {
  id: string;
  date: string;
  time: string;
  tag: string;
  isExpress?: boolean;
}

export interface CheckoutFormState {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
  slotId: string;
  paymentMethod: 'kaspi' | 'card' | 'nfc';
}

export interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  discount: number;
  finalTotal: number;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  notes: string;
  deliverySlot: string;
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  minOrder: number;
  description: string;
}
