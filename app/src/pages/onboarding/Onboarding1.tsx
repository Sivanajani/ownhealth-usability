import "./onboardingStart.css";
import "./CircularMenu.scss";
import WatchIcon from "../../assets/smartwatch.svg?react";
import DrugIcon from "../../assets/pills.svg?react";
import DocuIcon from "../../assets/document.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import BloodIcon from "../../assets/medical.svg?react";
import BrainIcon from "../../assets/brain.svg?react";
import DoctorIcon from "../../assets/stethoscope.svg?react";
import AppIcon from "../../assets/smartphone-call.svg?react";


import ownLogo from "../../assets/own.logo.svg";

type Props = {
  onNext?: () => void;
  onBack?: () => void;
};

export default function Onboarding1({ onNext, onBack }: Props) {
    const menuItems = [
      { label: "Wearables", Icon: WatchIcon },
      { label: "Medikation", Icon: DrugIcon },
      { label: "Dokumente", Icon: DocuIcon },
      { label: "Ernährung", Icon: FoodIcon },
      { label: "Bluttests", Icon: BloodIcon },
      { label: "Mentale\nGesundheit", Icon: BrainIcon },
      { label: "Hausarzt", Icon: DoctorIcon },
      { label: "Apps", Icon: AppIcon },
    ];

    return (
        <div className="ob-root">
      <div className="ob-content ob1-content">
        {/* Top */}
        <div className="ob-top ob1-top">
          <div className="ob1-topbar">
            <div className="ob0-dots" aria-hidden="true">
              <span className="ob0-dot ob0-dot--active" />
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

          <h1 className="ob-title">
            OWN verbindet
            <br />
            ALLE deine Daten
          </h1>
        </div>

        {/* Middle */}
          <div className="ob-middle ob1-middle">
              <div className="menu-container">
                  <div className="center-hub">
                      <img className="own-center-logo" src={ownLogo} alt="OWN" />
                  </div>

                  <div className="circle-wrapper">
                      {menuItems.map((item, index) => (
                          <div key={index} className="menu-item">
                              <div className="menu-box">
                                  <item.Icon className="menu-icon" aria-hidden="true" />
                              </div>
                              <span className="menu-label">{item.label}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

        {/* Bottom */}
        <div className="ob-bottom ob2-bottom">
          <button className="ob-button" onClick={onNext}>
            Zusammenführung starten
          </button>          
        </div>
      </div>
    </div>
  );
}
