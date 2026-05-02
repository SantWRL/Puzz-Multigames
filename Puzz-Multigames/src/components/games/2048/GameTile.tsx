import styles from "./styles.module.scss";

export type GameTile = {
  value: number;
  row: number;
  column: number;
  oldRow: number;
  oldColumn: number;
  mergeToTile: GameTile | null;
};

export type NewGameTileProps = {
  tile: GameTile;
};

const colors: any = {
  2: "bg-white/5 text-gray-300 border border-white/10",
  4: "bg-white/10 text-gray-200 border border-white/20",
  8: "bg-neon-blue/20 text-neon-blue-light border border-neon-blue/30",
  16: "bg-neon-blue/40 text-neon-blue border border-neon-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
  32: "bg-neon-cyan/20 text-neon-cyan-light border border-neon-cyan/30",
  64: "bg-neon-cyan/40 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
  128: "bg-neon-pink/20 text-pink-300 border border-neon-pink/30",
  256: "bg-neon-pink/40 text-pink-400 border border-neon-pink/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]",
  512: "bg-gradient-to-br from-neon-blue/60 to-neon-cyan/60 text-white border border-neon-cyan/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  1024: "bg-gradient-to-br from-neon-pink/60 to-neon-blue/60 text-white border border-neon-pink/60 shadow-[0_0_20px_rgba(236,72,153,0.3)]",
  2048: "bg-gradient-to-br from-neon-cyan to-neon-blue text-white shadow-[0_0_30px_rgba(6,182,212,0.6)] border-none animate-pulse",
};

export function NewGameTile({ tile }: NewGameTileProps) {
  const { column, mergeToTile, oldColumn, oldRow, row, value } = tile;

  const isNew = () => {
    return (oldRow === -1 || oldColumn === -1) && !mergeToTile;
  };

  const fromRow = () => {
    if (mergeToTile !== null) return row;
    return oldRow;
  };

  const fromColumn = () => {
    if (mergeToTile !== null) return column;
    return oldColumn;
  };

  const toRow = () => {
    if (mergeToTile !== null) return mergeToTile.row;
    return row;
  };

  const toColumn = () => {
    if (mergeToTile !== null) return mergeToTile.column;
    return column;
  };

  const hasMoved = () => {
    return (
      (fromRow() !== -1 &&
        (fromRow() !== toRow() || fromColumn() !== toColumn())) ||
      mergeToTile
    );
  };

  let classArray: string[] = [
    `${styles.tile} inline-flex h-[22vw] w-[22vw] lg:w-[18vh] lg:h-[18vh] items-center justify-center font-bold rounded-[1.5vw] lg:rounded-[1vh] text-[8vw] lg:text-[7vh] shadow-sm backdrop-blur-sm transition-colors duration-300`,
  ];
  classArray.push(colors[value]);
  if (!mergeToTile) classArray.push(`${styles[`pos_${row}_${column}`]}`);
  else classArray.push(`${styles.merged}`);
  if (isNew()) classArray.push(`${styles.new}`);
  if (hasMoved()) {
    classArray.push(`${styles[`row_from_${fromRow()}_to_${toRow()}`]}`);
    classArray.push(
      `${styles[`column_from_${fromColumn()}_to_${toColumn()}`]}`,
    );
    classArray.push(`${styles.isMoving}`);
  }
  let classes = classArray.join(" ");
  return (
    <div style={mergeToTile ? { zIndex: -1 } : {}} className={classes}>
      {value}
    </div>
  );
}
