// Onboarding2.tsx
import { useLayoutEffect, useRef, useState } from "react";
import "../onboarding/onboarding2.css";
import "../onboarding/onboardingStart.css";

import SchildIcon from "../../assets/schild.svg?react";

interface Onboarding2Props {
  onNext: () => void;           
}

const Onboarding2: React.FC<Onboarding2Props> = ({ onNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useLayoutEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ob-root" ref={containerRef}>
      <div className="ob-content ob3-content">

        {/* TITEL */}
        <div className={`ob3-title-section ${hasAnimated ? "ob3-animated" : ""}`}>
          <h1 className="ob01-title">
            Deine Daten. <br /> Dein Besitz.
          </h1>
        </div>

        {/* SCHILD ICON */}
        <div className={`ob3-shield-section ${hasAnimated ? "ob3-animated" : ""}`}>
          <div className="ob3-icon-circle">
            <SchildIcon className="ob3-shield" />
          </div>
        </div>

        <div className="ob3-middle">
          {/* NUR DU ZUGRIFF */}
          <div className={`ob3-access-section ${hasAnimated ? "ob3-animated" : ""}`}>
            <div className="ob3-access-badge">
              Nur <span className="ob3-you">DU</span> hast Zugriff
            </div>
          </div>

          {/* LISTE */}
          <div className="ob3-restrictions-list">
            <div className={`ob3-restriction-item ${hasAnimated ? "ob3-animated" : ""}`} style={{ animationDelay: "0.4s" }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Nicht wir.</span>
            </div>

            <div className={`ob3-restriction-item ${hasAnimated ? "ob3-animated" : ""}`} style={{ animationDelay: "0.5s" }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Nicht dein Arbeitgeber.</span>
            </div>

            <div className={`ob3-restriction-item ${hasAnimated ? "ob3-animated" : ""}`} style={{ animationDelay: "0.6s" }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Nicht deine Krankenkasse.</span>
            </div>

            <div className={`ob3-restriction-item ${hasAnimated ? "ob3-animated" : ""}`} style={{ animationDelay: "0.7s" }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Keine Tech-Giganten</span>
            </div>
          </div>
        </div>

        <div className="ob3-bottom">
          <div className="ob-cta">
            <button className="ob-button ob3-button" onClick={onNext}>
              Jetzt Anfangen
            </button>
          </div>

          <div className={`ob3-faq-section ${hasAnimated ? "ob3-animated" : ""}`} style={{ animationDelay: "0.8s" }}>
            <button className="ob3-faq-button" onClick={() => console.log("FAQ angeklickt")}>
              Mehr zum Datenschutz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;
