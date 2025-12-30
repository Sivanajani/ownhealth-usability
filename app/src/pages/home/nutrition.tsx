// nutrition.tsx
import "../../styles/appShell.css";
import "./nutrition.css";

import LeafIcon from "../../assets/leaf.svg?react";
import FireIcon from "../../assets/fire.svg?react";
import MeatIcon from "../../assets/meat.svg?react";

import ChickenIcon from "../../assets/chicken-leg.svg?react";
import CoffeeIcon from "../../assets/coffee.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import TrendIcon from "../../assets/trend.svg?react";

import ChatIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

type Props = {
  onBack?: () => void;
  onBackToChat?: () => void;
  onBackToFolder?: () => void;
};

const todayLabel = new Intl.DateTimeFormat("de-CH", {
  day: "2-digit",
  month: "short",
}).format(new Date());


export default function Nutrition({ onBack, onBackToChat, onBackToFolder }: Props) {
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
              <div className="nut-mealTitle">Haferflocken mit Banane</div>
              <div className="nut-mealMeta">350 kcal • 09:00</div>
            </div>
          </button>

          <button className="nut-mealCard nut-mealCard--red" type="button">
            <div className="nut-mealIcon nut-mealIcon--red" aria-hidden="true">
              <MeatIcon className="nut-mealSvg" />
            </div>
            <div className="nut-mealText">
              <div className="nut-mealTitle">Pasta mit Tomatensoße</div>
              <div className="nut-mealMeta">650 kcal • 13:30</div>
            </div>
          </button>

          <button className="nut-mealCard nut-mealCard--amber" type="button">
            <div className="nut-mealIcon nut-mealIcon--amber" aria-hidden="true">
              <ChickenIcon className="nut-mealSvg" />
            </div>
            <div className="nut-mealText">
              <div className="nut-mealTitle">Hähnchen mit Gemüse</div>
              <div className="nut-mealMeta">550 kcal • 19:00</div>
            </div>
          </button>
        </section>

        {/* Tips row */}
        <section className="nut-tips">
          <div className="nut-tipCard">
            <div className="nut-tipTop">
              <WarningIcon className="nut-tipSvg nut-tipSvg--amber" aria-hidden="true" />
              <div className="nut-tipTitle">45g Protein fehlen</div>
            </div>
            <div className="nut-tipMeta nut-tipMeta--amber">Shake oder Quark</div>
          </div>

          <div className="nut-tipCard nut-tipCard--green">
            <div className="nut-tipTop">
              <span className="nut-check" aria-hidden="true">✓</span>
              <div className="nut-tipTitle">Carbs perfekt</div>
            </div>
            <div className="nut-tipMeta nut-tipMeta--mint">Energie für Training</div>
          </div>
        </section>

        {/* Wirkung */}
        <div className="nut-sectionLabel">WIRKUNG</div>

        <section className="nut-effectCard">
          <div className="nut-effectRow">
            <div className="nut-effectTitle">Seit höherem Protein (14 Tage):</div>
            <div className="nut-spark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="nut-effectMeta">
            <TrendIcon className="nut-historySvg" aria-hidden="true" />
            <span className="nut-positive">Energie +12%</span>
            <TrendIcon className="nut-historySvg" aria-hidden="true" />
            <span className="nut-positive">Workout +8%</span>
          </div>
        </section>

        {/* Verlauf */}
        <button className="nut-historyBtn" type="button">
        <div className="nut-historyLeft">
            <div className="nut-historyTitle">Verlauf</div>
            <div className="nut-historyMeta">Durchschnitt, Trends, Details</div>
        </div>

        <span className="nut-historyChevron" aria-hidden="true">›</span>
        </button>


        {/* Primary */}
        <button className="nut-primaryBtn" type="button">
          + Mahlzeit hinzufügen
        </button>
      </div>

      {/* Bottom Nav (AppShell) */}
      <nav className="bottomNav">
        <button className="navItem" type="button" onClick={onBackToChat} disabled={!onBackToChat}>
            <ChatIcon className="navSvg" aria-hidden="true" />
            <span>Chat</span>
        </button>
        
        <button className="navItem navItem--active" type="button" onClick={onBackToFolder} disabled={!onBackToFolder}>
            <FolderIcon className="navSvg" aria-hidden="true" />
            <span>Ordner</span>
        </button>
        </nav>
    </div>
  );
}
