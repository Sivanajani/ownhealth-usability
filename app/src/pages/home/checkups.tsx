import "../../styles/appShell.css";
import "./checkups.css";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import CheckIcon from "../../assets/check.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import CalendarIcon from "../../assets/calendar.svg?react";
import type { FocusKey } from "../../types/focus";

import HeartIcon from "../../assets/heart.svg?react";
import BloodIcon from "../../assets/blood.svg?react";
import HeartbeatIcon from "../../assets/heartbeat.svg?react";


type Props = {
  focusKey: FocusKey;
  onBack?: () => void;
  onBackToHome?: () => void;
  onOpenFolder?: () => void;
  onBackToChat?: () => void;
};

type Recommended = {
  id: string;
  title: string;
  meta: string;
  statusLine?: string;
  cta: string;
  accent: "green" | "orange" | "blue";
  icon: "check" | "warning" | "calendar";
};


type HistoryItem = {
  id: string;
  title: string;
  date: string;
  pill: string;
  pillTone: "blue" | "orange";
  icon: "heartbeat" | "heart" | "blood";
  iconTone: "blue" | "orange";
};


export default function Checkups({
  onBack,
  onBackToHome,
  onOpenFolder,
  onBackToChat,
}: Props) {
    const recommended: Recommended[] = [
    {
        id: "skin",
        title: "Hautkrebsscreening",
        meta: "Ab 35 alle 2 Jahre\n(GKV kostenlos)",
        statusLine: "Letztes Screening:\nNoch nie",
        cta: "Mehr erfahren",
        accent: "green",
        icon: "check",
    },
    {
        id: "colon",
        title: "Darmkrebsvorsorge",
        meta: "Ab 50 empfohlen\n(GKV kostenlos)",
        statusLine: "Status: Noch nicht\ndurchgeführt",
        cta: "Mehr erfahren",
        accent: "orange",
        icon: "warning",
    },
    {
        id: "prostate",
        title: "Prostatacheck",
        meta: "Ab 45 jährlich empfohlen\n(GKV kostenlos)",
        statusLine: "Verfügbar\nab: März\n2026",
        cta: "Erinnerung setzen",
        accent: "blue",
        icon: "calendar",
    },
    ];


    const history: HistoryItem[] = [
    {
        id: "mri",
        title: "MRT-Ganzkörperscan",
        date: "3. Oktober\n2025",
        pill: "Daten analysiert",
        pillTone: "blue",
        icon: "heartbeat",
        iconTone: "blue",
    },
    {
        id: "cardio",
        title: "Kardiologie",
        date: "15. September\n2025",
        pill: "Bericht fehlt",
        pillTone: "orange",
        icon: "heart",
        iconTone: "orange",
    },
    {
        id: "meta",
        title: "Metabolisches Blutpanel",
        date: "8. August\n2025",
        pill: "Daten analysiert",
        pillTone: "blue",
        icon: "blood",
        iconTone: "blue",
    },
    ];


    const iconFor = (k: Recommended["icon"]) => {
        if (k === "warning") return <WarningIcon />;
        if (k === "calendar") return <CalendarIcon />;
        return <CheckIcon />;
    };

    const historyIconFor = (k: HistoryItem["icon"]) => {
        if (k === "heart") return <HeartIcon />;
        if (k === "blood") return <BloodIcon />;
        return <HeartbeatIcon />;
    };



  return (
    <div className="oh-screen chk-bg">
      <div className="oh-safe chk-safe">
        {/* Header (wie Wearables-Stil) */}
        <header className="chk-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">
              ‹
            </span>
            <span>Zurück</span>
          </button>

          <h1 className="underfolder-title">Check-ups</h1>
          <div className="chk-spacer" />
        </header>

        <main className="chk-content">
          {/* Nächster Check-up */}
          <div className="chk-sectionTitle">Nächster Check-up</div>

          <section className="chk-nextCard">
            <div className="chk-nextTop">
              <div className="chk-dateBadge" aria-hidden="true">
                <div className="chk-dateMon">JAN</div>
                <div className="chk-dateDay">24</div>
              </div>

              <div className="chk-nextMain">
                <div className="chk-nextTitle">DEXA-Scan &amp; Blutpanel</div>
                <div className="chk-nextMeta">
                  <span className="chk-metaDot" aria-hidden="true" />
                  14:00
                </div>
                <div className="chk-nextSub">Präventions-Zentrum Mitte</div>
              </div>
            </div>

            <div className="chk-nextInfo">
              Wir haben eine Zusammenfassung für Präventions-Zentrum Mitte erstellt.
            </div>

            <button type="button" className="chk-openBtn">
              Zusammenfassung öffnen <span aria-hidden="true">›</span>
            </button>
          </section>

          {/* Empfehlungen */}
          <div className="chk-sectionTitle chk-sectionTitle--spaced">
            Empfohlene Check-ups für dich
          </div>
          <div className="chk-subText">
            Basierend auf deinem Alter (51), männlich und TK-Versicherung.
          </div>

          <section className="chk-recList">
            {recommended.map((r) => (
              <div key={r.id} className={`chk-recCard chk-recCard--${r.accent}`}>
                <div className="chk-recRow">
                  <div className="chk-recIcon" aria-hidden="true">
                    {iconFor(r.icon)}
                  </div>

                  <div className="chk-recText">
                    <div className="chk-recTitle">{r.title}</div>
                    <div className="chk-recMeta">
                      {r.meta.split("\n").map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>

                    {r.statusLine && (
                      <div className="chk-recStatus">
                        {r.statusLine.split("\n").map((line, idx) => (
                          <div key={idx}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="button" className="chk-recCta">
                    {r.cta}
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Historie */}
          <div className="chk-sectionTitle chk-sectionTitle--spaced">Historie</div>

            <section className="chk-history">
            {history.map((h) => (
                <div key={h.id} className="chk-hItem">
                <div className={`chk-hIcon chk-hIcon--${h.iconTone}`} aria-hidden="true">
                    {historyIconFor(h.icon)}
                </div>

                <div className="chk-hText">
                    <div className="chk-hTitle">{h.title}</div>
                    <div className="chk-hDate">
                    {h.date.split("\n").map((line, idx) => (
                        <div key={idx}>{line}</div>
                    ))}
                    </div>
                </div>

                <div className={`chk-pill chk-pill--${h.pillTone}`}>{h.pill}</div>
                </div>
            ))}
            </section>


          {/* Bottom CTA */}
          <button type="button" className="chk-addBtn">
            <span className="chk-plus" aria-hidden="true">
              +
            </span>
            Neuen Termin eintragen
          </button>
        </main>
      </div>

      {/* Bottom Nav (genau wie Wearables) */}
      <nav className="home-navigation">
        <button className="home-nav-item" onClick={onBackToHome} type="button">
          <HomeIcon className="home-nav-icon" />
          <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item" onClick={onBackToChat} type="button">
          <AssistantIcon className="home-nav-icon" />
          <span className="home-nav-label">Assistent</span>
        </button>

        <button
          className="home-nav-item home-nav-item--active"
          onClick={onOpenFolder}
          type="button"
        >
          <FolderIcon className="home-nav-icon" />
          <span className="home-nav-label">Ordner</span>
        </button>
      </nav>
    </div>
  );
}
