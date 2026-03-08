import { useState } from "react";
import useTimer from "../hooks/useTimer";
import ProgressRing from "../components/ProgressRing";
import BottomNav from "../components/BottomNav";

// ─── YOGA / RECOVERY VIEW ────────────────────────────────────────────────────
const BREATH_PHASES = ["BREATHE IN", "HOLD", "BREATHE OUT", "HOLD"];
const BREATH_COUNTS = [4, 4, 6, 2]; // seconds per phase (4-4-6-2 box breathing)

const YogaView = ({ day, onNavigate, onBack }) => {
    const [poseIdx, setPoseIdx] = useState(0);
    const [breathPhase, setBreathPhase] = useState(0);
    const [breathCount, setBreathCount] = useState(BREATH_COUNTS[0]);
    const [poseRunning, setPoseRunning] = useState(false);

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
                setPoseRunning(false);
                resetPose(poses[next]?.time || 60);
            } else {
                setPoseRunning(false);
            }
        });

    const poseProgress = 1 - poseSeconds / (pose?.time || 60);

    const yogaPoseEmoji = {
        "Neck Roll": "🔄", "Cat-Cow Stretch": "🐈", "Child's Pose": "🧎",
        "Downward Dog": "🐕", "Cobra Pose": "🐍", "Warrior I": "⚔️",
        "Warrior II": "🏹", "Seated Twist": "🌀", "Bridge Pose": "🌉",
        "Legs Up Wall": "🦵", "Pigeon Pose": "🕊️",
    };

    // Breath ring — goes 0→1 per phase
    const breathProgress = 1 - breathSeconds / BREATH_COUNTS[breathPhase];
    const breathLabel = BREATH_PHASES[breathPhase];

    // Breath ring expands on INHALE, stays on HOLD, shrinks on EXHALE
    const ringSize = breathPhase === 0 ? 140 + breathProgress * 20      // growing 140→160
        : breathPhase === 1 ? 160                              // hold at 160
            : breathPhase === 2 ? 160 - breathProgress * 20       // shrinking 160→140
                : 140;                                                 // tiny hold

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(160deg, #0d0b12 0%, #110d18 60%, #0a0d10 100%)",
            color: "var(--text)",
            fontFamily: "'Inter', -apple-system, sans-serif",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Ambient background glow */}
            <div style={{
                position: "fixed", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(107,90,138,0.15) 0%, transparent 70%)",
            }} />

            <div style={{ maxWidth: "480px", margin: "0 auto", padding: "20px 20px 100px", boxSizing: "border-box" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                    <button style={{ fontSize: "20px", color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }} onClick={onBack}>←</button>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "2px" }}>🧘 YOGA & RECOVERY</p>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontSize: "22px", fontWeight: 300, margin: 0 }}>
                            Sunday Healing
                        </h2>
                    </div>
                    <span style={{ fontSize: "10px", color: "var(--muted)", letterSpacing: "0.1em" }}>{poses.length} poses</span>
                </div>

                {/* ── BOX BREATH SECTION ─────────────────────────────────────────── */}
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "20px" }}>
                        BOX BREATHING
                    </p>

                    {/* Animated breath ring */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                        <div style={{
                            width: `${ringSize}px`, height: `${ringSize}px`,
                            borderRadius: "50%",
                            border: `2px solid rgba(107,90,138,0.5)`,
                            boxShadow: breathPhase === 0 || breathPhase === 1
                                ? `0 0 ${20 + breathProgress * 30}px rgba(107,90,138,0.4)`
                                : `0 0 10px rgba(107,90,138,0.2)`,
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            transition: "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease",
                        }}>
                            <span style={{ fontSize: "32px", fontWeight: 200, color: "var(--purple)", lineHeight: 1 }}>
                                {breathSeconds}
                            </span>
                            <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--purple)", marginTop: "4px", opacity: 0.7 }}>
                                {breathLabel}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "12px" }}>
                        {BREATH_PHASES.map((p, i) => (
                            <span key={i} style={{
                                fontSize: "8px", letterSpacing: "0.15em",
                                color: breathPhase === i ? "var(--purple)" : "var(--border)",
                                fontFamily: "'Inter', sans-serif",
                                textTransform: "uppercase",
                                transition: "color 0.3s",
                            }}>
                                {p.split(" ")[0]}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={breathPhase === 0 && breathSeconds === BREATH_COUNTS[0] ? startBreath : pauseBreath}
                        style={{
                            fontSize: "11px", letterSpacing: "0.15em", color: "var(--purple)",
                            background: "rgba(107,90,138,0.1)", border: "1px solid rgba(107,90,138,0.3)",
                            borderRadius: "50px", padding: "8px 24px", cursor: "pointer",
                            fontFamily: "'Inter', sans-serif", textTransform: "uppercase",
                        }}
                    >
                        Start Breathing
                    </button>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <div style={{ flex: 1, height: "1px", background: "rgba(107,90,138,0.2)" }} />
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--purple)", opacity: 0.6 }}>POSES</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(107,90,138,0.2)" }} />
                </div>

                {/* ── CURRENT POSE PLAYER ────────────────────────────────────────── */}
                <div style={{
                    background: "rgba(107,90,138,0.08)",
                    border: "1px solid rgba(107,90,138,0.2)",
                    borderRadius: "20px", padding: "24px", marginBottom: "20px", textAlign: "center",
                }}>
                    <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--purple)", marginBottom: "8px" }}>
                        POSE {poseIdx + 1} OF {poses.length}
                    </p>
                    <div style={{ fontSize: "52px", marginBottom: "8px" }}>{yogaPoseEmoji[pose?.name] || "🧘"}</div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontSize: "26px", fontWeight: 300, margin: "0 0 4px" }}>
                        {pose?.name}
                    </h3>
                    <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--purple)", textTransform: "uppercase", marginBottom: "12px" }}>
                        {pose?.reps} · {pose?.targets}
                    </p>
                    <p style={{ fontSize: "13px", color: "var(--muted)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "20px" }}>
                        "{pose?.tip}"
                    </p>

                    {/* Pose hold timer ring */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                        <ProgressRing value={poseProgress} size={120} stroke={3} color="var(--purple)">
                            <span style={{ fontSize: "36px", fontWeight: 200, color: "var(--purple)", lineHeight: 1 }}>
                                {poseSeconds}
                            </span>
                            <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--purple)", opacity: 0.6, marginTop: "2px" }}>
                                hold
                            </span>
                        </ProgressRing>
                    </div>

                    {/* Controls */}
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        {poseIdx > 0 && (
                            <button onClick={() => { pausePose(); setPoseIdx(p => p - 1); resetPose(poses[poseIdx - 1]?.time || 60); setPoseRunning(false); }}
                                style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)", background: "none", border: "1px solid var(--border)", borderRadius: "50px", padding: "8px 16px", cursor: "pointer" }}>
                                ← Prev
                            </button>
                        )}
                        <button
                            onClick={() => { if (poseTimer) pausePose(); else startPose(); setPoseRunning(!poseTimer); }}
                            style={{
                                fontSize: "11px", letterSpacing: "0.15em", color: "var(--purple)",
                                background: "rgba(107,90,138,0.15)", border: "1px solid rgba(107,90,138,0.4)",
                                borderRadius: "50px", padding: "10px 28px", cursor: "pointer",
                                fontFamily: "'Inter', sans-serif", textTransform: "uppercase",
                            }}
                        >
                            {poseTimer ? "⏸ Pause" : "▶ Hold"}
                        </button>
                        {poseIdx < poses.length - 1 && (
                            <button onClick={() => { pausePose(); const next = poseIdx + 1; setPoseIdx(next); resetPose(poses[next]?.time || 60); setPoseRunning(false); }}
                                style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)", background: "none", border: "1px solid var(--border)", borderRadius: "50px", padding: "8px 16px", cursor: "pointer" }}>
                                Next →
                            </button>
                        )}
                    </div>
                </div>

                {/* ── POSE LIST ──────────────────────────────────────────────────── */}
                <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "12px" }}>All Poses</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {poses.map((p, i) => (
                        <div key={i} onClick={() => { pausePose(); setPoseIdx(i); resetPose(p.time || 60); setPoseRunning(false); }}
                            style={{
                                display: "flex", alignItems: "center", gap: "12px",
                                padding: "12px 16px", borderRadius: "12px",
                                background: i === poseIdx ? "rgba(107,90,138,0.15)" : "transparent",
                                border: `1px solid ${i === poseIdx ? "rgba(107,90,138,0.3)" : "transparent"}`,
                                cursor: "pointer", transition: "all 0.2s",
                            }}
                        >
                            <span style={{ fontSize: "20px", width: "28px", textAlign: "center" }}>{yogaPoseEmoji[p.name] || "🧘"}</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "14px", margin: 0, color: i < poseIdx ? "var(--muted)" : "var(--text)" }}>{p.name}</p>
                                <p style={{ fontSize: "10px", color: "var(--muted)", margin: "2px 0 0", letterSpacing: "0.05em" }}>{p.reps}</p>
                            </div>
                            <span style={{ fontSize: "12px", color: i < poseIdx ? "var(--green)" : i === poseIdx ? "var(--purple)" : "var(--border)" }}>
                                {i < poseIdx ? "✓" : i === poseIdx ? "▶" : "○"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Finish button */}
                {poseIdx === poses.length - 1 && (
                    <button onClick={onBack} style={{
                        width: "100%", marginTop: "24px", padding: "16px",
                        background: "rgba(107,90,138,0.2)", border: "1px solid rgba(107,90,138,0.4)",
                        borderRadius: "12px", color: "var(--purple)", fontSize: "13px",
                        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                    }}>
                        🌸 Complete Session
                    </button>
                )}
            </div>

            <BottomNav active="yoga" onNavigate={onNavigate} />
        </div>
    );
};

export default YogaView;
