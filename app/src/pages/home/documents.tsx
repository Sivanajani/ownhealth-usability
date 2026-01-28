import { useMemo, useState } from "react";
import "../../styles/appShell.css";
import "./documents.css";

import BloodIcon from "../../assets/blood.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import CtScanIcon from "../../assets/ct-scan.svg?react";
import PillsIcon from "../../assets/pills.svg?react";
import InjectionIcon from "../../assets/injection.svg?react";
import SearchIcon from "../../assets/loop.svg?react";
import Body from "../../assets/digital.svg?react";
import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";
import AddIcon from "../../assets/add.svg?react";

type Props = {
  onBack?: () => void;
  onOpenCategory?: (key: string) => void;

  onBackToChat?: () => void;
  onBackToHome?: () => void;
  onOpenFolder?: () => void;
};

type Category = {
  key: string;
  title: string;
  count: number;
  newest: string;
  tone: "teal";
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status?: string; 
};

export default function Documents({
  onBack,
  onOpenCategory,
  onOpenFolder,
  onBackToChat,
  onBackToHome,
}: Props) {
  const [query, setQuery] = useState("");

  const categories = useMemo<Category[]>(
    () => [
      { key: "blood", title: "Blutanalysen", count: 6, newest: "12. Jan", tone: "teal", Icon: BloodIcon },
      { key: "letters", title: "Arztbriefe", count: 8, newest: "5. Jan", tone: "teal", Icon: DocumentIcon },
      { key: "ct", title: "CT/MRT", count: 4, newest: "12. Nov", tone: "teal", Icon: CtScanIcon },
      { key: "bodyscans", title: "Body-Scans", count: 3, newest: "22. Dez", tone: "teal", Icon: Body },
      { key: "rx", title: "Rezepte", count: 12, newest: "", tone: "teal", Icon: PillsIcon },
      { key: "vacc", title: "Impfungen", count: 7, newest: "", tone: "teal", Icon: InjectionIcon, status: "Vollständig" },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.title.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <div className="oh-screen docs-bg">
      <div className="oh-safe docs-safe">
        {/* Header */}
        <header className="docs-header docs-header--tight">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>

          <h1 className="docs-title">Dokumente</h1>

          <div className="docs-headerRight" />
        </header>

        {/* Search */}
        <div className="docs-search">
          <SearchIcon className="docs-searchSvg" aria-hidden="true" />
          <input
            className="docs-searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Biomarker oder Dokumente suchen..."
          />
        </div>

        {/* Kategorien header row */}
        <div className="docs-rowHeader">
          <div className="docs-sectionLabel docs-sectionLabel--noTop">Kategorien</div>
          
          <button className="docs-plusMini" type="button" aria-label="Kategorie hinzufügen">
            <AddIcon className="docs-plusMiniIcon" aria-hidden="true" />
          </button>
        </div>

        {/* List */}
        <div className="docs-list">
          {filtered.map(({ key, title, count, newest, Icon, status }) => (
            <button
              key={key}
              type="button"
              className="docs-card docs-card--teal"
              onClick={() => onOpenCategory?.(key)}
            >
              <div className="docs-cardLeft">
                <div className="docs-iconWrap docs-iconWrap--teal" aria-hidden="true">
                  <Icon className="docs-iconSvg" />
                </div>

                <div className="docs-cardText">
                  <div className="docs-cardTitle">{title}</div>

                  <div className="docs-cardMeta">
                    <span>{count} Dokument{count === 1 ? "" : "e"}</span>

                    {newest ? (
                      <>
                        <span className="docs-dot" aria-hidden="true">•</span>
                        <span>Neueste: {newest}</span>
                      </>
                    ) : status ? (
                      <>
                        <span className="docs-dot" aria-hidden="true">•</span>
                        <span>{status}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="docs-chevron" aria-hidden="true">›</div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <button className="docs-addBtn docs-addBtn--teal" type="button">
          Dokument hinzufügen
        </button>

        <div className="docs-footHint">Die KI sortiert dein Dokument automatisch ein</div>
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

        <button className="home-nav-item home-nav-item--active" onClick={onOpenFolder} type="button">
          <FolderIcon className="home-nav-icon" />
          <span className="home-nav-label">Ordner</span>
        </button>
      </nav>
    </div>
  );
}
