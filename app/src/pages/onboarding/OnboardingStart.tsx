import "./onboardingStart.css";
import "./onboarding00.css";
import ownLogo from "../../assets/own.logo.svg";

type Props = {
  onStart?: () => void;
};

export default function OnboardingStart({ onStart }: Props) {
  return (
    <div className="ob1-root">
      <div className="ob-content">
        <div className="ob-brand">
          <img className="ob-logo" src={ownLogo} alt="OWN Health" />

          <h1 className="ob1-title">YOUR HEALTH</h1>

          <p className="ob-subtitle">
            Dein intelligentes Gesundheitskonto.
            <br />
            Alle Daten sicher an einem Ort.
            <br />
            <span className="ob-subtitle-strong">In deiner Kontrolle.</span>
          </p>
        </div>
        
        <div className="ob-cta">
          <button className="ob-button" onClick={onStart}>
            Start
          </button>

          <p className="ob-hint">Startklar in 90 Sek.</p>
        </div>
      </div>
    </div>
  );
}