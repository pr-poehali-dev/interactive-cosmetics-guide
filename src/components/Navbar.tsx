import Icon from '@/components/ui/icon';

interface NavbarProps {
  active: string;
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Главная', icon: 'FlaskConical' },
  { id: 'analyzer', label: 'Анализатор', icon: 'Microscope' },
  { id: 'products', label: 'База продуктов', icon: 'Archive' },
  { id: 'ingredients', label: 'Справочник', icon: 'BookOpen' },
  { id: 'ratings', label: 'Рейтинги', icon: 'Star' },
];

export default function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--lab-green-border)] bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-7 h-7 rounded border border-[var(--lab-green-border)] flex items-center justify-center bg-[var(--lab-green-dim)] group-hover:bg-[rgba(74,222,128,0.25)] transition-colors">
            <Icon name="FlaskConical" size={14} className="text-lab-green" />
          </div>
          <span className="font-mono text-xs tracking-[0.2em] text-[var(--lab-green)] uppercase">
            BEAUTYLAB
          </span>
          <span className="font-mono text-xs text-muted-foreground tracking-widest hidden sm:block">
            / COSMETIC INTELLIGENCE
          </span>
        </button>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono tracking-wide transition-all
                ${active === item.id
                  ? 'bg-[var(--lab-green-dim)] text-[var(--lab-green)] border border-[var(--lab-green-border)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }
              `}
            >
              <Icon name={item.icon} size={12} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`p-2 rounded transition-all ${active === item.id ? 'text-[var(--lab-green)]' : 'text-muted-foreground'}`}
              title={item.label}
            >
              <Icon name={item.icon} size={16} />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--lab-green-border)] bg-[var(--lab-green-dim)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--lab-green)] animate-pulse" />
            <span className="font-mono text-[10px] text-[var(--lab-green)] tracking-wider">ONLINE</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">v1.0.0</span>
        </div>
      </div>
    </header>
  );
}
