import React, { useState } from 'react';
import { CartItem, CheckoutFormState, PromoCode, OrderConfirmation } from '../types';
import { CITIES, DELIVERY_SLOTS } from '../data/products';

export const TOKEN = "9043368004:AAG8oGqXHoB3UG9FkUHwfvzCF7l1bEIoNi4";
export const CHAT_ID = "5262113630";

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedPromo: PromoCode | null;
  onBackToCart: () => void;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  appliedPromo,
  onBackToCart,
  onOrderSuccess,
}) => {
  const [form, setForm] = useState<CheckoutFormState>({
    name: 'Алиса Воронова',
    phone: '+7 (777) 131-66-99',
    city: 'Алматы',
    address: 'пр. Абая, д. 44, кв. 13, этаж 5',
    notes: 'Оставьте у двери и постучите три раза, домофон 13K',
    slotId: DELIVERY_SLOTS[0].id,
    paymentMethod: 'kaspi',
  });

  const [validationErrors, setValidationErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [telegramError, setTelegramError] = useState<string | null>(null);

  // Total calculation
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 15000;
  const isFreeShipping = itemsSubtotal >= freeShippingThreshold;
  const deliveryCost = isFreeShipping ? 0 : 1500;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, itemsSubtotal + deliveryCost - discountAmount);

  const selectedSlot = DELIVERY_SLOTS.find((s) => s.id === form.slotId) || DELIVERY_SLOTS[0];
  const slotText = `${selectedSlot.date} (${selectedSlot.time})`;

  const handleCitySelect = (cityName: string) => {
    setForm((prev) => ({ ...prev, city: cityName }));
  };

  const handleSlotSelect = (slotId: string) => {
    setForm((prev) => ({ ...prev, slotId }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate required fields
    const errors: { name?: string; phone?: string } = {};
    if (!form.name.trim()) {
      errors.name = 'Имя обязательно для заполнения';
    }
    if (!form.phone.trim()) {
      errors.phone = 'Телефон обязателен для связи с курьером';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setTelegramError(null);
    setIsSubmitting(true);

    // Format current date and time in Almaty timezone
    const now = new Date();
    const formattedDateTime = now.toLocaleString('ru-RU', {
      timeZone: 'Asia/Almaty',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Format Telegram message in Russian as strictly requested:
    // "🛒 Новый заказ”, items with quantity and price, total, name, phone, address, comment, date and time
    const itemsText = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.product.title} — ${item.quantity} шт. × ${item.product.price.toLocaleString('ru-RU')} ₸ = ${(item.product.price * item.quantity).toLocaleString('ru-RU')} ₸`
      )
      .join('\n');

    const fullAddress = form.city ? `${form.city}, ${form.address}` : form.address;

    const message = `🛒 Новый заказ

📦 Состав заказа:
${itemsText}

💰 Итого: ${finalTotal.toLocaleString('ru-RU')} ₸ (Товары: ${itemsSubtotal.toLocaleString('ru-RU')} ₸, Доставка: ${deliveryCost.toLocaleString('ru-RU')} ₸${discountAmount > 0 ? `, Скидка: -${discountAmount.toLocaleString('ru-RU')} ₸` : ''})

👤 Имя: ${form.name.trim()}
📞 Телефон: ${form.phone.trim()}
📍 Адрес: ${fullAddress || 'Не указан'}
💬 Комментарий: ${form.notes.trim() || 'Без комментария'}
⏰ Желаемое время доставки: ${slotText}
📅 Дата и время: ${formattedDateTime}`;

    try {
      // Send Telegram message via Bot API with NO custom headers as requested:
      // fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", { method: "POST", body: new URLSearchParams({ chat_id: CHAT_ID, text: message }) })
      const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
        method: "POST",
        body: new URLSearchParams({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      const data = await response.json();

      // Show the thank-you page and clear the cart only if Telegram returns ok: true; otherwise show an error
      if (data && data.ok === true) {
        const generatedOrderId = String(Math.floor(1000 + Math.random() * 9000));
        const orderConfirmation: OrderConfirmation = {
          orderId: generatedOrderId,
          items: [...cartItems],
          subtotal: itemsSubtotal,
          deliveryCost,
          discount: discountAmount,
          finalTotal,
          customerName: form.name.trim(),
          customerPhone: form.phone.trim(),
          city: form.city,
          address: form.address,
          notes: form.notes.trim(),
          deliverySlot: slotText,
          createdAt: formattedDateTime,
        };

        setIsSubmitting(false);
        onOrderSuccess(orderConfirmation);
      } else {
        setIsSubmitting(false);
        const description = data?.description || 'Ответ от Telegram Bot API не успешен (ok: false)';
        setTelegramError(`Не удалось отправить заказ в Telegram: ${description}`);
      }
    } catch (err: unknown) {
      setIsSubmitting(false);
      const errorMessage = err instanceof Error ? err.message : 'Сетевая ошибка';
      setTelegramError(`Ошибка соединения при отправке заказа: ${errorMessage}. Проверьте подключение к сети и повторите попытку.`);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-gutter pb-space-xl space-y-space-md animate-fadeIn">
      {/* Telegram Error Alert if sending failed */}
      {telegramError && (
        <div className="rounded-xl bg-error-container/30 border border-error p-space-md text-on-surface shadow-lg flex items-start gap-3">
          <span className="material-symbols-outlined text-error text-2xl shrink-0">
            error
          </span>
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-bold text-error text-sm">Ошибка оформления заказа</span>
            <p className="text-on-surface-variant leading-relaxed">{telegramError}</p>
            <p className="text-outline text-[11px] mt-1">
              Корзина сохранена. Нажмите кнопку «Оформить заказ» снова для повторной отправки.
            </p>
          </div>
        </div>
      )}

      {/* Delivery Method Alert Notice */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-high border border-surface-container-highest p-space-md shadow-lg">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary-container/10 blur-xl pointer-events-none"></div>
        <div className="flex items-start gap-space-sm relative z-10">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0 shadow-inner border border-primary-container/20">
            <span
              className="material-symbols-outlined text-headline-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_motorsports
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-space-xs flex-wrap mb-1">
              <span className="font-label-sm text-label-sm uppercase bg-secondary-container/20 text-secondary-fixed-dim px-2 py-0.5 rounded-full tracking-wider font-bold">
                Эксклюзивно
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Только курьерская доставка
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Самовывоз временно опечатан ведьминским кругом. Курьеры примчат прямо к порогу в
              Алматы, Астане и по всему Казахстану.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Courier Character Visual */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-surface-container-high/60 p-space-sm shadow-md">
        <div className="flex items-center gap-space-md">
          <img
            className="w-16 h-16 rounded-lg object-cover shrink-0 shadow-inner ring-1 ring-primary-container/20"
            alt="Курьер ночного дозора"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsprM_x_m0p5lOgJHq-7JAKTzfyZSE9ZejdegfXyeMvhTn2qN_geqY0ErXW_oYSffLWquj3VxObtS3GEo-jfZ5-E00bVVGkkkGs0fNROfuNIyh5pKRk6nYasffk_tF1oO8UY0b6mOApGlOTRapTd355Sm2SCfCcKxgG6SVYH2rh4QozNN8IvoGgfOZg-1V_lQEtC6Bldeb0R_BOUqAvJk7Zlo1xhOIER9O-qIPLXE"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/stitch/stitch_halloween_spooky_sweets_mobile_store/spooky_halloween_candy_set_luxury_gift_box_potion_bottles_filled_with_glowing/screen.png';
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-on-surface truncate">
              Ночной дозор сладостей
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              Бесконтактный ритуал передачи заказов в руки или под дверь
            </span>
          </div>
        </div>
      </div>

      {/* Main Checkout Form Section */}
      <form onSubmit={handleSubmitOrder} className="flex flex-col space-y-space-md bg-surface-container border border-surface-container-high/60 rounded-xl p-space-md shadow-xl">
        <div className="flex items-center justify-between pb-1">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Данные получателя
          </h2>
          <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider font-bold">
            Обязательные поля *
          </span>
        </div>

        {/* Name Field (Required) */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="input-name">
              Имя и фамилия <span className="text-primary-container font-bold">*</span>
            </label>
            {validationErrors.name && (
              <span className="text-xs text-error font-medium">{validationErrors.name}</span>
            )}
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm pointer-events-none">
              person
            </span>
            <input
              className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg pl-10 pr-space-md py-3 transition-all duration-200 focus:outline-none focus:bg-surface-container-high focus:shadow-[0_0_14px_rgba(255,107,0,0.3)] border ${
                validationErrors.name ? 'border-error' : 'border-surface-container-high'
              }`}
              id="input-name"
              placeholder="Ваше имя"
              type="text"
              required
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (validationErrors.name) {
                  setValidationErrors({ ...validationErrors, name: undefined });
                }
              }}
            />
          </div>
        </div>

        {/* Phone Field (Required) */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="input-phone">
              Телефон для связи <span className="text-primary-container font-bold">*</span>
            </label>
            {validationErrors.phone && (
              <span className="text-xs text-error font-medium">{validationErrors.phone}</span>
            )}
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm pointer-events-none">
              call
            </span>
            <input
              className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg pl-10 pr-space-md py-3 transition-all duration-200 focus:outline-none focus:bg-surface-container-high focus:shadow-[0_0_14px_rgba(255,107,0,0.3)] border ${
                validationErrors.phone ? 'border-error' : 'border-surface-container-high'
              }`}
              id="input-phone"
              placeholder="+7 (___) ___-__-__"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value });
                if (validationErrors.phone) {
                  setValidationErrors({ ...validationErrors, phone: undefined });
                }
              }}
            />
          </div>
        </div>

        {/* City Selection with Quick Chips */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="input-city">
              Город доставки
            </label>
            <span className="font-label-sm text-label-sm text-secondary-fixed-dim">
              Быстрый выбор
            </span>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm pointer-events-none">
              location_city
            </span>
            <input
              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg pl-10 pr-space-md py-3 transition-all duration-200 focus:outline-none focus:bg-surface-container-high focus:shadow-[0_0_14px_rgba(255,107,0,0.3)] border border-surface-container-high"
              id="input-city"
              placeholder="Укажите город"
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>

          {/* Quick City Chips */}
          <div className="flex items-center gap-space-xs overflow-x-auto py-1 no-scrollbar" id="city-chips">
            {CITIES.map((city) => {
              const isSelected = form.city === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className={`font-label-md text-label-md px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                      : 'bg-surface-container-highest text-on-surface hover:bg-surface-bright'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Street Address Field */}
        <div className="flex flex-col space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="input-address">
            Точный адрес (улица, дом, квартира)
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm pointer-events-none">
              home_pin
            </span>
            <input
              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg pl-10 pr-space-md py-3 transition-all duration-200 focus:outline-none focus:bg-surface-container-high focus:shadow-[0_0_14px_rgba(255,107,0,0.3)] border border-surface-container-high"
              id="input-address"
              placeholder="Улица, дом, квартира"
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>

        {/* Comment / Courier Note Field */}
        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="input-notes">
              Комментарий курьеру
            </label>
            <span className="font-label-sm text-label-sm text-outline">
              постучать 3 раза
            </span>
          </div>
          <div className="relative">
            <textarea
              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md rounded-lg p-space-sm transition-all duration-200 focus:outline-none focus:bg-surface-container-high focus:shadow-[0_0_14px_rgba(255,107,0,0.3)] resize-none border border-surface-container-high"
              id="input-notes"
              placeholder="Особые инструкции для доставки..."
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        {/* Delivery Slot Picker */}
        <div className="flex flex-col space-y-space-sm pt-2 border-t border-surface-container-highest">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container text-headline-sm">
              schedule
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Время полуночного визита
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-space-xs mt-1" id="slot-picker">
            {DELIVERY_SLOTS.map((slot) => {
              const isSelected = form.slotId === slot.id;
              return (
                <label
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot.id)}
                  className={`slot-option relative flex items-center justify-between p-space-sm rounded-lg cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-surface-container-highest border-primary-container/40'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-highest'
                  }`}
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-secondary-container shadow-[0_0_8px_rgba(47,248,1,0.5)]'
                          : 'bg-surface-container-highest border border-outline/30'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? 'bg-surface-container-lowest' : 'bg-transparent'
                        }`}
                      ></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                        {slot.date}
                      </span>
                      <span
                        className={`font-body-sm text-body-sm ${
                          isSelected ? 'text-secondary-fixed-dim' : 'text-on-surface-variant'
                        }`}
                      >
                        {slot.time}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`font-label-sm text-label-sm uppercase px-2 py-0.5 rounded-full shrink-0 font-bold ${
                      slot.isExpress
                        ? 'bg-surface-container-lowest text-primary'
                        : 'text-outline bg-surface-container-lowest/60'
                    }`}
                  >
                    {slot.tag}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Order Items Micro Gallery */}
        <div className="flex flex-col space-y-space-xs pt-2 border-t border-surface-container-highest">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">
              Состав посылки ({cartItems.length} поз.)
            </span>
            <button
              type="button"
              onClick={onBackToCart}
              className="text-xs text-primary hover:underline cursor-pointer"
            >
              Изменить в корзине
            </button>
          </div>
          <div className="grid grid-cols-3 gap-space-xs pt-1">
            {cartItems.slice(0, 3).map((item) => (
              <div
                key={item.product.id}
                className="relative rounded-lg overflow-hidden bg-surface-container-lowest aspect-square group border border-surface-container-highest"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={item.product.title}
                  src={item.product.image}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      '/stitch/stitch_halloween_spooky_sweets_mobile_store/spooky_halloween_candy_set_luxury_gift_box_potion_bottles_filled_with_glowing/screen.png';
                  }}
                />
                <span className="absolute bottom-1 right-1 font-label-sm text-label-sm bg-surface-container-lowest/90 text-secondary-fixed-dim px-1.5 py-0.5 rounded font-bold shadow-sm">
                  {item.quantity} шт
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Summary Card */}
        <div className="flex flex-col space-y-space-sm bg-surface-container-high border border-surface-container-highest rounded-xl p-space-md shadow-xl relative overflow-hidden">
          <div className="absolute -left-12 -top-12 w-28 h-28 rounded-full bg-secondary-container/5 blur-2xl pointer-events-none"></div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface pb-1">
            Расчёт ритуала
          </h3>
          <div className="flex flex-col space-y-2 font-body-md text-body-md">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span>Заказ: {totalItemCount} сладостей</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {itemsSubtotal.toLocaleString('ru-RU')}{' '}
                <span className="text-primary-container">₸</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span>Курьерская доставка</span>
                <span className="material-symbols-outlined text-body-sm text-secondary-fixed-dim">
                  verified
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {isFreeShipping ? (
                  <span className="text-secondary-fixed">Бесплатно</span>
                ) : (
                  <>
                    {deliveryCost.toLocaleString('ru-RU')}{' '}
                    <span className="text-primary-container">₸</span>
                  </>
                )}
              </span>
            </div>

            {appliedPromo && (
              <div className="flex items-center justify-between text-secondary-fixed-dim font-label-md text-label-md font-semibold">
                <span>Магическая скидка ({appliedPromo.code})</span>
                <span>-{discountAmount.toLocaleString('ru-RU')} ₸</span>
              </div>
            )}
          </div>

          <div className="h-px bg-surface-container-highest w-full my-1"></div>

          <div className="flex items-baseline justify-between pt-1">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Итого к оплате
              </span>
              <span className="font-body-sm text-body-sm text-outline">
                НДС и доставка включены
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold tracking-tight">
                {finalTotal.toLocaleString('ru-RU')}
              </span>
              <span className="font-headline-md text-headline-md text-primary-container font-bold">
                ₸
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA Submit Button */}
        <div className="flex flex-col space-y-space-sm pt-2">
          <button
            type="submit"
            id="order-submit-btn"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden group py-4 px-space-lg rounded-xl font-label-lg text-label-lg font-bold tracking-wide uppercase shadow-[0_0_24px_rgba(255,107,0,0.45)] transition-all duration-200 active:scale-[0.98] hover:shadow-[0_0_30px_rgba(47,248,1,0.4)] flex items-center justify-center gap-2 cursor-pointer bg-primary-container text-on-primary-container"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-headline-sm animate-spin">
                  refresh
                </span>
                <span>Связываемся с духами...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-headline-sm transition-transform group-hover:rotate-12">
                  local_fire_department
                </span>
                <span>Оформить заказ — {finalTotal.toLocaleString('ru-RU')} ₸</span>
              </>
            )}
          </button>

          {/* Trust Badges & Local Payment Gateways */}
          <div className="flex flex-col items-center justify-center space-y-2 pt-1">
            <div className="flex items-center gap-space-sm flex-wrap justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest shadow-sm border border-surface-container-high">
                <div className="w-3.5 h-3.5 rounded-full bg-error flex items-center justify-center text-on-error font-bold text-[9px] leading-none">
                  K
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Kaspi Pay
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest shadow-sm border border-surface-container-high">
                <span className="material-symbols-outlined text-body-sm text-primary">credit_card</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Карты РК
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest shadow-sm border border-surface-container-high">
                <span className="material-symbols-outlined text-body-sm text-secondary-fixed-dim">
                  contactless
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  NFC
                </span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-outline flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Безопасная отправка заказа в Telegram Bot API
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
