import { useState } from "react";
import "../css/WaterPage.css";
import { useGame } from "../context/GameContext.jsx";
import cow from "../assets/cow.svg";
import waterPlanet from "../assets/waterPlanet.svg";
import bottle2 from "../assets/bottle2.svg";
import bottle from "../assets/bottle.svg";
import cup from "../assets/cup.svg";

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

const SIGNS = [
    { id: "thirst", label: "צמא", detail: "סימן שהגוף זקוק לנוזלים. אל תחכה לצמא – שתה לאורך היום." },
    { id: "headache", label: "כאב ראש", detail: "מחסור במים עלול לגרום לכאב ראש ולירידה בריכוז." },
    { id: "fatigue", label: "עייפות", detail: "חוסר בנוזלים פוגע בתפקוד וגורם לעייפות." },
    { id: "darkurine", label: "שתן כהה וריח חזק", detail: "עשוי להעיד שלא שתית מספיק – חשוב להשלים שתייה." },
];

export default function WaterPage({ navigate }) {
    const { completePlanet } = useGame();

    const [flipped, setFlipped] = useState({});
    const [everFlipped, setEverFlipped] = useState({});
    const [phase, setPhase] = useState("info"); // "info" | "signs"

    const [unlockedStep, setUnlockedStep] = useState(0); // כמה נפתחו בסה"כ (התקדמות, לא חוזר אחורה)
    const [openIndex, setOpenIndex] = useState(null); // איזה אחד מוצג כרגע (יכול לזוז אחורה/קדימה)

    const allCardsFlipped = HYDRATION_CARDS.every((c) => everFlipped[c.id]);
    const allSignsDone = unlockedStep >= SIGNS.length;
    const beamPercent = openIndex === null ? 0 : ((openIndex + 1) / SIGNS.length) * 100;

    const toggleCard = (id) => {
        setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
        setEverFlipped((prev) => ({ ...prev, [id]: true }));
    };

    const handleSignClick = (index) => {
        if (index < unlockedStep) {
            // כבר נפתח בעבר - רק מציגים את המידע שלו מחדש, לא משנים התקדמות
            setOpenIndex(index);
        } else if (index === unlockedStep) {
            // פותחים סימן חדש
            setUnlockedStep((prev) => prev + 1);
            setOpenIndex(index);
        }
        // index > unlockedStep: נעול, לא עושים כלום
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

            <div className="content-panel">
                {phase === "info" && (
                    <>
                        <div className="intro-row">
                            <img src={waterPlanet} alt="כוכב המים" className="mini-planet" />

                            <p className="intro-text">
                                מים הם חיוניים לשמירה על מאזן הנוזלים, תומכים בתפקוד הגוף
                                ומסייעים בביצוע פעילות גופנית.
                            </p>
                        </div>

                        <div className="section-box">
                            <h2 className="section-title">כמה צריך לשתות?</h2>
                            <p className="section-subtitle">לחץ על כל כרטיס כדי לגלות</p>

                            <div className="card-grid">
                                {HYDRATION_CARDS.map((card) => (
                                    <button
                                        key={card.id}
                                        className="flip-card"
                                        onClick={() => toggleCard(card.id)}
                                    >
                                        <div className="card-top">
                                            <span className="card-icon">{card.icon}</span>
                                            <span className="card-label">{card.label}</span>
                                        </div>

                                        <div
                                            className={`card-bottom-flip ${
                                                flipped[card.id] ? "card-bottom-flipped" : ""
                                            }`}
                                        >
                                            <div className="card-bottom-inner">
                                                <div className="card-bottom-front">
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
                                                <div className="card-bottom-back">
                                                    <span className="card-back-text">{card.detail}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="section-box">
                            <h2 className="section-title">איך מגיעים ל-2 ליטר?</h2>
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
                                    <div className="equivalence-icons">
                                        <img src={bottle} alt="בקבוק" className="equivalence-img" />
                                        <img src={bottle} alt="בקבוק" className="equivalence-img" />
                                        <img src={bottle} alt="בקבוק" className="equivalence-img" />
                                        <img src={bottle} alt="בקבוק" className="equivalence-img" />
                                    </div>
                                    <span className="equivalence-label">4 בקבוקים קטנים</span>
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

                        {allCardsFlipped && (
                            <button className="continue-button" onClick={() => setPhase("signs")}>
                                המשך
                            </button>
                        )}
                    </>
                )}

                {phase === "signs" && (
                    <>
                        <div className="ufo-row">
                            <div className="ufo-icon">
                                <svg viewBox="0 0 64 40" width="90" height="56">
                                    <ellipse cx="32" cy="26" rx="28" ry="8" fill="#7a8b93" stroke="#cfe9ee" strokeWidth="1.2" />
                                    <path d="M18 26a14 12 0 0 1 28 0" fill="#e8f6f8" stroke="#cfe9ee" strokeWidth="1.2" />
                                    <path d="M27 15 L23 10 M37 15 L41 10" stroke="#3fb3c4" strokeWidth="1.4" />
                                    <circle cx="32" cy="11" r="2" fill="none" stroke="#3fb3c4" strokeWidth="1.4" />
                                    <path d="M28 11 v-2 M32 11 v-3 M36 11 v-2" stroke="#3fb3c4" strokeWidth="1" />
                                    {[16, 24, 32, 40, 48].map((x) => (
                                        <circle key={x} cx={x} cy="27" r="2" fill="#f4d35e" />
                                    ))}
                                </svg>
                            </div>
                            <div>
                                <h2 className="section-title">סימני התייבשות</h2>
                                <p className="section-subtitle">לחצו על הסימנים</p>
                            </div>
                        </div>
<div className="signs-body">
    <div className="beam-column">
        <div
            className="beam-cone"
            style={{ height: `${beamPercent}%` }}
        >
            {openIndex !== null && (
                <img src={cow} alt="cow" className="beam-cow" />
            )}
        </div>
    </div>

    <div className="signs-beam">
        {SIGNS.map((sign, index) => {
            const isDone = index < unlockedStep;
            const isActive = index === unlockedStep;
            const isLocked = index > unlockedStep;
            const isOpen = index === openIndex;

            return (
                <div key={sign.id} className="sign-row">
                    <div className="sign-row-top">
                        <span className="sign-number">{index + 1}</span>

                        <button
                            className={`sign-tab ${isDone ? "sign-tab-done" : ""} ${
                                isActive ? "sign-tab-active" : ""
                            } ${isOpen ? "sign-tab-open" : ""}`}
                            onClick={() => handleSignClick(index)}
                            disabled={isLocked}
                        >
                            <span className="sign-tab-icon">
                                {isDone ? (
                                    "✓"
                                ) : (
                                    <svg viewBox="0 0 24 24" width="18" height="18">
                                        <rect x="5" y="10" width="14" height="10" rx="1.5"
                                            fill="none" stroke="currentColor" strokeWidth="1.6" />
                                        <path d="M8 10V7a4 4 0 0 1 8 0v3"
                                            fill="none" stroke="currentColor" strokeWidth="1.6" />
                                    </svg>
                                )}
                            </span>
                            <span className="sign-tab-label">{sign.label}</span>
                        </button>
                    </div>

                    {isOpen && (
                        <div className="sign-detail">
                            <p>{sign.detail}</p>
                        </div>
                    )}
                </div>
            );
        })}
    </div>
</div>

                        <div className="notice-box">
                            <h3 className="notice-title">שים לב!</h3>
                            <p>1. אל תשתה יותר מ-1.5 ליטר בשעה.</p>
                            <p>2. אל תחכה לתחושת הצמא</p>
                        </div>

                        <div className="phase-actions">
                            {allSignsDone && (
                                <button className="galaxy-button" onClick={handleFinish}>
                                    למפת הגלקסיה
                                </button>
                            )}
                            <button className="back-button" onClick={() => setPhase("info")}>
                                חזור
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}