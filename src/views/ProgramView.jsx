import styles, { C } from "../components/styles";
import BottomNav from "../components/BottomNav";

// ─── PROGRAM VIEW ─────────────────────────────────────────────────────────────
// Fix 15: Corrected phase week ranges to match program.js getDays() logic:
//   Foundation = weeks 1-2 (isEarly = week <= 2)
//   Build      = weeks 3-6 (isMid = week 3-6)
//   Transform  = weeks 7-12 (else)
const PHASES = [
    { name: "FOUNDATION", weeks: "1–2", weekCount: 2, startIdx: 0, desc: "Build your base. Master the fundamentals. Establish your daily rhythm.", icon: "🌱", color: C.green },
    { name: "BUILD", weeks: "3–6", weekCount: 4, startIdx: 2, desc: "Increase intensity. Add volume. Your body is adapting — push further.", icon: "⚡", color: C.accent },
    { name: "TRANSFORM", weeks: "7–12", weekCount: 6, startIdx: 6, desc: "Peak performance. Full-body strength. The version you've been working toward.", icon: "🔥", color: "#c87a4a" },
];

// Fix 12: weekDone helper — how many days completed in a given week
const weekDone = (logs, weekIdx) => {
    let count = 0;
    for (let d = 0; d < 7; d++) {
        if (logs?.[`${weekIdx}-${d}`]?.status === "completed") count++;
    }
    return count;
};

const ProgramView = ({ selectedWeek, currentWeekIdx = 0, logs = {}, onSelectWeek, onBack, onNavigate }) => (
    <div style={{ ...styles.app, minHeight: "100vh" }}>
        <div style={styles.container}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                <button className="clay-btn-outline" onClick={onBack}>←</button>
                <div>
                    <p className="label" style={{ fontSize: "9px", marginBottom: "4px" }}>12 WEEKS</p>
                    <h2 style={{ ...styles.heading, fontSize: "28px", fontWeight: 300, fontStyle: "italic", margin: 0 }}>
                        Your Program
                    </h2>
                </div>
            </div>

            {/* Fix 15 + 12 + 17: Phase sections with correct week ranges, completion, and NOW badge */}
            {PHASES.map((phase, phaseIdx) => (
                <div key={phase.name} style={{ marginBottom: "24px" }}>
                    {/* Phase header */}
                    <div className="clay-card" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", padding: "16px", borderRadius: "12px" }}>
                        <span style={{ fontSize: "28px" }}>{phase.icon}</span>
                        <div>
                            <p className="label" style={{ fontSize: "9px", color: phase.color, marginBottom: "2px" }}>
                                PHASE {phaseIdx + 1} · WEEKS {phase.weeks}
                            </p>
                            <h3 style={{ ...styles.heading, fontSize: "20px", fontWeight: 300, margin: "0 0 4px" }}>
                                {phase.name}
                            </h3>
                            <p style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>{phase.desc}</p>
                        </div>
                    </div>

                    {/* Week grid with correct week indices for this phase */}
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${phase.weekCount}, 1fr)`, gap: "8px" }}>
                        {Array.from({ length: phase.weekCount }, (_, i) => {
                            const weekIdx = phase.startIdx + i;
                            const done = weekDone(logs, weekIdx);
                            const isSelected = selectedWeek === weekIdx;
                            const isNow = currentWeekIdx === weekIdx;
                            return (
                                <button
                                    key={weekIdx}
                                    onClick={() => onSelectWeek(weekIdx)}
                                    style={{
                                        background: isSelected ? phase.color : "var(--surface)",
                                        border: "none",
                                        borderRadius: "16px",
                                        padding: "16px 0",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        transition: "all 0.2s",
                                        position: "relative",
                                        boxShadow: isSelected ? "inset 3px 3px 6px rgba(0,0,0,0.2), inset -3px -3px 6px rgba(255,255,255,0.1)" : "4px 4px 8px var(--clay-shadow), -4px -4px 8px var(--clay-highlight)",
                                    }}
                                >
                                    {isNow && (
                                        <span style={{ position: "absolute", top: "4px", right: "4px", fontSize: "7px", color: phase.color, letterSpacing: "0.05em", fontFamily: "'Inter', sans-serif" }}>NOW</span>
                                    )}
                                    <span className="label" style={{ fontSize: "9px", color: isSelected ? "var(--btn-text)" : "var(--muted)", display: "block" }}>
                                        WK
                                    </span>
                                    <div style={{ ...styles.heading, fontSize: "22px", fontWeight: 300, color: isSelected ? "var(--btn-text)" : "var(--text)" }}>
                                        {weekIdx + 1}
                                    </div>
                                    {/* Fix 12: completion count */}
                                    <span style={{ fontSize: "9px", color: isSelected ? "var(--btn-text)" : done === 7 ? "var(--green)" : "var(--muted)" }}>
                                        {done}/7
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
        <BottomNav active="program" onNavigate={onNavigate} />
    </div>
);

export default ProgramView;
