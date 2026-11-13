import { useState, useMemo } from 'react';
import { DEITIES_DATA } from '../data/deitiesData';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';

const PANTHEON_FILTERS = [
  'Todos',
  'Grecia Antigua',
  'Nórdico',
  'Egipto Antiguo',
  'Japón',
  'Mesoamérica y Andes',
  'Guaraní',
  'India',
] as const;

export function DeitiesSection() {
  const [filter, setFilter] = useState<(typeof PANTHEON_FILTERS)[number]>('Todos');
  const [selectedId, setSelectedId] = useState<string>(DEITIES_DATA[0].id);

  const filtered = useMemo(() => {
    return DEITIES_DATA.filter((d) => {
      if (filter === 'Todos') return true;
      if (filter === 'Grecia Antigua') return d.culture.includes('Grecia');
      if (filter === 'Nórdico') return d.pantheon === 'Æsir' || d.pantheon === 'Vanir';
      if (filter === 'Egipto Antiguo') return d.culture.includes('Egipto');
      if (filter === 'Japón') return d.culture === 'Japón';
      if (filter === 'Mesoamérica y Andes')
        return (
          d.culture.includes('Mesoamérica') ||
          d.culture.includes('mexica') ||
          d.culture.includes('maya') ||
          d.culture.includes('andinas') ||
          d.culture.includes('inca') ||
          d.culture.includes('quechuas')
        );
      if (filter === 'Guaraní') return d.culture.includes('guaraníes') || d.culture.includes('guaraní');
      if (filter === 'India') return d.culture.includes('India');
      return true;
    });
  }, [filter]);

  const activeDeity =
    filtered.find((d) => d.id === selectedId) || filtered[0] || DEITIES_DATA[0];

  return (
    <section
      id="dioses"
      className="border-t border-stone-300/60 bg-stone-200/35 py-20 sm:py-24 dark:border-[#C9A45C]/15 dark:bg-[#0B0C12]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            04 · Panteones y Seres Sagrados
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Dioses y Seres Divinos de la Humanidad
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Estudio comparativo de deidades históricas y tradiciones espirituales vivas —tratadas con
            rigor museográfico y respeto cultural— desde el Olimpo y Asgard hasta el Nilo, Ise, los
            Andes, la India y la cosmogonía guaraní.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-2">
          {PANTHEON_FILTERS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilter(p)}
              className={`h-9 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                filter === p
                  ? 'bg-[#C9A45C] text-[#08090D]'
                  : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/10 dark:text-[#B8B4C2] dark:hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Two-Column Curatorial Split */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
          {/* Selector List */}
          <div className="grid max-h-[560px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {filtered.map((deity) => {
              const isSelected = deity.id === activeDeity.id;
              return (
                <button
                  key={deity.id}
                  type="button"
                  onClick={() => setSelectedId(deity.id)}
                  className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? 'border-[#C9A45C] bg-[#C9A45C]/12 text-stone-950 dark:bg-[#24143B]/60 dark:text-white'
                      : 'border-stone-300/70 bg-white/70 text-stone-800 hover:border-[#C9A45C]/50 dark:border-white/10 dark:bg-[#10111A] dark:text-[#B8B4C2]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-semibold">
                      {deity.name}
                    </div>
                    <div className="truncate text-xs opacity-75">
                      {deity.pantheon} · {deity.culture}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#9A7735] shrink-0 dark:text-[#C9A45C]">
                    Ver
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail Sheet */}
          <article className="rounded-lg border border-stone-300/80 bg-white/85 p-6 sm:p-8 lg:col-span-7 dark:border-[#C9A45C]/25 dark:bg-[#11131D]">
            <div className="grid gap-6 sm:grid-cols-12">
              <div className="sm:col-span-5">
                <ArtFrame
                  imageKey={activeDeity.imageKey}
                  alt={`Representación artística vinculada a ${activeDeity.name}`}
                  aspectClass="aspect-[3/4]"
                  className="rounded-md"
                  fallbackTitle={activeDeity.name}
                />
              </div>

              <div className="space-y-4 sm:col-span-7">
                <RigorLabel label={activeDeity.classification} extra={activeDeity.pantheon} />
                <h3 className="font-display text-2xl font-semibold text-stone-900 sm:text-3xl dark:text-white">
                  {activeDeity.name}
                </h3>
                <p className="text-xs font-medium tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                  {activeDeity.culture} · {activeDeity.domain}
                </p>
                <p className="text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  {activeDeity.origin}
                </p>

                <div className="border-t border-stone-300/60 pt-4 dark:border-white/10">
                  <h4 className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Atributos y símbolos
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-700 dark:text-white/85">
                    {activeDeity.attributes.join(' · ')}
                  </p>
                  <p className="mt-1.5 text-xs text-stone-500 dark:text-[#B8B4C2]">
                    Símbolos: {activeDeity.symbols.join(', ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
              <div>
                <h4 className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                  Relatos principales y relevancia cultural
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  {activeDeity.myths}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-800 dark:text-white/90">
                  {activeDeity.culturalRelevance}
                </p>
              </div>

              {activeDeity.respectNote && (
                <p className="text-xs italic text-[#9A7735] dark:text-[#C9A45C]">
                  {activeDeity.respectNote}
                </p>
              )}

              <p className="text-xs text-stone-500 dark:text-[#B8B4C2]/75">
                Fuentes: {activeDeity.sources.join(' · ')}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
