import { NavLink } from "react-router-dom";

type LinkType = {
  category: string;
  emoji: string;
  games: {
    name: string;
    link: string;
    color: string;
  }[];
};

const LINKS: LinkType[] = [
  {
    category: "Puzzle",
    emoji: "🧩",
    games: [
      { name: "Quebra-cabeça", link: "puzzle", color: "#22d3ee" },
      { name: "2048", link: "2048", color: "#60a5fa" },
    ],
  },
  {
    category: "Palavras",
    emoji: "📝",
    games: [
      { name: "Wordle", link: "wordle", color: "#34d399" },
    ],
  },
  {
    category: "Memória",
    emoji: "🃏",
    games: [
      { name: "Jogo da Memória", link: "memorymatch", color: "#f472b6" },
    ],
  },
  {
    category: "Arcade",
    emoji: "🕹️",
    games: [
      { name: "Cobrinha", link: "snake", color: "#eab308" },
      { name: "Neon Racer", link: "racer", color: "#f97316" },
      { name: "Jogo da Velha", link: "tictactoe", color: "#ef4444" },
    ],
  },
];

export interface ISidebarNavLinkProps {
  closeModal?: () => void;
}

export function SidebarNavLink(props: ISidebarNavLinkProps) {
  return (
    <>
      {LINKS.map((category, catIndex) => (
        <li key={catIndex} style={{ listStyle: "none" }}>
          {/* Category header */}
          <div
            className="flex items-center gap-2 px-2 pt-4 pb-2"
          >
            <span className="text-sm">{category.emoji}</span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#334155" }}
            >
              {category.category}
            </span>
          </div>

          {/* Games in category */}
          <ul role="list" className="space-y-0.5">
            {category.games.map((game, gIndex) => (
              <li key={gIndex} style={{ listStyle: "none" }}>
                <NavLink
                  to={`/${game.link}`}
                  onClick={() => props.closeModal?.()}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200"
                  style={({ isActive }) => ({
                    background: isActive
                      ? `rgba(${hexToRgb(game.color)},0.12)`
                      : "transparent",
                    color: isActive ? game.color : "#64748b",
                    border: isActive
                      ? `1px solid rgba(${hexToRgb(game.color)},0.25)`
                      : "1px solid transparent",
                    boxShadow: isActive
                      ? `0 0 12px rgba(${hexToRgb(game.color)},0.15)`
                      : "none",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {/* Dot indicator */}
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? game.color : "#334155",
                          boxShadow: isActive
                            ? `0 0 6px ${game.color}`
                            : "none",
                        }}
                      />
                      {game.name}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      ))}
      <div className="flex-1" />
    </>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "139,92,246";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
