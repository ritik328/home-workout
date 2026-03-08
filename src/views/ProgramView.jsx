import styles, { C } from "../components/styles";
import BottomNav from "../components/BottomNav";

// ─── PROGRAM VIEW ─────────────────────────────────────────────────────────────
const PHASES = [
    { name: "FOUNDATION", weeks: "1–4", desc: "Build your base. Master the fundamentals. Establish your daily rhythm.", icon: "🌱", color: C.green },
    { name: "BUILD", weeks: "5–8", desc: "Increase intensity. Add volume. Your body is adapting — push further.", icon: "⚡", color: C.accent },
    { name: "TRANSFORM", weeks: "9–12", desc: "Peak performance. Full-body strength. The version you've been working toward.", icon: "🔥", color: "#c87a4a" },
];

const ProgramView = ({ selectedWeek, onSelectWeek, onBack, onNavigate }) => (
    <div style={{ ...styles.app, minHeight: "100vh" }}>
        <div style={styles.container}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                <button style={styles.btnOutline} onClick={onBack}>←</button>
                <div>
                    <p className="label" style={{ fontSize: "9px", marginBottom: "4px" }}>12 WEEKS</p>
                    <h2 style={{ ...styles.heading, fontSize: "28px", fontWeight: 300, fontStyle: "italic", margin: 0 }}>
                        Your Program
                    </h2>
                </div>
            </div>

            {/* Phase sections */}
            {PHASES.map((phase, phaseIdx) => (
                <div key={phase.name} style={{ marginBottom: "24px" }}>
                    {/* Phase header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", padding: "16px", background: C.surface, borderRadius: "12px", borderLeft: `3px solid ${phase.color}` }}>
                        <span style={{ fontSize: "28px" }}>{phase.icon}</span>
                        <div>
                            <p className="label" style={{ fontSize: "9px", color: phase.color, marginBottom: "2px" }}>
                                PHASE {phaseIdx + 1} · WEEKS {phase.weeks}
                            </p>
                            <h3 style={{ ...styles.heading, fontSize: "20px", fontWeight: 300, margin: "0 0 4px" }}>
                                {phase.name}
                            </h3>
                            <p style={{ fontSize: "12px", color: C.muted, lineHeight: 1.5 }}>{phase.desc}</p>
                        </div>
                    </div>

                    {/* Week grid for this phase */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                        {Array.from({ length: 4 }, (_, i) => {
                            const weekIdx = phaseIdx * 4 + i;
                            return (
                                <button
                                    key={weekIdx}
                                    onClick={() => onSelectWeek(weekIdx)}
                                    style={{
                                        background: selectedWeek === weekIdx ? phase.color : C.surface2,
                                        border: `1px solid ${selectedWeek === weekIdx ? phase.color : C.border}`,
                                        borderRadius: "10px",
                                        padding: "14px 0",
                                        cursor: "pointer",
                                        textAlign: "center",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    <span className="label" style={{ fontSize: "9px", color: selectedWeek === weekIdx ? C.bg : C.muted }}>
                                        WEEK
                                    </span>
                                    <div style={{ ...styles.heading, fontSize: "22px", fontWeight: 300, color: selectedWeek === weekIdx ? C.bg : C.text }}>
                                        {weekIdx + 1}
                                    </div>
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
