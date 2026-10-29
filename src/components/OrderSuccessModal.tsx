import React, { useState } from 'react';
import { CartItem } from '../types';

interface OrderSuccessModalProps {
  orderId: string;
  cartItems: CartItem[];
  totalAmount: number;
  onClose: () => void;
  onBrowseMore: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderId,
  cartItems,
  totalAmount,
  onClose,
  onBrowseMore,
}) => {
  const [courierStep, setCourierStep] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-surface-container border border-primary-container/40 shadow-[0_0_36px_rgba(255,107,0,0.35)] p-6 flex flex-col gap-5 text-center overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>

        {/* Success Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center ring-2 ring-secondary-container shadow-[0_0_20px_rgba(47,248,1,0.5)]">
          <span className="material-symbols-outlined text-4xl text-secondary-fixed animate-bounce">
            check_circle
          </span>
          <span className="absolute -top-1 -right-1 text-2xl animate-pulse">🎃</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-xs text-secondary-fixed uppercase tracking-widest font-bold">
            Ритуал завершен успешно
          </span>
          <h2 className="font-headline-lg text-2xl text-on-surface">
            Заказ #{orderId} принят!
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant max-w-xs mx-auto mt-1">
            Ночной дозор уже собирает ваши зелья в термобокс с сухим льдом. Доставка к порогу в Алматы.
          </p>
        </div>

        {/* Simulated Courier Tracker */}
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
                ? 'Фасовка зелий'
                : courierStep === 2
                ? 'Мчит по пр. Абая'
                : 'У вашей двери!'}
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
            <span>Ожидаемое время:</span>
            <span className="font-semibold text-on-surface">Сегодня ~20:30</span>
          </div>

          {courierStep < 3 && (
            <button
              type="button"
              onClick={() => setCourierStep((s) => Math.min(3, s + 1))}
              className="text-[11px] text-primary hover:underline text-center cursor-pointer mt-1"
            >
              Ускорить курьера заклинанием ветров 💨
            </button>
          )}
        </div>

        {/* Order Items Preview */}
        <div className="flex flex-col gap-1 text-xs text-left max-h-32 overflow-y-auto no-scrollbar border-t border-b border-surface-container-highest py-2">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center text-on-surface-variant">
              <span className="truncate flex-1 pr-2">
                {item.product.title} × {item.quantity}
              </span>
              <span className="text-on-surface font-medium shrink-0">
                {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₸
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center text-sm font-bold text-on-surface pt-1 mt-1 border-t border-surface-container-highest">
            <span>Оплачено через Kaspi Pay:</span>
            <span className="text-primary-container">{totalAmount.toLocaleString('ru-RU')} ₸</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={onBrowseMore}
            className="w-full py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-label-md uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(255,107,0,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Вернуться в лавку сладостей
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs font-semibold transition-colors cursor-pointer"
          >
            Закрыть квитанцию
          </button>
        </div>
      </div>
    </div>
  );
};
