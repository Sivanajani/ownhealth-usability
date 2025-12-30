// wearables.tsx
import "../../styles/appShell.css";
import "./wearables.css";

type Props = {
  onBack?: () => void;
  onBackToChat?: () => void;
  onBackToFolder?: () => void;
};


export default function Wearables({ onBack, onBackToChat, onBackToFolder }: Props) {
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

        {/* Scrollbarer Inhalt */}
        <main className="wear-content">
          {/* Top Card */}
          <section className="wear-heroCard">
            <div className="wear-heroTop">
              <div className="wear-heroLeft">
                <div className="wear-heroKicker">
                  <span className="wear-heart" aria-hidden="true">♡</span>
                  <span>HERZGESUNDHEIT</span>
                </div>
                <div className="wear-heroNav">
                  <button className="wear-miniBtn" aria-label="Zurück">‹</button>
                  <div className="wear-metric">
                    <div className="wear-metricValue">
                      <span className="wear-metricNum">48</span>
                      <span className="wear-metricUnit">ppm</span>
                    </div>
                    <div className="wear-pill">Sehr gut</div>
                  </div>
                  <button className="wear-miniBtn" aria-label="Weiter">›</button>
                </div>

                <div className="wear-subMetrics">
                  <span>HRV: 58ms</span>
                  <span>SpO2: 98%</span>
                </div>
              </div>
            </div>

            <div className="wear-bar">
              <span className="wear-barSeg wear-barSeg--g1" />
              <span className="wear-barSeg wear-barSeg--g2" />
              <span className="wear-barSeg wear-barSeg--o" />
            </div>
          </section>

          {/* KPI Grid */}
          <section className="wear-grid">
            <div className="wear-kpi wear-kpi--teal">
              <div className="wear-kpiTop">
                <span className="wear-dot wear-dot--teal" />
                <span className="wear-kpiLabel">Sehr aktiv</span>
              </div>
              <div className="wear-kpiValue">12.450</div>
              <div className="wear-kpiMeta">124% Ziel</div>
            </div>

            <div className="wear-kpi wear-kpi--amber">
              <div className="wear-kpiTop">
                <span className="wear-dot wear-dot--amber" />
                <span className="wear-kpiLabel">Gut</span>
              </div>
              <div className="wear-kpiValue">7,2h</div>
              <div className="wear-kpiMeta">80% Ziel</div>
            </div>

            <div className="wear-kpi wear-kpi--mint">
              <div className="wear-kpiTop">
                <span className="wear-dot wear-dot--mint" />
                <span className="wear-kpiLabel">Erholt</span>
              </div>
              <div className="wear-kpiValue">58ms</div>
              <div className="wear-kpiMeta">+8ms vs. Ø</div>
            </div>

            <div className="wear-kpi">
              <div className="wear-kpiTop">
                <span className="wear-dot" />
                <span className="wear-kpiLabel">Entspannt</span>
              </div>
              <div className="wear-kpiValue">Niedrig</div>
              <div className="wear-kpiMeta">23 von 100</div>
            </div>

            <div className="wear-kpi wear-kpi--mint">
              <div className="wear-kpiTop">
                <span className="wear-dot wear-dot--mint" />
                <span className="wear-kpiLabel">Sehr gut</span>
              </div>
              <div className="wear-kpiValue">2.450</div>
              <div className="wear-kpiMeta">kcal</div>
            </div>

            <div className="wear-kpi wear-kpi--amber">
              <div className="wear-kpiTop">
                <span className="wear-dot wear-dot--amber" />
                <span className="wear-kpiLabel">Fast da</span>
              </div>
              <div className="wear-kpiValue">10/12</div>
              <div className="wear-kpiMeta">2h fehlen</div>
            </div>
          </section>

          {/* Für dich */}
          <div className="wear-sectionLabel">✨ FÜR DICH</div>

          <section className="wear-suggestions">
            <button className="wear-suggestCard" type="button">
              <div className="wear-suggestTitle">Früher ins Bett heute</div>
              <div className="wear-suggestMeta">47 Min Schlafdefizit</div>
              <div className="wear-suggestArrow" aria-hidden="true">›</div>
            </button>

            <button className="wear-suggestCard" type="button">
              <div className="wear-suggestTitle">HRV steigt weiter</div>
              <div className="wear-suggestMeta">Gute Erholungstendenz</div>
              <div className="wear-suggestArrow" aria-hidden="true">›</div>
            </button>

            <button className="wear-link" type="button">
              Alle Metriken anzeigen <span aria-hidden="true">›</span>
            </button>
          </section>

          {/* Device Card */}
          <section className="wear-deviceCard">
            <div className="wear-deviceIcon" aria-hidden="true">⌚</div>
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
        </main>
      </div>

      {/* Register (fix) */}
      <nav className="bottomNav">
        <button
        className="navItem"
        type="button"
        onClick={onBackToChat}
        disabled={!onBackToChat}
        >
            <span className="navIcon" aria-hidden="true">💬</span>
            <span>Chat</span>
        </button>

        <button
        className="navItem navItem--active"
        type="button"
        onClick={onBackToFolder}
        disabled={!onBackToFolder}
        >
            <span className="navIcon" aria-hidden="true">📁</span>
            <span>Ordner</span>
        </button>
        </nav>
    </div>
  );
}
