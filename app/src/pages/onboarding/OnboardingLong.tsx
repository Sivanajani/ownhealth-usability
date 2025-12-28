import { useMemo, useRef, useState } from "react";
import "./onboardingStart.css";
import "./onboardingLong.css";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

type Slide = {
  id: string;
  topHeadline: React.ReactNode;
  cardTitle: React.ReactNode;
  badge?: string;
  icon: string;
  body: React.ReactNode;
};

export default function OnboardingLong({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "supps",
        icon: "💊",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du wüsstest
            <br />
            genau, was wirkt.
          </>
        ),
        cardTitle: (
          <>
            Nur 4 von deinen 12
            <br />
            Supplements wirken
          </>
        ),
        body: (
          <>
            <div className="obL-list">
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Magnesium <span className="obL-muted">+18% HRV (Wearable)</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Omega-3 <span className="obL-muted">-23% Entzündung (Blutwert)</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Vitamin D <span className="obL-muted">Zielwert erreicht (Biomarker)</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Kreatin <span className="obL-muted">+15% Kraftvolumen (Training)</span>
                </span>
              </div>
            </div>

            <div className="obL-danger">
              <span className="obL-dangerX">✕</span>
              <span className="obL-dangerText">8 ohne messbaren Effekt</span>
            </div>

            <div className="obL-kpi">
              <div className="obL-kpiLabel">Einsparpotenzial</div>
              <div className="obL-kpiValue">130€/Monat</div>
            </div>
          </>
        ),
      },

      {
        id: "bioage",
        icon: "🧬",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du wärst
            <br />
            biologisch jünger:
          </>
        ),
        cardTitle: (
          <>
            Dein Körper altert
            <br />
            aktuell langsamer
          </>
        ),
        body: (
          <>
            <div className="obL-list">
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Körper-Alter <span className="obL-muted">Du bist 4 Jahre jünger</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Herz-Check <span className="obL-muted">stark wie bei 25-Jährigen</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Zell-Schutz <span className="obL-muted">Top-Zustand</span>
                </span>
              </div>
            </div>

            <div className="obL-danger obL-danger--soft">
              <span className="obL-dangerText">
                Achtung: Hoher Zuckerkonsum beschleunigt Zell-Alterung.
              </span>
            </div>

            <div className="obL-quick">
              <div className="obL-quickLabel">Quick Win</div>
              <div className="obL-quickValue">
                +1 Jahr Bio-Alter durch 10 Min. Gehen täglich
              </div>
            </div>
          </>
        ),
      },

      {
        id: "energy",
        icon: "🌙",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du wachst
            <br />
            jeden Morgen mit mehr Energie auf
          </>
        ),
        cardTitle: (
          <>
            Deine Erholung ist
            <br />
            dein grösster Hebel
          </>
        ),
        body: (
          <>
            <div className="obL-list">
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Tiefschlaf <span className="obL-muted">+20% mit kühlerem Zimmer</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Ruhepuls <span className="obL-muted">stabiler, wenn Herz entspannt</span>
                </span>
              </div>
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Energie-Level <span className="obL-muted">Akku morgens „voll“</span>
                </span>
              </div>
            </div>

            <div className="obL-danger">
              <span className="obL-dangerX">✕</span>
              <span className="obL-dangerText">
                Stress-Falle: Handynutzung am Abend stört deine Tiefschlaf-Phase.
              </span>
            </div>

            <div className="obL-quick">
              <div className="obL-quickLabel">Quick Win</div>
              <div className="obL-quickValue">
                Kein Koffein nach 14 Uhr bringt +30 Min. echte Erholung
              </div>
            </div>
          </>
        ),
      },
    ],
    []
  );

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
      <div className="ob-content">
        {/* Top */}
        <div className="ob-top ob0-top">          
          <div className="ob0-dots" aria-hidden="true">
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
          </div>

          <h1 className="ob-title">{activeSlide.topHeadline}</h1>
        </div>

        {/* Middle */}
        <div className="ob-middle obL-middle">
          <div className="obL-stack">
            <div className="obL-carousel" ref={trackRef} onScroll={onScroll}>
              {slides.map((s) => (
                <section className="obL-slide" key={s.id} aria-label="Preview Slide">
                  <div className="obL-card">
                    <div className="obL-cardHeader">
                      <div className="obL-icon" aria-hidden="true">
                        {s.icon}
                      </div>

                      <div className="obL-headerText">
                        <div className="obL-cardTitle">{s.cardTitle}</div>
                        {s.badge && <span className="obL-badge">{s.badge}</span>}
                      </div>
                    </div>

                    <div className="obL-body">{s.body}</div>
                  </div>
                </section>
              ))}
            </div>
            
            <div className="obL-miniProgress" aria-hidden="true">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`obL-miniDot ${i === activeIndex ? "obL-miniDot--active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="ob-bottom obL-bottom">
          <button className="ob-button" onClick={onNext}>
            Diese Insights will ich
          </button>
          <button type="button" className="ob2-waitlist"  onClick={onBack}>
            Zurück
          </button>  
        </div>
      </div>
    </div>
  );
}
