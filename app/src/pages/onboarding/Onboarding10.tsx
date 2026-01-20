import { useEffect, useMemo, useState } from "react";
import "./onboardingStart.css";
import "./onboardingDone.css";

type Props = {
  onContinue?: () => void;
};

type StepKey = "sync" | "secure" | "focus";

// für den wechselnden Status-Text oben
type Phase =
  | "syncing"
  | "syncActive"
  | "encrypting"
  | "encrypted"
  | "focus"
  | "done";

export default function Onboarding10({ onContinue }: Props) {
  // ca. 15 Sekunden gesamt
  const timeline = useMemo(
    () => ({
      // Texte/Phasen
      syncing: 800,        // "Daten werden synchronisiert…"
      syncActive: 4200,    // "Sync ist aktiv"
      encrypting: 6800,    // "Daten werden sicher verschlüsselt…"
      encrypted: 9800,     // "Sicher verschlüsselt"
      focus: 12400,        // "Fokus auf Performance & Optimierung"
      done: 14800,         // Spinner fertig + Check
      autoGo: 15300,       // automatisch weiter
      total: 15300,
    }),
    []
  );

  const [checked, setChecked] = useState<Record<StepKey, boolean>>({
    sync: false,
    secure: false,
    focus: false,
  });

  const [phase, setPhase] = useState<Phase>("syncing");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    // Startphase
    timers.push(
      window.setTimeout(() => setPhase("syncing"), timeline.syncing)
    );

    // Sync aktiv + check
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

    // Sicher verschlüsselt + check
    timers.push(
      window.setTimeout(() => {
        setPhase("encrypted");
        setChecked((s) => ({ ...s, secure: true }));
      }, timeline.encrypted)
    );

    // Fokus + check
    timers.push(
      window.setTimeout(() => {
        setPhase("focus");
        setChecked((s) => ({ ...s, focus: true }));
      }, timeline.focus)
    );

    // Done (Spinner -> Check)
    timers.push(
      window.setTimeout(() => {
        setPhase("done");
        setIsDone(true);
      }, timeline.done)
    );

    // automatisch weiter
    timers.push(
      window.setTimeout(() => {
        onContinue?.();
      }, timeline.autoGo)
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [timeline, onContinue]);

  const statusText = getStatusText(phase);

  return (
    <div className="ob-root">
      <div className="ob-content obdone-content">
        {/* Top */}
        <div className="obdone-top">
          <div className={`obdone-spinner ${isDone ? "is-done" : ""}`} aria-hidden="true">
            <div className="obdone-ring" />
            <div className="obdone-inner">
              <span className={`obdone-check ${isDone ? "show" : ""}`}>✓</span>
            </div>
          </div>

          {/* Headline bleibt ruhig, nur Subline wechselt */}
          {isDone ? (
            <>
              <h1 className="ob-title">Du bist startklar.</h1>
              <p className="ob-subtitle">Dein Konto ist sicher eingerichtet.</p>
            </>
          ) : (
            <>
              <h1 className="ob-title">Wir richten dein Gesundheitskonto ein.</h1>
              <p className="ob-subtitle">{statusText}</p>
            </>
          )}
        </div>

        {/* Card */}
        <div className="obdone-card">
          <Row
            icon="⟳"
            iconClass="is-blue"
            label={checked.sync ? "Sync ist aktiv" : "Daten werden synchronisiert…"}
            checked={checked.sync}
          />
          <Row
            icon="🔒"
            iconClass="is-blue"
            label={checked.secure ? "Sicher verschlüsselt" : "Daten werden sicher verschlüsselt…"}
            checked={checked.secure}
          />
          <Row
            icon="⚡"
            iconClass="is-yellow"
            label={"Fokus: Performance &\nOptimierung"}
            checked={checked.focus}
          />
        </div>

        {/* Bottom: kein Button mehr */}
        {!isDone && <p className="ob-hint">Bitte warte kurz…</p>}
      </div>
    </div>
  );
}

function getStatusText(phase: Phase): React.ReactNode {
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
          Fokus auf Performance & Optimierung.
          <br />
          Gleich geht’s weiter.
        </>
      );
    case "done":
      return null;
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
  icon: string;
  label: string;
  checked: boolean;
  iconClass?: string;
}) {
  return (
    <div className="obdone-row">
      <div className={`obdone-icon ${iconClass ?? ""}`} aria-hidden="true">
        <span>{icon}</span>
      </div>

      <div className="obdone-label" style={{ whiteSpace: "pre-line" }}>
        {label}
      </div>

      <div className={`obdone-status ${checked ? "is-checked" : ""}`} aria-hidden="true">
        <span className="obdone-tick">✓</span>
      </div>
    </div>
  );
}
