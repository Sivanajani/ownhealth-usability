// profile.tsx
import "../../styles/appShell.css";
import "./profile.css";
import "./medication.css";

import LockIcon from "../../assets/lock.svg?react";
import InfoIcon from "../../assets/question.svg?react";
import ChartIcon from "../../assets/chart.svg?react";
import MedicalIcon from "../../assets/medical.svg?react"; 
import HeartIcon from "../../assets/heartbeat.svg?react";
import BrainIcon from "../../assets/brain.svg?react";
import WomenIcon from "../../assets/flower.svg?react";
import DbIcon from "../../assets/folder.svg?react";

type Props = {
  onBack?: () => void;
  onSecureNow?: () => void;
};

type Section = {
  key: string;
  title: string;
  badge?: { text: string; tone: "important" | "recommended" | "optional" };
  percent: number;
  count: string; // e.g. 5/5
  icon: React.ReactNode;
  accent: "teal" | "amber" | "blue" | "purple" | "pink" | "gray";
};

const SECTIONS: Section[] = [
  { key: "base", title: "Basis", percent: 100, count: "5/5", badge: undefined, icon: <ChartIcon />, accent: "teal" },
  { key: "medical", title: "Medizinisch", percent: 71, count: "5/7", badge: { text: "Wichtig", tone: "important" }, icon: <MedicalIcon />, accent: "amber" },
  { key: "life", title: "Lifestyle &\nGewohnheit", percent: 40, count: "6/15", badge: { text: "Empfohlen", tone: "recommended" }, icon: <HeartIcon />, accent: "blue" },
  { key: "mental", title: "Mental & Sozial", percent: 25, count: "2/8", badge: { text: "Empfohlen", tone: "recommended" }, icon: <BrainIcon />, accent: "purple" },
  { key: "women", title: "Frauenspezifisch", percent: 0, count: "0/5", badge: { text: "Optional", tone: "optional" }, icon: <WomenIcon />, accent: "pink" },
  { key: "extended", title: "Erweiterte Daten", percent: 0, count: "0/6", badge: { text: "Optional", tone: "optional" }, icon: <DbIcon />, accent: "gray" },
];

export default function Profile({ onBack, onSecureNow }: Props) {
  const overall = 64;

  return (
    <div className="oh-screen prof-bg">
      <div className="oh-safe prof-safe">
        {/* Topbar */}
        <header className="prof-top">
          <button className="prof-back" type="button" onClick={onBack}>
            <span className="prof-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>

          <div className="prof-ring" aria-label={`Profilvollständigkeit ${overall}%`}>
            <svg className="prof-ringSvg" viewBox="0 0 44 44" aria-hidden="true">
              <circle className="prof-ringTrack" cx="22" cy="22" r="18" />
              <circle
                className="prof-ringProg"
                cx="22"
                cy="22"
                r="18"
                strokeDasharray={`${(overall / 100) * 113.097}, 113.097`}
              />
            </svg>
            <div className="prof-ringText">{overall}%</div>
          </div>

          <div className="prof-spacer" />
        </header>

        {/* Info pills */}
        <section className="prof-pills">
          <div className="prof-pill prof-pill--info">
            <span className="prof-pillIcon" aria-hidden="true"><InfoIcon /></span>
            <span>Je vollständiger, desto bessere Antworten</span>
          </div>
          <div className="prof-pill prof-pill--secure">
            <span className="prof-pillIcon" aria-hidden="true"><LockIcon /></span>
            <span>Alles verschlüsselt</span>
          </div>
        </section>

        {/* Sections */}
        <section className="prof-list">
          {SECTIONS.map((s) => (
            <button key={s.key} className={`prof-item prof-item--${s.accent}`} type="button">
              <div className="prof-itemLeft">
                <div className="prof-ico" aria-hidden="true">{s.icon}</div>
                <div className="prof-text">
                  <div className="prof-title">
                    {s.title.split("\n").map((line, i) => (
                      <span key={i} className="prof-titleLine">{line}</span>
                    ))}
                  </div>
                  {s.key === "women" && <div className="prof-sub">Nur für Frauen</div>}
                </div>
              </div>

              <div className="prof-itemRight">
                <div className="prof-rightTop">
                  {s.badge && (
                    <span className={`prof-badge prof-badge--${s.badge.tone}`}>{s.badge.text}</span>
                  )}
                  <span className="prof-percent">{s.percent}%</span>
                  <span className="prof-chevron" aria-hidden="true">›</span>
                </div>

                <div className="prof-bar">
                  <span className="prof-barFill" style={{ width: `${s.percent}%` }} />
                </div>

                <div className="prof-count">{s.count}</div>
              </div>
            </button>
          ))}
        </section>
        {/* CTA */}
        <button
        className="med-primaryBtn"
        type="button"
        onClick={onSecureNow}
        >
        Jetzt meine Daten sichern
        </button>


      </div>
    </div>
  );
}
