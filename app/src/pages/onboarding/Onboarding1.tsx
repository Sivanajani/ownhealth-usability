import "./onboardingStart.css";
import verbindenImg from "../../assets/own_verbinden.png";

type Props = {
  onNext?: () => void;
};

export default function Onboarding1({ onNext }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content">
        <div className="ob-brand">          
          
          <h1 className="ob-title">
            Verbindet, was
            <br />
            zusammengehört
          </h1>
          
          <p className="ob-subtitle">
            OWN vereint alle Gesundheitsdaten –
            <br />
            <span className="ob-subtitle-strong">zu einem Gesamtbild.</span>
            <br/>                                    
          </p>

          {/* GRAPHIC */}
          <div className="ob-graphicWrap">
            <img
              src={verbindenImg}
              alt="Gesundheitsdaten verbinden"
              className="ob-graphic"
            />
          </div>
        </div>

        <div>
          <button className="ob-button" onClick={onNext}>
            Mein Konto erstellen
          </button>


          <div className="ob-footnote">
            Kostenlos • 🔒 Sicher verschlüsselt
          </div>
        </div>
      </div>
    </div>
  );
}
