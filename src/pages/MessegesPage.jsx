import "../css/MessegesPage.css";
import astro from "../assets/astro.svg";

export default function MessegesPage({ onNextPage }) {
    return (
        <div className="messegesPage">
            <div className="alert-frame">
                <h1 className="alert-title">התראת חירום</h1>
                <p className="alert-subtitle">האסטרואידים באים!</p>
                <div className="alert-divider" />

                <p className="alert-body">
                    כדי להציל את הכוכבים, עליכם לרענן את הידע שלכם בנושא תזונה.
                   
                </p>

                <div className="astro-wrapper">
                    <img src={astro} alt="asteroid" className="astro-img astro-img-big" />
                    <img src={astro} alt="asteroid" className="astro-img astro-img-small" />
                </div>


                <button onClick={onNextPage} className="mission-button">
                    <span className="play-icon"></span>
                    התחילו במשימה
                </button>
            </div>
        </div>
    );
}