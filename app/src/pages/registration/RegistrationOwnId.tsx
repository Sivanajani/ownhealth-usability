import { useMemo, useState } from "react";
import "./registrationOwnId.css";

type Props = {
  onBack?: () => void;
  onContinue?: () => void;
};

function makeOwnId() {
  // Prototyp: stable-ish random, aber du kannst es auch fix machen
  const part = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  return `OWN-${part}X29-MP4`;
}

export default function RegistrationOwnId({ onBack, onContinue }: Props) {
  const ownId = useMemo(() => makeOwnId(), []);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(ownId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore in prototype
    }
  }

  return (
    <div className="oh-screen reg-bg">
      <div className="oh-safe reg-safe reg-ownid">
        <div className="reg-topRow">
          <button className="reg-backBtn" onClick={onBack} aria-label="Zurück">
            ‹
          </button>
          <div className="reg-topHint">Registrierung</div>
          <div style={{ width: 34 }} />
        </div>

        <h1 className="reg-title reg-titleCenter">Deine OWN ID</h1>

        <div className="ownid-card">
          <div className="ownid-gradient">
            <div className="ownid-value">{ownId}</div>
          </div>

          <div className="ownid-sub">Bewahre sie sicher auf</div>

          <div className="ownid-actions">
            <button className="ownid-miniBtn" onClick={copy} type="button">
              Kopieren
            </button>
            <button className="ownid-miniBtn" type="button">
              Speichern
            </button>
          </div>

          {copied && <div className="ownid-toast">Kopiert ✅</div>}
        </div>

        <div className="ownid-warn">
          <span className="ownid-warnRed">Dies ist dein einziger Schlüssel.</span>
          <br />
          Ohne ihn können auch wir dein Konto nicht wiederherstellen.
        </div>

        <button className="reg-primaryBtn" onClick={onContinue}>
          ID sichern &amp; fortfahren
        </button>

        <button className="reg-linkBtn" type="button">
          Wozu?
        </button>
      </div>
    </div>
  );
}
