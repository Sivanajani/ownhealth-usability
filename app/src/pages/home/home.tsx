import { useEffect, useMemo, useState } from "react";
import type { FocusKey } from "../../types/focus";
import "./home.css";

import LockIcon from "../../assets/lock.svg?react";
import SettingsIcon from "../../assets/setting.svg?react";
import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";
import ChevronRightIcon from "../../assets/chevron-right.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import SymptomIcon from "../../assets/pills.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import Upload from "../../assets/upload.svg?react";
import Symptom from "../../assets/digital.svg?react";
import CheckIcon from "../../assets/check.svg?react";
import Clock from "../../assets/clock.svg?react";
import Question from "../../assets/question-sign.svg?react";
import Blood from "../../assets/blood.svg?react";
import Weight from "../../assets/weight.svg?react";
import OwnLogo from "../../assets/O_Logo.svg?react";

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
  suffix,
  compactTotal = false,
}: {
  value: number;
  total: number;
  label: string;
  tone?: CircleTone;
  ok?: boolean;
  showTotal?: boolean;
  suffix?: string;
  compactTotal?: boolean;
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
          <circle className="home2-circleFill" cx="50" cy="50" r="45" strokeDasharray={`${dash} 283`} />
        </svg>

        <div className="home2-circleVal">
          {showTotal ? (
            compactTotal ? (
              <div className="home2-circleValStack">
                <div className="home2-circleValMain">{value}</div>
                <div className="home2-circleValSub">/ {total}</div>
              </div>
            ) : (
              <>
                {value}/{total}
              </>
            )
          ) : (
            <>
              {value}
              {suffix ? suffix : null}
            </>
          )}
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

  // CHRONIC: Medikation klickbar
  const [meds, setMeds] = useState<MedItem[]>([
    { id: "lthyroxin", label: "L-Thyroxin", taken: true },
    { id: "metformin", label: "Metformin", taken: true },
    { id: "ramipril", label: "Ramipril", taken: false },
  ]);

  const toggleMed = (id: string) => {
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  // LONGEVITY: Supplements klickbar (wie meds)
  const [supplements, setSupplements] = useState<MedItem[]>([
    { id: "b12", label: "B12", taken: true },
    { id: "omega3", label: "Omega 3", taken: true },
    { id: "zink", label: "Zink", taken: false },
  ]);

  const toggleSupplement = (id: string) => {
    setSupplements((prev) => prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s)));
  };

  const medsTaken = meds.filter((m) => m.taken).length;
  const medsTotal = meds.length;

  // CHRONIC: Mock
  const hrvValue = 65;
  const symptomsCount = 0;

  // LONGEVITY: Mock
  const sleepPct = 88;
  const hrvPct = 65;
  //const regenPct = 78;
  const stepsValue = 7480;
  const stepsGoal = 10000;

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
        secondaryCardTitle: "Supplements",
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
            icon: <Blood className="h-icon" />,
          },
        ],
        actionsTitle: "Action",
        actions: [
          {
            tone: "purple" as ActionTone,
            title: "Magnesium-Boost",
            sub: "+18% Regeneration",
            icon: <SymptomIcon className="suple-icon" />,
            chevron: true,
          },
          {
            tone: "blue" as ActionTone,
            title: "Training vor 16:00 Uhr",
            sub: "+22% HRV",
            icon: <Weight className="h-icon-doc" />,
            chevron: true,
          },
          {
            tone: "teal" as ActionTone,
            title: "Mehr Protein beim Frühstück",
            sub: "−35% Glucose-Spikes",
            icon: <FoodIcon className="supmed-icon" />,
            chevron: true,
          },
        ],
        quickActions: [
          { key: "food", label: "Essen", icon: <CameraIcon className="food-icon" />, onClick: onOpenFood },
          { key: "doc", label: "Dokument", icon: <Upload className="up-icon" />, onClick: onOpenDocument },
          { key: "scan", label: "Body Scan", icon: <Symptom className="labor-icon" />, onClick: onOpenBodyScan },
        ],
        scheduleCard: null as null,
      };
    }

    return {
      sectionTodayTitle: "Heute",
      secondaryCardTitle: "Medikation",
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
          icon: <Question className="h-icon icon-question" />,
        },
        {
          tone: "blue" as InsightTone,
          tag: "LABOR-TREND",
          title: "",
          body: "Entzündungswert (CRP) −15% gesunken",
          icon: <Blood className="h-icon icon-blood" />,
        },
      ],
      actionsTitle: "Action",
      actions: [
        {
          tone: "blue" as ActionTone,
          title: "Zusammenfassung bereit",
          sub: "Kardiologie-Report ansehen & teilen",
          icon: <DocumentIcon className="h-icon-doc" />,
          chevron: true,
        },
        {
          tone: "teal" as ActionTone,
          title: "L-Thyroxin nachbestellen",
          sub: "Vorrat reicht noch für 5 Tage",
          icon: <SymptomIcon className="supmed-icon" />,
          chevron: true,
        },
        {
          tone: "purple" as ActionTone,
          title: "Labor-Trend für Termin",
          sub: "Wichtige Erkenntnis für das Gespräch",
          icon: <Blood className="labor-icon" />,
          chevron: true,
        },
      ],
      quickActions: [
        { key: "food", label: "Essen", icon: <CameraIcon className="food-icon" />, onClick: onOpenFood },
        { key: "sym", label: "Symptom", icon: <Symptom className="supmed-icon" />, onClick: onOpenSymptom },
        { key: "doc", label: "Dokument", icon: <Upload className="up-icon" />, onClick: onOpenDocument },
      ],
    };
  }, [isLongevity, onOpenFood, onOpenDocument, onOpenBodyScan, onOpenSymptom]);

  return (
    <div className={`home2-root ${isLongevity ? "home2--longevity" : "home2--chronic"}`}>
      <div className="home2-content">
        {/* Topbar */}
        <div className="home2-top">
          <button className="home2-iconbtn" type="button" aria-label="ownHealth" onClick={onOpenProfile}>
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
                  <circle className="home2-power-fill" cx="50" cy="50" r="45" strokeDasharray={`${profilePower * 2.83} 283`} />
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
          <h2 className="home2-h2">{(data as any).sectionTodayTitle}</h2>

          {/* Circles */}
          <div className={`home2-circleRow ${isLongevity ? "home2-circleRow--longevity" : ""}`}>
            {!isLongevity ? (
              <>
                <CircleStat value={medsTaken} total={medsTotal} label="Medikamente" tone="blue" />

                <div className="home2-circleStat home2-circleStat--hrv" role="group" aria-label="HRV">
                  <div className="home2-circleRing home2-circleRing--hrv is-pulse">
                    <div className="home2-circleCenter">
                      <div className="home2-circleVal">{hrvValue}</div>
                    </div>
                  </div>
                  <div className="home2-circleLabel">HRV</div>
                </div>

                <CircleStat value={symptomsCount} total={1} label="Symptome" tone="green" ok={symptomsCount === 0} showTotal={false} />
              </>
            ) : (
              <>
                <CircleStat value={sleepPct} total={100} label="Schlaf" tone="blue" showTotal={false} suffix="%" />
                <CircleStat value={hrvPct} total={100} label="HRV" tone="hrv" showTotal={false} suffix="%" />
                <CircleStat
  value={stepsValue}
  total={stepsGoal}
  label="Schritte"
  tone="green"
  showTotal
  compactTotal
/>

              </>
            )}
          </div>

          {/* CHRONIC: Medikation klickbar */}
          {!isLongevity && (
            <div className="home2-miniCard">
              <div className="home2-miniTitle">{(data as any).secondaryCardTitle}</div>

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

          {/*LONGEVITY: Supplements klickbar */}
          {isLongevity && (
            <div className="home2-miniCard">
              <div className="home2-miniTitle">{(data as any).secondaryCardTitle}</div>

              <div className="home2-suppGrid">
                {supplements.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`home2-suppTile ${s.taken ? "is-active" : ""}`}
                    aria-pressed={s.taken}
                    onClick={() => toggleSupplement(s.id)}
                  >
                    <div className="home2-suppIconWrap">
                      <div className="home2-suppIcon">
                        <SymptomIcon className="supmed-icon" />
                      </div>

                      {s.taken && (
                        <span className="home2-suppCheck" aria-hidden="true">
                          <CheckIcon className="home2-suppCheckIcon" />
                        </span>
                      )}
                    </div>

                    <div className="home2-suppLabel">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chroniker: Termine */}
        {!isLongevity && (data as any).scheduleCard && (
          <div className="home2-section">
            <div className="home2-sectionHead">
              <button className="home2-sectionTitleBtn" type="button" onClick={() => {}} aria-label="Termine öffnen">
                <h2 className="home2-h2 home2-h2--btn">Termine</h2>
                <ChevronRightIcon className="home2-sectionChevron" />
              </button>
            </div>

            <button className="home2-appointment" type="button">
              <div className="home2-dateBadge">
                <div className="home2-dateBadgeTop">{(data as any).scheduleCard.date.split("\n")[0]}</div>
                <div className="home2-dateBadgeBottom">{(data as any).scheduleCard.date.split("\n")[1]}</div>
              </div>

              <div className="home2-appointmentText">
                <div className="home2-appointmentTitle">{(data as any).scheduleCard.title}</div>
                <div className="home2-appointmentSub">{(data as any).scheduleCard.time}</div>
                <div className="home2-appointmentMeta">
                  <CheckIcon className="home2-metaIcon" />
                  <span>{(data as any).scheduleCard.status}</span>
                </div>
              </div>

              <ChevronRightIcon className="home2-chevron" />
            </button>
          </div>
        )}

        {/* Insights */}
        <div className="home2-section">
          <div className="home2-sectionHead">
            <button className="home2-sectionTitleBtn" type="button" onClick={() => {}} aria-label="Insights öffnen">
              <h2 className="home2-h2 home2-h2--btn">Insights</h2>
              <ChevronRightIcon className="home2-sectionChevron" />
            </button>
          </div>

          <div className="home2-insights">
            {(data as any).insights.map((it: any, idx: number) => (
              <div key={idx} className={`home2-insight home2-insight--${it.tone}`}>
                <div className="home2-insightRow">
                  <div className="home2-insightIcon">{it.icon}</div>

                  <div className="home2-insightContent">
                    <div className="home2-insightTag">{it.tag}</div>

                    <div className="home2-insightLine">
                      {it.title ? <span className="home2-insightMetricInline">{it.title}</span> : null}
                      <span className="home2-insightTextInline">{it.body}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="home2-section">
          <div className="home2-sectionHead">
            <button className="home2-sectionTitleBtn" type="button" onClick={() => {}} aria-label="Action öffnen">
              <h2 className="home2-h2 home2-h2--btn">{(data as any).actionsTitle}</h2>
              <ChevronRightIcon className="home2-sectionChevron" />
            </button>
          </div>

          <div className="home2-actions">
            {(data as any).actions.map((a: any, idx: number) => (
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
          {(data as any).quickActions.map((q: any) => (
            <button key={q.key} type="button" className="home2-quickBtn" onClick={q.onClick} aria-label={q.label}>
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
