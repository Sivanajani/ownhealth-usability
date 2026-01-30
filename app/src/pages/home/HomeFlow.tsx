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
import Body from "./body";
import Checkups from "./checkups"
import RegisterFlow from "../registration/registerFlow";
import type { FocusKey } from "../../types/focus";

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
  | "body"
  | "checkups"
  | "registerflow";

type Props = {
  userName: string;
  firstQuestion: string;
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
  focusKey: FocusKey;
  initialStep?: HomeStep;
};

export default function HomeFlow({
  userName,
  firstQuestion,
  hasSeenHomeInsight,
  onSeenHomeInsight,
  focusKey,
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
        focusKey={focusKey}
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
        onOpenProfile={() => setStep("profile")}
        onOpenHome={() => setStep("home")}
        onOpenFolder={() => setStep("folder")}        
        initialQuestion={firstQuestion}
        userName={userName}
      />
    );

  /* =========================
     FOLDER
  ========================= */
  if (step === "folder")
    return (
      <Folder
        focusKey={focusKey}
        onBackToHome={() => setStep("home")}
        onOpenChat={() => setStep("chat")}
        onOpenWearables={() => setStep("wearables")}
        onOpenDocuments={() => setStep("documents")}
        onOpenMedication={() => setStep("medication")}
        onOpenNutrition={() => setStep("nutrition")}
        onOpenBody={() => setStep("body")}
        onOpenCheckups={() => setStep("checkups")}
      />
    );

  /* =========================
     SUB FOLDER SCREENS
  ========================= */
  if (step === "wearables")
    return (
      <Wearables
        focusKey={focusKey}  
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  if (step === "documents")
    return (
      <Documents
        focusKey={focusKey}  
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
        focusKey={focusKey}  
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  if (step === "body")
    return (
      <Body
        focusKey={focusKey}
        onBack={() => setStep("folder")}
        onBackToHome={() => setStep("home")}
        onBackToChat={() => setStep("chat")}
        onOpenFolder={() => setStep("folder")}
      />
    );

  if (step === "checkups")
    return (
      <Checkups
        focusKey={focusKey}
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
