import "../../styles/appShell.css";
import "./RegistrationPrivacy.css";

import ShieldIcon from "../../assets/schild.svg?react";
import CheckIcon from "../../assets/check.svg?react";

type Props = {
  onCreate?: () => void;
  onBack?: () => void;
};

export default function RegistrationPrivacy({ onCreate }: Props) {
  return (
    <div className="rp-screen">
      <div className="rp-safe">        

        <h1 className="rp-title">
          Dein Gesundheitskonto.
          <br />
          Maximal privat.
        </h1>

        <section className="rp-card">
          <div className="rp-cardInner">
            <div className="rp-shield">
              <ShieldIcon />
            </div>

            <div className="rp-cardTitle">Nur DU hast Zugriff</div>
            <div className="rp-cardSub">
              Nicht wir. Nicht deine Firma.
              <br />
              Nicht deine Krankenkasse. Kein Big Tech.
            </div>
          </div>
        </section>

        <h2 className="rp-sectionTitle">Wie funktioniert das?</h2>

        <ul className="rp-list">
          <li className="rp-item">
            <span className="rp-dot">
              <CheckIcon />
            </span>
            <div className="rp-itemText">
              <div className="rp-itemTitle">Keine E-Mail-Adresse</div>
              <div className="rp-itemSub">→ Wir wissen nicht wer du bist</div>
            </div>
          </li>

          <li className="rp-item">
            <span className="rp-dot">
              <CheckIcon />
            </span>
            <div className="rp-itemText">
              <div className="rp-itemTitle">Anonyme OWN ID</div>
              <div className="rp-itemSub">→ Wie eine Kontonummer</div>
            </div>
          </li>

          <li className="rp-item">
            <span className="rp-dot">
              <CheckIcon />
            </span>
            <div className="rp-itemText">
              <div className="rp-itemTitle">Verschlüsselt auf deinem Gerät</div>
              <div className="rp-itemSub">→ Wir haben keinen Zugriff</div>
            </div>
          </li>
        </ul>

        <button className="rp-btn" type="button" onClick={onCreate}>
          Konto erstellen
        </button>
      </div>
    </div>
  );
}
