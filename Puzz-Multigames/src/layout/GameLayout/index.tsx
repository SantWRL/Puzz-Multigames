import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import PokemonRunner from "../components/PokemonRunner";

export default function GameLayout() {
  return (
    <div className="lg:ml-72">
      <Header />
      <PokemonRunner />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="px-4 sm:px-6 lg:px-8">
          <MainContent />
          <Footer />
        </div>
      </div>
    </div>
  );
}
