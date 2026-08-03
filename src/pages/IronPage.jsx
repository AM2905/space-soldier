import { useState } from "react";
import "../css/IronPage.css";
import { useGame } from "../context/GameContext.jsx";
import humanImg from "../assets/human.svg";
import footImg from "../assets/foot.svg";
import bloodImg from "../assets/blood.svg";

const TOPICS = {
    fracture: {
        id: "fracture",
        label: "שברי מאמץ",
        img: footImg,
        text: "תזונה לא מאוזנת עלולה להוביל לשברי מאמץ, שגורמים לכאבים עצומים ועלולים להוביל לנשירה מההכשרה.",
    },
    iron: {
        id: "iron",
        label: "מחסור בברזל",
        img: bloodImg,
        text: "מחסור בברזל פוגע ביכולת הריכוז והחשיבה, וגורם לעייפות.",
    },
};

export default function IronPage({ navigate }) {
    const { completePlanet } = useGame();

    const [activeId, setActiveId] = useState(null);
    const [visited, setVisited] = useState(new Set());

    const activeTopic = activeId ? TOPICS[activeId] : null;
    const allVisited = visited.size === Object.keys(TOPICS).length;

    const openTopic = (id) => {
        setActiveId(id);
        setVisited((prev) => new Set(prev).add(id));
    };

    const closeModal = () => setActiveId(null);

    const handleFinish = () => {
        completePlanet("bone");
        navigate("home");
    };

    return (
        <div className="IronPage">
            <div className="page-header">
                <button className="home-btn" onClick={() => navigate("home")} aria-label="בית">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path
                            d="M4 11 12 4l8 7M6 10v9h5v-5h2v5h5v-9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
                <div className="planet-chip">
                    כוכב
                    <br />
                    ברזל ושברי מאמץ
                </div>
            </div>

            <div className="content-panel">
                <p className="intro-text">
                    תזונה לא מאוזנת בתקופת האימון המתקדם עלולה להוביל לשברי מאמץ ולמחסור בברזל.
                </p>
                <p className="section-subtitle">לחצו על הנושאים בשביל ללמוד עליהם</p>

                <div className="body-stage">
                    <img src={humanImg} alt="גוף אדם" className="human-img" />

                    <svg className="body-lines" viewBox="0 0 400 700" preserveAspectRatio="none">
                        <path
                            d="M300 130 L300 220 L235 260"
                            className={`bline ${visited.has("fracture") ? "visited" : ""}`}
                        />
                        <path
                            d="M110 560 L110 480 L175 435"
                            className={`bline ${visited.has("iron") ? "visited" : ""}`}
                        />
                    </svg>

                    <button
                        className={`body-chip chip-fracture ${visited.has("fracture") ? "visited" : ""}`}
                        onClick={() => openTopic("fracture")}
                    >
                        שברי מאמץ
                    </button>

                    <button
                        className={`body-chip chip-iron ${visited.has("iron") ? "visited" : ""}`}
                        onClick={() => openTopic("iron")}
                    >
                        מחסור בברזל
                    </button>
                </div>

                {allVisited && (
                    <button onClick={handleFinish} className="finish-button reveal">
                        סיימתי
                    </button>
                )}
            </div>

            {activeTopic && (
                <div className="iron-modal-overlay">
                    <div className="iron-modal-panel">
                        <button className="iron-modal-close" onClick={closeModal} aria-label="סגור">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        <div className="iron-modal-tab">{activeTopic.label}</div>

                        <div className="iron-scan-frame">
                            <img src={activeTopic.img} alt={activeTopic.label} />
                        </div>

                        <p className="iron-step-text iron-single-text">{activeTopic.text}</p>

                        <button className="iron-action-btn iron-action-btn-full" onClick={closeModal}>
                            הבנתי
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}