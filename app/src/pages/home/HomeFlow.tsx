import { useState } from "react";
import Home from "./home";
import Folder from "./folder";
import Settings from "./settings";

type HomeStep = "chat" | "folder" | "settings";

export default function HomeFlow() {
  const [step, setStep] = useState<HomeStep>("chat");

  // Screens
  if (step === "chat") return <Home onOpenFolder={() => setStep("folder")} onOpenSettings={() => setStep("settings")} />;
  if (step === "folder") return <Folder onBackToChat={() => setStep("chat")} />;
    if (step === "settings") return <Settings onBack={() => setStep("chat")} />;

  return null;
}
