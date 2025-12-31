import "./registrationPrivacy.css";

import ShieldIcon from "../../assets/schild.svg?react";
import CheckIcon from "../../assets/check.svg?react";

type Props = {
  onCreate?: () => void;
};

export default function RegistrationPrivacy({ onCreate }: Props) {
  return (
    <div className="oh-screen reg-bg">
      <div className="oh-safe reg-safe reg-privacy">        
        <h1 className="reg-title">
          Dein <br /> Gesundheitskonto. <br /> Maximal privat.
        </h1>

        <div className="reg-card">
          <div className="reg-cardIcon">
            <ShieldIcon />
          </div>

          <div className="reg-cardTitle">Nur DU hast Zugriff</div>
          <div className="reg-cardSub">
            Nicht wir. Nicht deine Firma. <br />
            Nicht deine Krankenkasse. Kein Big Tech.
          </div>
        </div>

        <div className="reg-sectionTitle">Wie funktioniert das?</div>

        <ul className="reg-bullets">
          <li>
            <span className="reg-bulletIcon">
              <CheckIcon />
            </span>
            <div>
              <div className="reg-bulletMain">Keine E-Mail-Adresse</div>
              <div className="reg-bulletSub">Wir wissen nicht, wer du bist.</div>
            </div>
          </li>
          <li>
            <span className="reg-bulletIcon">
              <CheckIcon />
            </span>
            <div>
              <div className="reg-bulletMain">Anonyme OWN ID</div>
              <div className="reg-bulletSub">Wie eine Kontonummer.</div>
            </div>
          </li>
          <li>
            <span className="reg-bulletIcon">
              <CheckIcon />
            </span>
            <div>
              <div className="reg-bulletMain">Verschlüsselt auf deinem Gerät</div>
              <div className="reg-bulletSub">Wir haben keinen Zugriff.</div>
            </div>
          </li>
        </ul>

        <button className="reg-primaryBtn" onClick={onCreate}>
          Konto erstellen
        </button>
      </div>
    </div>
  );
}
