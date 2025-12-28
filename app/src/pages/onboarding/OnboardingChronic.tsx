import { useMemo, useRef, useState } from "react";
import "./onboardingStart.css";
import "./onboardingChronic.css";

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

export default function OnboardingChronic({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "causes",
        icon: "🩺",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du hättest
            <br />
            endlich Gewissheit:
          </>
        ),
        cardTitle: (
          <>
            Deine Symptome haben
            <br />
            messbare Ursachen
          </>
        ),
        body: (
          <>
            <div className="obC-list">
              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Erschöpfung:</strong>{" "}
                  <span className="obC-muted">Ferritin nur 15 ng/ml</span>
                  <div className="obC-sub">(sollte über 50 sein)</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Schwindel:</strong>{" "}
                  <span className="obC-muted">B12 bei 190 pg/ml</span>
                  <div className="obC-sub">(sollte über 400 sein)</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Herzrasen:</strong>{" "}
                  <span className="obC-muted">TSH schwankt stark</span>
                  <div className="obC-sub">zwischen 2.1 und 5.8</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Verdauung:</strong>{" "}
                  <span className="obC-muted">Entzündungsmarker</span>
                  <div className="obC-sub">CRP erhöht auf 8.2</div>
                </span>
              </div>
            </div>

            <div className="obC-alert">
              <span className="obC-alertX">✕</span>
              <div className="obC-alertText">
                <strong>„Alles nur Stress“</strong> – widerlegt.
                <div className="obC-alertSub">
                  Deine Werte zeigen die wahren Ursachen.
                </div>
              </div>
            </div>

            <div className="obC-report">
              <div className="obC-reportIcon" aria-hidden="true">
                📄
              </div>
              <div className="obC-reportText">Arzt-Report soeben erstellt</div>
            </div>
          </>
        ),
      },

      {
        id: "plan",
        icon: "🧭",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du verstehst
            <br />
            endlich deine Geschichte:
          </>
        ),
        cardTitle: (
          <>
            Dein Gesundheitsverlauf
            <br />
            macht plötzlich Sinn
          </>
        ),
        body: (
          <>
            <div className="obC-list">
              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  2021: <span className="obC-muted">Antibiotika wegen Blasenentzündung</span>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  2022: <span className="obC-muted">Erste Verdauungsprobleme</span>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  2023: <span className="obC-muted">Müdigkeit beginnt schleichend</span>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  2024: <span className="obC-muted">Schilddrüsenwerte auffällig</span>
                </span>
              </div>
            </div>

            <div className="obC-alert obC-alert--soft">
              <span className="obC-alertText">
                Erkanntes Muster: Antibiotika → Darmflora gestört → Nährstoffaufnahme → Erschöpfung
              </span>
            </div>

            <div className="obC-report obC-report--blue">
              <div className="obC-reportIcon" aria-hidden="true">
                📌
              </div>
              <div className="obC-reportText">Komplette Historie für Arzt erstellt</div>
            </div>
          </>
        ),
      },

      {
        id: "relief",
        icon: "🧠",
        badge: "VORSCHAU",
        topHeadline: (
          <>
            Stell dir vor, du weißt
            <br />
            endlich was du tun kannst:
          </>
        ),
        cardTitle: (
          <>
            Deine Kontrolle
            <br />
            zurück
          </>
        ),
        body: (
          <>
            <div className="obC-list">
              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Morgens: <span className="obC-muted">Eisen auf nüchternen Magen</span>
                  <div className="obC-sub">+37% weniger Erschöpfung nach 3 Wochen</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Mittags: <span className="obC-muted">B12 sublingual</span>
                  <div className="obC-sub">→ Schwindel lässt nach</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Abends: <span className="obC-muted">Magnesium vor dem Schlaf</span>
                  <div className="obC-sub">→ Durchschlafen statt 4x aufwachen</div>
                </span>
              </div>
            </div>

            <div className="obC-danger">
              <span className="obC-dangerX">✕</span>
              <span className="obC-dangerText">
                Vorsicht: Kaffee blockiert Eisenaufnahme. 2 Stunden Abstand halten.
              </span>
            </div>

            <div className="obC-quick">
              <div className="obC-quickLabel">QUICK WIN</div>
              <div className="obC-quickValue">
                Diese 3 Schritte zeigen bei 73% erste Erfolge in 14 Tagen
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
      <div className="ob-content obC-content">

        {/* Top */}
        <div className="ob-top ob0-top">          
            <div className="ob0-dots" aria-hidden="true">
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot" />
              <span className="ob0-dot" />
              <span className="ob0-dot" />
            </div>          

          {/* Headline wie Mock, pro Slide wechselnd, im gleichen Style wie deine anderen Screens */}
          <h1 className="ob-title">{activeSlide.topHeadline}</h1>
        </div>

        {/* Middle */}
        <div className="ob-middle obC-middle">
          <div className="obC-stack">
            <div className="obC-carousel" ref={trackRef} onScroll={onScroll}>
              {slides.map((s) => (
                <section className="obC-slide" key={s.id} aria-label="Chronic Preview Slide">
                  <div className="obC-card">
                    <div className="obC-cardHeader">
                      <div className="obC-iconBox" aria-hidden="true">
                        {s.icon}
                      </div>

                      <div className="obC-headerText">
                        <div className="obC-cardTitle">{s.cardTitle}</div>
                        {s.badge && <span className="obC-badge">{s.badge}</span>}
                      </div>
                    </div>

                    <div className="obC-body">{s.body}</div>
                  </div>
                </section>
              ))}
            </div>

            {/* Dots unter der Card */}
            <div className="obC-miniProgress" aria-hidden="true">
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
        <div className="ob-bottom obC-bottom">
          <button className="ob-button" onClick={onNext}>
            Diese Klarheit will ich
          </button>          
        </div>
      </div>
    </div>
  );
}
