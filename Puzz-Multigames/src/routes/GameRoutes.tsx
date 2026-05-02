import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingGame from "../layout/components/LoadingGame";
import ErrorPage from "../layout/error/ErrorPage";
import GameLayout from "../layout/GameLayout";
import Hero from "../components/hero/Hero";
import GameError from "../layout/error/GameError";

const GameBoard = lazy(() => import("../components/games/2048/GameBoard"));
const SlidePuzzleBoard = lazy(
  () => import("../components/games/slidePuzzle/GameBoard"),
);
const WordleGameBoard = lazy(
  () => import("../components/games/wordle/GameBoard"),
);
const MemoryMatchBoard = lazy(
  () => import("../components/games/memoryMatch/GameBoard"),
);
const SnakeBoard = lazy(
  () => import("../components/games/snake/GameBoard"),
);
const RacerBoard = lazy(
  () => import("../components/games/racer/GameBoard"),
);
const TicTacToeBoard = lazy(
  () => import("../components/games/tictactoe/GameBoard"),
);
const GameBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <GameBoard />
  </Suspense>
);

const SlidePuzzleBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <SlidePuzzleBoard />
  </Suspense>
);

const WordleGameBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <WordleGameBoard />
  </Suspense>
);

const MemoryMatchGameBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <MemoryMatchBoard />
  </Suspense>
);

const SnakeBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <SnakeBoard />
  </Suspense>
);

const RacerBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <RacerBoard />
  </Suspense>
);

const TicTacToeBoardWithFallback = () => (
  <Suspense fallback={<LoadingGame />}>
    <TicTacToeBoard />
  </Suspense>
);

export const GameRoutes: RouteObject = {
  path: "/",
  element: <GameLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      errorElement: <GameError />,
      children: [
        { index: true, element: <Hero /> },
        {
          path: "/2048",
          element: <GameBoardWithFallback />,
        },
        {
          path: "/puzzle",
          element: <SlidePuzzleBoardWithFallback />,
        },
        {
          path: "/wordle",
          element: <WordleGameBoardWithFallback />,
        },
        {
          path: "/memorymatch",
          element: <MemoryMatchGameBoardWithFallback />,
        },
        {
          path: "/snake",
          element: <SnakeBoardWithFallback />,
        },
        {
          path: "/racer",
          element: <RacerBoardWithFallback />,
        },
        {
          path: "/tictactoe",
          element: <TicTacToeBoardWithFallback />,
        },
      ],
    },
  ],
};
