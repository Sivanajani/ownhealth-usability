import "../../styles/appShell.css";
import "./folder.css";

import TrendIcon from "../../assets/trend.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import FileIcon from "../../assets/file.svg?react";

import SmartwatchIcon from "../../assets/smartwatch.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import PillsIcon from "../../assets/pills.svg?react";
import RestaurantIcon from "../../assets/restaurant.svg?react";

import CameraIcon from "../../assets/camera.svg?react";
import UploadIcon from "../../assets/upload.svg?react";

import ChatIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

type Props = {
  onBackToChat?: () => void;

  onOpenWearables?: () => void;
  onOpenDocuments?: () => void;
  onOpenMedication?: () => void;
  onOpenNutrition?: () => void;
};

export default function Folder({
  onBackToChat,
  onOpenWearables,
  onOpenDocuments,
  onOpenMedication,
  onOpenNutrition,
}: Props) {
  return (
    <div className="oh-screen folder-bg">
      <div className="oh-safe folder-safe">
        {/* Header */}
        <header className="folder-header">
          <div className="folder-titleBlock">
            <h1 className="folder-title">Ordner</h1>
            <div className="folder-sub">
              <span className="folder-lock" aria-hidden="true">🔒</span>
              <span>Sicher verschlüsselt</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="folder-content">
          <div className="folder-sectionLabel">INSIGHTS</div>

          <div className="insightCard insightCard--good">
            <div className="insightIcon" aria-hidden="true">
              <TrendIcon />
            </div>
            <div className="insightText">
              <div className="insightTitle">Schlaf verbessert!</div>
              <div className="insightMeta">+23% seit Magnesium</div>
            </div>
          </div>

          <div className="insightCard insightCard--warn">
            <div className="insightIcon" aria-hidden="true">
              <WarningIcon />
            </div>
            <div className="insightText">
              <div className="insightTitle">Vitamin D niedrig</div>
              <div className="insightMeta">18 ng/ml (Ziel: 30+)</div>
            </div>
          </div>

          <button className="summaryBtn">
            <span className="summaryIcon" aria-hidden="true">
              <FileIcon />
            </span>
            <span>Arzt-Summary erstellen</span>
          </button>

          <div className="folder-sectionLabel folder-sectionLabel--spaced">
            MEINE DATEN
          </div>

          <div className="folder-grid">
            {/* Wearables */}
            <div
              className="dataCard dataCard--teal"
              role="button"
              tabIndex={0}
              onClick={onOpenWearables}
              onKeyDown={(e) => e.key === "Enter" && onOpenWearables?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <SmartwatchIcon />
                </div>
                <div className="chev" aria-hidden="true">›</div>
              </div>

              <div className="dataTitle">Wearables</div>
              <div className="dataSub">Apple Health • Live</div>

              <div className="dataBottom">
                <div className="dataStrong">Sehr aktiv</div>
                <div className="dataMeta">12,450 Schritte</div>
                <div className="dataMeta">72 Std. Erholt ↗</div>
              </div>
            </div>

            {/* Dokumente */}
            <div
              className="dataCard dataCard--indigo"
              role="button"
              tabIndex={0}
              onClick={onOpenDocuments}
              onKeyDown={(e) => e.key === "Enter" && onOpenDocuments?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <DocumentIcon />
                </div>
                <div className="chev" aria-hidden="true">›</div>
              </div>

              <div className="dataTitle">Dokumente</div>
              <div className="dataSub">12 Dateien</div>

              <div
                className="dataActions"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="pillBtn" aria-label="Kamera">
                  <CameraIcon />
                </button>
                <button className="pillBtn" aria-label="Upload">
                  <UploadIcon />
                </button>
              </div>
            </div>

            {/* Medikation */}
            <div
              className="dataCard dataCard--purple"
              role="button"
              tabIndex={0}
              onClick={onOpenMedication}
              onKeyDown={(e) => e.key === "Enter" && onOpenMedication?.()}
            >
              <div className="dataTop">
                <div className="dataIcon" aria-hidden="true">
                  <PillsIcon />
                </div>
                <div className="chev" aria-hidden="true">›</div>
              </div>

              <div className="dataTitle">Medikation</div>
              <div className="dataSub">Heute:</div>
              <div className="dataMeta">B12 ✓</div>
              <div className="dataMeta">Zink</div>

              <button
                className="dataFooterBtn"
                aria-label="Scannen"
                onClick={(e) => e.stopPropagation()}
              >
                <CameraIcon />
              </button>
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
                <div className="chev" aria-hidden="true">›</div>
              </div>

              <div className="dataTitle">Ernährung</div>
              <div className="dataSub">Heute: 1,850 kcal</div>
              <div className="dataMeta">• 2 Mahlzeiten</div>

              <button
                className="dataFooterBtn"
                aria-label="Scannen"
                onClick={(e) => e.stopPropagation()}
              >
                <CameraIcon />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="bottomNav">
        <button className="navItem" onClick={onBackToChat} type="button">
          <span className="navIcon" aria-hidden="true">
            <ChatIcon className="navSvg" />
          </span>
          <span>Chat</span>
        </button>

        <button className="navItem navItem--active" >
          <span className="navIcon" aria-hidden="true">
            <FolderIcon className="navSvg" />
          </span>
          <span>Ordner</span>
        </button>
      </nav>      
    </div>
  );
}
