import { useMemo, useRef, useState } from "react";
import "./onboardingStart.css";
import "./onboardingMerge.scss";

import WatchIcon from "../../assets/smartwatch.svg?react";
import DrugIcon from "../../assets/pills.svg?react";
import DocuIcon from "../../assets/document.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import BloodIcon from "../../assets/medical.svg?react";
import BrainIcon from "../../assets/brain.svg?react";
import AppIcon from "../../assets/smartphone-call.svg?react";
import Doc from "../../assets/stethoscope.svg?react";

import ownLogo from "../../assets/own.logo.svg";

type Props = { 
  onNext?: () => void
  onClose?: () => void;
 };
type Phase = "scatter" | "logo" | "build" | "hold" | "absorb" | "glow" | "done";

type BaseItem = {
  key: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  clr: string;
  sx: number;
  sy: number;
  srot: number;
};

type PositionedItem = BaseItem & {
  angleDeg: number;
  x: number;
  y: number;
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Onboarding0({ onNext }: Props) {
  const [phase, setPhase] = useState<Phase>("scatter");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [dockedCount, setDockedCount] = useState<number>(0);
  const [spokeCount, setSpokeCount] = useState<number>(0);
  const [hubGlow, setHubGlow] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  const runningRef = useRef(false);

  // TIMINGS
  const LOGO_IN_MS = 600;
  const MOVE_MS = 600;
  const LINE_MS = 450;

  // 1s feel
  const BETWEEN_ICONS_MS = 450;

  // neues Hold
  const HOLD_BEFORE_ABSORB_MS = 1000;

  // smoother absorb + transition
  const ABSORB_MS = 800;
  const FINAL_GLOW_MS = 700;
  const FADE_OUT_MS = 300;

  const baseItems: BaseItem[] = useMemo(
    () => [
      { key: "wear",   label: "Wearables",           Icon: WatchIcon, clr: "rgb(235, 156, 10)",   sx: 110,  sy: -60,  srot: 8 },
      { key: "blood",  label: "Bluttests",           Icon: BloodIcon, clr: "rgba(239,68,68,1)",   sx: -135, sy: 60,   srot: -6 },
      { key: "docs",   label: "Dokumente",           Icon: DocuIcon,  clr: "rgba(59,130,246,1)",  sx: -80,  sy: -190, srot: 12 },
      { key: "food",   label: "Ernährung",           Icon: FoodIcon,  clr: "rgb(241, 245, 11)",  sx: 120,  sy: -200, srot: -6 },
      { key: "doc",    label: "Hausarzt",            Icon: Doc,       clr: "rgba(147,197,253,1)", sx: 5,    sy: 130,  srot: -10 },
      { key: "mental", label: "Mentale\nGesundheit", Icon: BrainIcon, clr: "rgba(236,72,153,1)",  sx: -120, sy: -75,  srot: -8 },
      { key: "meds",   label: "Medikation",          Icon: DrugIcon,  clr: "rgba(139,92,246,1)",  sx: -100, sy: 230,  srot: 7 },
      { key: "apps",   label: "Apps",                Icon: AppIcon,   clr: "rgba(16,185,129,1)",  sx: 100,  sy: 230,  srot: -10 },
    ],
    []
  );

  const radius = 150;
  const positionedItems: PositionedItem[] = useMemo(() => {
    const count = baseItems.length;
    return baseItems.map((item, i) => {
      const angleRad = (2 * Math.PI * i) / count - Math.PI / 2;
      const angleDeg = (angleRad * 180) / Math.PI;
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius;
      return { ...item, angleDeg, x, y };
    });
  }, [baseItems]);

  const startSequence = async () => {
    if (phase !== "scatter") return;
    runningRef.current = true;

    // reset
    setDockedCount(0);
    setSpokeCount(0);
    setActiveIndex(-1);
    setHubGlow(false);
    setFadeOut(false);

    // 1) Logo rein
    setPhase("logo");
    await wait(LOGO_IN_MS);
    if (!runningRef.current) return;

    // 2) Docking nacheinander: Dock -> Linie/Label -> Pause
    setPhase("build");

    for (let i = 0; i < baseItems.length; i++) {
      setActiveIndex(i);

      await wait(MOVE_MS);
      if (!runningRef.current) return;

      setActiveIndex(-1);
      setDockedCount(i + 1);

      await wait(120);
      if (!runningRef.current) return;

      setSpokeCount(i + 1);

      await wait(LINE_MS);
      if (!runningRef.current) return;

      if (i < baseItems.length - 1) {
        await wait(BETWEEN_ICONS_MS);
        if (!runningRef.current) return;
      }
    }

    // 3) HOLD: alles bleibt stehen (3s)
    setPhase("hold");
    await wait(HOLD_BEFORE_ABSORB_MS);
    if (!runningRef.current) return;

    // 4) Absorb
    setPhase("absorb");
    await wait(ABSORB_MS);
    if (!runningRef.current) return;

    // 5) Final Glow
    setPhase("glow");
    setHubGlow(true);
    await wait(FINAL_GLOW_MS);
    if (!runningRef.current) return;

    // 6) Smooth transition (Fade) und dann next
    setFadeOut(true);
    await wait(FADE_OUT_MS);
    if (!runningRef.current) return;

    setPhase("done");
    onNext?.();
  };

  const getStatus = (index: number) => {
    if (phase === "scatter") return "scattered";
    if (phase === "logo") return "scattered";

    if (phase === "build") {
      if (index < dockedCount) return "docked";
      if (index === activeIndex) return "moving-to-dock";
      return "scattered";
    }

    // HOLD: alles bleibt gedockt, NICHT absorb
    if (phase === "hold") {
      if (index < dockedCount) return "docked";
      return "scattered";
    }

    if (phase === "absorb" || phase === "glow" || phase === "done") {
      if (index < dockedCount) return "absorbing";
      return "absorbing-from-scatter";
    }

    return "scattered";
  };

  const showLabel =
    (idx: number) =>
      idx < spokeCount && (phase === "build" || phase === "hold" || phase === "absorb" || phase === "glow" || phase === "done");

  return (
    <div className={`ob-root ${fadeOut ? "ob-fadeOut" : ""}`}>
      <div className="ob-content obM-content">
        <div className="ob-top obM-top">
          <h1 className="obM-title">
            <span className={phase === "scatter" ? "is-on" : "is-off"}>
              Gesundheitsdaten
              <br />
              sind überall verstreut
            </span>
            <span className={phase !== "scatter" ? "is-on" : "is-off"}>
              OWN verbindet
              <br />
              <strong>ALLE</strong> deine Daten
            </span>
          </h1>
        </div>

        <div className="ob-middle obM-middle">
          <div className={`obM-stage phase-${phase}`}>
            {/* HUB */}
            <div className={`obM-hub ${phase !== "scatter" ? "visible" : ""} ${hubGlow ? "hub-finalGlow" : ""}`}>
              <img className="obM-logo" src={ownLogo} alt="OWN" />
            </div>

            {/* SPOKES */}
            <div className="obM-spokes" aria-hidden="true">
              {positionedItems.map((it, idx) => (
                <div
                  key={it.key}
                  className={`obM-spoke ${idx < spokeCount ? "is-on" : ""}`}
                  style={
                    {
                      "--ang": `${it.angleDeg}deg`,
                      "--clr": it.clr,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            {/* ICONS */}
            {positionedItems.map((it, idx) => {
              const status = getStatus(idx);
              return (
                <div
                  key={it.key}
                  className={`obM-item status-${status}`}
                  style={
                    {
                      "--sx": `${it.sx}px`,
                      "--sy": `${it.sy}px`,
                      "--srot": `${it.srot}deg`,
                      "--ex": `${it.x}px`,
                      "--ey": `${it.y}px`,
                      "--clr": it.clr,
                    } as React.CSSProperties
                  }
                >
                  <div className="obM-box">
                    <it.Icon className="obM-icon" aria-hidden="true" />
                  </div>

                  {showLabel(idx) && <span className="obM-label">{it.label}</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="ob-bottom obM-bottom">

          {phase === "scatter" && (
            <button className="ob-button" onClick={startSequence}>
              Lass uns das ändern
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
