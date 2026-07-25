import { useEffect, useRef, useState } from "react";
import "../css/HomePage.css";
import { useGame, PLANET_ORDER } from "../context/GameContext.jsx";

import waterPlanet from "../assets/waterPlanet.svg";
import nutritionPlanet from "../assets/nutritionPlanet.svg";
import platePlanet from "../assets/platePlanet.svg";
import bonePlanet from "../assets/bonePlanet.svg";

const PLANETS = [
    { id: "water", label: "כוכב המים", img: waterPlanet, side: "right" },
    { id: "nutrition", label: "כוכב יסודות התזונה", img: nutritionPlanet, side: "left" },
    { id: "plate", label: "כוכב הצלחת המאוזנת", img: platePlanet, side: "left" },
    { id: "bone", label: "כוכב ברזל ושברי מאמץ", img: bonePlanet, side: "right" },
];

export default function HomePage({ onNextPage, navigate }) {
        const {
        selectedShip,
        isUnlocked,
        isCompleted,
        isActive,
        progressPercent,
    } = useGame();

    const trackRef = useRef(null);
    const anchorRefs = useRef({});
    const [shipPos, setShipPos] = useState(null); // {top, left} in px, relative to track

    // Measure the currently-active planet's anchor and move the ship there
    useEffect(() => {
        const track = trackRef.current;
        const activePlanet = PLANETS.find((p) => isActive(p.id));
        const anchor = activePlanet ? anchorRefs.current[activePlanet.id] : null;
        if (!track || !anchor) return;

        const trackRect = track.getBoundingClientRect();
        const anchorRect = anchor.getBoundingClientRect();

        const nextPos = {
            top: anchorRect.top - trackRect.top + anchorRect.height / 2,
            left: anchorRect.left - trackRect.left + anchorRect.width / 2,
        };

        if (shipPos === null) {
            // First render: start the ship off-screen bottom-right, then fly in
            setShipPos({ top: trackRect.height + 60, left: trackRect.width - 40 });
            requestAnimationFrame(() => {
                setTimeout(() => setShipPos(nextPos), 50);
            });
        } else {
            setShipPos(nextPos);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [PLANETS.find((p) => isActive(p.id))?.id]);

   const handleEnter = (planetId) => {
        if (!isActive(planetId)) return; // only the current unlocked planet is enterable
        if (planetId === "water") {
            navigate("water");
        } else {
            onNextPage(); // TODO: swap for navigate(planetId) once those pages exist too
        }
    };
    return (
        <div className="HomePage">
            <div className="home-header">
                <span className="home-title">עברו על הנושאים</span>
            </div>

            <div className="planet-track" ref={trackRef}>
                {PLANETS.map((planet) => {
                    const unlocked = isUnlocked(planet.id);
                    const done = isCompleted(planet.id);
                    const active = isActive(planet.id);

                    return (
                        <div
                            key={planet.id}
                            className={`planet-row planet-row-${planet.side} ${
                                unlocked ? "" : "planet-locked"
                            }`}
                        >
                            {planet.side === "left" && (
                                <button
                                    className={`planet-label ${active ? "planet-label-active" : ""}`}
                                    onClick={() => handleEnter(planet.id)}
                                    disabled={!active}
                                >
                                    {planet.label}
                                </button>
                            )}

                            <button
                                className={`planet-button ${active ? "planet-active" : ""}`}
                                onClick={() => handleEnter(planet.id)}
                                disabled={!active}
                                aria-label={planet.label}
                            >
                                <span
                                    className="ship-anchor"
                                    ref={(el) => (anchorRefs.current[planet.id] = el)}
                                />
                                <img src={planet.img} alt={planet.id} className="planet-img" />
                                <div className="planet-shadow" />
                                {done && <span className="planet-check">✓</span>}
                            </button>

                            {planet.side === "right" && (
                                <button
                                    className={`planet-label ${active ? "planet-label-active" : ""}`}
                                    onClick={() => handleEnter(planet.id)}
                                    disabled={!active}
                                >
                                    {planet.label}
                                </button>
                            )}
                        </div>
                    );
                })}

                {selectedShip && shipPos && (
                    <img
                        src={selectedShip.top}
                        alt="your ship"
                        className="home-ship"
                        style={{ top: shipPos.top, left: shipPos.left }}
                    />
                )}
            </div>

            <div className="progress-ball">
                <svg viewBox="0 0 100 100" className="progress-ring">
                    <circle className="progress-ring-bg" cx="50" cy="50" r="42" />
                    <circle
                        className="progress-ring-fill"
                        cx="50"
                        cy="50"
                        r="42"
                        style={{
                            strokeDasharray: 264,
                            strokeDashoffset: 264 - (264 * progressPercent) / 100,
                        }}
                    />
                </svg>
                <div className="progress-dots">
                    {PLANET_ORDER.map((id, i) => (
                        <span
                            key={id}
                            className={`progress-dot progress-dot-${i} ${
                                isCompleted(id) ? "progress-dot-filled" : ""
                            }`}
                        />
                    ))}
                </div>
                <span className="progress-text">{progressPercent}%</span>
            </div>
        </div>
    );
}