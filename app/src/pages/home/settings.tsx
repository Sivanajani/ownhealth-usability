// settings.tsx
import { useEffect, useState } from "react";
import "../../styles/appShell.css";
import "./settings.css";

// Icons
import UserIcon from "../../assets/user.svg?react";
import HeartbeatIcon from "../../assets/heartbeat.svg?react";
import ChatIcon from "../../assets/chat.svg?react";
import SchildIcon from "../../assets/schild.svg?react";
import SettingIcon from "../../assets/setting.svg?react";
import QuestionIcon from "../../assets/question.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";
import type { FocusKey } from "../../types/focus";

type Props = {
  userName: string;
  focus?: FocusKey | null;
  onBack?: () => void;
  onOpenProfile?: () => void;
};

type Mode = "basic" | "sport";

export default function Settings({ userName, focus, onBack, onOpenProfile }: Props) {
  const [mode, setMode] = useState<Mode>("basic");
  useEffect(() => {
    setMode(focus === "longevity" ? "sport" : "basic");
  }, [focus]);

  return (
    <div className="oh-screen settings-bg">
      <div className="oh-safe settings-safe">                

        {/* Profile Card */}
        <section className="profileCard">
          <h1 className="profileName">{(userName?.trim() || "SIMON").toUpperCase()}</h1>
          <div className="profileMeta">Profil-Vollständigkeit: 26%</div>
          <button 
            className="profileLink"            
            type="button"
            onClick={onOpenProfile}
            >
              [vervollständigen]
          </button>
        </section>

        {/* Mode */}
        <div className="settings-sectionTitle">Mode</div>
        <div className="modeRow" role="tablist" aria-label="Mode">
          <button
            type="button"
            className={`modeBtn ${mode === "basic" ? "modeBtn--active" : ""}`}
            onClick={() => setMode("basic")}
            aria-selected={mode === "basic"}
          >
            <UserIcon className="modeIcon" aria-hidden="true" />
            <span>Basic</span>
          </button>

          <button
            type="button"
            className={`modeBtn modeBtn--sport ${mode === "sport" ? "modeBtn--active" : ""}`}
            onClick={() => setMode("sport")}
            aria-selected={mode === "sport"}
          >
            <HeartbeatIcon className="modeIcon" aria-hidden="true" />
            <span>Sport</span>
          </button>
        </div>

        {/* List */}
        <div className="settings-list">
          <button className="settingsItem" type="button">
            <div className="itemIcon itemIcon--blue" aria-hidden="true">
              <ChatIcon className="itemSvg" />
            </div>
            <div className="itemText">
              <div className="itemTitle">Chatverläufe</div>
              <div className="itemSub">12 Gespräche</div>
            </div>
            <div className="itemChevron" aria-hidden="true">›</div>
          </button>

          <button className="settingsItem" type="button">
            <div className="itemIcon itemIcon--green" aria-hidden="true">
              <SchildIcon className="itemSvg" />
            </div>
            <div className="itemText">
              <div className="itemTitle">Datenschutz + Sicherheit</div>
              <div className="itemSub">Verschlüsselung, Export</div>
            </div>
            <div className="itemChevron" aria-hidden="true">›</div>
          </button>

          <button className="settingsItem" type="button">
            <div className="itemIcon itemIcon--gray" aria-hidden="true">
              <SettingIcon className="itemSvg" />
            </div>
            <div className="itemText">
              <div className="itemTitle">Einstellungen</div>
            </div>
            <div className="itemChevron" aria-hidden="true">›</div>
          </button>

          <button className="settingsItem" type="button">
            <div className="itemIcon itemIcon--purple" aria-hidden="true">
              <QuestionIcon className="itemSvg" />
            </div>
            <div className="itemText">
              <div className="itemTitle">Hilfe + Support</div>
            </div>
            <div className="itemChevron" aria-hidden="true">›</div>
          </button>

          <button className="settingsItem settingsItem--danger" type="button">
            <div className="itemIcon itemIcon--red" aria-hidden="true">
              <LogoutIcon className="itemSvg" />
            </div>
            <div className="itemText">
              <div className="itemTitle">Abmelden</div>
            </div>
            <div className="itemChevron" aria-hidden="true">›</div>
          </button>
        </div>

        {onBack && (
          <button className="settingsBack" onClick={onBack} type="button">
            Zurück
          </button>
        )}
      </div>
    </div>
  );
}
