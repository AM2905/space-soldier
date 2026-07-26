import { useState } from "react";
import "../css/GoodPlate.css";
import { useGame } from "../context/GameContext.jsx";

/* ---------------------------------------------------------
   Geometry helpers for the donut / pie paths
--------------------------------------------------------- */
function polarToCartesian(cx, cy, r, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function describeDonutSector(cx, cy, rOuter, rInner, startDeg, endDeg) {
    const large = endDeg - startDeg > 180 ? 1 : 0;
    const p1 = polarToCartesian(cx, cy, rOuter, startDeg);
    const p2 = polarToCartesian(cx, cy, rOuter, endDeg);
    const p3 = polarToCartesian(cx, cy, rInner, endDeg);
    const p4 = polarToCartesian(cx, cy, rInner, startDeg);
    return `M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

function describePieSlice(cx, cy, r, startDeg, endDeg) {
    const large = endDeg - startDeg > 180 ? 1 : 0;
    const p1 = polarToCartesian(cx, cy, r, startDeg);
    const p2 = polarToCartesian(cx, cy, r, endDeg);
    return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y} Z`;
}

/* ---------------------------------------------------------
   Small icons
--------------------------------------------------------- */
function LockIcon({ color = "#8fa3a6" }) {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" style={{ overflow: "visible" }}>
            <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.8" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function CheckIcon({ color }) {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" style={{ overflow: "visible" }}>
            <circle cx="12" cy="12" r="10" fill={color} />
            <path d="M7.5 12.5l3 3 6-6" fill="none" stroke="#04120c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ---------------------------------------------------------
   Content data
--------------------------------------------------------- */
const SECTORS = [
    {
        id: "protein",
        label: "חלבונים",
        color: "#4ce3ff",
        start: -60,
        end: 60,
        desc: "חלבונים אחראים על בניית הגוף והשרירים.",
        fraction: 120,
        fractionLabel: "שליש מהצלחת!",
    },
    {
        id: "veg",
        label: "ירקות ופירות",
        color: "#57e28a",
        start: 60,
        end: 180,
        desc: "ירקות ופירות מספקים סיבים תזונתיים, ויטמינים ונוגדי חמצון החשובים לבריאות הגוף.",
        fraction: 120,
        fractionLabel: "שליש מהצלחת!",
    },
    {
        id: "carbs",
        label: "פחמימות",
        color: "#f2d84d",
        start: 180,
        end: 300,
        desc: "פחמימות מספקות אנרגיה זמינה לפעילות היומיומית ולתפקוד התקין של המוח.",
        fraction: 120,
        fractionLabel: "שליש מהצלחת!",
    },
];

const FAT = {
    id: "fat",
    label: "שומנים",
    color: "#ef5a5a",
    desc: "עדיף לבחור בשומנים מהצומח. הם מספקים חומצות שומן חיוניות ועוזרים לספיגת ויטמינים.",
    caption: "מוסיפים מנה קטנה של שומן",
};

const ALL_TOPICS = [...SECTORS, FAT];
const CX = 200;
const CY = 200;
const R_OUTER = 190;
const R_INNER = 95; // also the fat circle's radius

export default function GoodPlate({ navigate }) {
    const { completePlanet } = useGame();

    const [activeId, setActiveId] = useState(null);
    const [visited, setVisited] = useState(new Set());

    const allVisited = visited.size === ALL_TOPICS.length;
    const activeTopic = ALL_TOPICS.find((t) => t.id === activeId) || null;

    const openTopic = (id) => {
        setActiveId(id);
        setVisited((prev) => new Set(prev).add(id));
    };

    const handleFinish = () => {
        completePlanet("plate");
        navigate("home");
    };

    return (
        <div className="GoodPlate">
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
                <div className="planet-chip">כוכב הצלחת המאוזנת</div>
            </div>

            {/* <div className="status-badge">
                <span className="status-dot" />
                STATUS: ONLINE
            </div> */}

                <h1 className="section-title">צלחת מאוזנת מורכבת מ-4 חלקים חשובים</h1>
                <p className="section-subtitle">לחצו על החלקים בשביל ללמוד עליהם</p>

                {activeTopic && <TopicCard topic={activeTopic} />}

                <div className="plate-wheel-wrap">
                    <svg viewBox="0 0 400 400" className="plate-wheel">
                        {SECTORS.map((s) => {
                            const isDone = visited.has(s.id);
                            const mid = (s.start + s.end) / 2;
                            const iconPos = polarToCartesian(CX, CY, 118, mid);
                            const textPos = polarToCartesian(CX, CY, 155, mid);
                            return (
                                <g key={s.id}>
                                    <path
                                        d={describeDonutSector(CX, CY, R_OUTER, R_INNER, s.start, s.end)}
                                        className={`sector ${isDone ? "visited" : ""}`}
                                        style={isDone ? { stroke: s.color, color: s.color } : {}}
                                        onClick={() => openTopic(s.id)}
                                    />
                                    <g
                                        className="wheel-hotspot"
                                        onClick={() => openTopic(s.id)}
                                        transform={`translate(${iconPos.x} ${iconPos.y})`}
                                    >
                                        <foreignObject x="-11" y="-11" width="22" height="22">
                                            {isDone ? <CheckIcon color={s.color} /> : <LockIcon />}
                                        </foreignObject>
                                    </g>
                                    <text
                                        x={textPos.x}
                                        y={textPos.y}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className={`wheel-label ${isDone ? "visited" : ""}`}
                                        style={isDone ? { fill: s.color } : {}}
                                        onClick={() => openTopic(s.id)}
                                    >
                                        {s.label}
                                    </text>
                                </g>
                            );
                        })}

                        {(() => {
                            const isDone = visited.has(FAT.id);
                            return (
                                <g onClick={() => openTopic(FAT.id)} className="wheel-hotspot">
                                    <circle
                                        cx={CX}
                                        cy={CY}
                                        r={R_INNER}
                                        className={`fat-circle ${isDone ? "visited" : ""}`}
                                        style={isDone ? { stroke: FAT.color, color: FAT.color } : {}}
                                    />
                                    <foreignObject x={CX - 11} y={CY - 34} width="22" height="22">
                                        {isDone ? <CheckIcon color={FAT.color} /> : <LockIcon />}
                                    </foreignObject>
                                    <text
                                        x={CX}
                                        y={CY + 20}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className={`wheel-label ${isDone ? "visited" : ""}`}
                                        style={isDone ? { fill: FAT.color } : {}}
                                    >
                                        {FAT.label}
                                    </text>
                                </g>
                            );
                        })()}
                    </svg>
                </div>

                {allVisited && (
                    <button onClick={handleFinish} className="finish-button reveal">
                        למפת הגלקסיה
                    </button>
                )}
            </div>
    );
}

function TopicCard({ topic }) {
    return (
        <div className="topic-card" style={{ "--accent": topic.color }}>
            <div className="topic-tab">{topic.label}</div>
            <p className="topic-desc">{topic.desc}</p>

            {topic.id === "fat" ? (
                <FatVisual color={topic.color} />
            ) : (
                <FractionVisual deg={topic.fraction} color={topic.color} />
            )}

            <p className="topic-caption">{topic.id === "fat" ? topic.caption : topic.fractionLabel}</p>
        </div>
    );
}

function FractionVisual({ deg, color }) {
    const r = 80;
    const cx = 100;
    const cy = 100;
    const slice = describePieSlice(cx, cy, r, 0, deg);
    return (
        <svg viewBox="0 0 200 200" className="fraction-visual">
            <circle cx={cx} cy={cy} r={r} className="fraction-outline" />
            <path d={slice} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        </svg>
    );
}

function FatVisual({ color }) {
    return (
        <svg viewBox="0 0 200 200" className="fraction-visual">
            <circle cx="100" cy="100" r="80" className="fraction-outline" />
            <circle cx="100" cy="100" r="30" fill="none" stroke={color} strokeWidth="3" />
        </svg>
    );
}