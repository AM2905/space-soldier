import "../css/Oppening.css";
import logo from "../assets/logo.svg";
import upPart from "../assets/upPart.svg";

export default function Oppening({ onNextPage }) {
    return (
        <div className="oppening">
            <img src={logo} alt="Logo" className="logo" />

            <div className="hero">
                <img src={upPart} alt="upPart" className="upPart" />
                <div className="hero-text">
                    <span className="title">לומדת רענון תזונה</span>
                    <span className="title"> אימון מתקדם - כלים רכובים </span>
                </div>
            </div>

            <button onClick={onNextPage} className="start-button">
                בואו נתחיל
            </button>
        </div>
    );
}