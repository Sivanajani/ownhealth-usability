import { useMemo, useState } from "react";
import "../../styles/appShell.css";
import "./RegistrationOwnId.css";

import CopyIcon from "../../assets/copy.svg?react";     
import SaveIcon from "../../assets/save.svg?react";     
import CheckIcon from "../../assets/check.svg?react";   

type Props = {
  onBack?: () => void;
  onContinue?: () => void;
};

function randomOwnId() {
  const a = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4);
  const b = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 3);
  return `OWN-${a}-${b}`;
}

export default function RegistrationOwnId({ onContinue }: Props) {
  const [openInfo, setOpenInfo] = useState(false);
  const ownId = useMemo(() => randomOwnId(), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ownId);
      // optional: toast später
    } catch {
      // fallback: ignore
    }
  };

  const save = () => {
    const blob = new Blob([ownId], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `own-id-${ownId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="oi-screen">
      <div className="oi-safe">
        <div className="oi-topTitle">Deine OWN ID</div>
        <div className="oi-topSpacer" />
        

        <div className="oi-card">
          <div className="oi-id">{ownId}</div>
        </div>

        <div className="oi-hint">Bewahre sie sicher auf</div>

        <div className="oi-actions">
          <button className="oi-actionBtn" type="button" onClick={copy}>
            <span className="oi-actionIcon"><CopyIcon /></span>
            <span className="oi-actionLabel">Kopieren</span>
          </button>

          <button className="oi-actionBtn" type="button" onClick={save}>
            <span className="oi-actionIcon"><SaveIcon /></span>
            <span className="oi-actionLabel">Speichern</span>
          </button>
        </div>

        <div className="oi-warning">
          <div className="oi-warningTitle">
            Dies ist dein einziger Schlüssel <span className="oi-key">🔑</span>
          </div>
          <div className="oi-warningSub">
            Ohne ihn können auch wir dein Konto <br /> nicht wiederherstellen
          </div>
        </div>

        <button className="oi-primary" type="button" onClick={onContinue}>
          ID sichern &amp; fortfahren
        </button>

        <button className="oi-why" type="button" onClick={() => setOpenInfo(true)}>
          <span className="oi-bulb" aria-hidden="true">💡</span> Wozu?
        </button>

        {/* Overlay / Popup */}
        {openInfo && (
          <div className="oi-overlay" role="dialog" aria-modal="true" onClick={() => setOpenInfo(false)}>
            <div className="oi-modal" onClick={(e) => e.stopPropagation()}>
              <div className="oi-modalTop">
                <button className="oi-modalBack" type="button" onClick={() => setOpenInfo(false)} aria-label="Zurück">
                  ‹
                </button>
                <div className="oi-modalHeader">Was ist eine <span className="oi-link">OWN ID</span>?</div>
              </div>

              <div className="oi-modalText">
                Deine anonyme Gesundheits-ID.
                <br />
                Wie eine Kontonummer, aber für
                <br />
                deine Gesundheit.
              </div>

              <ul className="oi-modalList">
                <li><span className="oi-check"><CheckIcon /></span> Keine Werbung</li>
                <li><span className="oi-check"><CheckIcon /></span> Alles bleibt anonymisiert</li>
                <li><span className="oi-check"><CheckIcon /></span> Maximal verschlüsselt</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
