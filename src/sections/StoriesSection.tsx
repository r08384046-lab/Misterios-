import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Clock, Bookmark, X, Type } from 'lucide-react';
import { STORIES_DATA } from '../data/storiesData';
import { StoryEntry } from '../types/encyclopedia';
import { ArtFrame } from '../components/ArtFrame';
import { RigorLabel } from '../components/RigorLabel';

interface StoriesSectionProps {
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (story: StoryEntry) => void;
}

export function StoriesSection({ isFavorite, onToggleFavorite }: StoriesSectionProps) {
  const [activeStory, setActiveStory] = useState<StoryEntry | null>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [fontScale, setFontScale] = useState<'normal' | 'large'>('normal');
  const [warmPaper, setWarmPaper] = useState(false);

  useEffect(() => {
    if (!activeStory) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStory(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeStory]);

  const openStory = (story: StoryEntry) => {
    setActiveStory(story);
    setActiveChapterIdx(0);
  };

  return (
    <section
      id="historias"
      className="border-t border-stone-300/60 bg-stone-200/35 py-20 sm:py-24 dark:border-[#C9A45C]/15 dark:bg-[#0B0C12]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            09 · Sala de Lectura Literaria
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Historias Interactivas y Relatos Originales
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Adaptaciones literarias originales basadas en fuentes primarias clásicas y tradiciones
            orales, con índice por capítulos, modo lectura dedicado y guardado en favoritos.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STORIES_DATA.map((story) => {
            const saved = isFavorite(story.id);
            return (
              <article
                key={story.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-stone-300/80 bg-white/85 dark:border-white/10 dark:bg-[#11131D]"
              >
                <ArtFrame
                  imageKey={story.imageKey}
                  alt={story.title}
                  aspectClass="aspect-[16/10]"
                  fallbackTitle={story.title}
                />

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <RigorLabel label={story.classification} extra={story.category} />
                    <h3 className="mt-2 font-display text-xl font-semibold text-stone-900 dark:text-white">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-[#B8B4C2]">
                      {story.subtitle}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-stone-500 dark:text-[#B8B4C2]/80">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#C9A45C]" aria-hidden="true" />
                        <span className="tabular-nums">{story.readingTimeMinutes} min</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{story.chapters.length} capítulos</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-stone-300/50 pt-4 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => openStory(story)}
                      className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md bg-[#C9A45C] px-4 text-xs font-semibold text-[#08090D] transition-colors hover:bg-[#D8B671]"
                    >
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Modo lectura</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(story)}
                      aria-label={saved ? 'Quitar de favoritos' : 'Guardar historia en favoritos'}
                      className={`inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs transition-colors ${
                        saved
                          ? 'border-[#C9A45C] bg-[#C9A45C]/15 text-[#9A7735] dark:text-[#C9A45C]'
                          : 'border-stone-300 text-stone-600 hover:border-[#C9A45C] dark:border-white/15 dark:text-[#B8B4C2]'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Dedicated Reading Mode Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
            onClick={() => setActiveStory(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Modo lectura: ${activeStory.title}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className={`flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border transition-colors ${
                warmPaper
                  ? 'border-[#D6CEBE] bg-[#FBF6EC] text-[#1C1917]'
                  : 'border-[#C9A45C]/30 bg-[#0A0B11] text-white'
              }`}
            >
              {/* Reading Toolbar */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3.5 ${
                  warmPaper ? 'border-[#D6CEBE]' : 'border-[#C9A45C]/20'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[11px] tracking-widest text-[#C9A45C] uppercase">
                    Modo Lectura · {activeStory.tradition}
                  </div>
                  <h3 className="truncate font-display text-base font-semibold sm:text-lg">
                    {activeStory.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setFontScale((prev) => (prev === 'normal' ? 'large' : 'normal'))
                    }
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#C9A45C]/35 px-2.5 text-xs font-medium"
                  >
                    <Type className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>{fontScale === 'large' ? 'Texto normal' : 'Texto amplio'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWarmPaper((prev) => !prev)}
                    className="inline-flex h-8 items-center rounded-md border border-[#C9A45C]/35 px-2.5 text-xs font-medium"
                  >
                    {warmPaper ? 'Papel nocturno' : 'Papel cálido'}
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleFavorite(activeStory)}
                    className={`inline-flex h-8 items-center gap-1 rounded-md border px-2.5 text-xs font-medium ${
                      isFavorite(activeStory.id)
                        ? 'border-[#C9A45C] bg-[#C9A45C]/20 text-[#C9A45C]'
                        : 'border-[#C9A45C]/35'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">
                      {isFavorite(activeStory.id) ? 'Guardado' : 'Guardar'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStory(null)}
                    aria-label="Salir del modo lectura"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C9A45C]/35"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Body with Chapter TOC */}
              <div className="grid flex-1 overflow-y-auto md:grid-cols-12">
                <aside
                  className={`border-b p-5 md:col-span-4 md:border-r md:border-b-0 ${
                    warmPaper ? 'border-[#D6CEBE]' : 'border-white/10'
                  }`}
                >
                  <div className="text-xs font-semibold tracking-wider text-[#C9A45C] uppercase">
                    Índice de capítulos
                  </div>
                  <nav className="mt-3 space-y-1.5">
                    {activeStory.chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setActiveChapterIdx(idx)}
                        className={`block w-full rounded-md px-3 py-2 text-left text-xs font-medium transition-colors ${
                          activeChapterIdx === idx
                            ? 'bg-[#C9A45C] text-[#08090D]'
                            : warmPaper
                              ? 'text-stone-700 hover:bg-stone-200'
                              : 'text-[#B8B4C2] hover:bg-white/10'
                        }`}
                      >
                        {ch.heading}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-6 border-t border-current/10 pt-4 text-xs opacity-75">
                    <p>{activeStory.epilogueNote}</p>
                    <p className="mt-2">Fuentes: {activeStory.sources.join(' · ')}</p>
                  </div>
                </aside>

                <div className="p-6 sm:p-10 md:col-span-8">
                  <div className="mx-auto max-w-2xl">
                    <h4 className="font-display text-xl font-semibold text-[#C9A45C] sm:text-2xl">
                      {activeStory.chapters[activeChapterIdx].heading}
                    </h4>

                    <div
                      className={`mt-5 space-y-5 leading-[1.85] ${
                        fontScale === 'large' ? 'text-lg' : 'text-base'
                      }`}
                    >
                      {activeStory.chapters[activeChapterIdx].paragraphs.map((p, idx) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:font-semibold first-letter:text-[#C9A45C]'
                              : ''
                          }
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Chapter Pagination */}
                    <div className="mt-10 flex items-center justify-between border-t border-current/15 pt-5">
                      <button
                        type="button"
                        disabled={activeChapterIdx === 0}
                        onClick={() => setActiveChapterIdx((i) => Math.max(0, i - 1))}
                        className="rounded-md border border-[#C9A45C]/40 px-4 py-2 text-xs font-medium disabled:opacity-35"
                      >
                        Capítulo anterior
                      </button>
                      <span className="font-mono text-xs tabular-nums opacity-75">
                        {activeChapterIdx + 1} / {activeStory.chapters.length}
                      </span>
                      <button
                        type="button"
                        disabled={activeChapterIdx === activeStory.chapters.length - 1}
                        onClick={() =>
                          setActiveChapterIdx((i) =>
                            Math.min(activeStory.chapters.length - 1, i + 1)
                          )
                        }
                        className="rounded-md bg-[#C9A45C] px-4 py-2 text-xs font-semibold text-[#08090D] disabled:opacity-35"
                      >
                        Siguiente capítulo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
