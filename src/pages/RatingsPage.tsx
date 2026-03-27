import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { PRODUCTS, CATEGORY_LABELS } from '@/data/products';

const TOP_SAFE = [...PRODUCTS].sort((a, b) => b.safetyScore - a.safetyScore).slice(0, 10);
const BY_CATEGORY = Object.entries(
  PRODUCTS.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<string, typeof PRODUCTS>)
).map(([cat, products]) => ({
  category: cat,
  label: CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] ?? cat,
  best: [...products].sort((a, b) => b.safetyScore - a.safetyScore)[0],
  avg: Math.round(products.reduce((s, p) => s + p.safetyScore, 0) / products.length),
  count: products.length,
})).sort((a, b) => b.avg - a.avg);

const BRANDS_STATS = Object.entries(
  PRODUCTS.reduce((acc, p) => {
    if (!acc[p.brand]) acc[p.brand] = [];
    acc[p.brand].push(p);
    return acc;
  }, {} as Record<string, typeof PRODUCTS>)
).map(([brand, products]) => ({
  brand,
  avg: Math.round((products.reduce((s, p) => s + p.safetyScore, 0) / products.length) * 10) / 10,
  count: products.length,
})).sort((a, b) => b.avg - a.avg).slice(0, 10);

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-base">🥇</span>;
  if (rank === 2) return <span className="text-base">🥈</span>;
  if (rank === 3) return <span className="text-base">🥉</span>;
  return <span className="font-mono text-xs text-muted-foreground w-5 text-center">#{rank}</span>;
}

function ScoreBar({ score, max = 10 }: { score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = score >= 8 ? '#4ade80' : score >= 5 ? '#fbbf24' : '#f87171';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, transition: 'width 1s ease' }} />
      </div>
      <span className="font-mono text-xs shrink-0" style={{ color }}>{score}/10</span>
    </div>
  );
}

type Tab = 'top' | 'categories' | 'brands';

export default function RatingsPage() {
  const [tab, setTab] = useState<Tab>('top');

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-px h-5 bg-[var(--lab-green)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">RATINGS & ANALYTICS</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Рейтинги</h1>
          <p className="text-muted-foreground text-sm">Рейтинги продуктов по безопасности состава на основе научных данных</p>
        </div>

        <div className="flex gap-2 mb-6">
          {([
            { id: 'top', label: 'Топ продукты', icon: 'Trophy' },
            { id: 'categories', label: 'По категориям', icon: 'Grid3x3' },
            { id: 'brands', label: 'По брендам', icon: 'Award' },
          ] as { id: Tab; label: string; icon: string }[]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded font-mono text-xs transition-all ${
                tab === t.id
                  ? 'bg-[var(--lab-green-dim)] text-[var(--lab-green)] border border-[var(--lab-green-border)]'
                  : 'text-muted-foreground border border-white/10 hover:border-white/20'
              }`}
            >
              <Icon name={t.icon} size={12} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'top' && (
          <div className="animate-fade-in">
            <div className="font-mono text-[11px] text-muted-foreground mb-4">
              // топ-10 безопасных продуктов по составу
            </div>
            <div className="space-y-2">
              {TOP_SAFE.map((p, i) => (
                <div key={p.id} className="lab-card p-4 flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="w-8 shrink-0 flex justify-center">
                    <MedalIcon rank={i + 1} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-[var(--lab-green)]">{p.brand}</div>
                    <div className="text-sm truncate">{p.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{CATEGORY_LABELS[p.category]}</div>
                  </div>
                  <div className="w-32 shrink-0">
                    <ScoreBar score={p.safetyScore} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'categories' && (
          <div className="animate-fade-in">
            <div className="font-mono text-[11px] text-muted-foreground mb-4">
              // средний рейтинг безопасности по категориям
            </div>
            <div className="space-y-2">
              {BY_CATEGORY.map((c, i) => (
                <div key={c.category} className="lab-card p-4 animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="font-semibold text-sm">{c.label}</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{c.count} продуктов в базе</div>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground text-right">
                      <div className="text-foreground font-bold text-sm">{c.avg}/10</div>
                      <div>средний балл</div>
                    </div>
                  </div>
                  <ScoreBar score={c.avg} />
                  {c.best && (
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <div className="font-mono text-[10px] text-muted-foreground mb-1">ЛУЧШИЙ В КАТЕГОРИИ</div>
                      <div className="text-xs">
                        <span className="text-[var(--lab-green)]">{c.best.brand}</span> — {c.best.name}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'brands' && (
          <div className="animate-fade-in">
            <div className="font-mono text-[11px] text-muted-foreground mb-4">
              // топ-10 брендов по среднему рейтингу безопасности
            </div>
            <div className="space-y-2">
              {BRANDS_STATS.map((b, i) => (
                <div key={b.brand} className="lab-card p-4 flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="w-8 shrink-0 flex justify-center">
                    <MedalIcon rank={i + 1} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{b.brand}</div>
                    <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{b.count} продуктов</div>
                  </div>
                  <div className="w-36 shrink-0">
                    <ScoreBar score={b.avg} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 lab-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Info" size={14} className="text-[var(--lab-green)]" />
                <span className="font-mono text-xs text-muted-foreground">КАК СЧИТАЕТСЯ РЕЙТИНГ</span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--lab-green)] mt-1.5 shrink-0" />
                  <span>Рейтинг безопасности основан на научных данных об ингредиентах в составе</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--lab-green)] mt-1.5 shrink-0" />
                  <span>Учитываются данные EWG, коэдогенный потенциал и наличие спорных ингредиентов</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--lab-green)] mt-1.5 shrink-0" />
                  <span>10 — максимально безопасный состав, 1 — содержит потенциально опасные ингредиенты</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
