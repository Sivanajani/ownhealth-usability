import { useState } from "react";

import Registration1 from "./registration1";
import RegistrationPrivacy from "./RegistrationPrivacy";
import RegistrationPhone from "./RegistrationPhone";
import RegistrationCode from "./RegistrationCode";
import RegistrationOwnId from "./RegistrationOwnId";
import RegistrationFaceId from "./RegistrationFaceId";

type RegisterStep = "r1" | "privacy" | "phone" | "code" | "ownid" | "faceid";

type Props = {
  onBackToProfile?: () => void;
  onDone?: () => void;
};

export default function RegisterFlow({ onBackToProfile, onDone }: Props) {
  const [step, setStep] = useState<RegisterStep>("r1");
  const [phone, setPhone] = useState<string>("");

  if (step === "r1")
    return (
      <Registration1
        onBack={onBackToProfile}
        onNext={() => setStep("privacy")}
      />
    );

  if (step === "privacy")
    return (
      <RegistrationPrivacy
        onBack={() => setStep("r1")}
        onCreate={() => setStep("phone")}
      />
    );

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

  if (step === "ownid")
    return (
      <RegistrationOwnId
        onBack={() => setStep("code")}
        onContinue={() => setStep("faceid")}
      />
    );

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
