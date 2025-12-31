import { useEffect, useMemo, useRef, useState } from "react";
import "./registrationCode.css";
import { PROTOTYPE_SMS_CODE } from "./prototypeCode";

type Props = {
  phone?: string;
  onBack?: () => void;
  onVerified?: () => void;
  onResend?: () => void;
};

export default function RegistrationCode({ phone, onBack, onVerified, onResend }: Props) {
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const digits = useMemo(() => {
    const cleaned = code.replace(/\D/g, "").slice(0, 6);
    return cleaned.padEnd(6, " ").split("");
  }, [code]);

  const cleanedCode = code.replace(/\D/g, "").slice(0, 6);
  const isOk = cleanedCode.length === 6 && cleanedCode === PROTOTYPE_SMS_CODE;

  useEffect(() => {
    if (isOk) {
      const t = window.setTimeout(() => onVerified?.(), 350);
      return () => window.clearTimeout(t);
    }
  }, [isOk, onVerified]);

  return (
    <div className="oh-screen reg-bg">
      <div className="oh-safe reg-safe reg-code">
        <div className="reg-topRow">
          <button className="reg-backBtn" onClick={onBack} aria-label="Zurück">
            ‹
          </button>
          <div className="reg-topHint">Registrierung</div>
          <div style={{ width: 34 }} />
        </div>

        <h1 className="reg-title reg-titleCenter">Code eingeben</h1>

        <div className="reg-codeBoxes" onClick={() => inputRef.current?.focus()}>
          {digits.map((d, i) => (
            <div
              key={i}
              className={`reg-codeBox ${i < cleanedCode.length ? "is-filled" : ""}`}
            >
              {d.trim() ? d : ""}
            </div>
          ))}
        </div>

        {/* Hidden input to capture digits */}
        <input
          ref={inputRef}
          className="reg-codeHiddenInput"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label="SMS Code"
        />

        <div className="reg-codeHint">
          Code per SMS an <span className="reg-codePhone">{phone || "+49 ** *** ** 45"}</span> gesendet
        </div>

        {!isOk && cleanedCode.length === 6 && (
          <div className="reg-codeError">Falscher Code (Prototyp: {PROTOTYPE_SMS_CODE})</div>
        )}

        <div className="reg-codeFooter">
          <div className="reg-codeFooterTitle">Code nicht erhalten?</div>
          <button className="reg-linkInline" onClick={onResend} type="button">
            Erneut senden
          </button>
        </div>
      </div>
    </div>
  );
}
