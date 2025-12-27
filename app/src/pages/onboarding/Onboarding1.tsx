import "./onboardingStart.css";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

export default function Onboarding1({ onNext, onBack }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content ob1-content">
        {/* Top */}
        <div className="ob-top ob1-top">
          <div className="ob1-topbar">
            <div className="ob0-dots" aria-hidden="true">
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot" />
              <span className="ob0-dot" />
            </div>

            {onBack && (
              <button
                className="ob1-topIcon"
                type="button"
                onClick={onBack}
                aria-label="Zurück"
              >
                ⟲
              </button>
            )}
          </div>

          <h1 className="ob1-title">
            Wir führen deine
            <br />
            Daten zusammen
          </h1>

          <p className="ob1-subtitle">
            OWN vereint alle Gesundheitsdaten
            <br />
            zu einem Gesamtbild.
          </p>
        </div>

        {/* Middle */}
        <div className="ob-middle ob1-middle">
          <div className="ob1-orbit">
            {/* Center */}
            <div className="ob1-center">
              <span className="ob1-centerText">OWN</span>
            </div>

            {/* Nodes */}
            <div className="ob1-node ob1-node--apps">
              <div className="ob1-nodeIcon">📱</div>
              <div className="ob1-nodeLabel">Apps</div>
            </div>

            <div className="ob1-node ob1-node--wearables">
              <div className="ob1-nodeIcon">⌚</div>
              <div className="ob1-nodeLabel">Wearables</div>
            </div>

            <div className="ob1-node ob1-node--meds">
              <div className="ob1-nodeIcon">💊</div>
              <div className="ob1-nodeLabel">Medikation</div>
            </div>

            <div className="ob1-node ob1-node--docs">
              <div className="ob1-nodeIcon">📄</div>
              <div className="ob1-nodeLabel">Dokumente</div>
            </div>

            <div className="ob1-node ob1-node--food">
              <div className="ob1-nodeIcon">🍎</div>
              <div className="ob1-nodeLabel">Ernährung</div>
            </div>

            <div className="ob1-node ob1-node--labs">
              <div className="ob1-nodeIcon">🧪</div>
              <div className="ob1-nodeLabel">Bluttests</div>
            </div>

            <div className="ob1-node ob1-node--mind">
              <div className="ob1-nodeIcon">🧠</div>
              <div className="ob1-nodeLabel">Mentale Gesundheit</div>
            </div>

            <div className="ob1-node ob1-node--doc">
              <div className="ob1-nodeIcon">🩺</div>
              <div className="ob1-nodeLabel">Hausarzt</div>
            </div>

            {/* Lines */}
            <div className="ob1-lines" aria-hidden="true">
              <span className="ob1-line ob1-line--apps" />
              <span className="ob1-line ob1-line--wearables" />
              <span className="ob1-line ob1-line--meds" />
              <span className="ob1-line ob1-line--docs" />
              <span className="ob1-line ob1-line--food" />
              <span className="ob1-line ob1-line--labs" />
              <span className="ob1-line ob1-line--mind" />
              <span className="ob1-line ob1-line--doc" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="ob-bottom ob1-bottom">
          <button className="ob-button" onClick={onNext}>
            Zusammenführung starten
          </button>

          <div className="ob1-footnote">30 Sekunden • 🔒 DSGVO-konform</div>
        </div>
      </div>
    </div>
  );
}
