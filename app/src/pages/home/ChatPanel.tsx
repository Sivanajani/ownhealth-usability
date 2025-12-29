import { useMemo, useRef, useState, useEffect } from "react";
import "./chatPanel.css";

type Role = "user" | "assistant";
type Msg = { id: string; role: Role; text: string; ts: number; };

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function fakeAssistantReply(userText: string) {
  if (userText.toLowerCase().includes("schlaf")) {
    return "Ich kann dir dabei helfen. Magst du mir sagen, wann du ins Bett gehst, wann du aufstehst und ob du nachts oft wach wirst?";
  }
  if (userText.toLowerCase().includes("müde")) {
    return "Müdigkeit kann viele Ursachen haben. Hast du in den letzten Tagen Stress, wenig Tageslicht oder späte Mahlzeiten gehabt?";
  }
  return "Verstanden. Welche Daten oder Symptome sind für dich gerade am wichtigsten?";
}

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickQuestions = useMemo(
    () => [
      "Warum bin ich trotz 8h Schlaf müde?",
      "Wie kann ich mich an aktiven Tagen erholen?",
      "Wie verbessere ich meinen Schlaf?",
    ],
    []
  );

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Msg = { id: uid(), role: "user", text: trimmed, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    window.setTimeout(() => {
      const assistantMsg: Msg = { id: uid(), role: "assistant", text: fakeAssistantReply(trimmed), ts: Date.now() };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 450);
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
            <div key={m.id} className={`chatP-row ${m.role === "user" ? "is-user" : "is-assistant"}`}>
              <div className="chatP-bubble">{m.text}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}

      <div className="chatP-inputRow">
        <input
          className="chatP-input"
          placeholder="Stelle eine Frage..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send(input);
          }}
        />
        <button className="chatP-send" onClick={() => send(input)} aria-label="Send">
          ↑
        </button>
      </div>
    </div>
  );
}
