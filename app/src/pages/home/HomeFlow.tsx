import { useEffect, useState } from "react";

import Home from "./home";
import Chat from "./chat";
import Folder from "./folder";
import Settings from "./settings";
import Wearables from "./wearables";
import Documents from "./documents";
import Medication from "./medikation";
import Nutrition from "./nutrition";
import Profile from "./profile";
import RegisterFlow from "../registration/registerFlow";

type HomeStep =
  | "home"
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
  firstQuestion: string;
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
  initialStep?: HomeStep;
};

export default function HomeFlow({
  userName,
  firstQuestion,
  hasSeenHomeInsight,
  onSeenHomeInsight,
  initialStep = "home",
}: Props) {
  const [step, setStep] = useState<HomeStep>(initialStep);
  
  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  /* =========================
     HOME
  ========================= */
  if (step === "home")
    return (
      <Home
        hasSeenHomeInsight={hasSeenHomeInsight}
        onSeenHomeInsight={onSeenHomeInsight}
        onOpenChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
        onOpenSettings={() => setStep("settings")}
        onOpenProfile={() => setStep("profile")}
      />
    );

  /* =========================
     CHAT / ASSISTENT
  ========================= */
  if (step === "chat")
    return (
      <Chat
        onOpenHome={() => setStep("home")}
        onOpenFolder={() => setStep("folder")}        
        initialQuestion={firstQuestion}
      />
    );

  /* =========================
     FOLDER
  ========================= */
  if (step === "folder")
    return (
      <Folder
        onBackToHome={() => setStep("home")}
        onOpenChat={() => setStep("chat")}
        onOpenWearables={() => setStep("wearables")}
        onOpenDocuments={() => setStep("documents")}
        onOpenMedication={() => setStep("medication")}
        onOpenNutrition={() => setStep("nutrition")}
      />
    );

  /* =========================
     SUB FOLDER SCREENS
  ========================= */
  if (step === "wearables")
    return (
      <Wearables
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  if (step === "documents")
    return (
      <Documents
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  if (step === "medication")
    return (
      <Medication
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  if (step === "nutrition")
    return (
      <Nutrition
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  /* =========================
     SETTINGS / PROFILE
  ========================= */
  if (step === "settings")
    return (
      <Settings
        userName={userName}
        onBack={() => setStep("home")}
        onOpenProfile={() => setStep("profile")}
      />
    );

  if (step === "profile")
    return (
      <Profile
        onBack={() => setStep("home")}
        onSecureNow={() => setStep("registerflow")}
      />
    );

  if (step === "registerflow")
    return (
      <RegisterFlow
        onBackToProfile={() => setStep("profile")}
        onDone={() => setStep("profile")}
      />
    );

  return null;
}
