import Icon from '@/components/ui/icon';

interface NavbarProps {
  active: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'home',         label: 'Главная',    icon: 'FlaskConical' },
  { id: 'analyzer',    label: 'Анализатор', icon: 'Microscope'   },
  { id: 'products',    label: 'Продукты',   icon: 'Archive'      },
  { id: 'ingredients', label: 'Справочник', icon: 'BookOpen'     },
  { id: 'allergy',     label: 'Аллергены',  icon: 'AlertCircle'  },
  { id: 'skintest',    label: 'Тип кожи',   icon: 'Sparkles'     },
];

export default function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--border))] bg-[#f5f1ed]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg border border-[var(--sage-border)] flex items-center justify-center bg-[var(--sage-light)] group-hover:bg-[rgba(122,158,142,0.22)] transition-colors">
            <Icon name="FlaskConical" size={14} className="text-[var(--sage)]" />
          </div>
          <span className="font-mono text-xs tracking-[0.18em] text-[var(--sage)] uppercase font-semibold">
            BEAUTYLAB
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                active === item.id ? 'pill-active' : 'pill-inactive'
              }`}
            >
              <Icon name={item.icon} size={12} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-2 rounded-lg transition-all ${active === item.id ? 'text-[var(--sage)]' : 'text-muted-foreground'}`}
              title={item.label}
            >
              <Icon name={item.icon} size={16} />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--sage-light)] border border-[var(--sage-border)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--sage)] animate-pulse" />
            <span className="font-mono text-[10px] text-[var(--sage)] tracking-wider">v1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
