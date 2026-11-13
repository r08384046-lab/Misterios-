import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bookmark, MapPin, BookOpen, Shield, Sparkles, Compass } from 'lucide-react';
import { CountryEntry } from '../types/encyclopedia';
import { RigorLabel } from './RigorLabel';

interface CountryDetailModalProps {
  country: CountryEntry | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectNeighbor?: (country: CountryEntry) => void;
  relatedCountries: CountryEntry[];
}

export function CountryDetailModal({
  country,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectNeighbor,
  relatedCountries,
}: CountryDetailModalProps) {
  useEffect(() => {
    if (!country) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [country, onClose]);

  return (
    <AnimatePresence>
      {country && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="country-modal-title"
        >
          <motion.article
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-stone-300 bg-[#F7F4EE] text-stone-900 shadow-2xl dark:border-[#C9A45C]/30 dark:bg-[#0D0E15] dark:text-white"
          >
            {/* Header Strip */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-stone-300/70 bg-[#F7F4EE]/95 px-6 py-4 backdrop-blur-md dark:border-[#C9A45C]/20 dark:bg-[#0D0E15]/95">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-3xl leading-none" aria-hidden="true">
                  {country.flag}
                </span>
                <div className="min-w-0">
                  <p className="text-xs tracking-widest text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    Expediente Territorial · {country.continent} · {country.isoCode}
                  </p>
                  <h2
                    id="country-modal-title"
                    className="truncate font-display text-xl font-semibold sm:text-2xl"
                  >
                    {country.name}
                  </h2>
                </div>
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
                  aria-label="Cerrar ficha de país"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 text-stone-700 hover:border-[#C9A45C] dark:border-white/15 dark:text-[#B8B4C2] dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-8 p-6 sm:p-8">
              <div>
                <RigorLabel label={country.rigor} extra={`Fuente: ${country.source}`} />
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  {country.culturalSummary}
                </p>
              </div>

              <div className="grid gap-6 border-t border-stone-300/60 pt-6 sm:grid-cols-2 dark:border-[#C9A45C]/15">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    <Compass className="h-4 w-4" aria-hidden="true" />
                    Mitologías tradicionales
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-stone-800 dark:text-white/90">
                    {country.mythologies.map((m) => (
                      <li key={m} className="leading-relaxed">
                        · {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Leyendas conocidas
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-stone-800 dark:text-white/90">
                    {country.legends.map((l) => (
                      <li key={l} className="leading-relaxed">
                        · {l}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Criaturas folclóricas
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-stone-800 dark:text-white/90">
                    {country.creatures.map((c) => (
                      <li key={c} className="leading-relaxed">
                        · {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    Dioses y personajes legendarios
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-stone-800 dark:text-white/90">
                    {country.deitiesAndFigures.map((d) => (
                      <li key={d} className="leading-relaxed">
                        · {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-stone-300/60 pt-6 dark:border-[#C9A45C]/15">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Lugares relacionados con sus tradiciones
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  {country.sacredPlaces.join(' · ')}
                </p>
              </div>

              {relatedCountries.length > 0 && onSelectNeighbor && (
                <div className="border-t border-stone-300/60 pt-6 dark:border-[#C9A45C]/15">
                  <p className="mb-3 text-xs tracking-wider text-stone-500 uppercase dark:text-[#B8B4C2]/70">
                    Otros países en {country.continent}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedCountries.slice(0, 6).map((rel) => (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => onSelectNeighbor(rel)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-stone-300/80 px-3 py-1.5 text-xs font-medium text-stone-800 transition-colors hover:border-[#C9A45C] dark:border-[#C9A45C]/20 dark:text-[#B8B4C2] dark:hover:text-white"
                      >
                        <span aria-hidden="true">{rel.flag}</span>
                        <span>{rel.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
