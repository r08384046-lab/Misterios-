import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark } from 'lucide-react';
import { CreatureEntry } from '../types/encyclopedia';
import { ArtFrame } from './ArtFrame';
import { RigorLabel } from './RigorLabel';

interface CreatureDetailModalProps {
  creature: CreatureEntry | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CreatureDetailModal({
  creature,
  onClose,
  isFavorite,
  onToggleFavorite,
}: CreatureDetailModalProps) {
  useEffect(() => {
    if (!creature) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [creature, onClose]);

  return (
    <AnimatePresence>
      {creature && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="creature-modal-title"
        >
          <motion.article
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-stone-300 bg-[#F7F4EE] text-stone-900 shadow-2xl dark:border-[#C9A45C]/30 dark:bg-[#0D0E15] dark:text-white"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-stone-300/70 bg-[#F7F4EE]/95 px-6 py-4 backdrop-blur-md dark:border-[#C9A45C]/20 dark:bg-[#0D0E15]/95">
              <div className="min-w-0">
                <p className="text-xs tracking-widest text-[#9A7735] uppercase dark:text-[#C9A45C]">
                  Bestiario Enciclopédico · {creature.tradition}
                </p>
                <h2
                  id="creature-modal-title"
                  className="truncate font-display text-xl font-semibold sm:text-2xl"
                >
                  {creature.name}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onToggleFavorite}
                  className={`inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors ${
                    isFavorite
                      ? 'border-[#C9A45C] bg-[#C9A45C]/15 text-[#9A7735] dark:text-[#C9A45C]'
                      : 'border-stone-300 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/15 dark:text-[#B8B4C2]'
                  }`}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar ficha de criatura"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 text-stone-700 hover:border-[#C9A45C] dark:border-white/15 dark:text-[#B8B4C2] dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <ArtFrame
                  imageKey={creature.imageKey}
                  alt={`Ilustración artística de ${creature.name}`}
                  aspectClass="aspect-[4/3] lg:aspect-[3/4]"
                  className="rounded-md border border-stone-300/60 dark:border-[#C9A45C]/20"
                  fallbackTitle={creature.name}
                />
                <dl className="mt-4 space-y-2 border-t border-stone-300/60 pt-4 text-xs dark:border-[#C9A45C]/15">
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500 dark:text-[#B8B4C2]/70">Origen</dt>
                    <dd className="text-right font-medium">{creature.origin}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500 dark:text-[#B8B4C2]/70">Continente</dt>
                    <dd className="text-right font-medium">{creature.continent}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-stone-500 dark:text-[#B8B4C2]/70">Categoría</dt>
                    <dd className="text-right font-medium">{creature.category}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div>
                  <RigorLabel label={creature.classification} extra={creature.tradition} />
                  <p className="mt-3 text-base leading-relaxed text-stone-800 dark:text-white/90">
                    {creature.description}
                  </p>
                </div>

                <div className="border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
                  <h3 className="font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Historia de origen
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                    {creature.originStory}
                  </p>
                </div>

                <div className="border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
                  <h3 className="font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Habilidades atribuidas en los relatos
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-stone-700 dark:text-[#B8B4C2]">
                    {creature.abilities.map((ab) => (
                      <li key={ab}>· {ab}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
                  <h3 className="font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Leyendas relacionadas
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-stone-700 dark:text-[#B8B4C2]">
                    {creature.relatedLegends.map((leg) => (
                      <li key={leg}>· {leg}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
                  <h3 className="font-display text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-[#B8B4C2]/70">
                    Fuentes de referencia
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-600 dark:text-[#B8B4C2]">
                    {creature.sources.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
