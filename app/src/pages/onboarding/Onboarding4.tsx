import { useState } from "react";
import "../onboarding/onboarding4.css";
import "../onboarding/onboardingStart.css";

import RocketIcon from "../../assets/rocket.svg?react";
import PuzzleIcon from "../../assets/puzzle.svg?react";

import type { FocusKey } from "../../types/focus";

interface Onboarding4Props {
  onContinue: (focusKey: FocusKey) => void;
  initialFocus?: FocusKey | null;
}

const STORAGE_KEY = "ownhealth_onboarding_focus";

const Onboarding4: React.FC<Onboarding4Props> = ({ onContinue, initialFocus = null }) => {
  // Wichtig: default = null (nichts vor-ausgewählt)
  const [selectedFocus, setSelectedFocus] = useState<FocusKey | null>(initialFocus);
  const [isLeaving, setIsLeaving] = useState(false);

  const goNext = (focus: FocusKey) => {
    if (isLeaving) return;
    setIsLeaving(true);
    setSelectedFocus(focus);

    console.log("[Onboarding4] Focus selected:", focus);

    // Temporär speichern (für die weiteren Screens im Flow)
    sessionStorage.setItem(STORAGE_KEY, focus);

    // kurzer Delay für Tap-Feedback / Selected-State
    window.setTimeout(() => {
      console.log("[Onboarding4] Continue with focus:", focus);
      onContinue(focus);
    }, 180);
  };

  const onKeyActivate =
    (focus: FocusKey) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goNext(focus);
      }
    };

  return (
    <div className="ob-root">
      <div className="ob-content ob4-content">
        <div className="ob4-header">
          <h1 className="ob4-title">Was ist dein primärer Fokus?</h1>
        </div>

        <div className="ob4-middle">
          <div className="ob4-options-grid">
            {/* Longevity */}
            <div
              className={`ob4-option-card ${
                selectedFocus === "longevity"
                  ? "ob4-option-selected ob4-longevity-selected"
                  : ""
              } ${isLeaving ? "ob4-disabled" : ""}`}
              onClick={() => goNext("longevity")}
              onKeyDown={onKeyActivate("longevity")}
              role="button"
              tabIndex={0}
              aria-disabled={isLeaving}
            >
              <div className="ob4-card-icon ob4-rocket-container">
                <RocketIcon className="ob4-rocket-icon" />
              </div>
              <h3 className="ob4-card-title">Performance & Longevity</h3>
              <p className="ob4-card-description">
                Nutze deine Daten, um Schlaf, Fitness und Energie zu optimieren.
              </p>
            </div>

            {/* Chronic */}
            <div
              className={`ob4-option-card ${
                selectedFocus === "chronic"
                  ? "ob4-option-selected ob4-chronic-selected"
                  : ""
              } ${isLeaving ? "ob4-disabled" : ""}`}
              onClick={() => goNext("chronic")}
              onKeyDown={onKeyActivate("chronic")}
              role="button"
              tabIndex={0}
              aria-disabled={isLeaving}
            >
              <div className="ob4-card-icon ob4-puzzle-container">
                <PuzzleIcon className="ob4-puzzle-icon" />
              </div>
              <h3 className="ob4-card-title">Gesundheit verstehen</h3>
              <p className="ob4-card-description">
                Finde heraus, was deine Werte bedeuten und wie du dich besser fühlst.
              </p>
            </div>
          </div>

          <div className="ob4-hint-section">
            <p className="ob4-hint-text">Du kannst deinen Fokus jederzeit ändern</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding4;
