// App.tsx - KORRIGIERT MIT TYPE-ONLY IMPORT
import { useState } from "react";
import OnboardingFlow, { type FocusKey } from "./pages/onboarding/OnboardingFlow"; // <-- type hinzufügen
import HomeFlow from "./pages/home/HomeFlow";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [age, setAge] = useState<number | null>(null);
  const [focusKey, setFocusKey] = useState<FocusKey>("longevity"); 
  const [hasSeenHomeInsight, setHasSeenHomeInsight] = useState(false);

  return isOnboarded ? (
    <HomeFlow 
      userName={userName} 
      age={age} 
      focus={focusKey} 
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