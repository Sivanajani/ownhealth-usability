import { useEffect, useState } from "react";
import "./onboardingStart.css";
import "./onboardingData.css";

type Props = {
  onNext?: () => void;
};

type Bar = { label: string; h: number; delay: number };

const BARS: Bar[] = [
  { label: "1x", h: 34, delay: 0 },
  { label: "3x", h: 56, delay: 90 },
  { label: "6x", h: 74, delay: 180 },
  { label: "10x", h: 96, delay: 270 },
];

export default function OnboardingData({ onNext }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 140);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    if (!onNext) return;
    const root = document.querySelector(".ob-root");
    if (root) {
      root.classList.add("ob-fadeOut");
      setTimeout(() => onNext(), 350);
    } else {
      onNext();
    }
  };

  return (
    <div className="ob-root">
      <div className="ob-content obD-content">
        {/* TOP */}
        <div className={`obD-top ${show ? "show" : ""}`}>
          <h1 className="obD-title">
            Je mehr du teilst,
            <br />
            desto besser können
            <br />
            wir dir helfen
          </h1>
        </div>

        {/* MIDDLE */}
        <div className={`ob-middle obD-middle ${show ? "show" : ""}`}>
          <div className="obD-chart" aria-hidden="true">
            {BARS.map((b, i) => (
              <div key={b.label} className="obD-col">
                <div
                  className="obD-barWrap"
                  style={{ animationDelay: `${b.delay}ms` }}
                >
                  <div className="obD-bar" style={{ height: `${b.h}%` }} />
                  {i === BARS.length - 1 && (
                    <div className="obD-spark" aria-hidden="true">
                      +
                    </div>
                  )}
                </div>
                <div className="obD-xLabel">{b.label}</div>
              </div>
            ))}
          </div>

          <p className="obD-sub">
            OWN erkennt deine Muster
            <br />
            und passt sich dir an.
          </p>
        </div>

        {/* BOTTOM */}
        <div className={`ob-bottom obD-bottom ${show ? "show" : ""}`}>
          <button className="ob-button" onClick={handleNext}>
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
