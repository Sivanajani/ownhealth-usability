// onboarding3.tsx - WITH PROPS FOR FLOW
import { useLayoutEffect, useRef, useState } from "react";
import "../onboarding/onboarding3.css";
import "../onboarding/onboardingStart.css";

// Import der Icons
import SchildIcon from "../../assets/schild.svg?react";

// Props für den Flow
interface Onboarding3Props {
  onFinish: () => void;
  name: string;
  onNameChange: (name: string) => void;
  age: number | null;
  onAgeChange: (age: number | null) => void;
}

const Onboarding3: React.FC<Onboarding3Props> = ({
  onFinish,  
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleVerstandenClick = () => {
    // Hier kannst du noch Validierungen machen falls nötig
    // z.B.: if (!name) { alert("Bitte Namen eingeben"); return; }
    
    // Dann weiter zum nächsten Schritt
    onFinish();
  };

  return (
    <div className="ob-root" ref={containerRef}>
      <div className="ob-content ob3-content">
        <div className="ob0-dots" aria-hidden="true">
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
        </div>

        {/* TITEL */}
        <div className={`ob3-title-section ${hasAnimated ? 'ob3-animated' : ''}`}>
          <h1 className="ob01-title">Deine Daten.</h1>
          <h2 className="ob01-title">Dein Besitz.</h2>
        </div>

        {/* SCHILD ICON */}
        <div className={`ob3-shield-section ${hasAnimated ? 'ob3-animated' : ''}`}>
          <div className="ob3-icon-circle">
            <SchildIcon className="ob3-shield" />
          </div>
        </div>

        <div className="ob3-middle">
          {/* NUR DU ZUGRIFF */}
          <div className={`ob3-access-section ${hasAnimated ? 'ob3-animated' : ''}`}>
            <div className="ob3-access-badge">
              Nur <span className="ob3-you">DU</span> hast Zugriff 
              {/*<span className="ob3-check"> ✔</span>*/}
            </div>
          </div>

          {/* LISTE DER BESCHRÄNKUNGEN */}
          <div className="ob3-restrictions-list">
            <div className={`ob3-restriction-item ${hasAnimated ? 'ob3-animated' : ''}`} style={{ animationDelay: '0.4s' }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Nicht wir.</span>
            </div>
            <div className={`ob3-restriction-item ${hasAnimated ? 'ob3-animated' : ''}`} style={{ animationDelay: '0.5s' }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Nicht dein Arbeitgeber.</span>
            </div>
            <div className={`ob3-restriction-item ${hasAnimated ? 'ob3-animated' : ''}`} style={{ animationDelay: '0.6s' }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Nicht deine Krankenkasse.</span>
            </div>
            <div className={`ob3-restriction-item ${hasAnimated ? 'ob3-animated' : ''}`} style={{ animationDelay: '0.7s' }}>
              <span className="ob3-restriction-icon">❌</span>
              <span className="ob3-restriction-text">Keine Tech-Giganten</span>
            </div>
          </div>
        </div>

        <div className="ob3-bottom">
          <div className="ob-cta">
            <button 
              className="ob-button ob3-button"
              onClick={handleVerstandenClick}
            >
              Jetzt Anfangen
            </button>
          </div>
                    {/* FAQ LINK */}
          <div className={`ob3-faq-section ${hasAnimated ? 'ob3-animated' : ''}`} style={{ animationDelay: '0.8s' }}>
            <button 
              className="ob3-faq-button"
              onClick={() => {
                // Hier könnte man einen Modal oder eine separate Seite öffnen
                // für detaillierte Erklärungen zum Datenaustausch
                console.log("FAQ zum Datenaustausch angeklickt");
              }}
            >
              Mehr zum Datenschutz              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding3;