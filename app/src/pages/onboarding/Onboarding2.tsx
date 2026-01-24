import { useLayoutEffect, useRef, useState } from "react";
import DocuIcon from "../../assets/document.svg?react";
import AppIcon from "../../assets/smartphone-call.svg?react";
import DrugIcon from "../../assets/pills.svg?react";
import BloodIcon from "../../assets/medical.svg?react";
import "../onboarding/onboardingStart.css";
import "../onboarding/onboarding2.css";

type Props = {
  onNext?: () => void;
  onClose?: () => void;
};

type Pt = { x: number; y: number };
type Lines = {
  docBR: Pt;
  pillTL: Pt;
  pillBR: Pt;
  labTL: Pt;
  labBR: Pt;
  phoneTL: Pt;
};

export default function Onboarding2({ onNext, onClose }: Props) {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const docRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const labRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  const [L, setL] = useState<Lines | null>(null);

  useLayoutEffect(() => {
    const calc = () => {
      const graph = graphRef.current;
      const doc = docRef.current;
      const pill = pillRef.current;
      const lab = labRef.current;
      const phone = phoneRef.current;
      if (!graph || !doc || !pill || !lab || !phone) return;

      const g = graph.getBoundingClientRect();
      const rDoc = doc.getBoundingClientRect();
      const rPill = pill.getBoundingClientRect();
      const rLab = lab.getBoundingClientRect();
      const rPhone = phone.getBoundingClientRect();

      const toLocal = (x: number, y: number): Pt => ({ x: x - g.left, y: y - g.top });

      // Ecke-zu-Ecke (wie du es aktuell eingestellt hast)
      const docBR = toLocal(rDoc.right, rDoc.bottom);
      const pillTL = toLocal(rPill.left, rPill.top);
      const pillBR = toLocal(rPill.left, rPill.bottom);   // BL (links unten) bei dir
      const labTL = toLocal(rLab.right, rLab.top);         // TR (rechts oben) bei dir
      const labBR = toLocal(rLab.right, rLab.bottom);
      const phoneTL = toLocal(rPhone.left, rPhone.top);

      setL({ docBR, pillTL, pillBR, labTL, labBR, phoneTL });
    };

    calc();
    window.addEventListener("resize", calc);
    const t = window.setTimeout(calc, 60);

    return () => {
      window.removeEventListener("resize", calc);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="ob-root">
      <div className="ob-content obN-content">
        {/* Top */}
        <div className="ob-top obN-top">
          <div className="ob0-dots" aria-hidden="true">
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
          </div>

          {onClose ? (
            <button className="obN-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          ) : null}

          <h1 className="ob01-title">
            Von Rätselraten <br />
            zu Gewissheit
          </h1>
        </div>

        {/* Middle */}
        <div className="ob-middle obN-middle">
          <div className="obN-compare">
            {/* Ohne OWN */}
            <div className="obN-col obN-col--muted">
              <div className="obN-colHeader">
                <span className="obN-colTitle">Ohne OWN</span>
              </div>

              <div className="obN-stack" aria-hidden="true">
                <div className="obN-chip obN-chip--muted obN-chip--doc">
                  <DocuIcon className="obN-svg" />
                  <span className="obN-question" aria-hidden="true">?</span>
                </div>

                <div className="obN-chip obN-chip--muted obN-chip--apps">
                  <AppIcon className="obN-svg" />
                  <span className="obN-question" aria-hidden="true">?</span>
                </div>

                <div className="obN-chip obN-chip--muted obN-chip--meds">
                  <DrugIcon className="obN-svg" />
                  <span className="obN-question" aria-hidden="true">?</span>
                </div>

                <div className="obN-chip obN-chip--muted obN-chip--labs">
                  <BloodIcon className="obN-svg" />
                  <span className="obN-question" aria-hidden="true">?</span>
                </div>
              </div>
            </div>

            {/* Mit OWN */}
            <div className="obN-col obN-col--own">
              <div className="obN-colHeader">
                <span className="obN-colTitle obN-colTitle--own">Mit OWN</span>
              </div>

              <div className="obN-graph" ref={graphRef} aria-hidden="true">
                <svg className="obN-lines" aria-hidden="true">
                  {L && (
                    <>
                      {/* Doc BR -> Pill TL */}
                      <line
                        className="obN-link"
                        x1={L.docBR.x}
                        y1={L.docBR.y}
                        x2={L.pillTL.x}
                        y2={L.pillTL.y}
                      />
                      {/* Pill BL -> Lab TR (bei dir pillBR=BL, labTL=TR) */}
                      <line
                        className="obN-link"
                        x1={L.pillBR.x}
                        y1={L.pillBR.y}
                        x2={L.labTL.x}
                        y2={L.labTL.y}
                      />
                      {/* Lab BR -> Phone TL */}
                      <line
                        className="obN-link"
                        x1={L.labBR.x}
                        y1={L.labBR.y}
                        x2={L.phoneTL.x}
                        y2={L.phoneTL.y}
                      />
                    </>
                  )}
                </svg>

                <div ref={docRef} className="obN-node obN-node--blue">
                  <DocuIcon className="obN-svg" />
                </div>

                <div ref={pillRef} className="obN-node obN-node--yellow">
                  <DrugIcon className="obN-svg" />
                </div>

                <div ref={labRef} className="obN-node obN-node--red">
                  <BloodIcon className="obN-svg" />
                </div>

                <div ref={phoneRef} className="obN-node obN-node--green">
                  <AppIcon className="obN-svg" />
                </div>
              </div>
            </div>
          </div>

          <p className="obN-footnote">
            <strong>OWN</strong> analysiert <strong>ALLE</strong> deine Quellen
            <br />
            <span>– nicht nur eine.</span>
          </p>
        </div>

        {/* Bottom */}
        <div className="ob-bottom obN-bottom">
          <button className="ob-button" onClick={onNext}>
            Jetzt anfangen
          </button>
        </div>
      </div>
    </div>
  );
}
