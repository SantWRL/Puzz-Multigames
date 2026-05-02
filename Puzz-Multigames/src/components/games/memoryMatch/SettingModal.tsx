import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BasicModal, BasicModalProps } from "../../modal/BasicModal";
import { MemoryMatchHelper as MMH } from "./helper";

type MemoryMatchSettingModalProps = {
  size: number;
  handleSubmit: (size: number) => void;
} & BasicModalProps;

export function MemoryMatchSettingModal(props: MemoryMatchSettingModalProps) {
  const { closeModal, isOpen, className, handleSubmit, size } = props;
  const [puzzleSize, setPuzzleSize] = useState(size);

  const handleSave = () => {
    handleSubmit(puzzleSize);
    closeModal(false);
  };

  const handleClose = () => {
    setPuzzleSize(size);
    closeModal(false);
  };

  return (
    <BasicModal
      title="Configurações"
      closeModal={handleClose}
      isOpen={isOpen}
      className={className}
    >
      <div className="mt-4 w-full">
        <RadioGroup value={puzzleSize} onChange={setPuzzleSize}>
          <RadioGroup.Label className="text-sm text-zinc-600 dark:text-zinc-400">
            Dificuldade do jogo
          </RadioGroup.Label>
          <div className="mt-1 grid grid-cols-3 gap-2 sm:grid-cols-3">
            {[4, 5, 6].map((size) => (
              <RadioGroup.Option key={size} value={size}>
                {({ active, checked }) => (
                  <div
                    style={{
                      gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
                    }}
                    className={`grid aspect-square w-full items-center justify-center rounded-md border ${
                      active || checked
                        ? "border-pink-500"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  >
                    {generateEmptyArray(size).map((_, index) => (
                      <span
                        key={index}
                        className={`h-full w-full border ${
                          active || checked
                            ? "border-pink-500"
                            : "border-zinc-300 dark:border-zinc-700"
                        }`}
                      ></span>
                    ))}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="mt-4">
        {puzzleSize === 4 && (
          <div className="text-sm lg:text-base">
            <span className="font-semibold text-pink-600 dark:text-pink-400">
              Modo Normal:
            </span>{" "}
            Encontre os 2 pares de emojis iguais clicando nas cartas.
          </div>
        )}
        {puzzleSize === 5 && (
          <div className="text-sm lg:text-base">
            <span className="font-semibold text-pink-600 dark:text-pink-400">
              Modo Bomba:
            </span>{" "}
            <span>
              Encontre os 2 pares de emojis iguais clicando nas cartas.
            </span>
            <br />
            <span>
              Existe uma única Bomba{" "}
              <span className="text-2xl">{MMH.MEMORY_MATCH_INVALID_TEXT}</span>.
              O jogo será perdido se você clicar nela pela segunda vez.
            </span>
          </div>
        )}
        {puzzleSize === 6 && (
          <div className="text-sm lg:text-base">
            <span className="font-semibold text-pink-600 dark:text-pink-400">
              Modo Bomba Avançado:
            </span>{" "}
            <span>
              Encontre 3 pares de emojis iguais clicando nas cartas.
            </span>
            <br />
            <span>
              Existem 3 Bombas{" "}
              <span className="text-2xl">{MMH.MEMORY_MATCH_INVALID_TEXT}</span>.
              O jogo será perdido se qualquer uma delas for clicada pela segunda vez.
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <span className="text-sm font-semibold text-red-500">
          Aviso: Mudar o modo reiniciará a partida atual
        </span>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-md border border-transparent bg-pink-500 px-3 py-2 text-white hover:bg-pink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 sm:px-4 sm:py-2"
          onClick={handleSave}
        >
          Salvar
        </button>
        <button
          type="button"
          className="rounded-md bg-zinc-900 px-2 py-1 text-white shadow-sm transition-colors duration-100 ease-in hover:bg-zinc-700 dark:bg-zinc-800 dark:ring-1 dark:ring-inset dark:ring-white dark:hover:bg-zinc-800 dark:hover:ring-pink-500 sm:px-4 sm:py-2"
          onClick={handleClose}
        >
          Fechar
        </button>
      </div>
    </BasicModal>
  );
}

const generateEmptyArray = (size: number) => {
  let arr = Array.from({ length: size * size }, (_, index) => index);
  return arr;
};
