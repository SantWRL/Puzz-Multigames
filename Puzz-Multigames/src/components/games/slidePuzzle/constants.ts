export const DEFAULT_PUZZLE_IMG_URL = import.meta.env.PROD
  ? "https://manygames.vercel.app/assets/puzzle.jpg"
  : "/assets/puzzle.jpg";

export const PUZZLE_SIZES = [3, 4, 5, 6] as const;
