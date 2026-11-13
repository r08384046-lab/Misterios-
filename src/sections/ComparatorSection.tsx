import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { COMPARABLE_ENTITIES } from '../data/galleryData';
import { RigorLabel } from '../components/RigorLabel';

export function ComparatorSection() {
  const [leftId, setLeftId] = useState<string>(COMPARABLE_ENTITIES[0].id);
  const [rightId, setRightId] = useState<string>(COMPARABLE_ENTITIES[1].id);

  const left = COMPARABLE_ENTITIES.find((e) => e.id === leftId) || COMPARABLE_ENTITIES[0];
  const right = COMPARABLE_ENTITIES.find((e) => e.id === rightId) || COMPARABLE_ENTITIES[1];

  const handleSwap = () => {
    setLeftId(right.id);
    setRightId(left.id);
  };

  return (
    <section
      id="comparador"
      className="border-t border-stone-300/60 py-20 sm:py-24 dark:border-[#C9A45C]/15"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            08 · Análisis Comparado
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Comparador Mitológico Internacional
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Contrasta figuras divinas y criaturas de distintas civilizaciones observando sus
            atributos, símbolos y diferencias culturales específicas, sin presentar paralelos
            especulativos como hechos históricos.
          </p>
        </div>

        {/* Selector Row */}
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <label
              htmlFor="comp-left"
              className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-[#B8B4C2]"
            >
              Primera figura o criatura
            </label>
            <select
              id="comp-left"
              value={left.id}
              onChange={(e) => setLeftId(e.target.value)}
              className="h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 dark:border-[#C9A45C]/30 dark:bg-[#11131C] dark:text-white"
            >
              {COMPARABLE_ENTITIES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} — {e.culture}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            aria-label="Intercambiar figuras comparadas"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#C9A45C]/40 px-4 text-xs font-medium text-[#9A7735] transition-colors hover:bg-[#C9A45C] hover:text-[#08090D] dark:text-[#C9A45C]"
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>Invertir</span>
          </button>

          <div className="flex-1">
            <label
              htmlFor="comp-right"
              className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-[#B8B4C2]"
            >
              Segunda figura o criatura
            </label>
            <select
              id="comp-right"
              value={right.id}
              onChange={(e) => setRightId(e.target.value)}
              className="h-11 w-full rounded-md border border-stone-300 bg-white px-3 text-sm text-stone-900 dark:border-[#C9A45C]/30 dark:bg-[#11131C] dark:text-white"
            >
              {COMPARABLE_ENTITIES.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} — {e.culture}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[left, right].map((entity, idx) => (
            <article
              key={`${entity.id}-${idx}`}
              className="rounded-lg border border-stone-300/80 bg-white/85 p-6 sm:p-8 dark:border-[#C9A45C]/25 dark:bg-[#11131D]"
            >
              <RigorLabel label={entity.classification} extra={entity.culture} />
              <h3 className="mt-2 font-display text-2xl font-semibold text-stone-900 dark:text-white">
                {entity.name}
              </h3>
              <p className="mt-1 text-xs font-medium text-[#9A7735] dark:text-[#C9A45C]">
                {entity.nature}
              </p>

              <dl className="mt-6 space-y-4 border-t border-stone-300/60 pt-5 text-sm dark:border-white/10">
                <div>
                  <dt className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Atributos principales
                  </dt>
                  <dd className="mt-1 text-stone-700 dark:text-[#B8B4C2]">
                    {entity.attributes.join(' · ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Símbolos característicos
                  </dt>
                  <dd className="mt-1 text-stone-700 dark:text-white/90">
                    {entity.symbols.join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Relato representativo
                  </dt>
                  <dd className="mt-1 leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                    {entity.keyNarrative}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Diferencias culturales propias
                  </dt>
                  <dd className="mt-1 leading-relaxed text-stone-800 dark:text-white/90">
                    {entity.culturalDistinctions}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-stone-500 dark:text-[#B8B4C2]/80">
          Nota metodológica: las semejanzas temáticas entre culturas distantes (como deidades del
          trueno o espíritus del bosque) no implican contacto histórico directo ni origen único, sino
          respuestas culturales independientes ante la naturaleza y la experiencia humana.
        </p>
      </div>
    </section>
  );
}
