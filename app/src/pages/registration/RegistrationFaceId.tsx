import "./registrationFaceId.css";

type Props = {
  onBack?: () => void;
  onActivate?: () => void;
  onSkip?: () => void;
};

export default function RegistrationFaceId({ onBack, onActivate, onSkip }: Props) {
  return (
    <div className="oh-screen reg-bg">
      <div className="oh-safe reg-safe reg-face">
        <div className="reg-topRow">
          <button className="reg-backBtn" onClick={onBack} aria-label="Zurück">
            ‹
          </button>
          <div className="reg-topHint">Registrierung</div>
          <div className="reg-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="face-iconWrap" aria-hidden="true">
          <div className="face-icon">
            <span className="face-eye" />
            <span className="face-eye" />
            <span className="face-smile" />
          </div>
        </div>

        <h1 className="reg-title reg-titleCenter">Richte Face ID ein</h1>

        <p className="face-lead">
          Für schnellen und sicheren Zugriff auf deine Gesundheitsdaten.
        </p>

        <div className="face-card">
          <div className="face-row">
            <div className="face-k">Sicherheit:</div>
            <div className="face-v">Deine Daten sind so sensibel wie dein Kontostand – schütze sie mit Biometrie</div>
          </div>

          <div className="face-row">
            <div className="face-k">Täglicher Login:</div>
            <div className="face-v">Einfach Face ID</div>
          </div>

          <div className="face-row">
            <div className="face-k">Neues Gerät:</div>
            <div className="face-v">OWN ID + SMS Code</div>
          </div>
        </div>

        <button className="reg-primaryBtn" onClick={onActivate}>
          Face ID aktivieren
        </button>

        <button className="face-skipBtn" onClick={onSkip} type="button">
          Später in Einstellungen
        </button>
      </div>
    </div>
  );
}
