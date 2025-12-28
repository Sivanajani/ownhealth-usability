import { useEffect, useMemo, useState } from "react";
import "./onboardingStart.css";
import "./onboardingDone.css";

type Props = {
  onContinue?: () => void;
};

type StepKey = "sync" | "secure" | "focus";

export default function Onboarding4({ onContinue }: Props) {
  const timeline = useMemo(
    () => ({
      step1: 6500,
      step2: 11000,
      step3: 15500,
      done: 18500,
      total: 20000,
    }),
    []
  );

  const [checked, setChecked] = useState<Record<StepKey, boolean>>({
    sync: false,
    secure: false,
    focus: false,
  });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setChecked((s) => ({ ...s, sync: true })), timeline.step1);
    const t2 = window.setTimeout(() => setChecked((s) => ({ ...s, secure: true })), timeline.step2);
    const t3 = window.setTimeout(() => setChecked((s) => ({ ...s, focus: true })), timeline.step3);
    const td = window.setTimeout(() => setIsDone(true), timeline.done);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(td);
    };
  }, [timeline]);

  const canContinue = isDone;

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

          {isDone ? (
            <>
              <h1 className="ob-title">Du bist startklar.</h1>
              <p className="ob-subtitle">Dein Konto ist sicher eingerichtet.</p>
            </>
          ) : (
            <>
              <h1 className="ob-title">Wir richten dein Gesundheitskonto ein.</h1>
              <p className="ob-subtitle">
                Das dauert nur einen Moment – gleich hast du
                <br />
                deine ersten personalisierten Insights.
              </p>
            </>
          )}
        </div>

        {/* Card */}
        <div className="obdone-card">
          <Row icon="⟳" iconClass="is-blue" label="Daten-Sync aktiv" checked={checked.sync} />
          <Row icon="🔒" iconClass="is-blue" label="Sicher verschlüsselt" checked={checked.secure} />
          <Row icon="⚡" iconClass="is-yellow" label={"Fokus: Performance &\nOptimierung"} checked={checked.focus} />
        </div>

        {/* Bottom */}
        <div className="ob-cta">
          <button
            className={`ob-button ${!canContinue ? "obdone-buttonDisabled" : ""}`}
            disabled={!canContinue}
            onClick={onContinue}
          >
            Weiter zum Konto
          </button>

          <p className="ob-hint"></p>

          {!isDone && <p className="ob-hint">Bitte warte kurz…</p>}
        </div>
      </div>
    </div>
  );
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

      <div className="obdone-label">{label}</div>

      <div className={`obdone-status ${checked ? "is-checked" : ""}`} aria-hidden="true">
        <span className="obdone-tick">✓</span>
      </div>
    </div>
  );
}
