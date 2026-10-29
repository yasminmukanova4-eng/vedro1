import React, { useState, useMemo } from 'react';
import { SweetProduct } from '../types';

interface SearchViewProps {
  products: SweetProduct[];
  onAddToCart: (product: SweetProduct) => void;
  onSelectProduct: (product: SweetProduct) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [minToxicity, setMinToxicity] = useState<number>(0);

  const allTags = ['Все', 'Зелье', 'Кислые', 'Хит', 'Шоколад', 'Лакрица', 'Острое', 'Пауки'];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesTag =
        !selectedTag ||
        selectedTag === 'Все' ||
        p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));

      const matchesTox = minToxicity === 0 || p.toxicityLevel >= minToxicity;

      return matchesQuery && matchesTag && matchesTox;
    });
  }, [products, query, selectedTag, minToxicity]);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pb-space-xl gap-space-md">
      {/* Search Bar Header */}
      <div className="flex flex-col gap-2 pt-space-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          Поиск по котлам и склепам
        </h1>
        <p className="font-body-sm text-on-surface-variant">
          Найдите самые кислые сферы, дымящиеся зелья или темные трюфели
        </p>

        <div className="relative flex items-center mt-1">
          <span className="material-symbols-outlined absolute left-3.5 text-primary text-[22px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск сладостей (глаза, череп, зелье)..."
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface placeholder:text-outline font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container focus:bg-surface-container transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Tag Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar -mx-margin-mobile px-margin-mobile">
        {allTags.map((tag) => {
          const isActive = (selectedTag === null && tag === 'Все') || selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag === 'Все' ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-label-md whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                isActive
                  ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-fixed/50 font-bold shadow-[0_0_8px_rgba(57,255,20,0.3)]'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface border-surface-container-highest'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Results Count & Toxicity filter */}
      <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-surface-container-highest">
        <span>Найдено: {filtered.length} позиций</span>
        <div className="flex items-center gap-1.5">
          <span>Мин. магия:</span>
          <select
            value={minToxicity}
            onChange={(e) => setMinToxicity(Number(e.target.value))}
            className="bg-surface-container-high text-on-surface rounded px-2 py-0.5 border border-surface-container-highest text-xs cursor-pointer focus:outline-none"
          >
            <option value={0}>Любая</option>
            <option value={3}>3+ звёзд</option>
            <option value={4}>4+ звёзд</option>
            <option value={5}>5 звёзд (максимум)</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-2 text-outline">search_off</span>
          <p className="font-headline-sm text-on-surface">Ничего не найдено</p>
          <p className="text-xs mt-1 max-w-xs">
            Попробуйте изменить запрос или выберите тег «Все» для просмотра каталога.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-space-sm">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="relative flex items-center justify-between gap-space-sm p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high/60 hover:border-primary-container/40 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface-container-highest shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/stitch/stitch_halloween_spooky_sweets_mobile_store/spooky_halloween_candy_set_luxury_gift_box_potion_bottles_filled_with_glowing/screen.png';
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-sm text-on-surface truncate group-hover:text-primary transition-colors">
                      {product.title}
                    </span>
                  </div>
                  <span className="font-body-sm text-xs text-on-surface-variant truncate">
                    {product.subtitle}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-price-display text-base font-bold text-on-surface">
                      {product.price.toLocaleString('ru-RU')}
                    </span>
                    <span className="font-headline-sm text-xs text-primary-container">₸</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
                title="Добавить в корзину"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
