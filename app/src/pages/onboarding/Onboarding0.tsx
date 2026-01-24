import { useState, useMemo } from "react";
import "./onboardingStart.css";
import "./onboardingMerge.scss";

import WatchIcon from "../../assets/smartwatch.svg?react";
import DrugIcon from "../../assets/pills.svg?react";
import DocuIcon from "../../assets/document.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import BloodIcon from "../../assets/medical.svg?react";
import BrainIcon from "../../assets/brain.svg?react";
import AppIcon from "../../assets/smartphone-call.svg?react";
import Doc from "../../assets/stethoscope.svg?react";

import ownLogo from "../../assets/own.logo.svg";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
  onClose?: () => void;
};

type Phase = "scatter" | "logo-appear" | "icons-to-center" | "center-gather" | "circle-formation" | "complete";

type BaseItem = {
  key: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  clr: string;
  sx: number;
  sy: number;
  srot: number;
};

type PositionedItem = BaseItem & {
  angleRad: number;
  angleDeg: number;
  x: number;
  y: number;
};

export default function Onboarding0({ onNext }: Props) {
  const [phase, setPhase] = useState<Phase>("scatter");
  const [activeIconIndex, setActiveIconIndex] = useState<number>(-1);
  const [centerIcons, setCenterIcons] = useState<string[]>([]);
  const [circleIcons, setCircleIcons] = useState<string[]>([]);

  const baseItems: BaseItem[] = useMemo(
    () => [
      { key: "wear",   label: "Wearables",           Icon: WatchIcon,  clr: "rgb(235, 156, 10)",      sx:  110, sy:  -60,  srot: 8 },
      { key: "blood",  label: "Bluttests",           Icon: BloodIcon,  clr: "rgba(239,68,68,1)",       sx: -135, sy:  60,  srot: -6 },
      { key: "docs",   label: "Dokumente",           Icon: DocuIcon,   clr: "rgba(59,130,246,1)",      sx:  -80, sy:  -190, srot: 12 },
      { key: "food",   label: "Ernährung",           Icon: FoodIcon,   clr: "rgba(245,158,11,1)",      sx:  120, sy: -200,  srot: -6 },
      { key: "doc",    label: "Hausarzt",            Icon: Doc,        clr: "rgba(147,197,253,1)",     sx:  5,   sy:  200, srot: -10 }, 
      { key: "mental", label: "Mentale\nGesundheit", Icon: BrainIcon,  clr: "rgba(236,72,153,1)",      sx: -120, sy: -75,  srot: -8 },
      { key: "meds",   label: "Medikation",          Icon: DrugIcon,   clr: "rgba(139,92,246,1)",      sx:  -100, sy:  200, srot: 7 },
      { key: "apps",   label: "Apps",                Icon: AppIcon,    clr: "rgba(16,185,129,1)",      sx:   100, sy:  125, srot: -10 },
    ],
    []
  );

  const radius = 150;
  const positionedItems: PositionedItem[] = useMemo(() => {
    const count = baseItems.length;
    return baseItems.map((item, i) => {
      const angleRad = (2 * Math.PI * i) / count - Math.PI / 2;
      const angleDeg = (angleRad * 180) / Math.PI;
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;
      return { ...item, angleRad, angleDeg, x, y };
    });
  }, [baseItems]);

  const startMerge = () => {
    if (phase !== "scatter") return;
    
    // Phase 1: Logo erscheint
    setPhase("logo-appear");
    
    // Warte kurz, dann starte Icon-Animation
    setTimeout(() => {
      setPhase("icons-to-center");
      startIconToCenterAnimation();
    }, 600);
  };

  const startIconToCenterAnimation = () => {
    let index = 0;
    
    const animateNextIcon = () => {
      if (index >= baseItems.length) {
        // Alle Icons sind in der Mitte
        setActiveIconIndex(-1);
        setPhase("center-gather");
        
        // Warte kurz, dann starte Kreis-Animation
        setTimeout(() => {
          setPhase("circle-formation");
          startCircleFormationAnimation();
        }, 800);
        return;
      }

      // Aktiviere aktuelles Icon
      setActiveIconIndex(index);
      
      // Nach Animation zum Zentrum, Icon zu centerIcons hinzufügen
      setTimeout(() => {
        setCenterIcons(prev => [...prev, baseItems[index].key]);
        setActiveIconIndex(-1);
        
        // Nächstes Icon mit Verzögerung
        setTimeout(() => {
          index++;
          animateNextIcon();
        }, 150); // Kurze Pause zwischen Icons
      }, 600); // Dauer der Bewegung
    };

    animateNextIcon();
  };

  const startCircleFormationAnimation = () => {
    let index = 0;
    
    const animateNextToCircle = () => {
      if (index >= baseItems.length) {
        // Alle Icons sind im Kreis
        setPhase("complete");
        return;
      }

      // Aktiviere aktuelles Icon für Kreisbewegung
      setActiveIconIndex(index);
      
      // Nach Animation in den Kreis, Icon zu circleIcons hinzufügen
      setTimeout(() => {
        setCircleIcons(prev => [...prev, baseItems[index].key]);
        setActiveIconIndex(-1);
        
        // Nächstes Icon mit Verzögerung
        setTimeout(() => {
          index++;
          animateNextToCircle();
        }, 400); // Verzögerung zwischen Icons
      }, 650); // Dauer der Kreisbewegung
    };

    animateNextToCircle();
  };

  const getIconStatus = (key: string, index: number) => {
    if (phase === "scatter") return "scattered";
    
    if (phase === "logo-appear") return "scattered";
    
    if (phase === "icons-to-center") {
      if (centerIcons.includes(key)) return "at-center";
      if (activeIconIndex === index) return "moving-to-center";
      return "scattered";
    }
    
    if (phase === "center-gather") {
      return "at-center";
    }
    
    if (phase === "circle-formation" || phase === "complete") {
      if (circleIcons.includes(key)) return "in-circle";
      if (activeIconIndex === index) return "moving-to-circle";
      return "at-center";
    }
    
    return "scattered";
  };

  const getButtonText = () => {
    switch (phase) {
      case "scatter": return "Das ändern wir";
      case "logo-appear": 
      case "icons-to-center": 
      case "center-gather": 
      case "circle-formation": return "Daten zusammenführen...";
      case "complete": return "Weiter";
      default: return "Weiter";
    }
  };

  return (
    <div className="ob-root">
      <div className="ob-content obM-content">
        <div className="ob-top obM-top">
          <div className="obM-topbar">
          </div>

          <h1 className="obM-title">
            <span className={phase === "scatter" ? "is-on" : "is-off"}>
              Gesundheitsdaten
              <br />
              sind überall verstreut
            </span>

            <span className={phase !== "scatter" ? "is-on" : "is-off"}>
              OWN verbindet
              <br />
              <strong>ALLE</strong> deine Daten
            </span>
          </h1>
        </div>

        <div className="ob-middle obM-middle">
          <div className={`obM-stage phase-${phase}`}>
            {/* Logo - nur sichtbar ab Phase "logo-appear" */}
            <div className={`obM-hub ${phase !== "scatter" ? "visible" : ""}`}>
              <img className="obM-logo" src={ownLogo} alt="OWN" />
            </div>

            {/* Lines - nur im complete state */}
            <div className={`obM-lines ${phase === "complete" ? "visible" : ""}`} aria-hidden="true">
              {positionedItems.map((it, index) => (
                <div
                  key={it.key}
                  className="obM-line"
                  style={{
                    '--clr': it.clr,
                    '--ang': `${it.angleDeg}deg`,
                    '--delay': `${index * 0.1}s`,
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Icons */}
            {positionedItems.map((it, index) => {
              const status = getIconStatus(it.key, index);
              return (
                <div
                  key={it.key}
                  className={`obM-item status-${status}`}
                  style={{
                    '--sx': `${it.sx}px`,
                    '--sy': `${it.sy}px`,
                    '--srot': `${it.srot}deg`,
                    '--ex': `${it.x}px`,
                    '--ey': `${it.y}px`,
                    '--clr': it.clr,
                    '--angle': `${it.angleDeg}deg`,
                    '--delay': `${index * 0.1}s`,
                  } as React.CSSProperties}
                >
                  <div className="obM-box">
                    <it.Icon className="obM-icon" aria-hidden="true" />
                  </div>
                  {status === "in-circle" && (
                    <span className="obM-label">{it.label}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="ob-bottom obM-bottom">
          {phase === "scatter" ? (
            <>
              <p className="obM-footnote">
                Viele Daten.
                <br />
                <span>Kein Überblick.</span>
              </p>
              <button 
                className="ob-button" 
                onClick={startMerge}
                disabled={phase !== "scatter"}
              >
                {getButtonText()}
              </button>
            </>
          ) : (
            <>
              <p className="obM-footnote">
                {phase === "complete" ? "Alles an einem Ort." : "OWN verbindet deine Daten..."}
                <br />
                <span>
                  {phase === "complete" ? "Sicher & übersichtlich." : "Bitte warten..."}
                </span>
              </p>
              <button 
                className={`ob-button ${phase === "complete" ? "glowing-button" : ""}`} 
                onClick={phase === "complete" ? onNext : undefined}
                disabled={phase !== "complete"}
              >
                {getButtonText()}
              </button>
              {phase === "complete" && (
                <div className="obM-lock" aria-hidden="true">
                  🔒 Sicher verschlüsselt
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}