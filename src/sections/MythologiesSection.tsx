import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MYTHOLOGIES_DATA } from '../data/mythologiesData';
import { RigorLabel } from '../components/RigorLabel';

const REGIONS = ['Todas', 'Europa', 'Asia', 'África', 'América', 'Oceanía'] as const;

export function MythologiesSection() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>('Todas');
  const [expandedId, setExpandedId] = useState<string>(MYTHOLOGIES_DATA[0].id);

  const items = useMemo(
    () =>
      region === 'Todas'
        ? MYTHOLOGIES_DATA
        : MYTHOLOGIES_DATA.filter((m) => m.continent === region),
    [region]
  );

  return (
    <section
      id="mitologias"
      className="border-t border-stone-300/60 bg-stone-200/35 py-20 sm:py-24 dark:border-[#C9A45C]/15 dark:bg-[#0B0C12]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            02 · Tradiciones Mitológicas del Mundo
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Sistemas Sagrados y Cosmogonías Continentales
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Recorrido documentado por las grandes tradiciones de Europa, Asia, África, América y
            Oceanía, diferenciando mitos antiguos, sistemas religiosos vivos y folclore regional.
          </p>
        </div>

        {/* Region Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`h-9 rounded-md px-4 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                region === r
                  ? 'bg-[#C9A45C] text-[#08090D]'
                  : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/10 dark:text-[#B8B4C2] dark:hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Accordion / Grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((trad) => {
            const isOpen = expandedId === trad.id;
            return (
              <article
                key={trad.id}
                className="rounded-lg border border-stone-300/80 bg-white/80 p-6 transition-colors dark:border-white/10 dark:bg-[#11131D]"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? '' : trad.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <div>
                    <RigorLabel
                      label={trad.classification}
                      extra={`${trad.continent} · ${trad.era}`}
                    />
                    <h3 className="mt-2 font-display text-xl font-semibold text-stone-900 dark:text-white">
                      {trad.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 dark:text-[#B8B4C2]/75">
                      {trad.region}
                    </p>
                  </div>
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-stone-300/80 text-stone-600 dark:border-white/10 dark:text-[#C9A45C]">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  {trad.summary}
                </p>

                {isOpen && (
                  <div className="mt-5 space-y-4 border-t border-stone-300/60 pt-4 text-sm dark:border-[#C9A45C]/15">
                    <div>
                      <h4 className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                        Cosmogonía y origen
                      </h4>
                      <p className="mt-1 leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                        {trad.cosmogony}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                          Figuras clave
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-stone-700 dark:text-white/85">
                          {trad.keyFigures.join(' · ')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                          Textos y fuentes orales
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                          {trad.keyTextsOrOralSources.join(' · ')}
                        </p>
                      </div>
                    </div>

                    {trad.culturalNote && (
                      <p className="border-t border-stone-300/50 pt-3 text-xs italic text-stone-600 dark:border-white/10 dark:text-[#C9A45C]/90">
                        Nota de respeto cultural: {trad.culturalNote}
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
