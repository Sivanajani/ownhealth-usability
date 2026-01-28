import "../../styles/appShell.css";
import "./folder.css";

import LockIcon from "../../assets/lock.svg?react";
import SmartwatchIcon from "../../assets/smartwatch.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import PillsIcon from "../../assets/pills.svg?react";
import RestaurantIcon from "../../assets/restaurant.svg?react";
import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";
import BodyInlineIcon from "../../assets/user.svg?react";
import CheckupsInlineIcon from "../../assets/calendar.svg?react";
import Pulse from "../../assets/heartbeat.svg?react";
import AddIcon from "../../assets/add.svg?react";


import type { FocusKey } from "../../types/focus";

type Props = {
  focusKey: FocusKey;
  onBackToHome?: () => void;
  onOpenChat?: () => void;
  onOpenWearables?: () => void;
  onOpenDocuments?: () => void;
  onOpenMedication?: () => void;
  onOpenNutrition?: () => void;
  onOpenCheckups?: () => void;
  onOpenBody?: () => void;
  onAddData?: () => void; 
};

export default function Folder({
  focusKey,
  onBackToHome,
  onOpenChat,
  onOpenWearables,
  onOpenDocuments,
  onOpenMedication,
  onOpenNutrition,
  onOpenCheckups,
  onOpenBody,
  onAddData,
}: Props) {
  const isLongevity = focusKey === "longevity";

  return (
    <div className="oh-screen folder-bg">
      <div className="oh-safe folder-safe">
        {/* Header */}
        <header className="folder-header">
          <div className="folder-titleBlock">
            <h1 className="folder-title">Ordner</h1>
            <div className="folder-sub">
              <span className="folder-lock" aria-hidden="true">
                <LockIcon />
              </span>
              <span>Sicher verschlüsselt</span>
            </div>
          </div>
        </header>

        <main className="folder-content">
          {/* Progress */}
          <section className="folder-progress">
            <div className="folder-progressRow">
              <div className="folder-progressLabel">
                {isLongevity ? "Mehr Daten = präzisere Insights" : "Mehr Daten = Genauere Ergebnisse"}
              </div>
              <div className="folder-progressPct">26%</div>
            </div>
            <div className="folder-progressTrack" aria-hidden="true">
              <div className="folder-progressFill" style={{ width: "26%" }} />
            </div>
          </section>

          {/* Next steps */}
          <div className="folder-sectionLabel folder-sectionLabel--spaced">
            NÄCHSTE SCHRITTE
          </div>

          <div className="nextSteps">
            <button className="nextStepItem" type="button">
              <span className="nextStepIcon" aria-hidden="true">
                <DocumentIcon />
              </span>
              <span className="nextStepText">Bluttest hochladen</span>
              <span className="nextStepGain">+15%</span>
            </button>

            <button className="nextStepItem" type="button">
              <span className="nextStepIcon nextStepIcon--pulse" aria-hidden="true">
                <Pulse />
              </span>
              <span className="nextStepText">Basis-Check</span>
              <span className="nextStepGain">+20%</span>
            </button>
          </div>

          {/* My data header */}
          <div className="folder-rowHeader">
            <div className="folder-sectionLabel folder-sectionLabel--spaced">
              MEINE DATEN
            </div>

            <button
              type="button"
              className="folder-plusBtn"
              aria-label="Daten hinzufügen"
              onClick={onAddData}
            >
              <span className="folder-plusIcon" aria-hidden="true">
                <AddIcon />
              </span>
            </button>
          </div>

          {/* Grid */}
          <div className="folder-grid folder-grid--6">
            {/* Wearables */}
            <div
              className="dataCard dataCard--purple"
              role="button"
              tabIndex={0}
              onClick={onOpenWearables}
              onKeyDown={(e) => e.key === "Enter" && onOpenWearables?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <SmartwatchIcon />
                </div>
                <div className="chev" aria-hidden="true">
                  ›
                </div>
              </div>

              <div className="dataTitle">Wearables</div>
              <div className="dataSub">Whoop • Sehr aktiv</div>

              <div className="dataBottom">
                <div className="dataMeta">Heute: 12,450 Schritte</div>
              </div>
            </div>

            {/* Dokumente */}
            <div
              className="dataCard dataCard--cyan"
              role="button"
              tabIndex={0}
              onClick={onOpenDocuments}
              onKeyDown={(e) => e.key === "Enter" && onOpenDocuments?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <DocumentIcon />
                </div>
                <div className="chev" aria-hidden="true">
                  ›
                </div>
              </div>

              <div className="dataTitle">Dokumente</div>
              <div className="dataSub">...</div>
              <div className="dataSub">12 Dateien</div>
            </div>

            {/* Supplements / Medikation */}
            <div
              className="dataCard dataCard--orange"
              role="button"
              tabIndex={0}
              onClick={onOpenMedication}
              onKeyDown={(e) => e.key === "Enter" && onOpenMedication?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <PillsIcon />
                </div>
                <div className="chev" aria-hidden="true">
                  ›
                </div>
              </div>

              <div className="dataTitle">{isLongevity ? "Supplements" : "Medikation"}</div>
              <div className="dataSub">
                {isLongevity ? "B12, Zink, Omega-3" : "Heute: B12 ✓, Zink"}
              </div>
            </div>

            {/* Nutrition */}
            <div
              className="dataCard dataCard--amber"
              role="button"
              tabIndex={0}
              onClick={onOpenNutrition}
              onKeyDown={(e) => e.key === "Enter" && onOpenNutrition?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <RestaurantIcon />
                </div>
                <div className="chev" aria-hidden="true">
                  ›
                </div>
              </div>

              <div className="dataTitle">Ernährung</div>
              <div className="dataSub">2 Mahlzeiten</div>
            </div>

            {/* Check-Ups */}
            <div
              className="dataCard dataCard--blue"
              role="button"
              tabIndex={0}
              onClick={onOpenCheckups}
              onKeyDown={(e) => e.key === "Enter" && onOpenCheckups?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <CheckupsInlineIcon />
                </div>
                <div className="chev" aria-hidden="true">
                  ›
                </div>
              </div>

              <div className="dataTitle">Termine</div>
              <div className="dataSub">Nächster: 24. Jan</div>
            </div>

            {/* Body */}
            <div
              className="dataCard dataCard--pink"
              role="button"
              tabIndex={0}
              onClick={onOpenBody}
              onKeyDown={(e) => e.key === "Enter" && onOpenBody?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <BodyInlineIcon />
                </div>
                <div className="chev" aria-hidden="true">
                  ›
                </div>
              </div>

              <div className="dataTitle">{isLongevity ? "Body" : "Symptome"}</div>              
              <div className="dataSub">{isLongevity ? "Letzter Scan: 5. Jan" : "Letzter Eintrag: Heute: 8:15"}</div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Nav (NICHT ÄNDERN) */}
      <nav className="home-navigation">
        <button className="home-nav-item" onClick={onBackToHome} type="button">
          <HomeIcon className="home-nav-icon" />
          <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item" onClick={onOpenChat} type="button">
          <AssistantIcon className="home-nav-icon" />
          <span className="home-nav-label">Assistent</span>
        </button>

        <button className="home-nav-item home-nav-item--active" type="button">
          <FolderIcon className="home-nav-icon" />
          <span className="home-nav-label">Ordner</span>
        </button>
      </nav>
    </div>
  );
}
