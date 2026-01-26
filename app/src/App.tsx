import { useEffect, useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";
import type { FocusKey } from "./types/focus";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [focusKey, setFocusKey] = useState<FocusKey | null>(null);
  const [firstQuestion, setFirstQuestion] = useState("");
  const [hasSeenHomeInsight, setHasSeenHomeInsight] = useState(false);

  useEffect(() => {
    // ✅ bei JEDEM Reload: ALLES löschen
    sessionStorage.clear();
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
      setFocusKey={setFocusKey}
      firstQuestion={firstQuestion}
      setFirstQuestion={setFirstQuestion}
    />
  );
}