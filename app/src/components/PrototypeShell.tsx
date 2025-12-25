import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function PrototypeShell({ children }: Props) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px]">
        {/* top bar OUTSIDE the phone */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-white/40">Onboarding</span>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xs px-3 py-1.5 rounded-full border transition
                       border-white/10 bg-white/10 text-white/80 hover:bg-white/15"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* phone frame */}
        <div className="rounded-[34px] overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          <div className="min-h-[760px] bg-[#1E293B]">{children}</div>
        </div>
      </div>
    </div>
  );
}
