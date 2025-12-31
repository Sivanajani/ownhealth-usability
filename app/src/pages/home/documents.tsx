import { useMemo, useState } from "react";
import "../../styles/appShell.css";
import "./documents.css";

import BloodIcon from "../../assets/blood.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import CtScanIcon from "../../assets/ct-scan.svg?react";
import PillsIcon from "../../assets/pills.svg?react";
import InjectionIcon from "../../assets/injection.svg?react";
import SearchIcon from "../../assets/loop.svg?react";

import ChatIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

type Props = {
  onBack?: () => void;
  onOpenCategory?: (key: string) => void;

  onBackToChat?: () => void;
  onBackToFolder?: () => void;
};

type Category = {
  key: string;
  title: string;
  count: number;
  newest: string;
  tone: "red" | "blue" | "purple" | "amber" | "green";
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function Documents({ onBack, onOpenCategory, onBackToChat, onBackToFolder }: Props) {
  const [query, setQuery] = useState("");

  const categories = useMemo<Category[]>(
    () => [
      { key: "blood", title: "Bluttests", count: 4, newest: "6. November", tone: "red", Icon: BloodIcon },
      { key: "letters", title: "Arztbriefe", count: 5, newest: "20. November", tone: "blue", Icon: DocumentIcon },
      { key: "ct", title: "CT/MRT", count: 2, newest: "15. Oktober", tone: "purple", Icon: CtScanIcon },
      { key: "rx", title: "Rezepte", count: 1, newest: "3. Oktober", tone: "amber", Icon: PillsIcon },
      { key: "vacc", title: "Impfungen", count: 3, newest: "12. November", tone: "green", Icon: InjectionIcon },
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
        <header className="docs-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>

          <h1 className="underfolder-title">Dokumente</h1>
          <div className="docs-headerSpacer" />
        </header>

        <div className="docs-search">
          <SearchIcon className="docs-searchSvg" aria-hidden="true" />
          <input
            className="docs-searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Dokumente durchsuchen..."
          />
        </div>

        <div className="docs-sectionLabel">KATEGORIEN</div>

        <div className="docs-list">
          {filtered.map(({ key, title, count, newest, tone, Icon }) => (
            <button
              key={key}
              type="button"
              className={`docs-card docs-card--${tone}`}
              onClick={() => onOpenCategory?.(key)}
            >
              <div className="docs-cardLeft">
                <div className={`docs-iconWrap docs-iconWrap--${tone}`} aria-hidden="true">
                  <Icon className="docs-iconSvg" />
                </div>

                <div className="docs-cardText">
                  <div className="docs-cardTitle">{title}</div>
                  <div className="docs-cardMeta">
                    <span>{count} Dokument{count === 1 ? "" : "e"}</span>
                    <span className="docs-dot" aria-hidden="true">•</span>
                    <span>Neueste: {newest}</span>
                  </div>
                </div>
              </div>

              <div className="docs-chevron" aria-hidden="true">›</div>
            </button>
          ))}
        </div>

        <button className="docs-addBtn" type="button">
          <span className="docs-addPlus" aria-hidden="true">＋</span>
          Kategorie hinzufügen
        </button>
      </div>

      {/* Bottom Nav exakt wie Wearables (Emoji, active state, klickbar) */}
      <nav className="bottomNav">
        <button className="navItem" onClick={onBackToChat} disabled={!onBackToChat} type="button">
          <span className="navIcon" aria-hidden="true">
            <ChatIcon className="navSvg" />
          </span>
          <span>Chat</span>
        </button>

        <button className="navItem navItem--active" type="button" onClick={onBackToFolder} disabled={!onBackToFolder} >
          <span className="navIcon" aria-hidden="true">
            <FolderIcon className="navSvg" />
          </span>
          <span>Ordner</span>
        </button>
      </nav>        
    </div>
  );
}
