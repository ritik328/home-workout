import { useEffect, useRef } from "react";
import ParticleField from "../components/ParticleField";
import styles, { C } from "../components/styles";

// ─── DONE VIEW ────────────────────────────────────────────────────────────────
const CountUpStat = ({ icon, label, value, delay = 0 }) => (
    <div className="stat-pill" style={{ animationDelay: `${delay}ms`, opacity: 0 }}>
        <span>{icon}</span>
        <span style={{ color: C.accent }}>{value}</span>
        <span style={{ color: C.muted, fontSize: "11px" }}>{label}</span>
    </div>
);

const DoneView = ({ day, streak, done = 0, total = 84, onShare, onWeekView, onHome }) => {
    const pct = Math.round((done / total) * 100);

    return (
        <div style={{ ...styles.app, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <ParticleField count={80} intense={true} />

            <div style={{ textAlign: "center", padding: "40px 32px", maxWidth: "420px", position: "relative", zIndex: 10, animation: "fadeUp 0.8s ease" }}>
                <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌸</div>

                <h1 style={{ ...styles.heading, fontSize: "clamp(48px, 10vw, 68px)", fontWeight: 300, fontStyle: "italic", margin: "0 0 8px", color: C.text }}>
                    Well Done
                </h1>

                {streak > 0 && (
                    <p style={{ fontSize: "16px", color: C.accent, marginBottom: "8px", animation: "flicker 2s ease infinite" }}>
                        🔥 {streak} day streak
                    </p>
                )}

                <p className="label" style={{ marginBottom: "32px" }}>
                    {day?.focus || "Session Complete"} · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                </p>

                {/* Animated stat pills */}
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
                    <CountUpStat icon="✅" label="workouts" value={done} delay={200} />
                    <CountUpStat icon="🔥" label="streak" value={streak} delay={400} />
                    <CountUpStat icon="📈" label="complete" value={`${pct}%`} delay={600} />
                </div>

                {/* Main CTA */}
                <button
                    style={{ ...styles.btn, width: "100%", padding: "16px", marginBottom: "10px", fontSize: "14px" }}
                    onClick={onShare}
                >
                    📸 Share on Instagram
                </button>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ ...styles.btnOutline, flex: 1, padding: "12px" }} onClick={onWeekView}>← Week</button>
                    <button style={{ ...styles.btnOutline, flex: 1, padding: "12px", borderColor: C.accent, color: C.accent }} onClick={onHome}>Home</button>
                </div>
            </div>
        </div>
    );
};

export default DoneView;
