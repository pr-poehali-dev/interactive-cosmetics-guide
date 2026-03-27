import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const STATS = [
  { value: '85+', label: 'Ингредиентов INCI',    icon: 'Atom',        color: 'var(--sage)' },
  { value: '76',  label: 'Продуктов в каталоге', icon: 'Package',     color: 'var(--blush)' },
  { value: '12',  label: 'Топ-аллергенов',       icon: 'AlertCircle', color: 'var(--dust-amber)' },
  { value: '5',   label: 'Типов кожи',           icon: 'Sparkles',    color: 'var(--lavender)' },
];

const FEATURES = [
  {
    id: 'analyzer',
    icon: 'Microscope',
    title: 'Анализатор состава',
    desc: 'Вставьте INCI-состав с упаковки — система разберёт каждый ингредиент, оценит безопасность и выявит потенциальные риски.',
    color: 'var(--sage)',
    bg: 'var(--sage-light)',
    border: 'var(--sage-border)',
    label: 'Открыть анализатор',
  },
  {
    id: 'products',
    icon: 'Archive',
    title: 'База продуктов',
    desc: 'Каталог декоративной косметики с подробным составом, оценками безопасности и фильтрацией по категориям и брендам.',
    color: 'var(--blush)',
    bg: 'var(--blush-light)',
    border: 'var(--blush-border)',
    label: 'Смотреть каталог',
  },
  {
    id: 'allergy',
    icon: 'AlertCircle',
    title: 'Гид по аллергенам',
    desc: 'Список ингредиентов, вызывающих аллергию — с симптомами, степенью риска, советами и перечнем продуктов, где они встречаются.',
    color: 'var(--dust-amber)',
    bg: 'var(--dust-amber-light)',
    border: 'rgba(196,169,122,0.3)',
    label: 'Смотреть аллергены',
  },
  {
    id: 'skintest',
    icon: 'Sparkles',
    title: 'Тест: тип кожи',
    desc: '6 вопросов — и вы узнаете свой тип кожи с персональными рекомендациями по декоративной косметике и ингредиентам.',
    color: 'var(--lavender)',
    bg: 'var(--lavender-light)',
    border: 'rgba(168,155,191,0.3)',
    label: 'Пройти тест',
  },
  {
    id: 'ingredients',
    icon: 'BookOpen',
    title: 'Справочник ингредиентов',
    desc: 'Научная база данных каждого ингредиента: функции, EWG-рейтинг, коэдогенность и противопоказания.',
    color: '#7a8fa0',
    bg: 'rgba(122,143,160,0.12)',
    border: 'rgba(122,143,160,0.3)',
    label: 'Открыть справочник',
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen pt-14">
      {/* Hero */}
      <section className="relative px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(122,158,142,0.07) 0%, transparent 70%)' }} />
          <div className="absolute top-16 left-8 font-mono text-[10px] leading-6 hidden lg:block"
            style={{ color: 'rgba(122,158,142,0.25)' }}>
            {['H₂O', 'TiO₂', 'ZnO', 'C₃H₈O₃', 'FeO·Fe₂O₃'].map((f, i) => (
              <div key={i}>{f}</div>
            ))}
          </div>
          <div className="absolute bottom-16 right-8 font-mono text-[10px] leading-6 text-right hidden lg:block"
            style={{ color: 'rgba(168,155,191,0.25)' }}>
            {['pH 5.5', 'EWG:1', 'INCI', 'SPF 50'].map((f, i) => (
              <div key={i}>{f}</div>
            ))}
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--sage-border)] bg-[var(--sage-light)] mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--sage)] animate-pulse" />
            <span className="font-mono text-[11px] text-[var(--sage)] tracking-[0.12em]">
              COSMETIC INTELLIGENCE — v1.0
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-1 tracking-tight" style={{ color: 'hsl(var(--foreground))' }}>
            BEAUTY
          </h1>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight" style={{ color: 'var(--sage)' }}>
            LAB
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Научный подход к декоративной косметике. Анализ ингредиентов, справочник аллергенов и тест типа кожи.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('analyzer')}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: 'var(--sage)', color: '#fff' }}
            >
              <Icon name="Microscope" size={15} />
              Анализировать состав
              <Icon name="ArrowRight" size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('skintest')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border transition-all"
              style={{ borderColor: 'var(--lavender-border, rgba(168,155,191,0.35))', color: 'var(--lavender)', background: 'var(--lavender-light)' }}
            >
              <Icon name="Sparkles" size={15} />
              Определить тип кожи
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-14">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <div key={i} className="lab-card p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-lg border flex items-center justify-center"
                  style={{ borderColor: s.color + '40', background: s.color + '15' }}>
                  <Icon name={s.icon} size={16} style={{ color: s.color }} />
                </div>
              </div>
              <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-px h-5 bg-[var(--sage)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Разделы</span>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <button
                key={f.id}
                onClick={() => onNavigate(f.id)}
                className="lab-card p-6 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border flex items-center justify-center"
                    style={{ borderColor: f.border, background: f.bg }}>
                    <Icon name={f.icon} size={17} style={{ color: f.color }} />
                  </div>
                  <Icon name="ArrowUpRight" size={13} className="text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{f.desc}</p>
                <div className="flex items-center gap-1 font-mono text-xs" style={{ color: f.color }}>
                  {f.label}
                  <Icon name="ChevronRight" size={11} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="lab-card p-7 flex flex-col md:flex-row items-center gap-5"
            style={{ background: 'rgba(122,158,142,0.05)', borderColor: 'var(--sage-border)' }}>
            <div className="flex-1">
              <div className="font-mono text-[11px] text-[var(--sage)] tracking-widest mb-2">БЫСТРЫЙ СТАРТ</div>
              <h2 className="text-xl font-bold mb-1.5">Проверьте состав вашей косметики</h2>
              <p className="text-muted-foreground text-sm">Скопируйте состав с упаковки или из карточки товара и получите полный разбор.</p>
            </div>
            <button
              onClick={() => onNavigate('analyzer')}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: 'var(--sage)' }}
            >
              <Icon name="Zap" size={15} />
              Начать анализ
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--border))] px-6 py-7">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon name="FlaskConical" size={13} className="text-[var(--sage)]" />
            <span className="font-mono text-xs text-muted-foreground tracking-wider">BEAUTYLAB © 2026</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground text-center">
            Данные носят информационный характер и не являются медицинскими рекомендациями
          </span>
        </div>
      </footer>
    </div>
  );
}