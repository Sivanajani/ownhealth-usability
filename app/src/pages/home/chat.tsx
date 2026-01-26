import { useEffect, useMemo, useRef, useState } from "react";
import "./chat.css";
import "../../styles/appShell.css";

import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chat.svg?react";
import FolderIcon from "../../assets/folder.svg?react";

import AddIcon from "../../assets/add.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import DocsIcon from "../../assets/document.svg?react";

import CheckIcon from "../../assets/check.svg?react";
import WarningIcon from "../../assets/warning.svg?react";
import HeartIcon from "../../assets/heartbeat.svg?react";
import BoltIcon from "../../assets/blitz.svg?react";
import MoonIcon from "../../assets/moon.svg?react";
import FireIcon from "../../assets/fire.svg?react";
import ClockIcon from "../../assets/clock.svg?react";
import ArrowUpRightIcon from "../../assets/arrow-up-right.svg?react";
import SendIcon from "../../assets/arrow-up-right.svg?react";

type Props = {
  onOpenHome: () => void;
  onOpenFolder: () => void;
  initialQuestion?: string;
  userName: string;
};

type Role = "user" | "assistant";
type MsgKind = "text" | "card" | "choice";

type Action = {
  label: string;
  kind: "go_profile";
};

type StatTone = "good" | "warn" | "info";
type Stat = { tone: StatTone; label: string; value: string };

type CardRowIcon = "check" | "warn" | "heart" | "bolt" | "moon" | "fire" | "clock";
type CardRow = { icon: CardRowIcon; title: string; text: string };

type CardSectionTone = "good" | "warn" | "trend";
type CardSection = { title: string; tone: CardSectionTone; rows: CardRow[] };

type AnswerCard = {
  headline: string;
  subline?: string;
  stats?: Stat[];
  sections: CardSection[];
  note?: string;
  chips?: string[];
};

type ChoiceMsg = {
  prompt: string;
  options: { label: string; value: "yes" | "no" }[];
};

type Msg = {
  id: string;
  role: Role;
  kind: MsgKind;
  ts: number;

  // text message
  text?: string;

  // typing / typewriter
  fullText?: string;
  isTyping?: boolean;

  // card message
  card?: AnswerCard;

  // optional sources/actions for text replies
  sources?: string[];
  action?: Action;

  // choice message
  choice?: ChoiceMsg;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `Heute, ${hh}:${mm}`;
}

/** replaces emoji-icons with svg assets */
function RowIcon({ name }: { name: CardRowIcon }) {
  const cls = `cI cI--${name}`;
  if (name === "check") return <CheckIcon className={cls} />;
  if (name === "warn") return <WarningIcon className={cls} />;
  if (name === "heart") return <HeartIcon className={cls} />;
  if (name === "bolt") return <BoltIcon className={cls} />;
  if (name === "moon") return <MoonIcon className={cls} />;
  if (name === "fire") return <FireIcon className={cls} />;
  return <ClockIcon className={cls} />;
}

function SectionIcon({ tone }: { tone: CardSectionTone }) {
  const cls = `chatCard-secIcon chatCard-secIcon--${tone}`;
  if (tone === "good") return <CheckIcon className={cls} />;
  if (tone === "warn") return <WarningIcon className={cls} />;
  return <ArrowUpRightIcon className={cls} />;
}

/** 8 Questions (Longevity + Chroniker) -> Card Answers */
function getCardForQuestion(q: string): AnswerCard | null {
  const t = q.trim().toLowerCase();

  // ----- Longevity (4) -----
  const isSleep =
    t === "wie kann ich besser schlafen?" ||
    t.includes("besser schlafen") ||
    (t.includes("schlaf") && t.includes("besser"));

  const isSupp =
    t === "wirken meine supplements?" ||
    t.includes("wirken meine supplements") ||
    t.includes("supplements");

  const isFit =
    t === "wie werde ich fitter?" ||
    t.includes("werde ich fitter") ||
    (t.includes("fitter") && t.includes("wie"));

  const isFood =
    t === "was sollte ich bei meiner ernährung beachten?" ||
    t.includes("ernährung beachten") ||
    t.includes("bei meiner ernährung");

  if (isSleep) {
    return {
      headline: "Dein Schlaf: Dauer gut, Qualität optimierbar",
      sections: [
        {
          title: "Was gut läuft",
          tone: "good",
          rows: [
            { icon: "check", title: "Schlafdauer", text: "7.2h" },
            { icon: "check", title: "Durchschnitt (solide)", text: "—" },
            { icon: "check", title: "REM-Phasen", text: "23% (optimal 20–25%)" },
          ],
        },
        {
          title: "Optimierung",
          tone: "trend",
          rows: [
            { icon: "warn", title: "Tiefschlaf nur 12%", text: "Optimal: 15–20%. Erklärt fehlende Erholung." },
            { icon: "clock", title: "Einschlafzeit 45 Min", text: "Cortisol abends erhöht (18 µg/dl), normal <10." },
            { icon: "bolt", title: "Raumtemperatur 22°C", text: "Stört tiefer Schlaf. Ideal 18–19°C." },
          ],
        },
      ],
      note: "Zusätzlich: Koffein nach 14 Uhr → HRV sinkt um 15%. Empfehlung: cutoff 14 Uhr.",
      chips: ["Magnesium-Glycinat 400mg", "Raum kühler", "Koffein-Cutoff 14 Uhr"],
    };
  }

  if (isSupp) {
    return {
      headline: "Deine Supplements: 3 wirksam, 2 nicht messbar",
      sections: [
        {
          title: "Wirksam",
          tone: "good",
          rows: [
            { icon: "check", title: "Vitamin D3 (5000 IE)", text: "Spiegel 28 → 52 ng/ml (optimal erreicht)" },
            { icon: "check", title: "Omega-3 (2g EPA/DHA)", text: "Omega-3 Index 8.9% (Ziel 8–11%)" },
            { icon: "check", title: "Kreatin (5g)", text: "HRV +5%, Regeneration verbessert (Whoop)" },
          ],
        },
        {
          title: "Nicht messbar",
          tone: "warn",
          rows: [
            { icon: "warn", title: "NAD+ Booster", text: "Kein verlässlicher Biomarker (DAO, NAD/NADH unverändert)" },
            { icon: "warn", title: "Resveratrol", text: "Entzündungsmarker (hs-CRP) weiter 1.2 mg/l" },
          ],
        },
      ],
      note: "Zusatz: B12 trotz Supplementierung niedrig (280 pg/ml) → mögliche Aufnahmeprobleme.",
      chips: ["NAD+ weglassen", "B12 als Methylcobalamin", "Spray testen"],
    };
  }

  if (isFit) {
    return {
      headline: "Deine Fitness: Basis stark, 3 limitierende Faktoren",
      sections: [
        {
          title: "Starke Basis",
          tone: "good",
          rows: [
            { icon: "check", title: "VO₂max", text: "48 ml/kg/min (stark für dein Alter)" },
            { icon: "check", title: "Training", text: "4×/Woche konstant" },
          ],
        },
        {
          title: "Limitierende Faktoren",
          tone: "warn",
          rows: [
            { icon: "warn", title: "Regeneration nur 65%", text: "Zu wenig Pausentage / hohe Intensität (Whoop)" },
            { icon: "heart", title: "Protein 0.9 g/kg", text: "Für Muskelaufbau zu niedrig (Ziel 1.6–2.2 g/kg)" },
            { icon: "bolt", title: "Ferritin 35 ng/ml", text: "Im unteren Bereich, limitiert O₂-Transport" },
          ],
        },
      ],
      note: "Zusätzlich: Trainingstage mit <6h Schlaf → Strain +15 → Overreaching Risiko ↑.",
      chips: ["1 Ruhetag mehr/Woche", "Protein auf 120g/Tag", "Eisen-Check in 8 Wochen"],
    };
  }

  if (isFood) {
    return {
      headline: "Ernährung: Makros gut, 3 Longevity-Optimierungen",
      sections: [
        {
          title: "Was gut läuft",
          tone: "good",
          rows: [
            { icon: "check", title: "Makros ausgewogen", text: "30% Protein, 35% Fett, 35% Carbs" },
            { icon: "check", title: "Mikronährstoffe", text: "hoch" },
          ],
        },
        {
          title: "Optimierungspotenzial",
          tone: "trend",
          rows: [
            {
              icon: "warn",
              title: "Postprandiale Glukose-Spikes",
              text: "Nach Haferflocken 185 mg/dl (optimal <140) → Reihenfolge / Kombi optimieren",
            },
            { icon: "bolt", title: "Omega-6:Omega-3 Ratio 8:1", text: "Ziel <4:1 → entzündungsärmer" },
            { icon: "fire", title: "Spätes Essen (>20 Uhr)", text: "HRV -12%, Autophagie-Fenster kürzer → Ziel: <20 Uhr" },
          ],
        },
      ],
      note: "Zusatz: Tage mit 14h Essensfenster → Glukose-Variabilität +23% vs. 10h Fenster.",
      chips: ["Haferflocken mit Protein/Fett", "Omega-6 reduzieren", "10h Essensfenster"],
    };
  }

  // ----- Chroniker (4) -----
  const isMeds =
    t === "vertragen sich meine medikamente?" ||
    t.includes("vertragen sich") ||
    (t.includes("medikament") && t.includes("vertragen"));

  const isBlood =
    t === "was bedeutet mein blutbild?" ||
    t.includes("bedeutet mein blutbild") ||
    t.includes("blutbild");

  const isAvoid =
    t === "welche lebensmittel sollte ich meiden?" ||
    t.includes("lebensmittel") ||
    t.includes("meiden");

  const isTriggers =
    t === "was triggert meine beschwerden?" ||
    t.includes("triggert") ||
    t.includes("beschwerden");

  if (isMeds) {
    return {
      headline: "Deine Medikamente: 2 von 3 vertragen sich gut",
      sections: [
        {
          title: "Verträglich",
          tone: "good",
          rows: [
            { icon: "check", title: "Ramipril + L-Thyroxin", text: "Verträglich, Schilddrüsenwerte stabil" },
          ],
        },
        {
          title: "Achtung",
          tone: "warn",
          rows: [
            { icon: "warn", title: "Ramipril + Ibuprofen", text: "Kann Nieren belasten (Kreatinin war grenzwertig: 1,2 mg/dl)" },
            { icon: "clock", title: "Timing", text: "L-Thyroxin: morgens nüchtern, Abstand zu Kaffee/Eisen/Calcium" },
          ],
        },
      ],
      note: "Tipp: Bei Schmerzen lieber Paracetamol nutzen (wenn für dich ok) – und bei Bedarf kurz checken lassen.",
      chips: ["Medikation", "Bluttest", "Ernährung"],
    };
  }

  if (isBlood) {
    return {
      headline: "Dein Blutbild: Meiste Werte top, 1 Optimierung möglich",
      sections: [
        {
          title: "Starke Werte",
          tone: "good",
          rows: [
            { icon: "check", title: "CRP", text: "0,3 mg/l (Entzündung niedrig)" },
            { icon: "check", title: "HbA1c", text: "5,4% (Blutzucker sehr gut)" },
            { icon: "check", title: "Regeneration", text: "78% Durchschnitt (Whoop)" },
          ],
        },
        {
          title: "Optimierbar",
          tone: "trend",
          rows: [
            { icon: "bolt", title: "Ferritin", text: "18 ng/ml (niedrig, optimal: 50–100) → kann HRV/Energie drücken" },
          ],
        },
      ],
      note: "Tipp: Eisen + Vitamin C (und Ursachen-Check) kann helfen – besonders wenn Müdigkeit/HRV niedrig ist.",
      chips: ["Bluttest", "Whoop", "Medikation"],
    };
  }

  if (isAvoid) {
    return {
      headline: "Lebensmittel: Basiskost gut, 3 individuelle Trigger",
      sections: [
        {
          title: "Was du gut verträgst",
          tone: "good",
          rows: [
            { icon: "check", title: "Gluten / Laktose / Nüsse", text: "keine Reaktionen" },
            { icon: "check", title: "Basiskost", text: "ohne Beschwerden (Symptomtagebuch)" },
          ],
        },
        {
          title: "Individuell meiden",
          tone: "warn",
          rows: [
            { icon: "warn", title: "Kohl / Hülsenfrüchte", text: "Blähungen + Bauchschmerzen (8× dokumentiert)" },
            { icon: "warn", title: "Histaminreich", text: "Rotwein / Käse / Tomaten → Kopfschmerz nach 4–6h" },
            { icon: "warn", title: "Fruktose >20g/Tag", text: "Durchfall (Fruktose-Malabsorption Test positiv)" },
          ],
        },
      ],
      note: "Tipp: Diese 3 Trigger 2 Wochen strikt meiden → oft klarer Effekt auf Beschwerden.",
      chips: ["Symptomtagebuch", "Labor", "Ernährung"],
    };
  }

  if (isTriggers) {
    return {
      headline: "Deine Beschwerden: Muster erkannt",
      sections: [
        {
          title: "Gute Phase",
          tone: "good",
          rows: [
            { icon: "check", title: "Beschwerdefrei", text: "18/30 Tage" },
            { icon: "check", title: "Wenn du so lebst", text: "7–8h Schlaf, moderates Training, Mahlzeiten regelmäßig" },
          ],
        },
        {
          title: "Trigger bei Attacken",
          tone: "warn",
          rows: [
            { icon: "moon", title: "Schlafdefizit", text: "<6h Schlaf + Ruhepuls >78 (Stress)" },
            { icon: "fire", title: "Histamin", text: "Rotwein/Käse 24–48h vorher" },
            { icon: "clock", title: "Unregelmäßige Medikation", text: "Betablocker >2h später als gewohnt" },
          ],
        },
      ],
      note: "Tipp: Mit konstantem Timing + Schlaf-Fokus kann man oft von ~6 auf 1–2 Attacken/Monat reduzieren.",
      chips: ["Whoop", "Yazio", "Medikation"],
    };
  }

  return null;
}

function fakeAssistantReply(userText: string): { text: string; sources: string[]; action?: Action } {
  const t = userText.toLowerCase();

  if (t.includes("schlaf") || t.includes("müde") || t.includes("muede")) {
    return {
      text:
        "Ich sehe Hinweise, dass Schlafqualität (v. a. Tiefschlaf) dein Bottleneck ist. Wenn du willst, analysiere ich Timing (Koffein, Essen, Licht) + deine letzten 7 Tage und gebe dir 3 konkrete Hebel.",
      sources: ["Oura", "Apple Health"],
    };
  }

  if (t.includes("supplement") || t.includes("routine") || t.includes("supplements")) {
    return {
      text:
        "Ich kann deine Supplement-Routine prüfen (Dosis, Timing, Interaktionen). Lade gern ein Foto der Liste oder ein Dokument hoch – dann mache ich einen sauberen Plan (morgens/abends).",
      sources: ["Medikationsliste", "Blutwerte"],
    };
  }

  if (t.includes("100") || t.includes("power") || t.includes("26%")) {
    return {
      text:
        "Dein Power-Score hängt stark davon ab, wie vollständig deine Daten sind. Momentan fehlt mir noch ein Teil (z. B. Dokumente/Profil-Infos). Wenn du dein Profil ergänzt, kann ich viel präziser werden.",
      sources: ["Profilstatus", "Apple Health"],
      action: { label: "Gehe zu Profil", kind: "go_profile" },
    };
  }

  return {
    text: "Verstanden. Willst du eher Schlaf, Fitness, Supplements oder Ernährung optimieren?",
    sources: ["Apple Health"],
  };
}

type SendOpts = { isAuto?: boolean };

export default function Chat({ onOpenHome, onOpenFolder, initialQuestion, userName }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [attachOpen, setAttachOpen] = useState(false);

  const [welcomeShown, setWelcomeShown] = useState(false);
  const [pendingFirstQ, setPendingFirstQ] = useState<string>("");

  const endRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);

  const hasText = input.trim().length > 0;

  const onboardingQuestions = useMemo(
    () => [
      // Longevity
      "Wie kann ich besser schlafen?",
      "Wirken meine Supplements?",
      "Wie werde ich fitter?",
      "Was sollte ich bei meiner Ernährung beachten?",

      // Chroniker
      "Vertragen sich meine Medikamente?",
      "Was bedeutet mein Blutbild?",
      "Welche Lebensmittel sollte ich meiden?",
      "Was triggert meine Beschwerden?",
    ],
    []
  );

  // cancel typing intervals/timeouts on unmount
  const timeoutsRef = useRef<number[]>([]);
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timeoutsRef.current.push(t);
    return t;
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Klick ausserhalb -> attach menu zu
  useEffect(() => {
    if (!attachOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".chatP-attachWrap")) setAttachOpen(false);
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [attachOpen]);

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { id: uid(), role: "user", kind: "text", text, ts: Date.now() }]);
  };

  const pushAssistantCard = (card: AnswerCard) => {
    setMessages((prev) => [...prev, { id: uid(), role: "assistant", kind: "card", card, ts: Date.now() }]);
  };

  const pushAssistantChoice = (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "assistant",
        kind: "choice",
        ts: Date.now(),
        choice: {
          prompt,
          options: [
            { label: "Ja", value: "yes" },
            { label: "Nein", value: "no" },
          ],
        },
      },
    ]);
  };

  const removeMsg = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const pushTyping = () => {
    const id = uid();
    setMessages((prev) => [
      ...prev,
      { id, role: "assistant", kind: "text", ts: Date.now(), isTyping: true, text: "" },
    ]);
    return id;
  };

  // typewriter for assistant text (always)
  const typeAssistantText = (full: string, sources?: string[], action?: Action) => {
    const id = uid();
    const startTs = Date.now();

    setMessages((prev) => [
      ...prev,
      { id, role: "assistant", kind: "text", ts: startTs, text: "", fullText: full, sources, action },
    ]);

    let i = 0;
    const speed = 14; // ms per char

    const tick = () => {
      i += 1;
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: full.slice(0, i) } : m)));
      if (i < full.length) later(tick, speed);
    };

    later(tick, 180);

    // return estimated duration so you can chain things after typing ends
    return 180 + full.length * speed;
  };

  const send = (text: string, opts?: SendOpts) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    pushUser(trimmed);
    setInput("");

    const typingId = pushTyping();
    const thinkingMs = opts?.isAuto ? 650 : 550;

    later(() => {
      removeMsg(typingId);

      const card = getCardForQuestion(trimmed);
      if (card) {
        pushAssistantCard(card);
        return;
      }

      const reply = fakeAssistantReply(trimmed);
      typeAssistantText(reply.text, reply.sources, reply.action);
    }, thinkingMs);
  };

  const onWelcomeChoice = (v: "yes" | "no") => {
    // alle choice msgs entfernen
    setMessages((prev) => prev.filter((m) => m.kind !== "choice"));

    if (v === "no") {
      typeAssistantText(
        "Alles klar 🙂 Dann stell mir einfach deine nächste Frage."
      );
      return;
    }

    const q = pendingFirstQ.trim();
    if (!q) return;

    pushUser(q);

    const card = getCardForQuestion(q);
    if (card) {
      pushAssistantCard(card);
      return;
    }

    const reply = fakeAssistantReply(q);
    typeAssistantText(reply.text, reply.sources, reply.action);
  };

  // Welcome + Frage anbieten (statt auto-send) + typed
  useEffect(() => {
    const q = (initialQuestion ?? "").trim();
    if (!q) return;
    if (welcomeShown) return;

    setWelcomeShown(true);
    setPendingFirstQ(q);

    const welcomeText =
      `Hallo ${userName}! Willkommen 👋\n\n` +
      `Ich bin OWNI – dein persönlicher KI-Gesundheitsassistent.\n` +
      `Ich bin hier und beantworte mit deinen Daten jede Frage, die du hast.\n` +
      `Ich helfe dir, deine Gesundheit zu optimieren.\n\n` +
      `Deine Frage aus dem Onboarding war:\n“${q}”\n\n` +
      `Willst du die Antwort jetzt sehen?`;

    const dur = typeAssistantText(welcomeText);

    // choice buttons erst nach dem Tippen einblenden
    later(() => {
      pushAssistantChoice("Antwort anzeigen?");
    }, dur + 120);
  }, [initialQuestion, userName, welcomeShown]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPickFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setAttachOpen(false);

    const label = `${file.type.startsWith("image/") ? "Foto" : "Datei"}: ${file.name}`;
    send(`Anhang • ${label}`);
  };

  const handleAction = (a?: Action) => {
    if (!a) return;
    if (a.kind === "go_profile") {
      typeAssistantText("Profil öffnen ist als nächstes dran (Hook wir bauen dann).", ["App"]);
    }
  };

  return (
    <div className="oh-screen">
      <div className="oh-safe chat-root">
        {/* Thread */}
        <div className="chatP">
          {messages.length === 0 ? (
            <div className="chatP-empty">
              {onboardingQuestions.map((q) => (
                <button key={q} className="chatP-quick" onClick={() => send(q)} type="button">
                  {q}
                </button>
              ))}
            </div>
          ) : (
            <div className="chatP-list">
              {messages.map((m) => (
                <div key={m.id} className={`chatP-row ${m.role === "user" ? "is-user" : "is-assistant"}`}>
                  <div className="chatP-msg">
                    {/* TEXT */}
                    {m.kind === "text" && (
                      <div className="chatP-bubble">
                        {m.isTyping ? (
                          <div className="chatP-typing" aria-label="Assistant tippt">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                          </div>
                        ) : (
                          <div className="chatP-text">{m.text}</div>
                        )}

                        {!m.isTyping && m.role === "assistant" && m.action ? (
                          <button type="button" className="chatP-actionBtn" onClick={() => handleAction(m.action)}>
                            {m.action.label}
                          </button>
                        ) : null}

                        {!m.isTyping && m.role === "assistant" && m.sources?.length ? (
                          <div className="chatP-sources">
                            {m.sources.map((s, i) => (
                              <span key={`${m.id}-s-${i}`} className="chatP-source">
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* CHOICE */}
                    {m.kind === "choice" && m.choice ? (
                      <div className="chatP-bubble">
                        <div className="chatP-text">{m.choice.prompt}</div>

                        <div className="chatChoiceRow">
                          {m.choice.options.map((o) => (
                            <button
                              key={o.value}
                              type="button"
                              className="chatChoiceBtn"
                              onClick={() => onWelcomeChoice(o.value)}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* ASSISTANT CARD */}
                    {m.kind === "card" && m.card ? (
                      <div className="chatCard">
                        <div className="chatCard-title">{m.card.headline}</div>

                        {m.card.sections.map((sec) => (
                          <div key={sec.title} className="chatCard-sec">
                            <div className="chatCard-secHead">
                              <SectionIcon tone={sec.tone} />
                              <span className="chatCard-secTitle">{sec.title}</span>
                            </div>

                            <div className="chatCard-rows">
                              {sec.rows.map((r, idx) => (
                                <div key={`${sec.title}-${idx}`} className="chatCard-row">
                                  <div className="chatCard-ico">
                                    <RowIcon name={r.icon} />
                                  </div>
                                  <div className="chatCard-rowText">
                                    <div className="chatCard-rowTitle">{r.title}</div>
                                    <div className="chatCard-rowSub">{r.text}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        {m.card.note ? <div className="chatCard-note">{m.card.note}</div> : null}

                        {m.card.chips?.length ? (
                          <div className="chatCard-chips">
                            {m.card.chips.map((c) => (
                              <span key={c} className="chatCard-chip">
                                {c}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="chatP-timeUnder">{formatTime(m.ts)}</div>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
          )}
        </div>

        {/* INPUT DOCK */}
        <div className="chatDock">
          <div className="chatP-inputBar">
            <div className="chatP-attachWrap">
              <button
                type="button"
                className={`chatP-plus ${attachOpen ? "is-open" : ""}`}
                onClick={() => setAttachOpen((s) => !s)}
                aria-label="Anhang"
              >
                <AddIcon className="chatP-plusIcon" />
              </button>

              {attachOpen && (
                <div className="chatP-attachMenu">
                  <button className="chatP-attachItem" type="button" onClick={() => cameraRef.current?.click()}>
                    <CameraIcon className="chatP-attachIcon" />
                    Foto aufnehmen
                  </button>

                  <button className="chatP-attachItem" type="button" onClick={() => fileRef.current?.click()}>
                    <DocsIcon className="chatP-attachIcon" />
                    Dokument hochladen
                  </button>
                </div>
              )}

              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={(e) => onPickFiles(e.target.files)}
              />

              <input ref={fileRef} type="file" hidden onChange={(e) => onPickFiles(e.target.files)} />
            </div>

            <input
              className="chatP-input2"
              placeholder="Stelle eine Frage..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && hasText) send(input);
              }}
            />

            <button
              className={`chatP-send2 ${hasText ? "" : "is-hidden"}`}
              onClick={() => send(input)}
              aria-label="Send"
              disabled={!hasText}
              type="button"
            >
              <SendIcon className="chatP-sendIcon" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="home-navigation" aria-label="Bottom Navigation">
        <button className="home-nav-item" onClick={onOpenHome} type="button">
          <HomeIcon className="home-nav-icon" />
          <span className="home-nav-label">Home</span>
        </button>

        <button className="home-nav-item home-nav-item--active" type="button">
          <AssistantIcon className="home-nav-icon" />
          <span className="home-nav-label">Assistent</span>
        </button>

        <button className="home-nav-item" onClick={onOpenFolder} type="button">
          <FolderIcon className="home-nav-icon" />
          <span className="home-nav-label">Ordner</span>
        </button>
      </nav>
    </div>
  );
}
