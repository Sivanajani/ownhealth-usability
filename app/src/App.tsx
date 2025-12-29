import { useState } from "react";
import OnboardingFlow from "./pages/onboarding/OnboardingFlow";
import HomeFlow from "./pages/home/HomeFlow";

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return isOnboarded ? (
    <HomeFlow />
  ) : (
    <OnboardingFlow onFinish={() => setIsOnboarded(true)} />
  );
}
