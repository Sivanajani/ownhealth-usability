import "../onboarding/onboardingStart.css";
import "../onboarding/onboarding7.css";

import LockIcon from "../../assets/lock.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import UploadIcon from "../../assets/upload.svg?react";

type Props = {
  onTakePhoto: () => void;
  onUploadPdf: () => void;
  onSkip: () => void;
  onBack?: () => void;
};

export default function Onboarding7({ onTakePhoto, onUploadPdf, onSkip, onBack }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content ob7-content">
        {/* Fortschrittsanzeige */}
        <div className="ob0-dots" aria-hidden="true">
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot" />
          <span className="ob0-dot" />
        </div>

        {/* Back Button */}
        {onBack && (
          <button className="ob7-back-button" onClick={onBack} aria-label="Zurück" type="button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Header */}
        <div className="ob7-header">
          <h1 className="ob7-title">
            Scanne deinen
            <br />
            letzten Bluttest
          </h1>
          <p className="ob7-subtitle">
            Um die Antwort noch personalisierter zu geben, reicht ein Foto oder PDF.
          </p>
        </div>

        {/* Visual */}
        <div className="ob7-visual">
          <div className="ob7-privacy">
            <div className="ob7-privacy-dot">✓</div>
            <div className="ob7-privacy-text">
              <div className="ob7-privacy-strong">100% Anonym</div>
              <div className="ob7-privacy-small">Namen werden automatisch entfernt.</div>
            </div>
          </div>

          <div className="ob7-doc" aria-hidden="true">
            <div className="ob7-doc-lines">
              <div className="ob7-line ob7-line--w1" />
              <div className="ob7-line ob7-line--w2" />
              <div className="ob7-line ob7-line--w3" />
              <div className="ob7-line ob7-line--w2" />
            </div>
          </div>

          <div className="ob7-phone" aria-hidden="true">
            <div className="ob7-notch" />
            <div className="ob7-card">
              <div className="ob7-card-title">Analyse-Ergebnis</div>

              <div className="ob7-row">
                <span className="ob7-pill ob7-pill--green">Optimal</span>
                <span className="ob7-row-right">12 Werte</span>
              </div>

              <div className="ob7-row">
                <span className="ob7-pill ob7-pill--amber">Erhöht</span>
                <span className="ob7-row-right">3 Werte</span>
              </div>

              <div className="ob7-row">
                <span className="ob7-pill ob7-pill--red">Kritisch</span>
                <span className="ob7-row-right">1 Wert</span>
              </div>

              <div className="ob7-check">✓</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ob7-actions">
          {/* Buttons nebeneinander */}
          <div className="ob7-btn-row">
            <button className="ob7-btn ob7-btn--primary" onClick={onTakePhoto} type="button">
              <span className="ob7-btn-icon">
                <CameraIcon className="ob7-camera-icon" />
              </span>
              Foto schiessen
            </button>

            <button className="ob7-btn ob7-btn--secondary" onClick={onUploadPdf} type="button">
              <span className="ob7-btn-icon">
                <UploadIcon className="ob7-upload-icon" />
              </span>
              PDF hochladen
            </button>
          </div>

          <div className="ob7-lock">
            <div className="ob7-checkbox">
              <LockIcon className="ob7-lock-icon" />
            </div>
            <span>Deine Daten werden sicher verschlüsselt.</span>
          </div>

          <button className="ob7-skip" onClick={onSkip} type="button">
            Habe ich gerade nicht parat
          </button>
        </div>
      </div>
    </div>
  );
}
