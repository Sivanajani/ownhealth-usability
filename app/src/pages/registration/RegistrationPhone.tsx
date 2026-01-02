import { useMemo, useState } from "react";
import "../../styles/appShell.css";
import "./RegistrationPhone.css";

import LockIcon from "../../assets/lock.svg?react";
import CheckIcon from "../../assets/check.svg?react";

type Country = { code: string; dial: string; label: string; flag: string };

const COUNTRIES: Country[] = [
  { code: "DE", dial: "+49", label: "Deutschland", flag: "🇩🇪" },
  { code: "CH", dial: "+41", label: "Schweiz", flag: "🇨🇭" },
  { code: "AT", dial: "+43", label: "Österreich", flag: "🇦🇹" },
  { code: "FR", dial: "+33", label: "Frankreich", flag: "🇫🇷" },
  { code: "IT", dial: "+39", label: "Italien", flag: "🇮🇹" },
];

type Props = {
  onNext?: (fullPhone: string) => void;
  onBack?: () => void;
};

export default function RegistrationPhone({ onNext }: Props) {
  const [countryCode, setCountryCode] = useState("DE");
  const [number, setNumber] = useState("");
  const [openWhy, setOpenWhy] = useState(false);

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode]
  );

  const fullPhone = `${country.dial}${number.replace(/\s+/g, "")}`;
  const isValid = number.trim().length > 0;

  return (
    <div className="rp2-screen">
      <div className="rp2-safe">
        <h1 className="rp2-title">
          Sicher wie dein
          <br />
          Online-Banking.
        </h1>

        <p className="rp2-sub">
          Zur Verifizierung brauchen
          <br />
          wir deine Handynummer.
        </p>

        <div className="rp2-phoneRow">
          <label className="rp2-prefix" aria-label="Ländervorwahl">
            <span className="rp2-flag" aria-hidden="true">
              {country.flag}
            </span>

            <select
              className="rp2-select"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label} {c.dial}
                </option>
              ))}
            </select>

            <span className="rp2-dial">{country.dial}</span>
            <span className="rp2-caret" aria-hidden="true">
              ▾
            </span>
          </label>

          <input
            className="rp2-input rp2-input--number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Handynummer eingeben"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="rp2-note">
          <span className="rp2-noteIcon" aria-hidden="true">
            <LockIcon />
          </span>
          <span>Einmalig per SMS bestätigt</span>
        </div>

        <div className="rp2-spacer" />

        <button
          className={`rp2-btn ${!isValid ? "rp2-btn--disabled" : ""}`}
          type="button"
          disabled={!isValid}
          onClick={() => isValid && onNext?.(fullPhone)}
        >
          Nummer bestätigen
        </button>

        <button className="rp2-why" type="button" onClick={() => setOpenWhy(true)}>
          <span className="rp2-bulb" aria-hidden="true">💡</span>
          Warum?
        </button>

        {/* WHY Overlay (wie bei OWN ID) */}
        {openWhy && (
          <div
            className="rp2-overlay"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpenWhy(false)}
          >
            <div className="rp2-modal" onClick={(e) => e.stopPropagation()}>
              <div className="rp2-modalTop">
                <button
                  className="rp2-modalBack"
                  type="button"
                  onClick={() => setOpenWhy(false)}
                  aria-label="Schließen"
                >
                  ‹
                </button>
                <div className="rp2-modalHeader">Warum brauchen wir deine Nummer?</div>
              </div>

              <div className="rp2-modalText">
                Nur zur einmaligen Verifizierung per SMS — damit niemand dein Konto übernehmen kann.
              </div>

              <ul className="rp2-modalList">
                <li><span className="rp2-check"><CheckIcon /></span> Nur Sicherheits-Check (SMS)</li>
                <li><span className="rp2-check"><CheckIcon /></span> Keine Werbung, keine Anrufe</li>
                <li><span className="rp2-check"><CheckIcon /></span> Nicht an Dritte weitergegeben</li>                
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
