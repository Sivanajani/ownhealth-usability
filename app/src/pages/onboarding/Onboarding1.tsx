import { useEffect, useState } from "react";
import "./onboardingStart.css";
import "./onboarding1.css";

// Icons - mit Fallbacks
import DrugIcon from "../../assets/pills.svg?react";
import DocuIcon from "../../assets/document.svg?react";
import MoonIcon from "../../assets/moon.svg?react";

type Props = {
  onNext?: () => void;
};

export default function Onboarding1({ onNext }: Props) {
  const [isGlowing, setIsGlowing] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [, setShowIntro] = useState(false);

  // Animation beim ersten Laden (ohne Tab-Pulse / ohne Klick-Logik)
  useEffect(() => {
    const timer1 = setTimeout(() => setShowCard(true), 300);
    const timer2 = setTimeout(() => setShowTitle(true), 500);
    const timer3 = setTimeout(() => setShowIntro(true), 700);
    const timer4 = setTimeout(() => setIsGlowing(true), 1000);
    const timer5 = setTimeout(() => setShowConnection(true), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleNextClick = () => {
    if (!onNext) return;

    const root = document.querySelector(".ob-root");
    if (root) {
      root.classList.add("ob-fadeOut");
      setTimeout(() => onNext(), 400);
    } else {
      onNext();
    }
  };

  return (
    <div className="ob-root">
      <div className="ob-content ob01-content">
        {/* TOP */}
        <div className="ob-top ob01-top">
          <h1 className={`ob01-title ${showTitle ? "show" : ""}`}>
            Zusammenhänge endlich verstehen
          </h1>
        </div>

        {/* MIDDLE */}
        <div className="ob-middle ob01-middle">
          <div
            className={`ob01-card ${showCard ? "show" : ""} ${
              isGlowing ? "ob01-card--glow" : ""
            }`}
          >
            {/* Verbindungslinien - erscheinen nacheinander */}
            {showConnection && (
              <>
                <div className="ob01-connector connector-medikation" />
                <div className="ob01-connector connector-schlaf" />
                <div className="ob01-connector connector-labordaten" />
              </>
            )}

            {/* Icons/Labels sind nur Deko (keine Tabs mehr) */}
            <div className="ob01-tabs">
              <div className="ob01-tab">
                <span className="ob01-tabIcon">
                  {DrugIcon ? (
                    <DrugIcon  />
                  ) : (
                    <span style={{ fontSize: "20px" }}>💊</span>
                  )}
                </span>
                <span className="ob01-tabLabel">Medikation</span>
                <div className="ob01-tabGlow" />
              </div>

              <div className="ob01-tab">
                <span className="ob01-tabIcon">
                  {MoonIcon ? (
                    <MoonIcon  />
                  ) : (
                    <span style={{ fontSize: "20px" }}>🌙</span>
                  )}
                </span>
                <span className="ob01-tabLabel">Schlaf</span>
                <div className="ob01-tabGlow" />
              </div>

              <div className="ob01-tab">
                <span className="ob01-tabIcon">
                  {DocuIcon ? (
                    <DocuIcon  />
                  ) : (
                    <span style={{ fontSize: "20px" }}>📋</span>
                  )}
                </span>
                <span className="ob01-tabLabel">Labordaten</span>
                <div className="ob01-tabGlow" />
              </div>
            </div>

            <div className="ob01-body">
              <div className="ob01-kicker">Für dich erkannt</div>

              <div className="ob01-metricRow">
                <div className="ob01-metricValue">+22%</div>
                <div className="ob01-metricLabel">mehr Tiefschlaf</div>
              </div>

              <div className="ob01-subline">seit deiner Magnesium-Einnahme</div>
            </div>

            <div className="ob01-foot">
              <div className="ob01-footnote">
                <span className="ob01-footnoteText">Zur ärztlichen Abstimmung</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="ob-bottom">
          <button
            className="ob-button ob01-button"
            onClick={handleNextClick}
            onMouseEnter={() => setIsGlowing(true)}
          >
            <span className="ob01-buttonText">Meine Muster entdecken</span>
          </button>
        </div>
      </div>
    </div>
  );
}
