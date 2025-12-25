import { useState } from "react";
import "./onboardingStart.css";
import ownLogo from "../../assets/own.logo.png";

type Props = {
  onFinish?: () => void;
};

const focusOptions = [
  "Energie & Fokus",
  "Schlaf & Erholung",
  "Überblick & Kontrolle",
  "Prävention & Longevity",
  "Sportliche Bestleistung",
];

export default function Onboarding4({ onFinish }: Props) {
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className="ob-root">
      <div className="ob-content">
        <div className="ob-brand">
          <img className="ob-logo" src={ownLogo} alt="OWN Health" />
          <h1 className="ob-title">Fast fertig.</h1>
          <p className="ob-subtitle">
            Drei Infos, damit OWN dich und
            <br />
            deinen Körper richtig versteht.
          </p>
        </div>

        <div className="ob4-form">
          <div className="ob4-field">
            <label className="ob4-label">Alter</label>
            <input className="ob4-input" placeholder="z. B. 38" type="number" />
          </div>

          <div className="ob4-field">
            <label className="ob4-label">Biologisches Geschlecht</label>
            <select className="ob4-select" defaultValue="">
              <option value="">Bitte auswählen</option>
              <option>Männlich</option>
              <option>Weiblich</option>
              <option>Divers</option>
            </select>
          </div>

          <div className="ob4-field">
            <label className="ob4-label">Was ist dein Fokus?</label>

            <div className="ob4-options">
              {focusOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`ob4-option ${
                    focus === opt ? "ob4-option--active" : ""
                  }`}
                  onClick={() => setFocus(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="ob-button" onClick={onFinish}>
          Konfiguration abschliessen
        </button>
      </div>
    </div>
  );
}
