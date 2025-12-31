import { useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";

export type FocusKey = "longevity" | "chronic";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [focus, setFocus] = useState<FocusKey>("longevity"); 

  return isOnboarded ? (
    <HomeFlow userName={userName} focus={focus} /> 
  ) : (
    <OnboardingFlow
      onFinish={() => setIsOnboarded(true)}
      userName={userName}
      setUserName={setUserName}
      onFocus={setFocus} 
    />
  );
}
