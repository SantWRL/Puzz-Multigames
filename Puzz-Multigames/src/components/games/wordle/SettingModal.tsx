import { useState } from "react";
import { BasicModal, BasicModalProps } from "../../modal/BasicModal";
import { GAME_MODES, WordleGameMode } from "./GameBoard";
import { RadioGroup } from "@headlessui/react";
import { classNames } from "../../../utility/css";
import { CheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";

type WordleSettingModalProps = {
  mode: WordleGameMode;
  currentAttempt: number;
  submit: (mode: WordleGameMode) => void;
} & BasicModalProps;

export function WordleSettingModal(props: WordleSettingModalProps) {
  const handleUpateMode = (mode: WordleGameMode) => {
    if (props.currentAttempt >= 1) return;
    props.submit(mode);
  };

  return (
    <BasicModal
      title="Configurações"
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      className={props.className}
    >
      <div className="h-max overflow-y-auto text-base">
        <div className="mt-2">
          <span>Modo de Jogo?</span>
          <div className="mt-1 text-sm">
            <span className="text-base font-semibold text-emerald-500 dark:text-emerald-400">
              Normal
            </span>
            : Letras erradas de tentativas anteriores podem ser usadas novamente.
          </div>
          <div className="text-sm">
            <span className="text-base font-semibold text-emerald-500  dark:text-emerald-400">
              Difícil
            </span>
            : Letras erradas de tentativas anteriores não podem ser usadas novamente.
          </div>
        </div>
        <div className="mt-2">
          <RadioGroup
            disabled={props.currentAttempt >= 1}
            value={props.mode}
            onChange={handleUpateMode}
          >
            <RadioGroup.Label className="text-sm text-zinc-600 dark:text-zinc-400">
              Selecione o modo
            </RadioGroup.Label>
            <div className="mt-1 flex items-center gap-2">
              {GAME_MODES.map((mode, index) => (
                <RadioGroup.Option
                  key={index}
                  className={({ checked }) =>
                    classNames(
                      "inline-flex w-min cursor-pointer items-center gap-1 rounded-md border border-zinc-300 px-3 py-2 dark:border-emerald-600",
                      checked
                        ? "bg-emerald-200 dark:bg-emerald-500 dark:text-white"
                        : "",
                    )
                  }
                  value={mode}
                >
                  {({ checked }) => (
                    <>
                      <span>{mode}</span>
                      <span className={classNames(checked ? "" : "hidden")}>
                        <CheckIcon className="h-5" />
                      </span>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
              {props.currentAttempt >= 1 && (
                <span className="h-6 w-6 text-emerald-700">
                  <LockClosedIcon />
                </span>
              )}
            </div>
          </RadioGroup>
        </div>
        {props.currentAttempt >= 1 && (
          <div className="mt-4 text-xs text-red-500">
            <div>Não é possível mudar o modo durante o jogo.</div>
            <div>Por favor, termine a partida atual ou reinicie.</div>
          </div>
        )}
      </div>
    </BasicModal>
  );
}
