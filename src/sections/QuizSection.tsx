import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { QUIZ_DATA } from '../data/quizData';

type DifficultyMode = 'Todas (30)' | 'Básico' | 'Intermedio' | 'Erudito';

export function QuizSection() {
  const [mode, setMode] = useState<DifficultyMode>('Todas (30)');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => {
    if (mode === 'Todas (30)') return QUIZ_DATA;
    return QUIZ_DATA.filter((q) => q.difficulty === mode);
  }, [mode]);

  const currentQuestion = questions[currentIdx];

  const handleModeChange = (nextMode: DifficultyMode) => {
    setMode(nextMode);
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  const handleAnswer = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    if (optIdx === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <section
      id="quiz"
      className="border-t border-stone-300/60 py-20 sm:py-24 dark:border-[#C9A45C]/15"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#9A7735] uppercase dark:text-[#C9A45C]">
                10 · Desafío de Erudición
              </p>
              <h2
                style={{ textWrap: 'balance' }}
                className="mt-2 font-display text-2xl font-semibold text-stone-900 sm:text-4xl dark:text-white"
              >
                Test de Conocimiento Mitológico
              </h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-[#B8B4C2]">
                30 preguntas verificadas en tres niveles de dificultad con explicación documentada
                para cada respuesta.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['Todas (30)', 'Básico', 'Intermedio', 'Erudito'] as DifficultyMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleModeChange(m)}
                  className={`h-8 rounded-md px-3 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    mode === m
                      ? 'bg-[#C9A45C] text-[#08090D]'
                      : 'border border-stone-300/80 text-stone-700 hover:border-[#C9A45C] dark:border-white/10 dark:text-[#B8B4C2]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-stone-300/80 bg-white/90 p-6 sm:p-8 dark:border-[#C9A45C]/25 dark:bg-[#11131D]">
            {finished ? (
              <div className="py-6 text-center">
                <p className="text-xs font-medium tracking-widest text-[#9A7735] uppercase dark:text-[#C9A45C]">
                  Resultado Final · Nivel {mode}
                </p>
                <div className="mt-3 font-display text-5xl font-semibold text-stone-900 tabular-nums dark:text-white">
                  {score} / {questions.length}
                </div>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-stone-600 dark:text-[#B8B4C2]">
                  {score / questions.length >= 0.8
                    ? 'Dominio sobresaliente de las tradiciones mitológicas, fuentes clásicas y folclore internacional.'
                    : score / questions.length >= 0.5
                      ? 'Buen recorrido por los mitos universales. Puedes profundizar en las fichas de países y dioses para superar tu marca.'
                      : 'Un punto de partida prometedor para explorar el atlas de los 195 países y la sección especial de Paraguay.'}
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#C9A45C] px-6 text-xs font-semibold text-[#08090D] transition-colors hover:bg-[#D8B671]"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Volver a jugar</span>
                </button>
              </div>
            ) : (
              <div>
                {/* Progress & Score Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300/60 pb-4 text-xs dark:border-white/10">
                  <span className="font-medium text-[#9A7735] dark:text-[#C9A45C]">
                    Pregunta{' '}
                    <span className="font-mono tabular-nums">
                      {currentIdx + 1}/{questions.length}
                    </span>{' '}
                    · {currentQuestion.difficulty} · {currentQuestion.category}
                  </span>
                  <span className="font-mono text-stone-600 tabular-nums dark:text-[#B8B4C2]">
                    Puntuación: {score}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-white/10">
                  <div
                    className="h-full bg-[#C9A45C] transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-stone-900 sm:text-xl dark:text-white">
                  {currentQuestion.question}
                </h3>

                {/* 4 Options */}
                <div className="mt-5 grid gap-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const isAnswered = selectedOption !== null;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const isChosen = idx === selectedOption;

                    let stateClass =
                      'border-stone-300/80 bg-white/70 text-stone-800 hover:border-[#C9A45C] dark:border-white/15 dark:bg-[#0B0C13] dark:text-white/90';

                    if (isAnswered) {
                      if (isCorrect) {
                        stateClass =
                          'border-emerald-600/70 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200';
                      } else if (isChosen) {
                        stateClass =
                          'border-[#641E2B] bg-[#641E2B]/15 text-[#641E2B] dark:text-rose-200';
                      } else {
                        stateClass =
                          'border-stone-300/40 opacity-55 dark:border-white/5';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleAnswer(idx)}
                        className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3.5 text-left text-sm transition-colors ${stateClass}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#C9A45C] tabular-nums">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span>{opt}</span>
                        </span>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        )}
                        {isAnswered && isChosen && !isCorrect && (
                          <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation & Next */}
                {selectedOption !== null && (
                  <div className="mt-6 border-t border-stone-300/60 pt-5 dark:border-[#C9A45C]/15">
                    <p className="text-xs font-semibold tracking-wider text-[#9A7735] uppercase dark:text-[#C9A45C]">
                      {selectedOption === currentQuestion.correctIndex
                        ? 'Respuesta correcta'
                        : 'Aclaración documental'}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-700 dark:text-[#B8B4C2]">
                      {currentQuestion.explanation}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex h-10 items-center rounded-md bg-[#C9A45C] px-5 text-xs font-semibold text-[#08090D] transition-colors hover:bg-[#D8B671]"
                      >
                        {currentIdx + 1 >= questions.length
                          ? 'Ver resultado final'
                          : 'Siguiente pregunta'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
