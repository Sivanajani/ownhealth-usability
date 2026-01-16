import { useMemo, useRef, useState, useEffect } from "react";
import "./chatPanel.css";

// Icons
import CameraIcon from "../../assets/camera.svg?react";
import DocsIcon from "../../assets/document.svg?react";

type Role = "user" | "assistant";

type Action = {
  label: string;
  kind: "go_profile";
};

type Msg = {
  id: string;
  role: Role;
  text: string;
  ts: number;
  sources?: string[];
  action?: Action;
};

type Props = {
  onGoToProfile?: () => void;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function fakeAssistantReply(userText: string): { text: string; sources: string[]; action?: Action } {
  const t = userText.toLowerCase();

  // 1) Müdigkeit trotz Schlaf
  if (t.includes("schlaf") || t.includes("müde") || t.includes("muede")) {
    return {
      text:
        "Deine letzte Blutuntersuchung zeigt einen niedrigen Eisen- und B12-Spiegel. In Kombination mit kurzer Schlafdauer ist Müdigkeit zu erwarten. Ich werde B12 zu deinem Plan hinzufügen.",
      sources: ["Blut Test", "Apple Health"],
    };
  }

  // 2) Supplement Routine check
  if (t.includes("supplement") || t.includes("routine") || t.includes("supplements")) {
    return {
      text:
        "Ich hab’s gecheckt: In Apple Health sehe ich regelmässigere Schlaf-/Energie-Schwankungen, und in deiner Medikationsliste fehlt aktuell ein klarer Einnahme-Plan. Vorschlag: B12 morgens (konstant), Eisen getrennt von Kaffee/Milchprodukten und nicht zusammen mit Calcium/Magnesium, und ein fixer Wochenrhythmus (z. B. Mo–So gleiche Zeiten).",
      sources: ["Apple Health", "Medikationsliste"],
    };
  }

  // 3) 100% Power / was bedeutet 26%
  if (t.includes("100") || t.includes("power") || t.includes("26%")) {
    return {
      text:
        "Die 26% sind dein aktueller Daten- und Profil-Score: Momentan ist nur Apple Health verbunden. Wenn du dein Profil ausfüllst und Dokumente/Infos ergänzt, kann ich deine Empfehlungen genauer personalisieren und dir konkrete Schritte geben.",
      sources: ["Apple Health", "Profilstatus"],
      action: { label: "Gehe zu Profil", kind: "go_profile" },
    };
  }

  // Default
  return {
    text: "Verstanden. Welche Daten oder Symptome sind für dich gerade am wichtigsten?",
    sources: ["Apple Health"],
  };
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `Heute, ${hh}:${mm}`;
}

export default function ChatPanel({ onGoToProfile }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [attachOpen, setAttachOpen] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const cameraRef = useRef<HTMLInputElement | null>(null);

  const hasText = input.trim().length > 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Klick ausserhalb → Menü schliessen
  useEffect(() => {
    if (!attachOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".chatP-attachWrap")) {
        setAttachOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [attachOpen]);

  const quickQuestions = useMemo(
    () => [
      "Warum bin ich trotz 8h Schlaf müde?",
      "Check meine Supplement-Routine",
      "Wie erreiche ich 100 % Power?",
    ],
    []
  );

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", text: trimmed, ts: Date.now() },
    ]);
    setInput("");

    setTimeout(() => {
      const reply = fakeAssistantReply(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          text: reply.text,
          sources: reply.sources,
          action: reply.action,
          ts: Date.now(),
        },
      ]);
    }, 450);
  };

  const onPickFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setAttachOpen(false);
    send(`📎 ${file.type.startsWith("image/") ? "Foto aufgenommen" : "Datei hochgeladen"}: ${file.name}`);
  };

  const handleAction = (a: Action) => {
    if (a.kind === "go_profile") onGoToProfile?.();
  };

  return (
    <div className="chatP">
      {messages.length === 0 ? (
        <div className="chatP-empty">
          {quickQuestions.map((q) => (
            <button key={q} className="chatP-quick" onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>
      ) : (
        <div className="chatP-list">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chatP-row ${m.role === "user" ? "is-user" : "is-assistant"}`}
            >
              <div className="chatP-msg">
                <div className="chatP-bubble">
                  <div className="chatP-text">{m.text}</div>

                  {/* Action Button (nur Assistant) */}
                  {m.role === "assistant" && m.action ? (
                    <button
                      type="button"
                      className="chatP-actionBtn"
                      onClick={() => handleAction(m.action!)}
                    >
                      {m.action.label}
                    </button>
                  ) : null}

                  {m.role === "assistant" && m.sources?.length ? (
                    <div className="chatP-sources">
                      {m.sources.map((s, i) => (
                        <span key={`${m.id}-s-${i}`} className="chatP-source">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="chatP-timeUnder">{formatTime(m.ts)}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}

      {/* INPUT */}
      <div className="chatP-inputBar">
        {/* + Button */}
        <div className="chatP-attachWrap">
          <button
            type="button"
            className={`chatP-plus ${attachOpen ? "is-open" : ""}`}
            onClick={() => setAttachOpen((s) => !s)}
            aria-label="Anhang"
          >
            +
          </button>

          {attachOpen && (
            <div className="chatP-attachMenu">
              <button className="chatP-attachItem" onClick={() => cameraRef.current?.click()}>
                <CameraIcon className="chatP-attachIcon" />
                Foto aufnehmen
              </button>

              <button className="chatP-attachItem" onClick={() => fileRef.current?.click()}>
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

          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={(e) => onPickFiles(e.target.files)}
          />
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
        >
          ↑
        </button>
      </div>
    </div>
  );
}
