import { useState } from "react";
import { ArrowPathIcon, InformationCircleIcon, UsersIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import PageMeta from "../../utility/PageMeta";
import { BasicModal } from "../../modal/BasicModal";
import ConfettiComponent from "../../modal/ConfettiComponent";
import { classNames } from "../../../utility/css";
import useLocalStorage from "../../../hooks/useLocalStorage";

type Player = "X" | "O" | null;
type Mode = "pvp" | "pve";

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const OIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export default function TicTacToeBoard() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState<Mode>("pve");
  const [showInfo, setShowInfo] = useState(false);
  const [stats, setStats] = useLocalStorage("tictactoe-stats", { xWins: 0, oWins: 0, draws: 0 });

  const calculateWinner = (squares: Player[]) => {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: WINNING_COMBINATIONS[i] };
      }
    }
    return null;
  };

  const winData = calculateWinner(board);
  const winner = winData?.player;
  const winLine = winData?.line;
  const isDraw = !winner && board.every((square) => square !== null);
  const isGameOver = !!winner || isDraw;

  const handleWin = (w: Player) => {
    if (w === "X") setStats((s) => ({ ...s, xWins: s.xWins + 1 }));
    else if (w === "O") setStats((s) => ({ ...s, oWins: s.oWins + 1 }));
  };

  const handleClick = (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    
    const newWinData = calculateWinner(newBoard);
    if (newWinData) {
      handleWin(newWinData.player);
    } else if (newBoard.every((s) => s !== null)) {
      setStats((s) => ({ ...s, draws: s.draws + 1 }));
    }

    setXIsNext(!xIsNext);

    if (mode === "pve" && !newWinData && !newBoard.every((s) => s !== null)) {
      setTimeout(() => {
        const emptyIndices = newBoard.map((val, i) => val === null ? i : null).filter(val => val !== null) as number[];
        let move = -1;
        
        for (let i of emptyIndices) {
          const testBoard = [...newBoard];
          testBoard[i] = "O";
          if (calculateWinner(testBoard)?.player === "O") { move = i; break; }
        }
        
        if (move === -1) {
          for (let i of emptyIndices) {
            const testBoard = [...newBoard];
            testBoard[i] = "X";
            if (calculateWinner(testBoard)?.player === "X") { move = i; break; }
          }
        }

        if (move === -1) {
          move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }

        const afterAIBoard = [...newBoard];
        afterAIBoard[move] = "O";
        setBoard(afterAIBoard);
        
        const aiWinData = calculateWinner(afterAIBoard);
        if (aiWinData) {
          handleWin(aiWinData.player);
        } else if (afterAIBoard.every((s) => s !== null)) {
          setStats((s) => ({ ...s, draws: s.draws + 1 }));
        }
        
        setXIsNext(true);
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <>
      <PageMeta
        title="ManyGames | Jogo da Velha"
        description="O clássico jogo da velha com um visual Dark Neon premium."
      />
      <div className="flex w-full flex-col-reverse items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:pt-8">
        
        <div className="relative flex w-full flex-col gap-6 max-w-sm group">
          {/* Neon Background Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500/20 to-blue-500/20 blur opacity-75 transition duration-1000 group-hover:opacity-100"></div>

          {/* Game Board */}
          <div className="relative grid aspect-square w-full grid-cols-3 grid-rows-3 gap-3 rounded-2xl bg-zinc-950/80 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-white/10">
            {board.map((cell, index) => {
              const isWinCell = winLine?.includes(index);

              return (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  disabled={cell !== null || isGameOver || (mode === "pve" && !xIsNext)}
                  className={classNames(
                    "group/cell relative flex items-center justify-center rounded-xl transition-all duration-300",
                    cell === null && !isGameOver ? "bg-white/5 hover:bg-white/10 hover:scale-[0.98]" : "bg-white/[0.02]",
                    isWinCell ? (winner === "X" ? "bg-red-500/20 ring-2 ring-red-500" : "bg-blue-500/20 ring-2 ring-blue-500") : ""
                  )}
                >
                  {cell === "X" && (
                    <XIcon className="h-3/5 w-3/5 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-in fade-in zoom-in duration-300" />
                  )}
                  {cell === "O" && (
                    <OIcon className="h-3/5 w-3/5 text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-in fade-in zoom-in duration-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div className="relative flex justify-between items-center rounded-2xl bg-white/[0.03] backdrop-blur-md p-5 ring-1 ring-white/10">
            <div className={classNames("flex flex-col items-center transition-opacity duration-300", !xIsNext && !isGameOver ? "opacity-40" : "opacity-100")}>
              <span className="text-red-500 font-bold text-xs uppercase tracking-widest mb-1">X Player</span>
              <span className="text-3xl font-black text-white">{stats.xWins}</span>
              {xIsNext && !isGameOver && <div className="mt-1 h-1 w-8 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mb-1">Draws</span>
              <span className="text-xl font-bold text-zinc-300">{stats.draws}</span>
            </div>
            <div className={classNames("flex flex-col items-center transition-opacity duration-300", xIsNext && !isGameOver ? "opacity-40" : "opacity-100")}>
              <span className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-1">{mode === "pve" ? "O Engine" : "O Player"}</span>
              <span className="text-3xl font-black text-white">{stats.oWins}</span>
              {!xIsNext && !isGameOver && <div className="mt-1 h-1 w-8 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="flex w-full flex-col gap-5 lg:w-72">
          <div className="flex w-full justify-end gap-3">
             <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 ring-1 ring-white/10">
                <button
                  onClick={() => { setMode("pve"); resetGame(); }}
                  className={classNames("flex h-9 px-3 items-center gap-2 rounded-md text-xs font-bold transition-all", mode === "pve" ? "bg-white/10 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300")}
                >
                  <ComputerDesktopIcon className="h-4 w-4" />
                  VS CPU
                </button>
                <button
                  onClick={() => { setMode("pvp"); resetGame(); }}
                  className={classNames("flex h-9 px-3 items-center gap-2 rounded-md text-xs font-bold transition-all", mode === "pvp" ? "bg-white/10 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300")}
                >
                  <UsersIcon className="h-4 w-4" />
                  2 PLAYERS
                </button>
             </div>
            <button
              onClick={() => setShowInfo(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-white/10"
              aria-label="Como jogar"
            >
              <InformationCircleIcon className="h-6 w-6 text-zinc-400" />
            </button>
          </div>

          <button
            className="group relative w-full overflow-hidden rounded-xl bg-zinc-900 p-4 transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={resetGame}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-center text-lg font-bold text-white flex items-center justify-center gap-2">
              <ArrowPathIcon className="h-5 w-5" />
              Reiniciar Partida
            </span>
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
            {winner ? (
              <div className="text-center animate-bounce">
                <p className="text-sm font-bold uppercase tracking-[0.2em] mb-1" style={{ color: winner === "X" ? "#ef4444" : "#3b82f6" }}>Vencedor</p>
                <p className="text-4xl font-black text-white">JOGADOR {winner}</p>
              </div>
            ) : isDraw ? (
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] mb-1 text-zinc-500">Empate</p>
                <p className="text-4xl font-black text-zinc-300">DEU VELHA!</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-zinc-600">Aguardando jogada</p>
                <div className="flex items-center gap-3">
                   <div className={classNames("h-10 w-10 rounded-lg flex items-center justify-center ring-1 transition-all duration-500", xIsNext ? "bg-red-500/20 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : "bg-white/5 ring-white/10 opacity-20")}>
                      <XIcon className="h-6 w-6 text-red-500" />
                   </div>
                   <div className="h-px w-4 bg-zinc-800" />
                   <div className={classNames("h-10 w-10 rounded-lg flex items-center justify-center ring-1 transition-all duration-500", !xIsNext ? "bg-blue-500/20 ring-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-white/5 ring-white/10 opacity-20")}>
                      <OIcon className="h-6 w-6 text-blue-500" />
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BasicModal
        title="Como Jogar"
        isOpen={showInfo}
        closeModal={() => setShowInfo(false)}
      >
        <div className="mt-4 space-y-3 text-sm text-zinc-300 leading-relaxed">
          <p>
            O clássico Jogo da Velha reinventado com visual Dark Neon. O objetivo é alinhar três símbolos iguais em qualquer direção.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <p className="flex items-center gap-2"><UsersIcon className="h-4 w-4 text-zinc-400" /> <strong>Local:</strong> Jogue contra um amigo na mesma tela.</p>
            <p className="flex items-center gap-2"><ComputerDesktopIcon className="h-4 w-4 text-zinc-400" /> <strong>Bot:</strong> Desafie nossa inteligência artificial.</p>
          </div>
          <ul className="list-disc space-y-1 pl-5">
            <li>O jogador X sempre começa.</li>
            <li>Suas vitórias e empates ficam salvos no navegador!</li>
          </ul>
        </div>
      </BasicModal>

      {winner && <ConfettiComponent />}
    </>
  );
}
