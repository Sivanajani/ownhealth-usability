import { useEffect, useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";
import type { FocusKey } from "./types/focus";

const STORAGE_KEY = "ownhealth_onboarding_focus";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [focusKey, setFocusKey] = useState<FocusKey | null>(null);
  const [firstQuestion, setFirstQuestion] = useState<string>("");
  const [hasSeenHomeInsight, setHasSeenHomeInsight] = useState(false);

  useEffect(() => {

      const stored = sessionStorage.getItem("ownhealth_first_question");
  if (stored) {
    setFirstQuestion(stored);
  }
    
    const clearTemp = () => {
      sessionStorage.removeItem(STORAGE_KEY);
    };
    window.addEventListener("beforeunload", clearTemp);

    return () => {
      window.removeEventListener("beforeunload", clearTemp);
    };
  }, []);

  return isOnboarded ? (
    <HomeFlow
      userName={userName}
      firstQuestion={firstQuestion}
      hasSeenHomeInsight={hasSeenHomeInsight}
      onSeenHomeInsight={() => setHasSeenHomeInsight(true)}
    />
  ) : (
    <OnboardingFlow
      onFinish={() => setIsOnboarded(true)}
      userName={userName}
      setUserName={setUserName}
      age={age}
      setAge={setAge}
      focusKey={focusKey}
      setFocusKey={(v) => setFocusKey(v)}
      firstQuestion={firstQuestion}
      setFirstQuestion={setFirstQuestion}
    />
  );
}
