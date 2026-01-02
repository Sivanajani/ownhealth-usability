import { useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";

export type FocusKey = "longevity" | "chronic";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [focus, setFocus] = useState<FocusKey>("longevity"); 
  const [hasSeenHomeInsight, setHasSeenHomeInsight] = useState(false);

  return isOnboarded ? (
    <HomeFlow 
      userName={userName} 
      age={age} 
      focus={focus} 
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
      onFocus={setFocus} 
    />
  );
}
