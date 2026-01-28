// wearables.tsx
import "../../styles/appShell.css";
import "./wearables.css";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import HeartIcon from "../../assets/heart.svg?react";
import LowBatteryIcon from "../../assets/low-battery.svg?react";
import MoonIcon from "../../assets/moon.svg?react";

import Smartwatch from "../../assets/1smartwatch.svg?react";

import type { FocusKey } from "../../types/focus";

type Props = {
  focusKey: FocusKey;

  onBack?: () => void;
  onBackToHome?: () => void;
  onOpenFolder?: () => void;
  onBackToChat?: () => void;
};

export default function Wearables({
  focusKey,
  onBack,
  onBackToHome,
  onOpenFolder,
  onBackToChat,
}: Props) {
  const isLongevity = focusKey === "longevity";

  return (
    <div className="oh-screen wear-bg">
      <div className="oh-safe wear-safe">
        {/* Header */}
        <header className="wear-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>
          <h1 className="underfolder-title">Wearables</h1>
          <div className="wear-spacer" />
        </header>

        <main className="wear-content">
          {isLongevity ? (
            <>
              {/* Bio Status (Top) */}
              <section className="wear-bioCard">
                <div className="wear-bioTitle">Dein Bio-Status</div>
                <div className="wear-bioText">
                  Deine HRV ist heute 12% höher – ein Zeichen der Erholung durch dein
                  Magnesium-Supplement gestern Abend.
                </div>
              </section>

              {/* 3 Rings */}
              <section className="wear-ringRow">
                <div className="wear-ringCard">
                  <div className="wear-ringIcon wear-ringIcon--purple" aria-hidden="true">
                    <MoonIcon />
                  </div>
                  <div className="wear-ringLabel">Schlaf</div>
                  <div className="wear-ringValue">7.5h</div>
                </div>

                <div className="wear-ringCard">
                  <div className="wear-ringIcon wear-ringIcon--purple" aria-hidden="true">
                    <LowBatteryIcon />
                  </div>
                  <div className="wear-ringLabel">Erholung</div>
                  <div className="wear-ringValue">88%</div>
                </div>

                <div className="wear-ringCard">
                  <div className="wear-ringIcon wear-ringIcon--purple" aria-hidden="true">
                    <HeartIcon />
                  </div>
                  <div className="wear-ringLabel">Vaskulär</div>
                  <div className="wear-ringValue">92%</div>
                </div>
              </section>

              {/* Analyse link */}
              <button className="wear-analyseLink" type="button">
                Analyse <span aria-hidden="true">›</span>
              </button>

              {/* Metric cards */}
              <section className="wear-metricGrid">
                <div className="wear-metricCard">
                  <div className="wear-metricLabel">HRV</div>
                  <div className="wear-metricBig">
                    54 <span>ms</span>
                  </div>
                  <div className="wear-bars" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="wear-metricHint">
                    Optimaler Stress-Resilienz-Bereich für dein Alter.
                  </div>
                </div>

                <div className="wear-metricCard">
                  <div className="wear-metricLabel">Ruhe-Puls</div>
                  <div className="wear-metricBig">
                    48 <span>BPM</span>
                  </div>
                  <div className="wear-bars" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="wear-metricHint">4% unter deinem Schnitt.</div>
                </div>

                <div className="wear-metricCard">
                  <div className="wear-metricLabel">Atemfrequenz</div>
                  <div className="wear-metricBig">
                    14.2 <span>/min</span>
                  </div>
                  <div className="wear-bars" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="wear-metricHint">
                    Normaler Wert – keine veränderte Schlafqualität.
                  </div>
                </div>

                <div className="wear-metricCard">
                  <div className="wear-metricLabel">Temperatur</div>
                  <div className="wear-metricBig">
                    36.4 <span>°</span>
                  </div>
                  <div className="wear-bars" aria-hidden="true">
                    <span /><span /><span /><span /><span /><span />
                  </div>
                  <div className="wear-metricHint">
                    Keine Anzeichen von Entzündungen oder Infekten.
                  </div>
                </div>
              </section>

              {/* Device Card */}
              <section className="wear-deviceCard">
                <div className="wear-deviceIcon" aria-hidden="true"><Smartwatch/></div>
                <div className="wear-deviceText">
                  <div className="wear-deviceTitle">Apple Watch Series 9</div>
                  <div className="wear-deviceMeta">vor 2 Minuten</div>
                </div>
                <div className="wear-deviceStatus">
                  <span className="wear-onlineDot" aria-hidden="true" />
                  <span>Verbunden</span>
                </div>
              </section>

              <button className="wear-addBtn" type="button">
                <span className="wear-plus" aria-hidden="true">＋</span>
                Weiteres Wearable
              </button>
            </>
            ) : (
              <>
                {/* Muster erkannt (Top) - ohne Icon */}
                <section className="wear-patternCard">
                  <div className="wear-patternTitle">Muster erkannt</div>
                  <div className="wear-patternText">
                    Deine nächtliche Herzfrequenz steigt durchschnittlich um 6 BPM an Tagen,
                    bevor du über stärkere Krämpfe berichtest.
                  </div>
                  <button className="wear-patternLink" type="button">
                    Alle Muster ansehen <span aria-hidden="true">›</span>
                  </button>
                </section>

                {/* Heutige Gesundheitsdaten */}
                <div className="wear-chronicSectionTitle">Heutige Gesundheitsdaten</div>

                <section className="wear-todayCard">
                  <div className="wear-todayTop">
                    <div className="wear-todayBig">12.450</div>
                    <div className="wear-todaySub">Schritte heute</div>
                  </div>

                  {/* simple line chart (SVG) */}
                  <div className="wear-miniChart" aria-hidden="true">
                    <svg viewBox="0 0 320 70" preserveAspectRatio="none">
                      <path
                        d="M0,55 C40,54 60,45 90,44 C125,43 140,52 170,50 C200,48 215,37 245,38 C275,39 295,47 320,44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="wear-todayFooter">
                    <span>Letzte 7 Tage</span>
                    <span className="wear-todayFooterRight">ø 11.093 Schritte</span>
                  </div>
                </section>

                {/* 2 KPIs */}
                <section className="wear-miniKpiRow">
                  <div className="wear-miniKpiCard">
                    <div className="wear-miniKpiTop">
                      <span className="wear-miniKpiIcon wear-miniKpiIcon--purple" aria-hidden="true">
                        <HeartIcon />
                      </span>
                      <span className="wear-miniKpiLabel">HRV</span>
                    </div>
                    <div className="wear-miniKpiValue">
                      54 <span>ms</span>
                    </div>
                    <div className="wear-miniKpiMeta">Durchschnitt</div>
                    <div className="wear-miniKpiBar" aria-hidden="true">
                      <span style={{ width: "62%" }} />
                    </div>
                  </div>

                  <div className="wear-miniKpiCard">
                    <div className="wear-miniKpiTop">
                      <span className="wear-miniKpiIcon wear-miniKpiIcon--purple" aria-hidden="true">
                        <MoonIcon />
                      </span>
                      <span className="wear-miniKpiLabel">Schlafqualität</span>
                    </div>
                    <div className="wear-miniKpiValue">
                      78 <span>%</span>
                    </div>
                    <div className="wear-miniKpiMeta">Gut (8h 12min)</div>
                    <div className="wear-miniKpiBar wear-miniKpiBar--purple" aria-hidden="true">
                      <span style={{ width: "78%" }} />
                    </div>
                  </div>
                </section>

                {/* Device Card bleibt gleich */}
                <section className="wear-deviceCard">
                  <div className="wear-deviceIcon" aria-hidden="true">
                    <Smartwatch />
                  </div>
                  <div className="wear-deviceText">
                    <div className="wear-deviceTitle">Apple Watch Series 9</div>
                    <div className="wear-deviceMeta">vor 2 Minuten</div>
                  </div>
                  <div className="wear-deviceStatus">
                    <span className="wear-onlineDot" aria-hidden="true" />
                    <span>Verbunden</span>
                  </div>
                </section>

                <button className="wear-addBtn" type="button">
                  <span className="wear-plus" aria-hidden="true">＋</span>
                  Weiteres Wearable
                </button>
              </>
            )}
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="home-navigation">
        <button className="home-nav-item" onClick={onBackToHome} type="button">
          <HomeIcon className="home-nav-icon" />
          <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item" onClick={onBackToChat} type="button">
          <AssistantIcon className="home-nav-icon" />
          <span className="home-nav-label">Assistent</span>
        </button>

        <button
          className="home-nav-item home-nav-item--active"
          onClick={onOpenFolder}
          type="button"
        >
          <FolderIcon className="home-nav-icon" />
          <span className="home-nav-label">Ordner</span>
        </button>
      </nav>
    </div>
  );
}
