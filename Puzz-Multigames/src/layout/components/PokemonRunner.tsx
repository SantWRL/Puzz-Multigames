import { useEffect, useState, useRef } from "react";
import ConfettiComponent from "../../components/modal/ConfettiComponent";

interface Runner {
  id: number;
  name: string;
  image: string;
  x: number;
  y: number;
  speed: number;
  direction: number; // 1 for right, -1 for left
  caught: boolean;
}

export default function PokemonRunner() {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [guess, setGuess] = useState("");
  const [activeCatch, setActiveCatch] = useState<Runner | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const nextId = useRef(0);

  const spawnPokemon = async () => {
    try {
      const id = Math.floor(Math.random() * 151) + 1; // Gen 1
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      
      const direction = Math.random() > 0.5 ? 1 : -1;
      const x = direction === 1 ? -100 : window.innerWidth + 100;
      const y = Math.random() * (window.innerHeight - 200) + 100;
      
      const newRunner: Runner = {
        id: nextId.current++,
        name: data.name,
        image: data.sprites.versions["generation-v"]["black-white"].animated.front_default || data.sprites.front_default,
        x,
        y,
        speed: Math.random() * 2 + 1,
        direction,
        caught: false
      };
      
      setRunners(prev => [...prev, newRunner]);
    } catch (e) {
      console.error("Spawn failed", e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3 && runners.length < 3 && !activeCatch) {
        spawnPokemon();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [runners.length, activeCatch]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (activeCatch) return;
      
      setRunners(prev => {
        return prev.map(r => ({
          ...r,
          x: r.x + (r.speed * r.direction)
        })).filter(r => {
          if (r.direction === 1) return r.x < window.innerWidth + 200;
          return r.x > -200;
        });
      });
    }, 16);
    return () => clearInterval(moveInterval);
  }, [activeCatch]);

  const handleCatch = (runner: Runner) => {
    setActiveCatch(runner);
    setGuess("");
  };

  const checkGuess = () => {
    if (!activeCatch) return;
    if (guess.toLowerCase().trim() === activeCatch.name.toLowerCase()) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setRunners(prev => prev.filter(r => r.id !== activeCatch.id));
        setActiveCatch(null);
      }, 3000);
    } else {
      // Shake or something
      const input = document.getElementById("pk-input");
      input?.classList.add("animate-shake");
      setTimeout(() => input?.classList.remove("animate-shake"), 500);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {showConfetti && <ConfettiComponent />}
      
      {runners.map(r => (
        <div
          key={r.id}
          className="pointer-events-auto absolute cursor-pointer transition-transform hover:scale-110"
          style={{
            left: r.x,
            top: r.y,
            transform: `scaleX(${r.direction * -1})`
          }}
          onClick={() => handleCatch(r)}
        >
          <img src={r.image} alt="???" className="h-16 w-16 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
        </div>
      ))}

      {activeCatch && (
        <div className="pointer-events-auto fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-zinc-900 p-8 shadow-2xl ring-2 ring-blue-500/50">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase">Quem é esse Pokémon?</h2>
            <div className="relative h-48 w-48 rounded-full bg-white/5 flex items-center justify-center p-8">
               <img src={activeCatch.image} alt="pokemon" className="h-full w-full object-contain brightness-0 invert opacity-50" />
            </div>
            <div className="flex gap-2">
              <input
                id="pk-input"
                type="text"
                autoFocus
                placeholder="Nome do Pokémon..."
                className="w-64 rounded-xl bg-white/5 p-4 text-center font-bold text-white outline-none ring-1 ring-white/10 focus:ring-blue-500"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkGuess()}
              />
              <button 
                onClick={checkGuess}
                className="rounded-xl bg-blue-600 px-6 font-bold text-white hover:bg-blue-500 transition-colors"
              >
                GO!
              </button>
            </div>
            <button 
              onClick={() => setActiveCatch(null)}
              className="text-xs text-zinc-500 hover:text-white underline"
            >
              Fugir da batalha
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
