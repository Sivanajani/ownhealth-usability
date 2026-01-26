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
  setFocusKey: (v: FocusKey | null) => void;
  firstQuestion: string;
  setFirstQuestion: (q: string) => void;
};

const STORAGE_KEY = "ownhealth_onboarding_focus";

export default function OnboardingFlow({
  onFinish,
  userName,
  age,
  setAge,
  setUserName,
  focusKey,
  setFocusKey,
  firstQuestion,
  setFirstQuestion,
}: Props) {
  const [step, setStep] = useState(0);

  // Helper: zurück zur Fokus-Wahl (Onboarding4)
  const goBackToFocus = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("ownhealth_first_question");
    setFirstQuestion("");
    setFocusKey(null);
    setStep(5);
  };

  if (step === 0) return <OnboardingStart onStart={() => setStep(1)} />;

  if (step === 1)
    return <Onboarding0 onNext={() => setStep(2)} onClose={() => setStep(0)} />;

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

  // Screen 4 = Fokuswahl
  if (step === 5)
    return (
      <Onboarding4
        initialFocus={null}
        onContinue={(pickedFocus) => {
          setFocusKey(pickedFocus);
          setStep(6);
        }}
      />
    );

  // Falls kein Fokus existiert: zurück zur Auswahl
  if (step >= 6 && !focusKey) {
    return (
      <Onboarding4
        initialFocus={null}
        onContinue={(pickedFocus) => {
          setFocusKey(pickedFocus);
          setStep(6);
        }}
      />
    );
  }

  // -------------------- Longevity Pfad --------------------
  if (focusKey === "longevity") {
    if (step === 6)
      return (
        <Onboarding5
          focusKey={focusKey}
          initialQuestion={firstQuestion}
          onBack={goBackToFocus} 
          onContinue={(q) => {
            setFirstQuestion(q);
            sessionStorage.setItem("ownhealth_first_question", q);
            setStep(7);
          }}
          onSkip={() => {
            setFirstQuestion("");
            setStep(7);
          }}
        />
      );

    if (step === 7)
      return (
        <Onboarding6
          onConnect={() => setStep(8)}
          onLater={() => setStep(8)}
        />
      );

    if (step === 8)
      return (
        <Onboarding7
          onBack={() => setStep(7)}
          onTakePhoto={() => setStep(9)}
          onUploadPdf={() => setStep(9)}
          onSkip={() => setStep(9)}
        />
      );

    if (step === 9)
      return (
        <Onboarding8
          focusKey={focusKey}
          onBack={() => setStep(8)}
          onTakePhoto={() => setStep(10)}
          onSkip={() => setStep(10)}
        />
      );

    if (step === 10)
      return (
        <Onboarding9
          name={userName}
          onNameChange={setUserName}
          age={age}
          onAgeChange={setAge}
          onBack={() => setStep(9)}
          onFinish={() => setStep(11)}
        />
      );

    if (step === 11) return <Onboarding10 focusKey={focusKey} onContinue={() => onFinish?.()} />;
  }

  // -------------------- Chronic Pfad --------------------
  if (focusKey === "chronic") {
    if (step === 6)
      return (
        <Onboarding5
          focusKey={focusKey}
          initialQuestion={firstQuestion}
          onBack={goBackToFocus} 
          onContinue={(q) => {
            setFirstQuestion(q);
            sessionStorage.setItem("ownhealth_first_question", q);
            setStep(7);
          }}
          onSkip={() => {
            setFirstQuestion("");
            setStep(7);
          }}
        />
      );

    if (step === 7)
      return (
        <Onboarding6
          onConnect={() => setStep(8)}
          onLater={() => setStep(8)}
        />
      );

    if (step === 8)
      return (
        <Onboarding7
          onBack={() => setStep(7)}
          onTakePhoto={() => setStep(9)}
          onUploadPdf={() => setStep(9)}
          onSkip={() => setStep(9)}
        />
      );

    if (step === 9)
      return (
        <Onboarding8                  
          focusKey={focusKey}
          onBack={() => setStep(8)}
          onTakePhoto={() => setStep(10)}
          onSkip={() => setStep(10)}
        />
      );

    if (step === 10)
      return (
        <Onboarding9
          name={userName}
          onNameChange={setUserName}
          age={age}
          onAgeChange={setAge}
          onBack={() => setStep(9)}
          onFinish={() => setStep(11)}
        />
      );

    if (step === 11) return <Onboarding10 focusKey={focusKey} onContinue={() => onFinish?.()} />;

  }

  return null;
}
