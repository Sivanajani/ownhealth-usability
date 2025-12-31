import "../../styles/appShell.css";
import "./home.css";
import ChatPanel from "./ChatPanel";

import logo from "../../assets/O_Logo.svg";

// Icons (bitte Pfade/Dateinamen anpassen)
import ChatIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";
import SettingsIcon from "../../assets/setting.svg?react";
import LockIcon from "../../assets/lock.svg?react";

type Props = {
  userName: string;
  onOpenFolder?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
};

export default function Home({ userName, onOpenFolder, onOpenSettings, onOpenProfile }: Props) {
  const displayName = userName?.trim() ? userName.trim() : "da";

  return (
    <div className="oh-screen home-bg">
      <div className="oh-safe home-safe">
        <header className="home-header">
          <div className="home-left">
            <div className="home-leftRow">
              <div className="home-logoMark">
                <img className="home-logoImg" src={logo} alt="ownhealth" />
              </div>

              <div className="home-secure">
                <span className="home-lock" aria-hidden="true">
                  <LockIcon className="home-lockSvg" />
                </span>
                <span>Verschlüsselt</span>
              </div>
            </div>
          </div>

          <div className="home-right">
            <button
              className="home-ringBtn"
              type="button"
              onClick={onOpenProfile}
              aria-label="Profil öffnen"
            >
              <span className="home-ringText">26%</span>
            </button>
                      

            <button
              className="icon-btn home-gear"
              onClick={onOpenSettings}
              aria-label="Einstellungen"
              type="button"
            >
              <SettingsIcon className="home-gearSvg" />
            </button>
          </div>
        </header>

        {/* Greeting centered */}
        <section className="home-greeting">
          <div className="home-greetingInner">
            <div className="home-greetingTitle">
              Schön, dass du da bist{displayName !== "da" ? "," : ""}{" "}
              <span className="home-greetingName">{displayName !== "da" ? displayName : ""}</span>
            </div>
            <div className="home-greetingSub">
              Stell mir eine Frage oder wähle eine Vorlage, um zu starten.
            </div>
          </div>
        </section>

        <div className="home-chatWrap">
          <div className="home-chatCard">
            <ChatPanel />
          </div>
        </div>
      </div>

      <nav className="bottomNav">
        <button className="navItem navItem--active" type="button">
          <span className="navIcon" aria-hidden="true">
            <ChatIcon className="navSvg" />
          </span>
          <span>Chat</span>
        </button>

        <button className="navItem" onClick={onOpenFolder} type="button">
          <span className="navIcon" aria-hidden="true">
            <FolderIcon className="navSvg" />
          </span>
          <span>Ordner</span>
        </button>
      </nav>
    </div>
  );
}