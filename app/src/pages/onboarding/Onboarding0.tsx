import { useState } from "react";
import "./onboardingStart.css";

import boltSvg from "../../assets/blitz.svg";
import shieldSvg from "../../assets/schild.svg";

type FocusKey = "longevity" | "chronic";

type Props = {
  onNext?: (focus: FocusKey) => void;
  onBack?: () => void;
};

export default function Onboarding0({ onNext }: Props) {
  const [focus, setFocus] = useState<FocusKey | null>(null);
  const canContinue = !!focus;

  return (
    <div className="ob-root">
      <div className="ob-content">
        {/* Top */}
        <div className="ob-top ob0-top">
          {/* ✅ Dots bleiben */}
          <div className="ob0-dots" aria-hidden="true">
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
          </div>

          <h1 className="ob0-title">Was ist dein primärer Fokus?</h1>
        </div>

        {/* Middle */}
        <div className="ob-middle ob0-middle">
          <button
            type="button"
            className={`ob0-card ${focus === "longevity" ? "ob0-card--active" : ""}`}
            onClick={() => setFocus("longevity")}
          >
            {/* ✅ Emoji raus, SVG rein */}
            <div className="ob0-iconBox" aria-hidden="true">
              <img className="ob0-iconSvg" src={boltSvg} alt="" />
            </div>

            <div className="ob0-cardTitle">Performance &amp; Optimierung</div>
            <div className="ob0-cardText">
              Ich will meine Gesundheit selbst steuern und datenbasiert wissen,
              was in meinem Körper wirklich wirkt.
            </div>
          </button>

          <button
            type="button"
            className={`ob0-card ${focus === "chronic" ? "ob0-card--active" : ""}`}
            onClick={() => setFocus("chronic")}
          >
            <div className="ob0-iconBox" aria-hidden="true">
              <img className="ob0-iconSvg" src={shieldSvg} alt="" />
            </div>

            <div className="ob0-cardTitle">Ursachen &amp; Klarheit</div>
            <div className="ob0-cardText">
              Ich will mein Gesundheitspuzzle lösen und die Kontrolle zurückgewinnen.
            </div>
          </button>
        </div>

        {/* Bottom */}
        <div className="ob-bottom ob0-bottom">
          <button
            className={`ob-button ${!canContinue ? "ob0-buttonDisabled" : ""}`}
            disabled={!canContinue}
            onClick={() => focus && onNext?.(focus)}
          >
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
