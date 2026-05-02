import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowPathIcon, PlayIcon, PauseIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSwipeable } from "react-swipeable";
import PageMeta from "../../utility/PageMeta";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { BasicModal } from "../../modal/BasicModal";
import ConfettiComponent from "../../modal/ConfettiComponent";
import { useHotkey } from "../../../hooks/useHotKey";
import { classNames } from "../../../utility/css";

const LANES = [0, 1, 2];
const PLAYER_BOTTOM_POS = 15; // percentage from bottom
const OBSTACLE_HEIGHT = 20; // Increased to match 1:2 aspect ratio
const CAR_HEIGHT = 20;
const GAME_SPEED = 2; // how much 'top' increases per tick

type Obstacle = {
  id: number;
  lane: number;
  top: number;
};

const CarSprite = ({ 
  colorClass, 
  shadowClass, 
  isEnemy = false 
}: { 
  colorClass: string; 
  shadowClass: string; 
  isEnemy?: boolean;
}) => (
  <div className={classNames("relative h-full w-[45%] rounded-md", colorClass, shadowClass)}>
    {/* Tires */}
    <div className="absolute -left-1.5 top-[15%] h-[20%] w-1.5 rounded-l-sm bg-zinc-950" />
    <div className="absolute -right-1.5 top-[15%] h-[20%] w-1.5 rounded-r-sm bg-zinc-950" />
    <div className="absolute -left-1.5 bottom-[15%] h-[20%] w-1.5 rounded-l-sm bg-zinc-950" />
    <div className="absolute -right-1.5 bottom-[15%] h-[20%] w-1.5 rounded-r-sm bg-zinc-950" />
    
    {/* Roof */}
    <div className="absolute inset-x-2 inset-y-[25%] rounded-sm bg-white/20" />

    {/* Windshield */}
    <div className={classNames(
      "absolute left-1/2 w-[85%] -translate-x-1/2 rounded-sm bg-zinc-900",
      isEnemy ? "bottom-[15%] h-[15%]" : "top-[15%] h-[15%]"
    )} />
    
    {/* Rear window */}
    <div className={classNames(
      "absolute left-1/2 w-3/4 -translate-x-1/2 rounded-sm bg-zinc-900/80",
      isEnemy ? "top-[10%] h-[12%]" : "bottom-[10%] h-[12%]"
    )} />
    
    {/* Headlights */}
    <div className={classNames(
      "absolute left-1 h-1 w-2 rounded-full",
      isEnemy ? "bottom-0.5 bg-red-500 shadow-[0_4px_8px_red]" : "top-0.5 bg-yellow-200 shadow-[0_-8px_12px_yellow]"
    )} />
    <div className={classNames(
      "absolute right-1 h-1 w-2 rounded-full",
      isEnemy ? "bottom-0.5 bg-red-500 shadow-[0_4px_8px_red]" : "top-0.5 bg-yellow-200 shadow-[0_-8px_12px_yellow]"
    )} />
  </div>
);

export default function RacerBoard() {
  const [playerLane, setPlayerLane] = useState(1);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useLocalStorage<number>("racer-highscore", 0);
  
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const [openModal, setOpenModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const obstacleIdCounter = useRef(0);
  const tickCounter = useRef(0);

  const movePlayer = (direction: -1 | 1) => {
    if (!hasStarted) setHasStarted(true);
    if (isPaused || isGameOver) return;
    setPlayerLane((prev) => {
      const newLane = prev + direction;
      return newLane >= 0 && newLane < LANES.length ? newLane : prev;
    });
  };

  useHotkey([
    ["ArrowLeft", () => movePlayer(-1)],
    ["ArrowRight", () => movePlayer(1)],
    ["a", () => movePlayer(-1)],
    ["d", () => movePlayer(1)],
    [" ", () => {
      if (isGameOver) handleRestart();
      else setIsPaused(!isPaused);
    }],
  ]);

  const touchSwipeHandlers = useSwipeable({
    onSwipedLeft: () => movePlayer(-1),
    onSwipedRight: () => movePlayer(1),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const gameLoop = useCallback(() => {
    if (!hasStarted || isPaused || isGameOver) return;

    tickCounter.current += 1;

    setObstacles((prev) => {
      let currentObstacles = prev
        .map((obs) => ({ ...obs, top: obs.top + GAME_SPEED + (score / 1000) }))
        .filter((obs) => obs.top < 120); // remove passed obstacles

      // Spawn new obstacle
      const spawnRate = Math.max(30, 80 - Math.floor(score / 50));
      if (tickCounter.current % spawnRate === 0) {
        const lane = Math.floor(Math.random() * LANES.length);
        currentObstacles.push({
          id: obstacleIdCounter.current++,
          lane,
          top: -20,
        });
      }

      // Check collision
      const isCollision = currentObstacles.some((obs) => {
        if (obs.lane !== playerLane) return false;
        
        const PADDING = 2; // Shrink hitbox by 2% to make it feel fairer

        const playerTop = 100 - PLAYER_BOTTOM_POS - CAR_HEIGHT + PADDING;
        const playerBottom = 100 - PLAYER_BOTTOM_POS - PADDING;
        
        const obsTop = obs.top + PADDING;
        const obsBottom = obs.top + OBSTACLE_HEIGHT - PADDING;
        
        // Simple AABB collision on the vertical axis
        return obsBottom > playerTop && obsTop < playerBottom;
      });

      if (isCollision) {
        setIsGameOver(true);
        setOpenModal(true);
        if (score > highscore) setHighscore(score);
      }

      return currentObstacles;
    });

    if (!isGameOver) {
      setScore((s) => s + 1);
    }
  }, [hasStarted, isPaused, isGameOver, score, playerLane, highscore, setHighscore]);

  useEffect(() => {
    const interval = setInterval(gameLoop, 30);
    return () => clearInterval(interval);
  }, [gameLoop]);

  const handleRestart = () => {
    setPlayerLane(1);
    setObstacles([]);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setHasStarted(false);
    setOpenModal(false);
    tickCounter.current = 0;
  };

  return (
    <>
      <PageMeta
        title="Puzz-Multigames | Neon Racer"
        description="Corra o mais rápido que puder e desvie dos obstáculos na pista Neon."
      />
      <div className="relative flex flex-col items-center justify-center gap-6 lg:flex-row-reverse lg:items-start lg:justify-start lg:pt-8">
        
        {/* Sidebar / Stats */}
        <div className="flex w-full flex-col gap-4 lg:w-64">
          <div className="flex w-full justify-end">
            <button
              onClick={() => setShowInfo(true)}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
              aria-label="Como jogar"
            >
              <InformationCircleIcon className="h-8 w-8 stroke-zinc-900 dark:stroke-orange-400" />
            </button>
          </div>

          <div className="flex w-full gap-2 lg:flex-col">
            <div className="flex-1 rounded-md bg-orange-500/10 px-4 py-2 text-orange-600 ring-1 ring-orange-600 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-1 dark:ring-inset dark:ring-orange-500/30">
              <span className="text-xs sm:text-base">Pontuação</span>
              <p className="text-2xl font-bold sm:text-3xl">{score}</p>
            </div>
            <div className="flex-1 rounded-md bg-orange-500/10 px-4 py-2 text-orange-600 ring-1 ring-orange-600 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-1 dark:ring-inset dark:ring-orange-500/30">
              <span className="text-xs sm:text-base">Recorde</span>
              <p className="text-2xl font-bold sm:text-3xl">{highscore}</p>
            </div>
          </div>

          <div className="flex gap-2 lg:flex-col">
            <button
              className="flex-1 rounded-md bg-zinc-900 p-3 shadow-sm transition-colors duration-100 ease-in hover:bg-zinc-700 dark:bg-orange-500 dark:ring-1 dark:ring-inset dark:ring-orange-500/20 dark:hover:bg-orange-400 dark:hover:ring-orange-400"
              aria-label={isPaused || !hasStarted ? "Jogar" : "Pausar"}
              onClick={() => {
                if (!hasStarted) setHasStarted(true);
                else setIsPaused(!isPaused);
              }}
            >
              <span className="hidden text-center text-lg font-semibold text-white dark:text-zinc-900 sm:block">
                {isPaused || !hasStarted ? "Jogar" : "Pausar"}
              </span>
              <div className="flex justify-center sm:hidden">
                {isPaused || !hasStarted ? (
                  <PlayIcon className="h-6 w-6 text-white dark:text-zinc-900" />
                ) : (
                  <PauseIcon className="h-6 w-6 text-white dark:text-zinc-900" />
                )}
              </div>
            </button>
            <button
              className="flex-1 rounded-md bg-zinc-900 p-3 shadow-sm transition-colors duration-100 ease-in hover:bg-zinc-700 dark:bg-orange-500 dark:ring-1 dark:ring-inset dark:ring-orange-500/20 dark:hover:bg-orange-400 dark:hover:ring-orange-400"
              aria-label="Reiniciar"
              onClick={handleRestart}
            >
              <span className="hidden text-center text-lg font-semibold text-white dark:text-zinc-900 sm:block">
                Reiniciar
              </span>
              <div className="flex justify-center sm:hidden">
                <ArrowPathIcon className="h-6 w-6 text-white dark:text-zinc-900" />
              </div>
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div
          {...touchSwipeHandlers}
          className="relative h-[60vh] max-h-[600px] w-full max-w-sm overflow-hidden rounded-lg bg-zinc-900 shadow-lg dark:border dark:border-orange-500/20 dark:bg-[#0a0a0f]"
          style={{ touchAction: "none" }}
          onClick={() => {
            if (!hasStarted) setHasStarted(true);
          }}
        >
          {/* Road Lines */}
          <div className="absolute inset-0 flex justify-evenly opacity-30">
            <div className="w-1 h-[200%] border-r-2 border-dashed border-white animate-[slideDown_1s_linear_infinite]" />
            <div className="w-1 h-[200%] border-r-2 border-dashed border-white animate-[slideDown_1s_linear_infinite]" />
          </div>

          {/* Player Car */}
          <div
            className="absolute z-20 flex w-1/3 justify-center transition-all duration-200 ease-out"
            style={{
              left: `${playerLane * 33.33}%`,
              bottom: `${PLAYER_BOTTOM_POS}%`,
              height: `${CAR_HEIGHT}%`,
            }}
          >
            <CarSprite 
              colorClass="bg-orange-500" 
              shadowClass="shadow-[0_0_25px_rgba(249,115,22,0.6)]" 
            />
          </div>

          {/* Obstacles */}
          {obstacles.map((obs) => (
            <div
              key={obs.id}
              className="absolute z-10 flex w-1/3 justify-center"
              style={{
                left: `${obs.lane * 33.33}%`,
                top: `${obs.top}%`,
                height: `${OBSTACLE_HEIGHT}%`,
              }}
            >
              <CarSprite 
                colorClass="bg-cyan-400" 
                shadowClass="shadow-[0_0_20px_rgba(34,211,238,0.5)]" 
                isEnemy 
              />
            </div>
          ))}
          
          {/* Overlay for start/pause/game over */}
          {(!hasStarted || isPaused || isGameOver) && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-bold text-red-500">Batida!</h2>
                  <p className="mt-2 text-xl text-white">Distância: {score}m</p>
                  <button
                    onClick={handleRestart}
                    className="mt-6 rounded-md bg-orange-500 px-6 py-2 font-bold text-white transition hover:bg-orange-400"
                  >
                    Jogar Novamente
                  </button>
                </>
              ) : !hasStarted ? (
                <>
                  <PlayIcon className="mb-2 h-16 w-16 text-orange-400" />
                  <p className="text-lg font-medium text-white">Deslize ou use as setas para desviar</p>
                </>
              ) : (
                <>
                  <PauseIcon className="mb-2 h-16 w-16 text-orange-400" />
                  <p className="text-lg font-medium text-white">Pausado</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      <BasicModal
        title="Como Jogar Neon Racer"
        isOpen={showInfo}
        closeModal={() => setShowInfo(false)}
      >
        <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            Um jogo de corrida retrô com visual Neon! O objetivo é sobreviver o máximo possível sem bater nos carros adversários (blocos cianos).
          </p>
          <ul className="list-disc space-y-1 pl-5 text-orange-600 dark:text-orange-400">
            <li><strong className="text-zinc-900 dark:text-white">Teclado:</strong> Use as setas Esquerda/Direita ou A/D para trocar de faixa.</li>
            <li><strong className="text-zinc-900 dark:text-white">Celular:</strong> Deslize o dedo na tela para a Esquerda/Direita.</li>
            <li><strong className="text-zinc-900 dark:text-white">Espaço:</strong> Pausa ou retoma o jogo.</li>
          </ul>
          <p>
            O jogo fica mais rápido e mais difícil conforme sua pontuação (distância) aumenta!
          </p>
        </div>
      </BasicModal>

      {/* Win/Highscore Modal */}
      {isGameOver && score > 0 && score >= highscore && (
        <BasicModal
          title="Novo Recorde!"
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          confetti={<ConfettiComponent />}
        >
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-500 dark:text-zinc-400">Você foi muito longe! Sua nova distância máxima é:</p>
            <p className="mt-2 text-5xl font-bold text-orange-500 shadow-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              {score}m
            </p>
          </div>
        </BasicModal>
      )}

      {/* Tailwind keyframe animation for the road */}
      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-50%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}
