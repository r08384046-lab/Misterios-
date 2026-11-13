import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight } from 'lucide-react';
import { CREATURES_DATA } from '../data/creaturesData';
import { CreatureEntry } from '../types/encyclopedia';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';

interface CreaturesSectionProps {
  onSelectCreature: (creature: CreatureEntry) => void;
}

const CATEGORIES = ['Todas', 'Dragones', 'Criaturas', 'Monstruos'] as const;

export function CreaturesSection({ onSelectCreature }: CreaturesSectionProps) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Todas');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CREATURES_DATA.filter((c) => {
      if (category !== 'Todas' && c.category !== category) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.origin.toLowerCase().includes(q) ||
        c.tradition.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  return (
    <section
      id="criaturas"
      className="border-t border-stone-300/60 py-20 sm:py-24 dark:border-[#C9A45C]/15"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
              03 · Bestiario Universal
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
            >
              Enciclopedia de Criaturas Legendarias
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
              32 seres sobrenaturales, guardianes mitológicos y bestias folclóricas de los cinco
              continentes, con su historia de origen, habilidades atribuidas y referencias
              bibliográficas.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#C9A45C]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar criatura o región..."
              aria-label="Filtrar criaturas legendarias"
              className="h-11 w-full rounded-md border border-stone-300 bg-white/80 pr-4 pl-10 text-sm text-stone-900 outline-none focus:border-[#C9A45C] dark:border-[#C9A45C]/25 dark:bg-[#11131C] dark:text-white dark:placeholder:text-[#B8B4C2]/60"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`h-9 rounded-md px-4 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-[#C9A45C] text-[#08090D]'
                  : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/10 dark:text-[#B8B4C2] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((creature) => (
            <motion.button
              key={creature.id}
              type="button"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              onClick={() => onSelectCreature(creature)}
              className="group flex flex-col overflow-hidden rounded-lg border border-stone-300/80 bg-white/80 text-left transition-colors hover:border-[#C9A45C] dark:border-white/10 dark:bg-[#10111A] dark:hover:border-[#C9A45C]/60"
            >
              <ArtFrame
                imageKey={creature.imageKey}
                alt={`${creature.name} — ${creature.tradition}`}
                aspectClass="aspect-[4/3]"
                fallbackTitle={creature.name}
              />

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <RigorLabel label={creature.classification} extra={creature.origin} />
                  <h3 className="mt-2 font-display text-lg font-semibold text-stone-900 group-hover:text-[#9A7735] dark:text-white dark:group-hover:text-[#C9A45C]">
                    {creature.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-600 dark:text-[#B8B4C2]">
                    {creature.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-stone-300/50 pt-3 text-xs font-medium text-[#9A7735] dark:border-white/10 dark:text-[#C9A45C]">
                  <span>Ver ficha completa</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
