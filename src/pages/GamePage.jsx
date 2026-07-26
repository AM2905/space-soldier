import "../css/GamePage.css";

export default function GamePage({ navigate }) {
    return (
        <div className="GamePage">
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
                <div className="planet-chip">תרגול</div>
            </div>

            <div className="status-badge">
                <span className="status-dot" />
                STATUS: ONLINE
            </div>

            <div className="content-panel">
                <h1 className="section-title">תרגול</h1>

                {/* TODO: תוכן המשחק/תרגול בפועל */}
            </div>
        </div>
    );
}