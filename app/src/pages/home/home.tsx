// Home.tsx
import { useEffect, useMemo, useState } from "react";
import "./home.css";

import RefreshIcon from "../../assets/refresh.svg?react";
import LockIcon from "../../assets/lock.svg?react";
import SettingsIcon from "../../assets/setting.svg?react";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import ChevronRightIcon from "../../assets/chevron-right.svg?react";
import CalendarIcon from "../../assets/calendar.svg?react";

// Quick actions (unten, 3 Buttons)
import FoodIcon from "../../assets/restaurant.svg?react";
import SymptomIcon from "../../assets/pills.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import CameraIcon from "../../assets/camera.svg?react"; // für "Body Scan" (falls du ein eigenes icon hast: tauschen)

// Kleine Icons in Cards
import CheckIcon from "../../assets/check.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import HeartIcon from "../../assets/heartbeat.svg?react";
import BoltIcon from "../../assets/blitz.svg?react";
import Steps from "../../assets/footstep.svg?react";
import MoonIcon from "../../assets/moon.svg?react";

import type { FocusKey } from "../../types/focus";

type Props = {
  focusKey: FocusKey; // "longevity" | "chronic" (wie bei dir im Onboarding)
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
  onOpenFolder: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenChat: () => void;

  // optional: wenn du später echte Navigation möchtest
  onOpenFood?: () => void;
  onOpenSymptom?: () => void;
  onOpenDocument?: () => void;
  onOpenBodyScan?: () => void;
};

type InsightTone = "purple" | "blue" | "green";
type ActionTone = "purple" | "blue" | "teal";

export default function Home({
  focusKey,
  hasSeenHomeInsight,
  onSeenHomeInsight,
  onOpenFolder,
  onOpenChat,
  onOpenSettings,
  onOpenProfile,
  onOpenFood,
  onOpenSymptom,
  onOpenDocument,
  onOpenBodyScan,
}: Props) {
  const isLongevity = focusKey === "longevity";

  const [profilePower, setProfilePower] = useState(26);
  const [currentTime, setCurrentTime] = useState("");

  // "Heute" (ohne Uhrzeit im Screenshot), aber du wolltest ja bisher Zeit: wir zeigen nur "Heute"
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const fmt = now.toLocaleDateString("de-DE", { weekday: "long" });
      const label = fmt.charAt(0).toUpperCase() + fmt.slice(1);
      setCurrentTime(label);
    };
    update();
    const i = setInterval(update, 60_000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!hasSeenHomeInsight) onSeenHomeInsight();
  }, [hasSeenHomeInsight, onSeenHomeInsight]);

  const data = useMemo(() => {
    if (isLongevity) {
      return {
        sectionTodayTitle: "Heute",
        headlineLeft: "12,450",
        headlineLeftSub: "Schritte",
        headlineLeftHint: "Höher als dein Durchschnitt",
        headlineRight: "HRV",
        headlineRightValue: "65",
        secondaryCardTitle: "Supplements",
        secondaryPills: [
          { label: "B12", active: true },
          { label: "Omega 3", active: true },
          { label: "Zink", active: false },
        ],
        insights: [
          {
            tone: "purple" as InsightTone,
            tag: "MUSTER ERKANNT",
            title: "HRV",
            body: "+14% bei Essen vor 18 Uhr",
            icon: <Steps className="h-icon" />,
          },
          {
            tone: "blue" as InsightTone,
            tag: "SUPPLEMENT-ERFOLG",
            title: "CRP",
            body: "−20% seit Omega-3",
            icon: <HeartIcon className="h-icon" />,
          },
        ],
        actionsTitle: "Action",
        actions: [
          {
            tone: "purple" as ActionTone,
            title: "Magnesium-Boost",
            sub: "+18% Regeneration",
            right: "",
            icon: <MoonIcon className="h-icon" />,
            chevron: true,
          },
          {
            tone: "blue" as ActionTone,
            title: "Training vor 16:00 Uhr",
            sub: "+22% HRV",
            right: "",
            icon: <BoltIcon className="h-icon" />,
            chevron: true,
          },
          {
            tone: "teal" as ActionTone,
            title: "Mehr Protein beim Frühstück",
            sub: "−35% Glucose-Spikes",
            right: "",
            icon: <CheckIcon className="h-icon" />,
            chevron: true,
          },
        ],
        quickActions: [
          { key: "food", label: "Essen", icon: <FoodIcon className="h-icon" />, onClick: onOpenFood },
          { key: "doc", label: "Dokument", icon: <DocumentIcon className="h-icon" />, onClick: onOpenDocument },
          { key: "scan", label: "Body Scan", icon: <CameraIcon className="h-icon" />, onClick: onOpenBodyScan },
        ],
        scheduleCard: null as null,
      };
    }

    // chronic
    return {
      sectionTodayTitle: "Heute",
      headlineLeft: "12,450",
      headlineLeftSub: "Schritte",
      headlineLeftHint: "Höher als dein Durchschnitt",
      headlineRight: "HRV",
      headlineRightValue: "65",
      secondaryCardTitle: "Medikation",
      secondaryPills: [
        { label: "L-Thyroxin", active: true },
        { label: "Metformin", active: true },
        { label: "Ramipril", active: false },
      ],
      scheduleCard: {
        title: "Kardiologie",
        date: "Jan\n22",
        time: "Morgen, 09:30 Uhr",
        status: "Bericht erstellt",
      },
      insights: [
        {
          tone: "purple" as InsightTone,
          tag: "SYMPTOM-MUSTER",
          title: "",
          body: "Weniger Schmerzschübe bei 8h+ Schlaf",
          icon: <MoonIcon className="h-icon" />,
        },
        {
          tone: "blue" as InsightTone,
          tag: "LABOR-TREND",
          title: "",
          body: "Entzündungswert (CRP) −15% gesunken",
          icon: <HeartIcon className="h-icon" />,
        },
      ],
      actionsTitle: "Action",
      actions: [
        {
          tone: "blue" as ActionTone,
          title: "Zusammenfassung bereit",
          sub: "Kardiologie-Report ansehen & teilen",
          right: "",
          icon: <DocumentIcon className="h-icon" />,
          chevron: true,
        },
        {
          tone: "teal" as ActionTone,
          title: "L-Thyroxin nachbestellen",
          sub: "Vorrat reicht noch für 5 Tage",
          right: "",
          icon: <WarningIcon className="h-icon" />,
          chevron: true,
        },
        {
          tone: "purple" as ActionTone,
          title: "Labor-Trend für Termin",
          sub: "Wichtige Erkenntnis für das Gespräch",
          right: "",
          icon: <BoltIcon className="h-icon" />,
          chevron: true,
        },
      ],
      quickActions: [
        { key: "food", label: "Essen", icon: <FoodIcon className="h-icon" />, onClick: onOpenFood },
        { key: "sym", label: "Symptom", icon: <SymptomIcon className="h-icon" />, onClick: onOpenSymptom },
        { key: "doc", label: "Dokument", icon: <DocumentIcon className="h-icon" />, onClick: onOpenDocument },
      ],
    };
  }, [isLongevity, onOpenFood, onOpenDocument, onOpenBodyScan, onOpenSymptom]);

  return (
    <div className={`home2-root ${isLongevity ? "home2--longevity" : "home2--chronic"}`}>
      <div className="home2-content">
        {/* Topbar */}
        <div className="home2-top">
          <button
            className="home2-iconbtn"
            type="button"
            aria-label="Aktualisieren"
            onClick={() => setProfilePower(26)}
          >
            <RefreshIcon className="home2-top-icon" />
          </button>

          <div className="home2-top-mid">
            <div className="home2-lock">
              <LockIcon className="home2-lock-icon" />
              <span>Sicher verschlüsselt</span>
            </div>
            <div className="home2-date">{currentTime}</div>
          </div>

          <div className="home2-top-right">
            <button className="home2-power" type="button" onClick={onOpenProfile} aria-label="Profil-Power">
              <div className="home2-power-ring">
                <svg className="home2-power-svg" viewBox="0 0 100 100">
                  <circle className="home2-power-bg" cx="50" cy="50" r="45" />
                  <circle
                    className="home2-power-fill"
                    cx="50"
                    cy="50"
                    r="45"
                    strokeDasharray={`${profilePower * 2.83} 283`}
                  />
                </svg>
                <span className="home2-power-val">{profilePower}%</span>
              </div>
              <div className="home2-power-label">Profil-Power</div>
            </button>

            <button className="home2-iconbtn" type="button" aria-label="Einstellungen" onClick={onOpenSettings}>
              <SettingsIcon className="home2-top-icon" />
            </button>
          </div>
        </div>

        {/* Heute - KPI Card */}
        <div className="home2-section">
          <h2 className="home2-h2">{data.sectionTodayTitle}</h2>

          <div className="home2-kpiCard">
            <div className="home2-kpiLeft">
              <div className="home2-kpiIcon">
                <Steps className="h-icon" />
              </div>
              <div className="home2-kpiText">
                <div className="home2-kpiValue">{data.headlineLeft}</div>
                <div className="home2-kpiSub">{data.headlineLeftSub}</div>
                <div className="home2-kpiHint">{data.headlineLeftHint}</div>
              </div>
            </div>

            <div className="home2-kpiRight">
              <div className="home2-chip">
                <span className="home2-chipTop">{data.headlineRight}</span>
                <span className="home2-chipVal">{data.headlineRightValue}</span>
              </div>
            </div>
          </div>

          {/* Supplements / Medikation */}
          <div className="home2-miniCard">
            <div className="home2-miniTitle">{data.secondaryCardTitle}</div>
            <div className="home2-pillRow">
              {data.secondaryPills.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={`home2-pill ${p.active ? "is-active" : ""}`}
                  aria-pressed={p.active}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chroniker: Termine */}
        {data.scheduleCard && (
          <div className="home2-section">
            <div className="home2-sectionHead">
              <h2 className="home2-h2">Termine</h2>
            </div>

            <button className="home2-appointment" type="button">
              <div className="home2-dateBadge">
                <div className="home2-dateBadgeTop">{data.scheduleCard.date.split("\n")[0]}</div>
                <div className="home2-dateBadgeBottom">{data.scheduleCard.date.split("\n")[1]}</div>
              </div>

              <div className="home2-appointmentText">
                <div className="home2-appointmentTitle">{data.scheduleCard.title}</div>
                <div className="home2-appointmentSub">{data.scheduleCard.time}</div>
                <div className="home2-appointmentMeta">
                  <CheckIcon className="home2-metaIcon" />
                  <span>{data.scheduleCard.status}</span>
                </div>
              </div>

              <ChevronRightIcon className="home2-chevron" />
            </button>
          </div>
        )}

        {/* Insights */}
        <div className="home2-section">
          <div className="home2-sectionHead">
            <h2 className="home2-h2">Insights</h2>
            <button className="home2-link" type="button">
              Alle insights <ChevronRightIcon className="home2-linkChevron" />
            </button>
          </div>

          <div className="home2-insights">
            {data.insights.map((it, idx) => (
              <div key={idx} className={`home2-insight home2-insight--${it.tone}`}>
                <div className="home2-insightTop">
                  <div className="home2-insightIcon">{it.icon}</div>
                  <div className="home2-insightTag">{it.tag}</div>
                </div>
                <div className="home2-insightBody">
                  {it.title ? <div className="home2-insightTitle">{it.title}</div> : null}
                  <div className="home2-insightText">{it.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="home2-section">
          <h2 className="home2-h2">{data.actionsTitle}</h2>

          <div className="home2-actions">
            {data.actions.map((a, idx) => (
              <button key={idx} type="button" className={`home2-actionRow home2-actionRow--${a.tone}`}>
                <div className="home2-actionIcon">{a.icon}</div>

                <div className="home2-actionText">
                  <div className="home2-actionTitle">{a.title}</div>
                  <div className="home2-actionSub">{a.sub}</div>
                </div>

                <ChevronRightIcon className="home2-chevron" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions (3 buttons wie Screenshot) */}
        <div className="home2-quickDock">
          {data.quickActions.map((q) => (
            <button
              key={q.key}
              type="button"
              className="home2-quickBtn"
              onClick={q.onClick}
              aria-label={q.label}
            >
              <div className="home2-quickIcon">{q.icon}</div>
              <div className="home2-quickLabel">{q.label}</div>
            </button>
          ))}
        </div>

        {/* Bottom Nav */}
        <nav className="home-navigation" >
          <button className="home-nav-item home-nav-item--active" type="button">
            <HomeIcon className="home-nav-icon" />
            <span className="home-nav-label">Home</span>
          </button>

          <button className="home-nav-item" onClick={onOpenChat} type="button">
            <AssistantIcon className="home-nav-icon" />
            <span className="home-nav-label">Assistent</span>
          </button>

          <button className="home-nav-item" type="button" onClick={onOpenFolder}>
            <FolderIcon className="home-nav-icon" />
            <span className="home-nav-label">Ordner</span>
          </button>
        </nav>  
      </div>
    </div>
  );
}
