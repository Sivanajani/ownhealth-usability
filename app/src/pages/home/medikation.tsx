import { useEffect, useState } from "react";
import "../../styles/appShell.css";
import "./medication.css";

import ClockIcon from "../../assets/clock.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import BlitzIcon from "../../assets/blitz.svg?react";

import CoffeeIcon from "../../assets/coffee.svg?react";
import BloodIcon from "../../assets/blood.svg?react";
import CheckIcon from "../../assets/check.svg?react";
import AddIcon from "../../assets/add.svg?react";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

type Props = {
  onBack?: () => void;
  onBackToHome?: () => void;
  onBackToChat?: () => void;
  onOpenFolder?: () => void;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function nowHHMM() {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

type TakenState = { taken: boolean; time?: string };

function SupplementAddSheet({
  open,
  onClose,
  onTrack,
}: {
  open: boolean;
  onClose: () => void;
  onTrack: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ss-backdrop" role="dialog" aria-modal="true">
      <button className="ss-backdropBtn" onClick={onClose} aria-label="Schließen" />

      <div className="ss-sheet" role="document">
        <div className="ss-top">
          <button className="ss-x" onClick={onClose} type="button" aria-label="Schließen">
            ✕
          </button>
          <div className="ss-chip">Supplement scannen</div>
          <div className="ss-xSpacer" />
        </div>

        <div className="ss-badge">Omega-3 5000mg erkannt</div>

        <div className="ss-pillWrap" aria-hidden="true">
          <div className="ss-pill" />
        </div>

        <section className="ss-card">
          <div className="ss-cardHead">
            <div className="ss-pillIcon" aria-hidden="true">💊</div>
            <div className="ss-name">Omega-3 5000mg</div>
          </div>

          <div className="ss-sectionTitle">Herstellerangaben</div>
          <div className="ss-text">
            Dosierung: 1 Kapsel täglich<br />
            EPA: 2500mg, DHA: 2000mg<br />
            Mit einer Mahlzeit einnehmen
          </div>

          <div className="ss-divider" />

          <div className="ss-sectionTitle">Wechselwirkungen</div>
          <div className="ss-rowOk">
            <span className="ss-check" aria-hidden="true">✓</span>
            <span>Keine mit deinen aktuellen Supplements</span>
          </div>

          <div className="ss-divider" />

          <div className="ss-sectionTitle">Optimal einnehmen</div>
          <div className="ss-text">
            Zu einer fetthaltigen Mahlzeit<br />
            Timing: Morgens oder abends
          </div>

          <div className="ss-divider" />

          <div className="ss-sectionTitle">Wirkung messbar ab</div>
          <ul className="ss-bullets">
            <li>2–3 Wochen: Erste Trends</li>
            <li>4–6 Wochen: Volle Wirkung</li>
          </ul>

          <div className="ss-footer">
            <button className="ss-primary" type="button" onClick={onTrack}>
              Einnahme tracken
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}


export default function Supplements({
  onBack,
  onBackToHome,
  onBackToChat,
  onOpenFolder,
}: Props) {
  // initial wie Mock: B12 schon genommen, Zink nicht
  const [takenByKey, setTakenByKey] = useState<Record<string, TakenState>>({
    b12: { taken: true, time: "09:15" },
    zinc: { taken: false },
  });

  const [addOpen, setAddOpen] = useState(false);

  const toggleTaken = (key: "b12" | "zinc") => {
    setTakenByKey((prev) => {
      const cur = prev[key];
      // wenn man auf "genommen" schaltet -> Zeit setzen
      if (!cur.taken) {
        return { ...prev, [key]: { taken: true, time: nowHHMM() } };
      }
      // wenn man wieder abwählt -> Zeit entfernen
      return { ...prev, [key]: { taken: false, time: undefined } };
    });
  };

  const b12 = takenByKey.b12;
  const zinc = takenByKey.zinc;

  return (
    <div className="oh-screen sup-bg">
      <div className="oh-safe sup-safe">
        {/* Header */}
        <header className="sup-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">
              ‹
            </span>
            <span>Zurück</span>
          </button>
          <h1 className="underfolder-title">Supplements</h1>
          <div className="sup-headerRight" />
        </header>

        {/* Alert */}
        <section className="sup-alert" role="note" aria-label="Hinweis">
          <div className="sup-alertIcon" aria-hidden="true">
            <WarningIcon className="sup-alertSvg" />
          </div>

          <div className="sup-alertText">
            <div className="sup-alertTitle">Zink behindert B12</div>
            <div className="sup-alertMeta">
              Bitte nimm Zink mindestens 2h zeitversetzt.
            </div>
          </div>
        </section>

        {/* HEUTE */}
        <div className="sup-sectionLabel">HEUTE</div>

        <section className="sup-stack">
          {/* Vitamin B12 */}
          <div className="sup-card">
            {/* CLICKABLE round check */}
            <button
              className="sup-iconCellBtn"
              type="button"
              onClick={() => toggleTaken("b12")}
              aria-label={b12.taken ? "Vitamin B12 abwählen" : "Vitamin B12 als genommen markieren"}
            >
              <div className={`sup-check ${b12.taken ? "sup-check--on" : "sup-check--off"}`}>
                {b12.taken && <CheckIcon className="sup-checkSvg" aria-hidden="true" />}
              </div>
            </button>

            <div className="sup-content">
              <div className="sup-nameRow">
                <div className="sup-name">Vitamin B12</div>

                {/* Zeit-Badge nur wenn genommen */}
                {b12.taken && b12.time ? (
                  <div className="sup-pill sup-pill--done">{b12.time}</div>
                ) : null}
              </div>

              <div className="sup-metaRow">
                <span>1000 IE</span>
              </div>

              <div className="sup-metaRow sup-metaRow--muted">
                <span className="sup-metaGroup">
                  <ClockIcon className="sup-metaIcon" aria-hidden="true" />
                  <span>{b12.taken && b12.time ? `${b12.time} • ` : ""}07:00–10:00</span>
                </span>
              </div>

              <div className="sup-tags">
                <span className="sup-tag sup-tag--coffee">
                  <CoffeeIcon className="sup-tagIcon" aria-hidden="true" />
                  <span>Nüchtern</span>
                </span>
                <span className="sup-tag sup-tag--blood">
                  <BloodIcon className="sup-tagIcon" aria-hidden="true" />
                  <span>Optional</span>
                </span>
              </div>
            </div>
          </div>

          {/* Zink */}
          <div className="sup-card sup-card--secondary">
            {/* CLICKABLE round check */}
            <button
              className="sup-iconCellBtn"
              type="button"
              onClick={() => toggleTaken("zinc")}
              aria-label={zinc.taken ? "Zink abwählen" : "Zink als genommen markieren"}
            >
              <div className={`sup-check ${zinc.taken ? "sup-check--on" : "sup-check--off"}`}>
                {zinc.taken && <CheckIcon className="sup-checkSvg" aria-hidden="true" />}
              </div>
            </button>

            <div className="sup-content">
              <div className="sup-nameRow">
                <div className="sup-name">Zink</div>

                {/* Zeit-Badge nur wenn genommen */}
                {zinc.taken && zinc.time ? (
                  <div className="sup-pill sup-pill--done">{zinc.time}</div>
                ) : null}
              </div>

              <div className="sup-metaRow">
                <span>25mg</span>
              </div>

              <div className="sup-metaRow sup-metaRow--muted">
                <span className="sup-metaGroup">
                  <ClockIcon className="sup-metaIcon" aria-hidden="true" />
                  <span>{zinc.taken && zinc.time ? `${zinc.time} • ` : ""}19:00–22:00</span>
                </span>
              </div>

              <div className="sup-tags">
                <span className="sup-tag sup-tag--coffee">
                  <CoffeeIcon className="sup-tagIcon" aria-hidden="true" />
                  <span>Mit Essen</span>
                </span>
                <span className="sup-tag sup-tag--warn">
                  <WarningIcon className="sup-tagIcon" aria-hidden="true" />
                  <span>In 12 Tagen nachbestellen</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ENTWICKLUNG */}
        <div className="sup-devLabel">
          <span>ENTWICKLUNG</span>
        </div>

        <section className="sup-devCard">
          <div className="sup-devHead">
            <div className="sup-devTitle">B12 seit 42 Tagen</div>
            <div className="sup-devBoost">
              <BlitzIcon className="sup-devBolt" aria-hidden="true" />
              <span>Energie +15%</span>
            </div>
          </div>

          <div className="sup-bars" aria-hidden="true">
            {[24, 26, 25, 20, 27, 26, 26, 28, 30, 36].map((h, i) => (
              <span
                key={i}
                className={`sup-bar ${i === 9 ? "sup-bar--hi" : ""}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          <div className="sup-stats">
            <div className="sup-stat sup-stat--left">
              <div className="sup-statValue sup-statValue--green">92%</div>
              <div className="sup-statLabel">Diese Woche</div>
            </div>

            <div className="sup-stat sup-stat--center">
              <div className="sup-statValue sup-statValue--amber">12</div>
              <div className="sup-statLabel">Tage Serie</div>
            </div>

            <div className="sup-stat sup-stat--right">
              <div className="sup-statValue sup-statValue--white">2</div>
              <div className="sup-statLabel">Aktiv</div>
            </div>
          </div>
        </section>

        <button className="sup-detailsBtn" type="button">
          Alle Details <span className="sup-detailsArrow" aria-hidden="true">›</span>
        </button>

        <button className="sup-primaryBtn" type="button" onClick={() => setAddOpen(true)}>
          <AddIcon className="sup-primaryPlus" aria-hidden="true" />
          Präparat hinzufügen
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

        <button
          className="home-nav-item home-nav-item--active"
          onClick={onOpenFolder}
          type="button"
        >
          <FolderIcon className="home-nav-icon" />
          <span className="home-nav-label">Ordner</span>
        </button>
      </nav>
      <SupplementAddSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onTrack={() => setAddOpen(false)}
      />
    </div>
  );
}
