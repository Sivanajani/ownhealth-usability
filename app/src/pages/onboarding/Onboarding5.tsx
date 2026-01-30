import { useMemo, useState, type ReactNode } from "react";
import "../onboarding/onboarding5.css";
import "../onboarding/onboardingStart.css";

import ArrowIcon from "../../assets/arrow.svg?react";

// Chronic Icons
import PillsIcon from "../../assets/pills.svg?react";
import BloodIcon from "../../assets/blood.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import BlitzIcon from "../../assets/blitz.svg?react";

// Longevity Icons
import MoonIcon from "../../assets/moon.svg?react";
import Supplement from "../../assets/supplement.svg?react";
import HeartBeat from "../../assets/heartbeat.svg?react";

import type { FocusKey } from "../../types/focus";

interface Onboarding5Props {
  onContinue: (question: string) => void;
  onSkip: () => void;
  onBack: () => void;
  initialQuestion?: string;
  focusKey: FocusKey;
}

type Example = {
  id: number;
  icon: ReactNode;
  text: string;
  onClick: () => void;
};

const Onboarding5: React.FC<Onboarding5Props> = ({
  onContinue,
  onSkip,
  onBack,
  initialQuestion = "",
  focusKey,
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (trimmed) {
      console.log("Frage gespeichert:", trimmed);
      onContinue(trimmed);
    }
  };

  const handleExampleClick = (exampleText: string) => setQuestion(exampleText);

  const { title, subtitle, examples } = useMemo(() => {
    if (focusKey === "longevity") {
      const ex: Example[] = [
        {
          id: 1,
          icon: <MoonIcon className="ob5-grid-icon" />,
          text: "Wie kann ich besser schlafen?",
          onClick: () => handleExampleClick("Wie kann ich besser schlafen?"),
        },
        {
          id: 2,
          icon: <Supplement className="ob5-grid-icon" />,
          text: "Wirken meine Supplements?",
          onClick: () => handleExampleClick("Wirken meine Supplements?"),
        },
        {
          id: 3,
          icon: <HeartBeat className="ob5-grid-icon" />,
          text: "Wie werde ich fitter?",
          onClick: () => handleExampleClick("Wie werde ich fitter?"),
        },
        {
          id: 4,
          icon: <FoodIcon className="ob5-grid-icon" />,
          text: "Was sollte ich bei meiner Ernährung beachten?",
          onClick: () => handleExampleClick("Was sollte ich bei meiner Ernährung beachten?"),
        },
      ];

      return {
        title: "Was möchtest du als erstes verstehen?",
        subtitle: "Stelle OWN deine erste Gesundheitsfrage.",
        examples: ex,
      };
    }

    // chronic
    const ex: Example[] = [
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

    return {
      title: "Wobei kann OWN dir helfen?",
      subtitle: "Stelle OWN deine Gesundheitsfrage.",
      examples: ex,
    };
  }, [focusKey, question]);


  return (
    <div className={`ob-root ${focusKey === "longevity" ? "ob5--longevity" : "ob5--chronic"}`}>
      <div className="ob-content ob5-content">
        {/* Back Arrow */}
        <button
          className="ob5-back-arrow"
          onClick={onBack}
          aria-label="Zurück"
          type="button"
        >
          <ArrowIcon className="ob5-back-icon" />
        </button>

        <div className="ob5-header">
          <h1 className="ob5-title">{title}</h1>
        </div>

        <div className="ob5-middle">
          <form className="ob5-form" onSubmit={handleSubmit}>
            <p className="ob5-subtitle">{subtitle}</p>

            <div className={`ob5-input-wrapper ${isFocused ? "ob5-input-focused" : ""}`}>
              <textarea
                className="ob5-textarea"
                placeholder="Deine Frage..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={1}
                maxLength={100}
              />
              <div className="ob5-input-footer">
                <span className="ob5-char-count">{question.length}/100</span>
              </div>
            </div>

            <h3 className="ob5-examples-title">Beispiele</h3>

            <div className="ob5-grid">
              {examples.map((example) => (
                <div
                  key={example.id}
                  className="ob5-grid-item"
                  onClick={example.onClick}
                >
                  <div className="ob5-grid-icon-wrapper">{example.icon}</div>
                  <p className="ob5-grid-text">{example.text}</p>
                </div>
              ))}
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
          <button className="ob5-skip" onClick={onSkip} type="button">
            Erstmal nur Daten verbinden
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding5;
