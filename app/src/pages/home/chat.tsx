import "./chat.css";
import "../../styles/appShell.css";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

type Props = {
  onOpenHome: () => void;
  onOpenFolder: () => void;
};

export default function Chat({ onOpenHome, onOpenFolder }: Props) {
  return (
    <div className="oh-screen">
      <div className="oh-safe chat-root">
        <h1 className="chat-title">Assistent</h1>

        <div className="chat-placeholder">
          <p>
            Hi! Ich bin dein Gesundheits-Assistent.  
            <br />
            Hier entsteht bald dein persönlicher Chat.
          </p>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <nav className="home-navigation">
        <button className="home-nav-item" onClick={onOpenHome} type="button">
            <HomeIcon className="home-nav-icon" />
            <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item home-nav-item--active" type="button">
            <AssistantIcon className="home-nav-icon" />
            <span className="home-nav-label">Assistent</span>
        </button>

        <button className="home-nav-item" onClick={onOpenFolder} type="button">
            <FolderIcon className="home-nav-icon" />
            <span className="home-nav-label">Ordner</span>
        </button>
      </nav>      
    </div>
  );
}
