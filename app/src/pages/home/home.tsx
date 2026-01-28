// Home.tsx
import { useEffect, useMemo, useState } from "react";
import "./home.css";

import LockIcon from "../../assets/lock.svg?react";
import SettingsIcon from "../../assets/setting.svg?react";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import ChevronRightIcon from "../../assets/chevron-right.svg?react";

// Quick actions (unten, 3 Buttons)
import FoodIcon from "../../assets/restaurant.svg?react";
import SymptomIcon from "../../assets/pills.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import Upload from "../../assets/upload.svg?react";


// Kleine Icons in Cards
import CheckIcon from "../../assets/check.svg?react";
//import WarningIcon from "../../assets/warning.svg?react";
import HeartIcon from "../../assets/heartbeat.svg?react";
import BoltIcon from "../../assets/blitz.svg?react";
import MoonIcon from "../../assets/moon.svg?react";
import Clock from "../../assets/clock.svg?react";
import Question from "../../assets/question-sign.svg?react";
import Blood from "../../assets/blood.svg?react";

import OwnLogo from "../../assets/O_Logo.svg?react";

import type { FocusKey } from "../../types/focus";

type Props = {
  focusKey: FocusKey;
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
  onOpenFolder: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  onOpenChat: () => void;

  onOpenFood?: () => void;
  onOpenSymptom?: () => void;
  onOpenDocument?: () => void;
  onOpenBodyScan?: () => void;
};

type InsightTone = "purple" | "blue" | "green";
type ActionTone = "purple" | "blue" | "teal";

type MedItem = {
  id: string;
  label: string;
  taken: boolean;
};

type CircleTone = "blue" | "green" | "hrv";

function CircleStat({
  value,
  total,
  label,
  tone = "blue",
  ok = false,
  showTotal = true,
}: {
  value: number;
  total: number;
  label: string;
  tone?: CircleTone;
  ok?: boolean;
  showTotal?: boolean;
}) {
  const clampedTotal = Math.max(1, total);
  const pctRaw = Math.max(0, Math.min(1, value / clampedTotal));
  
  const pct = ok ? 1 : pctRaw;
  const dash = pct * 283;


  return (
    <div
      className={`home2-circleStat home2-circleStat--${tone} ${ok ? "is-ok" : ""}`}
      role="group"
      aria-label={label}
    >
      <div className="home2-circleRing" aria-hidden="true">
        <svg className="home2-circleSvg" viewBox="0 0 100 100">
          <circle className="home2-circleBg" cx="50" cy="50" r="45" />
          <circle
            className="home2-circleFill"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray={`${dash} 283`}
          />
        </svg>

        <div className="home2-circleCenter">
          <div className="home2-circleVal">
            {showTotal ? (
              <>
                {value}/{total}
              </>
            ) : (
              value
            )}
          </div>
        </div>
      </div>

      <div className="home2-circleLabel">{label}</div>
    </div>
  );
}



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

  const [profilePower] = useState(26);
  const [, setCurrentTime] = useState("");

  // CHRONIC: Medikation State (klickbar)
  const [meds, setMeds] = useState<MedItem[]>([
    { id: "lthyroxin", label: "L-Thyroxin", taken: true },
    { id: "metformin", label: "Metformin", taken: true },
    { id: "ramipril", label: "Ramipril", taken: false },
  ]);

  const toggleMed = (id: string) => {
    setMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m))
    );
  };

  const medsTaken = meds.filter((m) => m.taken).length;
  const medsTotal = meds.length;

  // CHRONIC: weitere Circle Werte (Mock)
  const hrvValue = 65;
  const symptomsCount = 0;

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
            icon: <Clock className="h-icon" />,
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
          { key: "doc", label: "Dokument", icon: <Upload className="h-icon" />, onClick: onOpenDocument },
          { key: "scan", label: "Body Scan", icon: <CameraIcon className="h-icon" />, onClick: onOpenBodyScan },
        ],
        scheduleCard: null as null,
      };
    }

    // CHRONIC
    return {
      sectionTodayTitle: "Heute",
      secondaryCardTitle: "Medikation",
      secondaryPills: [],
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
          icon: <Question className="h-icon" />,
        },
        {
          tone: "blue" as InsightTone,
          tag: "LABOR-TREND",
          title: "",
          body: "Entzündungswert (CRP) −15% gesunken",
          icon: <Blood className="h-icon" />,
        },
      ],
      actionsTitle: "Action",
      actions: [
        {
          tone: "blue" as ActionTone,
          title: "Zusammenfassung bereit",
          sub: "Kardiologie-Report ansehen & teilen",
          right: "",
          icon: <DocumentIcon className="h-icon-doc" />,
          chevron: true,
        },
        {
          tone: "teal" as ActionTone,
          title: "L-Thyroxin nachbestellen",
          sub: "Vorrat reicht noch für 5 Tage",
          right: "",
          icon: <SymptomIcon className="supmed-icon" />,
          chevron: true,
        },
        {
          tone: "purple" as ActionTone,
          title: "Labor-Trend für Termin",
          sub: "Wichtige Erkenntnis für das Gespräch",
          right: "",
          icon: <Blood className="labor-icon" />,
          chevron: true,
        },
      ],
      quickActions: [
        { key: "food", label: "Essen", icon: <CameraIcon className="food-icon" />, onClick: onOpenFood },
        { key: "sym", label: "Symptom", icon: <SymptomIcon className="supmed-icon" />, onClick: onOpenSymptom },
        { key: "doc", label: "Dokument", icon: <Upload className="up-icon" />, onClick: onOpenDocument },
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
            aria-label="ownHealth"
            onClick={onOpenProfile}
          >
            <OwnLogo className="home2-logo" />
          </button>

          <div className="home2-top-mid">
            <div className="home2-lock">
              <LockIcon className="home2-lock-icon" />
              <span>Sicher verschlüsselt</span>
            </div>
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

        {/* Heute */}
        <div className="home2-section">
          <h2 className="home2-h2">{data.sectionTodayTitle}</h2>

          {/* CHRONIC: Kreis-Überblick statt Steps-Card */}
          {!isLongevity ? (
            <div className="home2-circleRow">
              {/* Medikamente: blau */}
              <CircleStat value={medsTaken} total={medsTotal} label="Medikamente" tone="blue" />

              {/* HRV: spezieller Look */}
              <div className="home2-circleStat home2-circleStat--hrv" role="group" aria-label="HRV">
                <div className="home2-circleRing home2-circleRing--hrv is-pulse">
                  <div className="home2-circleCenter">
                    <div className="home2-circleVal">{hrvValue}</div>                    
                  </div>
                </div>
                <div className="home2-circleLabel">HRV</div>
              </div>

              {/* Symptome: grün + "ok" wenn 0 */}
              <CircleStat
                value={symptomsCount}
                total={1}
                label="Symptome"
                tone="green"
                ok={symptomsCount === 0}
                showTotal={false}
              />
            </div>
          ) : (
            // Longevity: deine alte KPI Card bleibt
            <div className="home2-kpiCard">
              <div className="home2-kpiLeft">
                <div className="home2-kpiIcon">
                  {/* Steps Icon war bei dir importiert – falls du es weiterhin brauchst, wieder reinnehmen */}
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
          )}

          {/* CHRONIC: Medikation mit Toggle */}
          {!isLongevity && (
            <div className="home2-miniCard">
              <div className="home2-miniTitle">{data.secondaryCardTitle}</div>

              <div className="home2-suppGrid">
                {meds.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`home2-suppTile ${m.taken ? "is-active" : ""}`}
                    aria-pressed={m.taken}
                    onClick={() => toggleMed(m.id)}
                  >
                    <div className="home2-suppIconWrap">
                      <div className="home2-suppIcon">
                        <SymptomIcon className="supmed-icon" />
                      </div>

                      {m.taken && (
                        <span className="home2-suppCheck" aria-hidden="true">
                          <CheckIcon className="home2-suppCheckIcon" />
                        </span>
                      )}
                    </div>

                    <div className="home2-suppLabel">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Longevity: Supplements wie gehabt */}
          {isLongevity && (
            <div className="home2-miniCard">
              <div className="home2-miniTitle">{data.secondaryCardTitle}</div>
              <div className="home2-suppGrid">
                {data.secondaryPills.map((p: any) => (
                  <button
                    key={p.label}
                    type="button"
                    className={`home2-suppTile ${p.active ? "is-active" : ""}`}
                    aria-pressed={p.active}
                  >
                    <div className="home2-suppIconWrap">
                      <div className="home2-suppIcon">
                        <SymptomIcon className="supmed-icon" />
                      </div>

                      {p.active && (
                        <span className="home2-suppCheck" aria-hidden="true">
                          <CheckIcon className="home2-suppCheckIcon" />
                        </span>
                      )}
                    </div>

                    <div className="home2-suppLabel">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chroniker: Termine */}
        {(!isLongevity && data.scheduleCard) && (
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
            {data.insights.map((it: any, idx: number) => (
              <div key={idx} className={`home2-insight home2-insight--${it.tone}`}>
                <div className="home2-insightTop">
                  <div className="home2-insightIcon">{it.icon}</div>
                  <div className="home2-insightTag">{it.tag}</div>
                </div>
                <div className="home2-insightBody">
                  <div className="home2-insightLine">
                    {it.title ? <span className="home2-insightMetricInline">{it.title}</span> : null}
                    <span className="home2-insightTextInline">{it.body}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="home2-section">
          <h2 className="home2-h2">{data.actionsTitle}</h2>

          <div className="home2-actions">
            {data.actions.map((a: any, idx: number) => (
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

        {/* Quick Actions */}
        <div className="home2-quickDock">
          {data.quickActions.map((q: any) => (
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
        <nav className="home-navigation">
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
