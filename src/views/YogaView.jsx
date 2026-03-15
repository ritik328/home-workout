import { useState } from "react";
import useTimer from "../hooks/useTimer";
import ProgressRing from "../components/ProgressRing";
import BottomNav from "../components/BottomNav";
import styles from "../components/styles";


// ─── YOGA / RECOVERY VIEW ────────────────────────────────────────────────────
const BREATH_PHASES = ["BREATHE IN", "HOLD", "BREATHE OUT", "HOLD"];
const BREATH_COUNTS = [4, 4, 6, 2]; // 4-4-6-2 box breathing

const YogaView = ({ day, onNavigate, onBack }) => {
    const [poseIdx, setPoseIdx] = useState(0);
    const [breathPhase, setBreathPhase] = useState(0);

    const poses = day?.exercises || [];
    const pose = poses[poseIdx];

    // ── Breath cycle timer ──────────────────────────────────────────────────
    const { seconds: breathSeconds, start: startBreath, pause: pauseBreath, reset: resetBreath } =
        useTimer(BREATH_COUNTS[breathPhase], () => {
            const next = (breathPhase + 1) % 4;
            setBreathPhase(next);
            resetBreath(BREATH_COUNTS[next]);
        });

    // ── Pose hold timer ─────────────────────────────────────────────────────
    const { seconds: poseSeconds, running: poseTimer, start: startPose, pause: pausePose, reset: resetPose } =
        useTimer(pose?.time || 60, () => {
            if (poseIdx < poses.length - 1) {
                const next = poseIdx + 1;
                setPoseIdx(next);
                resetPose(poses[next]?.time || 60);
            }
        });

    const poseProgress = 1 - poseSeconds / (pose?.time || 60);
    const breathProgress = 1 - breathSeconds / BREATH_COUNTS[breathPhase];

    const breathLabel = BREATH_PHASES[breathPhase];

    // Ring size pulses gently on inhale/exhale
    const ringSize = breathPhase === 0 ? 140 + breathProgress * 16
        : breathPhase === 1 ? 156
            : breathPhase === 2 ? 156 - breathProgress * 16
                : 140;

    const poseEmoji = {
        "Neck Roll": "🔄", "Cat-Cow Stretch": "🐈", "Child's Pose": "🧎",
        "Downward Dog": "🐕", "Cobra Pose": "🐍", "Warrior I": "⚔️",
        "Warrior II": "🏹", "Seated Twist": "🌀", "Bridge Pose": "🌉",
        "Legs Up Wall": "🦵", "Pigeon Pose": "🕊️",
    };

    return (
        <div style={{ ...styles.app, minHeight: "100vh" }}>
            <div style={styles.container}>


                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                    <button style={{ fontSize: "20px", color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }} onClick={onBack}>←</button>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "2px" }}>🧘 YOGA & RECOVERY</p>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontSize: "26px", fontWeight: 300, margin: 0 }}>
                            Sunday Healing
                        </h2>
                    </div>
                    <span style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "0.1em" }}>{poses.length} poses</span>
                </div>

                {/* ── BOX BREATHING ───────────────────────────────────────────── */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "20px" }}>
                        BOX BREATHING
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                        <div style={{
                            width: `${ringSize}px`, height: `${ringSize}px`,
                            borderRadius: "50%",
                            border: "1px solid var(--border)",
                            boxShadow: breathPhase === 0 || breathPhase === 1 ? "0 0 20px var(--accent-glow)" : "none",
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.4s ease",
                        }}>
                            <span style={{ fontSize: "40px", fontWeight: 200, color: "var(--accent)", lineHeight: 1 }}>
                                {breathSeconds}
                            </span>
                            <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--muted)", marginTop: "4px" }}>
                                {breathLabel}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "14px" }}>
                        {BREATH_PHASES.map((p, i) => (
                            <span key={i} style={{
                                fontSize: "11px", letterSpacing: "0.1em",

                                color: breathPhase === i ? "var(--accent)" : "var(--border)",
                                textTransform: "uppercase", transition: "color 0.3s",
                            }}>
                                {p.split(" ")[0]}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={startBreath}
                        className="glass-btn"
                        style={{ width: "100%", maxWidth: "200px" }}
                    >
                        Start Breathing
                    </button>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--muted)" }}>POSES</span>
                    <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
                </div>

                {/* ── CURRENT POSE CARD ───────────────────────────────────────── */}
                <div className="glass-card" style={{ marginBottom: "20px", textAlign: "center" }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "8px" }}>
                        POSE {poseIdx + 1} OF {poses.length}
                    </p>
                    <div style={{ fontSize: "48px", marginBottom: "8px" }}>{poseEmoji[pose?.name] || "🧘"}</div>
                    <h3 style={{ ...styles.heading, fontSize: "30px", fontWeight: 300, fontStyle: "italic", color: "var(--text)", margin: "0 0 4px" }}>
                        {pose?.name}
                    </h3>

                    <p style={{ fontSize: "13px", letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "10px" }}>
                        {pose?.reps} · {pose?.targets}
                    </p>
                    <p style={{ fontSize: "15px", color: "var(--muted)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "20px" }}>
                        "{pose?.tip}"
                    </p>

                    {/* Pose hold timer ring */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                        <ProgressRing value={poseProgress} size={120} stroke={3} color="var(--accent)">
                            <span style={{ fontSize: "36px", fontWeight: 200, color: "var(--accent)", lineHeight: 1 }}>
                                {poseSeconds}
                            </span>
                            <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted)", marginTop: "2px" }}>
                                hold
                            </span>
                        </ProgressRing>
                    </div>

                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        {poseIdx > 0 && (
                            <button onClick={() => { pausePose(); const p = poseIdx - 1; setPoseIdx(p); resetPose(poses[p]?.time || 60); }}
                                className="glass-btn-outline" style={{ padding: "8px 16px" }}>
                                ← Prev
                            </button>
                        )}
                        <button onClick={() => poseTimer ? pausePose() : startPose()}
                            className="glass-btn" style={{ padding: "10px 28px" }}
                        >
                            {poseTimer ? "⏸ Pause" : "▶ Hold"}
                        </button>
                        {poseIdx < poses.length - 1 && (
                            <button onClick={() => { pausePose(); const n = poseIdx + 1; setPoseIdx(n); resetPose(poses[n]?.time || 60); }}
                                className="glass-btn-outline" style={{ padding: "8px 16px" }}>
                                Next →
                            </button>
                        )}
                    </div>
                </div>

                {/* ── POSE LIST ─────────────────────────────────────────────────── */}
                <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "10px" }}>All Poses</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {poses.map((p, i) => (
                        <div key={i} onClick={() => { pausePose(); setPoseIdx(i); resetPose(p.time || 60); }}
                            style={{
                                display: "flex", alignItems: "center", gap: "12px",
                                padding: "10px 14px", borderRadius: "10px",
                                background: i === poseIdx ? "var(--surface2)" : "transparent",
                                border: `1px solid ${i === poseIdx ? "var(--border)" : "transparent"}`,
                                cursor: "pointer", transition: "background 0.2s",
                            }}
                        >
                            <span style={{ fontSize: "18px", width: "24px", textAlign: "center" }}>{poseEmoji[p.name] || "🧘"}</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "16px", margin: 0, color: i < poseIdx ? "var(--muted)" : "var(--text)" }}>{p.name}</p>
                                <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>{p.reps}</p>
                            </div>
                            <span style={{ fontSize: "12px", color: i < poseIdx ? "var(--green)" : i === poseIdx ? "var(--accent)" : "var(--border)" }}>
                                {i < poseIdx ? "✓" : i === poseIdx ? "▶" : "○"}
                            </span>
                        </div>
                    ))}
                </div>

                {poseIdx === poses.length - 1 && (
                    <button onClick={onBack} className="glass-btn" style={{ width: "100%", marginTop: "24px" }}>
                        🌸 Complete Session
                    </button>
                )}
            </div>

            <BottomNav active="yoga" onNavigate={onNavigate} />
        </div>
    );
};

export default YogaView;
