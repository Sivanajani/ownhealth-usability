// src/pages/registration/RegisterFlow.tsx
import { useState } from "react";

import Registration1 from "./registration1";
import RegistrationPrivacy from "./RegistrationPrivacy";
import RegistrationPhone from "./RegistrationPhone";
import RegistrationCode from "./RegistrationCode";
import RegistrationOwnId from "./RegistrationOwnId";
import RegistrationFaceId from "./RegistrationFaceId";

type RegisterStep = "r1" | "privacy" | "phone" | "code" | "ownid" | "faceid";

type Props = {
  onBackToProfile?: () => void;   // damit HomeFlow wieder zurück kann
  onDone?: () => void;           // optional: wenn fertig, zurück wohin du willst
};

export default function RegisterFlow({ onBackToProfile, onDone }: Props) {
  const [step, setStep] = useState<RegisterStep>("r1");
  const [phone, setPhone] = useState<string>("");

  // 1) dein bestehender Screen (Registration1) -> weiter zu privacy
  if (step === "r1")
    return (
      <Registration1
        onBack={onBackToProfile}
        onNext={() => setStep("privacy")}   // WICHTIG: Registration1 braucht onNext (siehe unten)
      />
    );

  // 2) Privacy -> weiter zu phone
  if (step === "privacy")
    return <RegistrationPrivacy onCreate={() => setStep("phone")} />;

  // 3) Phone -> weiter zu code (phone merken)
  if (step === "phone")
    return (
      <RegistrationPhone
        onBack={() => setStep("privacy")}
        onNext={(p) => {
          setPhone(p);
          setStep("code");
        }}
      />
    );

  // 4) Code (Prototyp: 123456) -> weiter zu ownid
  if (step === "code")
    return (
      <RegistrationCode
        phone={phone}
        onBack={() => setStep("phone")}
        onVerified={() => setStep("ownid")}
        onResend={() => {
          // prototype: optional toast/später
        }}
      />
    );

  // 5) Own ID -> weiter zu faceid
  if (step === "ownid")
    return (
      <RegistrationOwnId
        onBack={() => setStep("code")}
        onContinue={() => setStep("faceid")}
      />
    );

  // 6) FaceID -> done (oder skip)
  if (step === "faceid")
    return (
      <RegistrationFaceId
        onBack={() => setStep("ownid")}
        onActivate={() => onDone?.()}
        onSkip={() => onDone?.()}
      />
    );

  return null;
}
