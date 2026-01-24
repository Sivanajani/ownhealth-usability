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
  const [activeTab, setActiveTab] = useState<"medikation" | "schlaf" | "labordaten">("schlaf");
  const [isGlowing, setIsGlowing] = useState(false);
  const [showConnection, setShowConnection] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [pulseTab, setPulseTab] = useState<number>(-1); // -1 = keine, 0/1/2 = Tab index

  // Animation beim ersten Laden - LÄNGER UND BESSER SEQUENZIERT
  useEffect(() => {
    // 1. Card erscheint
    const timer1 = setTimeout(() => setShowCard(true), 300);
    
    // 2. Title erscheint
    const timer2 = setTimeout(() => setShowTitle(true), 500);
    
    // 3. Intro Text erscheint
    const timer3 = setTimeout(() => setShowIntro(true), 700);
    
    // 4. Card beginnt zu glühen
    const timer4 = setTimeout(() => setIsGlowing(true), 1000);
    
    // 5. Verbindungslinien erscheinen nacheinander
    const timer5 = setTimeout(() => setShowConnection(true), 1200);
    
    // 6. Tab Animation - zeigt dem User, dass Tabs klickbar sind
    const timer6 = setTimeout(() => {
      // Zuerst Schlaf-Tab (default) pulsieren lassen
      setPulseTab(1); // Schlaf = Index 1
      
      // Dann nach 1s zum nächsten Tab
      setTimeout(() => {
        setPulseTab(0); // Medikation
        setTimeout(() => {
          setPulseTab(2); // Labordaten
          setTimeout(() => {
            setPulseTab(-1); // Animation beenden
          }, 800);
        }, 800);
      }, 800);
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  const handleTabClick = (tab: "medikation" | "schlaf" | "labordaten") => {
    setActiveTab(tab);
    setPulseTab(-1); // Pulsieren stoppen bei Klick
    console.log("Tab geklickt:", tab);
  };

  const handleNextClick = () => {
    if (onNext) {
      // Fade-out Animation vor onNext
      const root = document.querySelector('.ob-root');
      if (root) {
        root.classList.add('ob-fadeOut');
        setTimeout(() => {
          onNext();
        }, 400);
      } else {
        onNext();
      }
    }
  };

  return (
    <div className="ob-root">
      <div className="ob-content ob01-content">
        {/* TOP */}
        <div className="ob-top ob01-top">
          <h1 className={`ob01-title ${showTitle ? 'show' : ''}`}>
            Finde Muster in deinen Gesundheitsdaten{" "}            
          </h1>
          <p className={`ob01-intro ${showIntro ? 'show' : ''}`}>
            OWN zeigt dir Muster zwischen deinen Medikamenten, Schlaf und Laborwerten.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="ob-middle ob01-middle">
          <div className={`ob01-card ${showCard ? 'show' : ''} ${isGlowing ? 'ob01-card--glow' : ''}`}>
            
            {/* Verbindungslinien - erscheinen nacheinander */}
            {showConnection && (
              <>
                <div className="ob01-connector connector-medikation" />
                <div className="ob01-connector connector-schlaf" />
                <div className="ob01-connector connector-labordaten" />
              </>
            )}
            
            <div className="ob01-tabs">
              {/* Medikation Tab */}
              <div 
                className={`ob01-tab ${activeTab === "medikation" ? "ob01-tab--active" : ""} ${
                  pulseTab === 0 ? "ob01-tab--pulse" : ""
                }`}
                onClick={() => handleTabClick("medikation")}
                style={{ cursor: "pointer" }}
              >
                <span className={`ob01-tabIcon ${activeTab === "medikation" ? "ob01-tabIcon--active" : ""}`}>
                  {/* Fallback wenn Icon nicht lädt */}
                  {DrugIcon ? (
                    <DrugIcon style={{ width: "24px", height: "24px", display: "block" }} />
                  ) : (
                    <span style={{ fontSize: "20px" }}>💊</span>
                  )}
                </span>
                <span className="ob01-tabLabel">Medikation</span>
                <div className="ob01-tabGlow" />
              </div>

              {/* Schlaf Tab */}
              <div 
                className={`ob01-tab ${activeTab === "schlaf" ? "ob01-tab--active" : ""} ${
                  pulseTab === 1 ? "ob01-tab--pulse" : ""
                }`}
                onClick={() => handleTabClick("schlaf")}
                style={{ cursor: "pointer" }}
              >
                <span className={`ob01-tabIcon ${activeTab === "schlaf" ? "ob01-tabIcon--active" : ""}`}>
                  {MoonIcon ? (
                    <MoonIcon style={{ width: "24px", height: "24px", display: "block" }} />
                  ) : (
                    <span style={{ fontSize: "20px" }}>🌙</span>
                  )}
                </span>
                <span className="ob01-tabLabel">Schlaf</span>
                <div className="ob01-tabGlow" />
              </div>

              {/* Labordaten Tab */}
              <div 
                className={`ob01-tab ${activeTab === "labordaten" ? "ob01-tab--active" : ""} ${
                  pulseTab === 2 ? "ob01-tab--pulse" : ""
                }`}
                onClick={() => handleTabClick("labordaten")}
                style={{ cursor: "pointer" }}
              >
                <span className={`ob01-tabIcon ${activeTab === "labordaten" ? "ob01-tabIcon--active" : ""}`}>
                  {DocuIcon ? (
                    <DocuIcon style={{ width: "24px", height: "24px", display: "block" }} />
                  ) : (
                    <span style={{ fontSize: "20px" }}>📋</span>
                  )}
                </span>
                <span className="ob01-tabLabel">Labordaten</span>
                <div className="ob01-tabGlow" />
              </div>
            </div>

            <div className="ob01-body">
              <div className="ob01-kicker">🎯 Für dich erkannt</div>

              <div className="ob01-metricRow">
                <div className="ob01-metricValue">+22%</div>
                <div className="ob01-metricLabel">mehr Tiefschlaf</div>
              </div>

              <div className="ob01-subline">seit Beginn deiner Magnesium-Einnahme</div>
              
              {/* Dynamischer Insight basierend auf aktivem Tab */}
              <div className="ob01-insight">
                <div className="ob01-insightIcon">💡</div>
                <div className="ob01-insightText">
                  {activeTab === "medikation" && "Magnesium kann deine Schlafqualität verbessern"}
                  {activeTab === "schlaf" && "Besserer Schlaf führt zu mehr Energie am Tag"}
                  {activeTab === "labordaten" && "Optimale Magnesium-Werte unterstützen den Schlaf"}
                </div>
              </div>
            </div>

            <div className="ob01-foot">
              <div className="ob01-footnote">
                <span className="ob01-footnoteIcon">📋</span>
                <span className="ob01-footnoteText">Besprich dies mit deinem Arzt</span>
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