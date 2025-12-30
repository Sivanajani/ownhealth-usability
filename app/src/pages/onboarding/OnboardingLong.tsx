import { useMemo, useRef, useState, useEffect } from "react";
import "./onboardingStart.css";
import "./onboardingLong.css";
import PillIcon from "../../assets/pills.svg?react";
import ClockIcon from "../../assets/clock.svg?react";
import MoonIcon from "../../assets/moon.svg?react";


type IconKey = "pill" | "clock" | "moon";
type IconTheme = "pill" | "clock" | "moon";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

type Slide = {
  id: string;
  headline: React.ReactNode;
  accent: "green" | "blue" | "purple";
  iconKey: IconKey;
  iconTheme: IconTheme;
  badge?: string;
  title: React.ReactNode;
  list: {
    items: Array<{
      label: string;
      value: string;
      source: string;
      strong?: boolean;
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
  };
};

export default function OnboardingLong({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "supplements",
        accent: "green",
        iconKey: "pill",
        iconTheme: "pill",
        badge: "VORSCHAU",
        headline: (
          <>
            Stell dir vor, du wüsstest
            <br />
            genau, was wirkt.
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
            {
              label: "Magnesium:",
              value: "+18% HRV",
              source: "Quelle: Wearable & Mental Health",
              strong: true,
            },
            {
              label: "Omega-3:",
              value: "-23% Entzündung",
              source: "Quelle: Bluttest & Ernährung",
              strong: true,
            },
            {
              label: "Vitamin D:",
              value: "Zielwert erreicht",
              source: "Quelle: Bluttest & Arztbericht (Nov.)",
              strong: true,
            },
            {
              label: "Kreatin:",
              value: "+15% Kraftvolumen",
              source: "Quelle: Trainingsdaten & Bio-Impedanz",
              strong: true,
            },
          ],
        },
        alert: {
          title: "8 ohne messbaren Effekt",
          hint: "Hinweis: Manche Supplements sind erst langfristig messbar.",
        },
        bottom: {
          label: "Einsparpotenzial",
          value: "130€/Monat",
        },
      },

      {
        id: "bioage",
        accent: "blue",
        iconKey: "clock",
        iconTheme: "clock",
        badge: "VORSCHAU",
        headline: (
          <>
            Stell dir vor, du wärst
            <br />
            biologisch jünger:
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
            {
              label: "Herzgesundheit:",
              value: "Top 20% für dein Alter",
              source: "Quelle: Wearable + Arztbrief",
            },
            {
              label: "Stoffwechsel:",
              value: "Optimal",
              source: "Quelle: Bluttest November",
            },
            {
              label: "Entzündung:",
              value: "Niedrig",
              source: "Quelle: Bluttest + Ernährung",
            },
            {
              label: "Regeneration:",
              value: "Sehr gut",
              source: "Quelle: Wearable (90 Tage)",
            },
          ],
        },
        alert: {
          title: "Achtung: B12-Mangel beschleunigt Zell-Alterung",
          hint: "Quelle: Bluttest (sink seit Januar)",
        },
        bottom: {
          label: "QUICK WIN",
          value: "B12 auffüllen = Bio-Alter 31",
          hint: "Erste Verbesserungen in 4–6 Wochen",
        },
      },

      {
        id: "energy",
        accent: "purple",
        iconKey: "moon",
        iconTheme: "moon",
        badge: "VORSCHAU",
        headline: (
          <>
            Stell dir vor, du wachst
            <br />
            jeden Morgen mit mehr Energie auf
          </>
        ),
        title: "Dein Schlaf ist 60% schlechter als er sein könnte",
        list: {
          items: [
            {
              label: "Tiefschlaf:",
              value: "Nur 40min",
              source: "Quelle: Wearable",
            },
            {
              label: "Ursache gefunden:",
              value: "Magnesiummangel",
              source: "Quelle: Bluttest (0.71 mmol/l)",
            },
            {
              label: "Verstärkt durch:",
              value: "Spätes Abendessen",
              source: "Quelle: Ernährungsdaten (20:30 Uhr)",
            },
            {
              label: "Stress abends zu hoch",
              value: "",
              source: "Quelle: HRV-Abfall nach 20 Uhr",
            },
          ],
        },
        alert: {
          title: "Die Kombi killt den Schlaf:",
          hint: "Kaffee um 16 Uhr + Magnesium fehlt + spätes Essen",
        },
        bottom: {
          label: "QUICK WIN",
          value: "Magnesium 400mg vor dem Schlafen",
          hint: "+20–30 Min Tiefschlaf möglich",
        },
      },
    ],
    []
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (el) el.scrollLeft = 0;
  }, []);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const idx = Math.round(el.scrollLeft / w);
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    if (clamped !== active) setActive(clamped);
  };

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  const s = slides[active];

  const Icon = ({ k }: { k: IconKey }) => {
    if (k === "pill") return <PillIcon className="obLon-svg" />;
    if (k === "clock") return <ClockIcon className="obLon-svg" />;
    return <MoonIcon className="obLon-svg" />;
  };



  return (
    <div className="ob-root">
      <div className="ob-content obLon-root">
        {/* Top */}
        <div className="obLon-top">
          <div className="obLon-dots" aria-hidden="true">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`obLon-dot ${i === active ? "obLon-dot--active" : ""}`}
              />
            ))}
          </div>

          <h1 className="obLon-headline">{s.headline}</h1>
        </div>

        {/* Middle */}
        <div className="obLon-mid">
          <div className="obLon-carousel" ref={trackRef} onScroll={onScroll}>
            {slides.map((slide) => (
  <section className="obLon-slide" key={slide.id} aria-label="Longevity Preview">
    <div className="obLon-cardWrap">
      


      {/* DIE Card – nur einmal */}
      <div className={`obLon-card obLon-card--${slide.accent}`}>
        {/* Badge oberhalb der Card */}
        {slide.badge && (
          <div className={`obLon-topBadge obLon-topBadge--${slide.accent}`}>
            {slide.badge}
          </div>
        )}        
        {/* Header */}
        <div className="obLon-cardHeader">
          <div className={`obLon-iconWrap obLon-iconWrap--${slide.iconTheme}`}>
            <Icon k={slide.iconKey} />
          </div>

          <div className="obLon-cardTitle">{slide.title}</div>
        </div>

        {/* Panel 1: List */}
        <div className="obLon-panel obLon-panel--list">
          <div className="obLon-list">
            {slide.list.items.map((it, idx) => (
              <div className="obLon-row" key={idx}>
                <span className={`obLon-check obLon-check--${slide.accent}`}>✓</span>
                <div className="obLon-rowText">
                  <div className="obLon-rowLine">
                    <span className={`obLon-rowLabel ${it.strong ? "obLon-rowLabel--strong" : ""}`}>
                      {it.label}
                    </span>
                    {it.value && <span className="obLon-rowValue">{it.value}</span>}
                  </div>
                  <div className="obLon-rowSource">{it.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Alert */}
        <div className="obLon-panel obLon-panel--alert">
          <span className="obLon-x">✕</span>
          <div>
            <div className="obLon-alertTitle">{slide.alert.title}</div>
            {slide.alert.hint && (
              <div className="obLon-alertHint">{slide.alert.hint}</div>
            )}
          </div>
        </div>

        {/* Panel 3: Bottom */}
        <div className={`obLon-panel obLon-panel--bottom obLon-panel--bottom-${slide.accent}`}>
          <div className="obLon-bottomLabel">{slide.bottom.label}</div>
          <div className="obLon-bottomValue">{slide.bottom.value}</div>
          {slide.bottom.hint && (
            <div className="obLon-bottomHint">{slide.bottom.hint}</div>
          )}
        </div>

      </div>
    </div>
  </section>
))}

          </div>

          <div className="obLon-mini" aria-hidden="true">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`obLon-miniDot ${i === active ? "obLon-miniDot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="obLon-bottom">
          <button className="obLon-cta" onClick={onNext}>
            Diese Insights will ich
          </button>
          <button type="button" className="obLon-back" onClick={onBack}>
            Zurück
          </button>
        </div>
      </div>
    </div>
  );
}
