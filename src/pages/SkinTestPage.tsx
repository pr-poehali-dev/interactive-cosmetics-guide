import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; scores: Partial<Record<SkinType, number>> }[];
}

type SkinType = 'normal' | 'oily' | 'dry' | 'combination' | 'sensitive';

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Как ваша кожа выглядит через 2–3 часа после умывания без нанесения средств?',
    options: [
      { value: 'a', label: 'Комфортно, не блестит и не стягивает', scores: { normal: 3 } },
      { value: 'b', label: 'Блестит по всему лицу', scores: { oily: 3 } },
      { value: 'c', label: 'Стягивает, появляются шелушения', scores: { dry: 3 } },
      { value: 'd', label: 'Блеск только в T-зоне (лоб, нос, подбородок)', scores: { combination: 3 } },
      { value: 'e', label: 'Покраснение, ощущение жжения или зуда', scores: { sensitive: 3 } },
    ],
  },
  {
    id: 'q2',
    text: 'Насколько часто вы замечаете расширенные поры?',
    options: [
      { value: 'a', label: 'Практически незаметны', scores: { normal: 2, dry: 1 } },
      { value: 'b', label: 'Очень заметны по всему лицу', scores: { oily: 3 } },
      { value: 'c', label: 'Поры минимальны, кожа «персиковая»', scores: { dry: 2 } },
      { value: 'd', label: 'Заметны только на носу и лбу', scores: { combination: 3 } },
      { value: 'e', label: 'Поры мелкие, но кожа часто раздражена', scores: { sensitive: 2 } },
    ],
  },
  {
    id: 'q3',
    text: 'Как ваша кожа реагирует на новую косметику или средство по уходу?',
    options: [
      { value: 'a', label: 'Как правило, хорошо', scores: { normal: 2 } },
      { value: 'b', label: 'Иногда появляются прыщи', scores: { oily: 2 } },
      { value: 'c', label: 'Бывает стянутость или шелушение', scores: { dry: 2 } },
      { value: 'd', label: 'По-разному в разных зонах', scores: { combination: 2 } },
      { value: 'e', label: 'Часто покраснение, жжение, зуд', scores: { sensitive: 3 } },
    ],
  },
  {
    id: 'q4',
    text: 'Страдаете ли вы от угрей или жирного блеска?',
    options: [
      { value: 'a', label: 'Нет, кожа чистая', scores: { normal: 2, dry: 1 } },
      { value: 'b', label: 'Да, регулярно — угри и комедоны', scores: { oily: 3 } },
      { value: 'c', label: 'Почти никогда', scores: { dry: 2 } },
      { value: 'd', label: 'Только в T-зоне', scores: { combination: 3 } },
      { value: 'e', label: 'Иногда, вместе с покраснениями', scores: { sensitive: 1, oily: 1 } },
    ],
  },
  {
    id: 'q5',
    text: 'Как кожа ведёт себя в разные сезоны?',
    options: [
      { value: 'a', label: 'Практически не меняется', scores: { normal: 3 } },
      { value: 'b', label: 'Летом жирнее, зимой чуть лучше', scores: { oily: 2 } },
      { value: 'c', label: 'Зимой сильно сохнет и шелушится', scores: { dry: 3 } },
      { value: 'd', label: 'Летом T-зона жирнее, щёки нормальные', scores: { combination: 2 } },
      { value: 'e', label: 'Реагирует на холод, ветер, отопление', scores: { sensitive: 3 } },
    ],
  },
  {
    id: 'q6',
    text: 'Как долго держится тональный крем без подправок?',
    options: [
      { value: 'a', label: '6–8 часов без проблем', scores: { normal: 2 } },
      { value: 'b', label: 'Плывёт через 2–3 часа из-за жирности', scores: { oily: 3 } },
      { value: 'c', label: 'Сохнет и подчёркивает шелушения', scores: { dry: 3 } },
      { value: 'd', label: 'Плывёт в T-зоне, нормальный на щёках', scores: { combination: 3 } },
      { value: 'e', label: 'Вызывает ощущение дискомфорта', scores: { sensitive: 2 } },
    ],
  },
];

const SKIN_TYPES: Record<SkinType, {
  label: string; emoji: string; color: string; bg: string;
  description: string;
  traits: string[];
  avoid: string[];
  recommend: string[];
  cosmetics: string[];
}> = {
  normal: {
    label: 'Нормальная кожа', emoji: '✨', color: '#4e7a69', bg: 'rgba(122,158,142,0.10)',
    description: 'Нормальная кожа — наиболее сбалансированный тип. Хорошее кровообращение, мелкие поры, равномерный тон и упругость. Редко реагирует на внешние факторы.',
    traits: ['Мелкие малозаметные поры', 'Нет жирного блеска', 'Нет ощущения стянутости', 'Ровный тон без покраснений', 'Хорошая упругость'],
    avoid: ['Агрессивные спирты', 'Слишком тяжёлые масла', 'Пересушивающие составы'],
    recommend: ['Лёгкие гидрогели', 'Солнцезащитные средства', 'Антиоксиданты (Vit C, E)'],
    cosmetics: ['Лёгкий флюид или BB-крем', 'Минеральная пудра', 'Любые румяна', 'Любые тени'],
  },
  oily: {
    label: 'Жирная кожа', emoji: '💧', color: '#8a6e38', bg: 'rgba(196,169,122,0.10)',
    description: 'Жирная кожа производит избыток себума. Поры расширены, склонность к акне и комедонам. Плюс — стареет медленнее, реже появляются морщины.',
    traits: ['Расширенные поры', 'Жирный блеск через 1–2 часа', 'Склонность к акне', 'Плотная текстура кожи', 'Макияж сползает быстро'],
    avoid: ['Тяжёлые масла и баттеры', 'Комедогенные ингредиенты', 'Очень плотные тональные средства', 'Спиртовые тоники в больших кол-вах'],
    recommend: ['Ниацинамид (контроль себума)', 'Салициловая кислота', 'Глина в масках', 'Лёгкие гели'],
    cosmetics: ['Матовый флюид с контролем жирности', 'Праймер с матирующим эффектом', 'Прозрачная рассыпчатая пудра', 'Стойкая тушь и подводка'],
  },
  dry: {
    label: 'Сухая кожа', emoji: '🌸', color: '#9a6b6b', bg: 'rgba(212,165,165,0.10)',
    description: 'Сухая кожа производит мало себума. Ощущение стянутости, шелушения, чувствительность к температурным перепадам. Нуждается в интенсивном питании.',
    traits: ['Ощущение стянутости', 'Шелушения и микротрещины', 'Тусклый цвет лица', 'Мелкие поры', 'Ранние мелкие морщины'],
    avoid: ['Мыло и ПАВы (SLS)', 'Спирт', 'Ретинол без адаптации', 'Матирующие средства', 'Пудры в большом количестве'],
    recommend: ['Гиалуроновая кислота', 'Церамиды', 'Масла (ши, аргана)', 'Глицерин', 'Peptides'],
    cosmetics: ['Тональный крем с увлажнением', 'Кремовые румяна и тени', 'Увлажняющий консилер', 'Финишный спрей'],
  },
  combination: {
    label: 'Комбинированная', emoji: '⚖️', color: '#6a5e8a', bg: 'rgba(168,155,191,0.10)',
    description: 'Комбинированная кожа сочетает жирную T-зону (лоб, нос, подбородок) с нормальными или сухими щеками. Самый распространённый тип — около 60% женщин.',
    traits: ['Жирный блеск в T-зоне', 'Нормальные или сухие щёки', 'Поры заметны на носу', 'Склонность к акне в T-зоне', 'Разные потребности зон'],
    avoid: ['Очень жирные кремы на T-зону', 'Слишком высушивающие средства на щёки', 'Унификация ухода для всего лица'],
    recommend: ['Многозадачные лёгкие текстуры', 'Точечные средства на T-зону', 'Зональный уход'],
    cosmetics: ['Матовый флюид или сатин', 'Праймер только на T-зону', 'Рассыпчатая пудра точечно', 'Стойкая формула'],
  },
  sensitive: {
    label: 'Чувствительная', emoji: '🌿', color: '#6d8a7a', bg: 'rgba(122,158,142,0.08)',
    description: 'Чувствительная кожа имеет ослабленный защитный барьер. Реагирует на внешние раздражители, отдушки, агрессивные ингредиенты. Требует минималистичных составов.',
    traits: ['Покраснения и жжение', 'Реакции на косметику', 'Тонкий роговой слой', 'Видимые сосуды', 'Дискомфорт на холоде и ветру'],
    avoid: ['Отдушки и парфюм', 'Спирт', 'Кислоты в высоких концентрациях', 'Агрессивные консерванты (MIT, MCI)', 'Продукты с длинным составом'],
    recommend: ['Минимальный состав', 'Физические УФ-фильтры (ZnO, TiO₂)', 'Ниацинамид', 'Центелла', 'Пантенол'],
    cosmetics: ['Минеральная косметика', 'Тон без отдушек и парабенов', 'Гипоаллергенная тушь', 'Физические санскрины'],
  },
};

export default function SkinTestPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SkinType | null>(null);
  const [step, setStep] = useState(0);

  const handleAnswer = (qid: string, value: string) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 300);
    }
  };

  const handleFinish = () => {
    const totals: Record<SkinType, number> = { normal: 0, oily: 0, dry: 0, combination: 0, sensitive: 0 };
    QUESTIONS.forEach(q => {
      const answer = answers[q.id];
      if (!answer) return;
      const opt = q.options.find(o => o.value === answer);
      if (!opt) return;
      (Object.entries(opt.scores) as [SkinType, number][]).forEach(([type, score]) => {
        totals[type] += score;
      });
    });
    const best = (Object.entries(totals) as [SkinType, number][]).sort((a, b) => b[1] - a[1])[0][0];
    setResult(best);
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setStep(0);
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  const progress = (step / (QUESTIONS.length - 1)) * 100;

  if (result) {
    const skin = SKIN_TYPES[result];
    return (
      <div className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{skin.emoji}</div>
            <div className="font-mono text-xs tracking-widest text-muted-foreground mb-2">ВАШ ТИП КОЖИ</div>
            <h1 className="text-3xl font-black mb-2" style={{ color: skin.color }}>{skin.label}</h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">{skin.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="lab-card p-5" style={{ background: skin.bg }}>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="CheckCircle" size={14} style={{ color: skin.color }} />
                <span className="font-mono text-xs tracking-widest" style={{ color: skin.color }}>ПРИЗНАКИ</span>
              </div>
              <div className="space-y-1.5">
                {skin.traits.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: skin.color }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="lab-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="ShieldOff" size={14} className="text-[#a05050]" />
                <span className="font-mono text-xs tracking-widest text-[#a05050]">ИЗБЕГАЙТЕ</span>
              </div>
              <div className="space-y-1.5">
                {skin.avoid.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-[#d48c8c]" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="lab-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Sparkles" size={14} className="text-[var(--lavender)]" />
                <span className="font-mono text-xs tracking-widest text-[var(--lavender)]">РЕКОМЕНДУЕМЫЕ ИНГРЕДИЕНТЫ</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skin.recommend.map((r, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg lab-tag-info">{r}</span>
                ))}
              </div>
            </div>

            <div className="lab-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Palette" size={14} className="text-[var(--blush)]" />
                <span className="font-mono text-xs tracking-widest text-[var(--blush)]">ДЕКОРАТИВНАЯ КОСМЕТИКА</span>
              </div>
              <div className="space-y-1.5">
                {skin.cosmetics.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0 bg-[var(--blush)]" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lab-card p-5 mb-6" style={{ background: 'rgba(196,169,122,0.07)' }}>
            <div className="flex items-start gap-3">
              <Icon name="Info" size={15} className="text-[var(--dust-amber)] mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Тест носит ознакомительный характер. Тип кожи может меняться с возрастом, в зависимости от гормонального фона, климата и сезона. Для точного определения — обратитесь к дерматологу.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--sage-border)] text-[var(--sage)] hover:bg-[var(--sage-light)] transition-all text-sm font-semibold"
            >
              <Icon name="RotateCcw" size={14} />
              Пройти тест заново
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[step];

  return (
    <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-px h-5 bg-[var(--lavender)]" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">SKIN TYPE TEST</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Определи тип кожи</h1>
          <p className="text-muted-foreground text-sm">6 вопросов — точный результат с рекомендациями по косметике</p>
        </div>

        {/* Прогресс */}
        <div className="lab-card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-muted-foreground">Вопрос {step + 1} из {QUESTIONS.length}</span>
            <span className="font-mono text-xs text-[var(--lavender)]">{answeredCount} отвечено</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[hsl(var(--muted))] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'var(--lavender)' }}
            />
          </div>
          <div className="flex gap-1.5 mt-3">
            {QUESTIONS.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setStep(i)}
                className="h-1.5 flex-1 rounded-full transition-all"
                style={{
                  background: answers[q.id]
                    ? 'var(--lavender)'
                    : i === step
                    ? 'rgba(168,155,191,0.4)'
                    : 'hsl(var(--border))',
                }}
              />
            ))}
          </div>
        </div>

        {/* Текущий вопрос */}
        <div className="lab-card p-6 mb-4 animate-fade-in" key={currentQ.id}>
          <h2 className="text-lg font-semibold mb-5 leading-snug">{currentQ.text}</h2>
          <div className="space-y-2.5">
            {currentQ.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(currentQ.id, opt.value)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  answers[currentQ.id] === opt.value
                    ? 'border-[var(--lavender)] bg-[var(--lavender-light)] text-foreground'
                    : 'border-[hsl(var(--border))] bg-white hover:border-[rgba(168,155,191,0.5)] hover:bg-[rgba(168,155,191,0.05)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    answers[currentQ.id] === opt.value ? 'border-[var(--lavender)]' : 'border-[hsl(var(--border))]'
                  }`}>
                    {answers[currentQ.id] === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-[var(--lavender)]" />
                    )}
                  </div>
                  {opt.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Навигация */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[hsl(var(--border))] text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <Icon name="ChevronLeft" size={14} />
            Назад
          </button>

          {step < QUESTIONS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!answers[currentQ.id]}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              style={{ background: 'var(--lavender-light)', color: '#6a5e8a', border: '1px solid var(--lavender)' }}
            >
              Следующий
              <Icon name="ChevronRight" size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!allAnswered}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
              style={{ background: allAnswered ? 'var(--lavender)' : undefined }}
            >
              <Icon name="Sparkles" size={14} />
              Узнать тип кожи
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
