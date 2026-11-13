import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Globe2, ArrowRight } from 'lucide-react';
import {
  ALL_COUNTRIES,
  CONTINENT_FILTERS,
  ANTARCTICA_LORE_NOTE,
} from '../data/countriesData';
import { CountryEntry } from '../types/encyclopedia';
import { RigorLabel } from '../components/RigorLabel';

interface CountriesSectionProps {
  onSelectCountry: (country: CountryEntry) => void;
}

const PAGE_SIZE = 24;

export function CountriesSection({ onSelectCountry }: CountriesSectionProps) {
  const [continent, setContinent] = useState<(typeof CONTINENT_FILTERS)[number]>('Todos');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredCountries = useMemo(() => {
    if (continent === 'Antártida') return [];
    const q = query.trim().toLowerCase();
    return ALL_COUNTRIES.filter((c) => {
      if (continent !== 'Todos' && c.continent !== continent) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.mythologies.some((m) => m.toLowerCase().includes(q)) ||
        c.creatures.some((cr) => cr.toLowerCase().includes(q)) ||
        c.legends.some((l) => l.toLowerCase().includes(q))
      );
    });
  }, [continent, query]);

  const visibleCountries = showAll
    ? filteredCountries
    : filteredCountries.slice(0, PAGE_SIZE);

  return (
    <section
      id="paises"
      className="border-t border-stone-300/60 py-20 sm:py-24 dark:border-[#C9A45C]/15"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
              01 · Atlas Internacional
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
            >
              Explorador de los 195 Países del Mundo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
              Consulta el patrimonio mítico, folclórico y legendario de los 195 Estados
              internacionalmente reconocidos distribuidos en los siete continentes. Pulsa cualquier
              país para abrir su ficha completa.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#C9A45C]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowAll(false);
              }}
              placeholder="Buscar país, mito o criatura..."
              aria-label="Buscar país"
              className="h-11 w-full rounded-md border border-stone-300 bg-white/80 pr-4 pl-10 text-sm text-stone-900 outline-none transition-colors focus:border-[#C9A45C] dark:border-[#C9A45C]/25 dark:bg-[#11131C] dark:text-white dark:placeholder:text-[#B8B4C2]/60"
            />
          </div>
        </div>

        {/* Continent Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-stone-300/60 pb-5 dark:border-[#C9A45C]/15">
          {CONTINENT_FILTERS.map((cont) => {
            const count =
              cont === 'Todos'
                ? ALL_COUNTRIES.length
                : cont === 'Antártida'
                  ? 0
                  : ALL_COUNTRIES.filter((c) => c.continent === cont).length;

            return (
              <button
                key={cont}
                type="button"
                onClick={() => {
                  setContinent(cont);
                  setShowAll(false);
                }}
                className={`inline-flex h-9 items-center gap-1.5 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  continent === cont
                    ? 'bg-[#C9A45C] text-[#08090D]'
                    : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/10 dark:text-[#B8B4C2] dark:hover:text-white'
                }`}
              >
                <span>{cont}</span>
                <span className="opacity-75 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Antarctica Special Panel or Country Grid */}
        {continent === 'Antártida' ? (
          <div className="mt-8 rounded-lg border border-stone-300 bg-white/70 p-6 sm:p-8 dark:border-[#C9A45C]/25 dark:bg-[#11131C]">
            <RigorLabel
              label={ANTARCTICA_LORE_NOTE.classification}
              extra={ANTARCTICA_LORE_NOTE.sources}
            />
            <h3 className="mt-3 font-display text-2xl font-semibold text-stone-900 dark:text-white">
              {ANTARCTICA_LORE_NOTE.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-[#9A7735] dark:text-[#C9A45C]">
              {ANTARCTICA_LORE_NOTE.subtitle}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-stone-700 sm:text-base dark:text-[#B8B4C2]">
              {ANTARCTICA_LORE_NOTE.summary}
            </p>
            <ul className="mt-5 space-y-2 border-t border-stone-300/60 pt-5 text-sm text-stone-700 dark:border-[#C9A45C]/15 dark:text-[#B8B4C2]">
              {ANTARCTICA_LORE_NOTE.traditions.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="py-16 text-center text-sm text-stone-600 dark:text-[#B8B4C2]">
            <Globe2 className="mx-auto mb-3 h-7 w-7 text-[#C9A45C]" />
            No se encontraron países para «{query}».
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleCountries.map((country) => (
                <motion.button
                  key={country.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16 }}
                  onClick={() => onSelectCountry(country)}
                  className="group flex flex-col justify-between rounded-lg border border-stone-300/80 bg-white/75 p-5 text-left transition-colors hover:border-[#C9A45C] dark:border-white/10 dark:bg-[#10111A] dark:hover:border-[#C9A45C]/60"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-3xl leading-none" aria-hidden="true">
                        {country.flag}
                      </span>
                      <span className="text-[11px] font-medium tracking-wider text-stone-500 uppercase dark:text-[#B8B4C2]/70">
                        {country.continent}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-semibold text-stone-900 group-hover:text-[#9A7735] dark:text-white dark:group-hover:text-[#C9A45C]">
                      {country.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-600 dark:text-[#B8B4C2]">
                      {country.culturalSummary}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-stone-300/50 pt-3 dark:border-white/10">
                    <div className="truncate text-xs text-stone-700 dark:text-white/80">
                      {country.mythologies[0]}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-[#9A7735] dark:text-[#C9A45C]">
                      <span>Abrir ficha mitológica</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {filteredCountries.length > PAGE_SIZE && (
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-stone-300/60 pt-6 dark:border-[#C9A45C]/15">
                <p className="text-xs text-stone-600 tabular-nums dark:text-[#B8B4C2]">
                  Mostrando {visibleCountries.length} de {filteredCountries.length} países
                </p>
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="inline-flex h-10 items-center rounded-md border border-[#C9A45C]/50 px-5 text-xs font-semibold text-[#9A7735] transition-colors hover:bg-[#C9A45C] hover:text-[#08090D] dark:text-[#C9A45C]"
                >
                  {showAll
                    ? 'Reducir vista a 24 países'
                    : `Ver los ${filteredCountries.length} países completos`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
