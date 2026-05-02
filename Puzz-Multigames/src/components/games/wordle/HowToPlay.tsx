import { BasicModal, BasicModalProps } from "../../modal/BasicModal";

type WordleHowToPlayProps = BasicModalProps;

export function WordleHowToPlay(props: WordleHowToPlayProps) {
  const { isOpen, closeModal, showInitially, handleChangeVisiblity } = props;
  return (
    <BasicModal
      title="Como jogar"
      isOpen={isOpen}
      closeModal={closeModal}
      showInitially={showInitially}
      handleChangeVisiblity={handleChangeVisiblity}
      className="max-w-3xl"
    >
      <div className="mt-2 flex w-full flex-col gap-2 border-t border-emerald-500 py-2 text-base">
        <span>Você tem seis tentativas para adivinhar a palavra secreta de cinco letras.</span>
        <span>Use o teclado na tela ou físico para digitar a palavra.</span>
        <span>Apenas palavras válidas serão aceitas.</span>
        <span>Exemplo (hello)</span>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <img
              src="/assets/wordleIcon.png"
              alt="worle icon"
              className="w-full bg-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span>O que significam as cores?</span>
            <div className="flex flex-row items-center gap-2 text-sm">
              <div className="aspect-square w-full max-w-[30px] rounded-md border border-gray-700 bg-emerald-300 dark:border-white dark:bg-emerald-500"></div>
              <div>
                A letra está na palavra e na posição correta.
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm">
              <div className="aspect-square w-full max-w-[30px] rounded-md border border-gray-700 bg-yellow-300 dark:border-white dark:bg-yellow-600"></div>
              <div>
                A letra está na palavra, mas na posição errada.
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 text-sm">
              <div className="aspect-square w-full max-w-[30px] rounded-md border border-gray-700 bg-gray-400 dark:border-white dark:bg-gray-500"></div>
              <div>A letra não faz parte da palavra.</div>
            </div>
            <div className="mt-2 border-t border-emerald-500">
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
                <span className="text-sm">
                  O modo pode ser alterado nas configurações
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicModal>
  );
}
