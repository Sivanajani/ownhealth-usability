import "../../styles/appShell.css";
import "./body.css";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import TrendIcon from "../../assets/trend.svg?react";
import DigitalIcon from "../../assets/digital.svg?react";
import UserIcon from "../../assets/user.svg?react";
import ViewIcon from "../../assets/view.svg?react";

import type { FocusKey } from "../../types/focus";

type Props = {
  focusKey: FocusKey;
  onBack: () => void;
  onBackToHome: () => void;
  onBackToChat: () => void;
  onOpenFolder: () => void;
};

type ScanItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: "user" | "digital" | "view";
};

export default function Body({
  onBack,
  onBackToHome,
  onBackToChat,
  onOpenFolder,
}: Props) {
  const scans: ScanItem[] = [
    {
      id: "full",
      title: "Ganzkörper-Scan",
      subtitle: "Körperfett, Muskelmasse &\nProportionen",
      icon: "user",
    },
    {
      id: "skin",
      title: "Haut & Muttermale",
      subtitle: "Hautkrebs-Früherkennung &\nMuttermale dokumentieren",
      icon: "digital",
    },
    {
      id: "eyes",
      title: "Augen-Vitalität",
      subtitle: "Check auf Entzündungen\n& Gefäßgesundheit",
      icon: "view",
    },
  ];

  const progressDates = ["10. Jan", "3. dez", "27. Okt", "20. Okt"];

  const renderScanIcon = (key: ScanItem["icon"]) => {
    if (key === "user") return <UserIcon />;
    if (key === "digital") return <DigitalIcon />;
    return <ViewIcon />;
  };

  return (
    <div className="oh-screen body-bg">
      <div className="oh-safe body-safe">
        {/* Header */}
        <header className="wear-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>
          <div className="underfolder-title">Body</div>
          <div className="body-topbar-spacer" aria-hidden="true" />
        </header>

        {/* Big Card */}
        <section className="body-card">
          <div className="body-card-head">
            <div className="body-card-icon" aria-hidden="true">
              <TrendIcon />
            </div>
            <div className="body-card-title">Körperanalyse</div>
          </div>

          <div className="body-card-sub">Letzter Scan: 10. Jan</div>

          <div className="body-card-list">
            <div className="body-card-row">
              <span className="body-check" aria-hidden="true">
                ✓
              </span>
              <span>Muskelmasse stabil</span>
            </div>
            <div className="body-card-row">
              <span className="body-check" aria-hidden="true">
                ✓
              </span>
              <span>Körperfett gesunken</span>
            </div>
            <div className="body-card-row">
              <span className="body-check" aria-hidden="true">
                ✓
              </span>
              <span>Viszeralfett niedrig</span>
            </div>
          </div>

          <div className="body-card-divider" />

          <div className="body-card-metrics">
            <div className="body-metric">
              <div className="body-metric-label">KFA</div>
              <div className="body-metric-value">~14%</div>
            </div>
            <div className="body-metric">
              <div className="body-metric-label">Muskel</div>
              <div className="body-metric-value">Hoch</div>
            </div>
          </div>
        </section>

        {/* Quick scans */}
        <div className="body-section-title">Schnell-Scans</div>

        <section className="body-scanlist">
          {scans.map((s) => (
            <button key={s.id} type="button" className="body-scanitem">
              <div className="body-scanicon" aria-hidden="true">
                {renderScanIcon(s.icon)}
              </div>

              <div className="body-scantext">
                <div className="body-scan-title">{s.title}</div>
                <div className="body-scan-sub">
                  {s.subtitle.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="body-scanchev" aria-hidden="true">
                ›
              </div>
            </button>
          ))}
        </section>

        {/* Progress */}
        <div className="body-section-title body-section-title--spaced">Dein Fortschritt</div>

        <section className="body-progress">
          {progressDates.map((d, idx) => (
            <div key={d} className="body-progress-col">
              <div className={`body-progress-tile ${idx === 0 ? "is-active" : ""}`}>
                <span className="body-progress-glyph" aria-hidden="true">
                  <UserIcon />
                </span>
              </div>
              <div className="body-progress-date">{d}</div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <button type="button" className="body-cta">
          Jetzt scannen
        </button>

        <div className="body-footnote">
          Fotos werden sicher verschlüsselt &amp;
          <br />
          anonymisiert verarbeitet.
        </div>
      </div>

      {/* Bottom Nav (NICHT ÄNDERN) */}
      <nav className="home-navigation">
        <button className="home-nav-item" onClick={onBackToHome} type="button">
          <HomeIcon className="home-nav-icon" />
          <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item" onClick={onBackToChat} type="button">
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
