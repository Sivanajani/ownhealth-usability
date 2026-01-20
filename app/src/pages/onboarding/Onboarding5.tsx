import { useState } from "react";
import "../onboarding/onboarding5.css";
import "../onboarding/onboardingStart.css";

import PillsIcon from "../../assets/pills.svg?react";
import BloodIcon from "../../assets/blood.svg?react";
import BlitzIcon from "../../assets/blitz.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";

interface Onboarding5Props {
  onContinue: (question: string) => void;   // ✅ speichert Frage + weiter
  onSkip: () => void;                      // ✅ skip ohne Frage
  initialQuestion?: string;                // ✅ optional: vorbefüllen
}

const Onboarding5: React.FC<Onboarding5Props> = ({
  onContinue,
  onSkip,
  initialQuestion = "",
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (trimmed) {
      console.log("Frage gespeichert:", trimmed);
      onContinue(trimmed); // ✅ Frage nach oben geben
    }
  };

  const handleExampleClick = (exampleText: string) => {
    setQuestion(exampleText);
  };

  const examples = [
    {
      id: 1,
      icon: <PillsIcon className="ob5-grid-icon" />,
      text: "Vertragen sich meine Medikamente?",
      onClick: () => handleExampleClick("Vertragen sich meine Medikamente?"),
    },
    {
      id: 2,
      icon: <BloodIcon className="ob5-grid-icon" />,
      text: "Was bedeutet mein Blutbild?",
      onClick: () => handleExampleClick("Was bedeutet mein Blutbild?"),
    },
    {
      id: 3,
      icon: <FoodIcon className="ob5-grid-icon" />,
      text: "Welche Lebensmittel sollte ich meiden?",
      onClick: () => handleExampleClick("Welche Lebensmittel sollte ich meiden?"),
    },
    {
      id: 4,
      icon: <BlitzIcon className="ob5-grid-icon" />,
      text: "Was triggert meine Beschwerden?",
      onClick: () => handleExampleClick("Was triggert meine Beschwerden?"),
    },
  ];

  return (
    <div className="ob-root">
      <div className="ob-content ob5-content">
        <div className="ob0-dots" aria-hidden="true">
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
        </div>

        <div className="ob5-header">
          <h1 className="ob5-title">Wobei kann OWN dich als erstes unterstützen?</h1>
          <p className="ob5-subtitle">Stelle deine Gesundheitsfrage.</p>
        </div>

        <div className="ob5-middle">
          <form className="ob5-form" onSubmit={handleSubmit}>
            <div className={`ob5-input-wrapper ${isFocused ? "ob5-input-focused" : ""}`}>
              <textarea
                className="ob5-textarea"
                placeholder="Deine Frage..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={4}
                maxLength={500}
              />
              <div className="ob5-input-footer">
                <span className="ob5-char-count">{question.length}/500</span>
              </div>
            </div>

            <div className="ob5-examples">
              <h3 className="ob5-examples-title">Beispiele</h3>

              <div className="ob5-grid">
                {examples.map((example) => (
                  <div key={example.id} className="ob5-grid-item" onClick={example.onClick}>
                    <div className="ob5-grid-icon-wrapper">{example.icon}</div>
                    <p className="ob5-grid-text">{example.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="ob5-divider"></div>

            <div className="ob5-cta">
              <button
                type="submit"
                className={`ob-button ob5-button ${!question.trim() ? "ob5-button-disabled" : ""}`}
                disabled={!question.trim()}
              >
                <div className="ob5-button-content">
                  <span>Daten verbinden & Antwort erhalten</span>
                </div>
              </button>
            </div>
          </form>
        </div>

        <div className="ob5-bottom">
          <button className="ob5-skip" onClick={onSkip}>
            Erstmal nur Daten verbinden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding5;
