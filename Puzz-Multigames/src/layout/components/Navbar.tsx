import { useEffect, useRef, useState } from "react";
import ThemeSwitchButton from "./ThemeSwitchButton";
import Logo from "../../assets/icons/Logo";
import { Link } from "react-router-dom";
import { SidebarNavLink } from "./SidebarNavLink";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        ref={navRef}
        className="sticky top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 sm:px-6 lg:left-72 lg:z-30 lg:px-8 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10,10,15,0.85)"
            : "rgba(10,10,15,0.5)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(59,130,246,0.15)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        {/* Mobile logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link to="/" aria-label="Home" className="flex items-center gap-2">
            <span className="h-8 w-8"
              style={{
                filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))",
              }}
            >
              <Logo />
            </span>
            <span
              className="text-lg font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Puzz-Multigames
            </span>
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex w-full items-center justify-end gap-3">
          <ThemeSwitchButton />

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 lg:hidden"
            style={{
              background: open
                ? "rgba(59,130,246,0.2)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            aria-label="Toggle navigation"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span
              className="relative flex h-4 w-4 flex-col justify-between"
              aria-hidden="true"
            >
              <span
                className="block h-0.5 w-full rounded-full transition-all duration-300"
                style={{
                  background: "#60a5fa",
                  transform: open ? "rotate(45deg) translateY(6px)" : "none",
                }}
              />
              <span
                className="block h-0.5 w-full rounded-full transition-all duration-300"
                style={{
                  background: "#60a5fa",
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block h-0.5 w-full rounded-full transition-all duration-300"
                style={{
                  background: "#60a5fa",
                  transform: open ? "rotate(-45deg) translateY(-6px)" : "none",
                }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 top-14 z-40 lg:hidden transition-all duration-300"
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <div
          className="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto scrollbar-thin transition-transform duration-300 ease-out"
          style={{
            background: "rgba(15,15,26,0.98)",
            borderRight: "1px solid rgba(59,130,246,0.2)",
            boxShadow: "4px 0 40px rgba(0,0,0,0.5)",
            transform: open ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="p-6">
            {/* Logo in drawer */}
            <Link
              to="/"
              className="mb-8 flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <span className="h-9 w-9"
                style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))" }}
              >
                <Logo />
              </span>
              <span
                className="text-xl font-extrabold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #60a5fa, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Puzz-Multigames
              </span>
            </Link>

            <nav>
              <ul role="list" className="space-y-1">
                <SidebarNavLink closeModal={() => setOpen(false)} />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
