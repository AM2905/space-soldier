import { useState } from "react";
import "../css/NutritionPage.css";
import { useGame } from "../context/GameContext.jsx";
import greenBall from "../assets/nutritionPlanet.svg";

import biscuits from "../assets/nutrition/biscuits.jpg";
import bread from "../assets/nutrition/bread.jpg";
import driedFruit from "../assets/nutrition/driedFruit.jpg";
import candy from "../assets/nutrition/candy.jpg";
import energyBar from "../assets/nutrition/energyBar.jpg";
import tuna from "../assets/nutrition/tuna.jpg";
import kabanos from "../assets/nutrition/kabanos.jpg";
import hummus from "../assets/nutrition/hummus.jpg";
import peas from "../assets/nutrition/peas.jpg";
import peanuts from "../assets/nutrition/peanuts.jpg";
import tahini from "../assets/nutrition/tahini.jpg";
import chocolateSpread from "../assets/nutrition/chocolateSpread.jpg";
import amba from "../assets/nutrition/amba.jpg";
import cannedFruit from "../assets/nutrition/cannedFruit.jpg";
import cannedVegetables from "../assets/nutrition/cannedVegetables.jpg";
import corn from "../assets/nutrition/corn.jpg";
import pickles from "../assets/nutrition/pickles.jpg";
import olives from "../assets/nutrition/olives.jpg";

const FOOD_IMAGES = {
    biscuits, bread, driedFruit, candy, energyBar,
    tuna, kabanos, hummus, peas, 
    peanuts, tahini, chocolateSpread, amba,
    cannedFruit, cannedVegetables, corn, pickles, olives,
};

/* ---------------------------------------------------------
   Content data
--------------------------------------------------------- */
const TOPICS = [
    {
        id: "carbs",
        num: 1,
        title: "פחמימות",
        pos: "top-right",
        desc: "דלק ואנרגיה לגוף",
        foods: [
            { img: "biscuits", label: "ביסקוויטים" },
            { img: "bread", label: "לחם" },
            { img: "driedFruit", label: "פירות יבשים" },
            { img: "candy", label: "סוכריות" },
            { img: "energyBar", label: "חטיף אנרגיה" },
        ],
    },
    {
        id: "protein",
        num: 2,
        title: "חלבונים",
        pos: "left",
        desc: "בונים שריר וכוח",
        foods: [
            { img: "tuna", label: "טונה" },
            { img: "kabanos", label: "קבנוס" },
            { img: "hummus", label: "חומוס" },
            { img: "peas", label: "אפונה משומרת" },
        
           
        ],
    },
    {
        id: "fat",
        num: 3,
        title: "שומנים",
        pos: "bottom-right",
        desc: "שומרים על המוח",
        foods: [
            { img: "peanuts", label: "בוטנים" },
            { img: "tahini", label: "טחינה" },
            { img: "chocolateSpread", label: "ממרח קקאו" },
            { img: "amba", label: "ממרחים" },
        ],
    },
    {
        id: "fruitsveg",
        num: 4,
        title: "ירקות ופירות",
        pos: "bottom-left",
        desc: "מחזקים את הגוף וההתאוששות",
        foods: [
            { img: "cannedFruit", label: "פירות משומרים" },
            { img: "cannedVegetables", label: "ירקות משומרים" },
            { img: "corn", label: "תירס" },
            { img: "pickles", label: "מלפפונים חמוצים" },
            { img: "olives", label: "זיתים" },
        ],
    },
];

export default function NutritionPage({ navigate }) {
    const { completePlanet } = useGame();

    const [activeId, setActiveId] = useState(null);
    const [visited, setVisited] = useState(new Set());

    const allVisited = visited.size === TOPICS.length;
    const activeIndex = TOPICS.findIndex((t) => t.id === activeId);
    const activeTopic = TOPICS[activeIndex];

    const openTopic = (id) => {
        setActiveId(id);
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
                <h1 className="section-title">יש 4 יסודות חשובים</h1>
                <p className="section-subtitle">לחצו על היסודות בשביל ללמוד עליהם</p>

                <div className="hub-stage">
                    <svg className="hub-lines" viewBox="0 0 400 520" preserveAspectRatio="none">
                        <path d="M300 90 L300 190 L255 235" className={visited.has("carbs") ? "line visited" : "line"} />
                        <path d="M95 155 L95 245 L155 260" className={visited.has("protein") ? "line visited" : "line"} />
                        <path d="M310 400 L310 320 L250 290" className={visited.has("fat") ? "line visited" : "line"} />
                        <path d="M105 445 L105 340 L165 300" className={visited.has("fruitsveg") ? "line visited" : "line"} />
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

                        <p className="modal-desc">{activeTopic.desc}</p>
                        <FoodGrid foods={activeTopic.foods} />

                        <button className="modal-action" onClick={goNext}>
                            {activeIndex < TOPICS.length - 1 ? "המשך" : "חזור"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function FoodGrid({ foods }) {
    return (
        <>
            <div className="where-tag">איפה נמצא?</div>
            <div className="food-grid">
                {foods.map((f, i) => (
                    <div className="food-item" key={i}>
                        <div className="food-img-wrap">
                            <img src={FOOD_IMAGES[f.img]} alt={f.label} className="food-img" />
                        </div>
                        <span>{f.label}</span>
                    </div>
                ))}
            </div>
        </>
    );
}