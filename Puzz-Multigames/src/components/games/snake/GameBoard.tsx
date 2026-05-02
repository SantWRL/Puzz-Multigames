import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowPathIcon, PlayIcon, PauseIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSwipeable } from "react-swipeable";
import PageMeta from "../../utility/PageMeta";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { BasicModal } from "../../modal/BasicModal";
import ConfettiComponent from "../../modal/ConfettiComponent";
import { useHotkey } from "../../../hooks/useHotKey";
import { classNames } from "../../../utility/css";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 15 },
  { x: 10, y: 16 },
  { x: 10, y: 17 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Point = { x: number; y: number };

const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    isOccupied = snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
  }
  return newFood!;
};

export default function SnakeBoard() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 10, y: 5 });
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useLocalStorage<number>("snake-highscore", 0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const directionRef = useRef(INITIAL_DIRECTION);
  directionRef.current = direction;

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused || !hasStarted) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + directionRef.current.x,
        y: prevSnake[0].y + directionRef.current.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        setOpenModal(true);
        if (score > highscore) setHighscore(score);
        return prevSnake;
      }

      // Check self collision
      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setIsGameOver(true);
        setOpenModal(true);
        if (score > highscore) setHighscore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [food, highscore, isGameOver, isPaused, hasStarted, score, setHighscore]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const handleRestart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 10, y: 5 });
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setHasStarted(false);
    setOpenModal(false);
  };

  const changeDirection = (newDir: Point) => {
    if (!hasStarted) setHasStarted(true);
    if (isPaused) setIsPaused(false);
    
    // Prevent 180-degree turns
    if (
      directionRef.current.x + newDir.x === 0 &&
      directionRef.current.y + newDir.y === 0
    ) {
      return;
    }
    setDirection(newDir);
  };

  useHotkey([
    ["ArrowUp", () => changeDirection({ x: 0, y: -1 })],
    ["ArrowDown", () => changeDirection({ x: 0, y: 1 })],
    ["ArrowLeft", () => changeDirection({ x: -1, y: 0 })],
    ["ArrowRight", () => changeDirection({ x: 1, y: 0 })],
    [" ", () => {
      if (isGameOver) handleRestart();
      else setIsPaused(!isPaused);
    }],
  ]);

  const touchSwipeHandlers = useSwipeable({
    onSwipedUp: () => changeDirection({ x: 0, y: -1 }),
    onSwipedDown: () => changeDirection({ x: 0, y: 1 }),
    onSwipedLeft: () => changeDirection({ x: -1, y: 0 }),
    onSwipedRight: () => changeDirection({ x: 1, y: 0 }),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <>
      <PageMeta
        title="Puzz-Multigames | Cobrinha"
        description="Jogue o clássico jogo da cobrinha (Snake) com uma estética Neon."
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
              <InformationCircleIcon className="h-8 w-8 stroke-zinc-900 dark:stroke-yellow-400" />
            </button>
          </div>

          <div className="flex w-full gap-2 lg:flex-col">
            <div className="flex-1 rounded-md bg-yellow-500/10 px-4 py-2 text-yellow-600 ring-1 ring-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-300 dark:ring-1 dark:ring-inset dark:ring-yellow-500/30">
              <span className="text-xs sm:text-base">Pontuação</span>
              <p className="text-2xl font-bold sm:text-3xl">{score}</p>
            </div>
            <div className="flex-1 rounded-md bg-yellow-500/10 px-4 py-2 text-yellow-600 ring-1 ring-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-300 dark:ring-1 dark:ring-inset dark:ring-yellow-500/30">
              <span className="text-xs sm:text-base">Recorde</span>
              <p className="text-2xl font-bold sm:text-3xl">{highscore}</p>
            </div>
          </div>

          <div className="flex gap-2 lg:flex-col">
            <button
              className="flex-1 rounded-md bg-zinc-900 p-3 shadow-sm transition-colors duration-100 ease-in hover:bg-zinc-700 dark:bg-yellow-500 dark:ring-1 dark:ring-inset dark:ring-yellow-500/20 dark:hover:bg-yellow-400 dark:hover:ring-yellow-400"
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
              className="flex-1 rounded-md bg-zinc-900 p-3 shadow-sm transition-colors duration-100 ease-in hover:bg-zinc-700 dark:bg-yellow-500 dark:ring-1 dark:ring-inset dark:ring-yellow-500/20 dark:hover:bg-yellow-400 dark:hover:ring-yellow-400"
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
          className="relative grid aspect-square w-full max-w-lg select-none grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] gap-0 rounded-2xl bg-zinc-950 p-4 shadow-2xl ring-1 ring-white/10"
          style={{ 
            touchAction: "none",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "calc(100% / 20) calc(100% / 20)"
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const snakeIndex = snake.findIndex((s) => s.x === x && s.y === y);
            const isSnake = snakeIndex !== -1;
            const isHead = snakeIndex === 0;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className="relative h-full w-full p-[1px]"
              >
                {isSnake && (
                  <div
                    className={classNames(
                      "h-full w-full transition-all duration-150",
                      isHead 
                        ? "z-20 rounded-md bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.9)]" 
                        : "z-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 opacity-90 shadow-[0_0_8px_rgba(250,204,21,0.3)]"
                    )}
                    style={{
                      transform: isHead ? "scale(1.1)" : "scale(0.9)",
                    }}
                  >
                    {isHead && (
                      <div className="flex h-full w-full items-center justify-around px-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
                      </div>
                    )}
                  </div>
                )}
                {isFood && (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="h-4/5 w-4/5 animate-pulse rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] ring-2 ring-red-400/50" />
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Overlay for start/pause/game over */}
          {(!hasStarted || isPaused || isGameOver) && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-bold text-red-500">Fim de Jogo</h2>
                  <p className="mt-2 text-xl text-white">Pontuação: {score}</p>
                  <button
                    onClick={handleRestart}
                    className="mt-6 rounded-md bg-yellow-500 px-6 py-2 font-bold text-zinc-900 transition hover:bg-yellow-400"
                  >
                    Jogar Novamente
                  </button>
                </>
              ) : !hasStarted ? (
                <>
                  <PlayIcon className="mb-2 h-16 w-16 text-yellow-400" />
                  <p className="text-lg font-medium text-white">Pressione as setas ou arraste para começar</p>
                </>
              ) : (
                <>
                  <PauseIcon className="mb-2 h-16 w-16 text-yellow-400" />
                  <p className="text-lg font-medium text-white">Pausado</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      <BasicModal
        title="Como Jogar Cobrinha"
        isOpen={showInfo}
        closeModal={() => setShowInfo(false)}
      >
        <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            O clássico jogo da cobrinha (Snake). O objetivo é comer as maçãs vermelhas para crescer e ganhar pontos.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-yellow-600 dark:text-yellow-400">
            <li><strong className="text-zinc-900 dark:text-white">Teclado:</strong> Use as setas do teclado para mover.</li>
            <li><strong className="text-zinc-900 dark:text-white">Celular:</strong> Deslize o dedo na tela na direção desejada.</li>
            <li><strong className="text-zinc-900 dark:text-white">Espaço:</strong> Pausa ou retoma o jogo.</li>
          </ul>
          <p>
            O jogo termina se você bater nas paredes ou no próprio corpo.
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
            <p className="text-lg text-gray-500 dark:text-zinc-400">Incrível! Sua nova pontuação máxima é:</p>
            <p className="mt-2 text-5xl font-bold text-yellow-500 shadow-yellow-500 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              {score}
            </p>
          </div>
        </BasicModal>
      )}
    </>
  );
}
