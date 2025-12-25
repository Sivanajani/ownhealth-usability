import "./onboardingStart.css";
import ownLogo from "../../assets/own.logo.png";
import stats from "../../assets/stats.svg";


type Props = {
  onNext?: () => void;
};

export default function Onboarding2({ onNext }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content">
        <div className="ob-brand">
          <img className="ob-logo" src={ownLogo} alt="OWN Health" />
          
          <h1 className="ob-title">
            Apple Health
            <br />
            verbinden
          </h1>

          <p className="ob-subtitle">Für deine erste Sofort-Analyse.</p>
        </div>

        {/* MIDDLE */}
        <div className="ob-middle ob2-middle">
          <div className="ob2-iconCircle" aria-hidden="true">
            <img className="ob-logo" src={stats} alt="OWN Health" />
          </div>

          <div className="ob2-list">
            <div className="ob2-item">
              <span className="ob2-bullet">✓</span>
              <span>Sofortige 90-Tage-Analyse</span>
            </div>

            <div className="ob2-item">
              <span className="ob2-bullet">✓</span>
              <span>Automatische Synchronisierung</span>
            </div>

            <div className="ob2-item ob2-item--zk">
              <span className="ob2-bullet ob2-bullet--info">i</span>
              <div className="ob2-zk">
                <div className="ob2-zkTitle">Zero-Knowledge:</div>
                <div className="ob2-zkText">Wir sehen niemals deine Daten</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="ob-bottom">
          <button className="ob-button" onClick={onNext}>
            Verbinden
          </button>

          <div className="ob-footnote">20 Sekunden • 🔒 verschlüsselt</div>

          <div className="ob2-bottomNote">
            Kein Wearable? <span>Schreib dich auf die Warteliste</span>
          </div>
        </div>
      </div>
    </div>
  );
}
