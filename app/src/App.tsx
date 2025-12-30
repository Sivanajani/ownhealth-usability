import { useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState<string>("");

  return isOnboarded ? (
    <HomeFlow userName={userName} />
  ) : (
    <OnboardingFlow
      onFinish={() => setIsOnboarded(true)}
      userName={userName}
      setUserName={setUserName}
    />
  );
}