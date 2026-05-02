import GithubLogo from "../../assets/icons/GithubLogo";

export default function Footer() {
  return (
    <footer className="hidden pb-10 lg:block">
      <div
        className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Left: GitHub */}
        <a
          href="https://github.com/SantWRL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Source Code no GitHub"
          className="group flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#64748b",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(59,130,246,0.1)";
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
            e.currentTarget.style.color = "#60a5fa";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          <GithubLogo />
          <span className="text-sm font-medium">GitHub</span>
        </a>

        {/* Right: Author credit */}
        <p className="text-xs" style={{ color: "#334155" }}>
          {"</"} feito com{" "}
          <span style={{ color: "#ec4899" }}>♡</span>
          {">"} por{" "}
          <a
            className="font-semibold transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link para o perfil de Patrick Santos"
            href="https://github.com/SantWRL"
            style={{ color: "#3b82f6" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#60a5fa";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#3b82f6";
            }}
          >
            Patrick Santos · SantWRL
          </a>
        </p>
      </div>
    </footer>
  );
}
