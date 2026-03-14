import { useState } from "react";
import {
    getSetting, setSetting, getName, setName, getPhoto, setPhoto,
    getDarkMode, setDarkMode, getLang, setLang,
    getDurationMode, setDurationMode, getStartDate, forceSetStartDate
} from "../utils/storage";

import styles from "../components/styles";

// Bilingual labels
const T = {
    en: {
        title: "Settings",
        profile: "Profile",
        namePlaceholder: "Your name",
        photoBtn: "Choose Photo",
        program: "Program",
        startDate: "Program Start Date",
        durationMode: "Workout Duration",
        dur1: "1 Hour",
        dur15: "1.5 Hours",
        preferences: "Preferences",
        darkMode: "Dark Mode",
        language: "Language",
        save: "Save Settings",
        saved: "✓ Saved!",
    },
    hi: {
        title: "सेटिंग्स",
        profile: "प्रोफ़ाइल",
        namePlaceholder: "आपका नाम",
        photoBtn: "फ़ोटो चुनें",
        program: "प्रोग्राम",
        startDate: "शुरुआत की तारीख",
        durationMode: "वर्कआउट अवधि",
        dur1: "1 घंटा",
        dur15: "1.5 घंटे",
        preferences: "प्राथमिकताएं",
        darkMode: "डार्क मोड",
        language: "भाषा",
        save: "सेटिंग्स सहेजें",
        saved: "✓ सहेजा गया!",
    }
};

const SectionTitle = ({ children }) => (
    <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#8b7355", margin: "24px 0 8px", textTransform: "uppercase" }}>
        {children}
    </p>
);

const ToggleSwitch = ({ value, onChange }) => (
    <div
        onClick={() => onChange(!value)}
        style={{
            width: "48px", height: "26px", borderRadius: "13px",
            background: value ? "#3a3028" : "#d4c9b8",
            cursor: "pointer", position: "relative", flexShrink: 0,
            transition: "background 0.3s"
        }}
    >
        <div style={{
            position: "absolute", top: "3px",
            left: value ? "25px" : "3px",
            width: "20px", height: "20px", borderRadius: "50%",
            background: "#fff",
            transition: "left 0.3s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
        }} />
    </div>
);

const SettingsView = ({ onBack, onSettingsChange, isDark }) => {
    const lang = getLang();
    const t = T[lang] || T.en;

    const [name, setNameState] = useState(getName());
    const [photo, setPhotoState] = useState(getPhoto());
    const [startDate, setStartDateSt] = useState(getStartDate() || "");
    const [darkMode, setDarkModeState] = useState(isDark ?? getDarkMode()); // Fix 13: use prop

    const [language, setLangState] = useState(lang);
    const [durMode, setDurModeState] = useState(getDurationMode());
    const [saved, setSaved] = useState(false);

    const cur = T[language] || T.en;

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setPhotoState(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        setName(name);
        if (photo) setPhoto(photo);
        if (startDate) forceSetStartDate(startDate); // Fix 4: always updates

        setDarkMode(darkMode);
        setLang(language);
        setDurationMode(durMode);
        setSaved(true);
        setTimeout(() => { setSaved(false); onSettingsChange?.(); }, 1200);
    };

    const row = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" };

    return (
        <div style={styles.app}>
            <div style={styles.container}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                    <button className="clay-btn-outline" style={{ padding: "8px 16px" }} onClick={onBack}>← Back</button>
                    <h2 style={{ ...styles.heading, fontSize: "28px", fontWeight: "300", margin: 0 }}>{cur.title}</h2>
                </div>

                {/* —— PROFILE —— */}
                <SectionTitle>{cur.profile}</SectionTitle>
                <div className="clay-card" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden", background: "#e0d8cc", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
                        {photo ? <img src={photo} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
                    </div>
                    <div style={{ flex: 1 }}>
                        <input
                            value={name}
                            onChange={e => setNameState(e.target.value)}
                            placeholder={cur.namePlaceholder}
                            style={{ width: "100%", border: "none", borderBottom: "1px solid #d4c9b8", background: "transparent", fontSize: "16px", fontFamily: "inherit", color: "#3a3028", outline: "none", paddingBottom: "4px", marginBottom: "10px", boxSizing: "border-box" }}
                        />
                        <label className="clay-btn-outline" style={{ fontSize: "11px", letterSpacing: "1px", cursor: "pointer", padding: "6px 12px", display: "inline-block" }}>
                            {cur.photoBtn}
                            <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} />
                        </label>
                    </div>
                </div>

                {/* —— PROGRAM —— */}
                <SectionTitle>{cur.program}</SectionTitle>
                <div className="clay-card">
                    <div style={row}>
                        <span style={{ fontSize: "14px" }}>{cur.startDate}</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDateSt(e.target.value)}
                            style={{ border: "1px solid #d4c9b8", borderRadius: "8px", padding: "6px 10px", fontFamily: "inherit", fontSize: "13px", color: "#3a3028", background: "transparent", cursor: "pointer" }}
                        />
                    </div>
                    <div style={row}>
                        <span style={{ fontSize: "14px" }}>{cur.durationMode}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                            {["1hr", "1.5hr"].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setDurModeState(v)}
                                    className={durMode === v ? "clay-btn" : "clay-btn-outline"}
                                    style={{ padding: "6px 14px", fontSize: "12px" }}
                                >
                                    {v === "1hr" ? cur.dur1 : cur.dur15}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* —— PREFERENCES —— */}
                <SectionTitle>{cur.preferences}</SectionTitle>
                <div className="clay-card">
                    <div style={row}>
                        <span style={{ fontSize: "14px" }}>{cur.darkMode}</span>
                        <ToggleSwitch value={darkMode} onChange={setDarkModeState} />
                    </div>
                    <div style={row}>
                        <span style={{ fontSize: "14px" }}>{cur.language}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                            {["en", "hi"].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setLangState(v)}
                                    className={language === v ? "clay-btn" : "clay-btn-outline"}
                                    style={{ padding: "6px 14px", fontSize: "12px" }}
                                >
                                    {v === "en" ? "EN" : "हि"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div style={{ marginTop: "28px" }}>
                    <button className="clay-btn" style={{ width: "100%", padding: "16px" }} onClick={handleSave}>
                        {saved ? cur.saved : cur.save}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
