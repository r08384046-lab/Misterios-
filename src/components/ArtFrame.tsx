import { useState } from 'react';
import { Compass } from 'lucide-react';
import { IMAGE_ACCENT_GRADIENTS, IMAGE_ASSETS } from '../assets/media';
import { ImageAssetKey } from '../types/encyclopedia';

interface ArtFrameProps {
  imageKey: ImageAssetKey;
  alt: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
}

export function ArtFrame({
  imageKey,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  fallbackTitle,
}: ArtFrameProps) {
  const [hasError, setHasError] = useState(false);
  const src = IMAGE_ASSETS[imageKey];
  const gradient = IMAGE_ACCENT_GRADIENTS[imageKey];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${imgClassName}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <Compass className="mb-3 h-8 w-8 text-[#C9A45C]/80" aria-hidden="true" />
          <span className="font-display text-sm tracking-wide text-white/90">
            {fallbackTitle || alt}
          </span>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090D]/85 via-[#08090D]/20 to-transparent"
      />
    </div>
  );
}
