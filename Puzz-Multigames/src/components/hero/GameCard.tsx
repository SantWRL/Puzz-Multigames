import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export type GameCardPropsType = {
  title: string;
  link: string;
  description: string;
  imageUrl: string;
  badge?: string;
  badgeColor?: string;
};

const badgeStyles: Record<string, string> = {
  purple: "bg-neon-blue/20 text-neon-blue-light border border-neon-blue/30",
  cyan: "bg-neon-cyan/20 text-neon-cyan-light border border-neon-cyan/30",
  pink: "bg-neon-pink/20 text-pink-300 border border-neon-pink/30",
  green: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  yellow: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  orange: "bg-orange-500/20 text-orange-300 border border-orange-500/30",
  red: "bg-red-500/20 text-red-300 border border-red-500/30",
};

export default function GameCard(props: GameCardPropsType) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const badge = props.badge ?? "Jogo";
  const badgeColor = props.badgeColor ?? "purple";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <Link
      to={props.link}
      ref={cardRef as React.RefObject<HTMLAnchorElement>}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        border: isHovered
          ? "1px solid rgba(59,130,246,0.5)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.2)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Shimmer overlay on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.08) 50%, transparent 60%)",
            animation: isHovered ? "shimmer 1.5s infinite" : "none",
          }}
        />
      </div>

      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {isLoading && (
          <div
            className="absolute inset-0 animate-pulse"
            style={{ background: "rgba(59,130,246,0.08)" }}
          />
        )}
        <img
          alt={props.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ display: isLoading ? "none" : "block" }}
          src={isVisible ? props.imageUrl : ""}
          onLoad={() => setIsLoading(false)}
        />
        {/* Gradient overlay at bottom of image */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(10,10,15,0.8))",
          }}
        />

        {/* Play icon on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              boxShadow: "0 0 30px rgba(59,130,246,0.6)",
            }}
          >
            <svg
              className="h-6 w-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-4">
        {/* Badge */}
        <span className={`game-badge w-fit ${badgeStyles[badgeColor]}`}>
          {badge}
        </span>

        <h3
          className="text-base font-bold leading-tight"
          style={{ color: "#f1f5f9" }}
        >
          {props.title}
        </h3>
        <p
          className="hidden text-sm leading-relaxed lg:block"
          style={{ color: "#64748b" }}
        >
          {props.description}
        </p>

        {/* Bottom arrow */}
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ color: "#60a5fa" }}>
          Jogar agora
          <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
