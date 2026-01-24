import { useState } from "react";
import OnboardingStart from "./OnboardingStart";
import Onboarding0 from "./Onboarding0";
import Onboarding1 from "./Onboarding1";
import Onboarding2 from "./Onboarding2";
import Onboarding3 from "./Onboarding3";
import Onboarding4 from "./Onboarding4";
import Onboarding5 from "./Onboarding5";
import Onboarding6 from "./Onboarding6";
import Onboarding7 from "./Onboarding7";
import Onboarding8 from "./Onboarding8";
import Onboarding9 from "./Onboarding9"; 
import Onboarding10 from "./Onboarding10"; 
import type { FocusKey } from "../../types/focus";

type Props = {
  onFinish?: () => void;
  userName: string;
  setUserName: (v: string) => void;
  age: number | null;
  setAge: (v: number | null) => void;
  focusKey: FocusKey | null;
  setFocusKey: (v: FocusKey) => void;
};

export default function OnboardingFlow({
  onFinish,
  userName,
  age,
  setAge,
  setUserName,
  focusKey,
  setFocusKey,
}: Props) {
  const [step, setStep] = useState(0);

  // Frage speichern
  const [firstQuestion, setFirstQuestion] = useState<string>("");

  if (step === 0) return <OnboardingStart onStart={() => setStep(1)} />;
  if (step === 1) return <Onboarding0 onNext={() => setStep(2)} onClose={() => setStep(0)} />;
  if (step === 2) return <Onboarding1 onNext={() => setStep(3)} />;
  if (step === 3) return <Onboarding2 onNext={() => setStep(4)} />;

  if (step === 4)
    return (
      <Onboarding3
        name={userName}
        onNameChange={setUserName}
        age={age}
        onAgeChange={setAge}
        onFinish={() => setStep(5)}
      />
    );

  if (step === 5)
    return (
      <Onboarding4
        initialFocus={focusKey}
        onContinue={(pickedFocus) => {
          setFocusKey(pickedFocus);
          setStep(6);
        }}
      />
    );

  // Step 6: Frage (Onboarding5)
  if (step === 6)
    return (
      <Onboarding5
        initialQuestion={firstQuestion}
        onContinue={(q) => {
          setFirstQuestion(q);
          setStep(7);
        }}
        onSkip={() => {
          setFirstQuestion("");
          setStep(7);
        }}
      />
    );

  // Step 7: Apple Health verbinden (Onboarding6)
  if (step === 7)
    return (
      <Onboarding6
        onConnect={() => setStep(8)}
        onLater={() => setStep(8)}
      />
    );

  // Step 8: Bluttest scannen (Onboarding7) -> danach Step 9
  if (step === 8)
    return (
      <Onboarding7
        onBack={() => setStep(7)}
        onTakePhoto={() => setStep(9)}
        onUploadPdf={() => setStep(9)}
        onSkip={() => setStep(9)}
      />
    );

  // Step 9: Medikamente Screen (Onboarding8) -> danach Step 10 (Onboarding9)
  if (step === 9)
    return (
      <Onboarding8
        onBack={() => setStep(8)}
        onTakePhoto={() => setStep(10)} 
        onSkip={() => setStep(10)} 
      />
    );

  // Step 10: Onboarding9 (Name/Age/Geschlecht Screen) -> Step 11 (Onboarding10)
  if (step === 10)
    return (
      <Onboarding9
        name={userName}
        onNameChange={setUserName}
        age={age}
        onAgeChange={setAge}
        onBack={() => setStep(9)}
        onFinish={() => setStep(11)} // GEÄNDERT: zu Step 11 (Onboarding10)
      />
    );

  // Step 11: Onboarding10 (Lade-Animation) -> dann onFinish
  if (step === 11)
    return (
      <Onboarding10
        onContinue={() => onFinish?.()} // Nach Animation direkt zum Finish
      />
    );

  return null;
}