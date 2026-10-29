import React from 'react';
import { PageType } from '../types';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  cartCount,
}) => {
  // Hide on checkout and thank-you pages to keep checkout funnel focused as per design
  if (currentPage === 'checkout' || currentPage === 'thank-you') {
    return null;
  }

  const navItems: { page: PageType; label: string; icon: string; count?: number }[] = [
    { page: 'catalog', label: 'Главная', icon: 'storefront' },
    { page: 'cart', label: 'Корзина', icon: 'shopping_cart', count: cartCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-4px_24px_rgba(0,0,0,0.7)]">
      <div className="flex justify-around items-center h-16 px-gutter max-w-xl mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center justify-center gap-space-xs w-20 h-12 transition-all duration-200 cursor-pointer relative active:scale-95 ${
                isActive
                  ? 'text-primary-container font-semibold drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">
                  {item.icon}
                </span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-3 min-w-[17px] h-4 px-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(47,248,1,0.7)]">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
