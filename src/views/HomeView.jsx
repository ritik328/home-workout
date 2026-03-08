import styles, { C } from "../components/styles";
import ParticleField from "../components/ParticleField";
import ProgressRing from "../components/ProgressRing";
import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";
import { getAllLogs } from "../utils/storage";

// Stagger-animate each character of a string
const StaggerText = ({ text, style = {}, delay = 0 }) => (
    <span style={style}>
        {text.split("").map((char, i) => (
            <span
                key={i}
                className="hero-char"
                style={{ animationDelay: `${delay + i * 80}ms` }}
            >
                {char === " " ? "\u00a0" : char}
            </span>
        ))}
    </span>
);

// Day-of-week labels
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

const HomeView = ({ onStart, onNavigate, onSettings, streak = 0, userName = "", userPhoto = null, todayFocus = "", selectedWeek = 0, isDark = true, toggleTheme }) => {
    const [showDash, setShowDash] = useState(false);
    const [logs, setLogs] = useState({});

    useEffect(() => {
        setLogs(getAllLogs());
        const t = setTimeout(() => setShowDash(true), 2400);
        return () => clearTimeout(t);
    }, []);

    const weekDone = ["M", "T", "W", "T", "F", "S", "S"].map((_, d) => logs[`${selectedWeek}-${d}`]?.status === "completed");
    const weekCompletedCount = weekDone.filter(Boolean).length;
    const ringValue = weekCompletedCount / 7;
    const done = Object.values(logs).filter(l => l.status === "completed").length;
    const missed = Object.values(logs).filter(l => l.status === "missed").length;
    const hr = new Date().getHours();
    const greeting = hr < 12 ? "GOOD MORNING" : hr < 17 ? "GOOD AFTERNOON" : "GOOD EVENING";

    return (
        <div style={{ ...styles.app, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            <ParticleField count={showDash ? 30 : 55} />

            {/* ── SPLASH ─────────────────────────────────────── */}
            {!showDash && (
                <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10, padding: "0 40px", textAlign: "center" }}>
                    <h1 style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", fontSize: "clamp(52px, 12vw, 80px)", fontWeight: 300, lineHeight: 1.05, marginBottom: "24px", color: "var(--text)", fontStyle: "italic" }}>
                        <StaggerText text="Form &" delay={200} /><br />
                        <StaggerText text="Strength" style={{ fontStyle: "italic", color: "var(--accent)" }} delay={800} />
                    </h1>
                    <p className="label" style={{ marginBottom: "48px", animation: "fadeIn 0.8s ease 1.8s forwards", opacity: 0 }}>
                        Your 12-week Journey · At Home · No Equipment
                    </p>
                    <button className="btn-gold" onClick={() => { setShowDash(true); onStart(); }} style={{ animation: "fadeIn 0.8s ease 2s forwards", opacity: 0 }}>
                        Begin →
                    </button>
                    <div className="hide-scrollbar" style={{ position: "fixed", bottom: "60px", left: 0, right: 0, display: "flex", gap: "32px", overflowX: "auto", padding: "0 40px", animation: "fadeIn 1s ease 2.2s forwards", opacity: 0 }}>
                        {["🍑 Glutes", "💪 Chest", "🦵 Thighs", "🧘 Healing", "⚡ Core", "🏃 Cardio"].map(t => (
                            <span key={t} className="label" style={{ flexShrink: 0, color: "var(--muted)" }}>{t}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* ── DASHBOARD ──────────────────────────────────── */}
            {showDash && (
                <div style={styles.container} className="app-shell">
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", animation: "fadeUp 0.5s ease" }}>
                        <div>
                            <p className="label" style={{ marginBottom: "4px" }}>{greeting}</p>
                            <h2 style={{ ...styles.heading, fontSize: "26px", fontWeight: 300, margin: 0 }}>
                                {userName ? <>Hello, {userName} 👋</> : "Today is"}
                            </h2>
                            {todayFocus && <p style={{ fontSize: "15px", color: "var(--accent)", marginTop: "4px" }}>{todayFocus}</p>}
                        </div>
                        {/* Top-right icon cluster */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button onClick={toggleTheme} title={isDark ? "Light mode" : "Dark mode"} style={{ fontSize: "20px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}>
                                {isDark ? "☀️" : "🌙"}
                            </button>
                            <button onClick={onSettings} title="Settings" style={{ fontSize: "20px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                ⚙️
                            </button>
                            {userPhoto
                                ? <img src={userPhoto} alt="profile" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }} />
                                : <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: "1px solid var(--border)" }}>👤</div>
                            }
                        </div>
                    </div>

                    {/* Weekly ring + stats */}
                    <div style={{ ...styles.card, display: "flex", alignItems: "center", gap: "24px", marginBottom: "16px" }}>
                        <ProgressRing value={ringValue} size={96} stroke={6}>
                            <span style={{ ...styles.heading, fontSize: "28px", fontWeight: 300, color: C.accent }}>{weekCompletedCount}</span>
                            <span className="label" style={{ fontSize: "9px" }}>/ 7 days</span>
                        </ProgressRing>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[
                                { icon: "🔥", label: "STREAK", val: `${streak} days` },
                                { icon: "✅", label: "DONE", val: `${done}` },
                                { icon: "❌", label: "MISSED", val: `${missed}` },
                            ].map(s => (
                                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ fontSize: "14px" }}>{s.icon}</span>
                                    <span className="label" style={{ fontSize: "9px" }}>{s.label}</span>
                                    <span style={{ marginLeft: "auto", fontSize: "14px", color: C.text }}>{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Week dot strip */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                        {DAY_LABELS.map((d, i) => {
                            const log = logs[`${selectedWeek}-${i}`];
                            const completed = log?.status === "completed";
                            const missed = log?.status === "missed";
                            return (
                                <div key={i} style={{ textAlign: "center" }}>
                                    <div style={{
                                        width: "32px", height: "32px", borderRadius: "50%",
                                        background: completed ? C.accent : missed ? C.red : C.surface2,
                                        border: `1.5px solid ${completed ? C.accent : missed ? C.red : C.border}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "9px", color: completed || missed ? "#fff" : C.muted,
                                        margin: "0 auto 4px"
                                    }}>
                                        {completed ? "✓" : missed ? "✗" : d}
                                    </div>
                                    <span className="label" style={{ fontSize: "8px" }}>{d}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Today's workout card */}
                    <div style={{
                        background: C.surface, border: `1px solid ${C.border}`,
                        borderLeft: `3px solid ${C.accent}`,
                        borderRadius: "16px", padding: "20px 20px 20px 24px",
                        marginBottom: "16px", cursor: "pointer",
                        animation: "fadeUp 0.6s ease 0.2s both"
                    }} onClick={onStart}>
                        <p className="label" style={{ marginBottom: "8px" }}>Today's Workout</p>
                        <h3 style={{ ...styles.heading, fontSize: "22px", fontWeight: 300, margin: "0 0 12px" }}>
                            {todayFocus || "Begin Your Journey"}
                        </h3>
                        <button className="btn-gold" style={{ padding: "10px 24px", fontSize: "12px" }}>
                            Start →
                        </button>
                    </div>

                    <BottomNav active="home" onNavigate={onNavigate} />
                </div>
            )}
        </div>
    );
};

export default HomeView;
