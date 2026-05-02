type GameDetailProps = {
  score: number;
  highScore: number | null;
};

export function GameDetails(props: GameDetailProps) {
  return (
    <div className="flex flex-row gap-2 sm:w-full lg:flex-col">
      <div className="inline rounded-md bg-pink-500/10 px-2 py-1 text-pink-600 ring-1 ring-pink-600 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-1 dark:ring-inset dark:ring-pink-500/30 md:px-4">
        <span className="text-xs sm:text-base">Pontuação</span>
        <p className="text-base font-semibold sm:text-3xl">{props.score}</p>
      </div>
      {props.highScore && (
        <div className="inline rounded-md bg-pink-500/10 px-2 py-1 text-pink-600 ring-1 ring-pink-600 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-1 dark:ring-inset dark:ring-pink-500/30 md:px-4">
          <span className="inline-block text-xs sm:block sm:text-base">
            Menor nº de tentativas
          </span>
          <p className="text-base font-semibold sm:text-3xl">
            {props.highScore}
          </p>
        </div>
      )}
    </div>
  );
}
