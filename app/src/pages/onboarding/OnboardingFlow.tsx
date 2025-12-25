import { useState } from "react";
import OnboardingStart from "./OnboardingStart";
import Onboarding1 from "./Onboarding1";

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return <OnboardingStart onStart={() => setStep(1)} />;
  }

  if (step === 1) {
    return <Onboarding1 />;
  }

  return null;
}
