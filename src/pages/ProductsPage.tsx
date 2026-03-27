import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { PRODUCTS, CATEGORY_LABELS, type ProductCategory, type Product } from '@/data/products';

const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all',            label: 'Все' },
  { id: 'foundation',     label: 'Тональный' },
  { id: 'concealer',      label: 'Консилер' },
  { id: 'blush',          label: 'Румяна' },
  { id: 'bronzer',        label: 'Бронзер' },
  { id: 'highlighter',    label: 'Хайлайтер' },
  { id: 'eyeshadow',      label: 'Тени' },
  { id: 'eyeliner',       label: 'Подводка' },
  { id: 'mascara',        label: 'Тушь' },
  { id: 'lipstick',       label: 'Помада' },
  { id: 'lipgloss',       label: 'Блеск' },
  { id: 'primer',         label: 'Праймер' },
  { id: 'setting-powder', label: 'Пудра' },
  { id: 'setting-spray',  label: 'Спрей' },
  { id: 'contour',        label: 'Контур' },
  { id: 'brow',           label: 'Брови' },
];

const FINISH_ICONS: Record<string, string> = {
  matte: '◼', satin: '◈', dewy: '◉', shimmer: '✦', glitter: '✶',
};

const SCORE_COLOR = (s: number) => s >= 8 ? '#4e7a69' : s >= 5 ? '#8a6e38' : '#a05050';
const SCORE_BG    = (s: number) => s >= 8 ? 'rgba(122,158,142,0.12)' : s >= 5 ? 'rgba(196,169,122,0.12)' : 'rgba(212,140,140,0.12)';
const SCORE_BORDER= (s: number) => s >= 8 ? 'rgba(122,158,142,0.28)' : s >= 5 ? 'rgba(196,169,122,0.28)' : 'rgba(212,140,140,0.28)';

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: SCORE_BG(score), color: SCORE_COLOR(score), border: `1px solid ${SCORE_BORDER(score)}` }}>
      {score}/10
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="lab-card p-5 flex flex-col gap-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {CATEGORY_LABELS[product.category]}
            </span>
            {product.finish && (
              <span className="font-mono text-[10px] text-muted-foreground">{FINISH_ICONS[product.finish]} {product.finish}</span>
            )}
            {product.origin === 'ru' && (
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(168,155,191,0.12)', color: '#6a5e8a', border: '1px solid rgba(168,155,191,0.28)' }}>
                🇷🇺 РФ
              </span>
            )}
          </div>
          <div className="font-semibold text-sm text-[var(--sage)]">{product.brand}</div>
          <div className="font-semibold text-sm leading-snug">{product.name}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <ScoreBadge score={product.safetyScore} />
          {product.price && (
            <span className="font-mono text-[11px] text-muted-foreground">{product.price}</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {product.tags.slice(0, 3).map(t => (
          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[hsl(var(--muted))] text-muted-foreground">{t}</span>
        ))}
      </div>

      {expanded && (
        <div className="pt-3 border-t border-[hsl(var(--border))] animate-fade-in">
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{product.description}</p>
          {product.keyIngredients.length > 0 && (
            <div>
              <div className="font-mono text-[10px] text-muted-foreground mb-1.5">КЛЮЧЕВЫЕ INCI-ИНГРЕДИЕНТЫ</div>
              <div className="flex flex-wrap gap-1">
                {product.keyIngredients.map(i => (
                  <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded lab-tag-info">{i}</span>
                ))}
              </div>
            </div>
          )}
          {product.coverage && (
            <div className="mt-2 font-mono text-[11px] text-muted-foreground">
              Покрытие: <span className="text-foreground">{product.coverage === 'light' ? 'лёгкое' : product.coverage === 'medium' ? 'среднее' : 'плотное'}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [originFilter, setOriginFilter] = useState<'all' | 'ru' | 'intl'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'price'>('score');

  const ruCount   = PRODUCTS.filter(p => p.origin === 'ru').length;
  const intlCount = PRODUCTS.filter(p => p.origin === 'intl').length;

  const filtered = useMemo(() => {
    return PRODUCTS
      .filter(p => category === 'all' || p.category === category)
      .filter(p => originFilter === 'all' || p.origin === originFilter)
      .filter(p => {
        const q = search.toLowerCase();
        return !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      })
      .sort((a, b) => sortBy === 'score' ? b.safetyScore - a.safetyScore : a.name.localeCompare(b.name));
  }, [category, originFilter, search, sortBy]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-px h-5 bg-[var(--sage)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">PRODUCTS DATABASE</span>
          </div>
          <h1 className="text-3xl font-black mb-2">База продуктов</h1>
          <p className="text-muted-foreground text-sm">Декоративная косметика с оценками безопасности состава по INCI</p>
        </div>

        {/* Счётчики */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Всего продуктов',  count: PRODUCTS.length,  color: 'var(--sage)' },
            { label: '🇷🇺 Российские',     count: ruCount,          color: '#6a5e8a' },
            { label: 'Международные',    count: intlCount,         color: 'var(--dust-amber)' },
          ].map((s, i) => (
            <div key={i} className="lab-card p-4 text-center">
              <div className="font-mono text-xl font-bold mb-0.5" style={{ color: s.color }}>{s.count}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Поиск и сортировка */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по бренду или названию..."
              className="w-full bg-white border border-[hsl(var(--border))] rounded-lg pl-9 pr-4 py-2.5 text-sm font-mono placeholder:text-muted-foreground outline-none focus:border-[var(--sage)] transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'score' | 'price')}
            className="bg-white border border-[hsl(var(--border))] rounded-lg px-3 py-2.5 text-sm font-mono text-foreground outline-none focus:border-[var(--sage)]"
          >
            <option value="score">По рейтингу</option>
            <option value="name">По названию</option>
          </select>
        </div>

        {/* Фильтр происхождения */}
        <div className="flex gap-2 mb-4">
          {([
            { id: 'all',  label: 'Все бренды' },
            { id: 'ru',   label: '🇷🇺 Российские' },
            { id: 'intl', label: 'Международные' },
          ] as { id: 'all' | 'ru' | 'intl'; label: string }[]).map(o => (
            <button
              key={o.id}
              onClick={() => setOriginFilter(o.id)}
              className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-all ${originFilter === o.id ? 'pill-active' : 'pill-inactive'}`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Категории */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all ${category === c.id ? 'pill-active' : 'pill-inactive'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="font-mono text-[11px] text-muted-foreground mb-4">
          найдено: {filtered.length} продуктов
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="lab-card p-12 text-center">
            <Icon name="PackageSearch" size={28} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Ничего не найдено по вашему запросу</p>
          </div>
        )}
      </div>
    </div>
  );
}
