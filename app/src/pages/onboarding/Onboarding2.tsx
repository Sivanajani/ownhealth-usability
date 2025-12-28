import { useMemo, useState } from "react";
import "./onboardingStart.css";

import ouraPng from "../../assets/Oura2.png";
import whoopPng from "../../assets/whoop2.png";
import appleWatchPng from "../../assets/apple-watch-logo.png";
import appleHealthPng from "../../assets/apple.png";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

type WearableKey = "oura" | "whoop" | "applewatch" | "more";

export default function Onboarding2({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<WearableKey>("oura");

  const info = useMemo(() => {
    const map: Record<
      WearableKey,
      { label: string; noun: string }
    > = {
      oura: { label: "Ring-Daten", noun: "Ring" },
      whoop: { label: "WHOOP-Daten", noun: "WHOOP" },
      applewatch: { label: "Apple Watch Daten", noun: "Apple Watch" },
      more: { label: "Daten", noun: "Wearable" },
    };

    return map[selected];
  }, [selected]);

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
              <button
                className="ob2-topIcon"
                type="button"
                onClick={onBack}
                aria-label="Zurück"
              >
                ⟲
              </button>
            )}
          </div>

          <h1 className="ob-title">
            Welches Wearable
            <br />
            nutzt du?
          </h1>

          <p className="ob-subtitle">
            Wichtig für deine personalisierten Insights.
          </p>
        </div>

        {/* Middle */}
        <div className="ob-middle ob2-middle">
          <div className="ob2-wearables" role="radiogroup" aria-label="Wearable Auswahl">
            <button
              type="button"
              className={`ob2-wearableTile ${selected === "oura" ? "ob2-wearableTile--active" : ""}`}
              onClick={() => setSelected("oura")}
              aria-checked={selected === "oura"}
              role="radio"
            >
              <img className="ob2-logo" src={ouraPng} alt="Oura Ring" />
            </button>

            <button
              type="button"
              className={`ob2-wearableTile ${selected === "whoop" ? "ob2-wearableTile--active" : ""}`}
              onClick={() => setSelected("whoop")}
              aria-checked={selected === "whoop"}
              role="radio"
            >
              <img className="ob2-logo" src={whoopPng} alt="Whoop" />
            </button>

            <button
              type="button"
              className={`ob2-wearableTile ${selected === "applewatch" ? "ob2-wearableTile--active" : ""}`}
              onClick={() => setSelected("applewatch")}
              aria-checked={selected === "applewatch"}
              role="radio"
            >
              <img className="ob2-logo ob2-logo--wide" src={appleWatchPng} alt="Apple Watch" />
            </button>

            <button
              type="button"
              className={`ob2-wearableTile ${selected === "more" ? "ob2-wearableTile--active" : ""}`}
              onClick={() => setSelected("more")}
              aria-checked={selected === "more"}
              role="radio"
            >
              <div className="ob2-more">
                <div className="ob2-morePlus">+</div>
                <div className="ob2-moreText">Mehr</div>
              </div>
            </button>
          </div>

          <p className="ob-subtitle">
            OWN importiert deine{" "}
            <span className="ob-subtitle-strong">{info.label}</span>
            {selected === "applewatch" ? " " : <br />}
            sicher über Apple Health.
          </p>


          {/* Apple Health Logo */}
          <img
            className="ob2-appleLogoStandalone"
            src={appleHealthPng}
            alt="Apple Health"
          />
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