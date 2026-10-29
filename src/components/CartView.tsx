import React, { useState } from 'react';
import { CartItem, SweetProduct, PromoCode } from '../types';
import { VALID_PROMO_CODES } from '../data/products';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (product: SweetProduct) => void;
  onBrowseCatalog: () => void;
  appliedPromo: PromoCode | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onSelectProduct,
  onBrowseCatalog,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState<string>(
    appliedPromo ? appliedPromo.code : 'HALLOWEEN13'
  );
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // Calculation math
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 15000;
  const isFreeShipping = itemsSubtotal >= freeShippingThreshold;
  const deliveryCost = isFreeShipping ? 0 : 1500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - itemsSubtotal);

  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, itemsSubtotal + deliveryCost - discountAmount);

  const handleApplyPromo = () => {
    setIsApplying(true);
    setPromoError(null);
    setTimeout(() => {
      setIsApplying(false);
      const cleaned = promoInput.trim().toUpperCase();
      if (!cleaned) {
        setPromoError('Введите кодовое слово');
        return;
      }
      const success = onApplyPromo(cleaned);
      if (!success) {
        setPromoError('Неверный код или нечисть отклонила заклинание');
      }
    }, 250);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-gutter py-12 text-center max-w-md mx-auto">
        <div className="relative w-24 h-24 mb-6 rounded-full bg-surface-container-high flex items-center justify-center ring-2 ring-primary-container/20 shadow-[0_0_24px_rgba(255,107,0,0.2)]">
          <span className="material-symbols-outlined text-[48px] text-primary-container animate-pulse">
            soup_kitchen
          </span>
          <span className="absolute -top-1 -right-1 text-2xl">🕷️</span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
          Ваш котёл пуст
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-xs">
          Ни одного зелья или хрустящего черепа еще не добавлено в ваш ночной запас.
        </p>
        <button
          type="button"
          onClick={onBrowseCatalog}
          className="w-full py-3.5 px-6 rounded-xl bg-primary-container text-on-primary-container font-label-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,0,0.45)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
          <span>Перейти к витрине сладостей</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-lg gap-space-lg">
      {/* Header Banner Section */}
      <div className="flex items-center justify-between pt-space-xs">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px] drop-shadow-[0_0_8px_rgba(121,255,91,0.5)]">
              auto_fix_high
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Твоя корзина с ужасами
            </h1>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs mt-0.5">
            <span>{cartItems.length} позиции ({totalItemCount} шт)</span>
            <span className="inline-block w-1 h-1 rounded-full bg-primary-container"></span>
            <span className="text-secondary-fixed drop-shadow-[0_0_5px_rgba(121,255,91,0.3)]">
              Готово к заклинанию
            </span>
          </p>
        </div>

        <button
          type="button"
          aria-label="Очистить все"
          onClick={onClearCart}
          className="flex items-center justify-center p-space-sm rounded-xl bg-surface-container-low text-on-surface-variant hover:text-error hover:bg-error-container/20 transition-all border border-surface-container-high/60 cursor-pointer"
          title="Очистить всю корзину"
        >
          <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
        </button>
      </div>

      {/* Cart Items List (Vitrine Glass Cards) */}
      <div className="flex flex-col gap-space-sm" id="cart-items-container">
        {cartItems.map((item) => {
          const { product, quantity } = item;
          const badgeClass =
            product.badge.type === 'potion'
              ? 'bg-tertiary-container/20 text-tertiary shadow-[0_0_8px_rgba(187,122,255,0.3)]'
              : product.badge.type === 'sour'
              ? 'bg-secondary-container/20 text-secondary-fixed shadow-[0_0_8px_rgba(57,255,20,0.3)]'
              : 'bg-primary-container/20 text-primary-fixed shadow-[0_0_8px_rgba(255,107,0,0.3)]';

          const glowClass =
            product.badge.type === 'potion'
              ? 'bg-tertiary-container/10'
              : product.badge.type === 'sour'
              ? 'bg-secondary-container/10'
              : 'bg-primary-container/10';

          return (
            <div
              key={product.id}
              className="relative flex gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high/60 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] group transition-all duration-300"
            >
              {/* Glow Underlay */}
              <div
                className={`absolute -inset-0.5 rounded-xl ${glowClass} opacity-30 pointer-events-none blur-sm`}
              ></div>

              {/* Thumbnail */}
              <div
                className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest cursor-pointer"
                onClick={() => onSelectProduct(product)}
                role="button"
                tabIndex={0}
              >
                <img
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.image}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to local image or styled SVG
                    (e.target as HTMLImageElement).src =
                      '/stitch/stitch_halloween_spooky_sweets_mobile_store/spooky_halloween_candy_set_luxury_gift_box_potion_bottles_filled_with_glowing/screen.png';
                  }}
                />
                <div className="absolute top-1 left-1">
                  <span
                    className={`px-1.5 py-0.5 rounded-full font-label-sm text-label-sm backdrop-blur-md flex items-center gap-0.5 ${badgeClass}`}
                  >
                    <span className="material-symbols-outlined text-[10px]">
                      {product.badge.icon}
                    </span>
                    {product.badge.text}
                  </span>
                </div>
              </div>

              {/* Item Meta & Counter */}
              <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                <div className="flex items-start justify-between gap-space-xs">
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <h2 className="font-headline-sm text-headline-sm text-on-surface truncate leading-tight hover:text-primary transition-colors">
                      {product.title}
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {product.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Удалить ${product.title}`}
                    onClick={() => onRemoveItem(product.id)}
                    className="flex-shrink-0 text-on-surface-variant hover:text-error transition-colors p-0.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-space-xs mt-auto">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-price-display text-price-display text-on-surface">
                        {(product.price * quantity).toLocaleString('ru-RU')}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary-container">
                        ₸
                      </span>
                    </div>
                    {quantity > 1 && (
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {quantity} шт × {product.price.toLocaleString('ru-RU')} ₸
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center rounded-lg bg-surface-container-high px-1 py-0.5 shadow-inner border border-surface-container-highest">
                    <button
                      type="button"
                      aria-label="Уменьшить количество"
                      onClick={() => onUpdateQuantity(product.id, -1)}
                      className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="w-6 text-center font-label-md text-label-md text-on-surface font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Увеличить количество"
                      onClick={() => onUpdateQuantity(product.id, 1)}
                      className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Witch Promo Code Section */}
      <div className="rounded-xl bg-surface-container-low border border-surface-container-high/60 p-space-sm shadow-md">
        <div className="flex items-center justify-between mb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-tertiary">token</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Ведьмино слово / Промокод
            </span>
          </div>
          {appliedPromo && (
            <button
              type="button"
              onClick={onRemovePromo}
              className="text-xs text-on-surface-variant hover:text-error underline cursor-pointer"
            >
              Сбросить
            </button>
          )}
        </div>

        <div className="flex gap-space-xs">
          <div className="relative flex-1">
            <input
              type="text"
              id="promo-input"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Введите промокод (HALLOWEEN13)"
              className="w-full h-11 pl-3 pr-8 rounded-lg bg-surface-container text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-tertiary border border-surface-container-high transition-all"
            />
            {appliedPromo && (
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary-fixed text-[18px]">
                verified
              </span>
            )}
          </div>
          <button
            type="button"
            id="promo-apply-btn"
            onClick={handleApplyPromo}
            disabled={isApplying}
            className="h-11 px-space-md rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md tracking-wider uppercase transition-transform active:scale-95 shadow-[0_0_12px_rgba(220,184,255,0.3)] hover:brightness-105 cursor-pointer flex items-center justify-center font-bold"
          >
            {isApplying ? 'Чтение...' : 'Применить'}
          </button>
        </div>

        {appliedPromo ? (
          <p className="font-body-sm text-body-sm text-secondary-fixed mt-1.5 flex items-center gap-1 drop-shadow-[0_0_4px_rgba(121,255,91,0.3)]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            {appliedPromo.description}
          </p>
        ) : promoError ? (
          <p className="font-body-sm text-body-sm text-error mt-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {promoError}
          </p>
        ) : (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-on-surface-variant">
            <span>Подсказка:</span>
            <button
              type="button"
              onClick={() => {
                setPromoInput('HALLOWEEN13');
                onApplyPromo('HALLOWEEN13');
              }}
              className="text-tertiary hover:underline cursor-pointer"
            >
              HALLOWEEN13 (-1 200 ₸)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setPromoInput('WITCH2026');
                onApplyPromo('WITCH2026');
              }}
              className="text-tertiary hover:underline cursor-pointer"
            >
              WITCH2026 (-2 000 ₸)
            </button>
          </div>
        )}
      </div>

      {/* Order Calculation Card */}
      <div className="rounded-xl bg-surface-container-low border border-surface-container-high/60 p-space-md shadow-lg flex flex-col gap-space-sm relative overflow-hidden">
        {/* Atmospheric glow in corner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>

        <div className="font-headline-sm text-headline-sm text-on-surface flex items-center justify-between pb-1">
          <span>Расчёт заказа</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {totalItemCount} {totalItemCount === 1 ? 'сладость' : totalItemCount < 5 ? 'сладости' : 'сладостей'}
          </span>
        </div>

        {/* Breakdown Rows */}
        <div className="flex flex-col gap-space-xs text-body-md">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span>Товары ({totalItemCount} шт)</span>
            <span className="text-on-surface font-body-md font-medium">
              {itemsSubtotal.toLocaleString('ru-RU')} ₸
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span>Курьерская доставка по РК</span>
                <span
                  className="material-symbols-outlined text-[14px] text-outline"
                  title="До порога"
                >
                  local_shipping
                </span>
              </div>
              <span className="text-on-surface font-body-md font-medium">
                {isFreeShipping ? (
                  <span className="text-secondary-fixed">Бесплатно</span>
                ) : (
                  `${deliveryCost.toLocaleString('ru-RU')} ₸`
                )}
              </span>
            </div>

            {/* Free shipping progress cue */}
            {!isFreeShipping ? (
              <div className="flex items-center gap-space-xs text-secondary-fixed font-label-sm text-label-sm pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
                <span>
                  Добавьте сладостей на {amountToFreeShipping.toLocaleString('ru-RU')} ₸ для бесплатной доставки!
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-space-xs text-secondary-fixed font-label-sm text-label-sm pt-0.5">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                <span>Бесплатная доставка курьером разблокирована!</span>
              </div>
            )}
          </div>

          {appliedPromo && (
            <div className="flex items-center justify-between text-tertiary">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">magic_button</span> Скидка ведьмы ({appliedPromo.code})
              </span>
              <span className="font-semibold">
                -{discountAmount.toLocaleString('ru-RU')} ₸
              </span>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-surface-container-highest my-0.5"></div>

        {/* Final Total */}
        <div className="flex items-baseline justify-between pt-0.5">
          <span className="font-headline-md text-headline-md text-on-surface">
            Итого к оплате
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary-container drop-shadow-[0_0_12px_rgba(255,107,0,0.5)] font-bold">
              {finalTotal.toLocaleString('ru-RU')}
            </span>
            <span className="font-headline-md text-headline-md text-primary-container font-bold">
              ₸
            </span>
          </div>
        </div>
      </div>

      {/* Primary CTA Action Button */}
      <div className="flex flex-col gap-space-sm pt-space-xs">
        <button
          type="button"
          onClick={onProceedToCheckout}
          className="w-full py-4 px-space-md rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(255,107,0,0.55)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">bolt</span>
          <span>Перейти к оформлению ({finalTotal.toLocaleString('ru-RU')} ₸)</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        {/* Trust Note / Guarantee */}
        <div className="flex items-center justify-center gap-space-xs py-space-xs px-space-sm rounded-lg bg-surface-container-low border border-surface-container-high/40 text-center">
          <span className="text-[16px]">🦇</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Бережная доставка в термобоксах с сухим льдом
          </p>
        </div>
      </div>
    </div>
  );
};
