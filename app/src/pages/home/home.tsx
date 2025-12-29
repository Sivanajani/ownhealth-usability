import "../../styles/appShell.css";
import "./home.css";
import ChatPanel from "./ChatPanel";


import logo from "../../assets/O_Logo.svg"; 

type Props = {
  onOpenFolder?: () => void;
  onOpenSettings?: () => void;
};

export default function Home({ onOpenFolder, onOpenSettings }: Props) {
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
                <span className="home-lock">🔒</span>
                <span>Verschlüsselt</span>
              </div>
            </div>
          </div>

          <div className="home-right">
            <div className="home-ring">64%</div>
            <button className="icon-btn home-gear" onClick={onOpenSettings} aria-label="Settings">
              ⚙️
            </button>
          </div>
        </header>

        <div className="home-chatWrap">
            <div className="home-chatCard">
                <ChatPanel />
            </div>
        </div>
      </div>

      <nav className="bottomNav">
        <button className="navItem navItem--active">
          <span className="navIcon">💬</span>
          <span>Chat</span>
        </button>

        <button className="navItem" onClick={onOpenFolder}>
          <span className="navIcon">📁</span>
          <span>Ordner</span>
        </button>
      </nav>
    </div>
  );
}
