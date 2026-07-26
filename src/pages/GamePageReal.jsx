import { useEffect, useRef, useState } from "react";
import "../css/GamePageReal.css";
import { useGame } from "../context/GameContext.jsx";
import astro1 from "../assets/astro1.svg";
import explo from "../assets/explo.svg";
import platePlanet from "../assets/platePlanet.svg";
import waterPlanet from "../assets/waterPlanet.svg";
import nutritionPlanet from "../assets/nutritionPlanet.svg";
import bonePlanet from "../assets/bonePlanet.svg";

const TOTAL_ASTEROIDS = 10;
const LANES = [20, 50, 80]; // percentage left-offsets
const REST_TOP = 22; // resting top % for active asteroids
const ENTER_TOP = -22; // starting top % (off-screen) for spawn animation

const QUESTION_BANK = [
    {
        text: "כמה מים מומלץ לשתות ביום?",
        options: ["רק כשצמא", "ליטר אחד", "2 ליטר", "1.5 ליטר"],
        correctIndex: 2,
    },
    {
        text: "מה מקור האנרגיה העיקרי של הגוף?",
        options: ["ויטמינים", "פחמימות", "סיבים תזונתיים", "מים"],
        correctIndex: 1,
    },
    {
        text: "כמה מהצלחת אמורים להיות ירקות ופירות?",
        options: ["הכל", "רבע", "חצי", "שליש"],
        correctIndex: 3,
    },
    {
        text: "איזה מזון עשיר בסידן?",
        options: ["אורז", "תפוח אדמה", "מוצרי חלב", "בשר אדום"],
        correctIndex: 2,
    },
    {
        text: "מה תפקיד הברזל בגוף?",
        options: ["לחזק את הראייה", "להעביר חמצן בדם", "לעכל שומן", "לשמור על לחות העור"],
        correctIndex: 1,
    },
    {
        text: "מהו שבר מאמץ?",
        options: ["קרע ברצועה", "דלקת בשריר", "שבר מנפילה חזקה", "שבר מעומס חוזר על העצם"],
        correctIndex: 3,
    },
    {
        text: "כמה שעות שינה מומלצות בלילה?",
        options: ["3-4 שעות", "7-9 שעות", "5 שעות", "אין צורך בשינה קבועה"],
        correctIndex: 1,
    },
    {
        text: "איזה מהבאים הוא מקור טוב לחלבון?",
        options: ["סוכר", "שמן זית", "ביצים", "תפוזים"],
        correctIndex: 2,
    },
    {
        text: "איזה ויטמין מסייע בספיגת ברזל?",
        options: ["ויטמין B12", "ויטמין A", "ויטמין D", "ויטמין C"],
        correctIndex: 3,
    },
    {
        text: "מה חשוב לעשות בזמן פעילות גופנית ממושכת?",
        options: ["לאכול רק מתוק", "להימנע משתייה", "להוסיף שתיית מים", "לשבת במקום קריר בלבד"],
        correctIndex: 2,
    },
    {
        text: "מה תפקידם העיקרי של חלבונים בגוף?",
        options: ["בניית שרירים ותאים", "מקור אנרגיה מהיר", "ויסות חום הגוף", "שיפור הראייה"],
        correctIndex: 0,
    },
    {
        text: "איזה מהמזונות הבאים עשיר בפחמימות?",
        options: ["אורז", "שמן זית", "ביצה", "אגוזים"],
        correctIndex: 0,
    },
    {
        text: "מה תפקידם של שומנים בריאים בגוף?",
        options: ["מסייעים בספיגת ויטמינים", "מונעים התייבשות", "מחליפים חלבון", "מחזקים עצמות בלבד"],
        correctIndex: 0,
    },
    {
        text: "מהו אחד הסימנים המוקדמים להתייבשות?",
        options: ["צמא", "עלייה במשקל", "שיפור בריכוז", "ירידה בחום הגוף"],
        correctIndex: 0,
    },
    {
        text: "כמה מהצלחת אמורים להיות חלבונים?",
        options: ["שני שליש", "שליש", "הכל", "אין המלצה"],
        correctIndex: 1,
    },
    {
        text: "מה אחד הגורמים העיקריים לשברי מאמץ?",
        options: ["עומס חוזר על העצם", "עודף שתייה", "עודף ויטמינים", "שינה מרובה מדי"],
        correctIndex: 0,
    },
    {
        text: "איזה מזון נחשב מקור טוב לברזל מהצומח?",
        options: ["קטניות", "עוף", "דגים", "ביצים"],
        correctIndex: 0,
    },
    {
        text: "מה תפקידם של מינרלים כמו סידן ומגנזיום?",
        options: ["תמיכה בעצמות ובשרירים", "מקור אנרגיה עיקרי", "שיפור טעם המזון", "ויסות שינה בלבד"],
        correctIndex: 0,
    },
    {
        text: "מה עלול לקרות כשלא שותים מספיק בזמן פעילות גופנית?",
        options: ["ירידה בביצועים ובכשירות", "עלייה בריכוז", "שיפור בשינה", "חיזוק העצמות"],
        correctIndex: 0,
    },
    {
        text: "מהי אחת הדרכים למנוע מחסור בברזל?",
        options: ["לשלב ויטמין C עם מזון עשיר בברזל", "להימנע מירקות", "לשתות פחות מים", "לישון פחות"],
        correctIndex: 0,
    },
];

function shuffleArray(input) {
    const arr = [...input];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function GamePageReal({ navigate }) {
    const { selectedShip } = useGame();

    const [questions] = useState(() => shuffleArray(QUESTION_BANK).slice(0, TOTAL_ASTEROIDS));

    const [shipLane, setShipLane] = useState(1);
    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false);

    const [batch, setBatch] = useState([]); // [{id, lane, top, exploding}]
    const [destroyedCount, setDestroyedCount] = useState(0);

    const [questionOpen, setQuestionOpen] = useState(false);
    const [wrongSelected, setWrongSelected] = useState(new Set());
    const [correctRevealed, setCorrectRevealed] = useState(false);
    const [beamLane, setBeamLane] = useState(null);

    const hasMovedRef = useRef(false);
    const nextIdRef = useRef(0);
    const firedAsteroidRef = useRef(null);

    const gameComplete = destroyedCount >= TOTAL_ASTEROIDS;
    const currentQuestion = questions[Math.min(destroyedCount, questions.length - 1)];
    const targetAsteroid = batch.find((a) => a.lane === shipLane && !a.exploding);
    const canFire = started && !paused && !questionOpen && !gameComplete && !!targetAsteroid;

    /* ---------------- spawn a batch of asteroids ---------------- */
    const spawnBatch = () => {
        const remaining = TOTAL_ASTEROIDS - destroyedCount;
        const count = Math.min(3, remaining);
        const lanes = shuffleArray([0, 1, 2]).slice(0, count);
        const newAsteroids = lanes.map((lane) => ({
            id: nextIdRef.current++,
            lane,
            top: ENTER_TOP,
            exploding: false,
        }));
        setBatch(newAsteroids);

        // let them mount off-screen first, then animate down to resting position
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setBatch((prev) => prev.map((a) => ({ ...a, top: REST_TOP })));
            });
        });
    };

    // start the first batch once the player has moved and the intro delay passed
    useEffect(() => {
        if (started && batch.length === 0 && destroyedCount === 0) {
            spawnBatch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [started]);

    // when the current batch is fully cleared, bring in the next one
    useEffect(() => {
        if (started && !questionOpen && batch.length === 0 && destroyedCount > 0 && !gameComplete) {
            const t = setTimeout(spawnBatch, 700);
            return () => clearTimeout(t);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batch.length, destroyedCount, started, questionOpen]);

    /* ---------------- ship movement ---------------- */
    const handleMove = (dir) => {
        if (paused || questionOpen) return;
        setShipLane((prev) => Math.max(0, Math.min(LANES.length - 1, prev + dir)));

        if (!hasMovedRef.current) {
            hasMovedRef.current = true;
            setTimeout(() => setStarted(true), 1500);
        }
    };

    /* ---------------- firing / questions ---------------- */
    const handleFire = () => {
        if (!canFire) return;
        firedAsteroidRef.current = targetAsteroid.id;
        setWrongSelected(new Set());
        setCorrectRevealed(false);
        setQuestionOpen(true);
    };

    const handleAnswer = (index) => {
        if (correctRevealed || wrongSelected.has(index)) return;

        if (index === currentQuestion.correctIndex) {
            setCorrectRevealed(true);
            setTimeout(() => {
                setQuestionOpen(false);
                explodeAsteroid(firedAsteroidRef.current, shipLane);
            }, 900);
        } else {
            setWrongSelected((prev) => new Set(prev).add(index));
        }
    };

    const explodeAsteroid = (id, lane) => {
        setBeamLane(lane);
        setBatch((prev) => prev.map((a) => (a.id === id ? { ...a, exploding: true } : a)));

        setTimeout(() => {
            setBatch((prev) => prev.filter((a) => a.id !== id));
            setDestroyedCount((c) => c + 1);
            setBeamLane(null);
        }, 650);
    };

    const handleFinish = () => {
        navigate("home");
    };

    return (
        <div className="GamePageReal">
            <div className="gr-topbar">
                <button
                    className="gr-pause-btn"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? "המשך" : "השהה"}
                >
                    {paused ? "▶" : "II"}
                </button>

                <div className="gr-progress-track">
                    {Array.from({ length: TOTAL_ASTEROIDS }).map((_, i) => (
                        <span className="gr-progress-icon" key={i}>
                            <img src={i < destroyedCount ? explo : astro1} alt="" />
                        </span>
                    ))}
                </div>
            </div>

            <div className="gr-stage">
                {batch.map((a) => (
                    <div
                        key={a.id}
                        className={`gr-asteroid-wrap ${a.lane === shipLane && !a.exploding ? "targeted" : ""} ${
                            a.exploding ? "exploding" : ""
                        }`}
                        style={{ left: `${LANES[a.lane]}%`, top: `${a.top}%` }}
                    >
                        <img
                            src={a.exploding ? explo : astro1}
                            alt=""
                            className={a.exploding ? "gr-explosion-img" : "gr-asteroid-img"}
                        />
                    </div>
                ))}

                {beamLane !== null && (
                    <div className="gr-beam" style={{ left: `${LANES[beamLane]}%` }} />
                )}

                <div className="gr-ship-wrap" style={{ left: `${LANES[shipLane]}%` }}>
                    {selectedShip?.top && <img src={selectedShip.top} alt="החללית שלך" className="gr-ship-img" />}
                </div>

                {!started && (
                    <div className="gr-intro-tip">
                        <p>אפשר להזיז את החללית ימינה ושמאלה בעזרת החצים</p>
                    </div>
                )}
            </div>

            <div className="gr-controls">
                <button className="gr-arrow-btn" onClick={() => handleMove(-1)} aria-label="שמאלה">
                    ←
                </button>
                <button className="gr-arrow-btn" onClick={() => handleMove(1)} aria-label="ימינה">
                    →
                </button>
            </div>

            <button className="gr-fire-btn" onClick={handleFire} disabled={!canFire}>
                <span className="gr-fire-icon">◎</span> אש!
            </button>

            {paused && !gameComplete && (
                <div className="gr-pause-overlay">
                    <p>המשחק מושהה</p>
                    <button onClick={() => setPaused(false)}>המשך</button>
                </div>
            )}

            {gameComplete && (
                <div className="gr-victory-overlay">
                    <img src={platePlanet} alt="" className="gr-victory-planet gr-victory-planet-tl" />
                    <img src={waterPlanet} alt="" className="gr-victory-planet gr-victory-planet-tr" />
                    <img src={nutritionPlanet} alt="" className="gr-victory-planet gr-victory-planet-bl" />
                    <img src={bonePlanet} alt="" className="gr-victory-planet gr-victory-planet-br" />

                    <div className="gr-victory-content">
                        <h2>סיימתם את הלומדה!</h2>
                        <p>והבאתם שלום על הגלקסיה</p>
                        <button onClick={handleFinish} className="gr-victory-button">
                            לחזרה על החומר
                        </button>
                    </div>
                </div>
            )}

            {questionOpen && (
                <div className="gr-question-overlay">
                    <div className="gr-question-panel">
                        <div className="gr-question-tab">
                            שאלה {destroyedCount + 1} מתוך {TOTAL_ASTEROIDS}
                        </div>

                        <p className="gr-question-text">{currentQuestion.text}</p>

                        <div className="gr-options">
                            {currentQuestion.options.map((opt, i) => {
                                const isWrong = wrongSelected.has(i);
                                const isCorrectShown = correctRevealed && i === currentQuestion.correctIndex;
                                return (
                                    <button
                                        key={i}
                                        className={`gr-option ${isWrong ? "wrong" : ""} ${
                                            isCorrectShown ? "correct" : ""
                                        }`}
                                        onClick={() => handleAnswer(i)}
                                        disabled={isWrong || correctRevealed}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}