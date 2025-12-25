import "./onboardingStart.css";
import ownLogo from "../../assets/own.logo.png";

type Props = {
  onStart?: () => void;
};

export default function OnboardingStart({ onStart }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content">
        <div className="ob-brand">
          <img className="ob-logo" src={ownLogo} alt="OWN Health" />

          <h1 className="ob-title">
            YOUR HEALTH
          </h1>

          <p className="ob-subtitle">
            Alle deine Gesundheitsdaten –
            <br />
            an einem sicheren Ort,
            <br/>
            intelligent verbunden.
            <br/>
            <span className="ob-subtitle-strong">In deiner Hand.</span>
          </p>
        </div>

        <button className="ob-button" onClick={onStart}>
          Start
        </button>        
      </div>
    </div>
  );
}
