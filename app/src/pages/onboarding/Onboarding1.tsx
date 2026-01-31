import { useEffect, useState } from "react";
import "./onboardingStart.css";
import "./onboarding1.css";

// Icons
import MoonIcon from "../../assets/moon.svg?react";
import HeartbeatIcon from "../../assets/heartbeat.svg?react";
import TrendIcon from "../../assets/trend.svg?react";

type Props = {
  onNext?: () => void;
};

type Insight = {
  id: string;
  text: string;
  icon: "moon" | "heartbeat" | "trend";
  accent: "blue" | "red" | "green";
};

const INSIGHTS: Insight[] = [
  {
    id: "sleep",
    text: "Mein Schlaf verbessert sich\ndurch Magnesium",
    icon: "moon",
    accent: "blue",
  },
  {
    id: "diabetes",
    text: "Hafermilch am Morgen\nverdoppelt mein Diabetes-Risiko",
    icon: "heartbeat",
    accent: "red",
  },
  {
    id: "movement",
    text: "Mehr Bewegung stabilisiert\nmeine Blutwerte",
    icon: "trend",
    accent: "green",
  },
];

function IconByType({ type }: { type: Insight["icon"] }) {
  if (type === "moon") return <MoonIcon />;
  if (type === "heartbeat") return <HeartbeatIcon />;
  return <TrendIcon />;
}

export default function Onboarding1({ onNext }: Props) {
  const [showTitle, setShowTitle] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 250);
    const t2 = setTimeout(() => setShowCards(true), 520);
    const t3 = setTimeout(() => setShowButton(true), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNextClick = () => {
    if (!onNext) return;

    const root = document.querySelector(".ob-root");
    if (root) {
      root.classList.add("ob-fadeOut");
      setTimeout(() => onNext(), 350);
    } else {
      onNext();
    }
  };

  return (
    <div className="ob-root">
      <div className="ob-content ob01-content ob01-v2">
        {/* TOP */}
        <div className={`ob01v2-top ${showTitle ? "show" : ""}`}>
          <h1 className="ob01v2-title">Erkenntnisse, die dein Leben verändern</h1>
          <p className="ob01v2-subtitle">
            9 von 10 Usern entdecken versteckte <br />
            Muster in ihrer Gesundheit
          </p>
        </div>

        {/* MIDDLE */}
        <div className={`ob01v2-list ${showCards ? "show" : ""}`}>
          {INSIGHTS.map((item, idx) => (
            <div
              key={item.id}
              className={`ob01v2-card ob01v2-card--${item.accent}`}
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="ob01v2-cardText">{item.text}</div>

              <div className={`ob01v2-iconBox ob01v2-iconBox--${item.accent}`}>
                <span className="ob01v2-icon">
                  <IconByType type={item.icon} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className={`ob-bottom obM-bottom ${showButton ? "show" : ""}`}>
          <button className="ob-button" onClick={handleNextClick}>
            Weiter
          </button>

          <div className="ob01v2-footnote">Zur ärztlichen Abstimmung.</div>
        </div>
      </div>
    </div>
  );
}
