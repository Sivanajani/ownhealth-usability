import { useMemo, useState } from "react";
import "./registrationPhone.css";

import LockIcon from "../../assets/lock.svg?react";
import CheckIcon from "../../assets/check.svg?react";

type Props = {
  onBack?: () => void;
  onNext?: (phone: string) => void;
};

export default function RegistrationPhone({ onBack, onNext }: Props) {
  const [phone, setPhone] = useState("");

  const isValid = useMemo(() => {
    const cleaned = phone.replace(/[^\d+]/g, "");
    return cleaned.length >= 8; // prototypisch "ok"
  }, [phone]);

  return (
    <div className="oh-screen reg-bg">
      <div className="oh-safe reg-safe reg-phone">
        <div className="reg-topRow">
          <button className="reg-backBtn" onClick={onBack} aria-label="Zurück">
            ‹
          </button>
          <div className="reg-topHint">Registrierung</div>
          <div style={{ width: 34 }} />
        </div>

        <h1 className="reg-title">
          Sicher wie dein <br /> Online-Banking.
        </h1>

        <p className="reg-lead">
          Zur Verifizierung brauchen wir deine Handynummer.
        </p>

        <div className="reg-inputCard">
          <label className="reg-label">+49 Handynummer eingeben</label>
          <div className="reg-inputRow">
            <input
              className="reg-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              placeholder="+49 170 123 45 67"
            />
            <span className="reg-inputIcon" aria-hidden="true">
              <LockIcon />
            </span>
          </div>

          <div className="reg-inlineOk">
            <span className="reg-inlineOkIcon">
              <CheckIcon />
            </span>
            Einmalig per SMS bestätigt
          </div>
        </div>

        <button
          className="reg-primaryBtn"
          disabled={!isValid}
          onClick={() => onNext?.(phone)}
        >
          Nummer bestätigen
        </button>

        <button className="reg-linkBtn" type="button">
          Warum?
        </button>
      </div>
    </div>
  );
}
