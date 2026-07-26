import "../css/NutritionPage.css";
import { useGame } from "../context/GameContext.jsx";

export default function NutritionPage({ navigate }) {
    const { completePlanet } = useGame();

    const handleFinish = () => {
        completePlanet("nutrition");
        navigate("home");
    };

    return (
        <div className="NutritionPage">
            <div className="page-header">
                <button className="home-btn" onClick={() => navigate("home")} aria-label="בית">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M4 11 12 4l8 7M6 10v9h5v-5h2v5h5v-9"
                            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </button>
                <div className="planet-chip">כוכב יסודות התזונה</div>
            </div>

            <div className="status-badge">
                <span className="status-dot" />
                STATUS: ONLINE
            </div>

            <div className="content-panel">
                <h1 className="section-title">כוכב יסודות התזונה</h1>

                {/* TODO: תוכן אמיתי של כוכב התזונה */}

                <button onClick={handleFinish} className="finish-button">
                    סיימתי
                </button>
            </div>
        </div>
    );
}