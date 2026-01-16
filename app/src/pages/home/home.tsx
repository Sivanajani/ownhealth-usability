import "../../styles/appShell.css";
import "./home.css";
import ChatPanel from "./ChatPanel";

import logo from "../../assets/O_Logo.svg";

import ChatIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";
import SettingsIcon from "../../assets/setting.svg?react";
import LockIcon from "../../assets/lock.svg?react";

import type { FocusKey } from "../../App";

type Props = {
  userName: string;
  age: number | null;
  focus: FocusKey;
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
  onOpenFolder?: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
};

export default function Home({ userName, age, focus, hasSeenHomeInsight, onSeenHomeInsight, onOpenFolder, onOpenSettings, onOpenProfile }: Props) {
  const displayName = userName?.trim() ? userName.trim() : "da";
  const bioAge = age ? age + 2 : null;

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

        {/* INSIGHT statt Greeting */}
        {/* INSIGHT statt Greeting */}
        {!hasSeenHomeInsight ? (
          <section className="home-insight">
            <div className={`home-insightCard ${focus === "longevity" ? "is-longevity" : "is-chronic"}`}>
              <div className="home-insightTop">
                <div className="home-insightHello">
                  Schön, dass du da bist
                  {displayName !== "da" && (
                    <>
                      , <span className="home-insightName">{displayName}</span>
                    </>
                  )}
                  .
                </div>
              </div>

              {focus === "longevity" ? (
                <>
                  <div className="home-insightBody">
                    <div className="home-insightLabel">Analyse deiner letzten 90 Tage</div>

                    <div className="home-insightMetric">
                      <div className="home-insightMetricMain">
                        Dein Herz ist biologisch{" "}
                        <span className="home-insightAccent">{bioAge ?? 34}</span>{" "}
                        <span className="home-insightMuted">
                          {age ? `(statt ${age})` : "(statt 38)"}
                        </span>
                      </div>

                      <div className="home-insightBullets">
                        <div className="home-bullet">
                          <span className="home-bulletIcon">🚀</span>
                          <span>Effizienter als <b>85%</b> deiner Altersgruppe.</span>
                        </div>
                        <div className="home-bullet">
                          <span className="home-bulletIcon">⚠️</span>
                          <span>Schlaf kostet dich aktuell ca. <b>2 Jahre Potenzial</b>.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="home-insightBtn"
                    type="button"
                    onClick={() => {
                      onSeenHomeInsight();
                      onOpenFolder?.();
                    }}
                  >
                    Hebel für Bio-Alter 32 anzeigen
                  </button>
                </>
              ) : (
                <>
                  <div className="home-insightBody">
                    <div className="home-insightLabel">Erste Zusammenhänge</div>

                    <div className="home-insightMetric">
                      <div className="home-insightMetricMain">
                        Über <span className="home-insightAccent">10.000 Schritte</span> →{" "}
                        <span className="home-insightAccent">+18%</span> Tiefschlaf
                      </div>

                      <div className="home-insightNote">
                        Dieser Zusammenhang ist in deinem Profil gespeichert.
                      </div>
                    </div>
                  </div>

                  <button
                    className="home-insightBtn"
                    type="button"
                    onClick={() => {
                      onSeenHomeInsight();
                      onOpenFolder?.();
                    }}
                  >
                    Mehr Zusammenhänge entdecken
                  </button>
                </>
              )}
            </div>
          </section>
        ) : null}

      

        <div className="home-chatWrap">
          <div className="home-chatCard">
            <ChatPanel onGoToProfile={onOpenProfile} />
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
