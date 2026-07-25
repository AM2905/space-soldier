import "../css/SpaceshipPage.css";
import { useGame } from "../context/GameContext.jsx";

import spaceship1 from "../assets/spaceship1.svg";
import spaceship2 from "../assets/spaceship2.svg";
import spaceship3 from "../assets/spaceship3.svg";
import spaceship4 from "../assets/spaceship4.svg";

import spaceshipTop1 from "../assets/spaceshipTop1.svg";
import spaceshipTop2 from "../assets/spaceshipTop2.svg";
import spaceshipTop3 from "../assets/spaceshipTop3.svg";
import spaceshipTop4 from "../assets/spaceshipTop4.svg";

const SHIPS = [
    { id: 1, thumb: spaceship1, top: spaceshipTop1 },
    { id: 2, thumb: spaceship2, top: spaceshipTop2 },
    { id: 3, thumb: spaceship3, top: spaceshipTop3 },
    { id: 4, thumb: spaceship4, top: spaceshipTop4 },
];

export default function SpaceshipPage({ onNextPage }) {
    const { selectedShip, setSelectedShip } = useGame();

    return (
        <div className="SpaceshipPage">
            <h1 className="page-title">בחרו כלי קרב למשימה</h1>
            <div className="title-divider" />

            <div className="ship-grid">
                {SHIPS.map((ship) => (
                    <button
                        key={ship.id}
                        className={`ship-tile ${
                            selectedShip?.id === ship.id ? "ship-tile-active" : ""
                        }`}
                        onClick={() => setSelectedShip(ship)}
                        aria-pressed={selectedShip?.id === ship.id}
                    >
                        <img src={ship.thumb} alt={`spaceship${ship.id}`} />
                    </button>
                ))}
            </div>

            <div className="bay-display">
                <div className={`scan-line scan-line-h ${selectedShip ? "scan-line-active" : ""}`} />
                <div className={`scan-line scan-line-v ${selectedShip ? "scan-line-active" : ""}`} />
                {selectedShip && (
                    <img
                        src={selectedShip.top}
                        alt={`spaceshipTop${selectedShip.id}`}
                        className="bay-ship-img"
                    />
                )}
            </div>

            {selectedShip && (
                <button onClick={onNextPage} className="next-button">
                    <span className="next-icon">▶</span>
                    למפת הגלקסיה
                </button>
            )}
        </div>
    );
}