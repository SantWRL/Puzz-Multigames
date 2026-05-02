import { Link } from "react-router-dom";
import Logo from "../../assets/icons/Logo";
import { SidebarNavLink } from "../components/SidebarNavLink";

export default function Header() {
  return (
    <header className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
      <div
        className="contents lg:pointer-events-auto lg:block lg:overflow-y-auto lg:pb-8 scrollbar-thin"
        style={{
          width: "272px",
          background: "rgba(10,10,15,0.97)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div
          className="hidden lg:flex lg:flex-col"
          style={{
            padding: "24px 20px 16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Link
            to="/"
            aria-label="Home"
            className="group flex items-center gap-3"
          >
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.2))",
                border: "1px solid rgba(59,130,246,0.3)",
                boxShadow: "0 0 20px rgba(59,130,246,0.2)",
              }}
            >
              <Logo />
            </span>
            <div className="flex flex-col">
              <span
                className="text-lg font-extrabold leading-none tracking-tight transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #f1f5f9, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Puzz
              </span>
              <span
                className="text-[10px] font-medium tracking-widest uppercase"
                style={{ color: "#475569" }}
              >
                Hub de Jogos
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:block" style={{ padding: "20px 12px" }}>
          <p
            className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#334155" }}
          >
            Jogos
          </p>
          <ul role="list" className="space-y-1">
            <SidebarNavLink />
          </ul>
        </nav>

        {/* Bottom decoration */}
        <div
          className="hidden lg:block"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background:
              "linear-gradient(to top, rgba(59,130,246,0.05), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </header>
  );
}
