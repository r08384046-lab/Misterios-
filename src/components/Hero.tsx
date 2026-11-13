import { motion } from 'motion/react';
import { Compass, Sparkles, Globe2, ArrowRight } from 'lucide-react';
import { IMAGE_ASSETS } from '../assets/media';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[88vh] items-end overflow-hidden pt-20 pb-14 sm:pb-20"
    >
      {/* Background Illustration */}
      <div className="absolute inset-0 -z-10">
        <img
          src={IMAGE_ASSETS.hero}
          alt="Ilustración cinematográfica que reúne templos clásicos griegos, estela rúnica nórdica y pirámide mesoamericana bajo cielo estrellado"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/68 to-[#24143B]/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08090D]/90 via-[#08090D]/45 to-transparent"
        />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-medium tracking-[0.22em] text-[#C9A45C] uppercase">
            MISTERIOS DEL MUNDO · Enciclopedia Mitológica Internacional
          </p>

          <h1
            style={{ textWrap: 'balance' }}
            className="font-display text-3xl leading-[1.12] font-semibold tracking-wide text-white sm:text-5xl lg:text-[3.5rem]"
          >
            LOS SECRETOS QUE EL MUNDO NUNCA OLVIDÓ
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#B8B4C2] sm:text-lg">
            Explora las antiguas historias, criaturas, dioses y leyendas que dieron forma a las
            culturas de la humanidad.
          </p>

          {/* CTA Cluster: 1 primary gold anchor + 2 subtle hairline actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#mitologias"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-[#C9A45C] px-6 text-sm font-semibold text-[#08090D] transition-colors hover:bg-[#D8B671] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A45C]"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>Explorar mitologías</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#criaturas"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-[#C9A45C]/40 bg-[#08090D]/60 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[#C9A45C] hover:bg-[#24143B]/60 whitespace-nowrap shrink-0"
            >
              <Sparkles className="h-4 w-4 text-[#C9A45C]" aria-hidden="true" />
              <span>Descubrir criaturas</span>
            </a>

            <a
              href="#paises"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 bg-[#08090D]/50 px-5 text-sm font-medium text-[#B8B4C2] backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white whitespace-nowrap shrink-0"
            >
              <Globe2 className="h-4 w-4 text-[#C9A45C]" aria-hidden="true" />
              <span>Viajar por el mundo</span>
            </a>
          </div>

          {/* Curatorial Summary Bar */}
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[#C9A45C]/20 pt-6 sm:grid-cols-4">
            <div>
              <div className="font-display text-2xl font-semibold text-white tabular-nums">195</div>
              <div className="mt-0.5 text-xs text-[#B8B4C2]">Países catalogados</div>
            </div>
            <div>
              <div className="font-display text-2xl font-semibold text-white tabular-nums">37</div>
              <div className="mt-0.5 text-xs text-[#B8B4C2]">Tradiciones mitológicas</div>
            </div>
            <div>
              <div className="font-display text-2xl font-semibold text-white tabular-nums">32</div>
              <div className="mt-0.5 text-xs text-[#B8B4C2]">Criaturas legendarias</div>
            </div>
            <div>
              <div className="font-display text-2xl font-semibold text-[#C9A45C] tabular-nums">
                Paraguay
              </div>
              <div className="mt-0.5 text-xs text-[#B8B4C2]">Archivo especial guaraní</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
