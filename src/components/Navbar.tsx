import { useState } from 'react';
import { Menu, X, Search, Bookmark, Sun, Moon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#paises', label: 'Países' },
  { href: '#mitologias', label: 'Mitologías' },
  { href: '#dioses', label: 'Dioses' },
  { href: '#criaturas', label: 'Criaturas' },
  { href: '#leyendas', label: 'Leyendas' },
  { href: '#lugares', label: 'Lugares misteriosos' },
  { href: '#historias', label: 'Historias' },
  { href: '#contacto', label: 'Contacto' },
];

export function Navbar({
  onOpenSearch,
  onOpenFavorites,
  favoritesCount,
  isDark,
  onToggleTheme,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-stone-300/60 bg-[#F7F4EE]/90 backdrop-blur-md dark:border-[#C9A45C]/15 dark:bg-[#08090D]/88">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Zone */}
        <a
          href="#inicio"
          className="font-display text-sm font-semibold tracking-wider text-stone-900 whitespace-nowrap shrink-0 hover:text-[#9A7735] dark:text-white dark:hover:text-[#C9A45C] transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A45C]"
        >
          MISTERIOS DEL MUNDO
        </a>

        {/* Desktop Nav Zone */}
        <nav
          aria-label="Navegación principal"
          className="hidden xl:flex items-center gap-5 text-[13px] font-medium text-stone-700 dark:text-[#B8B4C2]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-stone-950 dark:hover:text-white after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:origin-left after:scale-x-0 after:bg-[#C9A45C] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-[#C9A45C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro de archivo' : 'Cambiar a modo oscuro'}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-300/70 text-stone-700 transition-colors hover:border-[#C9A45C]/60 hover:text-stone-950 dark:border-[#C9A45C]/25 dark:text-[#B8B4C2] dark:hover:text-white"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenFavorites}
            aria-label={`Abrir guardados (${favoritesCount})`}
            className="relative flex h-9 items-center gap-1.5 rounded-md border border-stone-300/70 px-2.5 text-xs font-medium text-stone-700 transition-colors hover:border-[#C9A45C]/60 hover:text-stone-950 dark:border-[#C9A45C]/25 dark:text-[#B8B4C2] dark:hover:text-white whitespace-nowrap shrink-0"
          >
            <Bookmark className="h-3.5 w-3.5 text-[#C9A45C]" />
            <span className="hidden sm:inline tabular-nums">{favoritesCount}</span>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            className="flex h-9 items-center gap-2 rounded-md bg-[#C9A45C] px-3.5 text-xs font-semibold text-[#08090D] transition-colors hover:bg-[#D8B671] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Buscar</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-300/70 text-stone-800 xl:hidden dark:border-[#C9A45C]/25 dark:text-white"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            aria-label="Menú móvil"
            className="border-t border-stone-300/60 bg-[#F7F4EE] px-4 py-4 xl:hidden dark:border-[#C9A45C]/20 dark:bg-[#0C0D14]"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-200/70 dark:text-[#B8B4C2] dark:hover:bg-[#24143B]/60 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
