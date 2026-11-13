import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Bookmark } from 'lucide-react';
import { FavoriteItem } from '../hooks/useFavorites';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteItem[];
  onRemove: (item: FavoriteItem) => void;
  onClearAll: () => void;
  onNavigate: (item: FavoriteItem) => void;
}

const TYPE_LABELS: Record<FavoriteItem['type'], string> = {
  country: 'País',
  creature: 'Criatura',
  deity: 'Deidad',
  legend: 'Leyenda',
  place: 'Lugar',
  story: 'Historia',
};

export function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemove,
  onClearAll,
  onNavigate,
}: FavoritesDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Archivo personal de favoritos"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col border-l border-stone-300 bg-[#F7F4EE] text-stone-900 dark:border-[#C9A45C]/25 dark:bg-[#0D0E15] dark:text-white"
          >
            <div className="flex items-center justify-between border-b border-stone-300/70 px-6 py-4 dark:border-[#C9A45C]/20">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-[#C9A45C]" />
                <h2 className="font-display text-lg font-semibold">Archivo Guardado</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar panel de guardados"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-300 dark:border-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {favorites.length === 0 ? (
                <div className="py-12 text-center text-sm text-stone-500 dark:text-[#B8B4C2]">
                  Aún no has guardado elementos en tu cuaderno de investigación. Pulsa «Guardar» en
                  cualquier país, criatura o historia.
                </div>
              ) : (
                <ul className="divide-y divide-stone-300/50 dark:divide-[#C9A45C]/15">
                  {favorites.map((item) => (
                    <li
                      key={`${item.type}-${item.id}`}
                      className="flex items-center justify-between gap-3 py-3.5"
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate(item)}
                        className="min-w-0 flex-1 text-left hover:text-[#C9A45C]"
                      >
                        <div className="text-[11px] tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                          {TYPE_LABELS[item.type]}
                        </div>
                        <div className="truncate font-display text-sm font-semibold">
                          {item.title}
                        </div>
                        <div className="truncate text-xs text-stone-600 dark:text-[#B8B4C2]">
                          {item.subtitle}
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        aria-label={`Quitar ${item.title} de favoritos`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-stone-500 hover:bg-stone-200 hover:text-[#641E2B] dark:text-[#B8B4C2] dark:hover:bg-white/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {favorites.length > 0 && (
              <div className="border-t border-stone-300/70 px-6 py-4 dark:border-[#C9A45C]/20">
                <button
                  type="button"
                  onClick={onClearAll}
                  className="w-full rounded-md border border-[#641E2B]/50 py-2 text-xs font-medium text-[#641E2B] transition-colors hover:bg-[#641E2B]/10 dark:text-[#E598A3]"
                >
                  Vaciar archivo guardado
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
