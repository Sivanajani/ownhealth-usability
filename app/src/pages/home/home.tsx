// src/pages/home/home.tsx
import { useEffect, useState } from "react";
import "./home.css";

import CalendarIcon from "../../assets/calendar.svg?react";
import BulbIcon from "../../assets/bulb.svg?react";
import UploadIcon from "../../assets/upload.svg?react";
import FoodIcon from "../../assets/restaurant.svg?react";
import SymptomIcon from "../../assets/pills.svg?react";
import DocumentIcon from "../../assets/document.svg?react";
import HomeIcon from "../../assets/home.svg?react";
import AssistantIcon from "../../assets/chatbot.svg?react";
import FolderIcon from "../../assets/folder.svg?react";
import SettingsIcon from "../../assets/setting.svg?react";
import RefreshIcon from "../../assets/refresh.svg?react";
import LockIcon from "../../assets/lock.svg?react";
import CheckIcon from "../../assets/check.svg?react";
import ChevronRightIcon from "../../assets/chevron-right.svg?react";


type Props = {  
  hasSeenHomeInsight: boolean;
  onSeenHomeInsight: () => void;
  onOpenFolder: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
};

export default function Home({  
  hasSeenHomeInsight,
  onSeenHomeInsight,
  onOpenFolder,
  onOpenSettings,
  onOpenProfile,
}: Props) {
  const [profilePower, setProfilePower] = useState(26);
  const [currentTime, setCurrentTime] = useState("");

  // Format date to "Heute, 14:30" style
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      const formatted = now.toLocaleDateString('de-DE', options);
      setCurrentTime(formatted.charAt(0).toUpperCase() + formatted.slice(1));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simulate profile power completion
  useEffect(() => {
    const timer = setTimeout(() => {
      if (profilePower < 100) {
        setProfilePower(prev => Math.min(prev + 2, 100));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [profilePower]);

  // mark as seen once rendered
  useEffect(() => {
    if (!hasSeenHomeInsight) {
      onSeenHomeInsight();
    }
  }, [hasSeenHomeInsight, onSeenHomeInsight]);

  return (
    <div className="home-root">
      <div className="home-content">
        {/* Top bar */}
        <div className="home-top">
          <button 
            className="home-refresh" 
            type="button" 
            aria-label="Aktualisieren"
            onClick={() => setProfilePower(26)}
          >
            <RefreshIcon className="home-refresh-icon" />
          </button>

          <div className="home-top-meta">
            <div className="home-lock">
              <LockIcon className="home-lock-icon" />
              <span>Verschlüsselt</span>
            </div>
            <div className="home-date">{currentTime}</div>
          </div>

          <div className="home-top-right">
            <div className="home-power" onClick={onOpenProfile} style={{ cursor: 'pointer' }}>
              <div className="home-power-circle" aria-label="Profil-Power">
                <div className="home-power-ring">
                  <svg className="home-power-ring-svg" viewBox="0 0 100 100">
                    <circle className="home-power-ring-bg" cx="50" cy="50" r="45" />
                    <circle 
                      className="home-power-ring-fill" 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      strokeDasharray={`${profilePower * 2.83} 283`}
                    />
                  </svg>
                </div>
                <span className="home-power-value">{profilePower}%</span>
              </div>
              <div className="home-power-label">Profil-Power</div>
            </div>

            <button 
              className="home-gear" 
              type="button" 
              aria-label="Einstellungen" 
              onClick={onOpenSettings}
            >
              <SettingsIcon className="home-gear-icon" />
            </button>
          </div>
        </div>



        {/* Insight card */}
        <div className="home-insight-card">
          <div className="home-insight-header">
            <BulbIcon className="home-insight-icon" />
            <div className="home-insight-tag">Neue Erkenntnis</div>
          </div>
          <div className="home-insight-content">
            <h3 className="home-insight-title">Muster erkannt</h3>
            <p className="home-insight-text">
              Deine Energie-Werte steigen stabil an, seitdem du Vitamin B12 nimmst.
            </p>
          </div>
          <button className="home-insight-button" type="button">
            Details ansehen
            <ChevronRightIcon className="home-insight-chevron" />
          </button>
        </div>

        {/* Today's schedule */}
        <div className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Heute</h2>
            <button className="home-section-action" type="button">
              Alle anzeigen
            </button>
          </div>

          <div className="home-schedule">
            <div className="home-appointment">
              <div className="home-appointment-icon">
                <CalendarIcon className="home-appointment-svg" />
              </div>
              <div className="home-appointment-details">
                <div className="home-appointment-time">16:30</div>
                <div className="home-appointment-title">Dr. Meier • Allgemeinarzt</div>
                <div className="home-appointment-subtitle">Routine-Untersuchung</div>
              </div>
              <div className="home-appointment-status">
                <CheckIcon className="home-appointment-check" />
                <span>Bericht erstellt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Aufgaben</h2>
            <button className="home-section-action" type="button">
              Alle anzeigen
            </button>
          </div>

          <div className="home-tasks">
            <div className="home-task home-task--completed">
              <div className="home-task-check">
                <CheckIcon className="home-task-check-icon" />
              </div>
              <div className="home-task-content">
                <div className="home-task-title">Vitamin B12</div>
                <div className="home-task-subtitle">Nüchtern, 07:00–10:00</div>
              </div>
              <div className="home-task-time">09:15</div>
            </div>

            <div className="home-task home-task--pending">
              <div className="home-task-check"></div>
              <div className="home-task-content">
                <div className="home-task-title">Kiri</div>
                <div className="home-task-subtitle">Mit Essen, 19:00–22:00</div>
              </div>
              <div className="home-task-reminder">In 2h</div>
            </div>

            <button 
              className="home-task home-task--action" 
              type="button" 
              onClick={onOpenFolder}
            >
              <div className="home-task-icon">
                <UploadIcon className="home-task-action-icon" />
              </div>
              <div className="home-task-content">
                <div className="home-task-title">Bluttest hochladen</div>
                <div className="home-task-subtitle">+15% Profil-Power</div>
              </div>
              <ChevronRightIcon className="home-task-chevron" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="home-section">
          <h2 className="home-section-title">Schnellzugriff</h2>
          <div className="home-quick-actions">
            <button className="home-quick-action" type="button">
              <div className="home-quick-action-icon home-quick-action-icon--food">
                <FoodIcon className="home-quick-action-svg" />
              </div>
              <div className="home-quick-action-label">Ernährung</div>
            </button>

            <button className="home-quick-action" type="button">
              <div className="home-quick-action-icon home-quick-action-icon--symptom">
                <SymptomIcon className="home-quick-action-svg" />
              </div>
              <div className="home-quick-action-label">Symptom</div>
            </button>

            <button className="home-quick-action" type="button">
              <div className="home-quick-action-icon home-quick-action-icon--document">
                <DocumentIcon className="home-quick-action-svg" />
              </div>
              <div className="home-quick-action-label">Dokument</div>
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className="home-navigation">
          <button className="home-nav-item home-nav-item--active" type="button">
            <HomeIcon className="home-nav-icon" />
            <span className="home-nav-label">Home</span>
          </button>

          <button className="home-nav-item" type="button">
            <AssistantIcon className="home-nav-icon" />
            <span className="home-nav-label">Assistent</span>
          </button>

          <button className="home-nav-item" type="button" onClick={onOpenFolder}>
            <FolderIcon className="home-nav-icon" />
            <span className="home-nav-label">Ordner</span>
          </button>
        </nav>
      </div>
    </div>
  );
}