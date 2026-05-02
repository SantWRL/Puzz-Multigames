import { lazy, Suspense } from "react";
import { GameCardPropsType } from "./GameCard";
import PageMeta from "../utility/PageMeta";

const GameCard = lazy(() => import("./GameCard"));

const GameCardFallback: React.FC<GameCardPropsType> = (props) => {
  return (
    <Suspense
      fallback={
        <div
          className="animate-pulse rounded-2xl"
          style={{
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
            minHeight: "280px",
          }}
        />
      }
    >
      <GameCard
        imageUrl={props.imageUrl}
        title={props.title}
        link={props.link}
        description={props.description}
        badge={props.badge}
        badgeColor={props.badgeColor}
      />
    </Suspense>
  );
};

const games = [
  {
    imageUrl: "/assets/2048Icon.png",
    link: "/2048",
    title: "2048",
    description: "Combine tiles do mesmo número para atingir a pontuação máxima de 2048.",
    badge: "Estratégia",
    badgeColor: "purple",
  },
  {
    imageUrl: "/assets/puzzleIcon.png",
    link: "/puzzle",
    title: "Quebra-cabeça",
    description: "Monte o quebra-cabeça deslizando os tiles até a posição correta.",
    badge: "Puzzle",
    badgeColor: "cyan",
  },
  {
    imageUrl: "/assets/wordleIcon.png",
    link: "/wordle",
    title: "Wordle",
    description: "Adivinhe a palavra secreta em 6 tentativas — teste seu vocabulário.",
    badge: "Palavras",
    badgeColor: "green",
  },
  {
    imageUrl: "/assets/memoryMatch-min.png",
    link: "/memorymatch",
    title: "Jogo da Memória",
    description: "Vire e combine os pares de cartas para revelar padrões ocultos.",
    badge: "Memória",
    badgeColor: "pink",
  },
  {
    imageUrl: "/assets/snakeIcon.png",
    link: "/snake",
    title: "Cobrinha",
    description: "Coma as maçãs para crescer sem bater nas paredes ou no próprio corpo.",
    badge: "Arcade",
    badgeColor: "yellow",
  },
  {
    imageUrl: "/assets/racerIcon.png",
    link: "/racer",
    title: "Neon Racer",
    description: "Desvie dos obstáculos e sobreviva o máximo possível na pista Neon.",
    badge: "Arcade",
    badgeColor: "orange",
  },
  {
    imageUrl: "/assets/tictactoeIcon.png",
    link: "/tictactoe",
    title: "Jogo da Velha",
    description: "Desafie a máquina ou um amigo no clássico jogo de estratégia 3x3.",
    badge: "Clássico",
    badgeColor: "red",
  },
];

export default function Hero() {
  return (
    <>
      <PageMeta
        title="Puzz | Hub de Jogos"
        description="Puzz by SantWRL — seu destino para jogos de puzzle, memória e palavras. Offline, rápido e viciante."
      />

      {/* Hero Header */}
      <div
        className="relative mb-12 overflow-hidden rounded-3xl px-8 py-12"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(6,182,212,0.08) 50%, rgba(236,72,153,0.06) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Background decoration */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative z-10">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: "#8b5cf6" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#a78bfa" }}>
              Hub Offline · PWA
            </span>
          </div>

          <h1
            className="mb-3 text-4xl font-extrabold leading-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #f1f5f9 0%, #a78bfa 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Bem-vindo ao Puzz
          </h1>
          <p className="max-w-lg text-base leading-relaxed" style={{ color: "#64748b" }}>
            Escolha um jogo e divirta-se. Todos os jogos funcionam offline — seus dados salvam automaticamente no browser.
          </p>

          {/* Stats row */}
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { value: "7", label: "Jogos" },
              { value: "∞", label: "Rodadas" },
              { value: "100%", label: "Offline" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-extrabold" style={{ color: "#a78bfa" }}>
                  {stat.value}
                </span>
                <span className="text-xs font-medium" style={{ color: "#475569" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#475569" }}>
          Todos os Jogos
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Games grid */}
      <div className="mb-16 grid w-full grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <GameCardFallback key={game.link} {...game} />
        ))}
      </div>
    </>
  );
}
