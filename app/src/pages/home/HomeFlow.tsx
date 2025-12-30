import { useState } from "react";
import Home from "./home";
import Folder from "./folder";
import Settings from "./settings";

type HomeStep = "chat" | "folder" | "settings";

type Props = {
  userName: string;
};

export default function HomeFlow({ userName }: Props) {
  const [step, setStep] = useState<HomeStep>("chat");

  if (step === "chat")
    return (
      <Home
        userName={userName}
        onOpenFolder={() => setStep("folder")}
        onOpenSettings={() => setStep("settings")}
      />
    );

  if (step === "folder")
    return <Folder onBackToChat={() => setStep("chat")} />;

  if (step === "settings")
    return <Settings userName={userName} onBack={() => setStep("chat")} />;

  return null;
}
