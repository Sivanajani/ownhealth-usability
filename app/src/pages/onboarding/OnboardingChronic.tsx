import { useMemo, useRef, useState } from "react";
import "./onboardingStart.css";
import "./onboardingLong.css";

import LabIcon from "../../assets/medical.svg?react";
import ChartIcon from "../../assets/chart.svg?react";
import PlanIcon from "../../assets/plan.svg?react";
import FileIcon from "../../assets/file.svg?react";
import LightningIcon from "../../assets/blitz.svg?react";

type IconKey = "lab" | "chart" | "plan";
type Accent = "blue" | "green" | "purple";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

type Slide = {
  id: string;
  topHeadline: React.ReactNode;
  accent: Accent;
  iconKey: IconKey;
  iconTheme: "clock" | "pill" | "moon" | "lab" | "chart" | "plan";
  badge?: string;
  title: React.ReactNode;

  list: {
    items: Array<{
      label: string;
      value?: string;
      source?: string;
    }>;
  };

  alert: {
    title: string;
    hint?: string;
  };

  bottom: {
    label: string;
    value: string;
    hint?: string;
    iconKey?: "file" | "lightning";
    prefix?: React.ReactNode;
  };
};

export default function OnboardingChronic({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "certainty",
        accent: "blue",
        iconKey: "lab",
        iconTheme: "lab",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du hättest
            <br />
            endlich Gewissheit:
          </>
        ),
        title: (
          <>
            Deine Symptome haben
            <br />
            messbare Ursachen
          </>
        ),
        list: {
          items: [
            { label: "Erschöpfung:", value: "Ferritin nur 15 ng/ml", source: "Quelle: Laborwert & Wearable" },
            { label: "Schwindel:", value: "B12 bei 190 pg/ml", source: "Quelle: Arztbrief & Medikation" },
            { label: "Herzrasen:", value: "TSH schwankt stark", source: "Quelle: Bluttest & Wearable" },
            { label: "Verdauung:", value: "Entzündungsmarker", source: "Quelle: Laborwert & Ernährung" },
          ],
        },
        alert: {
          title: "„Alles nur Stress“ – widerlegt.",
          hint: "Deine Werte zeigen die wahren Ursachen.",
        },
        bottom: {
          label: "ARZT-REPORT",
          value: "soeben erstellt",
          iconKey: "file",
        },
      },

      {
        id: "story",
        accent: "green",
        iconKey: "chart",
        iconTheme: "chart",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du verstehst
            <br />
            endlich deine Geschichte:
          </>
        ),
        title: (
          <>
            Dein Gesundheitsverlauf
            <br />
            macht plötzlich Sinn
          </>
        ),
        list: {
          items: [
            { label: "2021:", value: "Antibiotika wegen Blasenentzündung", source: "Quelle: Laborwert & Wearable" },
            { label: "2022:", value: "Erste Verdauungsprobleme", source: "Quelle: Ernährung & Apps" },
            { label: "2023:", value: "Müdigkeit beginnt schleichend", source: "Quelle: Mentale Gesundheit & Wearable" },
            { label: "2024:", value: "Schilddrüsenwerte auffällig", source: "Quelle: Bluttest & Hausarzt" },
          ],
        },
        alert: {
          title: "Erkanntes Muster:",
          hint: "Antibiotika → Darmflora gestört → Nährstoffaufnahme → Erschöpfung",
        },
        bottom: {
          label: "HISTORIE",
          value: "für Arzt erstellt",
          iconKey: "file",
        },
      },

      {
        id: "control",
        accent: "purple",
        iconKey: "plan",
        iconTheme: "plan",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du hast
            <br />
            die Kontrolle zurück:
          </>
        ),
        title: "Dein präziser Fahrplan",
        list: {
          items: [
            { label: "Morgens:", value: "Eisen auf nüchternen Magen", source: "Ziel: Ferritin-Speicher füllen" },
            { label: "Mittags:", value: "B12 sublingual", source: "Ziel: Nervensystem stabilisieren" },
            { label: "Abends:", value: "Magnesium vor dem Schlaf", source: "Ziel: Regeneration & HRV-Steigerung" },
          ],
        },
        alert: {
          title: "Vorsicht: Kaffee blockiert Eisenaufnahme.",
          hint: "≥ 2 Stunden Abstand halten",
        },
        bottom: {
          label: "PROGNOSE",
          value: "Energie-Anstieg",
          hint: "Messbar mehr Energie in 14 Tagen.",
          iconKey: "lightning",
          prefix: <span style={{ fontWeight: 900 }}>Prognose:</span>,
        },
      },
    ],
    []
  );

  const Icon = ({ k }: { k: IconKey }) => {
    if (k === "lab") return <LabIcon className="obLon-svg" />;
    if (k === "chart") return <ChartIcon className="obLon-svg" />;
    return <PlanIcon className="obLon-svg" />;
  };

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    if (!w) return;
    const idx = Math.round(el.scrollLeft / w);
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    if (clamped !== activeIndex) setActiveIndex(clamped);
  };

  const activeSlide = slides[activeIndex];

  return (
    <div className="ob-root">
      <div className="ob-content obLon-root">
        {/* TOP*/}
        <div className="ob-top ob0-top">
          <div className="ob0-dots" aria-hidden="true">
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
          </div>

          <h1 className="obLon-headline">{activeSlide.topHeadline}</h1>
        </div>

        <div className="obLon-mid">
          <div className="obLon-carousel" ref={trackRef} onScroll={onScroll}>
            {slides.map((s) => (
              <section className="obLon-slide" key={s.id} aria-label="Chronic Preview Slide">
                <div className={`obLon-card obLon-card--${s.accent}`}>
                  {s.badge && (
                    <div className={`obLon-topBadge obLon-topBadge--${s.accent}`}>
                      {s.badge}
                    </div>
                  )}

                  <div className="obLon-cardHeader">
                    <div className={`obLon-iconWrap obLon-iconWrap--${s.iconTheme}`}>
                      <Icon k={s.iconKey} />
                    </div>

                    <div className="obLon-cardTitle">{s.title}</div>
                  </div>

                  {/* LIST */}
                  <div className="obLon-panel obLon-panel--list">
                    <div className="obLon-list">
                      {s.list.items.map((it, idx) => (
                        <div className="obLon-row" key={idx}>
                          <span className={`obLon-check obLon-check--${s.accent}`}>✓</span>

                          <div className="obLon-rowText">
                            <div className="obLon-rowLine">
                              <span className="obLon-rowLabel">{it.label}</span>
                              {it.value && <span className="obLon-rowValue">{it.value}</span>}
                            </div>
                            {it.source && <div className="obLon-rowSource">{it.source}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ALERT */}
                  <div className="obLon-panel obLon-panel--alert">
                    <span className="obLon-x">✕</span>
                    <div>
                      <div className="obLon-alertTitle">{s.alert.title}</div>
                      {s.alert.hint && <div className="obLon-alertHint">{s.alert.hint}</div>}
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className={`obLon-panel obLon-panel--bottom obLon-panel--bottom-${s.accent}`}>
                    <div className="obLon-bottomIcon" aria-hidden="true">
                      {s.bottom.iconKey === "lightning" ? (
                        <LightningIcon className="obLon-svg" />
                      ) : (
                        <FileIcon className="obLon-svg" />
                      )}
                    </div>

                    <div className="obLon-bottomText">
                      <div className="obLon2-bottomLabel">{s.bottom.label}</div>
                      <div className="obLon2-bottomValue">
                        {s.bottom.prefix} {s.bottom.value}
                      </div>
                      {s.bottom.hint && <div className="obLon2-bottomHint">{s.bottom.hint}</div>}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* BOTTOM = Slide Dots (nur fürs Swipen) */}
          <div className="obLon-mini" aria-hidden="true">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`obLon-miniDot ${i === activeIndex ? "obLon-miniDot--active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="obLon-bottom">
          <button className="obLon-cta" onClick={onNext}>
            Diese Klarheit will ich
          </button>
          <button className="obLon-back" onClick={onBack}>
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
}
