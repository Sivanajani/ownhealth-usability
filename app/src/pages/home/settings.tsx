import "../../styles/appShell.css";
import "./settings.css";

// Icons importieren
import UserIcon from "../../assets/user.svg?react";
import HeartbeatIcon from "../../assets/heartbeat.svg?react";
import ChatIcon from "../../assets/chat.svg?react";
import SchildIcon from "../../assets/schild.svg?react";
import SettingIcon from "../../assets/setting.svg?react";
import QuestionIcon from "../../assets/question.svg?react";
import LogoutIcon from "../../assets/logout.svg?react";

type Props = {
  userName: string;
  onBack?: () => void;
};

export default function Settings({ userName, onBack }: Props) {
  return (
    <div className="oh-screen settings-bg">
      <div className="oh-safe settings-safe">
        <div className="settings-topTime">9:41</div>

        {/* Profile Card */}
        <section className="profileCard">
          <h1 className="profileName">{userName || "SIMON"}</h1>
          <div className="profileMeta">Profil-Vollständigkeit: 64%</div>
          <button className="profileLink">[vervollständigen]</button>
        </section>

        {/* Mode Selection */}
        <div className="settings-sectionTitle">Mode</div>
        <div className="modeRow">
          <button className="modeBtn">
            <UserIcon className="modeIcon" />
            <span>Basic</span>
          </button>

          <button className="modeBtn modeBtn--active">
            <HeartbeatIcon className="modeIcon" />
            <span>Sport</span>
          </button>
        </div>

        {/* Settings List */}
        <div className="settings-list">
          <button className="settingsItem">
            <div className="itemIcon itemIcon--blue">
              <ChatIcon />
            </div>
            <div className="itemText">
              <div className="itemTitle">Chatverläufe</div>
              <div className="itemSub">12 Gespräche</div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem">
            <div className="itemIcon itemIcon--green">
              <SchildIcon />
            </div>
            <div className="itemText">
              <div className="itemTitle">Datenschutz + Sicherheit</div>
              <div className="itemSub">Verschlüsselung, Export</div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem">
            <div className="itemIcon itemIcon--gray">
              <SettingIcon />
            </div>
            <div className="itemText">
              <div className="itemTitle">Einstellungen</div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem">
            <div className="itemIcon itemIcon--purple">
              <QuestionIcon />
            </div>
            <div className="itemText">
              <div className="itemTitle">Hilfe + Support</div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem settingsItem--danger">
            <div className="itemIcon itemIcon--red">
              <LogoutIcon />
            </div>
            <div className="itemText">
              <div className="itemTitle">Abmelden</div>
            </div>
            <div className="itemChevron">›</div>
          </button>
        </div>

        {onBack && (
          <button className="settingsBack" onClick={onBack}>
            Zurück
          </button>
        )}
      </div>
    </div>
  );
}