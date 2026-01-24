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

  // DEBUG: Log icons to console
  useEffect(() => {
    console.log("DrugIcon:", DrugIcon);
    console.log("MoonIcon:", MoonIcon);
    console.log("DocuIcon:", DocuIcon);
  }, []);

  // Animation beim ersten Laden
  useEffect(() => {
    const timer1 = setTimeout(() => setIsGlowing(true), 300);
    const timer2 = setTimeout(() => setShowConnection(true), 600);
    const timer3 = setTimeout(() => setActiveTab("schlaf"), 900);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleTabClick = (tab: "medikation" | "schlaf" | "labordaten") => {
    setActiveTab(tab);
    console.log("Tab geklickt:", tab);
  };

  return (
    <div className="ob-root">
      <div className="ob-content ob01-content">
        {/* TOP */}
        <div className="ob-top ob01-top">
          <h1 className="ob01-title">
            Finde Muster in deinen Gesundheitsdaten{" "}            
          </h1>
          <p className="ob01-intro">
            OIWN zeigt dir Muster zwischen deinen Medikamenten, Schlaf und Laborwerten.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="ob-middle ob01-middle">
          <div className={`ob01-card ${isGlowing ? 'ob01-card--glow' : ''}`}>
            
            {/* Verbindungslinien - nur sichtbar nach Animation */}
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
                className={`ob01-tab ${activeTab === "medikation" ? "ob01-tab--active" : ""}`}
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
                className={`ob01-tab ${activeTab === "schlaf" ? "ob01-tab--active" : ""}`}
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
                className={`ob01-tab ${activeTab === "labordaten" ? "ob01-tab--active" : ""}`}
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
            onClick={onNext}
            onMouseEnter={() => setIsGlowing(true)}
          >
            <span className="ob01-buttonText">Meine Muster entdecken</span>            
          </button>
        </div>
      </div>
    </div>
  );
}