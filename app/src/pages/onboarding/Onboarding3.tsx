// Onboarding3.tsx
import { useState } from "react";
import "./onboardingStart.css";
import "./onboarding3.css";

import FemaleIcon from "../../assets/woma.svg?react";
import MaleIcon from "../../assets/man.svg?react";

type Props = {
  onFinish?: () => void;
};

type Sex = "Männlich" | "Weiblich" | "Divers" | null;

export default function Onboarding3({ onFinish }: Props) {
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<Sex>(null);

  const canFinish = Number(age) > 0 && sex !== null;

  return (
    <div className="ob-root">
      <div className="ob-content ob3-content">
        {/* Top (Dots + Title) */}
        <div className="ob-top ob3-top">
          <div className="ob2-topbar">
            <div className="ob0-dots" aria-hidden="true">
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
              <span className="ob0-dot ob0-dot--active" />
            </div>
          </div>

          <div className="ob-brand">
            <h1 className="ob-title">Fast fertig.</h1>
            <p className="ob-subtitle">
              Für den Start brauchen wir zwei Infos,
              <br />
              damit OWN dich besser versteht.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="ob4-form">
          <div className="ob4-field">
            <label className="ob4-label">Alter</label>
            <input
              className="ob4-input ob3-input"
              placeholder="z. B. 38"
              type="number"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="ob4-field">
            <label className="ob4-label">Biologisches Geschlecht</label>

            <div className="ob3-genderGrid" role="group" aria-label="Biologisches Geschlecht">
              <button
                type="button"
                className={`ob3-genderCard ob3-genderCard--stack ${
                  sex === "Männlich" ? "is-active" : ""
                }`}
                onClick={() => setSex("Männlich")}
              >
                <MaleIcon className="ob3-genderIcon" aria-hidden="true" />
                <span className="ob3-genderLabel">Männlich</span>
              </button>

              <button
                type="button"
                className={`ob3-genderCard ob3-genderCard--stack ${
                  sex === "Weiblich" ? "is-active" : ""
                }`}
                onClick={() => setSex("Weiblich")}
              >
                <FemaleIcon className="ob3-genderIcon" aria-hidden="true" />
                <span className="ob3-genderLabel">Weiblich</span>
              </button>

              <button
                type="button"
                className={`ob3-genderCard ob3-genderCard--full ${
                  sex === "Divers" ? "is-active" : ""
                }`}
                onClick={() => setSex("Divers")}
              >
                <span className="ob3-genderIconText" aria-hidden="true">
                  ⚧
                </span>
                <span className="ob3-genderLabel">Divers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="ob-cta">
          <button
            className={`ob-button ${!canFinish ? "ob3-buttonDisabled" : ""}`}
            onClick={onFinish}
            disabled={!canFinish}
          >
            Konto starten
          </button>

          <div className="ob2-lock">🔒 Deine Daten bleiben privat</div>
        </div>
      </div>
    </div>
  );
}
