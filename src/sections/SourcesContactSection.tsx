import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, BookMarked } from 'lucide-react';
import { RIGOR_DEFINITIONS, BIBLIOGRAPHIC_SOURCES } from '../data/galleryData';

export function SourcesContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Aporte folclórico regional');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section
      id="rigor"
      className="border-t border-stone-300/60 py-20 sm:py-24 dark:border-[#C9A45C]/15"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Epistemological Rigor Grid */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
            12 · Metodología, Fuentes y Rigor Cultural
          </p>
          <h2
            style={{ textWrap: 'balance' }}
            className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
          >
            Distinción entre Mito, Leyenda, Historia y Creencia Viva
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-[#B8B4C2]">
            Cada ficha de Misterios del Mundo declara explícitamente la naturaleza cultural de su
            contenido, evitando atribuir relatos a países ajenos o presentar especulaciones modernas
            como hechos antiguos.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RIGOR_DEFINITIONS.map((def) => (
            <div
              key={def.label}
              className="rounded-lg border border-stone-300/80 bg-white/80 p-5 dark:border-white/10 dark:bg-[#10111A]"
            >
              <h3 className="font-display text-base font-semibold text-[#9A7735] dark:text-[#C9A45C]">
                {def.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-700 sm:text-sm dark:text-[#B8B4C2]">
                {def.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bibliography & Contact 2-Col Split */}
        <div
          id="contacto"
          className="mt-16 grid gap-10 border-t border-stone-300/60 pt-14 lg:grid-cols-12 dark:border-[#C9A45C]/15"
        >
          {/* Bibliographic Sources */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
              <BookMarked className="h-4 w-4" aria-hidden="true" />
              <span>Bibliografía y Archivos de Referencia</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold text-stone-900 dark:text-white">
              Fuentes Primarias y Museográficas
            </h3>

            <ul className="mt-6 divide-y divide-stone-300/60 border-t border-b border-stone-300/60 dark:divide-white/10 dark:border-white/10">
              {BIBLIOGRAPHIC_SOURCES.map((src) => (
                <li key={src.title} className="py-3.5">
                  <div className="font-display text-sm font-semibold text-stone-900 dark:text-white">
                    {src.title}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-600 dark:text-[#B8B4C2]">
                    {src.author} · <span className="text-[#9A7735] dark:text-[#C9A45C]">{src.scope}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Cultural Contribution Form */}
          <div className="rounded-lg border border-stone-300/80 bg-white/85 p-6 sm:p-8 lg:col-span-6 dark:border-[#C9A45C]/25 dark:bg-[#11131D]">
            <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
              Contacto y Archivo Colaborativo
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-stone-900 dark:text-white">
              Propón Fuentes o Tradiciones Regionales
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm dark:text-[#B8B4C2]">
              ¿Conoces una variante regional documentada, archivo museográfico o corrección
              lingüística? Envíanos tu nota editorial.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-md border border-emerald-500/40 bg-emerald-500/10 p-5">
                <div className="flex items-center gap-2 font-display text-base font-semibold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Consulta registrada correctamente</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                  Gracias por contribuir al rigor cultural de Misterios del Mundo. Tu mensaje ha sido
                  registrado en esta sesión para revisión documental.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#9A7735] underline dark:text-[#C9A45C]"
                >
                  Enviar otro aporte
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-[#B8B4C2]"
                    >
                      Nombre o institución
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none focus:border-[#C9A45C] dark:border-white/15 dark:bg-[#0A0B11] dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-[#B8B4C2]"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none focus:border-[#C9A45C] dark:border-white/15 dark:bg-[#0A0B11] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-[#B8B4C2]"
                  >
                    Área temática
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-10 w-full rounded-md border border-stone-300 bg-white px-3 text-sm outline-none focus:border-[#C9A45C] dark:border-white/15 dark:bg-[#0A0B11] dark:text-white"
                  >
                    <option value="Aporte folclórico regional">Aporte folclórico regional</option>
                    <option value="Referencia bibliográfica o museo">
                      Referencia bibliográfica o museo
                    </option>
                    <option value="Corrección lingüística o guaraní">
                      Corrección lingüística o guaraní
                    </option>
                    <option value="Consulta editorial general">Consulta editorial general</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-[#B8B4C2]"
                  >
                    Mensaje y fuentes citadas
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe la tradición, país o referencia académica..."
                    className="w-full rounded-md border border-stone-300 bg-white p-3 text-sm outline-none focus:border-[#C9A45C] dark:border-white/15 dark:bg-[#0A0B11] dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#C9A45C] px-6 text-xs font-semibold text-[#08090D] transition-colors hover:bg-[#D8B671]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Enviar al archivo editorial</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
