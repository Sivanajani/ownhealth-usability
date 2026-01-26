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
          <div className="ob7-scanframe" aria-hidden="true">
            {/* Scan-Corners */}
            <span className="ob7-corner ob7-corner--tl" />
            <span className="ob7-corner ob7-corner--tr" />
            <span className="ob7-corner ob7-corner--bl" />
            <span className="ob7-corner ob7-corner--br" />

            {/* Kamera-Kreis oben */}
            <div className="ob7-camera-bubble">
              <CameraIcon className="ob7-camera-bubble-icon" />
            </div>

            {/* Dokument-Karte */}
            <div className="ob7-doccard">
              <div className="ob7-doc-header">
                <div className="ob7-doc-file" />
                <span className="ob7-doc-title">Bluttest Ergebnis</span>
              </div>

              <div className="ob7-doc-lines">
                <div className="ob7-doc-line w1" />
                <div className="ob7-doc-line w2" />
                <div className="ob7-doc-line w3" />
                <div className="ob7-doc-line w2" />
              </div>

              {/* Anonym-Badge AUF der Karte */}
              <div className="ob7-anon-badge">
                <div className="ob7-anon-check">✓</div>
                <div className="ob7-anon-text">
                  <div className="ob7-anon-title">100% Anonym:</div>
                  <div className="ob7-anon-sub">Namen werden automatisch entfernt.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* Actions */}
        <div className="ob7-actions">
          <div className="ob7-lock">
            <div className="ob7-checkbox">
              <LockIcon className="ob7-lock-icon" />
            </div>
            <span>Deine Daten werden sicher verschlüsselt.</span>
          </div>

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

          <button className="ob7-skip" onClick={onSkip} type="button">
            Habe ich gerade nicht parat
          </button>        

        </div>
      </div>
    </div>
  );
}
