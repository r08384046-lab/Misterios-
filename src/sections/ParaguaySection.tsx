import { useState, useMemo } from 'react';
import { PARAGUAY_FOLKLORE_DATA, GUARANI_GLOSSARY } from '../data/paraguayData';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';

const PY_FILTERS = ['Todos', 'Mitos Guaraníes', 'Folclore Popular', 'Lugares y Leyendas'] as const;

export function ParaguaySection() {
  const [filter, setFilter] = useState<(typeof PY_FILTERS)[number]>('Todos');
  const [selectedId, setSelectedId] = useState<string>(PARAGUAY_FOLKLORE_DATA[0].id);

  const items = useMemo(
    () =>
      filter === 'Todos'
        ? PARAGUAY_FOLKLORE_DATA
        : PARAGUAY_FOLKLORE_DATA.filter((item) => item.category === filter),
    [filter]
  );

  const activeEntry = items.find((i) => i.id === selectedId) || items[0];

  return (
    <section
      id="paraguay"
      className="relative overflow-hidden border-t border-[#C9A45C]/30 bg-[#120D1F] py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Hero Feature Split */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-medium tracking-[0.22em] text-[#C9A45C] uppercase">
              07 · Dossier Especial · Paraguay ha Tetã Guaraní
            </p>
            <h2
              style={{ textWrap: 'balance' }}
              className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-[2.65rem]"
            >
              Mitología Guaraní y Folclore del Paraguay
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#B8B4C2] sm:text-base">
              Desde los cantos sagrados mbyá guaraníes del <em className="text-white">Ayvu Rapyta</em>{' '}
              sobre Ñamandú y el horizonte del <em className="text-white">Yvy Marãe’ỹ</em> hasta los
              siete mitos de Tau y Kerana, el Pombero, Mala Visión, Póra, Plata Yvyguy y las aguas
              del Lago Ypacaraí.
            </p>

            {/* Filter Controls */}
            <div className="mt-6 flex flex-wrap gap-2">
              {PY_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`h-9 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    filter === f
                      ? 'bg-[#C9A45C] text-[#08090D]'
                      : 'border border-[#C9A45C]/30 text-[#B8B4C2] hover:border-[#C9A45C] hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <ArtFrame
              imageKey="paraguay"
              alt="Atardecer lunar sobre el Lago Ypacaraí y bosque paraguayo de lapachos en la niebla"
              aspectClass="aspect-[16/9] lg:h-full"
              className="rounded-lg border border-[#C9A45C]/30"
              fallbackTitle="Folclore del Paraguay"
            />
          </div>
        </div>

        {/* Interactive Explorer */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          <div className="grid max-h-[540px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {items.map((entry) => {
              const selected = entry.id === activeEntry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedId(entry.id)}
                  className={`rounded-md border px-4 py-3 text-left transition-colors ${
                    selected
                      ? 'border-[#C9A45C] bg-[#24143B] text-white'
                      : 'border-white/10 bg-[#0A0B11] text-[#B8B4C2] hover:border-[#C9A45C]/45 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold">{entry.name}</span>
                    <span className="text-[11px] text-[#C9A45C] shrink-0">{entry.category}</span>
                  </div>
                  {entry.guaraniTerm && (
                    <div className="mt-0.5 text-xs text-[#C9A45C]/80">{entry.guaraniTerm}</div>
                  )}
                </button>
              );
            })}
          </div>

          <article className="rounded-lg border border-[#C9A45C]/30 bg-[#0A0B11] p-6 sm:p-8 lg:col-span-7">
            <RigorLabel label={activeEntry.classification} extra={activeEntry.category} />
            <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {activeEntry.name}
            </h3>

            {activeEntry.guaraniTerm && (
              <div className="mt-3 rounded-md border border-[#C9A45C]/25 bg-[#24143B]/45 px-4 py-3">
                <div className="text-xs font-semibold tracking-wider text-[#C9A45C] uppercase">
                  Expresión en Guaraní: {activeEntry.guaraniTerm}
                </div>
                {activeEntry.guaraniMeaning && (
                  <p className="mt-1 text-xs text-[#B8B4C2]">{activeEntry.guaraniMeaning}</p>
                )}
              </div>
            )}

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-[#B8B4C2]">
              <div>
                <h4 className="font-display text-xs font-semibold tracking-wider text-[#C9A45C] uppercase">
                  Origen y raíz cultural
                </h4>
                <p className="mt-1.5">{activeEntry.origin}</p>
              </div>

              <div>
                <h4 className="font-display text-xs font-semibold tracking-wider text-[#C9A45C] uppercase">
                  Características tradicionales
                </h4>
                <p className="mt-1.5">{activeEntry.characteristics}</p>
              </div>

              <div>
                <h4 className="font-display text-xs font-semibold tracking-wider text-[#C9A45C] uppercase">
                  Relato tradicional
                </h4>
                <p className="mt-1.5 text-white/90">{activeEntry.traditionalNarrative}</p>
              </div>

              <div>
                <h4 className="font-display text-xs font-semibold tracking-wider text-[#C9A45C] uppercase">
                  Significado cultural
                </h4>
                <p className="mt-1.5">{activeEntry.culturalMeaning}</p>
              </div>

              <p className="border-t border-white/10 pt-4 text-xs text-[#B8B4C2]/75">
                Fuentes: {activeEntry.sources.join(' · ')}
              </p>
            </div>
          </article>
        </div>

        {/* Guaraní Glossary */}
        <div className="mt-12 border-t border-[#C9A45C]/20 pt-10">
          <h3 className="font-display text-xl font-semibold text-white">
            Glosario Esencial Guaraní – Español
          </h3>
          <p className="mt-1 text-xs text-[#B8B4C2]">
            Términos fundamentales para comprender el folclore y la espiritualidad del Paraguay sin
            distorsiones.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANI_GLOSSARY.map((g) => (
              <div
                key={g.term}
                className="rounded-md border border-white/10 bg-[#0A0B11] p-4"
              >
                <div className="font-display text-sm font-semibold text-[#C9A45C]">{g.term}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#B8B4C2]">{g.translation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
