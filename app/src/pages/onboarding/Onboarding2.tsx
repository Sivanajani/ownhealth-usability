import { useMemo, useRef, useState, useEffect } from "react";
import "./onboardingStart.css";
import "./onboarding2.css";

import ShieldIcon from "../../assets/schild.svg?react";
import Notification from "../../assets/notification.svg?react";
import PeopleIcon from "../../assets/people.svg?react";
import ClockIcon from "../../assets/clock.svg?react";
import UserIcon from "../../assets/user.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import OWN from "../../assets/O_Logo.svg?react";
import StethoscopeIcon from "../../assets/stethoscope.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import ArrowIcon from "../../assets/arrow.svg?react";


type Props = {
  onNext?: () => void;
};

type Slide = {
  id: string;
  icon: "shield" | "trend" | "people";
  kicker?: string;
  title: string;
  desc: string;
  contentType: "accounts" | "chart" | "knowledge" | "paperless";
};


function SlideIcon({ name }: { name: Slide["icon"] }) {
  if (name === "shield") return <ShieldIcon className="ob02-iconSvg" aria-hidden="true" />;
  if (name === "trend") return <Notification className="ob02-iconSvg" aria-hidden="true" />;
  return <PeopleIcon className="ob02-iconSvg" aria-hidden="true" />;
}

export default function Onboarding2({ onNext }: Props) {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "family",
        icon: "shield",
        title: "Ein Konto.\nDie ganze Familie.",
        desc: "Verwalte die Gesundheit deiner Liebsten so sicher und einfach wie beim Online-Banking.",
        contentType: "accounts",
      },
      {
        id: "forecast",
        icon: "trend",
        title: "Wir warnen dich,\nbevor du krank wirst.",
        desc: "Erkenne Risiken früh genug, um sie zu verhindern.",
        contentType: "chart",
        kicker: "FRÜHERKENNUNG",
      },
      {
        id: "together",
        icon: "people",
        title: "Du bist nicht allein.",
        desc: "Tausende in ähnlicher Situation haben bereits Wege gefunden.",
        contentType: "knowledge",
        kicker: "KOLLEKTIVES WISSEN",
      },
      {
        id: "paperless",
        icon: "shield",
        title: "Kein Papier.\nKein Suchen.\nAlles automatisch.",
        desc: "Ärzte & Labore senden Befunde direkt in dein Konto. Nichts geht verloren.",
        contentType: "paperless",
      },
    ],
    []
  );

  

  const [index, setIndex] = useState(0);
  
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 2500);
    return () => clearTimeout(t);
  }, []);


  const clamp = (n: number) => Math.max(0, Math.min(slides.length - 1, n));
  const go = (n: number) => setIndex(clamp(n));

  // Swipe
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current || startX.current == null) return;
    const dx = e.clientX - startX.current;
    dragging.current = false;
    startX.current = null;

    if (Math.abs(dx) < 40) return;
    if (dx < 0) go(index + 1);
    else go(index - 1);
  };

  const active = slides[index];

  return (
    <div className="ob-root">
      <div className="ob02-screen">
        {/* TOP */}
        <header className="ob02-top">
          <div className="ob02-pill">
            <ClockIcon className="ob02-pillIcon" aria-hidden="true" />
            <span>COMING SOON</span>
          </div>

          <h1 className="ob02-title">Ein Blick in die Zukunft</h1>
          <p className="ob02-subtitle">Diese Features kommen noch 2026</p>
        </header>

        {/* MIDDLE */}
        <main className="ob02-middle">
          <div
            className="ob02-carousel"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {showSwipeHint && (
              <div className="ob02-swipeHint" aria-hidden="true">
                <span className="ob02-swipeHintText">Wischen</span>
                <span className="ob02-swipeHintArrow">→</span>
              </div>
            )}

            
              <div className="ob02-track" style={{ transform: `translateX(${-index * 100}%)` }} >
              {slides.map((sl) => (
                <section className="ob02-slide" key={sl.id} aria-hidden={sl.id !== active.id}>
                  <div className="ob02-card">
                    <div className="ob02-headerRow">
                      <div className="ob02-cardIcon">
                        <SlideIcon name={sl.icon} />
                      </div>

                      <h2 className="ob02-cardTitle ob02-cardTitle--inline">
                        {sl.title.split("\n").map((line, i) => (
                          <span key={i} className="ob02-titleLine">
                            {line}
                          </span>
                        ))}
                      </h2>
                    </div>

                    <p className="ob02-cardDesc">{sl.desc}</p>

                    {/* 1) ACCOUNTS */}
                    {sl.contentType === "accounts" && (
                      <div className="ob02-previewBox">
                        <div className="ob02-personRow is-active">
                          <div className="ob02-avatar is-blue">
                            <UserIcon className="ob02-avatarIcon" aria-hidden="true" />
                          </div>
                          <div className="ob02-personText">
                            <div className="ob02-personName">Ich</div>
                            <div className="ob02-personRole">Hauptkonto</div>
                          </div>
                        </div>

                        <div className="ob02-personRow">
                          <div className="ob02-avatar">
                            <UserIcon className="ob02-avatarIcon" aria-hidden="true" />
                          </div>
                          <div className="ob02-personText">
                            <div className="ob02-personName">Vater</div>
                            <div className="ob02-personRole">Unterkonto</div>
                          </div>
                        </div>

                        <div className="ob02-personRow">
                          <div className="ob02-avatar">
                            <UserIcon className="ob02-avatarIcon" aria-hidden="true" />
                          </div>
                          <div className="ob02-personText">
                            <div className="ob02-personName">Mutter</div>
                            <div className="ob02-personRole">Unterkonto</div>
                          </div>
                        </div>
                      </div>
                    )}
                                                    
                    {/* 2) FORECAST */}                                     
                    {sl.contentType === "chart" && (
                      <>
                        <div className="ob02-forecastCard">
                          {/* Ohne OWN */}
                          <div className="ob02-forecastRow">
                            <div className="ob02-forecastAvatar is-red">
                              <UserIcon className="ob02-forecastAvatarIcon" aria-hidden="true" />
                              <span className="ob02-forecastBadge is-red" aria-hidden="true">
                                <WarningIcon className="ob02-forecastBadgeIcon" />
                              </span>
                            </div>

                            <div className="ob02-forecastText">
                              <div className="ob02-forecastRowTitle">Ohne OWN</div>
                              <div className="ob02-forecastRowSub">
                                Du merkst es erst,<br />wenn&apos;s passiert
                              </div>
                            </div>
                          </div>

                          {/* Mit OWN */}
                          <div className="ob02-forecastRow is-active">
                            <div className="ob02-forecastAvatar is-blue">
                              <UserIcon className="ob02-forecastAvatarIcon" aria-hidden="true" />
                              <span className="ob02-forecastBadge is-blue" aria-hidden="true">
                                <OWN className="ob02-forecastBadgeIcon is-own" />
                              </span>
                            </div>

                            <div className="ob02-forecastText">
                              <div className="ob02-forecastRowTitle">Mit OWN</div>
                              <div className="ob02-forecastRowSub is-blue">
                                Du wirst früh gewarnt
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* wie Knowledge: Badge + Erklärungstext in eigener Card */}
                        {/*<div className="ob02-forecastInfoCard">
                          <div className="ob02-badge is-forecast">{sl.kicker}</div>
                          <p className="ob02-forecastInfoText">
                            OWN analysiert deine Gesundheitsdaten kontinuierlich, um Auffälligkeiten früh sichtbar zu machen.
                          </p>
                        </div>*/}
                      </>
                    )}

                    {/* 3) KNOWLEDGE */}
                    {sl.contentType === "knowledge" && (
                      <>
                        <div className="ob02-network">
                          <svg
                            className="ob02-networkSvg"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="xMidYMid meet"
                            aria-hidden="true"
                          >
                            <defs>
                              <radialGradient id="coreGlow" cx="50%" cy="50%" r="60%">
                                <stop offset="0%" stopColor="rgba(80,200,255,0.28)" />
                                <stop offset="45%" stopColor="rgba(80,200,255,0.12)" />
                                <stop offset="100%" stopColor="rgba(80,200,255,0)" />
                              </radialGradient>
                            </defs>

                            {/* glow background */}
                            <circle cx="50" cy="50" r="28" fill="url(#coreGlow)" />

                            {(() => {
                              const nodes = [
                                { x: 18, y: 32 },
                                { x: 26, y: 62 },
                                { x: 40, y: 20 },
                                { x: 58, y: 22 },
                                { x: 74, y: 40 },
                                { x: 78, y: 66 },
                                { x: 60, y: 78 },
                                { x: 36, y: 78 },
                                { x: 22, y: 48 },
                                { x: 70, y: 54 },
                              ];
                              const center = { x: 50, y: 50 };

                              const ring: Array<[number, number]> = [
                                [0, 2],
                                [2, 3],
                                [3, 4],
                                [4, 9],
                                [9, 5],
                                [5, 6],
                                [6, 7],
                                [7, 1],
                                [1, 8],
                                [8, 0],
                              ];

                              const spokes: Array<[number, number]> = nodes.map(
                                (_, i) => [i, -1] as [number, number]
                              );

                              const edges: Array<[number, number]> = [...ring, ...spokes];

                              return (
                                <>
                                  {/* lines */}
                                  <g className="ob02-netLines">
                                    {edges.map(([a, b], idx) => {
                                      const p1 = nodes[a];
                                      const p2 = b === -1 ? center : nodes[b];
                                      return (
                                        <line
                                          key={idx}
                                          x1={p1.x}
                                          y1={p1.y}
                                          x2={p2.x}
                                          y2={p2.y}
                                          className={
                                            b === -1
                                              ? "ob02-line ob02-lineSpoke"
                                              : "ob02-line ob02-lineRing"
                                          }
                                        />
                                      );
                                    })}
                                  </g>

                                  {/* nodes */}
                                  <g className="ob02-netNodes">
                                    {nodes.map((p, i) => (
                                      <circle
                                        key={i}
                                        cx={p.x}
                                        cy={p.y}
                                        r={2.2}
                                        className={`ob02-nodeSvg ${
                                          i === 2 || i === 6 || i === 9 ? "is-hot" : ""
                                        }`}
                                      />
                                    ))}
                                  </g>

                                  {/* core */}
                                  <g className="ob02-netCore">
                                    <circle cx="50" cy="50" r="3.2" className="ob02-coreSvg" />
                                  </g>
                                </>
                              );
                            })()}
                          </svg>
                        </div>

                        <div className="ob02-knowledgeCard">
                          <div className="ob02-badge is-knowledge">{sl.kicker}</div>
                          <p className="ob02-knowledgeText">
                            Erfahre, welche Medikation, Routinen und Therapien positive Veränderungen gebracht haben.
                          </p>
                        </div>
                      </>
                    )}

                    {/* 4) PAPERLESS (Screenshot-Style) */}
                    {sl.contentType === "paperless" && (
                      <div className="ob02-paperless">
                        {/* Left icon stack */}
                        <div className="ob02-plLeft">
                          <button type="button" className="ob02-plIconBtn" aria-label="Stethoskop">
                            <StethoscopeIcon className="ob02-plIconSvg" aria-hidden="true" />
                          </button>

                          <button type="button" className="ob02-plIconBtn" aria-label="Dokument">
                            <DocumentIcon className="ob02-plIconSvg" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Arrow (flip to point RIGHT) */}
                        <div className="ob02-plArrow" aria-hidden="true">
                          <ArrowIcon className="ob02-plArrowSvg" />
                        </div>

                        {/* Right glowing shield tile */}
                        <div className="ob02-plRight" aria-hidden="true">
                          <div className="ob02-plShieldTile">
                            <ShieldIcon className="ob02-plShieldSvg" />
                            <span className="ob02-plOwn">OWN</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="ob02-dots" role="tablist" aria-label="Karussell">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ob02-dot ${i === index ? "is-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </main>

        {/* BOTTOM */}
        <footer className="ob02-bottom">
          <button className="ob02-cta" type="button" onClick={() => onNext?.()}>
            Jetzt anfangen
          </button>
        </footer>
      </div>
    </div>
  );
}
