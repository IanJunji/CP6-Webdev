import { Icon } from "@iconify/react";
import Board from "./Board";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 font-sans">
        <header className="flex items-center gap-3 bg-blue-500 text-white my-4 p-4 rounded-lg shadow-md w-full max-w-md justify-center">
          <Icon icon="game-icons:card-random" className="text-4xl" />
          <h1 className="text-2xl font-semibold">
            Jogo da Memória
          </h1>
        </header>
        <Board />
      </div>
    </>
  )
}

export default App;