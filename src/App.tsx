export const TOKEN = "9043368004:AAG8oGqXHoB3UG9FkUHwfvzCF7l1bEIoNi4";
export const CHAT_ID = "5262113630";

import React, { useState, useEffect } from 'react';
import { PageType, CartItem, SweetProduct, PromoCode, OrderConfirmation } from './types';
import { PRODUCTS, INITIAL_CART_ITEMS, VALID_PROMO_CODES } from './data/products';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CatalogView } from './components/CatalogView';
import { ProductPage } from './components/ProductPage';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { ThankYouPage } from './components/ThankYouPage';

const LOCAL_STORAGE_CART_KEY = 'tengri_cart';
const LOCAL_STORAGE_PROMO_KEY = 'tengri_promo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('cart');
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);

  // Initialize cart from localStorage, fallback to INITIAL_CART_ITEMS
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_CART_ITEMS;
  });

  // Initialize promo code from localStorage or default HALLOWEEN13
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROMO_KEY);
      if (saved && VALID_PROMO_CODES[saved]) {
        return VALID_PROMO_CODES[saved];
      }
    } catch {
      // Fallback
    }
    return VALID_PROMO_CODES.HALLOWEEN13;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Save promo code to localStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(LOCAL_STORAGE_PROMO_KEY, appliedPromo.code);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_PROMO_KEY);
      }
    } catch (e) {
      console.warn('Failed to save promo to localStorage', e);
    }
  }, [appliedPromo]);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const selectedProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  // Cart Handlers
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddToCart = (product: SweetProduct, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleApplyPromo = (code: string): boolean => {
    const promo = VALID_PROMO_CODES[code.toUpperCase()];
    if (promo) {
      setAppliedPromo(promo);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Navigate to product page
  const handleOpenProduct = (product: SweetProduct) => {
    setSelectedProductId(product.id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when Telegram sendMessage returns ok: true
  const handleOrderSuccess = (order: OrderConfirmation) => {
    // Clear cart state and localStorage
    setCartItems([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    } catch {
      // Ignore
    }

    setCompletedOrder(order);
    setCurrentPage('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProductCartQuantity = (productId: string): number => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e5e2e1] flex flex-col items-center justify-start antialiased selection:bg-[#ff6b00]/30 selection:text-[#ffb693]">
      {/* Top Floating View & Device Bar */}
      <div className="w-full bg-[#141414] border-b border-[#2a2a2a] py-2 px-3 flex items-center justify-between z-50 text-xs shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="font-semibold text-primary-container flex items-center gap-1 mr-1">
            <span>🎃</span>
            <span className="hidden sm:inline">Страницы:</span>
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage('catalog')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'catalog'
                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Витрина
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('product')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'product'
                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Товар
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('cart')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'cart'
                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Корзина ({totalItemCount})
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage('checkout')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
              currentPage === 'checkout'
                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Оформление
          </button>
          {completedOrder && (
            <button
              type="button"
              onClick={() => setCurrentPage('thank-you')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                currentPage === 'thank-you'
                  ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
                  : 'bg-surface-container-high text-secondary-fixed'
              }`}
            >
              Спасибо
            </button>
          )}
        </div>

        {/* Viewport Frame Toggle */}
        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors border border-surface-container-highest cursor-pointer font-medium"
            title={isMobileFrame ? 'Переключить на полный экран' : 'Переключить на мобильный фрейм'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isMobileFrame ? 'fullscreen' : 'smartphone'}
            </span>
            <span className="hidden md:inline">
              {isMobileFrame ? 'Полный экран' : 'Смартфон'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Frame or Full Viewport */}
      <div
        className={`w-full transition-all duration-300 flex justify-center ${
          isMobileFrame
            ? 'py-4 sm:py-8 px-0 sm:px-4'
            : 'w-full'
        }`}
      >
        <div
          className={`relative bg-[#131313] flex flex-col overflow-hidden transition-all duration-300 ${
            isMobileFrame
              ? 'w-full max-w-[430px] min-h-[880px] sm:rounded-[42px] sm:border-[8px] sm:border-[#2a2a2a] sm:shadow-[0_25px_60px_-15px_rgba(255,107,0,0.25)]'
              : 'w-full max-w-2xl min-h-screen'
          }`}
        >
          {/* Mobile Speaker / Camera notch indicator on framed view */}
          {isMobileFrame && (
            <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-[#2a2a2a] rounded-b-xl z-50 items-center justify-center">
              <div className="w-10 h-1 bg-[#1a1a1a] rounded-full mr-2"></div>
              <div className="w-2.5 h-2.5 bg-[#141414] rounded-full border border-primary/20"></div>
            </div>
          )}

          {/* Sticky Header */}
          <Header
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
            cartCount={totalItemCount}
            onBackFromCheckout={() => setCurrentPage('cart')}
            onBackFromProduct={() => setCurrentPage('catalog')}
          />

          {/* Page Routing */}
          <main className="flex-1 flex flex-col pt-3 pb-24 min-h-[calc(100vh-140px)]">
            {currentPage === 'catalog' && (
              <CatalogView
                products={PRODUCTS}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onSelectProduct={handleOpenProduct}
                onOpenCart={() => setCurrentPage('cart')}
                cartCount={totalItemCount}
              />
            )}

            {currentPage === 'product' && (
              <ProductPage
                product={selectedProduct}
                onBack={() => setCurrentPage('catalog')}
                onAddToCart={handleAddToCart}
                onGoToCart={() => setCurrentPage('cart')}
                cartQuantity={getProductCartQuantity(selectedProduct.id)}
              />
            )}

            {currentPage === 'cart' && (
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onProceedToCheckout={() => setCurrentPage('checkout')}
                onSelectProduct={handleOpenProduct}
                onBrowseCatalog={() => setCurrentPage('catalog')}
                appliedPromo={appliedPromo}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
              />
            )}

            {currentPage === 'checkout' && (
              <CheckoutView
                cartItems={cartItems}
                appliedPromo={appliedPromo}
                onBackToCart={() => setCurrentPage('cart')}
                onOrderSuccess={handleOrderSuccess}
              />
            )}

            {currentPage === 'thank-you' && completedOrder && (
              <ThankYouPage
                order={completedOrder}
                onGoToCatalog={() => setCurrentPage('catalog')}
              />
            )}
          </main>

          {/* Bottom Nav Bar */}
          <BottomNav
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
            cartCount={totalItemCount}
          />
        </div>
      </div>
    </div>
  );
}
