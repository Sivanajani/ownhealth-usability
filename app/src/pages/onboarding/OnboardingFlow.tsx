import { useState } from "react";
import OnboardingStart from "./OnboardingStart";
import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import Onboarding4 from "./Onboarding4";

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);

  if (step === 0) return <OnboardingStart onStart={() => setStep(1)} />;
  if (step === 1) return <Onboarding1 onNext={() => setStep(2)} />;
  if (step === 2) return <Onboarding2 onNext={() => setStep(3)} />;
  if (step === 3) return <Onboarding3 onDone={() => setStep(4)} />;
  if (step === 4) return <Onboarding4 onFinish={() => setStep(5)} />;

  return null;
}
