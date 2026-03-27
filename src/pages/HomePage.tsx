import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const STATS = [
  { value: '30+', label: 'Ингредиентов в базе', icon: 'Atom' },
  { value: '35+', label: 'Продуктов в каталоге', icon: 'Package' },
  { value: '15', label: 'Категорий косметики', icon: 'Grid3x3' },
  { value: '100%', label: 'Научные данные', icon: 'BookOpen' },
];

const FEATURES = [
  {
    id: 'analyzer',
    icon: 'Microscope',
    title: 'Анализатор состава',
    desc: 'Вставьте INCI-состав с упаковки — система разберёт каждый ингредиент, оценит безопасность и выявит потенциальные риски.',
    accent: '#4ade80',
    label: 'Открыть анализатор',
  },
  {
    id: 'products',
    icon: 'Archive',
    title: 'База продуктов',
    desc: 'Каталог декоративной косметики с подробным составом, оценками безопасности и фильтрацией по категориям и брендам.',
    accent: '#38bdf8',
    label: 'Смотреть каталог',
  },
  {
    id: 'ingredients',
    icon: 'FlaskConical',
    title: 'Справочник ингредиентов',
    desc: 'Научная база данных каждого ингредиента: функции, EWG-рейтинг, коэдогенность, противопоказания и исследования.',
    accent: '#fbbf24',
    label: 'Открыть справочник',
  },
  {
    id: 'ratings',
    icon: 'BarChart3',
    title: 'Рейтинги и отзывы',
    desc: 'Рейтинги продуктов по безопасности состава, отзывы и сравнения. Найдите лучшие продукты для вашего типа кожи.',
    accent: '#c084fc',
    label: 'Смотреть рейтинги',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen pt-14">
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-20 left-10 font-mono text-[10px] text-[rgba(74,222,128,0.2)] leading-6">
            {['H₂O', 'C₁₀H₁₅NO₂', 'TiO₂', 'ZnO', 'C₃H₈O₃', 'SiO₂', 'FeO·Fe₂O₃'].map((f, i) => (
              <div key={i} style={{ opacity: 0.3 + i * 0.1 }}>{f}</div>
            ))}
          </div>
          <div className="absolute bottom-20 right-10 font-mono text-[10px] text-[rgba(74,222,128,0.2)] leading-6 text-right">
            {['pH 5.5', 'EWG:1', 'INCI', 'CAS#', 'SPF 50', 'UVA/UVB'].map((f, i) => (
              <div key={i} style={{ opacity: 0.2 + i * 0.1 }}>{f}</div>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--lab-green-border)] bg-[var(--lab-green-dim)] mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--lab-green)] animate-pulse" />
            <span className="font-mono text-[11px] text-[var(--lab-green)] tracking-[0.15em]">
              COSMETIC INGREDIENT ANALYSIS SYSTEM — v1.0
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight leading-none">
            BEAUTY
          </h1>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none"
            style={{ color: 'var(--lab-green)', textShadow: '0 0 40px rgba(74,222,128,0.4)' }}>
            LAB
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Научный подход к декоративной косметике. Анализ ингредиентов, база продуктов и справочник — всё для осознанного выбора.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('analyzer')}
              className="group flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
              style={{ background: 'var(--lab-green)', color: '#070b14' }}
            >
              <Icon name="Microscope" size={16} />
              Анализировать состав
              <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-[var(--lab-green-border)] text-foreground hover:bg-[var(--lab-green-dim)] transition-all"
            >
              <Icon name="Archive" size={16} />
              База продуктов
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="lab-card p-5 text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded border border-[var(--lab-green-border)] bg-[var(--lab-green-dim)] flex items-center justify-center">
                  <Icon name={s.icon} size={16} className="text-[var(--lab-green)]" />
                </div>
              </div>
              <div className="font-mono text-2xl font-bold text-[var(--lab-green)]">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-px h-6 bg-[var(--lab-green)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">ФУНКЦИИ СИСТЕМЫ</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => onNavigate(f.id)}
                className="lab-card p-6 text-left group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded border flex items-center justify-center"
                    style={{ borderColor: f.accent + '40', background: f.accent + '15' }}>
                    <Icon name={f.icon} size={18} style={{ color: f.accent }} />
                  </div>
                  <Icon name="ArrowUpRight" size={14} className="text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
                </div>
                <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                <div className="flex items-center gap-1.5 font-mono text-xs" style={{ color: f.accent }}>
                  <span>{f.label}</span>
                  <Icon name="ChevronRight" size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="lab-card p-8 scan-line">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="font-mono text-xs text-[var(--lab-green)] tracking-widest mb-2">// БЫСТРЫЙ СТАРТ</div>
                <h2 className="text-2xl font-bold mb-2">Попробуйте анализатор прямо сейчас</h2>
                <p className="text-muted-foreground text-sm">Скопируйте состав с упаковки любого косметического продукта и получите полный научный разбор каждого ингредиента.</p>
              </div>
              <button
                onClick={() => onNavigate('analyzer')}
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--lab-green)', color: '#070b14' }}
              >
                <Icon name="Zap" size={16} />
                Начать анализ
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--lab-green-border)] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="FlaskConical" size={14} className="text-[var(--lab-green)]" />
            <span className="font-mono text-xs text-muted-foreground tracking-wider">BEAUTYLAB © 2026</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">Данные носят информационный характер и не являются медицинскими рекомендациями</span>
        </div>
      </footer>
    </div>
  );
}
