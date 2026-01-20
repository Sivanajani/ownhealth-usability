import "../onboarding/onboardingStart.css";
import "../onboarding/onboarding8.css";

import CameraIcon from "../../assets/camera.svg?react";

type Props = {
  onTakePhoto: () => void;
  onSkip: () => void;
  onBack?: () => void;
};

export default function Onboarding8({ onTakePhoto, onSkip, onBack }: Props) {
  return (
    <div className="ob-root">
      <div className="ob-content ob8-content">
        
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
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot" />
        </div>

        {/* Back Button - Wie bei anderen Screens */}
        {onBack && (
          <button className="ob8-back-button" onClick={onBack} aria-label="Zurück">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Header - Zentriert wie bei anderen Screens */}
        <div className="ob8-header">
          <h1 className="ob8-title">
            Erfasse eines deiner<br />
            Medikamente
          </h1>
          <p className="ob8-subtitle">
            Fotografiere die Packung. OWN erkennt automatisch Wirkstoff und Dosierung – und zeigt dir später, wie sie wirken.
          </p>
        </div>

        {/* Visual */}
        <div className="ob8-visual">
          <div className="ob8-scanArea" aria-hidden="true">
            {/* Corner Brackets */}
            <span className="ob8-corner ob8-corner--tl" />
            <span className="ob8-corner ob8-corner--tr" />
            <span className="ob8-corner ob8-corner--bl" />
            <span className="ob8-corner ob8-corner--br" />

            {/* Package Mock */}
            <div className="ob8-pack">
              <div className="ob8-pack-top" />
              <div className="ob8-pack-line ob8-pack-line--w1" />
              <div className="ob8-pack-line ob8-pack-line--w2" />
              <div className="ob8-pack-line ob8-pack-line--w3" />
              <div className="ob8-pack-line ob8-pack-line--w2" />
              <div className="ob8-pack-barcode" />
            </div>

            {/* Camera Bubble */}
            <div className="ob8-cameraBubble">
              <CameraIcon className="ob8-cameraIcon" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ob8-actions">
          {/* Primary Button - Gleicher Stil wie in anderen Screens */}
          <button 
            className="ob-button ob8-primary" 
            type="button" 
            onClick={onTakePhoto}
          >
            <span className="ob8-btnIcon">
              <CameraIcon className="ob8-btnCam" />
            </span>
            Jetzt Foto schiessen
          </button>

          {/* Skip Button */}
          <button className="ob8-skip" type="button" onClick={onSkip}>
            Habe ich gerade nicht parat
          </button>
        </div>
      </div>
    </div>
  );
}