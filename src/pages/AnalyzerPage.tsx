import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { analyzeIngredients, getOverallScore, type Ingredient, type SafetyLevel } from '@/data/ingredients';

const SAFETY_CONFIG: Record<SafetyLevel, { label: string; color: string; barClass: string; tagClass: string }> = {
  safe: { label: 'Безопасен', color: '#4ade80', barClass: 'progress-bar-safe', tagClass: 'lab-tag-safe' },
  caution: { label: 'Осторожно', color: '#fbbf24', barClass: 'progress-bar-caution', tagClass: 'lab-tag-caution' },
  danger: { label: 'Опасен', color: '#f87171', barClass: 'progress-bar-danger', tagClass: 'lab-tag-danger' },
  unknown: { label: 'Неизвестно', color: '#94a3b8', barClass: '', tagClass: 'lab-tag-info' },
};

const EXAMPLE_COMPOSITION = `Aqua, Titanium Dioxide, Glycerin, Dimethicone, Niacinamide, Phenoxyethanol, Mica, Iron Oxides, Tocopherol, Hyaluronic Acid, Parfum`;

function ScoreRing({ score }: { score: number }) {
  const color = score >= 8 ? '#4ade80' : score >= 5 ? '#fbbf24' : '#f87171';
  const label = score >= 8 ? 'Хороший' : score >= 5 ? 'Средний' : 'Плохой';
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="48" cy="48" r="40" fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 10)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold" style={{ color }}>{score}</span>
          <span className="font-mono text-[9px] text-muted-foreground">/10</span>
        </div>
      </div>
      <span className="font-mono text-xs mt-2" style={{ color }}>{label}</span>
    </div>
  );
}

function IngredientCard({ ingredient, index }: { ingredient: Ingredient; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = SAFETY_CONFIG[ingredient.safety];

  return (
    <div
      className="lab-card p-4 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="number-badge">#{String(index + 1).padStart(2, '0')}</span>
            <span className="font-mono text-xs text-muted-foreground">{ingredient.inci}</span>
          </div>
          <div className="font-semibold text-sm mt-0.5 truncate">{ingredient.name}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {ingredient.functions.map(f => (
              <span key={f} className="font-mono text-[10px] px-2 py-0.5 rounded lab-tag-info">{f}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`font-mono text-[10px] px-2 py-1 rounded ${cfg.tagClass}`}>{cfg.label}</span>
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full rounded-full ${cfg.barClass}`} style={{ width: `${ingredient.safetyScore * 10}%`, transition: 'width 0.8s ease' }} />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{ingredient.safetyScore}/10</span>
          </div>
          <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={12} className="text-muted-foreground" />
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{ingredient.description}</p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {ingredient.ewg !== undefined && (
              <div className="lab-card p-2">
                <div className="text-muted-foreground font-mono text-[10px] mb-1">EWG РЕЙТИНГ</div>
                <div className="font-mono font-bold" style={{ color: ingredient.ewg <= 2 ? '#4ade80' : ingredient.ewg <= 5 ? '#fbbf24' : '#f87171' }}>
                  {ingredient.ewg}/10
                </div>
              </div>
            )}
            {ingredient.comedogenic !== undefined && (
              <div className="lab-card p-2">
                <div className="text-muted-foreground font-mono text-[10px] mb-1">КОМЕДОГЕННОСТЬ</div>
                <div className="font-mono font-bold" style={{ color: ingredient.comedogenic <= 1 ? '#4ade80' : ingredient.comedogenic <= 3 ? '#fbbf24' : '#f87171' }}>
                  {ingredient.comedogenic}/5
                </div>
              </div>
            )}
          </div>
          {ingredient.concerns && ingredient.concerns.length > 0 && (
            <div className="mt-3 p-3 rounded border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.05)]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon name="AlertTriangle" size={12} className="text-[#f87171]" />
                <span className="font-mono text-[10px] text-[#f87171]">ВНИМАНИЕ</span>
              </div>
              {ingredient.concerns.map((c, i) => (
                <div key={i} className="text-xs text-muted-foreground">— {c}</div>
              ))}
            </div>
          )}
          {ingredient.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {ingredient.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-muted-foreground">{t}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AnalyzerPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ found: Ingredient[]; unknown: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeIngredients(input));
      setIsAnalyzing(false);
    }, 800);
  };

  const handleExample = () => {
    setInput(EXAMPLE_COMPOSITION);
    setResult(null);
  };

  const score = result ? getOverallScore(result.found) : 0;
  const safeCount = result?.found.filter(i => i.safety === 'safe').length ?? 0;
  const cautionCount = result?.found.filter(i => i.safety === 'caution').length ?? 0;
  const dangerCount = result?.found.filter(i => i.safety === 'danger').length ?? 0;

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-px h-5 bg-[var(--lab-green)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">ANALYZER</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Анализатор состава</h1>
          <p className="text-muted-foreground text-sm">Вставьте INCI-состав с упаковки — система разберёт каждый ингредиент</p>
        </div>

        <div className="lab-card p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="font-mono text-xs text-[var(--lab-green)] tracking-widest">// ВВОД СОСТАВА</label>
            <button
              onClick={handleExample}
              className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors border border-white/10 px-3 py-1 rounded hover:border-white/20"
            >
              Пример состава
            </button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Aqua, Glycerin, Niacinamide, Titanium Dioxide, Dimethicone..."
            className="w-full h-32 bg-transparent resize-none font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none border border-white/10 rounded p-3 focus:border-[var(--lab-green-border)] transition-colors"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="font-mono text-[11px] text-muted-foreground">
              Ингредиенты разделяйте запятыми или переносами строк
            </span>
            <button
              onClick={handleAnalyze}
              disabled={!input.trim() || isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all disabled:opacity-40"
              style={{ background: 'var(--lab-green)', color: '#070b14' }}
            >
              {isAnalyzing ? (
                <>
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  Анализ...
                </>
              ) : (
                <>
                  <Icon name="Microscope" size={14} />
                  Анализировать
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="lab-card p-4 flex flex-col items-center justify-center col-span-2 md:col-span-1 row-span-1">
                <ScoreRing score={score} />
                <div className="font-mono text-[10px] text-muted-foreground mt-2 text-center">ОБЩАЯ ОЦЕНКА</div>
              </div>
              <div className="lab-card p-4 flex flex-col justify-between">
                <div className="font-mono text-[10px] text-muted-foreground mb-2">РАСПОЗНАНО</div>
                <div className="font-mono text-3xl font-bold text-foreground">{result.found.length}</div>
                <div className="text-xs text-muted-foreground">из {result.found.length + result.unknown.length}</div>
              </div>
              <div className="lab-card p-4">
                <div className="font-mono text-[10px] text-muted-foreground mb-2">БЕЗОПАСНЫХ</div>
                <div className="font-mono text-3xl font-bold text-[var(--lab-green)]">{safeCount}</div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: Math.min(safeCount, 5) }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--lab-green)]" />
                  ))}
                </div>
              </div>
              <div className="lab-card p-4">
                <div className="font-mono text-[10px] text-muted-foreground mb-2">ТРЕБУЮТ ВНИМАНИЯ</div>
                <div className="font-mono text-3xl font-bold" style={{ color: cautionCount > 0 ? '#fbbf24' : 'inherit' }}>{cautionCount}</div>
                <div className="font-mono text-[10px] mt-2" style={{ color: dangerCount > 0 ? '#f87171' : 'var(--muted-foreground)' }}>
                  {dangerCount} опасных
                </div>
              </div>
            </div>

            {result.found.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="CheckCircle2" size={14} className="text-[var(--lab-green)]" />
                  <span className="font-mono text-xs tracking-widest text-muted-foreground">РАСПОЗНАННЫЕ ИНГРЕДИЕНТЫ</span>
                </div>
                <div className="space-y-2">
                  {result.found.map((ing, i) => (
                    <IngredientCard key={ing.id} ingredient={ing} index={i} />
                  ))}
                </div>
              </div>
            )}

            {result.unknown.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="HelpCircle" size={14} className="text-muted-foreground" />
                  <span className="font-mono text-xs tracking-widest text-muted-foreground">НЕ В БАЗЕ ({result.unknown.length})</span>
                </div>
                <div className="lab-card p-4">
                  <div className="flex flex-wrap gap-2">
                    {result.unknown.map((u, i) => (
                      <span key={i} className="font-mono text-[11px] px-2 py-1 rounded bg-white/5 text-muted-foreground">
                        {u}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 font-mono">
                    // База данных постоянно пополняется. Неизвестные ингредиенты могут быть безопасными — просто их ещё нет в нашей системе.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {!result && (
          <div className="lab-card p-8 text-center">
            <Icon name="Microscope" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Введите состав выше и нажмите «Анализировать»</p>
            <p className="font-mono text-[11px] text-muted-foreground mt-2">
              Найдите состав на упаковке или в карточке товара — раздел «Ingredients» или «Состав»
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
