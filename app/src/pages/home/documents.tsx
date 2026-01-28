import { useMemo, useState } from "react";
import "../../styles/appShell.css";
import "./documents.css";

import BloodIcon from "../../assets/blood.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import CtScanIcon from "../../assets/mri.svg?react";
import PillsIcon from "../../assets/pills.svg?react";
import InjectionIcon from "../../assets/injection.svg?react";
import SearchIcon from "../../assets/loop.svg?react";
import BodyIcon from "../../assets/digital.svg?react";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import AddIcon from "../../assets/add.svg?react";
import SparkleIcon from "../../assets/sparkle.svg?react";

import type { FocusKey } from "../../types/focus";

type Props = {
  focusKey: FocusKey;

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
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ChipKey = "all" | "crohn" | "diabetes" | "rheuma";

export default function Documents({
  focusKey,
  onBack,
  onOpenCategory,
  onOpenFolder,
  onBackToChat,
  onBackToHome,
}: Props) {
  const isLongevity = focusKey === "longevity";
  const [query, setQuery] = useState("");

  // Chronic: Fachbereiche (Chips)
  const [chip, setChip] = useState<ChipKey>("all");

  const chips = useMemo(
    () => [
      { key: "all" as const, label: "Alle" },
      { key: "crohn" as const, label: "Morbus Crohn" },
      { key: "diabetes" as const, label: "Diabetes" },
      { key: "rheuma" as const, label: "Rheuma" },
    ],
    []
  );

  // Longevity Kategorien (wie du sie schon hast)
  const longevityCategories = useMemo<Category[]>(
    () => [
      { key: "blood", title: "Blutanalysen", count: 6, newest: "12. Jan", Icon: BloodIcon },
      { key: "letters", title: "Arztbriefe", count: 8, newest: "5. Jan", Icon: DocumentIcon },
      { key: "ct", title: "CT/MRT", count: 4, newest: "12. Nov", Icon: CtScanIcon },
      { key: "bodyscans", title: "Body-Scans", count: 3, newest: "22. Dez", Icon: BodyIcon },
      { key: "rx", title: "Rezepte", count: 12, newest: "", Icon: PillsIcon },
      { key: "vacc", title: "Impfungen", count: 7, newest: "", Icon: InjectionIcon },
    ],
    []
  );

  // Chronic Dokument-Typen (wie Screenshot)
  const chronicCategories = useMemo<Category[]>(
    () => [
      { key: "blood", title: "Bluttests", count: 4, newest: "10. Jan", Icon: BloodIcon },
      { key: "letters", title: "Arztbriefe", count: 12, newest: "08. Jan", Icon: DocumentIcon },
      { key: "rx", title: "Rezepte", count: 2, newest: "05. Jan", Icon: PillsIcon },
      { key: "ct", title: "Bilder (CT/MRT)", count: 1, newest: "22. Dez", Icon: CtScanIcon },
      { key: "vacc", title: "Impfungen", count: 3, newest: "15. Dez", Icon: InjectionIcon },
    ],
    []
  );

  const baseList = isLongevity ? longevityCategories : chronicCategories;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseList;
    return baseList.filter((c) => c.title.toLowerCase().includes(q));
  }, [baseList, query]);

  return (
    <div className="oh-screen docs-bg">
      <div className="oh-safe docs-safe">
        {/* Header */}
        <header className="docs-header docs-header--tight">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>

          <h1 className="underfolder-title">Dokumente</h1>

          <div className="docs-headerRight" />
        </header>

        {/* Search */}
        <div className="docs-search">
          <SearchIcon className="docs-searchSvg" aria-hidden="true" />
          <input
            className="docs-searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isLongevity ? "Biomarker oder Dokumente suchen..." : "Dokumente durchsuchen..."}
          />
        </div>

        {/* Chronic-only: Insight card + Fachbereiche */}
        {!isLongevity && (
          <>
            <section className="docs-insightCard">
              <div className="docs-insightIcon" aria-hidden="true">
                <SparkleIcon className="docs-insightIconSvg" />
              </div>
              <div className="docs-insightText">
                <div className="docs-insightTitle">Vollständigkeits-Check</div>
                <div className="docs-insightBody">
                  Dein letztes Blutbild wurde automatisch unter Morbus Crohn einsortiert. Für dein Rheuma-Profil
                  fehlt noch der aktuelle Arztbrief.
                </div>
              </div>
            </section>

            <div className="docs-subLabel">Deine Fachbereiche</div>
            <div className="docs-chipsRow" role="tablist" aria-label="Fachbereiche">
              {chips.map((c) => {
                const active = chip === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    className={`docs-chip ${active ? "docs-chip--active" : ""}`}
                    onClick={() => setChip(c.key)}
                    role="tab"
                    aria-selected={active}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Section header row */}
        <div className="docs-rowHeader">
          <div className="docs-sectionLabel docs-sectionLabel--noTop">
            {isLongevity ? "Kategorien" : "Dokumenten-Typen"}
          </div>

          <button className="docs-plusMini" type="button" aria-label="Kategorie hinzufügen">
            <AddIcon className="docs-plusMiniIcon" aria-hidden="true" />
          </button>
        </div>

        {/* List */}
        <div className="docs-list">
          {filtered.map(({ key, title, count, newest, Icon }) => (
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
                    <span>
                      {count} Dokument{count === 1 ? "" : "e"}
                    </span>

                    {newest ? (
                      <>
                        <span className="docs-dot" aria-hidden="true">
                          •
                        </span>
                        <span>Neueste: {newest}</span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="docs-chevron" aria-hidden="true">
                ›
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <button className="docs-addBtn docs-addBtn--teal" type="button">
          <AddIcon className="docs-addBtnIcon" aria-hidden="true" />
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
