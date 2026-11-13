import { RigorClassification, PlaceClassification } from '../types/encyclopedia';

interface RigorLabelProps {
  label: RigorClassification | PlaceClassification;
  extra?: string;
}

const COLOR_MAP: Record<RigorClassification | PlaceClassification, string> = {
  'Mito tradicional': 'text-[#C9A45C]',
  'Creencia religiosa': 'text-[#D6B574]',
  'Leyenda popular': 'text-[#B8B4C2]',
  'Relato histórico': 'text-[#A3B8CC]',
  'Interpretación moderna': 'text-[#D48A95]',
  'Ficción': 'text-[#B8A5D6]',
  'Lugar histórico real': 'text-[#C9A45C]',
  'Lugar legendario': 'text-[#D6B574]',
  'Ubicación mítica o simbólica': 'text-[#B8A5D6]',
};

export function RigorLabel({ label, extra }: RigorLabelProps) {
  const accent = COLOR_MAP[label] || 'text-[#C9A45C]';
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide text-stone-600 dark:text-[#B8B4C2]">
      <span className={`font-medium ${accent}`}>{label}</span>
      {extra && (
        <>
          <span aria-hidden="true" className="text-stone-400 dark:text-[#B8B4C2]/50">
            ·
          </span>
          <span className="truncate max-w-[240px]">{extra}</span>
        </>
      )}
    </div>
  );
}
