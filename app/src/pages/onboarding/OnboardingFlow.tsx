import { useState } from "react";
import OnboardingStart from "./OnboardingStart";
import Onboarding0 from "./Onboarding0";
import OnboardingChronic from "./OnboardingChronic";
import OnboardingLong from "./OnboardingLong";

import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import Onboarding4 from "./Onboarding4";

type FocusKey = "longevity" | "chronic";

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState<FocusKey | null>(null);

  if (step === 0) return <OnboardingStart onStart={() => setStep(1)} />;

  if (step === 1)
    return (
      <Onboarding0
        onNext={(selected) => {
          setFocus(selected);
          setStep(2);
        }}
        onBack={() => setStep(0)}
      />
    );

  if (step === 2) {
    if (focus === "longevity") return <OnboardingLong onNext={() => setStep(3)} onBack={() => setStep(1)} />;
    if (focus === "chronic") return <OnboardingChronic onNext={() => setStep(3)} onBack={() => setStep(1)} />;
    return <Onboarding0 onNext={(selected) => { setFocus(selected); setStep(2); }} onBack={() => setStep(0)} />;
  }

  // ab hier dein bestehender Flow
  if (step === 3) return <Onboarding1 onNext={() => setStep(4)} />;
  if (step === 4) return <Onboarding2 onNext={() => setStep(5)} />;
  if (step === 5) return <Onboarding3 onDone={() => setStep(6)} />;
  if (step === 6) return <Onboarding4 onFinish={() => setStep(7)} />;

  return null;
}
