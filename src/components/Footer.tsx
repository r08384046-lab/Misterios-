import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className="fixed right-5 bottom-5 z-30 flex h-11 w-11 items-center justify-center rounded-md border border-[#C9A45C]/50 bg-[#08090D]/90 text-[#C9A45C] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#C9A45C] hover:text-[#08090D]"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-stone-300/70 bg-[#EBE6DF] py-12 text-stone-700 dark:border-[#C9A45C]/15 dark:bg-[#06070A] dark:text-[#B8B4C2]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-lg">
            <h2 className="font-display text-lg font-semibold tracking-wider text-stone-900 dark:text-white">
              MISTERIOS DEL MUNDO
            </h2>
            <p className="mt-2 text-sm leading-relaxed">
              Enciclopedia internacional de mitos, leyendas, deidades, criaturas y tradiciones
              culturales de los 195 países del mundo. Divulgación respetuosa con rigor histórico y
              antropológico.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium">
            <a href="#paises" className="hover:text-[#C9A45C]">
              195 Países
            </a>
            <a href="#mitologias" className="hover:text-[#C9A45C]">
              Mitologías
            </a>
            <a href="#paraguay" className="hover:text-[#C9A45C]">
              Especial Paraguay
            </a>
            <a href="#comparador" className="hover:text-[#C9A45C]">
              Comparador
            </a>
            <a href="#quiz" className="hover:text-[#C9A45C]">
              Test (30 Preguntas)
            </a>
            <a href="#rigor" className="hover:text-[#C9A45C]">
              Fuentes y Rigor
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-300/60 pt-6 text-xs text-stone-500 dark:border-white/10 dark:text-[#B8B4C2]/70">
          MISTERIOS DEL MUNDO – El universo de los mitos y leyendas · Patrimonio cultural y
          tradición oral universal.
        </div>
      </div>
    </footer>
  );
}
