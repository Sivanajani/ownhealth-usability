import "../../styles/appShell.css";
import "./registration1.css";

import CheckIcon from "../../assets/check.svg?react";  
import LockIcon from "../../assets/lock.svg?react";
import UserIcon from "../../assets/user.svg?react";
import HeartbeatIcon from "../../assets/heartbeat.svg?react";
import SettingIcon from "../../assets/setting.svg?react";

type Props = {
  onBack?: () => void;
  onSecure?: () => void;
};

type Item = {
  icon: React.ReactNode;
  text: string;
  tone: "green" | "blue" | "gray" | "purple";
};

const ITEMS: Item[] = [
  { icon: <CheckIcon />, text: "Schlaf-Muster erkannt.", tone: "green" },
  { icon: <HeartbeatIcon />, text: "3.420 Daten aus Apple Health geladen.", tone: "blue" },
  { icon: <UserIcon />, text: "Alter & Geschlecht hinterlegt.", tone: "gray" },
  { icon: <SettingIcon />, text: "Eingestellt auf: Ursachen & Klarheit.", tone: "purple" },
];

export default function Registration1({ onBack, onSecure }: Props) {
  return (
    <div className="oh-screen reg-bg">
      <div className="oh-safe reg-safe">        

        <section className="reg-card">
          <div className="reg-head">
            <h1 className="reg-title">Profil bereit</h1>
          </div>

          <div className="reg-list">
            {ITEMS.map((it, idx) => (
              <div key={idx} className={`reg-item reg-item--${it.tone}`}>
                <div className="reg-itemIcon" aria-hidden="true">
                  {it.icon}
                </div>
                <div className="reg-itemText">{it.text}</div>
              </div>
            ))}
          </div>

          <div className="reg-cta">
            <div className="reg-ctaTitle">Sichere deine Daten.</div>
            <div className="reg-ctaSub">
              Erstelle jetzt dein Konto, damit nichts verloren geht.
            </div>

            <button className="reg-primary" type="button" onClick={onSecure}>
              Konto kostenlos sichern
            </button>

            <div className="reg-meta">
              60 Sek. <span className="reg-dot">•</span> Anonym{" "}
              <span className="reg-dot">•</span> Sicher verschlüsselt{" "}
              <span className="reg-lock" aria-hidden="true">
                <LockIcon />
              </span>
            </div>

            <button
              className="reg-skip"
              type="button"
              onClick={onBack}
            >
              Vorerst ohne Sicherung weiter
              <span className="reg-skipSub">(Daten werden gelöscht)</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
