// profile.tsx
import "../../styles/appShell.css";
import "./profile.css";
import "./medication.css";

import LockIcon from "../../assets/lock.svg?react";

import BloodIcon from "../../assets/blood.svg?react";
import SmartwatchIcon from "../../assets/1smartwatch.svg?react";
import PillsIcon from "../../assets/pills.svg?react";
import UserIcon from "../../assets/user.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import HeartbeatIcon from "../../assets/heartbeat.svg?react";
import CoffeeIcon from "../../assets/coffee.svg?react";
import WeightIcon from "../../assets/weight.svg?react";
import DnaIcon from "../../assets/dna.svg?react";

type Props = {
  onBack?: () => void;
  onSecureNow?: () => void;
};

type Accent = "blue" | "purple" | "teal" | "green" | "amber";
type BadgeTone = "important" | "recommended" | "optional";

type StepItem = {
  key: string;
  title: string;
  desc: string;
  delta: string;
  accent: Accent;
  icon: React.ReactNode;
  meta?: string;
  badge?: { text: string; tone: BadgeTone };
};

type Biggest = {
  title: string;
  desc: string;
  delta: string;
  accent: Accent;
  icon: React.ReactNode;
  meta?: string;
  badge?: { text: string; tone: BadgeTone };
  insights?: StepItem[];
};

export default function Profile({ onBack, onSecureNow }: Props) {
  const overall = 26;

  const biggest: Biggest = {
    title: "Erweitertes\nBlutbild",
    desc: "Biomarker wie Vitamin\nD, Omega-3, HbA1c",
    delta: "+20%",
    accent: "blue",
    icon: <BloodIcon />,
    badge: { text: "Wichtig", tone: "important" },
    meta: "3 Min",
    insights: [
      {
        key: "wearable",
        title: "Wearable\nverbinden",
        desc: "Whoop, Oura,\nApple Watch oder\nGarmin",
        delta: "+18%",
        accent: "blue",
        icon: <SmartwatchIcon />,
        badge: { text: "Wichtig", tone: "important" },
        meta: "3 Min",
      },
      {
        key: "supps",
        title: "Supplements\nfotografieren",
        desc: "Alle Nahrungsergänzungsmittel &\nDosierung",
        delta: "+15%",
        accent: "amber",
        icon: <PillsIcon />,
        badge: { text: "Wichtig", tone: "important" },
        meta: "2 Min",
      },
    ],
  };

  // ❗ Wearable + Supps NICHT hier. Die bleiben im Biggest-Block.
  const steps: StepItem[] = [
    {
      key: "scan",
      title: "Ganzkörper-Scan\nmachen",
      desc: "Für Body Composition\nAnalyse",
      delta: "+12%",
      accent: "purple",
      icon: <UserIcon />,
      meta: "2–3 Min",
    },
    {
      key: "meal",
      title: "Letzte Mahlzeit\nfotografieren",
      desc: "Für Magen-Darm\nund Glucose-Reaktion",
      delta: "+10%",
      accent: "amber",
      icon: <CameraIcon />,
      meta: "10 Sek",
    },
    {
      key: "glucose",
      title: "Glukose-Sensor\nverbinden",
      desc: "Freestyle Libre, Dexcom\noder Ähnliches",
      delta: "+15%",
      accent: "blue",
      icon: <HeartbeatIcon />,
      meta: "1–2 Min",
    },
    {
      key: "lifestyle",
      title: "Lifestyle-Fragebogen",
      desc: "Schlaf, Stress,\nTraining, Ernährung",
      delta: "+10%",
      accent: "green",
      icon: <CoffeeIcon />,
      meta: "3–5 Min",
    },
    {
      key: "training",
      title: "Trainingsgewohnheiten\ndokumentieren",
      desc: "Art, Häufigkeit, Intensität\ndeines Sports",
      delta: "+8%",
      accent: "teal",
      icon: <WeightIcon />,
      meta: "1–2 Min",
    },
    {
      key: "more",
      title: "Erweiterte\nGesundheitsdaten",
      desc: "DEXA-Scan, VO2max\nweitere Biomarker",
      delta: "+12%",
      accent: "purple",
      icon: <DnaIcon />,
      meta: "10–15 Min",
    },
  ];

  return (
    <div className="oh-screen prof-bg">
      <div className="oh-safe prof-safe">
        {/* Topbar */}
        <header className="prof-top">
          <button className="prof-back" type="button" onClick={onBack}>
            <span className="prof-backArrow" aria-hidden="true">
              ‹
            </span>
            <span>Zurück</span>
          </button>

          <div className="prof-ring" aria-label={`Profilvollständigkeit ${overall}%`}>
            <svg className="prof-ringSvg" viewBox="0 0 44 44" aria-hidden="true">
              <circle className="prof-ringTrack" cx="22" cy="22" r="18" />
              <circle
                className="prof-ringProg"
                cx="22"
                cy="22"
                r="18"
                strokeDasharray={`${(overall / 100) * 113.097}, 113.097`}
              />
            </svg>
            <div className="prof-ringText">{overall}%</div>
          </div>

          <div className="prof-spacer" />
        </header>

        {/* Hero */}
        <section className="prof-hero">
          <h1 className="prof-heroTitle">Optimiere dein Profil</h1>
          <p className="prof-heroSub">Für datenbasierte Optimierung deiner Gesundheit</p>

          <div className="prof-miniRow">
            <div className="prof-miniHint">
              <span className="prof-miniIco" aria-hidden="true">
                <LockIcon />
              </span>
              <span>Ende-zu-Ende verschlüsselt</span>
            </div>
          </div>
        </section>

        {/* Biggest effect */}
        <section className="prof-block">
          <div className="prof-blockLabel">GRÖSSTER EFFEKT</div>
          <div className="prof-blockDesc">Diese Daten haben den grössten Effekt</div>

          {/* Karte 1: Erweitertes Blutbild */}
          <button className={`prof-feature prof-feature--${biggest.accent}`} type="button">
            <div className="prof-featureLeft">
              <div className="prof-featureIcon" aria-hidden="true">
                {biggest.icon}
              </div>

              <div className="prof-featureText">
                <div className="prof-featureTitle">
                  {biggest.title.split("\n").map((l, i) => (
                    <span key={i} className="prof-titleLine">
                      {l}
                    </span>
                  ))}
                </div>

                <div className="prof-featureDesc">
                  {biggest.desc.split("\n").map((l, i) => (
                    <span key={i} className="prof-descLine">
                      {l}
                    </span>
                  ))}
                </div>

                {(biggest.badge || biggest.meta) && (
                  <div className="prof-miniMetaRow">
                    {biggest.badge && (
                      <span className={`prof-pillBadge prof-pillBadge--${biggest.badge.tone}`}>
                        {biggest.badge.text}
                      </span>
                    )}
                    {biggest.meta && (
                      <span className="prof-metaInline">
                        <span className="prof-metaClock" aria-hidden="true">
                          ⏱
                        </span>
                        {biggest.meta}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="prof-featureRight">
              <div className="prof-delta">{biggest.delta}</div>
              <span className="prof-chevron" aria-hidden="true">
                ›
              </span>
            </div>
          </button>

          {/* HIER ist der Fix: Wearable + Supplements sind EINFACH 2 normale Step-Karten direkt darunter (nicht in der Card drin) */}
          {biggest.insights?.length ? (
            <div className="prof-biggestSteps">
              {biggest.insights.map((s) => (
                <button key={s.key} className={`prof-step prof-step--${s.accent}`} type="button">
                  <div className="prof-stepLeft">
                    <div className="prof-stepIcon" aria-hidden="true">
                      {s.icon}
                    </div>

                    <div className="prof-stepText">
                      <div className="prof-stepTitle">
                        {s.title.split("\n").map((l, i) => (
                          <span key={i} className="prof-titleLine">
                            {l}
                          </span>
                        ))}
                      </div>

                      {(s.badge || s.meta) && (
                        <div className="prof-miniMetaRow">
                          {s.badge && (
                            <span className={`prof-pillBadge prof-pillBadge--${s.badge.tone}`}>
                              {s.badge.text}
                            </span>
                          )}
                          {s.meta && (
                            <span className="prof-metaInline">
                              <span className="prof-metaClock" aria-hidden="true">
                                ⏱
                              </span>
                              {s.meta}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="prof-stepDesc">
                        {s.desc.split("\n").map((l, i) => (
                          <span key={i} className="prof-descLine">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="prof-stepRight">
                    <div className="prof-stepTop">
                      <span className="prof-delta">{s.delta}</span>
                      <span className="prof-chevron" aria-hidden="true">
                        ›
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : null}
        </section>

        {/* Weitere Schritte */}
        <section className="prof-block">
          <div className="steps-blockLabel">WEITERE SCHRITTE</div>

          <div className="prof-steps">
            {steps.map((s) => (
              <button key={s.key} className={`prof-step prof-step--${s.accent}`} type="button">
                <div className="prof-stepLeft">
                  <div className="prof-stepIcon" aria-hidden="true">
                    {s.icon}
                  </div>

                  <div className="prof-stepText">
                    <div className="prof-stepTitle">
                      {s.title.split("\n").map((l, i) => (
                        <span key={i} className="prof-titleLine">
                          {l}
                        </span>
                      ))}
                    </div>

                    {(s.badge || s.meta) && (
                      <div className="prof-miniMetaRow">
                        {s.badge && (
                          <span className={`prof-pillBadge prof-pillBadge--${s.badge.tone}`}>{s.badge.text}</span>
                        )}
                        {s.meta && (
                          <span className="prof-metaInline">
                            <span className="prof-metaClock" aria-hidden="true">
                              ⏱
                            </span>
                            {s.meta}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="prof-stepDesc">
                      {s.desc.split("\n").map((l, i) => (
                        <span key={i} className="prof-descLine">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="prof-stepRight">
                  <div className="prof-stepTop">
                    <span className="step-delta">{s.delta}</span>
                    <span className="prof-chevron" aria-hidden="true">
                      ›
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <button className="med-primaryBtn" type="button" onClick={onSecureNow}>
          Jetzt meine Daten sichern
        </button>
      </div>
    </div>
  );
}
