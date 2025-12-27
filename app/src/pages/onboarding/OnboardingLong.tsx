import { useMemo, useRef, useState } from "react";
import "./onboardingStart.css";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

type Slide = {
  id: string;
  title: React.ReactNode;
  badge?: string;
  icon: string;
  body: React.ReactNode;
};

export default function OnboardingLong({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "supps",
        icon: "🔗",
        badge: "VORSCHAU",
        title: (
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
                  Magnesium: <span className="obL-muted">+18% HRV (Wearable)</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Omega-3: <span className="obL-muted">-23% Entzündung (Blutwert)</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Vitamin D: <span className="obL-muted">Zielwert erreicht (Biomarker)</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Kreatin: <span className="obL-muted">+15% Kraftvolumen (Training)</span>
                </span>
              </div>
            </div>

            <div className="obL-alert">
              <span className="obL-alertX">✕</span>
              <span className="obL-alertText">8 ohne messbaren Effekt</span>
            </div>

            <div className="obL-savings">
              <div className="obL-savingsLabel">Einsparpotenzial</div>
              <div className="obL-savingsValue">130€/Monat</div>
            </div>
          </>
        ),
      },

      {
        id: "training",
        icon: "🏋️",
        badge: "VORSCHAU",
        title: (
          <>
            Training wirkt besser,
            <br />
            wenn du X anpasst
          </>
        ),
        body: (
          <>
            <div className="obL-list">
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Kraft: <span className="obL-muted">+12% Volumen bei 7–8h Schlaf</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Cardio: <span className="obL-muted">Zone-2 verbessert sich bei weniger Stress</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Regeneration: <span className="obL-muted">HRV fällt nach späten Workouts</span>
                </span>
              </div>
            </div>

            <div className="obL-savings obL-savings--blue">
              <div className="obL-savingsLabel">Quick Win</div>
              <div className="obL-savingsValue">2 Tage/Woche früher trainieren</div>
            </div>
          </>
        ),
      },

      {
        id: "sleep",
        icon: "🌙",
        badge: "VORSCHAU",
        title: (
          <>
            Schlaf ist dein
            <br />
            größter Hebel
          </>
        ),
        body: (
          <>
            <div className="obL-list">
              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Einschlafen: <span className="obL-muted">20–30 Min schneller ohne Screen</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  Tiefschlaf: <span className="obL-muted">↑ bei weniger Alkohol</span>
                </span>
              </div>

              <div className="obL-row">
                <span className="obL-check">✓</span>
                <span className="obL-rowText">
                  HRV: <span className="obL-muted">stabiler bei Koffein vor 14:00</span>
                </span>
              </div>
            </div>

            <div className="obL-savings">
              <div className="obL-savingsLabel">Einsparpotenzial</div>
              <div className="obL-savingsValue">mehr Energie am Morgen</div>
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

    const slideWidth = el.clientWidth;
    if (slideWidth <= 0) return;

    const idx = Math.round(el.scrollLeft / slideWidth);
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    if (clamped !== activeIndex) setActiveIndex(clamped);
  };

  return (
    <div className="ob-root">
      <div className="ob-content obL-content">
        {/* Top */}
        <div className="ob-top obL-top">
          <div className="obL-topbar">
            {/* Fortschrittspunkte (2 aktiv wie Mock) */}
            <div className="ob0-dots" aria-hidden="true">
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot" />
              <span className="ob0-dot" />
              <span className="ob0-dot" />
            </div>

            {onBack && (
              <button className="obL-topIcon" type="button" onClick={onBack} aria-label="Zurück">
                ⟲
              </button>
            )}
          </div>

          <h1 className="obL-headline">
            Stell dir vor, du wüsstest
            <br />
            genau, was wirkt.
          </h1>
        </div>

        {/* Middle */}
        <div className="ob-middle obL-middle">
          <div className="obL-stack">
            {/* Swipe Track (3 grosse Cards) */}
            <div className="obL-carousel" ref={trackRef} onScroll={onScroll}>
              {slides.map((s) => (
                <div className="obL-slide" key={s.id}>
                  <div className="obL-card">
                    <div className="obL-cardHeader">
                      <div className="obL-pillIcon" aria-hidden="true">
                        {s.icon}
                      </div>

                      <div className="obL-cardTitle">{s.title}</div>

                      {s.badge && <span className="obL-badge">{s.badge}</span>}
                    </div>

                    {s.body}
                  </div>
                </div>
              ))}
            </div>

            {/* Dots unter der Card = Slide-Indikator */}
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

          <div className="obL-lock">🔒 Sicher verschlüsselt</div>
        </div>
      </div>
    </div>
  );
}
