import "../../styles/appShell.css";
import "./settings.css";

type Props = {
  onBack?: () => void; // optional falls du zurück willst
};

export default function Settings({ onBack }: Props) {
  return (
    <div className="oh-screen settings-bg">
      <div className="oh-safe settings-safe">
        <div className="settings-topTime">9:41</div>

        {/* Profile Card */}
        <section className="profileCard">
          <div className="profileName">SIMON</div>
          <div className="profileMeta">Profil-Vollständigkeit: 64%</div>
          <button className="profileLink">[vervollständigen]</button>
        </section>

        {/* Mode */}
        <div className="settings-sectionTitle">Mode</div>
        <div className="modeRow">
          <button className="modeBtn">
            <span className="modeIcon">👤</span>
            <span>Basic</span>
          </button>

          <button className="modeBtn modeBtn--active">
            <span className="modeIcon">〽</span>
            <span>Sport</span>
          </button>
        </div>

        {/* List */}
        <div className="settings-list">
          <button className="settingsItem">
            <div className="itemIcon itemIcon--blue">💬</div>
            <div className="itemText">
              <div className="itemTitle">Chatverläufe</div>
              <div className="itemSub">12 Gespräche</div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem">
            <div className="itemIcon itemIcon--green">🛡</div>
            <div className="itemText">
              <div className="itemTitle">Datenschutz + Sicherheit</div>
              <div className="itemSub">Verschlüsselung, Export</div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem">
            <div className="itemIcon itemIcon--gray">⚙</div>
            <div className="itemText">
              <div className="itemTitle">Einstellungen</div>
              <div className="itemSub"> </div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem">
            <div className="itemIcon itemIcon--purple">?</div>
            <div className="itemText">
              <div className="itemTitle">Hilfe + Support</div>
              <div className="itemSub"> </div>
            </div>
            <div className="itemChevron">›</div>
          </button>

          <button className="settingsItem settingsItem--danger">
            <div className="itemIcon itemIcon--red">↪</div>
            <div className="itemText">
              <div className="itemTitle">Abmelden</div>
              <div className="itemSub"> </div>
            </div>
            <div className="itemChevron">›</div>
          </button>
        </div>

        {onBack ? (
          <button className="settingsBack" onClick={onBack}>
            Zurück
          </button>
        ) : null}
      </div>
    </div>
  );
}
