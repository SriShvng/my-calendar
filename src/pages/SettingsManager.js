import React, { useState } from "react";

const SettingsManager = () => {
  const [settings, setSettings] = useState({ theme: "light" });

  const handleChangeTheme = async () => {
    const newTheme = settings.theme === "light" ? "dark" : "light";
    await fetch("/api/settings/theme", {
      method: "PUT",
      body: JSON.stringify({ theme: newTheme }),
      headers: { "Content-Type": "application/json" },
    });
    setSettings({ ...settings, theme: newTheme });
  };

  return (
    <div>
      <h2>Settings Configuration</h2>
      <button onClick={handleChangeTheme}>Switch Theme</button>
      <p>Current Theme: {settings.theme}</p>
    </div>
  );
};

export default SettingsManager;
