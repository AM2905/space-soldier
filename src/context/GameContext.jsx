import { createContext, useContext, useState } from "react";

const GameContext = createContext(null);

export const PLANET_ORDER = ["water", "nutrition", "plate", "bone"];

export function GameProvider({ children }) {
    const [selectedShip, setSelectedShip] = useState(null);
    const [completedPlanets, setCompletedPlanets] = useState([]); // e.g. ["water"]

    // The next planet the player is allowed to enter
    const activeIndex = completedPlanets.length;
    const activePlanet = PLANET_ORDER[activeIndex] ?? null;

    const isUnlocked = (planetId) => PLANET_ORDER.indexOf(planetId) <= activeIndex;
    const isCompleted = (planetId) => completedPlanets.includes(planetId);
    const isActive = (planetId) => planetId === activePlanet;

    // Call this from inside a planet's own page once the user finishes it
    const completePlanet = (planetId) => {
        setCompletedPlanets((prev) =>
            prev.includes(planetId) ? prev : [...prev, planetId]
        );
    };

    const progressPercent = Math.round(
        (completedPlanets.length / PLANET_ORDER.length) * 100
    );

    return (
        <GameContext.Provider
            value={{
                selectedShip,
                setSelectedShip,
                completedPlanets,
                completePlanet,
                activeIndex,
                activePlanet,
                isUnlocked,
                isCompleted,
                isActive,
                progressPercent,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
    return ctx;
}