import "./onboardingStart.css";

type Props = { onNext?: () => void; onBack?: () => void };

export default function OnboardingChronic({ onNext, onBack }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content">
        <div className="ob-brand">
          <h1 className="ob-title">Chroniker Pfad</h1>
          <p className="ob-subtitle">
            Fokus auf Ursachen, Klarheit und Symptom-Verständnis.
          </p>
        </div>

        <div className="ob-cta">
          <button className="ob-button" onClick={onNext}>Weiter</button>
          {onBack && <button className="ob0-back" onClick={onBack}>Zurück</button>}
        </div>
      </div>
    </div>
  );
}
