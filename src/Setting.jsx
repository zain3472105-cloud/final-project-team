
import { useEffect, useState } from "react";
import {
  Settings,
  UserRound,
  Bell,
  Palette,
  Globe,
  Save,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

import "./Setting.css";

const defaultSettings = {
  name: "Nooria",
  email: "nooria@example.com",
  dueReminders: true,
  newBooks: false,
  darkMode: false,
  language: "English",
};

function Setting() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("myLibrarySettings");
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.toggle("library-dark-mode", settings.darkMode);

    return () => {
      document.body.classList.remove("library-dark-mode");
    };
  }, [settings.darkMode]);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setMessage("");
  };

  const saveSettings = (event) => {
    event.preventDefault();

    if (!settings.name.trim() || !settings.email.trim()) {
      setMessage("Please enter your name and email address.");
      return;
    }

    try {
      localStorage.setItem("myLibrarySettings", JSON.stringify(settings));

      const savedProfile = JSON.parse(
        localStorage.getItem("myLibraryProfile") || "{}"
      );

      localStorage.setItem(
        "myLibraryProfile",
        JSON.stringify({
          ...savedProfile,
          name: settings.name.trim(),
          email: settings.email.trim(),
        })
      );

      localStorage.setItem(
        "myLibraryNotifications",
        String(settings.dueReminders || settings.newBooks)
      );

      setMessage("Your settings have been saved successfully!");
    } catch {
      setMessage("Unable to save settings. Please try again.");
    }
  };

  return (
    <main className="settings-page">
      <header className="settings-header">
        <div className="settings-title-icon">
          <Settings size={25} />
        </div>

        <div>
          <span className="settings-eyebrow">PERSONALIZE YOUR SPACE</span>
          <h1>Settings</h1>
          <p>Manage your library account and preferences.</p>
        </div>
      </header>

      {message && (
        <div className="settings-message" role="status">
          <CheckCircle size={19} />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={saveSettings}>
        <div className="settings-container">
          {/* Account Settings */}
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon account-setting-icon">
                <UserRound size={22} />
              </div>

              <div>
                <h2>Account Settings</h2>
                <p>Manage your personal information.</p>
              </div>
            </div>

            <div className="settings-form">
              <div className="form-group">
                <label htmlFor="settings-name">Full Name</label>
                <input
                  id="settings-name"
                  type="text"
                  value={settings.name}
                  placeholder="Enter your name"
                  onChange={(event) =>
                    updateSetting("name", event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="settings-email">Email Address</label>
                <input
                  id="settings-email"
                  type="email"
                  value={settings.email}
                  placeholder="Enter your email"
                  onChange={(event) =>
                    updateSetting("email", event.target.value)
                  }
                  required
                />
              </div>
            </div>
          </section>
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon notification-setting-icon">
                <Bell size={22} />
              </div>

              <div>
                <h2>Notifications</h2>
                <p>Choose which notifications you want to receive.</p>
              </div>
            </div>

            <div className="setting-option">
              <div>
                <h3>Due Date Reminders</h3>
                <p>Remind me when a borrowed book is almost due.</p>
              </div>

              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={settings.dueReminders}
                  onChange={(event) =>
                    updateSetting("dueReminders", event.target.checked)
                  }
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="setting-option">
              <div>
                <h3>New Books</h3>
                <p>Keep me updated about newly added books.</p>
              </div>

              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={settings.newBooks}
                  onChange={(event) =>
                    updateSetting("newBooks", event.target.checked)
                  }
                />
                <span className="settings-slider" />
              </label>
            </div>
          </section>
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon appearance-setting-icon">
                {settings.darkMode ? (
                  <Moon size={22} />
                ) : (
                  <Palette size={22} />
                )}
              </div>

              <div>
                <h2>Appearance</h2>
                <p>Customize the look of your library dashboard.</p>
              </div>
            </div>

            <div className="setting-option">
              <div>
                <h3>Dark Mode</h3>
                <p>
                  {settings.darkMode
                    ? "Dark mode is enabled."
                    : "Use a darker appearance for the dashboard."}
                </p>
              </div>

              <label className="settings-switch">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(event) =>
                    updateSetting("darkMode", event.target.checked)
                  }
                />
                <span className="settings-slider" />
              </label>
            </div>

            <div className="appearance-preview">
              <div className="preview-window">
                <div className="preview-sidebar" />
                <div className="preview-content">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div>
                <strong>{settings.darkMode ? "Dark appearance" : "Light appearance"}</strong>
                <p>Preview of your selected theme.</p>
              </div>

              {settings.darkMode ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </div>
          </section>
          <section className="settings-card">
            <div className="settings-card-header">
              <div className="settings-icon language-setting-icon">
                <Globe size={22} />
              </div>

              <div>
                <h2>Language</h2>
                <p>Select your preferred language.</p>
              </div>
            </div>

            <div className="form-group language-form-group">
              <label htmlFor="settings-language">Display Language</label>

              <select
                id="settings-language"
                value={settings.language}
                onChange={(event) =>
                  updateSetting("language", event.target.value)
                }
              >
                <option value="English">English</option>
                <option value="Persian">Persian</option>
                <option value="Arabic">Arabic</option>
              </select>

              <small>
                Your selection is saved, but translating all page content
                requires a separate language feature.
              </small>
            </div>
          </section>
        </div>

        <div className="settings-save-area">
          <p>Your changes are not saved until you click Save Changes.</p>

          <button type="submit" className="save-button">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>

      <footer className="settings-footer">
        <p>© 2026 My Library. All rights reserved.</p>
        <span>Make your library feel like yours. ♡</span>
      </footer>
    </main>
  );
}

export default Setting;