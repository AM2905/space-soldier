import React from "react";
import { useState } from "react";
import "./css/App.css";
import Oppening from "./pages/Oppening.jsx";
import MessegesPage from "./pages/MessegesPage.jsx";
import SpaceshipPage from "./pages/SpaceshipPage.jsx";
import HomePage from "./pages/HomePage.jsx";


const pages = [Oppening, MessegesPage, SpaceshipPage, HomePage];

function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const CurrentPage = pages[currentPageIndex];
  const goNextPage = () => setCurrentPageIndex(currentPageIndex + 1);
  return (
    <>
      <div className="app">

      <CurrentPage onNextPage={goNextPage} />


      </div>
    </>
  );
}

export default App;
