// nutrition.tsx
import "../../styles/appShell.css";
import "./nutrition.css";

import LeafIcon from "../../assets/leaf.svg?react";
import FireIcon from "../../assets/fire.svg?react";
import MeatIcon from "../../assets/meat.svg?react";

import ChickenIcon from "../../assets/chicken-leg.svg?react";
import CoffeeIcon from "../../assets/coffee.svg?react";
import WarningIcon from "../../assets/warning.svg?react";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

export type FocusKey = "longevity" | "chronic";

type Props = {
  focusKey: FocusKey;

  onBack?: () => void;
  onBackToHome?: () => void;
  onBackToChat?: () => void;
  onOpenFolder?: () => void;

  onAddMeal?: () => void;      
  onOpenHistory?: () => void;  
};

const todayLabel = new Intl.DateTimeFormat("de-CH", {
  day: "2-digit",
  month: "short",
}).format(new Date());

export default function Nutrition({
  focusKey,
  onBack,
  onBackToHome,
  onBackToChat,
  onOpenFolder,
  onAddMeal,
  onOpenHistory,
}: Props) {
  const isLongevity = focusKey === "longevity";

  return (
    <div className="oh-screen nut-bg">
      <div className="oh-safe nut-safe">
        {/* Header */}
        <header className="nut-header">
          <button className="docs-back" onClick={onBack} type="button">
            <span className="docs-backArrow" aria-hidden="true">‹</span>
            <span>Zurück</span>
          </button>
          <h1 className="underfolder-title">Ernährung</h1>
          <div className="nut-spacer" />
        </header>

        {/* Summary Card */}
        <section className="nut-hero">
          <div className="nut-heroTop">
            <div className="nut-heroKicker">HEUTE</div>
            <div className="nut-heroDate">{todayLabel}</div>
          </div>

          <div className="nut-kcalRow">
            <div className="nut-kcalMain">1550</div>
            <div className="nut-kcalSub">/2100 kcal</div>
          </div>

          <div className="nut-progress">
            <div className="nut-progressFill" style={{ width: "74%" }} />
          </div>

          <div className="nut-macros">
            <div className="nut-macro">
              <div className="nut-macroTop">
                <FireIcon className="nut-ico nut-ico--amber" aria-hidden="true" />
                <span className="nut-macroValue">75g</span>
              </div>
              <div className="nut-macroBar">
                <span className="nut-macroFill nut-macroFill--amber" style={{ width: "63%" }} />
              </div>
              <div className="nut-macroPct nut-macroPct--amber">63%</div>
            </div>

            <div className="nut-macro">
              <div className="nut-macroTop">
                <LeafIcon className="nut-ico nut-ico--mint" aria-hidden="true" />
                <span className="nut-macroValue">210g</span>
              </div>
              <div className="nut-macroBar">
                <span className="nut-macroFill nut-macroFill--mint" style={{ width: "91%" }} />
              </div>
              <div className="nut-macroPct nut-macroPct--mint">91%</div>
            </div>

            <div className="nut-macro">
              <div className="nut-macroTop">
                <MeatIcon className="nut-ico nut-ico--amber" aria-hidden="true" />
                <span className="nut-macroValue">45g</span>
              </div>
              <div className="nut-macroBar">
                <span className="nut-macroFill nut-macroFill--amber" style={{ width: "64%" }} />
              </div>
              <div className="nut-macroPct nut-macroPct--amber">64%</div>
            </div>
          </div>
        </section>

        {/* Meals */}
        <div className="nut-sectionLabel">MAHLZEITEN (3)</div>

        <section className="nut-meals">
          <button className="nut-mealCard nut-mealCard--blue" type="button">
            <div className="nut-mealIcon nut-mealIcon--blue" aria-hidden="true">
              <CoffeeIcon className="nut-mealSvg" />
            </div>
            <div className="nut-mealText">
              <div className="nut-mealTitle">Haferflocken mit Beeren</div>
              <div className="nut-mealMeta">350 kcal • 08:00</div>
            </div>
          </button>

          <button className="nut-mealCard nut-mealCard--red" type="button">
            <div className="nut-mealIcon nut-mealIcon--red" aria-hidden="true">
              <MeatIcon className="nut-mealSvg" />
            </div>
            <div className="nut-mealText">
              <div className="nut-mealTitle">Lachs-Bowl</div>
              <div className="nut-mealMeta">650 kcal • 13:30</div>
            </div>
          </button>

          <button className="nut-mealCard nut-mealCard--amber" type="button">
            <div className="nut-mealIcon nut-mealIcon--amber" aria-hidden="true">
              <ChickenIcon className="nut-mealSvg" />
            </div>
            <div className="nut-mealText">
              <div className="nut-mealTitle">Protein-Shake</div>
              <div className="nut-mealMeta">550 kcal • 19:00</div>
            </div>
          </button>
        </section>

        {/* Tips row (Longevity) */}
        {isLongevity && (
          <section className="nut-insights">
            <div className="nut-insightCard nut-insightCard--warn">
              <div className="nut-insightIcon nut-insightIcon--warn" aria-hidden="true">
                <WarningIcon className="nut-insightSvg" />
              </div>

              <div className="nut-insightText">
                <div className="nut-insightTitle">45g Protein fehlen</div>
                <div className="nut-insightMeta">Shake oder Quark</div>
              </div>
            </div>

            <div className="nut-insightCard nut-insightCard--ok">
              <div className="nut-insightIcon nut-insightIcon--ok" aria-hidden="true">
                ✓
              </div>

              <div className="nut-insightText">
                <div className="nut-insightTitle">Stoffwechsel stabil</div>
                <div className="nut-insightMeta">Zellschutz</div>
              </div>
            </div>
          </section>
        )}


        {/* Wirkung */}
        <div className="nut-sectionLabel">WIRKUNG</div>

        <section className="nut-effectCard">
          <div className="nut-effectRow">
            <div className="nut-effectTitle">
              Seit präziser Makro-Steuerung (14 Tage):
            </div>

            <div className="nut-spark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="nut-effectMetaPills">
            <span className="nut-pill">
              <span className="nut-pillPlus" aria-hidden="true">+</span>
              Energie&nbsp;<strong>12%</strong>
            </span>

            <span className="nut-pill">
              <span className="nut-pillPlus" aria-hidden="true">+</span>
              Biologische Vitalität&nbsp;<strong>8%</strong>
            </span>
          </div>
        </section>

        {/* Verlauf */}
        <button className="nut-historyBtn" type="button" onClick={onOpenHistory}>
          <div className="nut-historyLeft">
            <div className="nut-historyTitle">Verlauf</div>
            <div className="nut-historyMeta">Durchschnitt, Trends, Details</div>
          </div>
          <span className="nut-historyChevron" aria-hidden="true">›</span>
        </button>
      </div>

      {/* Sticky Add Button (klickbar) */}
      <div className="nut-stickyCta">
        <button className="nut-primaryBtn" type="button" onClick={onAddMeal}>
          <span className="nut-plus" aria-hidden="true">+</span>
          Mahlzeit hinzufügen
        </button>
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
