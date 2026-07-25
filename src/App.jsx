import { useState } from "react";
import "./css/App.css";
import { GameProvider } from "./context/GameContext.jsx";
import Oppening from "./pages/Oppening.jsx";
import MessegesPage from "./pages/MessegesPage.jsx";
import SpaceshipPage from "./pages/SpaceshipPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import WaterPage from "./pages/WaterPage.jsx";

// The linear intro flow, in order
const FLOW = ["oppening", "messeges", "spaceship", "home"];

const PAGES = {
  oppening: Oppening,
  messeges: MessegesPage,
  spaceship: SpaceshipPage,
  home: HomePage,
  water: WaterPage,
};

function App() {
  const [currentPage, setCurrentPage] = useState("oppening");

  // Moves forward through the fixed intro sequence (oppening -> ... -> home)
  const goNextPage = () => {
    const idx = FLOW.indexOf(currentPage);
    const next = FLOW[idx + 1];
    if (next) setCurrentPage(next);
  };

  // Jumps straight to any named page (used by HomePage's planet buttons)
  const navigate = (pageName) => setCurrentPage(pageName);

  const CurrentPage = PAGES[currentPage];

  return (
    <GameProvider>
      <div className="app">
        <CurrentPage onNextPage={goNextPage} navigate={navigate} />
      </div>
    </GameProvider>
  );
}

export default App;