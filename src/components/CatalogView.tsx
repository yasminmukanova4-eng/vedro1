import React, { useState } from 'react';
import { SweetProduct, ProductCategory } from '../types';

interface CatalogViewProps {
  products: SweetProduct[];
  onAddToCart: (product: SweetProduct) => void;
  onSelectProduct: (product: SweetProduct) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
  onOpenCart,
  cartCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories: { key: ProductCategory; label: string; icon: string }[] = [
    { key: 'all', label: 'Все сладости', icon: 'all_inclusive' },
    { key: 'potions', label: 'Зельеварение', icon: 'science' },
    { key: 'sour', label: 'Кислые Кошмары', icon: 'visibility' },
    { key: 'chocolate', label: 'Темный Шоколад', icon: 'skull' },
    { key: 'horror', label: 'Хиты Ужаса', icon: 'local_fire_department' },
    { key: 'limited', label: 'Лимитированные', icon: 'auto_awesome' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleQuickAdd = (e: React.MouseEvent, product: SweetProduct) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-xl gap-space-md">
      {/* Hero Atmosphere Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest border border-surface-container-highest p-space-md shadow-2xl">
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary-fixed font-label-sm text-[11px] border border-primary-container/30 uppercase tracking-widest font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(255,107,0,0.3)]">
              <span>🎃</span> Хэллоуин 2026
            </span>
            <span className="text-secondary-fixed text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping"></span>
              Ночная витрина открыта
            </span>
          </div>

          <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface leading-tight tracking-tight mt-1">
            Колдовские сладости для полуночного пира
          </h2>

          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Крафтовые желейные глаза, фосфоресцирующие зелья, бельгийский шоколад в форме черепов
            и лакрица с перцем. Доставляем в термобоксах с сухим льдом по всему Казахстану.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenCart}
              className="px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-label-md text-xs uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(255,107,0,0.5)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_basket</span>
              <span>В корзину ({cartCount})</span>
            </button>
            <div className="text-xs text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary-fixed">
                local_shipping
              </span>
              <span>Бесплатно от 15 000 ₸</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar -mx-margin-mobile px-margin-mobile">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-xs whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold border-primary-container shadow-[0_0_12px_rgba(255,107,0,0.35)]'
                  : 'bg-surface-container-high/80 text-on-surface-variant hover:text-on-surface hover:bg-surface-bright border-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-space-sm">
        {filteredProducts.map((product) => {
          const isJustAdded = justAddedId === product.id;
          const badgeStyle =
            product.badge.type === 'potion'
              ? 'bg-tertiary-container/20 text-tertiary border-tertiary/30'
              : product.badge.type === 'sour'
              ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-fixed/30'
              : 'bg-primary-container/20 text-primary-fixed border-primary-container/30';

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="relative flex flex-col justify-between rounded-xl bg-surface-container-low border border-surface-container-high/70 p-2.5 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5)] group hover:border-primary-container/50 transition-all duration-300 cursor-pointer"
            >
              {/* Product Visual Container */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-surface-container-highest mb-2">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.image}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      '/stitch/stitch_halloween_spooky_sweets_mobile_store/spooky_halloween_candy_set_luxury_gift_box_potion_bottles_filled_with_glowing/screen.png';
                  }}
                />

                {/* Badge Tag */}
                <div className="absolute top-1.5 left-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded-full font-label-sm text-[10px] backdrop-blur-md flex items-center gap-0.5 border ${badgeStyle}`}
                  >
                    <span className="material-symbols-outlined text-[11px]">
                      {product.badge.icon}
                    </span>
                    {product.badge.text}
                  </span>
                </div>

                {/* Rating overlay */}
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/85 backdrop-blur-sm text-[10px] font-semibold text-primary flex items-center gap-0.5">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-headline-sm text-[16px] leading-tight text-on-surface truncate group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="font-body-sm text-[11px] text-on-surface-variant truncate mt-0.5">
                  {product.subtitle}
                </p>

                {/* Toxicity rating meter bars */}
                <div className="flex items-center gap-1 my-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <span
                        key={lvl}
                        className={`w-2 h-1 rounded-sm transition-all ${
                          lvl <= product.toxicityLevel
                            ? 'bg-secondary-container shadow-[0_0_4px_rgba(47,248,1,0.6)]'
                            : 'bg-surface-container-highest'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-on-surface-variant/80 truncate">
                    {product.toxicityLevel}/5
                  </span>
                </div>

                {/* Price and Add button */}
                <div className="flex items-center justify-between mt-auto pt-1">
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-price-display text-[20px] text-on-surface font-bold">
                      {product.price.toLocaleString('ru-RU')}
                    </span>
                    <span className="font-headline-sm text-[14px] text-primary-container font-bold">
                      ₸
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, product)}
                    aria-label={`Добавить в корзину ${product.title}`}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                      isJustAdded
                        ? 'bg-secondary-container text-on-secondary-container shadow-[0_0_12px_rgba(47,248,1,0.6)]'
                        : 'bg-primary-container text-on-primary-container hover:brightness-110 shadow-sm'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isJustAdded ? 'check' : 'add'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
