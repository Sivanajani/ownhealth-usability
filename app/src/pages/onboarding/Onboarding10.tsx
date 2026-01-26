import { useEffect, useMemo, useState, type ReactNode } from "react";
import "./onboardingStart.css";
import "./onboardingDone.css";
import type { FocusKey } from "../../types/focus";

import RefreshIcon from "../../assets/refresh.svg?react";
import LockIcon from "../../assets/lock.svg?react";
import BlitzIcon from "../../assets/blitz.svg?react";
import ChatIcon from "../../assets/chat.svg?react";

type Props = {
  focusKey: FocusKey;
  onContinue?: () => void;
};

type StepKey = "sync" | "secure" | "focus" | "answer";

type Phase =
  | "syncing"
  | "syncActive"
  | "encrypting"
  | "encrypted"
  | "focus"
  | "answer"
  | "done";

export default function Onboarding10({ focusKey, onContinue }: Props) {
  console.log("Onboarding10 focusKey =", focusKey);

  const timeline = useMemo(
    () => ({
      syncing: 400,
      syncActive: 1800,
      encrypting: 2800,
      encrypted: 4200,
      focus: 5600,
      answer: 7200,
      done: 9000,
      total: 9000,
    }),
    []
  );

  const [checked, setChecked] = useState<Record<StepKey, boolean>>({
    sync: false,
    secure: false,
    focus: false,
    answer: false,
  });

  const [phase, setPhase] = useState<Phase>("syncing");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    // Start
    timers.push(window.setTimeout(() => setPhase("syncing"), timeline.syncing));

    // Sync aktiv + Check
    timers.push(
      window.setTimeout(() => {
        setPhase("syncActive");
        setChecked((s) => ({ ...s, sync: true }));
      }, timeline.syncActive)
    );

    // Verschlüsselung läuft
    timers.push(
      window.setTimeout(() => setPhase("encrypting"), timeline.encrypting)
    );

    // Sicher verschlüsselt + Check
    timers.push(
      window.setTimeout(() => {
        setPhase("encrypted");
        setChecked((s) => ({ ...s, secure: true }));
      }, timeline.encrypted)
    );

    // Fokus + Check
    timers.push(
      window.setTimeout(() => {
        setPhase("focus");
        setChecked((s) => ({ ...s, focus: true }));
      }, timeline.focus)
    );

    // Antwort + Check
    timers.push(
      window.setTimeout(() => {
        setPhase("answer");
        setChecked((s) => ({ ...s, answer: true }));
      }, timeline.answer)
    );

    // ✅ DONE + automatisch weiter (NUR EIN TIMER)
    timers.push(
      window.setTimeout(() => {
        setPhase("done");
        setIsDone(true);
        onContinue?.();
      }, timeline.done)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [timeline, onContinue]);

  // ✅ richtige Zuordnung
  const focusLabel =
    focusKey === "longevity"
      ? "Fokus: Performance &\nLongevity"
      : "Fokus: Gesundheit verstehen";

  return (
    <div className="ob-root">
      <div className="ob-content obdone-content">
        {/* Top */}
        <div className="obdone-top">
          <div
            className={`obdone-spinner ${isDone ? "is-done" : ""}`}
            aria-hidden="true"
          >
            <div className="obdone-ring" />
            <div className="obdone-inner">
              <span className={`obdone-check ${isDone ? "show" : ""}`}>✓</span>
            </div>
          </div>

          {isDone ? (
            <>
              <h1 className="ob-title">Du bist startklar.</h1>
              <p className="ob-subtitle">Dein Konto ist sicher eingerichtet.</p>
            </>
          ) : (
            <>
              <h1 className="ob-title">Wir richten dein Gesundheitskonto ein.</h1>
              <p className="ob-subtitle">{getStatusText(phase, focusKey)}</p>
            </>
          )}
        </div>

        {/* Card */}
        <div className="obdone-card">
          <Row
            icon={<RefreshIcon className="obdone-svg" />}
            iconClass="is-blue"
            label={checked.sync ? "Daten-Sync aktiv" : "Daten werden synchronisiert…"}
            checked={checked.sync}
          />
          <Row
            icon={<LockIcon className="obdone-svg" />}
            iconClass="is-blue"
            label={
              checked.secure
                ? "Sicher verschlüsselt"
                : "Daten werden sicher verschlüsselt…"
            }
            checked={checked.secure}
          />
          <Row
            icon={<BlitzIcon className="obdone-svg" />}
            iconClass="is-yellow"
            label={focusLabel}
            checked={checked.focus}
          />
          <Row
            icon={<ChatIcon className="obdone-svg" />}
            iconClass="is-blue"
            label={
              checked.answer
                ? "Antwort auf deine Frage\nwird verarbeitet"
                : "Antwort wird vorbereitet…"
            }
            checked={checked.answer}
          />
        </div>
      </div>
    </div>
  );
}

function getStatusText(phase: Phase, focusKey: FocusKey): React.ReactNode {
  const focusLine =
    focusKey === "longevity"
      ? "Fokus: Performance & Longevity."
      : "Fokus: Gesundheit verstehen.";

  switch (phase) {
    case "syncing":
      return (
        <>
          Daten werden synchronisiert…
          <br />
          Bitte kurz warten.
        </>
      );
    case "syncActive":
      return (
        <>
          Sync ist aktiv.
          <br />
          Wir prüfen deine Datenquellen.
        </>
      );
    case "encrypting":
      return (
        <>
          Daten werden sicher verschlüsselt…
          <br />
          Das dauert nur einen Moment.
        </>
      );
    case "encrypted":
      return (
        <>
          Sicher verschlüsselt.
          <br />
          Wir bereiten deine Insights vor.
        </>
      );
    case "focus":
      return (
        <>
          {focusLine}
          <br />
          Gleich geht’s weiter.
        </>
      );
    case "answer":
      return (
        <>
          Wir verarbeiten deine Frage.
          <br />
          Du bekommst gleich deine Antwort.
        </>
      );
    case "done":
    default:
      return null;
  }
}

function Row({
  icon,
  label,
  checked,
  iconClass,
}: {
  icon: ReactNode;
  label: string;
  checked: boolean;
  iconClass?: string;
}) {
  return (
    <div className="obdone-row">
      <div className={`obdone-icon ${iconClass ?? ""}`} aria-hidden="true">
        {icon}
      </div>

      <div className="obdone-label" style={{ whiteSpace: "pre-line" }}>
        {label}
      </div>

      <div
        className={`obdone-status ${checked ? "is-checked" : ""}`}
        aria-hidden="true"
      >
        <span className="obdone-tick">✓</span>
      </div>
    </div>
  );
}
