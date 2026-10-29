import { SweetProduct, DeliverySlot, PromoCode } from '../types';

export const PRODUCTS: SweetProduct[] = [
  {
    id: 'witch_potion_set',
    title: 'Набор «Ведьмино зелье»',
    subtitle: 'Флаконы с мерцанием и мармелад',
    category: 'potions',
    price: 5500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxuI9W6Ag1VwDlsZOnydv5GzkMrlbS3PfxV6F27Se244S-5u2qRo8qeYtoDpo9t4RSFeNntdlSTsFYt1QrHmkd92yAO8SqztTbJxKDL0Wtc9YelYEXchIg3Ez3QY7CYJhJs5laSDEW7WgxZFznhUhUqocVjNuMaYz2pwfcdjach7SMrzrJzwhGmCZGS9WUy5R2bAixBts3C9MM0JXAaMXElqpBs9kkwupIQycPS6k',
    badge: { text: 'Зелье', icon: 'science', type: 'potion' },
    toxicityLevel: 5,
    toxicityLabel: 'Магия: 5/5 — Светится в ультрафиолете',
    description: 'Коллекционный крафтовый набор в подарочном ларце из черного бархата. Внутри — три стеклянных флакона с шипучим ягодным эликсиром и желейные кристаллы с мерцающей съедобной слюдой.',
    composition: 'Натуральный сок ежевики, пищевой кандурин (блестки), экстракт лемонграсса, тростниковый сахар, агар-агар.',
    weight: '350 г (3 колбы по 100 мл + мармелад)',
    shelfLife: '60 дней в полумраке',
    storage: 'Хранить вдали от солнечного света при температуре +2...+18°C',
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    tags: ['Зелье', 'Светится', 'Подарок', 'Флаконы', 'Мерцание']
  },
  {
    id: 'frankenstein_eyes',
    title: 'Конфеты «Глаза Франкенштейна»',
    subtitle: 'Желейные сферы с сиропом',
    category: 'sour',
    price: 2500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_d_8a8ucjIR_qY2C070RNABURMTP6-xFnEr7oli6rE1i9gnoRMWtUVTiKQfD6f6LzfenRGZ0NCD5QL8w0VzyDX7LcGDQCE32phRRxh41LAayxJ2rx-38UzIZUCuZJF4-x9OBjfv3ELppl53TAzcyFTx7XoXe8bH636MMhUrdBZXDmE24tQUaMMhaybLW55dNMjlyS9ctOVyVmK_NVSWiWgCkwp5AcGiAiSFKJrMc',
    badge: { text: 'Кислые', icon: 'visibility', type: 'sour' },
    toxicityLevel: 4,
    toxicityLabel: 'Уровень кислинки: 4/5 — Сводит челюсть',
    description: 'Анатомически гиперреалистичные глазные яблоки из упругого желейного белка с жидким вишнево-лаймовым центром. При надкусывании брызжет кислый кровавый сироп.',
    composition: 'Пектин яблочный, сироп вишни кислой, яблочная кислота, натуральный краситель антоциан, экстракт спирулины.',
    weight: '160 г (набор из 6 глаз)',
    shelfLife: '90 дней',
    storage: 'В сухом прохладном месте',
    inStock: true,
    rating: 4.8,
    reviewsCount: 54,
    tags: ['Кислые', 'Глаза', 'Хит', 'Желе', 'Жидкий центр']
  },
  {
    id: 'chocolate_skulls',
    title: 'Шоколадные черепа 3D',
    subtitle: 'Темный трюфель с брусникой',
    category: 'chocolate',
    price: 3200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO_ojskfKdn4912u2O_FyrvLeJX9DCM4ZVRkCgQvw2iE1kHJPL3OmTJcEwBCQ33UUiFtoxz2whNzfJXRFq2_cmWb2icKZyAshEoYTLWDNkRgiZxCDD66mujvGPNndcUHf3H9tFBUU6hP-l429UFufRXuK96InLmPeK-mDziICEj3-wW_4IA95Es2DM7OvDjES_ioYg_RtA2tApA9wxr5XP4lqy4SzlK70Qj51dlhM',
    badge: { text: 'Хит', icon: 'skull', type: 'hit' },
    toxicityLevel: 3,
    toxicityLabel: 'Глубина какао: 72% + лесная брусника',
    description: 'Скульптурные миниатюрные черепа из бархатного бельгийского горького шоколада. Внутри скрывается начинка из пюре дикой брусники с тонкими нотами можжевельника.',
    composition: 'Тертое какао Callebaut 72%, масло какао, брусничное конфи, бурбонская ваниль, кристаллический сахар.',
    weight: '180 г (набор из 4 черепов)',
    shelfLife: '45 дней',
    storage: 'Хранить при температуре +15...+20°C',
    inStock: true,
    rating: 5.0,
    reviewsCount: 72,
    tags: ['Шоколад', 'Черепа', 'Трюфель', 'Брусника', 'Бельгийский']
  },
  {
    id: 'licorice_bats',
    title: 'Лакричные летучие мыши',
    subtitle: 'Пряная тыквенная карамель с перцем',
    category: 'horror',
    price: 2900,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwvHs29UwWE4LqtB-gT0jVPHwPUu7-u_ioFWZcotWFy6Kit-HwGlG2ewl7RijvJUiCeFUqGh9Y4a4wSgMXj5n9lugm-qAl6UpbQj1EfJdsgTazjtWr5Oj3tTFCjkHoAMEbfZFBZUHAGkaeAs0frVLq3Lj4wkb7VhHNvJrBWuh6UuHOet1tB4udvRKaDlK-fUlB_hqSvFzcgVzYtOi3aeGTKGBNhicPQF-LrQtHzBU',
    badge: { text: '18+ Острое', icon: 'local_fire_department', type: 'spicy' },
    toxicityLevel: 4,
    toxicityLabel: 'Острота: 4/5 — Перец хабанеро и карамель',
    description: 'Угольно-черные лакричные фигурки летучих мышей с тягучим сердцем из пряной карамели с добавлением печеной тыквы и согревающей искорки перца хабанеро.',
    composition: 'Экстракт корня солодки (лакрица), патока, пюре тыквы баттернат, сливки 33%, перец чили хабанеро.',
    weight: '150 г',
    shelfLife: '120 дней',
    storage: 'В герметичной упаковке при комнатной температуре',
    inStock: true,
    rating: 4.7,
    reviewsCount: 29,
    tags: ['Лакрица', 'Острое', 'Тыква', 'Карамель', 'Мыши']
  },
  {
    id: 'violet_popping_dust',
    title: 'Фиолетовая взрывная пыль',
    subtitle: 'Поппинг-сахар с черникой и лавандой',
    category: 'potions',
    price: 2100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX9p5ZxpElDMdEKopR6MR82HLG-s2O7Zeb9NTehK_CWhOfohbO8wxJEBmNJh7_6G2Mf8iqJK7I5TNq6-3_nghCj7mvFfKUduCFC9606OjTFL9nHu6Ox9HN-6X7Zvu9YKg8SCyoscl9NGSE318WOXzlva8APPS2QqUcmnxSCO4f7FStQFJ6gizgoBSz5e2ETDWECWVyd4roUb_WiQnCm4SfMBmt4g9K5GqyIYa9npA',
    badge: { text: 'Взрывные', icon: 'flare', type: 'potion' },
    toxicityLevel: 3,
    toxicityLabel: 'Искры: 500 микро-взрывов на языке',
    description: 'Мистические кристаллы цвета индиго в аптекарской баночке. При соприкосновении с языком начинают бешено потрескивать и взрываться, высвобождая аромат дикой черники и лавандового дыма.',
    composition: 'Углекислый газ пищевой, сублимированная черника, цветки горной лаванды, сахарная пудра, лимонный сок.',
    weight: '80 г',
    shelfLife: '180 дней',
    storage: 'Беречь от влаги! Плотно закрывать крышку',
    inStock: true,
    rating: 4.9,
    reviewsCount: 41,
    tags: ['Взрывной сахар', 'Черника', 'Лаванда', 'Зелье', 'Фиолетовый']
  },
  {
    id: 'radioactive_spiders',
    title: 'Неоновые пауки и слизь',
    subtitle: 'Радиоактивный кислый мармелад',
    category: 'sour',
    price: 2700,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHyd7vOdTqJn2xbihWOhmD65lTwB1rMYFi2VF9XIG8B8hSyUjGDjIHwTHYgWsJYobcCwSgB2gjpyN_fyjd6n3ZK6-kqyN0B9IYmbSbDOXvF6G78zmeJzgi8zuxadxhVRm7s6vGVLSwS01c-_PiMzPUV0zfYAL4QDcCDvKqL77nKKRUQVOq7QJ9SK3O0G27l3k7P8LDamQmCX0GfpS1zVtJLL0-OuWfmWEy0HbjLB4',
    badge: { text: 'Лимитировано', icon: 'pest_control', type: 'limited' },
    toxicityLevel: 5,
    toxicityLabel: 'Кислотность: 5/5 — Экстремальный кислый шторм',
    description: 'Гигантские мармеладные тарантулы ядовито-салатового цвета, покрытые хрустящей кристаллической кислой посыпкой из трех видов фруктовых кислот.',
    composition: 'Желатин, концентрированный сок зеленого яблока, маракуйя, винная и лимонная кислоты, хлорофилл.',
    weight: '200 г',
    shelfLife: '90 дней',
    storage: 'В сухом темном месте',
    inStock: true,
    rating: 4.8,
    reviewsCount: 65,
    tags: ['Пауки', 'Экстремально кислые', 'Неон', 'Лимитировано']
  },
  {
    id: 'vampire_elixir',
    title: 'Эликсир «Кровь Дракулы»',
    subtitle: 'Гранатово-вишневый нектар в пробирке',
    category: 'potions',
    price: 3800,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxuI9W6Ag1VwDlsZOnydv5GzkMrlbS3PfxV6F27Se244S-5u2qRo8qeYtoDpo9t4RSFeNntdlSTsFYt1QrHmkd92yAO8SqztTbJxKDL0Wtc9YelYEXchIg3Ez3QY7CYJhJs5laSDEW7WgxZFznhUhUqocVjNuMaYz2pwfcdjach7SMrzrJzwhGmCZGS9WUy5R2bAixBts3C9MM0JXAaMXElqpBs9kkwupIQycPS6k',
    badge: { text: 'Зелье', icon: 'colorize', type: 'potion' },
    toxicityLevel: 2,
    toxicityLabel: 'Магия: Тягучий сладкий рубиновый нектар',
    description: 'Тягучий густой сироп из спелого граната и темной черешни с экстрактом корицы и кардамона. Подается в стеклянной лабораторной колбе с сургучной печатью.',
    composition: 'Гранатовый сок прямого отжима, вишневое пюре, цейлонская корица, гвоздика, патока.',
    weight: '250 мл',
    shelfLife: '60 дней',
    storage: 'После вскрытия хранить в холодильнике до 7 дней',
    inStock: true,
    rating: 4.9,
    reviewsCount: 22,
    tags: ['Зелье', 'Эликсир', 'Гранат', 'Вишня', 'Колба']
  },
  {
    id: 'pumpkin_truffles',
    title: 'Трюфели «Джек-Фонарь»',
    subtitle: 'Корица, мускат и белый шоколад',
    category: 'chocolate',
    price: 3400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO_ojskfKdn4912u2O_FyrvLeJX9DCM4ZVRkCgQvw2iE1kHJPL3OmTJcEwBCQ33UUiFtoxz2whNzfJXRFq2_cmWb2icKZyAshEoYTLWDNkRgiZxCDD66mujvGPNndcUHf3H9tFBUU6hP-l429UFufRXuK96InLmPeK-mDziICEj3-wW_4IA95Es2DM7OvDjES_ioYg_RtA2tApA9wxr5XP4lqy4SzlK70Qj51dlhM',
    badge: { text: 'Хит', icon: 'local_florist', type: 'hit' },
    toxicityLevel: 1,
    toxicityLabel: 'Сладость: Нежная пряная тыквенная карамель',
    description: 'Оранжевые глазированные конфеты в форме тыквочек. Нежнейший ганаш из белого шоколада, томленой тыквы и согревающих осенних пряностей тает мгновенно.',
    composition: 'Белый шоколад 34%, пюре тыквенное домашнее, мускатный орех, корица, имбирь, сливочное масло.',
    weight: '190 г (8 тыквочек)',
    shelfLife: '30 дней',
    storage: 'При температуре +12...+18°C',
    inStock: true,
    rating: 5.0,
    reviewsCount: 49,
    tags: ['Трюфель', 'Тыква', 'Осень', 'Шоколад', 'Пряности']
  }
];

export const INITIAL_CART_ITEMS = [
  {
    product: PRODUCTS[0], // Набор «Ведьмино зелье» (5 500 ₸)
    quantity: 1,
  },
  {
    product: PRODUCTS[1], // Конфеты «Глаза Франкенштейна» (2 500 ₸ x 2 = 5 000 ₸)
    quantity: 2,
  },
  {
    product: PRODUCTS[2], // Шоколадные черепа 3D (3 200 ₸)
    quantity: 1,
  },
];

export const DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: 'slot_today_night',
    date: 'Сегодня, 31 октября',
    time: '20:00 — 22:00 (Час пик нечисти)',
    tag: 'Срочно',
    isExpress: true,
  },
  {
    id: 'slot_tomorrow_eve',
    date: 'Завтра, 1 ноября',
    time: 'К вечернему шабашу (19:00 — 21:00)',
    tag: 'Планово',
    isExpress: false,
  },
  {
    id: 'slot_midnight_special',
    date: 'В полночь (00:00 — 02:00)',
    time: 'Глухая ночь (доставка под дверь без звонка)',
    tag: 'Мистика',
    isExpress: false,
  }
];

export const VALID_PROMO_CODES: Record<string, PromoCode> = {
  HALLOWEEN13: {
    code: 'HALLOWEEN13',
    discount: 1200,
    minOrder: 8000,
    description: 'Код активирован: зелье щедрости сработало (-1 200 ₸)'
  },
  WITCH2026: {
    code: 'WITCH2026',
    discount: 2000,
    minOrder: 10000,
    description: 'Скидка верховного ковена (-2 000 ₸)'
  },
  SPOOKY: {
    code: 'SPOOKY',
    discount: 800,
    minOrder: 5000,
    description: 'Призрачный подарок (-800 ₸)'
  }
};

export const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Атырау'];
