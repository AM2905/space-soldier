import "../css/GamePage.css";
import astro from "../assets/astro.svg";

export default function GamePage({ navigate }) {
    const handleStart = () => {
        navigate("gameReal");
    };

    return (
        <div className="GamePage">
            <div className="gp-alert-frame">
                <h1 className="gp-alert-title">ההכשרה הושלמה!</h1>
                <div className="gp-alert-divider" />

             
                <p className="gp-alert-note">האסטרואידים מתקרבים....</p>

                <div className="gp-astro-wrapper">
                    <img src={astro} alt="asteroid" className="gp-astro-img gp-astro-img-big" />
                    <img src={astro} alt="asteroid" className="gp-astro-img gp-astro-img-small" />
                </div>

                <button onClick={handleStart} className="gp-mission-button">
                    צא למשימת ההצלה
                </button>
            </div>
        </div>
    );
}