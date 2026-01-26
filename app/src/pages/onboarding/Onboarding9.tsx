import { useEffect, useState } from "react";
import "./onboardingStart.css";
import "./onboarding9.css";

import FemaleIcon from "../../assets/woma.svg?react";
import MaleIcon from "../../assets/man.svg?react";
import ShieldIcon from "../../assets/schild.svg?react";
import LockIcon from "../../assets/lock.svg?react";
import DiversIcon from "../../assets/user.svg?react";

type Props = {
  onFinish?: () => void;
  onBack?: () => void;
  name: string;
  onNameChange: (v: string) => void;
  age: number | null;
  onAgeChange: (v: number | null) => void;
};

type Sex = "Männlich" | "Weiblich" | "Divers" | null;

const NAME_KEY = "ownhealth_user_name";
const AGE_KEY = "ownhealth_user_age";
const SEX_KEY = "ownhealth_user_sex";

export default function Onboarding9({
  onFinish,
  name,
  onNameChange,
  age,
  onAgeChange,
}: Props) {
  const [sex, setSex] = useState<Sex>(null);

  // beim ersten Mount: falls schon vorhanden, reinladen (für Back/Forward im Flow)
  useEffect(() => {
    const storedName = sessionStorage.getItem(NAME_KEY);
    const storedAge = sessionStorage.getItem(AGE_KEY);
    const storedSex = sessionStorage.getItem(SEX_KEY) as Sex | null;

    if (storedName && !name) onNameChange(storedName);
    if (storedAge && (age === null || Number.isNaN(age))) onAgeChange(Number(storedAge));
    if (storedSex && sex === null) setSex(storedSex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // bei jeder Änderung: speichern
  useEffect(() => {
    sessionStorage.setItem(NAME_KEY, name);
  }, [name]);

  useEffect(() => {
    if (age === null) sessionStorage.removeItem(AGE_KEY);
    else sessionStorage.setItem(AGE_KEY, String(age));
  }, [age]);

  useEffect(() => {
    if (sex === null) sessionStorage.removeItem(SEX_KEY);
    else sessionStorage.setItem(SEX_KEY, sex);
  }, [sex]);

  const canFinish = name.trim().length > 0 && (age ?? 0) > 0 && sex !== null;

  return (
    <div className="ob-root">
      <div className="ob-content ob3-content">
        {/* Top */}
        <div className="ob-top ob3-top">
          <div className="ob2-topbar" />
          <div className="ob-brand">
            <h1 className="ob9-title">Fast fertig</h1>
            <p className="ob9-subtitle">Für den Start brauchen wir drei Infos.</p>
          </div>
        </div>

        {/* Form */}
        <div className="ob4-form">
          <div className="ob4-field">
            <label className="ob9-label">Wie dürfen wir dich nennen?</label>
            <input
              className="ob4-input ob3-input"
              placeholder="Vorname oder Pseudonym"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />

            <div className="ob3-badge" role="note" aria-label="Hinweis">
              <span className="ob3-badgeIcon" aria-hidden="true">
                <ShieldIcon className="ob3-badgeSvg" />
              </span>
              <span className="ob3-badgeText">OWN funktioniert komplett anonym.</span>
            </div>
          </div>

          <div className="ob4-field">
            <label className="ob9-label">Alter</label>
            <input
              className="ob4-input ob3-input"
              placeholder="z. B. 38"
              type="number"
              inputMode="numeric"
              value={age ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                onAgeChange(v === "" ? null : Number(v));
              }}
            />
          </div>

          <div className="ob4-field">
            <label className="ob9-label">Biologisches Geschlecht</label>

            <div className="ob3-genderGrid" role="group" aria-label="Biologisches Geschlecht">
              <button
                type="button"
                className={`ob3-genderCard ob3-genderCard--stack ${sex === "Männlich" ? "is-active" : ""}`}
                onClick={() => setSex("Männlich")}
              >
                <MaleIcon className="ob3-genderIcon" aria-hidden="true" />
                <span className="ob3-genderLabel">Männlich</span>
              </button>

              <button
                type="button"
                className={`ob3-genderCard ob3-genderCard--stack ${sex === "Weiblich" ? "is-active" : ""}`}
                onClick={() => setSex("Weiblich")}
              >
                <FemaleIcon className="ob3-genderIcon" aria-hidden="true" />
                <span className="ob3-genderLabel">Weiblich</span>
              </button>

              <button
                type="button"
                className={`ob3-genderCard ob3-genderCard--full ${sex === "Divers" ? "is-active" : ""}`}
                onClick={() => setSex("Divers")}
              >
                <DiversIcon className="ob3-genderIcon" aria-hidden="true" />
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

          <div className="ob2-lock">
            <LockIcon className="ob2-lockIcon" aria-hidden="true" />
            <span>Deine Daten bleiben privat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
