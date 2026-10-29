import React, { useState } from 'react';
import { SweetProduct } from '../types';

interface ProductDetailModalProps {
  product: SweetProduct | null;
  onClose: () => void;
  onAddToCart: (product: SweetProduct, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  const badgeStyle =
    product.badge.type === 'potion'
      ? 'bg-tertiary-container/20 text-tertiary border-tertiary/30'
      : product.badge.type === 'sour'
      ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-fixed/30'
      : 'bg-primary-container/20 text-primary-fixed border-primary-container/30';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} role="button" tabIndex={-1} />

      {/* Modal Card / Bottom Sheet on mobile */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-3xl sm:rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl p-space-md flex flex-col gap-space-md z-10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-highest/80 text-on-surface-variant hover:text-on-surface flex items-center justify-center border border-surface-container-high transition-colors cursor-pointer z-20"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Product Visual with Bioluminescent Glow */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center">
          <div className="absolute inset-0 bg-radial from-tertiary-container/15 via-transparent to-transparent pointer-events-none"></div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/stitch/stitch_halloween_spooky_sweets_mobile_store/spooky_halloween_candy_set_luxury_gift_box_potion_bottles_filled_with_glowing/screen.png';
            }}
          />

          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-full font-label-sm text-xs backdrop-blur-md flex items-center gap-1 border ${badgeStyle}`}
            >
              <span className="material-symbols-outlined text-[13px]">{product.badge.icon}</span>
              {product.badge.text}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-surface-container-lowest/85 backdrop-blur-sm text-xs text-secondary-fixed flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
            <span>В наличии в Алматы</span>
          </div>
        </div>

        {/* Title & Price */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              {product.title}
            </h2>
          </div>
          <p className="font-body-md text-on-surface-variant">{product.subtitle}</p>

          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-display-lg text-3xl font-bold text-on-surface">
              {(product.price * quantity).toLocaleString('ru-RU')}
            </span>
            <span className="font-headline-md text-xl font-bold text-primary-container">₸</span>
            {quantity > 1 && (
              <span className="text-xs text-on-surface-variant ml-2">
                ({product.price.toLocaleString('ru-RU')} ₸ / шт)
              </span>
            )}
          </div>
        </div>

        {/* Toxicity / Intensity Meter */}
        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-label-md text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                experiment
              </span>
              <span>Интенсивность зелья</span>
            </span>
            <span className="text-secondary-fixed-dim font-bold">{product.toxicityLevel} / 5</span>
          </div>

          {/* 5-segment glowing vials */}
          <div className="grid grid-cols-5 gap-1.5 h-3">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <div
                key={lvl}
                className={`h-full rounded-sm transition-all duration-300 ${
                  lvl <= product.toxicityLevel
                    ? 'bg-secondary-container shadow-[0_0_8px_rgba(47,248,1,0.6)]'
                    : 'bg-surface-container-highest opacity-40'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-on-surface-variant">{product.toxicityLabel}</span>
        </div>

        {/* Detailed description */}
        <div className="flex flex-col gap-1 text-sm text-on-surface-variant leading-relaxed">
          <span className="font-label-md text-on-surface font-semibold">Описание ритуала:</span>
          <p>{product.description}</p>
        </div>

        {/* Ingredients & Specs */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Вес / объём:</span>
            <span className="text-on-surface font-medium">{product.weight}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Срок годности:</span>
            <span className="text-on-surface font-medium">{product.shelfLife}</span>
          </div>
          <div className="col-span-2 p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high/50 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Состав:</span>
            <span className="text-on-surface font-medium">{product.composition}</span>
          </div>
        </div>

        {/* Quantity Stepper & Add to Cart button */}
        <div className="flex items-center gap-3 pt-2 border-t border-surface-container-highest">
          <div className="flex items-center rounded-xl bg-surface-container-high px-2 py-1 border border-surface-container-highest shadow-inner">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="w-8 text-center font-label-lg font-bold text-on-surface">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-4 rounded-xl font-label-lg uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2 ${
              added
                ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_20px_rgba(47,248,1,0.6)]'
                : 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:brightness-110'
            }`}
          >
            {added ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Добавлено в котёл!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
                <span>В корзину — {(product.price * quantity).toLocaleString('ru-RU')} ₸</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
