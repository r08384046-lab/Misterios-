import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { PLACES_DATA } from '../data/placesData';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';

const PLACE_FILTERS = [
  'Todos',
  'Lugar histórico real',
  'Lugar legendario',
  'Interpretación moderna',
] as const;

export function PlacesSection() {
  const [filter, setFilter] = useState<(typeof PLACE_FILTERS)[number]>('Todos');

  const items = useMemo(
    () =>
      filter === 'Todos'
        ? PLACES_DATA
        : PLACES_DATA.filter((p) => p.placeType === filter),
    [filter]
  );

  return (
    <section
      id="lugares"
      className="border-t border-stone-300/60 bg-stone-200/35 py-20 sm:py-24 dark:border-[#C9A45C]/15 dark:bg-[#0B0C12]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            06 · Geografía Sagrada y Enigmática
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Lugares Misteriosos del Mundo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Distinguiendo con rigor entre sitios arqueológicos e históricos reales, paisajes
            literarios legendarios e interpretaciones contemporáneas.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {PLACE_FILTERS.map((pf) => (
            <button
              key={pf}
              type="button"
              onClick={() => setFilter(pf)}
              className={`h-9 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                filter === pf
                  ? 'bg-[#C9A45C] text-[#08090D]'
                  : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/10 dark:text-[#B8B4C2] dark:hover:text-white'
              }`}
            >
              {pf}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((place) => (
            <article
              key={place.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-stone-300/80 bg-white/80 dark:border-white/10 dark:bg-[#11131D]"
            >
              <ArtFrame
                imageKey={place.imageKey}
                alt={`${place.name} — ${place.location}`}
                aspectClass="aspect-[16/10]"
                fallbackTitle={place.name}
              />

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <RigorLabel label={place.placeType} extra={place.continent} />
                  <h3 className="mt-2 font-display text-xl font-semibold text-stone-900 dark:text-white">
                    {place.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500 dark:text-[#B8B4C2]/80">
                    <MapPin className="h-3.5 w-3.5 text-[#C9A45C] shrink-0" aria-hidden="true" />
                    <span>{place.location}</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                    {place.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-stone-300/50 pt-3 text-xs leading-relaxed dark:border-white/10">
                    <p className="text-stone-700 dark:text-white/85">
                      <span className="font-semibold text-[#9A7735] dark:text-[#C9A45C]">
                        Tradición asociada:{' '}
                      </span>
                      {place.associatedMyths}
                    </p>
                    <p className="text-stone-600 dark:text-[#B8B4C2]">
                      <span className="font-semibold text-stone-800 dark:text-white">
                        Estado histórico:{' '}
                      </span>
                      {place.archaeologicalOrHistoricalStatus}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-stone-500 dark:text-[#B8B4C2]/70">
                  Fuentes: {place.sources.join(' · ')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
