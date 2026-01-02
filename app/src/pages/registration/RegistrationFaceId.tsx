import "../../styles/appShell.css";
import "./RegistrationFaceId.css";

import FaceIcon from "../../assets/faceid.svg?react"; 

type Props = {
  onBack?: () => void;
  onActivate?: () => void;
  onSkip?: () => void;
};

export default function RegistrationFaceId({ onBack, onActivate, onSkip }: Props) {
  return (
    <div className="fi-screen">
      <div className="fi-safe">
        {/* optional back */}
        {onBack && (
          <button className="fi-back" type="button" onClick={onBack} aria-label="Zurück">
            ‹
          </button>
        )}

        <div className="fi-iconWrap" aria-hidden="true">
          <FaceIcon className="fi-icon" />
        </div>

        <h1 className="fi-title">Richte Face ID ein</h1>
        <p className="fi-sub">
          Für schnellen und sicheren <br />
          Zugriff auf deine Gesundheitsdaten.
        </p>

        <div className="fi-cards">
          <div className="fi-card">
            <div className="fi-cardLabel">Sicherheit:</div>
            <div className="fi-cardText">
              → Deine Daten sind so sensibel wie dein <br />
              Kontostand – schütze sie mit Biometrie
            </div>
          </div>

          <div className="fi-card">
            <div className="fi-cardLabel">Täglicher Login:</div>
            <div className="fi-cardText">→ Einfach Face ID</div>
          </div>

          <div className="fi-card">
            <div className="fi-cardLabel">Neues Gerät:</div>
            <div className="fi-cardText">→ OWN ID + SMS Code</div>
          </div>
        </div>

        <button className="fi-primary" type="button" onClick={onActivate}>
          Face ID aktivieren
        </button>

        <button className="fi-skip" type="button" onClick={onSkip}>
          Später in Einstellungen
        </button>
      </div>
    </div>
  );
}
