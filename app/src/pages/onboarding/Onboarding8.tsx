import "../onboarding/onboardingStart.css";
import "../onboarding/onboarding8.css";

import type { FocusKey } from "../../types/focus";

import CameraIcon from "../../assets/camera.svg?react";
import MediImg from "../../assets/medi.png";
import SuppImg from "../../assets/sup.png";

type Props = {
  focusKey: FocusKey;
  onTakePhoto: () => void;
  onSkip: () => void;
  onBack?: () => void;
};

export default function Onboarding8({
  focusKey,
  onTakePhoto,
  onSkip,
  onBack,
}: Props) {
  const isLongevity = focusKey === "longevity";

  const title = isLongevity
    ? "Fotografiere eines deiner Supplements"
    : "Erfasse deine Medikamente";

  const subtitle = isLongevity
    ? "OWN erkennt automatisch Inhaltsstoffe und Dosierung – und zeigt dir, welches Supplement wirkt."
    : "Fotografiere die Packung. OWN erkennt automatisch Wirkstoff und Dosierung – und zeigt dir später, wie sie wirken.";

  const imageSrc = isLongevity ? SuppImg : MediImg;


  return (
    <div className="ob-root">
      <div className="ob-content ob8-content">
        {/* Fortschrittsanzeige */}
        <div className="ob0-dots" aria-hidden="true">
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
          <span className="ob0-dot ob0-dot--active" />
        </div>

        {/* Back Button */}
        {onBack && (
          <button className="ob8-back-button" onClick={onBack} aria-label="Zurück">
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
        <div className="ob8-header">
            <h1 className="ob8-title">{title}</h1>
            <p className="ob8-subtitle">{subtitle}</p>
        </div>

        {/* Visual */}
        <div className="ob8-visual">
          <div className="ob8-scanArea" aria-hidden="true">
            <span className="ob8-corner ob8-corner--tl" />
            <span className="ob8-corner ob8-corner--tr" />
            <span className="ob8-corner ob8-corner--bl" />
            <span className="ob8-corner ob8-corner--br" />

            {/* echtes Bild statt Mock */}
            <div className="ob8-photoWrap">
              <img className="ob8-photo" src={imageSrc} alt="" />
            </div>

            {/* Camera Bubble */}
            <div className="ob8-cameraBubble">
              <CameraIcon className="ob8-cameraIcon" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ob8-actions">
          <button className="ob-button ob8-primary" type="button" onClick={onTakePhoto}>
            <span className="ob8-btnIcon">
              <CameraIcon className="ob8-btnCam" />
            </span>
            Jetzt Foto schiessen
          </button>

          <button className="ob8-skip" type="button" onClick={onSkip}>
            Habe ich gerade nicht parat
          </button>
        </div>
      </div>
    </div>
  );
}
