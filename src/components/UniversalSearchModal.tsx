import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { ALL_COUNTRIES } from '../data/countriesData';
import { CREATURES_DATA } from '../data/creaturesData';
import { DEITIES_DATA } from '../data/deitiesData';
import { MYTHOLOGIES_DATA } from '../data/mythologiesData';
import { LEGENDS_DATA } from '../data/legendsData';
import { PLACES_DATA } from '../data/placesData';
import { STORIES_DATA } from '../data/storiesData';
import { PARAGUAY_FOLKLORE_DATA } from '../data/paraguayData';
import { CountryEntry, CreatureEntry } from '../types/encyclopedia';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (c: CountryEntry) => void;
  onSelectCreature: (c: CreatureEntry) => void;
}

type SearchCategory =
  | 'Todas'
  | 'Países'
  | 'Dioses'
  | 'Criaturas'
  | 'Mitologías'
  | 'Leyendas'
  | 'Lugares'
  | 'Paraguay'
  | 'Historias';

interface SearchResultItem {
  id: string;
  category: Exclude<SearchCategory, 'Todas'>;
  title: string;
  subtitle: string;
  continent: string;
  classification: string;
  searchText: string;
  href?: string;
  countryObj?: CountryEntry;
  creatureObj?: CreatureEntry;
}

export function UniversalSearchModal({
  isOpen,
  onClose,
  onSelectCountry,
  onSelectCreature,
}: UniversalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('Todas');
  const [continentFilter, setContinentFilter] = useState<string>('Todos');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    ALL_COUNTRIES.forEach((c) =>
      items.push({
        id: `country-${c.id}`,
        category: 'Países',
        title: `${c.flag} ${c.name}`,
        subtitle: `${c.continent} · ${c.mythologies.join(', ')}`,
        continent: c.continent,
        classification: c.rigor,
        searchText: `${c.name} ${c.continent} ${c.mythologies.join(' ')} ${c.creatures.join(' ')} ${c.legends.join(' ')} ${c.deitiesAndFigures.join(' ')}`.toLowerCase(),
        countryObj: c,
      })
    );

    DEITIES_DATA.forEach((d) =>
      items.push({
        id: `deity-${d.id}`,
        category: 'Dioses',
        title: d.name,
        subtitle: `${d.pantheon} · ${d.culture}`,
        continent: d.continent,
        classification: d.classification,
        searchText: `${d.name} ${d.pantheon} ${d.culture} ${d.domain} ${d.myths}`.toLowerCase(),
        href: '#dioses',
      })
    );

    CREATURES_DATA.forEach((cr) =>
      items.push({
        id: `creature-${cr.id}`,
        category: 'Criaturas',
        title: cr.name,
        subtitle: `${cr.origin} · ${cr.tradition}`,
        continent: cr.continent,
        classification: cr.classification,
        searchText: `${cr.name} ${cr.origin} ${cr.tradition} ${cr.description}`.toLowerCase(),
        creatureObj: cr,
      })
    );

    MYTHOLOGIES_DATA.forEach((m) =>
      items.push({
        id: `myth-${m.id}`,
        category: 'Mitologías',
        title: m.name,
        subtitle: `${m.continent} · ${m.era}`,
        continent: m.continent,
        classification: m.classification,
        searchText: `${m.name} ${m.region} ${m.summary} ${m.keyFigures.join(' ')}`.toLowerCase(),
        href: '#mitologias',
      })
    );

    LEGENDS_DATA.forEach((l) =>
      items.push({
        id: `legend-${l.id}`,
        category: 'Leyendas',
        title: l.title,
        subtitle: `${l.origin} · ${l.era}`,
        continent: l.continent,
        classification: l.classification,
        searchText: `${l.title} ${l.origin} ${l.summary}`.toLowerCase(),
        href: '#leyendas',
      })
    );

    PLACES_DATA.forEach((p) =>
      items.push({
        id: `place-${p.id}`,
        category: 'Lugares',
        title: p.name,
        subtitle: `${p.location} · ${p.placeType}`,
        continent: p.continent,
        classification: p.placeType,
        searchText: `${p.name} ${p.location} ${p.description} ${p.associatedMyths}`.toLowerCase(),
        href: '#lugares',
      })
    );

    PARAGUAY_FOLKLORE_DATA.forEach((py) =>
      items.push({
        id: `py-${py.id}`,
        category: 'Paraguay',
        title: py.name,
        subtitle: py.guaraniTerm ? `${py.guaraniTerm} · Paraguay` : 'Folclore paraguayo',
        continent: 'América del Sur',
        classification: py.classification,
        searchText: `${py.name} ${py.guaraniTerm || ''} ${py.characteristics} ${py.traditionalNarrative}`.toLowerCase(),
        href: '#paraguay',
      })
    );

    STORIES_DATA.forEach((st) =>
      items.push({
        id: `story-${st.id}`,
        category: 'Historias',
        title: st.title,
        subtitle: `${st.tradition} · ${st.readingTimeMinutes} min de lectura`,
        continent: 'Global',
        classification: st.classification,
        searchText: `${st.title} ${st.subtitle} ${st.tradition} ${st.category}`.toLowerCase(),
        href: '#historias',
      })
    );

    return items;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems
      .filter((item) => {
        if (category !== 'Todas' && item.category !== category) return false;
        if (continentFilter !== 'Todos') {
          if (continentFilter === 'América') {
            if (!item.continent.includes('América')) return false;
          } else if (item.continent !== continentFilter) {
            return false;
          }
        }
        if (q && !item.searchText.includes(q) && !item.title.toLowerCase().includes(q)) {
          return false;
        }
        return true;
      })
      .slice(0, 40);
  }, [allItems, query, category, continentFilter]);

  const categories: SearchCategory[] = [
    'Todas',
    'Países',
    'Dioses',
    'Criaturas',
    'Mitologías',
    'Leyendas',
    'Lugares',
    'Paraguay',
    'Historias',
  ];

  const handleSelectItem = (item: SearchResultItem) => {
    if (item.countryObj) {
      onClose();
      onSelectCountry(item.countryObj);
    } else if (item.creatureObj) {
      onClose();
      onSelectCreature(item.creatureObj);
    } else if (item.href) {
      onClose();
      const el = document.querySelector(item.href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-3 pt-14 pb-6 backdrop-blur-sm sm:px-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Buscador universal de Misterios del Mundo"
        >
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[82vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-stone-300 bg-[#F7F4EE] text-stone-900 shadow-2xl dark:border-[#C9A45C]/30 dark:bg-[#0D0E15] dark:text-white"
          >
            {/* Input Row */}
            <div className="flex items-center gap-3 border-b border-stone-300/70 px-5 py-4 dark:border-[#C9A45C]/20">
              <Search className="h-5 w-5 text-[#C9A45C] shrink-0" aria-hidden="true" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar países, dioses, criaturas, mitologías, leyendas, lugares o términos guaraníes..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400 sm:text-base dark:placeholder:text-[#B8B4C2]/60"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar buscador"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-300 text-stone-600 hover:border-[#C9A45C] dark:border-white/15 dark:text-[#B8B4C2]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300/60 bg-stone-200/40 px-5 py-3 dark:border-[#C9A45C]/15 dark:bg-[#131520]">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      category === cat
                        ? 'bg-[#C9A45C] text-[#08090D]'
                        : 'text-stone-600 hover:bg-stone-300/50 dark:text-[#B8B4C2] dark:hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <select
                aria-label="Filtrar por continente"
                value={continentFilter}
                onChange={(e) => setContinentFilter(e.target.value)}
                className="rounded-md border border-stone-300 bg-[#F7F4EE] px-2.5 py-1 text-xs text-stone-800 dark:border-[#C9A45C]/25 dark:bg-[#0D0E15] dark:text-[#B8B4C2]"
              >
                <option value="Todos">Todos los continentes</option>
                <option value="América del Sur">América del Sur</option>
                <option value="América del Norte">América del Norte</option>
                <option value="Europa">Europa</option>
                <option value="Asia">Asia</option>
                <option value="África">África</option>
                <option value="Oceanía">Oceanía</option>
              </select>
            </div>

            {/* Results */}
            <div className="overflow-y-auto p-3 sm:p-5">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-stone-500 dark:text-[#B8B4C2]">
                  No se encontraron registros para «{query}» con los filtros seleccionados.
                </div>
              ) : (
                <ul className="divide-y divide-stone-300/50 dark:divide-[#C9A45C]/10">
                  {filtered.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectItem(item)}
                        className="flex w-full items-center justify-between gap-4 rounded-md px-3 py-3 text-left transition-colors hover:bg-stone-200/60 dark:hover:bg-[#24143B]/45"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#9A7735] dark:text-[#C9A45C]">
                            <span className="font-medium">{item.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-stone-500 dark:text-[#B8B4C2]/75">
                              {item.classification}
                            </span>
                          </div>
                          <div className="mt-0.5 truncate font-display text-sm font-semibold sm:text-base">
                            {item.title}
                          </div>
                          <div className="truncate text-xs text-stone-600 dark:text-[#B8B4C2]">
                            {item.subtitle}
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#C9A45C]" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
