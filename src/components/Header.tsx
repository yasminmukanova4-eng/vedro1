import React from 'react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
  onBackFromCheckout?: () => void;
  onBackFromProduct?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onBackFromCheckout,
  onBackFromProduct,
}) => {
  // If we are in Checkout screen, show the Screen 2 header style
  if (currentPage === 'checkout') {
    return (
      <header className="sticky top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_16px_rgba(0,0,0,0.5)]">
        <div className="h-16 px-gutter flex items-center justify-between gap-space-sm max-w-xl mx-auto">
          <div className="flex items-center gap-space-sm min-w-0 flex-1">
            <button
              type="button"
              aria-label="Назад в корзину"
              onClick={onBackFromCheckout || (() => onNavigate('cart'))}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:text-primary transition-all duration-200 active:scale-95 flex-shrink-0 border border-surface-container-high/60 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
              Оформление Заказа
            </h1>
          </div>

          <div className="flex items-center gap-space-xs flex-shrink-0">
            <div className="relative p-0.5 rounded-full ring-1 ring-primary-container/40">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1V2QkoICgozXbVsmpQ4I2IvGpDiGzAG0-3KyQ2bRePzBQlXNRd9to40pMcT2_lKygao4m5FRN3jq_PRN87Xmr1uuV15A1NMcKTewIutx6eg5-5MhTodpLHqs5yH5QXcrG3UC7M4Yzuh0Z58r0OLbBSq2KYYIf7GHTYaH6xWPDGM9FpKmBRU5RaWI4EBBqmrn7cEk-BNpWPOVmDZ0-k-nTcX3CZOx540UgOss-cbpRA"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23ff6b00"><circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-8 4-8 6h16c0-2-2-6-8-6z"/></svg>';
                }}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // If in product view, offer back navigation
  if (currentPage === 'product') {
    return (
      <header className="sticky top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_16px_rgba(0,0,0,0.5)]">
        <div className="h-16 px-gutter flex items-center justify-between gap-space-sm max-w-xl mx-auto">
          <div className="flex items-center gap-space-sm min-w-0 flex-1">
            <button
              type="button"
              aria-label="Назад к витрине"
              onClick={onBackFromProduct || (() => onNavigate('catalog'))}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:text-primary transition-all duration-200 active:scale-95 flex-shrink-0 border border-surface-container-high/60 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
              Детали лакомства
            </h1>
          </div>

          <button
            type="button"
            aria-label="Корзина"
            onClick={() => onNavigate('cart')}
            className="w-11 h-11 relative flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer active:scale-95 border border-surface-container-high/60"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center justify-center shadow-[0_0_10px_rgba(57,255,20,0.6)] animate-pulse font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    );
  }

  // If in thank-you view
  if (currentPage === 'thank-you') {
    return (
      <header className="sticky top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_16px_rgba(0,0,0,0.5)]">
        <div className="h-16 px-gutter flex items-center justify-between gap-space-sm max-w-xl mx-auto">
          <div className="flex items-center gap-space-sm min-w-0 flex-1">
            <button
              type="button"
              aria-label="К витрине"
              onClick={() => onNavigate('catalog')}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface hover:text-primary transition-all duration-200 active:scale-95 flex-shrink-0 border border-surface-container-high/60 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm text-secondary-fixed truncate">
              Заказ подтверждён
            </h1>
          </div>
        </div>
      </header>
    );
  }

  // Standard Store Header (Screen 1 & Catalog style)
  return (
    <header className="sticky top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_16px_rgba(0,0,0,0.45)]">
      <div className="h-20 px-gutter flex items-center justify-between gap-space-sm max-w-xl mx-auto">
        {/* Brand identity */}
        <div
          className="flex items-center gap-space-sm min-w-0 flex-1 cursor-pointer select-none"
          onClick={() => onNavigate('catalog')}
          role="button"
          tabIndex={0}
        >
          <div className="relative flex-shrink-0 flex items-center justify-center p-space-xs rounded-full bg-surface-container-high ring-1 ring-primary-container/30 shadow-[0_0_12px_rgba(255,107,0,0.25)]">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V2QkoICgozXbVsmpQ4I2IvGpDiGzAG0-3KyQ2bRePzBQlXNRd9to40pMcT2_lKygao4m5FRN3jq_PRN87Xmr1uuV15A1NMcKTewIutx6eg5-5MhTodpLHqs5yH5QXcrG3UC7M4Yzuh0Z58r0OLbBSq2KYYIf7GHTYaH6xWPDGM9FpKmBRU5RaWI4EBBqmrn7cEk-BNpWPOVmDZ0-k-nTcX3CZOx540UgOss-cbpRA"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="%23ff6b00"><circle cx="12" cy="8" r="4"/><path d="M12 14c-6 0-8 4-8 6h16c0-2-2-6-8-6z"/></svg>';
              }}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary tracking-wide truncate">
                Тыквенный Кошмар
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[13px] text-secondary-fixed">
                location_on
              </span>
              <span className="font-label-sm text-label-sm text-secondary-fixed truncate drop-shadow-[0_0_6px_rgba(57,255,20,0.4)]">
                Алматы / Доставка по РК
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-space-xs flex-shrink-0">
          <button
            type="button"
            aria-label="Каталог"
            onClick={() => onNavigate('catalog')}
            className={`w-11 h-11 flex items-center justify-center rounded-xl bg-surface-container-low transition-all duration-200 cursor-pointer active:scale-95 border border-surface-container-high/60 ${
              currentPage === 'catalog'
                ? 'text-primary-container bg-surface-container-high border-primary-container/40'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            title="Витрина сладостей"
          >
            <span className="material-symbols-outlined text-[22px]">storefront</span>
          </button>

          <button
            type="button"
            aria-label="Корзина"
            onClick={() => onNavigate('cart')}
            className={`w-11 h-11 relative flex items-center justify-center rounded-xl bg-surface-container-low transition-all duration-200 cursor-pointer active:scale-95 border border-surface-container-high/60 ${
              currentPage === 'cart'
                ? 'text-primary-container bg-surface-container-high border-primary-container/40'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            title="Корзина"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center justify-center shadow-[0_0_10px_rgba(57,255,20,0.6)] animate-pulse font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
