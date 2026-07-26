import { useState } from "react";
import "../css/IronPage.css";
import { useGame } from "../context/GameContext.jsx";
import humanImg from "../assets/human.svg";
import footImg from "../assets/foot.svg";
import bloodImg from "../assets/blood.svg";

/* ---------------------------------------------------------
   Small line-art icons used inside the step content
--------------------------------------------------------- */
function Icon({ name, size = 26 }) {
    const common = {
        viewBox: "0 0 24 24",
        width: size,
        height: size,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.6,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    switch (name) {
        case "warning":
            return (
                <svg {...common}>
                    <path d="M12 3 22 20H2Z" />
                    <path d="M12 9v5" />
                    <circle cx="12" cy="17.3" r="0.9" fill="currentColor" stroke="none" />
                </svg>
            );
        case "lightbulb":
            return (
                <svg {...common}>
                    <path d="M9 18h6M10 21h4" />
                    <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9v.2h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z" />
                </svg>
            );
        case "muscle":
            return (
                <svg {...common}>
                    <path d="M4 14c0-3 2-4 4-4 1 0 1.5.4 2 1 1-3 3-5 6-5 3.5 0 6 2.5 6 6 0 4-3 8-8 9-3 .6-6-1-8-3-1-1-2-2.5-2-4Z" />
                    <path d="M9 11c1 1 1 3 0 5" />
                </svg>
            );
        case "bone":
            return (
                <svg {...common}>
                    <path d="M6.5 6.5a2 2 0 1 1 3 2.6l5.4 5.4a2 2 0 1 1-2.8 2.8l-5.4-5.4a2 2 0 1 1-2.6-3l2.4-2.4Z" />
                    <path d="M17.5 6.5a2 2 0 1 0-3 2.6M6.5 17.5a2 2 0 1 0 2.6-3" />
                </svg>
            );
        case "sleep":
            return (
                <svg {...common}>
                    <text x="4" y="10" fontSize="8" fill="currentColor" stroke="none" fontWeight="700">Z</text>
                    <text x="10" y="16" fontSize="6" fill="currentColor" stroke="none" fontWeight="700">z</text>
                    <text x="15" y="21" fontSize="4.5" fill="currentColor" stroke="none" fontWeight="700">z</text>
                </svg>
            );
        case "pause":
            return (
                <svg {...common}>
                    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
                    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
                </svg>
            );
        case "brain":
            return (
                <svg {...common}>
                    <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.7A3 3 0 0 0 8 17a3 3 0 0 0 5 1V6a3 3 0 0 0-4-2Z" />
                    <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.7A3 3 0 0 1 16 17" />
                    <path d="M12 6v11" />
                </svg>
            );
        case "head":
            return (
                <svg {...common}>
                    <circle cx="12" cy="10" r="6" />
                    <path d="M9 21c0-3 1.5-4 1.5-4M15 21c0-3-1.5-4-1.5-4" />
                    <path d="M9 9l2 2-2 2M15 9l-2 2 2 2" />
                </svg>
            );
        case "running":
            return (
                <svg {...common}>
                    <circle cx="15" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
                    <path d="M9 21l2.5-5 2-2-1-4-3 1-2 4M11.5 14l3 1 3.5 5M9.5 10l3-3 4 1.5" />
                </svg>
            );
        case "shieldPlus":
            return (
                <svg {...common}>
                    <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Z" />
                    <path d="M12 9v6M9 12h6" />
                </svg>
            );
        case "chicken":
            return (
                <svg {...common}>
                    <path d="M9 4c4-2 8 1 7 6-.5 3-2.5 5-5.5 7-3 2-5 3.5-4.5 5.5-2-1-3-3.5-2-6 1-3 3-4 4-6.5C9.5 7.5 8 6 9 4Z" />
                </svg>
            );
        case "meat":
            return (
                <svg {...common}>
                    <path d="M5 19c-2-2-2-6 1-9 3-3 8-4 11-1 3 3 2 8-1 11-3 3-8 2-11-1Z" />
                    <path d="M4 20l2.5-2.5" />
                </svg>
            );
        case "fish":
            return (
                <svg {...common}>
                    <path d="M2 12c3-4 8-6 12-6 4 0 6.5 2.5 7 6-.5 3.5-3 6-7 6-4 0-9-2-12-6Z" />
                    <path d="M21 12l2-3v6l-2-3Z" />
                    <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
                </svg>
            );
        case "nuts":
            return (
                <svg {...common}>
                    <path d="M8 6c2-2 5-2 6.5.5 2 .5 3 3.5 1.5 5.5.5 2-1 4.5-3 5-1.5 1.5-3.5 1.5-5 0-2-.5-3.5-3-3-5-1.5-2-.5-4.5 1.5-5.5.4-.3.9-.5 1.5-.5Z" />
                    <path d="M12 6v11" />
                </svg>
            );
        case "tahini":
            return (
                <svg {...common}>
                    <rect x="6" y="8" width="12" height="12" rx="1.5" />
                    <rect x="7" y="4" width="10" height="4" rx="1" />
                    <path d="M6 13h12" />
                </svg>
            );
        case "peas":
            return (
                <svg {...common}>
                    <path d="M4 15c0-6 4-10 9-10 4 0 7 3 7 7 0 5-4 9-9 9-4 0-7-2.5-7-6Z" />
                    <circle cx="9" cy="11" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="13" cy="9" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="15" cy="14" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="10.5" cy="16" r="1.4" fill="currentColor" stroke="none" />
                </svg>
            );
        case "citrus":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" />
                    {[0, 45, 90, 135].map((a, i) => (
                        <line
                            key={i}
                            x1={12 - 7 * Math.cos((a * Math.PI) / 180)}
                            y1={12 - 7 * Math.sin((a * Math.PI) / 180)}
                            x2={12 + 7 * Math.cos((a * Math.PI) / 180)}
                            y2={12 + 7 * Math.sin((a * Math.PI) / 180)}
                        />
                    ))}
                </svg>
            );
        case "cabbage":
            return (
                <svg {...common}>
                    <path d="M12 4c5 0 8 4 8 9s-3 9-8 9-8-4-8-9 3-9 8-9Z" />
                    <path d="M12 6c3 2 5 4 5 7M12 6c-3 2-5 4-5 7M8 13c1.5 1.5 3 2.3 4 2.3s2.5-.8 4-2.3" />
                </svg>
            );
        case "tomato":
            return (
                <svg {...common}>
                    <circle cx="12" cy="14" r="7" />
                    <path d="M9 7c1-1.5 2-2 3-2s2 .5 3 2M12 5v3" />
                </svg>
            );
        case "pepper":
            return (
                <svg {...common}>
                    <path d="M11 3c.5 1.5-1 2.5-1 4" />
                    <path d="M10 7c6-2 10 2 9 8-1 5-6 8-10 6-3-1.3-5-5-4-8.5C5.5 9.5 8 8 10 7Z" />
                </svg>
            );
        default:
            return null;
    }
}

/* ---------------------------------------------------------
   Reusable UI pieces
--------------------------------------------------------- */
function ListRow({ icon, children }) {
    return (
        <div className="iron-list-row">
            <span className="iron-list-icon"><Icon name={icon} /></span>
            <span className="iron-list-text">{children}</span>
        </div>
    );
}

function FoodRow({ items }) {
    return (
        <div className="iron-food-row">
            {items.map((it, i) => (
                <div className="iron-food-cell" key={i}>
                    <Icon name={it.icon} size={30} />
                    <span>{it.label}</span>
                </div>
            ))}
        </div>
    );
}

/* ---------------------------------------------------------
   Step content definitions
--------------------------------------------------------- */
const FRACTURE_STEPS = [
    {
        heading: "מהו שבר מאמץ?",
        finalLabel: null,
        render: () => (
            <>
                <p className="iron-step-text">שבר מאמץ נגרם מעומס חוזר על העצם.</p>
                <div className="iron-scan-frame">
                    <img src={footImg} alt="שבר מאמץ בכף הרגל" />
                </div>
                <p className="iron-step-text">
                    תזונה לקויה עלולה להגביר את הסיכון לשברי מאמץ ולפגוע בכשירות.
                </p>
            </>
        ),
    },
    {
        heading: "סימני אזהרה",
        render: () => (
            <>
                <ListRow icon="warning">כאב בזמן פעילות</ListRow>
                <ListRow icon="warning">כאב גם במנוחה</ListRow>
                <ListRow icon="warning">כאב שמחמיר עם הזמן</ListRow>
                <div className="iron-tip-box">
                    <Icon name="lightbulb" size={30} />
                    <span>
                        יש כאב?
                        <br />
                        פנה לחופ"ל לבירור
                    </span>
                </div>
            </>
        ),
    },
    {
        heading: "איך מפחיתים את הסיכון",
        finalLabel: "סיום",
        render: () => (
            <>
                <ListRow icon="muscle">הקפד על צריכת חלבון מדי יום.</ListRow>
                <ListRow icon="bone">צרוך מזונות עשירים בסידן.</ListRow>
                <ListRow icon="sleep">אפשר לגוף מנוחה והתאוששות.</ListRow>
                <div className="iron-info-box">
                    <Icon name="shieldPlus" size={30} />
                    <span>שמירה על תזונה נכונה מפחיתה את הסיכון לשברי מאמץ</span>
                </div>
            </>
        ),
    },
];

const IRON_STEPS = [
    {
        heading: "מהו מחסור בברזל?",
        render: () => (
            <>
                <p className="iron-step-text">
                    ברזל הוא מרכיב חיוני בהמוגלובין, שתפקידו להעביר חמצן לכל הגוף.
                </p>
                <div className="iron-scan-frame">
                    <img src={bloodImg} alt="תאי דם אדומים" />
                </div>
                <p className="iron-step-text">
                    כאשר חסר ברזל, הגוף מקבל פחות חמצן, מה שעלול לפגוע בביצועים ובכשירות.
                </p>
            </>
        ),
    },
    {
        heading: "סימנים למחסור",
        render: () => (
            <>
                <ListRow icon="pause">עייפות ותשישות</ListRow>
                <ListRow icon="brain">קושי בריכוז</ListRow>
                <ListRow icon="head">כאבי ראש וסחרחורות</ListRow>
                <ListRow icon="running">ירידה בביצועים</ListRow>
                <div className="iron-warning-box">
                    <Icon name="warning" size={26} />
                    <span>חוסר בברזל פוגע בכשירות שלך!</span>
                </div>
            </>
        ),
    },
    {
        heading: "מקורות לברזל",
        render: () => (
            <>
                <div className="iron-source-group">
                    <div className="iron-source-title">מהחי</div>
                    <FoodRow
                        items={[
                            { icon: "chicken", label: "עוף" },
                            { icon: "meat", label: "בשר" },
                            { icon: "fish", label: "דגים" },
                        ]}
                    />
                </div>
                <div className="iron-source-group iron-source-plant">
                    <div className="iron-source-title">מהצומח</div>
                    <FoodRow
                        items={[
                            { icon: "nuts", label: "אגוזים ושקדים" },
                            { icon: "tahini", label: "טחינה" },
                            { icon: "peas", label: "קטניות" },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        heading: "טיפים להגברת הספיגה",
        finalLabel: "המשך",
        render: () => (
            <>
                <p className="iron-step-text">
                    שילוב ויטמין C בארוחה מסייע לספיגה טובה יותר של הברזל, במיוחד כאשר מקור
                    הברזל הוא מהצומח.
                </p>
                <div className="iron-section-label">מקורות של ויטמין C</div>
                <FoodRow
                    items={[
                        { icon: "citrus", label: "פירות הדר" },
                        { icon: "cabbage", label: "כרוב טרי" },
                        { icon: "tomato", label: "עגבניה" },
                        { icon: "pepper", label: "גמבה" },
                    ]}
                />
            </>
        ),
    },
];

const TOPICS = {
    fracture: { id: "fracture", label: "שברי מאמץ", steps: FRACTURE_STEPS },
    iron: { id: "iron", label: "מחסור בברזל", steps: IRON_STEPS },
};

export default function IronPage({ navigate }) {
    const { completePlanet } = useGame();

    const [activeId, setActiveId] = useState(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [visited, setVisited] = useState(new Set());

    const activeTopic = activeId ? TOPICS[activeId] : null;
    const allVisited = visited.size === Object.keys(TOPICS).length;

    const openTopic = (id) => {
        setActiveId(id);
        setStepIndex(0);
    };

    const closeModal = () => setActiveId(null);

    const goNext = () => {
        if (!activeTopic) return;
        if (stepIndex < activeTopic.steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setVisited((prev) => new Set(prev).add(activeId));
            closeModal();
        }
    };

    const goBack = () => {
        if (stepIndex > 0) setStepIndex(stepIndex - 1);
    };

    const handleFinish = () => {
        completePlanet("bone");
        navigate("home");
    };

    const step = activeTopic ? activeTopic.steps[stepIndex] : null;
    const isFirst = stepIndex === 0;
    const isLast = activeTopic ? stepIndex === activeTopic.steps.length - 1 : false;

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

            {activeTopic && step && (
                <div className="iron-modal-overlay">
                    <div className="iron-modal-panel">
                        <button className="iron-modal-close" onClick={closeModal} aria-label="סגור">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        <div className="iron-modal-tab">{activeTopic.label}</div>
                        <div className="iron-modal-count">
                            {stepIndex + 1}/{activeTopic.steps.length}
                        </div>

                        <div className="iron-step-heading">{step.heading}</div>

                        <div className="iron-step-body">{step.render()}</div>

                        <div className="iron-modal-actions">
                            {!isFirst ? (
                                <button className="iron-action-btn secondary" onClick={goBack}>
                                    חזור
                                </button>
                            ) : (
                                <span className="iron-action-btn-spacer" />
                            )}
                            <button className="iron-action-btn" onClick={goNext}>
                                {isLast ? step.finalLabel || "סיום" : "המשך"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}