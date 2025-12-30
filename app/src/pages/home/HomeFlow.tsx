import { useState } from "react";
import Home from "./home";
import Folder from "./folder";
import Settings from "./settings";
import Wearables from "./wearables";
import Documents from "./documents";
//import Medication from "./medication";
//import Nutrition from "./nutrition";

type HomeStep =
  | "chat"
  | "folder"
  | "settings"
  | "wearables"
  | "documents"
  | "medication"
  | "nutrition";

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


  /*if (step === "medication")
    return <Medication onBack={() => setStep("folder")} />;

  if (step === "nutrition")
    return <Nutrition onBack={() => setStep("folder")} />;*/

  if (step === "settings")
    return <Settings userName={userName} onBack={() => setStep("chat")} />;

  return null;
}
