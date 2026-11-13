import { useState } from 'react';
import { LEGENDS_DATA } from '../data/legendsData';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';

export function LegendsSection() {
  const [activeId, setActiveId] = useState<string>(LEGENDS_DATA[0].id);
  const activeLegend = LEGENDS_DATA.find((l) => l.id === activeId) || LEGENDS_DATA[0];

  return (
    <section
      id="leyendas"
      className="border-t border-stone-300/60 py-20 sm:py-24 dark:border-[#C9A45C]/15"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            05 · Biblioteca de Leyendas Internacionales
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Relatos Legendarios que Trascendieron Épocas
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            18 narraciones célebres del mundo presentadas con relato literario original, contexto
            histórico contrastado y ubicación geográfica precisa.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Index Sidebar */}
          <div className="max-h-[600px] space-y-1.5 overflow-y-auto pr-1 lg:col-span-4">
            {LEGENDS_DATA.map((leg, idx) => {
              const selected = leg.id === activeLegend.id;
              return (
                <button
                  key={leg.id}
                  type="button"
                  onClick={() => setActiveId(leg.id)}
                  className={`flex w-full items-baseline gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                    selected
                      ? 'border-[#C9A45C] bg-[#C9A45C]/12 text-stone-950 dark:bg-[#24143B]/60 dark:text-white'
                      : 'border-transparent hover:border-stone-300 dark:text-[#B8B4C2] dark:hover:border-white/15 dark:hover:text-white'
                  }`}
                >
                  <span className="font-mono text-xs text-[#9A7735] tabular-nums dark:text-[#C9A45C]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-semibold">{leg.title}</div>
                    <div className="truncate text-xs opacity-70">{leg.origin}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reader Canvas */}
          <article className="overflow-hidden rounded-lg border border-stone-300/80 bg-white/85 lg:col-span-8 dark:border-[#C9A45C]/25 dark:bg-[#11131D]">
            <ArtFrame
              imageKey={activeLegend.imageKey}
              alt={activeLegend.title}
              aspectClass="aspect-[16/7]"
              fallbackTitle={activeLegend.title}
            />

            <div className="p-6 sm:p-8">
              <RigorLabel
                label={activeLegend.classification}
                extra={`${activeLegend.origin} · ${activeLegend.era}`}
              />
              <h3 className="mt-3 font-display text-2xl font-semibold text-stone-900 sm:text-3xl dark:text-white">
                {activeLegend.title}
              </h3>
              <p className="mt-3 text-base font-medium leading-relaxed text-stone-800 dark:text-white/90">
                {activeLegend.summary}
              </p>

              <div className="mt-6 max-w-2xl space-y-4 border-t border-stone-300/60 pt-6 text-sm leading-[1.8] text-stone-700 sm:text-[15px] dark:border-[#C9A45C]/15 dark:text-[#B8B4C2]">
                {activeLegend.narrative.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-4xl first-letter:leading-none first-letter:font-semibold first-letter:text-[#C9A45C]'
                        : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-6 border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
                <h4 className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                  Contexto histórico y cultural
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  {activeLegend.historicalContext}
                </p>
                <p className="mt-3 text-xs text-stone-500 dark:text-[#B8B4C2]/75">
                  Fuentes: {activeLegend.sources.join(' · ')}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
