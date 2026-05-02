import { useEffect, useReducer, useRef, useState } from "react";
import { BasicModal, BasicModalProps } from "../../modal/BasicModal";
import { classNames } from "../../../utility/css";
import styles from "./styles.module.css";
import { MemoryMatchHelper as MMH } from "./helper";
import { uuid4 } from "../../../utility/uuidGenerator";

const TILE_STATE = [
  "🍒",
  "🍍",
  "🍊",
  "🍋",
  "🍇",
  "💣",
  "🍋",
  "🍇",
  "🍊",
  "🍈",
  "🍒",
  "🥑",
  "💣",
  "🥑",
  "🍈",
  "🍍",
];

const MOVES = [
  [1],
  [13],
  [12],
  [10],
  [0, 10],
  [0, 10, 15],
  [0, 10, 15, 1],
  [0, 10, 15, 1, 12],
  [-1],
];

const generateTiles = (): MMH.MemoryMatchTile[] => {
  return TILE_STATE.map((value, index) => {
    return {
      name: value,
      commonID: index,
      id: uuid4(),
      isVisited: false,
      isCorrectGuessed: false,
      isCurrentlyVisible: false,
    };
  });
};

type HowToPlayModalProps = {} & BasicModalProps;

const initialState: MMH.MemoryMatchTile[] = generateTiles();

export function HowToPlayModal(props: HowToPlayModalProps) {
  const {
    isOpen,
    className,
    closeModal,
    showInitially,
    handleChangeVisiblity,
  } = props;

  const refTimer = useRef<number>(0);
  const refMoves = useRef(0);

  const moveReducer = (state: MMH.MemoryMatchTile[], action: number[]) => {
    if (MOVES[refMoves.current].includes(-1)) {
      return state.map((t) => {
        return { ...t, isCurrentlyVisible: false };
      });
    } else {
      return state.map((t, index) => {
        return MOVES[refMoves.current].includes(index)
          ? { ...t, isCurrentlyVisible: true }
          : { ...t, isCurrentlyVisible: false };
      });
    }
  };

  const [tiles, dispatchMove] = useReducer(moveReducer, initialState);

  const handleClose = () => {
    closeModal(false);
  };

  const isTileRepeated = (name: string) => {
    let isRepeated = 0;
    if (MOVES[refMoves.current].includes(-1)) return false;
    for (let i = 0; i < MOVES[refMoves.current].length; i++) {
      if (tiles[MOVES[refMoves.current][i]].name === name) {
        isRepeated++;
      } else {
      }
    }
    return isRepeated === 2;
  };

  useEffect(() => {
    refTimer.current = setInterval(() => {
      dispatchMove(MOVES[refMoves.current]);
      refMoves.current++;
      if (refMoves.current === MOVES.length) {
        refMoves.current = 0;
      }
    }, 1800);

    return () => {
      clearInterval(refTimer.current);
    };
  }, []);

  return (
    <BasicModal
      title="Como jogar"
      closeModal={handleClose}
      isOpen={isOpen}
      className={className}
      showInitially={showInitially}
      handleChangeVisiblity={handleChangeVisiblity}
    >
      <div className="mt-2 flex flex-col gap-2 border-t border-pink-500 py-4 sm:flex-row ">
        <div className="flex w-full justify-center">
          <div
            className="mx-auto inline-grid select-none grid-rows-4 gap-1"
            style={{
              gridTemplateColumns: "repeat(4, minmax(0, 3.25rem))",
            }}
          >
            {tiles.map((tile, index) => (
              <div
                key={index}
                className={classNames(
                  "relative inline-flex aspect-square w-full select-none items-center justify-center rounded-md border bg-white p-2 text-2xl dark:bg-zinc-900 md:border-2",
                  tile.isCurrentlyVisible ? `${styles.spinx}` : "",
                  isTileRepeated(tile.name)
                    ? "border-pink-400 bg-pink-500/20 md:border-[3px]"
                    : "border-pink-500/40",
                )}
              >
                {tile.isCurrentlyVisible ? tile.name : null}
              </div>
            ))}
          </div>
        </div>
        <div className="inline-flex flex-col gap-2 py-2 text-sm">
          <p>
            Sua tarefa é clicar em duas cartas para revelar os emojis escondidos.
            Lembre-se, você só pode virar duas cartas por vez.
          </p>
          <p>
            Se os emojis nas cartas viradas forem iguais, ótimo trabalho! Você encontrou um par, e essas cartas permanecerão viradas para cima. Se os emojis não forem iguais, não se preocupe! As cartas virarão para baixo novamente, e você poderá continuar procurando por pares iguais.
          </p>
          <p>
            <span className="text-sm font-semibold text-pink-500">
              Modo Bomba:
            </span>{" "}
            Além de combinar os pares de emojis, você também deve evitar virar as bombas escondidas 💣 duas vezes.
          </p>
          <div className="text-sm">
            <span className="font-semibold text-pink-500">Aviso</span>: Visite as configurações para mudar o modo de jogo
          </div>
        </div>
      </div>
    </BasicModal>
  );
}
