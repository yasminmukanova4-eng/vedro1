import React, { useState } from 'react';
import { SweetProduct } from '../types';

interface ProductPageProps {
  product: SweetProduct;
  onBack: () => void;
  onAddToCart: (product: SweetProduct, quantity: number) => void;
  onGoToCart: () => void;
  cartQuantity: number;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onGoToCart,
  cartQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  const badgeStyle =
    product.badge.type === 'potion'
      ? 'bg-tertiary-container/20 text-tertiary border-tertiary/40'
      : product.badge.type === 'sour'
      ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-fixed/40'
      : 'bg-primary-container/20 text-primary-fixed border-primary-container/40';

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-xl gap-space-md animate-fadeIn">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface hover:text-primary transition-all border border-surface-container-high/60 cursor-pointer font-medium text-xs active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Назад к витрине</span>
        </button>

        {cartQuantity > 0 && (
          <button
            type="button"
            onClick={onGoToCart}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container-high text-primary-container border border-primary-container/30 text-xs font-semibold hover:brightness-110 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
            <span>В корзине ({cartQuantity})</span>
          </button>
        )}
      </div>

      {/* Main Product Showcase Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl p-space-md flex flex-col gap-space-md">
        {/* Glow ambient background */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>

        {/* Product Visual Container */}
        <div className="relative w-full aspect-square sm:h-72 rounded-xl overflow-hidden bg-surface-container-lowest flex items-center justify-center border border-surface-container-highest">
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
              className={`px-2.5 py-1 rounded-full font-label-sm text-xs backdrop-blur-md flex items-center gap-1 border ${badgeStyle} shadow-lg`}
            >
              <span className="material-symbols-outlined text-[13px]">{product.badge.icon}</span>
              <span>{product.badge.text}</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-surface-container-lowest/85 backdrop-blur-md text-xs text-secondary-fixed flex items-center gap-1.5 font-semibold border border-secondary-fixed/20">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
            <span>В наличии в Алматы</span>
          </div>
        </div>

        {/* Title, Subtitle, Price */}
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-2xl sm:text-3xl text-on-surface leading-tight">
            {product.title}
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant">{product.subtitle}</p>

          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-display-lg text-3xl font-bold text-on-surface">
              {(product.price * quantity).toLocaleString('ru-RU')}
            </span>
            <span className="font-headline-md text-2xl font-bold text-primary-container">₸</span>
            {quantity > 1 && (
              <span className="text-xs text-on-surface-variant ml-2">
                ({product.price.toLocaleString('ru-RU')} ₸ / шт)
              </span>
            )}
          </div>
        </div>

        {/* Potion Toxicity & Intensity Meter */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2 shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="font-label-md text-on-surface flex items-center gap-1.5 font-semibold">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                experiment
              </span>
              <span>Интенсивность зелья / Кислотность:</span>
            </span>
            <span className="text-secondary-fixed-dim font-bold text-sm">
              {product.toxicityLevel} / 5
            </span>
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
          <span className="text-xs text-on-surface-variant font-medium">
            {product.toxicityLabel}
          </span>
        </div>

        {/* Description & Ritual lore */}
        <div className="flex flex-col gap-1.5 text-sm text-on-surface-variant leading-relaxed">
          <span className="font-label-md text-on-surface font-semibold text-xs uppercase tracking-wider text-outline">
            Описание лакомства:
          </span>
          <p>{product.description}</p>
        </div>

        {/* Technical specifications */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Вес / объём:</span>
            <span className="text-on-surface font-medium">{product.weight}</span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Срок годности:</span>
            <span className="text-on-surface font-medium">{product.shelfLife}</span>
          </div>
          <div className="col-span-2 p-3 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Состав:</span>
            <span className="text-on-surface font-medium">{product.composition}</span>
          </div>
          <div className="col-span-2 p-3 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-0.5">
            <span className="text-outline font-semibold">Хранение:</span>
            <span className="text-on-surface font-medium">{product.storage}</span>
          </div>
        </div>

        {/* Quantity Stepper & Add to Cart button */}
        <div className="flex items-center gap-3 pt-3 border-t border-surface-container-highest">
          <div className="flex items-center rounded-xl bg-surface-container-high px-2 py-1.5 border border-surface-container-highest shadow-inner">
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
            className={`flex-1 py-4 px-4 rounded-xl font-label-lg uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 ${
              addedAnimation
                ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_20px_rgba(47,248,1,0.6)]'
                : 'bg-primary-container text-on-primary-container shadow-[0_0_24px_rgba(255,107,0,0.5)] hover:brightness-110'
            }`}
          >
            {addedAnimation ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Добавлено в корзину!</span>
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
