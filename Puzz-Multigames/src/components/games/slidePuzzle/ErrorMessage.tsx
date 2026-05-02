export function ErrorMessage() {
  return (
    <div className="mt-20 flex w-full max-w-3xl flex-col items-center justify-center text-center gap-4">
      <span className="text-xl text-red-500 font-bold">
        Erro ao carregar imagem
      </span>
      <p className="text-gray-400 max-w-md">
        Este link pode estar protegido ou o formato não é suportado. Tente usar uma das fotos da galeria ou um link do Imgur/Unsplash.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
      >
        Recarregar página
      </button>
    </div>
  );
}
