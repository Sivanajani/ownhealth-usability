import { useState } from "react";
import Home from "./home";
import Folder from "./folder";
import Settings from "./settings";
import Wearables from "./wearables";
import Documents from "./documents";
import Medication from "./medikation";
import Nutrition from "./nutrition";
import Profile from "./profile";
import RegisterFlow from "../registration/registerFlow";
import type { FocusKey } from "../../types/focus";

type HomeStep =
  | "chat"
  | "folder"
  | "settings"
  | "wearables"
  | "documents"
  | "medication"
  | "nutrition"
  | "profile"
  | "registerflow";

type Props = {
  userName: string;
  age: number | null;
  focus: FocusKey;
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
};

export default function HomeFlow({
  userName,
  age,
  focus,
  hasSeenHomeInsight,
  onSeenHomeInsight,
}: Props) {
  const [step, setStep] = useState<HomeStep>("chat");

  if (step === "chat")
    return (
      <Home
        userName={userName}
        age={age}
        focus={focus}
        hasSeenHomeInsight={hasSeenHomeInsight}
        onSeenHomeInsight={onSeenHomeInsight}
        onOpenFolder={() => setStep("folder")}
        onOpenSettings={() => setStep("settings")}
        onOpenProfile={() => setStep("profile")}
      />
    );

  if (step === "folder")
    return (
      <Folder
        onBackToChat={() => setStep("chat")}
        onOpenWearables={() => setStep("wearables")}
        onOpenDocuments={() => setStep("documents")}
        onOpenMedication={() => setStep("medication")}
        onOpenNutrition={() => setStep("nutrition")}
      />
    );

  if (step === "wearables")
    return (
      <Wearables
        onBack={() => setStep("folder")}
        onBackToChat={() => setStep("chat")}
        onBackToFolder={() => setStep("folder")}
      />
    );

  if (step === "documents")
    return (
      <Documents
        onBack={() => setStep("folder")}
        onBackToChat={() => setStep("chat")}
        onBackToFolder={() => setStep("folder")}
      />
    );

  if (step === "medication")
    return (
      <Medication
        onBack={() => setStep("folder")}
        onBackToChat={() => setStep("chat")}
        onBackToFolder={() => setStep("folder")}
      />
    );

  if (step === "nutrition")
    return (
      <Nutrition
        onBack={() => setStep("folder")}
        onBackToChat={() => setStep("chat")}
        onBackToFolder={() => setStep("folder")}
      />
    );

  if (step === "settings")
    return (
      <Settings
        userName={userName}
        focus={focus}
        onBack={() => setStep("chat")}
        onOpenProfile={() => setStep("profile")}
      />
    );

  if (step === "profile")
    return <Profile onBack={() => setStep("chat")} onSecureNow={() => setStep("registerflow")} />;

  if (step === "registerflow")
    return <RegisterFlow onBackToProfile={() => setStep("profile")} onDone={() => setStep("profile")} />;

  return null;
}
