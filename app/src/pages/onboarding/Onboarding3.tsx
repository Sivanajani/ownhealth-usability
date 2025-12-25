import "./onboardingStart.css";
import ownLogo from "../../assets/own.logo.png";

type Props = {
  onDone?: () => void;
};

export default function Onboarding3({ onDone }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content">
        {/* TOP */}
        <div className="ob-brand">
          <img className="ob-logo" src={ownLogo} alt="OWN Health" />

          <h1 className="ob-title">
            Analyse
            <br />
            abgeschlossen
          </h1>
        </div>

        {/* CARD */}
        <div className="ob3-card">
          <div className="ob3-cardTitle">
            Muster erkannt:
            <br />
            <strong>Stress & Regeneration</strong>
          </div>

          <p className="ob3-cardText">
            Basierend auf deinen letzten 90 Tagen: Deine Herzfrequenzvariabilität
            (HRV) sinkt an Tagen mit über 10.000 Schritten im Schnitt um
            <strong> 15 %</strong> in den darauffolgenden Nächten. Dein Körper
            braucht nach aktiven Tagen mehr bewusste Erholung als du ihm aktuell gibst.
          </p>

          <div className="ob3-aiBadge">✨ AI-Insight</div>
        </div>

        {/* FOOTNOTE */}
        <p className="ob3-footnote">
          Kombiniert mit deinem nächsten Bluttest sehen wir, ob ein
          Nährstoffmangel die langsame Regeneration verursacht.
        </p>

        {/* BUTTON */}
        <button className="ob-button" onClick={onDone}>
          Verstanden
        </button>
      </div>
    </div>
  );
}
