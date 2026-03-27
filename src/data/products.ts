export type ProductCategory =
  | 'foundation'
  | 'concealer'
  | 'blush'
  | 'bronzer'
  | 'highlighter'
  | 'eyeshadow'
  | 'eyeliner'
  | 'mascara'
  | 'lipstick'
  | 'lipgloss'
  | 'primer'
  | 'setting-powder'
  | 'setting-spray'
  | 'contour'
  | 'brow';

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  coverage?: 'light' | 'medium' | 'full';
  finish?: 'matte' | 'satin' | 'dewy' | 'shimmer' | 'glitter';
  safetyScore: number;
  tags: string[];
  keyIngredients: string[];
  price?: string;
  description: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  foundation: 'Тональный крем',
  concealer: 'Консилер',
  blush: 'Румяна',
  bronzer: 'Бронзер',
  highlighter: 'Хайлайтер',
  eyeshadow: 'Тени',
  eyeliner: 'Подводка',
  mascara: 'Тушь',
  lipstick: 'Помада',
  lipgloss: 'Блеск для губ',
  primer: 'Праймер',
  'setting-powder': 'Фиксирующая пудра',
  'setting-spray': 'Фиксирующий спрей',
  contour: 'Контур',
  brow: 'Для бровей',
};

export const PRODUCTS: Product[] = [
  { id: 'p1', brand: 'NARS', name: 'Natural Radiant Longwear Foundation', category: 'foundation', coverage: 'full', finish: 'satin', safetyScore: 7, tags: ['Длительное ношение', 'Натуральный финиш', 'SPF'], keyIngredients: ['Titanium Dioxide', 'Dimethicone', 'Glycerin'], price: '3200–4500 ₽', description: 'Стойкое тональное средство с натуральным сияющим финишем. Формула обеспечивает плотное покрытие до 16 часов.' },
  { id: 'p2', brand: 'MAC', name: 'Studio Fix Fluid SPF 15', category: 'foundation', coverage: 'full', finish: 'matte', safetyScore: 6, tags: ['Матовый финиш', 'SPF 15', 'Контроль жирности'], keyIngredients: ['Titanium Dioxide', 'Avobenzone', 'Talc'], price: '2800–3800 ₽', description: 'Культовый матирующий флюид с фактором защиты. Идеален для жирной и комбинированной кожи.' },
  { id: 'p3', brand: 'Charlotte Tilbury', name: 'Light Wonder Foundation', category: 'foundation', coverage: 'light', finish: 'dewy', safetyScore: 7, tags: ['Лёгкое покрытие', 'Сияние', 'Уход'], keyIngredients: ['Hyaluronic Acid', 'Glycerin', 'Niacinamide'], price: '4500–5500 ₽', description: 'Лёгкое тональное средство с уходовыми компонентами для естественного сияния кожи.' },
  { id: 'p4', brand: 'Fenty Beauty', name: 'Pro Filt\'r Soft Matte Longwear Foundation', category: 'foundation', coverage: 'full', finish: 'matte', safetyScore: 7, tags: ['Матовый', 'Поровое заполнение', '40 оттенков'], keyIngredients: ['Dimethicone', 'Glycerin', 'Phenoxyethanol'], price: '3500–4200 ₽', description: 'Революционная тональная основа с 40+ оттенками. Матовый финиш без эффекта маски.' },
  { id: 'p5', brand: 'Maybelline', name: 'Fit Me Matte + Poreless Foundation', category: 'foundation', coverage: 'medium', finish: 'matte', safetyScore: 6, tags: ['Доступный', 'Матирующий', 'Поровое заполнение'], keyIngredients: ['Talc', 'Dimethicone', 'Alcohol Denat'], price: '600–900 ₽', description: 'Доступный вариант для натурального матового финиша. Заполняет поры и контролирует блеск.' },
  { id: 'p6', brand: 'L\'Oréal', name: 'Infallible Fresh Wear Foundation', category: 'foundation', coverage: 'full', finish: 'matte', safetyScore: 6, tags: ['Стойкий', '24H', 'Водостойкий'], keyIngredients: ['Titanium Dioxide', 'Cyclopentasiloxane', 'Dimethicone'], price: '900–1300 ₽', description: 'Водостойкая стойкая основа для активного образа жизни. Держится до 24 часов.' },
  { id: 'p7', brand: 'Giorgio Armani', name: 'Luminous Silk Foundation', category: 'foundation', coverage: 'medium', finish: 'satin', safetyScore: 8, tags: ['Люкс', 'Шёлковый финиш', 'Культовый'], keyIngredients: ['Glycerin', 'Tocopherol', 'Dimethicone'], price: '6000–8000 ₽', description: 'Легендарная тональная основа с эффектом шёлковой кожи. Флагман бренда на протяжении десятилетий.' },
  { id: 'p8', brand: 'Too Faced', name: 'Born This Way Foundation', category: 'foundation', coverage: 'full', finish: 'satin', safetyScore: 7, tags: ['Кокосовая вода', 'Alpine Rose', 'Натуральный вид'], keyIngredients: ['Glycerin', 'Ascorbic Acid', 'Tocopherol'], price: '3200–4000 ₽', description: 'Тональная основа с кокосовой водой и альпийской розой для кожи, выглядящей как вторая.' },
  { id: 'p9', brand: 'NARS', name: 'Radiant Creamy Concealer', category: 'concealer', safetyScore: 8, tags: ['Кремовый', 'Высокое покрытие', 'Под глаза'], keyIngredients: ['Glycerin', 'Dimethicone', 'Hyaluronic Acid'], price: '2500–3200 ₽', description: 'Культовый консилер с кремовой текстурой. Полное покрытие без подчёркивания морщин.' },
  { id: 'p10', brand: 'Charlotte Tilbury', name: 'Magic Away Liquid Concealer', category: 'concealer', safetyScore: 8, tags: ['Лёгкая текстура', 'Под глаза', 'Увлажняющий'], keyIngredients: ['Glycerin', 'Niacinamide', 'Hyaluronic Acid'], price: '3000–3800 ₽', description: 'Консилер-корректор с магическим эффектом немедленного устранения тёмных кругов.' },
  { id: 'p11', brand: 'Tarte', name: 'Shape Tape Full Coverage Concealer', category: 'concealer', safetyScore: 7, tags: ['Плотное покрытие', 'Стойкий', 'Матовый'], keyIngredients: ['Glycerin', 'Shea Butter', 'Mango Seed Butter'], price: '2200–3000 ₽', description: 'Суперстойкий консилер для безупречного покрытия. Культовый продукт с армией поклонниц.' },
  { id: 'p12', brand: 'MAC', name: 'Pro Longwear Concealer', category: 'concealer', coverage: 'full', finish: 'matte', safetyScore: 7, tags: ['Профессиональный', 'Стойкий', 'Водостойкий'], keyIngredients: ['Dimethicone', 'Talc', 'Phenoxyethanol'], price: '2000–2600 ₽', description: 'Профессиональный консилер для макияжа, который держится весь день без подправок.' },
  { id: 'p13', brand: 'NARS', name: 'Orgasm Blush', category: 'blush', finish: 'shimmer', safetyScore: 9, tags: ['Культовый', 'Персиковый', 'Мерцание'], keyIngredients: ['Mica', 'Iron Oxides', 'Talc'], price: '2800–3500 ₽', description: 'Самые продаваемые румяна в мире. Персиковый оттенок с золотым мерцанием подходит для большинства тонов кожи.' },
  { id: 'p14', brand: 'Charlotte Tilbury', name: 'Cheek to Chic Blush', category: 'blush', finish: 'satin', safetyScore: 9, tags: ['Двухцветный', 'Сияние', 'Профессиональный'], keyIngredients: ['Mica', 'Iron Oxides', 'Glycerin'], price: '3500–4500 ₽', description: 'Двухцветные румяна для голливудских скул. Нижний слой — свет, верхний — цвет.' },
  { id: 'p15', brand: 'Rare Beauty', name: 'Soft Pinch Liquid Blush', category: 'blush', safetyScore: 8, tags: ['Жидкие', 'Стойкие', 'Мало нужно'], keyIngredients: ['Glycerin', 'Hyaluronic Acid', 'Niacinamide'], price: '2500–3200 ₽', description: 'Революционные жидкие румяна — одной капли достаточно. Суперстойкая формула на весь день.' },
  { id: 'p16', brand: 'Too Faced', name: 'Peach Perfect Mattifying Bronzer', category: 'bronzer', finish: 'matte', safetyScore: 8, tags: ['Матовый', 'Натуральный загар', 'Персиковый'], keyIngredients: ['Mica', 'Iron Oxides', 'Talc'], price: '2500–3200 ₽', description: 'Матовый бронзер с персиковым ароматом для имитации естественного загара.' },
  { id: 'p17', brand: 'Charlotte Tilbury', name: 'Filmstar Bronze & Glow', category: 'bronzer', safetyScore: 9, tags: ['Контуринг', 'Бронзер+хайлайтер', 'Профессиональный'], keyIngredients: ['Mica', 'Iron Oxides', 'Tocopherol'], price: '5000–6500 ₽', description: 'Культовое дуэт для скульптурирования и сияния от мастера голливудского грима.' },
  { id: 'p18', brand: 'Fenty Beauty', name: 'Killawatt Freestyle Highlighter', category: 'highlighter', finish: 'shimmer', safetyScore: 9, tags: ['Интенсивное сияние', 'Пигментированный', 'Мультиоттеночный'], keyIngredients: ['Mica', 'Titanium Dioxide', 'Iron Oxides'], price: '2800–3600 ₽', description: 'Сверхпигментированный хайлайтер для ослепительного сияния. Профессиональный результат без навыков.' },
  { id: 'p19', brand: 'Charlotte Tilbury', name: 'Hollywood Flawless Filter', category: 'highlighter', finish: 'dewy', safetyScore: 8, tags: ['Жидкий', 'Смешивается с основой', 'Сияние'], keyIngredients: ['Mica', 'Glycerin', 'Dimethicone'], price: '3500–4500 ₽', description: 'Многофункциональный жидкий усилитель сияния. Можно носить отдельно или смешивать с основой.' },
  { id: 'p20', brand: 'Urban Decay', name: 'Naked Eyeshadow Palette', category: 'eyeshadow', finish: 'shimmer', safetyScore: 7, tags: ['Nude', 'Смешанные финиши', 'Культовая'], keyIngredients: ['Mica', 'Iron Oxides', 'Talc'], price: '4500–6000 ₽', description: 'Культовая нюдовая палетка теней. Комбинация матовых и шиммерных оттенков нейтральных тонов.' },
  { id: 'p21', brand: 'Charlotte Tilbury', name: 'Luxury Palette Eye Shadow', category: 'eyeshadow', safetyScore: 8, tags: ['Люкс', 'Смоки-айз', 'Легкое смешивание'], keyIngredients: ['Mica', 'Tocopherol', 'Dimethicone'], price: '4800–6000 ₽', description: 'Тщательно подобранные палетки для голливудского взгляда. Исключительная пигментация.' },
  { id: 'p22', brand: 'Pat McGrath', name: 'Mothership Eyeshadow Palette', category: 'eyeshadow', finish: 'shimmer', safetyScore: 8, tags: ['Ультра-пигмент', 'Арт', 'Профессиональный'], keyIngredients: ['Mica', 'Iron Oxides', 'Talc'], price: '8000–12000 ₽', description: 'Паллеты от богини макияжа. Непревзойдённая пигментация и уникальные формулы.' },
  { id: 'p23', brand: 'Stila', name: 'Stay All Day Waterproof Liquid Liner', category: 'eyeliner', safetyScore: 8, tags: ['Водостойкий', 'Стойкий', 'Чёрный'], keyIngredients: ['Iron Oxides', 'Phenoxyethanol'], price: '1800–2500 ₽', description: 'Жидкая подводка с тонким аппликатором. Идеальная линия с первого раза, держится 24 часа.' },
  { id: 'p24', brand: 'MAC', name: 'Retro Matte Liquid Lip Colour', category: 'lipstick', finish: 'matte', safetyScore: 7, tags: ['Жидкая', 'Матовый', 'Стойкий'], keyIngredients: ['Iron Oxides', 'Carmine', 'Dimethicone'], price: '1800–2500 ₽', description: 'Жидкая матовая помада с иконическим ретро-флаконом. Насыщенный пигмент, без высыхания губ.' },
  { id: 'p25', brand: 'Charlotte Tilbury', name: 'Matte Revolution Lipstick', category: 'lipstick', finish: 'matte', safetyScore: 8, tags: ['Увлажняющий', 'Матовый', 'Люкс'], keyIngredients: ['Tocopherol', 'Glycerin', 'Carmine'], price: '2800–3600 ₽', description: 'Революционная помада, которая матирует без высыхания. Уходовые ингредиенты в каждом мазке.' },
  { id: 'p26', brand: 'Fenty Beauty', name: 'Gloss Bomb Universal Lip Luminizer', category: 'lipgloss', finish: 'shimmer', safetyScore: 8, tags: ['Универсальный', 'Мерцание', 'Не липкий'], keyIngredients: ['Glycerin', 'Mica', 'Tocopherol'], price: '2000–2800 ₽', description: 'Самый продаваемый блеск Риэнны. Универсальный оттенок, роскошная формула без липкости.' },
  { id: 'p27', brand: 'Smashbox', name: 'Photo Finish Foundation Primer', category: 'primer', safetyScore: 6, tags: ['Классический', 'Поры', 'Стойкость макияжа'], keyIngredients: ['Dimethicone', 'Cyclopentasiloxane', 'Tocopherol'], price: '2500–3500 ₽', description: 'Культовый силиконовый праймер для безупречного нанесения тона и долгого ношения макияжа.' },
  { id: 'p28', brand: 'Charlotte Tilbury', name: 'Magic Primer', category: 'primer', safetyScore: 7, tags: ['Уход+праймер', 'Сияние', 'Увлажнение'], keyIngredients: ['Hyaluronic Acid', 'Niacinamide', 'Glycerin'], price: '3200–4000 ₽', description: 'Праймер с уходовыми ингредиентами. Увлажняет, выравнивает и создаёт базу для идеального макияжа.' },
  { id: 'p29', brand: 'NARS', name: 'Light Reflecting Powder', category: 'setting-powder', finish: 'dewy', safetyScore: 8, tags: ['Светоотражающий', 'Финишный', 'Сияние'], keyIngredients: ['Mica', 'Talc', 'Tocopherol'], price: '3000–4000 ₽', description: 'Финишная пудра с эффектом рассеянного света. Фиксирует макияж и придаёт коже здоровое сияние.' },
  { id: 'p30', brand: 'Urban Decay', name: 'All Nighter Setting Spray', category: 'setting-spray', safetyScore: 7, tags: ['Фиксация', '24H', 'Водостойкий'], keyIngredients: ['Glycerin', 'Phenoxyethanol', 'Alcohol Denat'], price: '2000–2800 ₽', description: 'Профессиональный фиксирующий спрей для стойкости макияжа до 24 часов. Любимец визажистов.' },
  { id: 'p31', brand: 'NYX', name: 'Gotcha Covered Concealer', category: 'concealer', coverage: 'full', safetyScore: 7, tags: ['Доступный', 'Стойкий', 'Высокое покрытие'], keyIngredients: ['Glycerin', 'Dimethicone', 'Talc'], price: '500–800 ₽', description: 'Бюджетный аналог дорогих консилеров с полным покрытием и хорошей стойкостью.' },
  { id: 'p32', brand: 'Benefit', name: 'Precisely, My Brow Pencil', category: 'brow', safetyScore: 8, tags: ['Ультратонкий', 'Натуральный вид', 'Стойкий'], keyIngredients: ['Iron Oxides', 'Tocopherol'], price: '1800–2500 ₽', description: 'Культовый карандаш для бровей с ультратонким наконечником. Создаёт эффект натуральных волосков.' },
  { id: 'p33', brand: 'Anastasia Beverly Hills', name: 'Brow Definer', category: 'brow', safetyScore: 8, tags: ['Треугольный наконечник', 'Натуральный', 'Профессиональный'], keyIngredients: ['Iron Oxides', 'Dimethicone', 'Tocopherol'], price: '2000–2800 ₽', description: 'Профессиональный карандаш с треугольным наконечником для имитации отдельных волосков бровей.' },
  { id: 'p34', brand: 'Clinique', name: 'High Impact Mascara', category: 'mascara', safetyScore: 8, tags: ['Объём', 'Изгиб', 'Гипоаллергенный'], keyIngredients: ['Iron Oxides', 'Glycerin', 'Tocopherol'], price: '2000–2800 ₽', description: 'Гипоаллергенная тушь для чувствительных глаз и тех, кто носит контактные линзы.' },
  { id: 'p35', brand: 'Lancôme', name: 'Hypnôse Mascara', category: 'mascara', safetyScore: 8, tags: ['Объём', 'Длина', 'Культовый'], keyIngredients: ['Iron Oxides', 'Glycerin', 'Carnauba Wax'], price: '2500–3500 ₽', description: 'Культовая тушь для гипнотизирующего взгляда. Объём и длина без слипания ресниц.' },
];
