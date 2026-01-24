import WatchIcon from "../../assets/smartwatch.svg?react";
import DrugIcon from "../../assets/pills.svg?react";
import DocuIcon from "../../assets/document.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import BloodIcon from "../../assets/medical.svg?react";
import BrainIcon from "../../assets/brain.svg?react";
import DoctorIcon from "../../assets/stethoscope.svg?react";
import AppIcon from "../../assets/smartphone-call.svg?react";
import "../onboarding/onboarding0.css";
import "../onboarding/onboardingStart.css";

type Props = {
  onNext?: () => void;
  onClose?: () => void;
};

export default function Onboarding0({ onNext }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content obS2-content">
        {/* Top */}
        <div className="ob-top obS2-top">
          <div className="ob0-dots" aria-label="Onboarding Progress">
            <span className="ob0-dot ob0-dot--active" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
            <span className="ob0-dot" />
          </div>



          <h1 className="obS2-title">            
            Gesundheitsdaten <br />
            sind überall verstreut
          </h1>
        </div>

        {/* Middle */}
        <div className="ob-middle obS2-middle">
          <div className="obS2-tiles" aria-hidden="true">
            <div className="obS2-tile obS2-tile--blue obS2-pos--doc">
              <DocuIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--orange obS2-pos--watch">
              <WatchIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--green obS2-pos--phone">
              <AppIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--pink obS2-pos--brain">
              <BrainIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--purple obS2-pos--pill">
              <DrugIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--slate obS2-pos--clinic">
              <DoctorIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--yellow obS2-pos--food">
              <FoodIcon className="obS2-svg" />
            </div>

            <div className="obS2-tile obS2-tile--red obS2-pos--blood">
              <BloodIcon className="obS2-svg" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="ob-bottom obS2-bottom">
          <p className="obS2-footnote">
            Viele Daten.
            <br />
            <span>Kein Überblick.</span>
          </p>

          <button className="ob-button" onClick={onNext}>
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}
