import React, { useState } from 'react';
import { OrderConfirmation } from '../types';

interface ThankYouPageProps {
  order: OrderConfirmation;
  onGoToCatalog: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onGoToCatalog }) => {
  const [courierStep, setCourierStep] = useState(1);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-xl gap-space-md animate-fadeIn">
      {/* Thank you card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container border border-secondary-container/40 shadow-[0_0_40px_rgba(47,248,1,0.25)] p-space-md flex flex-col gap-5 text-center">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>

        {/* Success Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center ring-2 ring-secondary-container shadow-[0_0_24px_rgba(47,248,1,0.6)]">
          <span className="material-symbols-outlined text-4xl text-secondary-fixed animate-bounce">
            check_circle
          </span>
          <span className="absolute -top-1 -right-1 text-2xl">🎃</span>
        </div>

        {/* Title & confirmation message */}
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-xs text-secondary-fixed uppercase tracking-widest font-bold">
            Заказ успешно отправлен в Telegram
          </span>
          <h1 className="font-headline-lg text-2xl sm:text-3xl text-on-surface">
            Спасибо за заказ!
          </h1>
          <p className="font-body-sm text-xs text-on-surface-variant max-w-sm mx-auto mt-1 leading-relaxed">
            Ваш полуночный заказ <span className="text-primary-container font-bold">#{order.orderId}</span> зарегистрирован и передан ночному дозору курьеров.
          </p>
        </div>

        {/* Courier tracking box */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col gap-3 text-left">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">
                sports_motorsports
              </span>
              <span>Статус метлы курьера:</span>
            </span>
            <span className="text-secondary-fixed font-bold">
              {courierStep === 1
                ? 'Сборка в термобокс'
                : courierStep === 2
                ? 'Мчит по адресу'
                : 'Доставлен к порогу!'}
            </span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-3 gap-1.5 h-1.5">
            <div className="bg-secondary-container rounded-full shadow-[0_0_6px_rgba(47,248,1,0.8)]"></div>
            <div
              className={`rounded-full transition-colors ${
                courierStep >= 2
                  ? 'bg-secondary-container shadow-[0_0_6px_rgba(47,248,1,0.8)]'
                  : 'bg-surface-container-highest'
              }`}
            ></div>
            <div
              className={`rounded-full transition-colors ${
                courierStep >= 3
                  ? 'bg-secondary-container shadow-[0_0_6px_rgba(47,248,1,0.8)]'
                  : 'bg-surface-container-highest'
              }`}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-surface-container-highest">
            <span>Время доставки:</span>
            <span className="font-semibold text-on-surface">{order.deliverySlot}</span>
          </div>

          {courierStep < 3 && (
            <button
              type="button"
              onClick={() => setCourierStep((s) => Math.min(3, s + 1))}
              className="text-[11px] text-primary hover:underline text-center cursor-pointer mt-0.5"
            >
              Ускорить курьера заклинанием ветров 💨
            </button>
          )}
        </div>

        {/* Recipient details */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2 text-left text-xs">
          <span className="font-semibold text-on-surface uppercase tracking-wider text-[11px] text-outline">
            Детали получателя:
          </span>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Имя:</span>
            <span className="text-on-surface font-medium">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Телефон:</span>
            <span className="text-on-surface font-medium">{order.customerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant">Адрес:</span>
            <span className="text-on-surface font-medium text-right max-w-[240px]">
              {order.city ? `${order.city}, ` : ''}{order.address}
            </span>
          </div>
          {order.notes && (
            <div className="flex justify-between border-t border-surface-container-highest pt-1.5">
              <span className="text-on-surface-variant">Комментарий:</span>
              <span className="text-secondary-fixed-dim text-right max-w-[240px]">
                {order.notes}
              </span>
            </div>
          )}
        </div>

        {/* Order items breakdown */}
        <div className="flex flex-col gap-1.5 text-xs text-left max-h-40 overflow-y-auto no-scrollbar border-t border-b border-surface-container-highest py-3">
          <span className="font-semibold text-on-surface uppercase tracking-wider text-[11px] text-outline mb-1">
            Состав заказа:
          </span>
          {order.items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-center text-on-surface-variant"
            >
              <span className="truncate flex-1 pr-2">
                {item.product.title} × {item.quantity} шт.
              </span>
              <span className="text-on-surface font-medium shrink-0">
                {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₸
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center text-sm font-bold text-on-surface pt-2 mt-1 border-t border-surface-container-highest">
            <span>Итого к оплате:</span>
            <span className="text-primary-container text-base">
              {order.finalTotal.toLocaleString('ru-RU')} ₸
            </span>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={onGoToCatalog}
            className="w-full py-4 px-4 rounded-xl bg-primary-container text-on-primary-container font-label-lg uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">storefront</span>
            <span>Вернуться на главную</span>
          </button>
        </div>
      </div>
    </div>
  );
};
