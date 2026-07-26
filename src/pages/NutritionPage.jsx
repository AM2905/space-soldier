import { useState } from "react";
import "../css/NutritionPage.css";
import { useGame } from "../context/GameContext.jsx";
import greenBall from "../assets/nutritionPlanet.svg";

/* ---------------------------------------------------------
   Simple line-art food icons (kept in this file so the
   component is drop-in without extra asset files).
--------------------------------------------------------- */
function Icon({ name }) {
    const common = {
        viewBox: "0 0 64 64",
        width: 40,
        height: 40,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };

    switch (name) {
        case "rice":
            return (
                <svg {...common}>
                    <path d="M10 28h44a2 2 0 0 1 2 2c0 12-10.7 20-24 20S8 42 8 30a2 2 0 0 1 2-2Z" />
                    <path d="M18 28c1-6 6-10 14-10s13 4 14 10" />
                    <circle cx="24" cy="34" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="32" cy="37" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="40" cy="34" r="1.4" fill="currentColor" stroke="none" />
                </svg>
            );
        case "corn":
            return (
                <svg {...common}>
                    <path d="M32 6c8 0 12 8 12 20s-4 30-12 32c-8-2-12-20-12-32S24 6 32 6Z" />
                    {[0, 1, 2, 3, 4, 5].map((row) => (
                        <path
                            key={row}
                            d={`M${21 + (row % 2)} ${16 + row * 6}q11 5 22 0`}
                        />
                    ))}
                    <path d="M28 6c-3-4-8-5-12-3M36 6c3-4 8-5 12-3" />
                </svg>
            );
        case "pasta":
            return (
                <svg {...common}>
                    <path d="M10 20c8 6 8 18 0 24 10-2 16 2 22 4 6-2 12-6 22-4-8-6-8-18 0-24-10 2-16-2-22-4-6 2-12 6-22 4Z" />
                    <circle cx="32" cy="32" r="3" />
                </svg>
            );
        case "bread":
            return (
                <svg {...common}>
                    <path d="M10 30c0-12 8-20 22-20s22 8 22 20v18a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V30Z" />
                    <path d="M18 30c2-8 8-12 14-12s12 4 14 12" />
                </svg>
            );
        case "potato":
            return (
                <svg {...common}>
                    <path d="M14 30c-3-8 2-16 11-18 4-5 12-6 17-2 8 1 13 8 11 16 4 6 2 15-5 18-4 5-13 6-19 3-8 1-16-5-15-14Z" />
                    <circle cx="24" cy="28" r="1.3" fill="currentColor" stroke="none" />
                    <circle cx="36" cy="24" r="1.3" fill="currentColor" stroke="none" />
                    <circle cx="34" cy="38" r="1.3" fill="currentColor" stroke="none" />
                </svg>
            );
        case "fruit":
            return (
                <svg {...common}>
                    <path d="M32 16c9 0 16 8 16 18s-7 20-16 20-16-10-16-20 7-18 16-18Z" />
                    <path d="M32 16c0-4 2-7 6-9" />
                    <path d="M32 8c3-1 6 0 7 3-3 2-6 1-7-3Z" />
                </svg>
            );
        case "egg":
            return (
                <svg {...common}>
                    <path d="M32 8c9 0 16 16 16 28a16 16 0 0 1-32 0C16 24 23 8 32 8Z" />
                </svg>
            );
        case "chicken":
            return (
                <svg {...common}>
                    <path d="M22 12c8-4 16 0 16 8 6 2 10 8 8 14-1 4-5 6-9 5-2 6-8 10-14 8-6-2-9-8-7-14-4-3-5-9-1-13 1-6 4-7 7-8Z" />
                    <path d="M22 32c-4 6-2 14 4 18" />
                </svg>
            );
        case "fish":
            return (
                <svg {...common}>
                    <path d="M8 32c8-10 20-14 30-14 10 0 16 6 18 14-2 8-8 14-18 14-10 0-22-4-30-14Z" />
                    <path d="M56 32l6-8v16l-6-8Z" />
                    <circle cx="20" cy="30" r="1.6" fill="currentColor" stroke="none" />
                    <path d="M28 22c2 4 2 8 0 12M36 20c2 6 2 12 0 18" />
                </svg>
            );
        case "beans":
            return (
                <svg {...common}>
                    <path d="M18 14c10-6 22 4 20 16-2 4-6 6-10 5-8 10-22 10-26 0-4-8 2-18 16-21Z" />
                    <ellipse cx="26" cy="26" rx="4" ry="6" transform="rotate(30 26 26)" />
                    <ellipse cx="34" cy="34" rx="4" ry="6" transform="rotate(30 34 34)" />
                </svg>
            );
        case "tofu":
            return (
                <svg {...common}>
                    <rect x="16" y="18" width="32" height="28" rx="2" />
                    <path d="M16 18l6-6h26l-6 6M42 12v28" />
                </svg>
            );
        case "yogurt":
            return (
                <svg {...common}>
                    <path d="M22 12h20l-2 8H24l-2-8Z" />
                    <path d="M20 20h24l-3 26a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4l-3-26Z" />
                </svg>
            );
        case "avocado":
            return (
                <svg {...common}>
                    <path d="M32 8c10 2 16 14 16 24 0 12-7 22-16 22S16 44 16 32C16 22 22 10 32 8Z" />
                    <circle cx="32" cy="34" r="8" />
                </svg>
            );
        case "oil":
            return (
                <svg {...common}>
                    <path d="M26 8h10l2 8h-14l2-8Z" />
                    <path d="M22 16h18l4 8v26a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V24l4-8Z" />
                    <path d="M18 34h26" />
                </svg>
            );
        case "nuts":
            return (
                <svg {...common}>
                    <path d="M22 14c6-6 14-6 18 2 6 2 8 10 4 16 2 6-2 12-8 13-4 4-10 4-14 0-6-1-10-7-8-13-4-6-2-14 4-16 1-1 3-2 4-2Z" />
                    <path d="M32 16v28" />
                </svg>
            );
        case "seeds":
            return (
                <svg {...common}>
                    {[
                        [20, 22], [30, 18], [40, 24], [22, 34], [34, 32], [44, 36], [26, 44], [38, 44],
                    ].map(([x, y], i) => (
                        <ellipse key={i} cx={x} cy={y} rx="3" ry="5" transform={`rotate(${i * 25} ${x} ${y})`} />
                    ))}
                </svg>
            );
        case "cheese":
            return (
                <svg {...common}>
                    <path d="M8 44 30 12l26 10-10 22H8Z" />
                    <circle cx="24" cy="34" r="2" />
                    <circle cx="34" cy="26" r="1.6" />
                    <circle cx="38" cy="38" r="1.8" />
                </svg>
            );
        case "cabbage":
            return (
                <svg {...common}>
                    <path d="M32 10c12 0 20 10 20 22s-8 22-20 22-20-10-20-22S20 10 32 10Z" />
                    <path d="M32 14c8 4 12 10 12 18M32 14c-8 4-12 10-12 18M20 32c4 4 8 6 12 6s8-2 12-6" />
                </svg>
            );
        case "jar":
            return (
                <svg {...common}>
                    <rect x="18" y="20" width="28" height="30" rx="3" />
                    <rect x="20" y="12" width="24" height="8" rx="2" />
                    <path d="M18 30h28" />
                    <text x="32" y="42" fontSize="7" textAnchor="middle" fill="currentColor" stroke="none">טחינה</text>
                </svg>
            );
        case "pepper":
            return (
                <svg {...common}>
                    <path d="M28 10c2 4-2 6-2 10" />
                    <path d="M26 20c14-4 24 6 22 18-2 12-14 20-24 16-8-3-12-12-10-20 1-6 6-12 12-14Z" />
                </svg>
            );
        case "kiwi":
            return (
                <svg {...common}>
                    <circle cx="32" cy="32" r="20" />
                    <circle cx="32" cy="32" r="12" fill="none" />
                    {[0, 60, 120, 180, 240, 300].map((a, i) => (
                        <line
                            key={i}
                            x1="32"
                            y1="32"
                            x2={32 + 11 * Math.cos((a * Math.PI) / 180)}
                            y2={32 + 11 * Math.sin((a * Math.PI) / 180)}
                        />
                    ))}
                </svg>
            );
        case "strawberry":
            return (
                <svg {...common}>
                    <path d="M32 18c8 0 16 8 14 18-2 10-8 18-14 18s-12-8-14-18c-2-10 6-18 14-18Z" />
                    <path d="M24 16l4 4 4-6 4 6 4-4" />
                    {[[26, 26], [36, 24], [30, 34], [38, 34], [28, 40]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="1.2" fill="currentColor" stroke="none" />
                    ))}
                </svg>
            );
        case "citrus":
            return (
                <svg {...common}>
                    <circle cx="32" cy="32" r="20" />
                    {[0, 45, 90, 135].map((a, i) => (
                        <line
                            key={i}
                            x1={32 - 18 * Math.cos((a * Math.PI) / 180)}
                            y1={32 - 18 * Math.sin((a * Math.PI) / 180)}
                            x2={32 + 18 * Math.cos((a * Math.PI) / 180)}
                            y2={32 + 18 * Math.sin((a * Math.PI) / 180)}
                        />
                    ))}
                </svg>
            );
        case "banana":
            return (
                <svg {...common}>
                    <path d="M14 20c4 18 14 28 30 26" />
                    <path d="M44 46c4-1 7-4 8-8" />
                    <path d="M14 20c-2-4 0-8 4-8" />
                </svg>
            );
        case "chocolate":
            return (
                <svg {...common}>
                    <rect x="12" y="18" width="40" height="28" rx="2" />
                    <path d="M32 18v28M12 32h40M22 18v28M42 18v28" />
                </svg>
            );
        default:
            return null;
    }
}

/* ---------------------------------------------------------
   Content data
--------------------------------------------------------- */
const TOPICS = [
    {
        id: "carbs",
        num: 1,
        title: "פחמימות",
        pos: "top-right",
        desc: " הן מקור האנרגיה העיקרי של הגוף.\nהן מספקות כוח לפעילות גופנית, ריכוז ותפקוד במהלך היום.",
        foods: [
            { icon: "rice", label: "אורז" },
            { icon: "corn", label: "תירס" },
            { icon: "pasta", label: "פסטה" },
            { icon: "bread", label: "לחם" },
            { icon: "potato", label: "תפוח אדמה" },
            { icon: "fruit", label: "פירות" },
        ],
    },
    {
        id: "protein",
        num: 2,
        title: "חלבונים",
        pos: "left",
        desc: "חלבונים הם אבני הבניין של השרירים, העור והתאים בגוף.\nהם חיוניים לצמיחה, התחדשות ותיקון רקמות.",
        foods: [
            { icon: "egg", label: "ביצים" },
            { icon: "chicken", label: "עוף" },
            { icon: "fish", label: "דגים" },
            { icon: "beans", label: "קטניות" },
            { icon: "tofu", label: "טופו" },
            { icon: "yogurt", label: "יוגורט" },
        ],
    },
    {
        id: "fat",
        num: 3,
        title: "שומנים",
        pos: "bottom-right",
        desc: "שומנים מספקים אנרגיה מרוכזת, מסייעים בספיגת ויטמינים\nותומכים בבריאות המוח וההורמונים.",
        foods: [
            { icon: "avocado", label: "אבוקדו" },
            { icon: "oil", label: "שמן זית" },
            { icon: "nuts", label: "אגוזים" },
            { icon: "seeds", label: "גרעינים" },
            { icon: "jar", label: "טחינה" },
            { icon: "fish", label: "דגים שמנים" },
        ],
    },
    {
        id: "vitamins",
        num: 4,
        title: "ויטמינים ומינרלים",
        pos: "bottom-left",
        subs: [
            {
                id: "calcium",
                label: "סידן",
                desc: "סידן הוא המרכיב העיקרי של העצם.",
                foods: [
                    { icon: "nuts", label: "שקדים" },
                    { icon: "cheese", label: "מוצרי חלב" },
                    { icon: "cabbage", label: "כרוב" },
                    { icon: "jar", label: "טחינה" },
                ],
            },
            {
                id: "vitc",
                label: "ויטמין C",
                desc: "ויטמין C מחזק את מערכת החיסון ומסייע בספיגת ברזל.",
                foods: [
                    { icon: "pepper", label: "פלפל אדום" },
                    { icon: "kiwi", label: "קיווי" },
                    { icon: "strawberry", label: "תות" },
                    { icon: "citrus", label: "הדרים" },
                ],
            },
            {
                id: "magnesium",
                label: "מגנזיום",
                desc: "מגנזיום תומך בתפקוד השרירים והעצבים ומסייע בייצור אנרגיה.",
                foods: [
                    { icon: "nuts", label: "שקדים" },
                    { icon: "banana", label: "בננה" },
                    { icon: "chocolate", label: "שוקולד מריר" },
                    { icon: "beans", label: "קטניות" },
                ],
            },
        ],
    },
];

export default function NutritionPage({ navigate }) {
    const { completePlanet } = useGame();

    const [activeId, setActiveId] = useState(null);
    const [activeSub, setActiveSub] = useState("calcium");
    const [visited, setVisited] = useState(new Set());

    const allVisited = visited.size === TOPICS.length;
    const activeIndex = TOPICS.findIndex((t) => t.id === activeId);
    const activeTopic = TOPICS[activeIndex];

    const openTopic = (id) => {
        setActiveId(id);
        if (id === "vitamins") setActiveSub("calcium");
        setVisited((prev) => new Set(prev).add(id));
    };

    const closeModal = () => setActiveId(null);

    const goNext = () => {
        const next = TOPICS[activeIndex + 1];
        if (next) openTopic(next.id);
        else closeModal();
    };

    const handleFinish = () => {
        completePlanet("nutrition");
        navigate("home");
    };

    return (
        <div className="NutritionPage">
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
                <div className="planet-chip">כוכב יסודות התזונה</div>
            </div>

            <div className="status-badge">
                <span className="status-dot" />
                STATUS: ONLINE
            </div>

            <div className="content-panel">
                <h1 className="section-title">כוכב יסודות התזונה מרוכב מ-4 יסודות חשובים</h1>
                <p className="section-subtitle">לחצו על היסודות בשביל ללמוד עליהם</p>

                <div className="hub-stage">
                    <svg className="hub-lines" viewBox="0 0 400 520" preserveAspectRatio="none">
                        <path d="M300 90 L300 190 L255 235" className={visited.has("carbs") ? "line visited" : "line"} />
                        <path d="M95 155 L95 245 L155 260" className={visited.has("protein") ? "line visited" : "line"} />
                        <path d="M310 400 L310 320 L250 290" className={visited.has("fat") ? "line visited" : "line"} />
                        <path d="M105 445 L105 340 L165 300" className={visited.has("vitamins") ? "line visited" : "line"} />
                    </svg>

                    <img src={greenBall} alt="מימייה" className="planet-orb" />

                    {TOPICS.map((t) => (
                        <div className={`hub-node node-${t.pos}`} key={t.id}>
                            <div className={`node-num ${visited.has(t.id) ? "done" : ""}`}>{t.num}</div>
                            <button
                                className={`node-chip ${visited.has(t.id) ? "done" : ""}`}
                                onClick={() => openTopic(t.id)}
                            >
                                {t.title}
                            </button>
                        </div>
                    ))}
                </div>

                {allVisited && (
                    <button onClick={handleFinish} className="finish-button reveal">
                        למפת הגלקסיה
                    </button>
                )}
            </div>

            {activeTopic && (
                <div className="modal-overlay">
                    <div className="modal-panel">
                        <button className="modal-close" onClick={closeModal} aria-label="סגור">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        <div className="modal-tab">{activeTopic.title}</div>
                        <div className="modal-count">{activeTopic.num}/4</div>

                        {activeTopic.id === "vitamins" ? (
                            <VitaminsBody topic={activeTopic} activeSub={activeSub} setActiveSub={setActiveSub} />
                        ) : (
                            <>
                                <p className="modal-desc">
                                    {activeTopic.desc.split("\n").map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                                <FoodGrid foods={activeTopic.foods} />
                            </>
                        )}

                        <button className="modal-action" onClick={goNext}>
                            {activeIndex < TOPICS.length - 1 ? "המשך" : "חזור"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function VitaminsBody({ topic, activeSub, setActiveSub }) {
    const sub = topic.subs.find((s) => s.id === activeSub) || topic.subs[0];
    return (
        <>
            <p className="modal-hint">לחצו על הנושאים בשביל ללמוד</p>
            <div className="sub-tabs">
                {topic.subs.map((s) => (
                    <button
                        key={s.id}
                        className={`sub-tab ${s.id === activeSub ? "active" : ""}`}
                        onClick={() => setActiveSub(s.id)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>
            <div className="sub-divider" />
            <p className="modal-desc">{sub.desc}</p>
            <FoodGrid foods={sub.foods} />
        </>
    );
}

function FoodGrid({ foods }) {
    return (
        <>
            <div className="where-tag">איפה נמצא?</div>
            <div className="food-grid">
                {foods.map((f, i) => (
                    <div className="food-item" key={i}>
                        <Icon name={f.icon} />
                        <span>{f.label}</span>
                    </div>
                ))}
            </div>
        </>
    );
}