import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';
import { GalleryItem } from '../types/encyclopedia';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';
import { IMAGE_ASSETS } from '../assets/media';

const GALLERY_CATEGORIES = [
  'Todas',
  'Dioses',
  'Dragones',
  'Criaturas',
  'Héroes',
  'Monstruos',
  'Civilizaciones antiguas',
  'Lugares legendarios',
] as const;

export function GallerySection() {
  const [category, setCategory] = useState<(typeof GALLERY_CATEGORIES)[number]>('Todas');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxItem]);

  const items = useMemo(
    () =>
      category === 'Todas'
        ? GALLERY_DATA
        : GALLERY_DATA.filter((g) => g.category === category),
    [category]
  );

  return (
    <section
      id="galeria"
      className="border-t border-stone-300/60 bg-stone-200/35 py-20 sm:py-24 dark:border-[#C9A45C]/15 dark:bg-[#0B0C12]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            11 · Galería Iconográfica
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Galería Visual de Mitos y Civilizaciones
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Ilustraciones curatoriales filtrables por categoría temática, con vista ampliada y ficha
            iconográfica.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`h-9 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-[#C9A45C] text-[#08090D]'
                  : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C]/60 dark:border-white/10 dark:text-[#B8B4C2] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxItem(item)}
              className="group overflow-hidden rounded-lg border border-stone-300/80 bg-white/85 text-left transition-colors hover:border-[#C9A45C] dark:border-white/10 dark:bg-[#11131D]"
            >
              <div className="relative">
                <ArtFrame
                  imageKey={item.imageKey}
                  alt={item.title}
                  aspectClass="aspect-[4/3]"
                  fallbackTitle={item.title}
                />
                <span className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-md bg-[#08090D]/80 text-[#C9A45C] opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
              <div className="p-5">
                <RigorLabel label={item.classification} extra={item.category} />
                <h3 className="mt-2 font-display text-lg font-semibold text-stone-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-serif text-xs italic text-stone-600 dark:text-[#B8B4C2]">
                  {item.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setLightboxItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
          >
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#C9A45C]/30 bg-[#0D0E15] p-4 sm:p-6 text-white"
            >
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Cerrar visualización ampliada"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-md bg-[#08090D]/80 text-white border border-white/20 hover:border-[#C9A45C]"
              >
                <X className="h-4 w-4" />
              </button>

              <img
                src={IMAGE_ASSETS[lightboxItem.imageKey]}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[64vh] w-full rounded-md object-contain bg-[#08090D]"
              />

              <figcaption className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                <div className="text-xs tracking-wider text-[#C9A45C] uppercase">
                  {lightboxItem.category} · {lightboxItem.culture}
                </div>
                <h3 className="font-display text-xl font-semibold">{lightboxItem.title}</h3>
                <p className="text-sm text-[#B8B4C2]">{lightboxItem.caption}</p>
                <p className="text-xs text-[#B8B4C2]/70">Archivo: {lightboxItem.source}</p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
