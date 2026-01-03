import { useMemo, useRef, useState, useEffect } from "react";
import "./chatPanel.css";

// Icons
import CameraIcon from "../../assets/camera.svg?react";
import DocsIcon from "../../assets/document.svg?react";

type Role = "user" | "assistant";
type Msg = { 
  id: string;
  role: Role;
  text: string;
  ts: number;
  sources?: string[];
}
  

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function fakeAssistantReply(userText: string): { text: string; sources: string[] } {
  const baseSources = ["Blut Test", "Apple Health"];

  if (userText.toLowerCase().includes("schlaf")) {
    return {
      text: "Deine letzte Blutuntersuchung zeigt einen niedrigen Eisen- und B12-Spiegel. In Kombination mit kurzer Schlafdauer ist Müdigkeit zu erwarten. Ich werde B12 zu deinem Plan hinzufügen.",
      sources: baseSources,
    };
  }

  return {
    text: "Verstanden. Welche Daten oder Symptome sind für dich gerade am wichtigsten?",
    sources: baseSources,
  };
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `Heute, ${hh}:${mm}`;
}


export default function ChatPanel() {
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
      "Wie verbessere ich meinen Schlaf?",
      "Check meine Supplement-Routine",
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

        {/* Send erscheint erst bei Text — aber Platz bleibt reserviert */}
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
