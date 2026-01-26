// medication.tsx
import "../../styles/appShell.css";
import "./medication.css";

import ClockIcon from "../../assets/clock.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import BlitzIcon from "../../assets/blitz.svg?react";
import TrendIcon from "../../assets/trend.svg?react";
import RoundIcon from "../../assets/round.svg?react";
import Meat from "../../assets/meat.svg?react";
import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";


type Props = {
  onBack?: () => void;
  onBackToHome?: () => void;
  onBackToChat?: () => void;
  onOpenFolder?: () => void;
};

export default function Medication({ onBack, onBackToHome, onBackToChat, onOpenFolder }: Props) {
  const b12Taken = true; 
  return (
    <div className="oh-screen med-bg">
      <div className="oh-safe med-safe">
        {/* Header */}
        <header className="med-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>
          <h1 className="underfolder-title">Medikation</h1>
          <div className="med-spacer" />
        </header>

        {/* Alert (mit Warning Icon links + runder Badge rechts) */}
        <section className="med-alert">
          <div className="med-alertIcon" aria-hidden="true">
            <WarningIcon className="med-alertSvg" />
          </div>

          <div className="med-alertText">
            <div className="med-alertTitle">Zink behindert B12</div>
            <div className="med-alertMeta">2h zeitversetzt</div>
          </div>
        </section>

        {/* HEUTE */}
        <div className="med-sectionLabel">HEUTE</div>

        <section className="med-stack">
          {/* Vitamin B12 */}
          <div className="med-card">
            {/* Icon */}
            <div className="med-iconCell">
              <div className="med-check med-check--on">✓</div>
            </div>

            {/* Text */}
            <div className="med-content">
              <div className="med-title">Vitamin B12</div>
              <div className="med-subRow">
                <span>1000 IE</span>
                <span className="med-dot" aria-hidden="true">•</span>

                {/* Clock + Text als Einheit */}
                <span className="med-metaGroup">
                  <ClockIcon className="med-metaIcon" aria-hidden="true" />
                  <span>Nüchtern, 07:00–10:00</span>
                </span>
              </div>
            </div>

            {/* Zeit-Pill (eigene Spalte wie im Mock) */}
            <div className="med-timeCell">
              <div className={`med-timePill ${b12Taken ? "med-timePill--done" : "med-timePill--todo"}`}>
                <span>{b12Taken ? "09:15" : "07:00–10:00"}</span>
              </div>
            </div>

            
            {/* Tage (eigene Spalte ganz rechts) 
            <div className="med-daysWrap">
              <div className="med-days med-days--amber">15</div>
              <div className="med-daysUnit">Tage</div>
            </div>
            */}
          </div>


          {/* Zink */}
          <div className="med-card med-card--noTime">
            {/* Icon */}
            <div className="med-iconCell">
              <div className="med-round" aria-hidden="true">
                <RoundIcon className="med-roundSvg" />
              </div>
            </div>

            {/* Text */}
            <div className="med-content">
              <div className="med-title">Zink</div>

              <div className="med-subRow">
                <span>25mg</span>
              </div>

              <div className="med-subRow med-subRow--secondary">                
                <span>Mit Essen, 19:00–22:00</span>
              </div>

              <div className="med-note med-note--inline">
                <span className="med-noteItem med-noteItem--pink">
                  <Meat className="med-inlineSvg" aria-hidden="true" />
                  Mit Fett
                </span>

                <span className="med-noteItem med-noteItem--amber">
                  <WarningIcon className="med-inlineSvg" aria-hidden="true" />
                  In 12 Tagen nachbestellen
                </span>
              </div>
            </div>

            {/* Tage ganz rechts 
            <div className="med-daysWrap">
              <div className="med-days med-days--mint">68</div>
              <div className="med-daysUnit">Tage</div>
            </div>
            */}
          </div>

        </section>

        {/* ENTWICKLUNG */}
        <div className="med-devBoost">
          <TrendIcon className="med-inlineSvg" aria-hidden="true" />
          <span className="med-sectionLabel"> ENTWICKLUNG</span>
        </div>    

        <section className="med-devCard">
          <div className="med-devHeader">
            <div className="med-devHeadLeft">
              <div className="med-devTitle">B12 seit 42 Tagen</div>
              <div className="med-devBoostLine">
                <BlitzIcon className="med-devBolt" aria-hidden="true" />
                <span>Energie +15%</span>
              </div>
            </div>
          </div>

          <div className="med-bars" aria-hidden="true">
            {[28, 32, 30, 23, 34, 31, 32, 35, 38, 48].map((h, i) => (
              <span
                key={i}
                className={`med-bar ${i === 9 ? "med-bar--hi" : ""}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          <div className="med-stats">
            <div className="med-stat med-stat--left">
              <div className="med-statValue med-statValue--green">92%</div>
              <div className="med-statLabel">Diese Woche</div>
            </div>

            <div className="med-stat med-stat--center">
              <div className="med-statValue med-statValue--purple">12</div>
              <div className="med-statLabel">Tage Serie</div>
            </div>

            <div className="med-stat med-stat--right">
              <div className="med-statValue med-statValue--white">2</div>
              <div className="med-statLabel">Aktiv</div>
            </div>
          </div>
        </section>


        <button className="med-detailsBtn" type="button">
          <ClockIcon className="med-inlineSvg" aria-hidden="true" />
          Alle Details <span className="med-detailsArrow" aria-hidden="true">›</span>
        </button>

        <button className="med-primaryBtn" type="button">
          + Präparat hinzufügen
        </button>
      </div>
      
      {/* Bottom Nav */}
      <nav className="home-navigation">
        <button className="home-nav-item" onClick={onBackToHome} type="button">
            <HomeIcon className="home-nav-icon" />
            <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item" onClick={onBackToChat} type="button">
            <AssistantIcon className="home-nav-icon" />
            <span className="home-nav-label">Assistent</span>
        </button>

        <button className="home-nav-item home-nav-item--active" onClick={onOpenFolder} type="button">
            <FolderIcon className="home-nav-icon" />
            <span className="home-nav-label">Ordner</span>
        </button>
      </nav>   
    </div>
  );
}
