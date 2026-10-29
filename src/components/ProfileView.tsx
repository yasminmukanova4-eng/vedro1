import React from 'react';

interface ProfileViewProps {
  onBrowseCatalog: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onBrowseCatalog }) => {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-xl gap-space-md">
      {/* Profile Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container border border-surface-container-high p-space-md shadow-xl flex items-center gap-space-md">
        <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-primary-container/10 blur-2xl pointer-events-none"></div>

        <div className="relative p-1 rounded-full ring-2 ring-primary-container/40 shadow-[0_0_16px_rgba(255,107,0,0.3)] shrink-0">
          <img
            alt="Алиса Воронова"
            className="w-16 h-16 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AEtjO1V2QkoICgozXbVsmpQ4I2IvGpDiGzAG0-3KyQ2bRePzBQlXNRd9to40pMcT2_lKygao4m5FRN3jq_PRN87Xmr1uuV15A1NMcKTewIutx6eg5-5MhTodpLHqs5yH5QXcrG3UC7M4Yzuh0Z58r0OLbBSq2KYYIf7GHTYaH6xWPDGM9FpKmBRU5RaWI4EBBqmrn7cEk-BNpWPOVmDZ0-k-nTcX3CZOx540UgOss-cbpRA"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary-container ring-2 ring-surface-container shadow-[0_0_6px_rgba(47,248,1,0.8)]"></span>
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
              Алиса Воронова
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-[10px] border border-tertiary/30 font-bold">
              Ковен №13
            </span>
          </div>
          <span className="font-label-md text-xs text-secondary-fixed-dim mt-0.5 font-semibold">
            Верховная Ведьма 4-го круга
          </span>
          <span className="font-body-sm text-xs text-on-surface-variant truncate">
            +7 (777) 131-66-99 • Алматы
          </span>
        </div>
      </div>

      {/* Spooky Loyalty Coins Card */}
      <div className="rounded-xl bg-gradient-to-r from-surface-container-high to-surface-container border border-surface-container-highest p-space-md shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary-container/20 border border-primary-container/30 flex items-center justify-center text-primary-container shadow-[0_0_12px_rgba(255,107,0,0.3)]">
            <span className="text-2xl">🎃</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-xs uppercase text-on-surface-variant tracking-wider">
              Тыквенные дублоны
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-display-lg-mobile text-2xl font-bold text-on-surface">
                8 450
              </span>
              <span className="text-xs text-primary font-bold">дублонов</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onBrowseCatalog}
          className="px-3.5 py-2 rounded-lg bg-surface-container-highest text-primary font-label-md text-xs hover:bg-surface-bright transition-colors cursor-pointer border border-primary/20"
        >
          Обменять
        </button>
      </div>

      {/* Saved Crypt Addresses */}
      <div className="flex flex-col gap-2 bg-surface-container rounded-xl p-space-md border border-surface-container-high shadow-lg">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-highest">
          <span className="font-headline-sm text-sm text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-secondary-fixed">
              home_pin
            </span>
            <span>Сохраненные адреса для зелий</span>
          </span>
          <span className="text-xs text-primary cursor-pointer hover:underline">+ Новый</span>
        </div>

        <div className="flex flex-col gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-on-surface flex items-center gap-1">
                <span>Алматы, пр. Абая, д. 44, кв. 13</span>
                <span className="px-1.5 py-0.2 rounded bg-primary-container/20 text-primary-fixed text-[10px]">
                  Основной
                </span>
              </span>
              <span className="text-on-surface-variant text-[11px] mt-0.5">
                Код домофона: 13K • 5 этаж
              </span>
            </div>
            <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
          </div>

          <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high/60 flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-on-surface">Астана, ул. Достык, д. 18, оф. 4</span>
              <span className="text-on-surface-variant text-[11px] mt-0.5">
                Оставить у охранника с паролем «Ведьмино гнездо»
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Past Orders History */}
      <div className="flex flex-col gap-2.5 bg-surface-container rounded-xl p-space-md border border-surface-container-high shadow-lg">
        <h3 className="font-headline-sm text-sm text-on-surface pb-1 border-b border-surface-container-highest flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
          <span>Журнал полуночных ритуалов</span>
        </h3>

        {/* Order 1 */}
        <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface">Заказ #1294</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed font-bold text-[10px]">
              Доставлено на метле
            </span>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center justify-between">
            <span>28 октября 2026 • 21:15</span>
            <span className="font-semibold text-on-surface">11 200 ₸</span>
          </div>
          <div className="text-[11px] text-on-surface-variant/80 border-t border-surface-container-highest pt-1.5 flex items-center justify-between">
            <span>Шоколадные черепа 3D (2 шт), Лакричные мыши (1 шт)</span>
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="text-primary hover:underline cursor-pointer"
            >
              Повторить
            </button>
          </div>
        </div>

        {/* Order 2 */}
        <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface">Заказ #1180</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-bold text-[10px]">
              Выпито до капли
            </span>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center justify-between">
            <span>21 октября 2026 • 23:40</span>
            <span className="font-semibold text-on-surface">5 500 ₸</span>
          </div>
          <div className="text-[11px] text-on-surface-variant/80 border-t border-surface-container-highest pt-1.5 flex items-center justify-between">
            <span>Набор «Ведьмино зелье» (1 шт)</span>
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="text-primary hover:underline cursor-pointer"
            >
              Повторить
            </button>
          </div>
        </div>
      </div>

      {/* Support & Courier Hotline */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">🦇</span>
          <div className="flex flex-col">
            <span className="font-semibold text-on-surface">Связь со смотрителем склепа</span>
            <span className="text-on-surface-variant">Поддержка 24/7 в Telegram & WhatsApp</span>
          </div>
        </div>
        <a
          href="tel:+77771316699"
          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-primary hover:text-white transition-colors border border-surface-container-highest cursor-pointer font-bold"
        >
          Вызвать
        </a>
      </div>
    </div>
  );
};
