import { useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";
import type { FocusKey } from "./types/focus";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);

  // Default passend zu FocusKey = "longevity" | "chronic"
  const [focusKey, setFocusKey] = useState<FocusKey>("longevity");

  const [hasSeenHomeInsight, setHasSeenHomeInsight] = useState(false);

  return isOnboarded ? (
    <HomeFlow
      userName={userName}            
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
    />
  );
}
