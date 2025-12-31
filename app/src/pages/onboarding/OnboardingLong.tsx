import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
    label?: string; 
    value: string;
    hint?: string;
    iconKey?: "file" | "lightning";
    prefix?: React.ReactNode;
  };
};

export default function OnboardingLong({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "bioage",
        accent: "blue",
        iconKey: "lab",
        iconTheme: "lab",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du kennst
            <br />
            dein Bio-Alter:
          </>
        ),
        title: (
          <>
            Dein Bio-Alter: 34 statt 38
            <br />
            Dein Potenzial: 31
          </>
        ),
        list: {
          items: [
            { label: "Herzgesundheit:", value: "Top 20% für dein Alter", source: "[Wearable + Arztbrief]" },
            { label: "Stoffwechsel:", value: "Optimal", source: "[Bluttest November]" },
            { label: "Entzündung:", value: "Niedrig", source: "[Bluttest + Ernährung]" },
            { label: "Regeneration:", value: "Sehr gut", source: "[Wearable (90 Tage)]" },
          ],
        },
        alert: {
          title: "Achtung: B12-Mangel",
          hint: "Kann Zell-Alterung beschleunigen.",
        },
        bottom: {
          label: "QUICK WIN",
          value: "B12 auffüllen = Bio-Alter 31",
          hint: "Erste Verbesserungen in 4–6 Wochen",
          iconKey: "lightning",
        },
      },
      {
        id: "supplements",
        accent: "green",
        iconKey: "chart",
        iconTheme: "chart",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du weisst
            <br />
            was wirklich wirkt:
          </>
        ),
        title: (
          <>
            Nur 4 von deinen 12
            <br />
            Supplements wirken
          </>
        ),
        list: {
          items: [
            { label: "Vitamin D:", value: "Zielwert erreicht", source: "[Labor + Arztbrief (Nov.)]" },
            { label: "Omega-3:", value: "-23% Entzündung", source: "[Bluttest + Ernährung]" },
            { label: "Magnesium:", value: "+18% HRV", source: "[Wearable + Schlaf-App]" },
            { label: "Kreatin:", value: "+15% Kraftvolumen", source: "[Training + Bio-Impedanz]" },
          ],
        },
        alert: {
          title: "8 ohne messbaren Effekt",
          hint: "Manche sind erst langfristig messbar.",
        },
        bottom: {
          label: "EINSPARPOTENZIAL",
          value: "130€/Monat",
          iconKey: "file",
        },
      },
      {
        id: "sleep",
        accent: "purple",
        iconKey: "plan",
        iconTheme: "moon",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du findest
            <br />
            die Ursache:
          </>
        ),
        title: (
          <>
            Dein Schlaf ist 60%
            <br />
            schlechter als er sein könnte
          </>
        ),
        list: {
          items: [
            { label: "Tiefschlaf:", value: "Nur 40min", source: "[Wearable + Schlaf-App]" },
            { label: "Ursache gefunden:", value: "Magnesiummangel", source: "[Bluttest + Supplement-Tracking]" },
            { label: "Verstärkt durch:", value: "Spätes Abendessen", source: "[Ernährungs-App + Wearable HRV]" },
            { label: "Stress abends:", value: "Zu hoch", source: "[HRV + mentale Gesundheit]" },
          ],
        },
        alert: {
          title: "Die Kombi killt den Schlaf:",
          hint: "Kaffee 16 Uhr + Magnesium fehlt + spätes Essen",
        },
        bottom: {
          label: "QUICK WIN",
          value: "Magnesium 400mg vor dem Schlafen",
          hint: "+20–30 Min Tiefschlaf möglich",
          iconKey: "lightning",
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [wrapH, setWrapH] = useState<number | null>(null);

  const measureActive = () => {
    const node = cardRefs.current[activeIndex];
    if (!node) return;
    setWrapH(node.offsetHeight);
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const idx = Math.round(el.scrollLeft / w);
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    if (clamped !== activeIndex) setActiveIndex(clamped);
  };

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };


  useLayoutEffect(() => {
    measureActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);


  useEffect(() => {
    const onResize = () => measureActive();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const activeSlide = slides[activeIndex];

  return (
    <div className="ob-root">
      <div className="ob-content obLon-root">
        {/* TOP */}
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
          <div className="obLon-carouselWrap" style={wrapH ? { height: wrapH } : undefined}>
            <div className="obLon-carousel" ref={trackRef} onScroll={onScroll}>
              {slides.map((s, i) => (
                <section className="obLon-slide" key={s.id} aria-label="Longevity Preview Slide">
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className={`obLon-card obLon-card--${s.accent}`}
                  >
                    {s.badge && (
                      <div className={`obLon-topBadge obLon-topBadge--${s.accent}`}>{s.badge}</div>
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
                        {s.bottom.label && <div className="obLon2-bottomLabel">{s.bottom.label}</div>}
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
          </div>

          {/* Swipe dots */}
          <div className="obLon-mini" aria-hidden="true">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`obLon-miniDot ${i === activeIndex ? "obLon-miniDot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="obLon-bottom">
          <button className="obLon-cta" onClick={onNext}>
            Weiter
          </button>
          <button className="obLon-back" onClick={onBack}>
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
}
