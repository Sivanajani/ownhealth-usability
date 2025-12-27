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

export default function OnboardingChronic({ onNext, onBack }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "causes",
        icon: "🩺",
        badge: "VORSCHAU",
        title: (
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
                  <div className="obC-sub">
                    (sollte über 50 sein)
                  </div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Schwindel:</strong>{" "}
                  <span className="obC-muted">B12 bei 190 pg/ml</span>
                  <div className="obC-sub">
                    (sollte über 400 sein)
                  </div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Herzrasen:</strong>{" "}
                  <span className="obC-muted">TSH schwankt stark</span>
                  <div className="obC-sub">
                    zwischen 2.1 und 5.8
                  </div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  <strong>Verdauung:</strong>{" "}
                  <span className="obC-muted">Entzündungsmarker</span>
                  <div className="obC-sub">
                    CRP erhöht auf 8.2
                  </div>
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
              <div className="obC-reportIcon" aria-hidden="true">📄</div>
              <div className="obC-reportText">Arzt-Report soeben erstellt</div>
            </div>
          </>
        ),
      },

      {
        id: "plan",
        icon: "🧭",
        badge: "VORSCHAU",
        title: (
          <>
            Nächste Schritte
            <br />
            klar priorisiert
          </>
        ),
        body: (
          <>
            <div className="obC-list">
              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Blutwerte nachtesten: <span className="obC-muted">Ferritin, B12, TSH</span>
                  <div className="obC-sub">(mit Referenzbereich + Verlauf)</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Symptome tracken: <span className="obC-muted">Energie, Schwindel, Puls</span>
                  <div className="obC-sub">(mit Triggern verknüpfen)</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Arztgespräch: <span className="obC-muted">klarer 1-Seiten-Report</span>
                  <div className="obC-sub">(damit du ernst genommen wirst)</div>
                </span>
              </div>
            </div>

            <div className="obC-report obC-report--blue">
              <div className="obC-reportIcon" aria-hidden="true">✅</div>
              <div className="obC-reportText">Plan für die nächsten 14 Tage</div>
            </div>
          </>
        ),
      },

      {
        id: "relief",
        icon: "🛟",
        badge: "VORSCHAU",
        title: (
          <>
            Du bekommst
            <br />
            Kontrolle zurück
          </>
        ),
        body: (
          <>
            <div className="obC-list">
              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Klarheit statt Grübeln
                  <div className="obC-sub">Zusammenhang zwischen Symptomen & Werten</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Weniger Unsicherheit
                  <div className="obC-sub">Was ist dringend, was kann warten?</div>
                </span>
              </div>

              <div className="obC-row">
                <span className="obC-check">✓</span>
                <span className="obC-rowText">
                  Besser vorbereitet zum Arzt
                  <div className="obC-sub">Report + Verlauf + konkrete Fragen</div>
                </span>
              </div>
            </div>

            <div className="obC-report">
              <div className="obC-reportIcon" aria-hidden="true">🔒</div>
              <div className="obC-reportText">Daten bleiben privat</div>
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
      <div className="ob-content obC-content">
        {/* Top */}
        <div className="ob-top obC-top">
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

          <h1 className="obC-headline">
            Das finden wir in deinen
            <br />
            Gesundheitsdaten:
          </h1>
        </div>

        {/* Middle */}
        <div className="ob-middle obC-middle">
          <div className="obC-stack">
            <div className="obC-carousel" ref={trackRef} onScroll={onScroll}>
              {slides.map((s) => (
                <div className="obC-slide" key={s.id}>
                  <div className="obC-card">
                    <div className="obC-cardHeader">
                      <div className="obC-iconBox" aria-hidden="true">
                        {s.icon}
                      </div>

                      <div className="obC-cardTitle">{s.title}</div>

                      {s.badge && <span className="obC-badge">{s.badge}</span>}
                    </div>

                    {s.body}
                  </div>
                </div>
              ))}
            </div>

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

          <div className="obL-lock">🔒 Sicher verschlüsselt</div>
        </div>
      </div>
    </div>
  );
}
