import { useRef, useState } from "react";
import useAutosizeTextArea from "../../../hooks/useAutosizeTextarea";
import { classNames } from "../../../utility/css";
import { verifyImageUrl } from "../../../utility/image";
import { BasicModal, BasicModalProps } from "../../modal/BasicModal";
import { DEFAULT_PUZZLE_IMG_URL, PUZZLE_SIZES } from "./constants";
import { RadioGroup } from "@headlessui/react";

type SlidePuzzleSettingModalProps = {
  imageUrl: string;
  size: number;
  submit: (imageurl: string, size: number) => void;
} & BasicModalProps;

const PRESET_IMAGES = [
  { name: "Padrão", url: DEFAULT_PUZZLE_IMG_URL },
  { name: "Montanhas", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" },
  { name: "Cyberpunk", url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000" },
  { name: "Espaço", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000" },
  { name: "Abstrato", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000" },
  { name: "Gato", url: "https://images.unsplash.com/photo-1514888286872-01d6d37f4672?auto=format&fit=crop&q=80&w=1000" },
];

export function SlidePuzzleSettingModal(props: SlidePuzzleSettingModalProps) {
  const imageErrorP = useRef<HTMLParagraphElement>(null);
  const textareaImageUrl = useRef<HTMLTextAreaElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(props.imageUrl);
  const [verifiedImageUrl, setVerifiedImageUrl] = useState<string>(
    props.imageUrl,
  );
  const [puzzleSize, setPuzzleSize] = useState<number>(props.size);
  const [showVerifyImage, setShowVerifyImage] = useState<boolean>(false);
  useAutosizeTextArea(textareaImageUrl, imageUrl);

  const handleSave = () => {
    if (imageUrl === "") return;
    if (props.imageUrl === imageUrl && props.size === puzzleSize) {
      setShowVerifyImage(false);
      props.closeModal(false);
      return;
    }
    setShowVerifyImage(false);
    setImageUrl(verifiedImageUrl);
    props.submit(verifiedImageUrl, puzzleSize);
  };

  const handleVerifyImage = async () => {
    const isValidUrl = await verifyImageUrl(imageUrl);
    if (imageErrorP.current) {
      if (!isValidUrl) {
        imageErrorP.current.innerHTML =
          "URL de imagem incorreta. Imagem padrão carregada.";
        imageErrorP.current.style.color = "red";
        setVerifiedImageUrl(DEFAULT_PUZZLE_IMG_URL);
        setShowVerifyImage(true);
        return;
      } else {
        imageErrorP.current.innerHTML = "Imagem carregada com sucesso";
        imageErrorP.current.style.color = "green";
        setVerifiedImageUrl(imageUrl);
        setShowVerifyImage(true);
      }
    }
  };

  const handleCloseModal = () => {
    props.closeModal(false);
    setPuzzleSize(props.size);
    setImageUrl(props.imageUrl);
    setVerifiedImageUrl(props.imageUrl);
    setShowVerifyImage(false);
  };

  const generateEmptyArray = (size: number) => {
    let arr = Array.from({ length: size * size }, (_, index) => index);
    return arr;
  };

  return (
    <BasicModal
      title="Configurações do Quebra-cabeça"
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      className={props.className}
    >
      <div className="h-max overflow-y-auto">
        <div className="mt-4 w-full">
          <RadioGroup value={puzzleSize} onChange={setPuzzleSize}>
            <RadioGroup.Label className="text-sm text-zinc-600 dark:text-zinc-400">
              Tamanho do quebra-cabeça
            </RadioGroup.Label>
            <div className="mt-1 grid grid-cols-4 gap-2 sm:grid-cols-4">
              {PUZZLE_SIZES.map((size) => (
                <RadioGroup.Option key={size} value={size}>
                  {({ active, checked }) => (
                    <div
                      style={{
                        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
                        gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
                      }}
                      className={`grid aspect-square w-full items-center justify-center rounded-md border ${
                        active || checked
                          ? "border-cyan-500"
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}
                    >
                      {generateEmptyArray(size).map((_, index) => (
                        <span
                          key={index}
                          className={`h-full w-full border ${
                            active || checked
                              ? "border-cyan-500"
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
        <div className="mt-6">
          <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
            Escolher um tema
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {PRESET_IMAGES.map((img) => (
              <button
                key={img.url}
                onClick={() => {
                  setImageUrl(img.url);
                  setVerifiedImageUrl(img.url);
                  setShowVerifyImage(true);
                }}
                className={classNames(
                  "relative aspect-square overflow-hidden rounded-lg ring-2 transition-all hover:scale-105",
                  imageUrl === img.url ? "ring-cyan-500 scale-105 shadow-lg shadow-cyan-500/20" : "ring-transparent grayscale hover:grayscale-0"
                )}
              >
                <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                {imageUrl === img.url && (
                   <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                     <div className="bg-cyan-500 rounded-full p-1">
                       <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                   </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-1 text-sm text-gray-500 dark:text-zinc-400">
            URL da imagem
          </p>
          <div className="flex gap-2">
            <textarea
              ref={textareaImageUrl}
              className="max-h-28 w-full rounded-lg placeholder:font-light dark:bg-zinc-800 dark:text-white dark:placeholder:text-slate-400 dark:hover:border"
              value={imageUrl}
              onChange={(e) => {
                e.stopPropagation();
                setImageUrl(e.target.value);
              }}
            ></textarea>
            <button
              className="h-fit rounded-md border border-transparent bg-cyan-500 px-3 py-2 text-white hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 sm:px-4 sm:py-2"
              onClick={handleVerifyImage}
            >
              Verificar
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p className="mt-2 text-sm" ref={imageErrorP}></p>
          {showVerifyImage && (
            <>
              <img
                src={verifiedImageUrl}
                alt="imagem do quebra-cabeça"
                className="mt-1 w-full rounded-md bg-cover"
              />
            </>
          )}
        </div>
        <div
          className={classNames(
            showVerifyImage ? "mt-4" : "mt-12",
            "flex justify-end gap-2",
          )}
        >
          <button
            type="button"
            className="rounded-md border border-transparent bg-cyan-500 px-3 py-2 text-white hover:bg-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 sm:px-4 sm:py-2"
            onClick={handleSave}
          >
            Salvar
          </button>
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-2 py-1 text-white shadow-sm transition-colors duration-100 ease-in hover:bg-zinc-700 dark:bg-zinc-800 dark:ring-1 dark:ring-inset dark:ring-white dark:hover:bg-zinc-800 dark:hover:ring-cyan-500 sm:px-4 sm:py-2"
            onClick={handleCloseModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </BasicModal>
  );
}
