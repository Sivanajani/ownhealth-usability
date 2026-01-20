import { useState } from "react";
import "../onboarding/onboardingStart.css";
import "../onboarding/onboarding6.css";

import appleHealthPng from "../../assets/apple.png";
import AppIcon from "../../assets/smartphone-call.svg?react";
import LockIcon from "../../assets/lock.svg?react";
import ArrowRightIcon from "../../assets/right-arrow.svg?react";
import ArrowLeftIcon from "../../assets/arrow.svg?react";

type Props = {
  onConnect: () => void;
  onLater: () => void;
};

export default function Onboarding6({ onConnect, onLater }: Props) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 2000);
  };

  return (
    <div className="ob-root">
      <div className="ob-content ob6-content">
        <div className="ob0-dots" aria-hidden="true">
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
        </div>

        <div className="ob6-header">
          <h1 className="ob6-title">Starten wir die Zusammenführung</h1>
          <p className="ob6-subtitle">
            Verbinde Apple Health, um eine personalisierte Antwort auf deine Frage zu erhalten.
          </p>
        </div>

        <div className="ob6-visual">
          {/* Handy bleibt als Kachel */}
          <div className="ob6-device">
            <AppIcon className="ob6-device-icon" />
          </div>

          <div className="ob6-arrows">
            <ArrowRightIcon className="ob6-arrow-icon ob6-arrow-right" />
            <ArrowLeftIcon className="ob6-arrow-icon ob6-arrow-left" />
          </div>

          {/* Apple Health OHNE Kachel */}
          <div className="ob6-apple">
            <img src={appleHealthPng} alt="Apple Health" className="ob6-apple-img" />
          </div>
        </div>

        <div className="ob6-lock">
          <div className="ob6-checkbox">
            <LockIcon className="ob6-lock-icon" />
          </div>
          <span>Sicher verschlüsselt</span>
        </div>

        <div className="ob6-cta">
          <button
            className={`ob-button ob6-button ${isConnecting ? "ob6-connecting" : ""}`}
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <div className="ob6-spinner"></div>
                <span>Verbinde...</span>
              </>
            ) : (
              <>
                <LockIcon className="ob6-button-lock-icon" />
                <span>Apple Health verbinden</span>
              </>
            )}
          </button>

          <button className="ob6-later" onClick={onLater}>
            Später einrichten
          </button>
        </div>
      </div>
    </div>
  );
}
