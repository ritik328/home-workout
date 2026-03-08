import { useState, useEffect } from "react";
import ParticleField from "../components/ParticleField";
import styles, { C } from "../components/styles";

// ─── DONE VIEW ────────────────────────────────────────────────────────────────

// Fix 18: Real count-up with setInterval
const CountUpStat = ({ icon, label, value, delay = 0 }) => {
    const isNum = typeof value === "number";
    const [display, setDisplay] = useState(isNum ? 0 : value);

    useEffect(() => {
        if (!isNum) return;
        const timer = setTimeout(() => {
            let current = 0;
            const steps = 20;
            const interval = setInterval(() => {
                current += Math.ceil(value / steps);
                if (current >= value) {
                    setDisplay(value);
                    clearInterval(interval);
                } else {
                    setDisplay(current);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [value, delay, isNum]);

    return (
        <div className="stat-pill" style={{ animationDelay: `${delay}ms`, opacity: 0, animation: "countUp 0.6s ease forwards" }}>
            <span>{icon}</span>
            <span style={{ color: "var(--accent)" }}>{display}</span>
            <span style={{ color: "var(--muted)", fontSize: "11px" }}>{label}</span>
        </div>
    );
};

const DoneView = ({ day, streak, done = 0, total = 84, onShare, onWeekView, onHome }) => {
    const pct = Math.round((done / total) * 100);

    return (
        <div style={{ ...styles.app, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <ParticleField count={80} intense={true} />

            <div style={{ textAlign: "center", padding: "40px 32px", maxWidth: "420px", position: "relative", zIndex: 10, animation: "fadeUp 0.8s ease" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌸</div>

                <h1 style={{ ...styles.heading, fontSize: "clamp(48px, 10vw, 68px)", fontWeight: 300, fontStyle: "italic", margin: "0 0 8px", color: "var(--text)" }}>
                    Well Done
                </h1>

                {streak > 0 && (
                    <p style={{ fontSize: "16px", color: "var(--accent)", marginBottom: "8px", animation: "flicker 2s ease infinite" }}>
                        🔥 {streak} day streak
                    </p>
                )}

                <p className="label" style={{ marginBottom: "32px" }}>
                    {day?.focus || "Session Complete"} · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                </p>

                {/* Fix 18: Animated stat pills with real count-up */}
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
                    <CountUpStat icon="✅" label="workouts" value={done} delay={200} />
                    <CountUpStat icon="🔥" label="streak" value={streak} delay={500} />
                    <CountUpStat icon="📈" label="complete" value={`${pct}%`} delay={800} />
                </div>

                <button
                    style={{ ...styles.btn, width: "100%", padding: "16px", marginBottom: "10px", fontSize: "14px" }}
                    onClick={onShare}
                >
                    📸 Share on Instagram
                </button>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ ...styles.btnOutline, flex: 1, padding: "12px" }} onClick={onWeekView}>← Week</button>
                    <button style={{ ...styles.btnOutline, flex: 1, padding: "12px", borderColor: "var(--accent)", color: "var(--accent)" }} onClick={onHome}>Home</button>
                </div>
            </div>
        </div>
    );
};

export default DoneView;
