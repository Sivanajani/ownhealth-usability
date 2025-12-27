import { useState } from "react";
import "./onboardingStart.css";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

type WearableKey = "oura" | "applewatch" | "fitbit" | "garmin";

export default function Onboarding2({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<WearableKey>("oura");

  return (
    <div className="ob-root">
      <div className="ob-content ob2-content">
        {/* Top */}
        <div className="ob-top ob2-top">
          <div className="ob2-topbar">
            <div className="ob0-dots" aria-hidden="true">
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot" />
            </div>

            {onBack && (
              <button className="ob2-topIcon" type="button" onClick={onBack} aria-label="Zurück">
                ⟲
              </button>
            )}
          </div>

          <h1 className="ob2-title">
            Welches Wearable
            <br />
            nutzt du?
          </h1>
        </div>

        {/* Middle */}
        <div className="ob-middle ob2-middle">
          <div className="ob2-wearables" role="radiogroup" aria-label="Wearable Auswahl">
            <button
              type="button"
              className={`ob2-wearable ${selected === "oura" ? "ob2-wearable--active" : ""}`}
              onClick={() => setSelected("oura")}
              aria-checked={selected === "oura"}
              role="radio"
            >
              <span className="ob2-wearableIcon" aria-hidden="true">💍</span>
            </button>

            <button
              type="button"
              className={`ob2-wearable ${selected === "applewatch" ? "ob2-wearable--active" : ""}`}
              onClick={() => setSelected("applewatch")}
              aria-checked={selected === "applewatch"}
              role="radio"
            >
              <span className="ob2-wearableIcon" aria-hidden="true">⌚</span>
            </button>

            <button
              type="button"
              className={`ob2-wearable ${selected === "fitbit" ? "ob2-wearable--active" : ""}`}
              onClick={() => setSelected("fitbit")}
              aria-checked={selected === "fitbit"}
              role="radio"
            >
              <span className="ob2-wearableIcon" aria-hidden="true">📊</span>
            </button>

            <button
              type="button"
              className={`ob2-wearable ${selected === "garmin" ? "ob2-wearable--active" : ""}`}
              onClick={() => setSelected("garmin")}
              aria-checked={selected === "garmin"}
              role="radio"
            >
              <span className="ob2-wearableIcon" aria-hidden="true">⌚</span>
            </button>
          </div>

          <p className="ob2-subtitle">
            OWN importiert deine Ring-Daten
            <br />
            sicher über Apple Health.
          </p>

          <div className="ob2-appleCard" aria-hidden="true">
            <div className="ob2-heart">❤️</div>
          </div>
        </div>

        {/* Bottom */}
        <div className="ob-bottom ob2-bottom">
          <button className="ob-button" onClick={onNext}>
            Apple Health verbinden
          </button>

          <div className="ob2-lock">🔒 Sicher verschlüsselt</div>

          <button type="button" className="ob2-waitlist">
            Kein Wearable? <span>Schreib dich auf die Warteliste</span>
          </button>
        </div>
      </div>
    </div>
  );
}
