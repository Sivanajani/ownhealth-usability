import "./onboardingStart.css";
import "../../assets/own_verbinden.png";

type Props = {
  onNext?: () => void;
};

const items = [
  { label: "Wearables", color: "#22C55E", icon: "⌚" },
  { label: "Medikation", color: "#EF4444", icon: "💊" },
  { label: "Dokumente", color: "#3B82F6", icon: "📄" },
  { label: "Apps", color: "#10B981", icon: "📱" },
  { label: "Ernährung", color: "#F59E0B", icon: "🍎" },
  { label: "Mentale\nGesundheit", color: "#A855F7", icon: "🧠" },
  { label: "Hausarzt", color: "#8B5CF6", icon: "🩺" },
  { label: "Bluttests", color: "#60A5FA", icon: "🧪" },
];

export default function Onboarding1({ onNext }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content">
        <div className="ob-brand">
          <h1 className="ob1-title">
            Verbinde, was
            <br />
            zusammengehört
          </h1>

          {/* Graph: wir bleiben bei ob1-* für diese Spezialteile */}
          <div className="ob1-graphWrap" aria-hidden="true">
            <div className="ob1-hub">
              <span className="ob1-hubText">OWN</span>
            </div>

            {items.map((it, i) => (
              <div key={it.label} className={`ob1-node ob1-node-${i}`}>
                <div className="ob1-nodeCard" style={{ borderColor: `${it.color}55` }}>
                  <div className="ob1-nodeIcon" style={{ color: it.color }}>
                    {it.icon}
                  </div>
                </div>
                <div className="ob1-nodeLabel">{it.label}</div>
              </div>
            ))}

            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`ob1-line ob1-line-${i}`} />
            ))}
          </div>
        </div>

        <div>
          {/* Button: auch ob-button, damit exakt gleich */}
          <button className="ob-button" onClick={onNext}>
            Mein Konto erstellen
          </button>

          <div className="ob1-footnote">Kostenlos • 🔒 Sicher verschlüsselt</div>
        </div>
      </div>
    </div>
  );
}
