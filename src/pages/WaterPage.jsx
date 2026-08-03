import { useState } from "react";
import "../css/WaterPage.css";
import { useGame } from "../context/GameContext.jsx";
import bottle2 from "../assets/bottle2.svg";
import cup from "../assets/cup.svg";
import waterPlanet from "../assets/waterPlanet.svg";

const HYDRATION_CARDS = [
    {
        id: "regular",
        label: "ביום רגיל",
        detail: "לפחות 2 ליטר מים.",
        icon: (
            <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M7 3h10l-1.5 15a2 2 0 0 1-2 1.8h-3a2 2 0 0 1-2-1.8Z"
                    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: "activity",
        label: "בפעילות גופנית או מבצעית",
        detail: "להוסיף 500–700 מ״ל מים בכל שעת פעילות.",
        icon: (
            <svg viewBox="0 0 24 24" width="26" height="26">
                <circle cx="14" cy="4.5" r="1.6" fill="currentColor" />
                <path d="M9 21l2.2-6 2-2 3 2 2 4M9 13l2-4 4-1 3 3"
                    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        id: "illness",
        label: "בזמן מחלה או איבוד נוזלים",
        detail: "חשוב לשתות יותר.",
        icon: (
            <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5Z"
                    fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M12 8v6M9 11h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function WaterPage({ navigate }) {
    const { completePlanet } = useGame();

    const [flipped, setFlipped] = useState({});
    const [everFlipped, setEverFlipped] = useState({});
    const [phase, setPhase] = useState("info"); // "info" | "message"

    const allCardsFlipped = HYDRATION_CARDS.every((c) => everFlipped[c.id]);

    const toggleCard = (id) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
        setEverFlipped((prev) => ({ ...prev, [id]: true }));
    };

    const handleFinish = () => {
        completePlanet("water");
        navigate("home");
    };

    return (
        <div className="WaterPage">
            <div className="page-header">
                <button className="home-btn" onClick={() => navigate("home")} aria-label="בית">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M4 11 12 4l8 7M6 10v9h5v-5h2v5h5v-9"
                            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </button>
                <div className="planet-chip">כוכב המים</div>
            </div>

            <div className="status-badge">
                <span className="status-dot" />
                STATUS: ONLINE
            </div>

            <div className="page-body-center">
                <div className="content-panel-new">
                    {phase === "info" && (
                        <>
                            <div className="planet-header-row">
                                <img src={waterPlanet} alt="כוכב המים" className="mini-planet" />
                            </div>

                            <div className="section-box">
                                <h2 className="section-title-new">כמה צריך לשתות?</h2>
                                <p className="section-subtitle">לחץ על כל כרטיס כדי לגלות</p>

                                <div className="card-grid">
                                    {HYDRATION_CARDS.map((card) => (
                                        <button
                                            key={card.id}
                                            className="flip-card"
                                            onClick={() => toggleCard(card.id)}
                                        >
                                            <div
                                                className={`flip-card-inner ${
                                                    flipped[card.id] ? "flip-card-flipped" : ""
                                                }`}
                                            >
                                                <div className="flip-card-front">
                                                    <span className="card-icon">{card.icon}</span>
                                                    <span className="card-label">{card.label}</span>
                                                    <span className="card-hint">
                                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                                            <rect x="5" y="10" width="14" height="10" rx="1.5"
                                                                fill="none" stroke="currentColor" strokeWidth="1.6" />
                                                            <path d="M8 10V7a4 4 0 0 1 8 0v3"
                                                                fill="none" stroke="currentColor" strokeWidth="1.6" />
                                                        </svg>
                                                        לחץ לפתיחה
                                                    </span>
                                                </div>
                                                <div className="flip-card-back">
                                                    <span className="card-back-text">{card.detail}</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {allCardsFlipped && (
                                <button className="continue-button" onClick={() => setPhase("message")}>
                                    המשך
                                </button>
                            )}
                        </>
                    )}

                    {phase === "message" && (
                        <>
                            <div className="water-message-box">
                                <h3 className="water-message-title">אל תחכה לתחושת צמא!</h3>
                                <p className="water-message-text">
                                    כשמרגישים צמא, הגוף כבר במחסור נוזלים. שתו באופן קבוע לאורך היום, לא רק כשמתחשק.
                                </p>
                            </div>

                            <div className="section-box">
                                <h2 className="section-title-new">איך מגיעים ל-2 ליטר?</h2>
                                <div className="equivalence-row">
                                    <div className="equivalence-item">
                                        <div className="equivalence-icons">
                                            <img src={bottle2} alt="מימייה" className="equivalence-img" />
                                            <img src={bottle2} alt="מימייה" className="equivalence-img" />
                                            <img src={bottle2} alt="מימייה" className="equivalence-img" />
                                        </div>
                                        <span className="equivalence-label">3 מימיות</span>
                                    </div>
                                    <span className="equivalence-eq">=</span>
                                    <div className="equivalence-item">
                                        <div className="equivalence-icons equivalence-icons-cups">
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <img
                                                    key={i}
                                                    src={cup}
                                                    alt="כוס"
                                                    className="equivalence-img equivalence-img-small"
                                                />
                                            ))}
                                        </div>
                                        <span className="equivalence-label">10 כוסות</span>
                                    </div>
                                </div>
                            </div>

                            <div className="phase-actions">
                                <button className="galaxy-button" onClick={handleFinish}>
                                    למפת הגלקסיה
                                </button>
                                <button className="back-button" onClick={() => setPhase("info")}>
                                    חזור
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}