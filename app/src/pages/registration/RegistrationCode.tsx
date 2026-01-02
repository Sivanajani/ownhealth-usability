import { useMemo, useRef, useState } from "react";
import "../../styles/appShell.css";
import "./RegistrationCode.css";

type Props = {
  phone: string;                 
  onBack?: () => void;
  onVerified?: (code: string) => void; 
  onResend?: () => void;
};

function maskPhone(phone: string) {
  // sehr einfache Maskierung: +49******45
  const p = phone.trim();
  if (p.length <= 4) return p;
  const prefix = p.slice(0, 3);         
  const last2 = p.slice(-2);            
  return `${prefix} •••••• ${last2}`;
}

export default function RegistrationCode({
  phone,
  onBack,
  onVerified,
  onResend,
}: Props) {
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const masked = useMemo(() => maskPhone(phone), [phone]);
  const digits = Array.from({ length: 6 }, (_, i) => code[i] ?? "");

  const setAndMaybeVerify = (next: string) => {
    const clean = next.replace(/\D/g, "").slice(0, 6);
    setCode(clean);
    if (clean.length === 6) onVerified?.(clean);
  };

  return (
    <div className="rc-screen" onClick={() => inputRef.current?.focus()}>
      <div className="rc-safe">
        <button className="rc-back" type="button" onClick={onBack} aria-label="Zurück">
          ‹
        </button>

        <div className="rc-title">Code eingeben</div>

        <div className="rc-boxRow" aria-label="SMS Code">
          {digits.map((d, i) => (
            <div
              key={i}
              className={`rc-box ${d ? "rc-box--filled" : ""}`}
              aria-hidden="true"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Hidden but focusable input */}
        <input
          ref={inputRef}
          className="rc-hiddenInput"
          type="tel"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setAndMaybeVerify(e.target.value)}
          onKeyDown={(e) => {
            // Backspace support is native, but keep this for safety
            if (e.key === "Backspace" && code.length === 0) {
              // nothing
            }
          }}
        />

        <div className="rc-info">
          <div className="rc-infoTop">Code per SMS an</div>
          <div className="rc-infoPhone">{masked} gesendet</div>
        </div>

        <div className="rc-bottom">
          <div className="rc-miss">Code nicht erhalten?</div>
          <button className="rc-resend" type="button" onClick={onResend}>
            Erneut senden
          </button>
        </div>
      </div>
    </div>
  );
}
