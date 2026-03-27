import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { INGREDIENTS_DB, type SafetyLevel } from '@/data/ingredients';

const SAFETY_FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'safe', label: 'Безопасные' },
  { id: 'caution', label: 'Осторожно' },
  { id: 'danger', label: 'Опасные' },
];

const SAFETY_COLORS: Record<SafetyLevel | 'unknown', string> = {
  safe: '#4ade80',
  caution: '#fbbf24',
  danger: '#f87171',
  unknown: '#94a3b8',
};

const SAFETY_LABELS: Record<SafetyLevel | 'unknown', string> = {
  safe: 'Безопасен',
  caution: 'Осторожно',
  danger: 'Опасен',
  unknown: 'Неизвестно',
};

export default function IngredientsPage() {
  const [search, setSearch] = useState('');
  const [safetyFilter, setSafetyFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return INGREDIENTS_DB
      .filter(i => safetyFilter === 'all' || i.safety === safetyFilter)
      .filter(i => {
        const q = search.toLowerCase();
        return !q || i.name.toLowerCase().includes(q) || i.inci.toLowerCase().includes(q) || i.tags.some(t => t.toLowerCase().includes(q));
      })
      .sort((a, b) => b.safetyScore - a.safetyScore);
  }, [search, safetyFilter]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-px h-5 bg-[var(--lab-green)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">INGREDIENT REFERENCE</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Справочник ингредиентов</h1>
          <p className="text-muted-foreground text-sm">Научная база данных ингредиентов декоративной косметики</p>
        </div>

        <div className="lab-card p-4 mb-4 grid grid-cols-3 gap-3 text-center">
          {[
            { count: INGREDIENTS_DB.filter(i => i.safety === 'safe').length, label: 'Безопасных', color: '#4ade80' },
            { count: INGREDIENTS_DB.filter(i => i.safety === 'caution').length, label: 'Осторожно', color: '#fbbf24' },
            { count: INGREDIENTS_DB.filter(i => i.safety === 'danger').length, label: 'Опасных', color: '#f87171' },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
              <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по названию или INCI..."
              className="w-full bg-[var(--lab-surface)] border border-white/10 rounded pl-9 pr-4 py-2.5 text-sm font-mono placeholder:text-muted-foreground outline-none focus:border-[var(--lab-green-border)] transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {SAFETY_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setSafetyFilter(f.id)}
                className={`font-mono text-xs px-3 py-2 rounded transition-all ${
                  safetyFilter === f.id
                    ? 'bg-[var(--lab-green-dim)] text-[var(--lab-green)] border border-[var(--lab-green-border)]'
                    : 'text-muted-foreground border border-white/10 hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="font-mono text-[11px] text-muted-foreground mb-4">
          // найдено: {filtered.length} ингредиентов
        </div>

        <div className="space-y-2">
          {filtered.map((ing, i) => {
            const color = SAFETY_COLORS[ing.safety];
            const isOpen = expanded === ing.id;
            return (
              <div
                key={ing.id}
                className="lab-card p-4 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.03}s` }}
                onClick={() => setExpanded(isOpen ? null : ing.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-muted-foreground">{ing.inci}</span>
                    </div>
                    <div className="font-semibold text-sm">{ing.name}</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {ing.functions.map(f => (
                        <span key={f} className="font-mono text-[10px] px-2 py-0.5 rounded lab-tag-info">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded" style={{ background: color + '15', color, border: `1px solid ${color}30` }}>
                      {SAFETY_LABELS[ing.safety]}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${ing.safetyScore * 10}%`, background: color, transition: 'width 0.8s ease' }} />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{ing.safetyScore}/10</span>
                    </div>
                    <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={12} className="text-muted-foreground" />
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{ing.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div className="lab-card p-2 text-center">
                        <div className="font-mono text-[9px] text-muted-foreground mb-1">EWG</div>
                        <div className="font-mono font-bold text-sm">{ing.ewg ?? '—'}</div>
                      </div>
                      <div className="lab-card p-2 text-center">
                        <div className="font-mono text-[9px] text-muted-foreground mb-1">КОМЕДОГЕНН.</div>
                        <div className="font-mono font-bold text-sm">{ing.comedogenic ?? '—'}/5</div>
                      </div>
                      <div className="lab-card p-2 text-center">
                        <div className="font-mono text-[9px] text-muted-foreground mb-1">РЕЙТИНГ</div>
                        <div className="font-mono font-bold text-sm" style={{ color }}>{ing.safetyScore}/10</div>
                      </div>
                      <div className="lab-card p-2 text-center">
                        <div className="font-mono text-[9px] text-muted-foreground mb-1">ФУНКЦИИ</div>
                        <div className="font-mono font-bold text-sm">{ing.functions.length}</div>
                      </div>
                    </div>
                    {ing.concerns && ing.concerns.length > 0 && (
                      <div className="p-3 rounded border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.05)] mb-3">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Icon name="AlertTriangle" size={12} className="text-[#f87171]" />
                          <span className="font-mono text-[10px] text-[#f87171]">РИСКИ</span>
                        </div>
                        {ing.concerns.map((c, j) => (
                          <div key={j} className="text-xs text-muted-foreground">— {c}</div>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {ing.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="lab-card p-12 text-center">
            <Icon name="SearchX" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
