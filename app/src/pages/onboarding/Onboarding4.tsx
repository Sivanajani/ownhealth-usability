// Onboarding4.tsx - KORRIGIERT MIT TYPE-ONLY IMPORT
import { useState } from "react";
import "../onboarding/onboarding4.css";
import "../onboarding/onboardingStart.css";

// Import der Icons
import RocketIcon from "../../assets/rocket.svg?react";
import PuzzleIcon from "../../assets/puzzle.svg?react";

// TYPE-ONLY IMPORT für FocusKey
import type { FocusKey } from "./OnboardingFlow"; // <-- HIER type hinzufügen

interface Onboarding4Props {
  onContinue: (focusKey: FocusKey) => void;
}

const Onboarding4: React.FC<Onboarding4Props> = ({ onContinue }) => {
  const [selectedFocus, setSelectedFocus] = useState<FocusKey | null>(null);

  const handleContinue = () => {
    if (selectedFocus) {
      console.log("Ausgewählter Fokus:", selectedFocus);
      onContinue(selectedFocus);
    }
  };

  const handleFocusSelect = (focus: FocusKey) => {
    setSelectedFocus(focus);
  };

  return (
    <div className="ob-root">
      <div className="ob-content ob4-content">
        
        <div className="ob0-dots" aria-hidden="true">
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
        </div>
        
        {/* TOP: Header */}
        <div className="ob4-header">
          <h1 className="ob4-title">
            Was ist dein primärer Fokus?
          </h1>
        </div>

        <div className="ob4-middle">
          {/* Focus Options */}
          <div className="ob4-options-grid">
            {/* Longevity Option */}
            <div 
              className={`ob4-option-card ${selectedFocus === "longevity" ? "ob4-option-selected ob4-longevity-selected" : ""}`}
              onClick={() => handleFocusSelect("longevity")}
            >
              <div className="ob4-card-icon ob4-rocket-container">
                <RocketIcon className="ob4-rocket-icon" />
              </div>
              <h3 className="ob4-card-title">Performance & Longevity</h3>
              <p className="ob4-card-description">
                Nutze deine Daten, um Schlaf, Fitness und Energie zu optimieren.
              </p>
            </div>

            {/* Chronic Option */}
            <div 
              className={`ob4-option-card ${selectedFocus === "chronic" ? "ob4-option-selected ob4-chronic-selected" : ""}`}
              onClick={() => handleFocusSelect("chronic")}
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

          {/* Hint Text */}
          <div className="ob4-hint-section">
            <p className="ob4-hint-text">
              Du kannst deinen Fokus jederzeit ändern
            </p>
          </div>
        </div>

        <div className="ob4-bottom">
          <div className="ob-cta">
            <button 
              className={`ob-button ob4-button ${!selectedFocus ? "ob4-button-disabled" : ""}`}
              onClick={handleContinue}
              disabled={!selectedFocus}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding4;