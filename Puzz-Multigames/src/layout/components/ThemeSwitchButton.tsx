import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ThemeSwitchButton() {
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("theme", "dark");

  const handleToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label="Alternar modo escuro"
      className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(139,92,246,0.15)";
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4" style={{ stroke: "#a78bfa" }} />
      ) : (
        <MoonIcon className="h-4 w-4" style={{ stroke: "#a78bfa" }} />
      )}
    </button>
  );
}
