import { useEffect, useState } from "react";
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

  // jetzt null möglich (damit NICHTS vor-ausgewählt ist)
  focusKey: FocusKey | null;
  setFocusKey: (v: FocusKey) => void;
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
}: Props) {
  const [step, setStep] = useState(0);

  // Frage speichern
  const [firstQuestion, setFirstQuestion] = useState<string>("");

  // optional: falls du innerhalb des Flows mal refresh-frei den Focus “lesen” willst
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY) as FocusKey | null;
    // Wir setzen NICHT automatisch in State, damit es wirklich “frisch” bleibt,
    // aber du kannst es hier nutzen wenn du willst.
    void stored;
  }, []);

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

  // Screen 4 = Fokuswahl (dein Onboarding4)
  if (step === 5)
    return (
      <Onboarding4
        initialFocus={null} // ✅ NICHT vor-auswählen
        onContinue={(pickedFocus) => {
          setFocusKey(pickedFocus);
          setStep(6);
        }}
      />
    );

  // ------------------------------------------------------------------
  // AB HIER: Wege trennen (longevity vs chronic)
  // ------------------------------------------------------------------

  // Falls aus irgendeinem Grund kein Fokus da ist, zurück zur Auswahl
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
    // Step 6: Frage
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

    // Step 7: Apple Health verbinden
    if (step === 7)
      return <Onboarding6 onConnect={() => setStep(8)} onLater={() => setStep(8)} />;

    // Step 8: Bluttest
    if (step === 8)
      return (
        <Onboarding7
          onBack={() => setStep(7)}
          onTakePhoto={() => setStep(9)}
          onUploadPdf={() => setStep(9)}
          onSkip={() => setStep(9)}
        />
      );

    // Step 9: Medikamente
    if (step === 9)
      return (
        <Onboarding8
          onBack={() => setStep(8)}
          onTakePhoto={() => setStep(10)}
          onSkip={() => setStep(10)}
        />
      );

    // Step 10: Name/Age/Geschlecht
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

    // Step 11: Loader -> Finish
    if (step === 11)
      return <Onboarding10 onContinue={() => onFinish?.()} />;
  }

  // -------------------- Chronic Pfad --------------------
  if (focusKey === "chronic") {
    // Hier kannst du später eigene Screens einsetzen:
    // z.B. Onboarding5Chronic, Onboarding6Chronic, ...
    // Für jetzt verwende ich die bestehenden, damit es sofort läuft.

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

    if (step === 7)
      return <Onboarding6 onConnect={() => setStep(8)} onLater={() => setStep(8)} />;

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

    if (step === 11)
      return <Onboarding10 onContinue={() => onFinish?.()} />;
  }

  return null;
}
