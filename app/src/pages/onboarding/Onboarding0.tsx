import { useState } from "react";
import "./onboardingStart.css";
import "./onboarding0.css";

import boltSvg from "../../assets/blitz.svg";
import shieldSvg from "../../assets/puzzle.svg";

type FocusKey = "longevity" | "chronic";

type Props = {
  onNext?: (focus: FocusKey) => void;
  onBack?: () => void;
};

export default function Onboarding0({ onNext }: Props) {
  const [focus, setFocus] = useState<FocusKey | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleSelect = (selected: FocusKey) => {
    if (isLeaving) return;

    setIsLeaving(true);
    setFocus(selected);

    // kleiner Delay = weniger "sprunghaft", Active-State kurz sichtbar
    window.setTimeout(() => {
      onNext?.(selected);
    }, 220);
  };

  return (
    <div className="ob-root ob0-root">
      <div className="ob-content ob0-content">
        {/* Top */}
        <div className="ob-top ob0-top">
          <div className="ob0-dots" aria-hidden="true">
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
          </div>

          <h1 className="ob-title ob0-title">Was ist dein primärer Fokus?</h1>
        </div>

        {/* Middle */}
        <div className="ob-middle ob0-middle">
          <button
            type="button"
            disabled={isLeaving}
            className={`ob0-card ${focus === "longevity" ? "ob0-card--active" : ""}`}
            onClick={() => handleSelect("longevity")}
          >
            <div className="ob0-iconBox" aria-hidden="true">
              <img className="ob0-iconSvg" src={boltSvg} alt="" />
            </div>

            <div className="ob0-cardTitle">Meine Biologie optimieren</div>
            <div className="ob0-cardText">
              Ich will datenbasiert wissen, was in meinem Körper wirklich wirkt,
              um meine Leistung zu steigern und gesund zu altern.
            </div>
          </button>

          <button
            type="button"
            disabled={isLeaving}
            className={`ob0-card ${focus === "chronic" ? "ob0-card--active" : ""}`}
            onClick={() => handleSelect("chronic")}
          >
            <div className="ob0-iconBox" aria-hidden="true">
              <img className="ob0-iconSvg" src={shieldSvg} alt="" />
            </div>

            <div className="ob0-cardTitle">Meine Symptome verstehen</div>
            <div className="ob0-cardText">
              Ich will mein Gesundheitspuzzle lösen und die Kontrolle über meine
              Gesundheit zurückgewinnen.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
