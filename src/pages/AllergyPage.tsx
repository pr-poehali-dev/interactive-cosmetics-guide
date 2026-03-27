import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Allergen {
  id: string;
  inci: string;
  name: string;
  category: string;
  prevalence: 'high' | 'medium' | 'low';
  products: string[];
  symptoms: string[];
  description: string;
  tips: string;
  isCmr?: boolean;
  isEuRestricted?: boolean;
}

const ALLERGENS: Allergen[] = [
  {
    id: 'a1',
    inci: 'PARFUM / FRAGRANCE',
    name: 'Отдушка (Парфюм)',
    category: 'Ароматизаторы',
    prevalence: 'high',
    products: ['Помада', 'Тональный крем', 'Румяна', 'Тени', 'Праймер'],
    symptoms: ['Контактный дерматит', 'Покраснение', 'Зуд', 'Отёк', 'Крапивница'],
    description: 'Собирательное название для смеси ароматических веществ. Производители не обязаны раскрывать состав. Один из главных аллергенов в косметике — в нём может быть более 100 отдельных химических соединений.',
    tips: 'Ищите маркировку «fragrance-free» (без отдушек), а не «unscented» — последнее может означать замаскированный аромат.',
    isEuRestricted: true,
  },
  {
    id: 'a2',
    inci: 'METHYLISOTHIAZOLINONE',
    name: 'Метилизотиазолинон (MIT)',
    category: 'Консерванты',
    prevalence: 'high',
    products: ['Тональный флюид', 'Консилер', 'Тушь', 'Подводка'],
    symptoms: ['Аллергический контактный дерматит', 'Жжение', 'Покраснение вокруг глаз'],
    description: 'Мощный консервант, признанный аллергеном года ACDS в 2013. В Европе запрещён в несмываемых продуктах, но разрешён в смываемых. Один из самых часто вызывающих сенсибилизацию консервантов.',
    tips: 'Особенно опасен при использовании рядом с глазами. Проверяйте состав туши и подводки.',
    isEuRestricted: true,
  },
  {
    id: 'a3',
    inci: 'METHYLCHLOROISOTHIAZOLINONE',
    name: 'Метилхлоризотиазолинон (MCI)',
    category: 'Консерванты',
    prevalence: 'high',
    products: ['Тональный крем', 'BB-крем', 'Праймер'],
    symptoms: ['Химический ожог', 'Острый дерматит', 'Буллёзная реакция'],
    description: 'Часто используется в паре с MIT. Более агрессивный, чем MIT в одиночку. Европейский союз ограничил его концентрацию до 0.0015%.',
    tips: 'Ищите на этикетке сочетание MCI/MI — вместе они значительно опаснее.',
    isEuRestricted: true,
  },
  {
    id: 'a4',
    inci: 'CARMINE / CI 75470',
    name: 'Кармин (CI 75470)',
    category: 'Пигменты животного происхождения',
    prevalence: 'low',
    products: ['Помада', 'Румяна', 'Блеск для губ', 'Тени'],
    symptoms: ['Анафилаксия', 'Крапивница', 'Отёк Квинке', 'Контактный дерматит'],
    description: 'Натуральный красный пигмент из кошенильных насекомых. Редко вызывает аллергию, но реакции могут быть тяжёлыми, вплоть до анафилактического шока. Также не подходит веганам.',
    tips: 'Если есть аллергия на аспирин — риск реакции на кармин выше.',
  },
  {
    id: 'a5',
    inci: 'PROPYLENE GLYCOL',
    name: 'Пропиленгликоль',
    category: 'Растворители / Увлажнители',
    prevalence: 'medium',
    products: ['Тональный крем', 'Консилер', 'Праймер', 'Тени'],
    symptoms: ['Контактный дерматит', 'Раздражение', 'Крапивница'],
    description: 'Широко используемый растворитель и увлажнитель. При высоких концентрациях или повреждённом кожном барьере может вызывать аллергические реакции. Чаще раздражает, чем вызывает истинную аллергию.',
    tips: 'Если чувствительная кожа — ищите продукты с пометкой «без пропиленгликоля».',
  },
  {
    id: 'a6',
    inci: 'LANOLIN / LANOLIN ALCOHOL',
    name: 'Ланолин / Ланолиновый спирт',
    category: 'Эмоленты животного происхождения',
    prevalence: 'medium',
    products: ['Помада', 'Блеск для губ', 'Тональный крем', 'Консилер'],
    symptoms: ['Контактный дерматит', 'Покраснение', 'Зуд', 'Шелушение'],
    description: 'Животный воск из шерсти овец. Один из классических контактных аллергенов. Аллергия на ланолин встречается у ~1.7% пациентов с контактным дерматитом.',
    tips: 'Особенно внимательно проверяйте состав помад — там ланолин особенно распространён.',
  },
  {
    id: 'a7',
    inci: 'CINNAMAL / CINNAMYL ALCOHOL',
    name: 'Коричный альдегид / Коричный спирт',
    category: 'Ароматические компоненты',
    prevalence: 'medium',
    products: ['Ароматизированная косметика', 'Помада'],
    symptoms: ['Покраснение', 'Отёк губ', 'Жжение', 'Зуд'],
    description: 'Входит в список 26 официально признанных ЕС ароматических аллергенов, которые обязательны к декларированию на упаковке. Часто скрывается под общим «Parfum».',
    tips: 'В ЕС обязателен к декларированию на упаковке, если концентрация превышает 0.001% в несмываемых продуктах.',
    isEuRestricted: true,
  },
  {
    id: 'a8',
    inci: 'EUGENOL',
    name: 'Эвгенол',
    category: 'Ароматические компоненты',
    prevalence: 'medium',
    products: ['Ароматизированные помады', 'Декоративная косметика с ароматом'],
    symptoms: ['Покраснение', 'Жжение', 'Контактный дерматит'],
    description: 'Натуральный ароматический компонент гвоздичного масла. Признанный аллерген ЕС из списка 26. Также используется стоматологами — если есть аллергия у стоматолога, вероятна и в косметике.',
    tips: 'Входит в обязательный список раскрываемых аллергенов по директиве ЕС.',
    isEuRestricted: true,
  },
  {
    id: 'a9',
    inci: 'BENZOPHENONE-3 / OXYBENZONE',
    name: 'Оксибензон (Benzophenone-3)',
    category: 'УФ-фильтры',
    prevalence: 'medium',
    products: ['Тональный крем с SPF', 'BB-крем', 'Праймер с SPF'],
    symptoms: ['Фотоаллергический дерматит', 'Контактный дерматит', 'Фотосенсибилизация'],
    description: 'Химический УФ-фильтр, один из наиболее частых причин фотоаллергии. Реакция проявляется при воздействии солнца на кожу с нанесённым продуктом. Также проникает в кровоток через кожу.',
    tips: 'При реакции на «SPF» в макияже — проверяйте именно оксибензон. Альтернатива: минеральные фильтры TiO₂ и ZnO.',
    isCmr: true,
  },
  {
    id: 'a10',
    inci: 'FORMALDEHYDE / FORMALDEHYDE RELEASERS',
    name: 'Формальдегид и доноры формальдегида',
    category: 'Консерванты',
    prevalence: 'medium',
    products: ['Тушь', 'Подводка', 'Тональный крем'],
    symptoms: ['Аллергический контактный дерматит', 'Экзема', 'Ринит', 'Кашель'],
    description: 'Формальдегид — признанный канцероген. Многие косметические консерванты (DMDM гидантоин, имидазолидинилмочевина, диазолидинилмочевина) постепенно выделяют формальдегид.',
    tips: 'Доноры формальдегида: DMDM Hydantoin, Imidazolidinyl Urea, Diazolidinyl Urea, Quaternium-15 — избегайте их.',
    isCmr: true,
    isEuRestricted: true,
  },
  {
    id: 'a11',
    inci: 'NICKEL (MICA contamination)',
    name: 'Никель (загрязнение в пигментах)',
    category: 'Металлические примеси',
    prevalence: 'low',
    products: ['Тени для век', 'Хайлайтер', 'Бронзер'],
    symptoms: ['Аллергический контактный дерматит', 'Экзема вокруг глаз', 'Зуд'],
    description: 'Никель может содержаться как примесь в минеральных пигментах (слюда, оксиды железа). Аллергия на никель — самая распространённая контактная аллергия: ~17% женщин. Декоративная косметика — частый источник воздействия.',
    tips: 'Если есть аллергия на бижутерию — будьте внимательны с тенями и хайлайтером.',
  },
  {
    id: 'a12',
    inci: 'COLOPHONIUM / ROSIN',
    name: 'Колофоний (Канифоль)',
    category: 'Растительные смолы',
    prevalence: 'low',
    products: ['Тушь', 'Карандаш для глаз', 'Помада'],
    symptoms: ['Аллергический контактный дерматит', 'Экзема век', 'Отёк'],
    description: 'Натуральная смола из хвойных деревьев. Используется для создания плёнкообразующих свойств в туши и карандашах. Распространённый контактный аллерген — особенно для чувствительных глаз.',
    tips: 'Если тушь вызывает экзему век — колофоний один из первых подозреваемых.',
  },
];

const PREVALENCE_CONFIG = {
  high:   { label: 'Высокая',  color: '#a05050', bg: 'rgba(212,140,140,0.12)', border: 'rgba(212,140,140,0.28)' },
  medium: { label: 'Средняя', color: '#8a6e38', bg: 'rgba(196,169,122,0.12)', border: 'rgba(196,169,122,0.28)' },
  low:    { label: 'Низкая',   color: '#4e7a69', bg: 'rgba(122,158,142,0.12)', border: 'rgba(122,158,142,0.28)' },
};

const CATEGORIES = ['Все', ...Array.from(new Set(ALLERGENS.map(a => a.category)))];

export default function AllergyPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Все');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ALLERGENS.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.inci.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    const matchCat = catFilter === 'Все' || a.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-px h-5 bg-[var(--blush)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">ALLERGY GUIDE</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Аллергены в косметике</h1>
          <p className="text-muted-foreground text-sm">Ингредиенты, которые чаще всего вызывают аллергические реакции — с симптомами, рисками и советами</p>
        </div>

        {/* Сводная статистика */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { count: ALLERGENS.filter(a => a.prevalence === 'high').length,   label: 'Высокий риск',   color: '#a05050', bg: 'rgba(212,140,140,0.10)' },
            { count: ALLERGENS.filter(a => a.prevalence === 'medium').length, label: 'Средний риск',   color: '#8a6e38', bg: 'rgba(196,169,122,0.10)' },
            { count: ALLERGENS.filter(a => a.isEuRestricted).length,          label: 'Ограничены в ЕС', color: '#6a5e8a', bg: 'rgba(168,155,191,0.10)' },
          ].map((s, i) => (
            <div key={i} className="lab-card p-4 text-center" style={{ background: s.bg }}>
              <div className="font-mono text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.count}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по названию или INCI..."
              className="w-full bg-white border border-[hsl(var(--border))] rounded-lg pl-9 pr-4 py-2.5 text-sm font-mono placeholder:text-muted-foreground outline-none focus:border-[var(--sage)] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all ${catFilter === c ? 'pill-active' : 'pill-inactive'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="font-mono text-[11px] text-muted-foreground mb-4">
          найдено: {filtered.length} аллергенов
        </div>

        {/* Легенда */}
        <div className="lab-card p-4 mb-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Icon name="AlertCircle" size={13} className="text-[#a05050]" />
            <span className="text-xs text-muted-foreground">Частый аллерген</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="ShieldAlert" size={13} className="text-[#6a5e8a]" />
            <span className="text-xs text-muted-foreground">Ограничен в ЕС</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Skull" size={13} className="text-[#a05050]" />
            <span className="text-xs text-muted-foreground">CMR (канцероген / мутаген)</span>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((a, i) => {
            const prev = PREVALENCE_CONFIG[a.prevalence];
            const isOpen = expanded === a.id;
            return (
              <div
                key={a.id}
                className="lab-card p-5 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => setExpanded(isOpen ? null : a.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground">{a.inci}</span>
                      {a.isEuRestricted && (
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(168,155,191,0.12)', color: '#6a5e8a', border: '1px solid rgba(168,155,191,0.28)' }}>
                          EU ограничен
                        </span>
                      )}
                      {a.isCmr && (
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(212,140,140,0.12)', color: '#a05050', border: '1px solid rgba(212,140,140,0.28)' }}>
                          CMR
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-sm mb-1">{a.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{a.category}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ background: prev.bg, color: prev.color, border: `1px solid ${prev.border}` }}>
                      {prev.label} распр.
                    </span>
                    <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-muted-foreground" />
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-[hsl(var(--border))] animate-fade-in space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="lab-card p-3" style={{ background: 'rgba(212,140,140,0.06)' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Icon name="Activity" size={12} className="text-[#a05050]" />
                          <span className="font-mono text-[10px] text-[#a05050]">СИМПТОМЫ</span>
                        </div>
                        <div className="space-y-1">
                          {a.symptoms.map((s, si) => (
                            <div key={si} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <div className="w-1 h-1 rounded-full bg-[#d48c8c] mt-1.5 shrink-0" />
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lab-card p-3" style={{ background: 'rgba(122,158,142,0.06)' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Icon name="Package" size={12} className="text-[var(--sage)]" />
                          <span className="font-mono text-[10px] text-[var(--sage)]">ГДЕ ВСТРЕЧАЕТСЯ</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {a.products.map((p, pi) => (
                            <span key={pi} className="text-[10px] px-2 py-0.5 rounded bg-[var(--sage-light)] text-[#4e7a69] border border-[var(--sage-border)]">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--dust-amber-light)] border border-[rgba(196,169,122,0.25)]">
                      <Icon name="Lightbulb" size={13} className="text-[var(--dust-amber)] mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">{a.tips}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="lab-card p-12 text-center">
            <Icon name="SearchX" size={28} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Ничего не найдено</p>
          </div>
        )}

        <div className="mt-8 lab-card p-5 border-[var(--blush-border)]" style={{ background: 'rgba(212,165,165,0.05)' }}>
          <div className="flex items-start gap-3">
            <Icon name="HeartPulse" size={16} className="text-[var(--blush)] mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-sm mb-1">Важно знать</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Если вы подозреваете аллергию на косметику — обратитесь к дерматологу или аллергологу для проведения патч-тестирования. Самодиагностика и самолечение могут привести к хронизации процесса.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
