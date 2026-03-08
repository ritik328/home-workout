import styles, { C } from "../components/styles";
import BottomNav from "../components/BottomNav";
import { isToday as checkToday, getStartDate } from "../utils/storage";

// ─── DAYS VIEW ────────────────────────────────────────────────────────────────
const typeIcon = (type) => {
    const icons = {
        glute: "🍑", lower: "🦵", upper: "💪", "full-body": "⚡",
        yoga: "🧘", rest: "💤", "active-rest": "🚶", "glute-power": "🔥",
        "chest-arms": "💪", legs: "🦵", "glute-sculpt": "🍑",
        "legs-thighs": "🦵", "full-strength": "⚡", "cardio-core": "🌊",
    };
    return icons[type] || "✨";
};

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];


const DaysView = ({ week, selectedWeek, logs, onSelectDay, onBack, onNavigate }) => {
    const startDate = getStartDate();
    return (
        <div style={{ ...styles.app, minHeight: "100vh" }}>
            <div style={styles.container}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
                    <button style={styles.btnOutline} onClick={onBack}>←</button>
                    <div>
                        <p className="label" style={{ fontSize: "9px", marginBottom: "4px" }}>
                            WEEK {week.week} · {week.phase}
                        </p>
                        <h2 style={{ ...styles.heading, fontSize: "28px", fontWeight: 300, fontStyle: "italic", margin: 0 }}>
                            {week.theme}
                        </h2>
                    </div>
                </div>

                {/* 7-circle day strip */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "28px" }}>
                    {DAY_LABELS.map((d, i) => {
                        const log = logs?.[`${selectedWeek}-${i}`];
                        const completed = log?.status === "completed";
                        const missed = log?.status === "missed";
                        const isTodayDay = checkToday(startDate, selectedWeek, i); // Fix 3
                        return (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div
                                    onClick={() => onSelectDay(i)}
                                    style={{
                                        width: "36px", height: "36px", borderRadius: "50%",
                                        background: completed ? "var(--accent)" : missed ? "rgba(124,74,74,0.27)" : "var(--surface2)",
                                        border: `2px solid ${isTodayDay ? "var(--accent)" : completed ? "var(--accent)" : missed ? "var(--red)" : "var(--border)"}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "11px", cursor: "pointer",
                                        color: completed ? "var(--bg)" : missed ? "var(--red)" : "var(--muted)",
                                        fontWeight: completed ? 600 : 400,
                                        boxShadow: isTodayDay ? "0 0 0 3px rgba(200,169,110,0.35)" : "none",
                                        animation: isTodayDay ? "pulse 2s ease-in-out infinite" : "none",
                                        transition: "transform 0.2s",
                                    }}
                                >
                                    {completed ? "✓" : missed ? "✗" : d}
                                </div>
                            </div>
                        );
                    })}
                </div>


                {/* Day cards */}
                {week.days.map((d, i) => {
                    const log = logs?.[`${selectedWeek}-${i}`];
                    const isCompleted = log?.status === "completed";
                    const isMissed = log?.status === "missed";
                    return (
                        <div
                            key={i}
                            style={{
                                ...styles.card,
                                cursor: "pointer",
                                borderLeft: isCompleted ? `3px solid ${C.green}` : isMissed ? `3px solid ${C.red}` : `3px solid ${C.border}`,
                                transition: "transform 0.2s, border-color 0.2s",
                            }}
                            onClick={() => onSelectDay(i)}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                                        <span style={{ fontSize: "18px" }}>{typeIcon(d.type)}</span>
                                        <span className="label" style={{ fontSize: "9px" }}>{d.label}</span>
                                    </div>
                                    <div style={{ ...styles.heading, fontSize: "18px", fontWeight: 300, marginBottom: "4px" }}>{d.focus}</div>
                                    <div className="label" style={{ fontSize: "9px", marginTop: "2px" }}>
                                        {d.exercises.length} exercises
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    {isCompleted && <span style={{ color: C.green, fontSize: "12px" }}>✅ Done</span>}
                                    {isMissed && <span style={{ color: C.red, fontSize: "12px" }}>❌ Missed</span>}
                                    {!isCompleted && !isMissed && <span style={{ color: C.muted, fontSize: "18px" }}>→</span>}
                                    {log?.duration > 0 && (
                                        <p style={{ fontSize: "10px", color: C.muted, marginTop: "4px" }}>⏱ {log.duration}m</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <BottomNav active="program" onNavigate={onNavigate} />
        </div>
    );
};

export default DaysView;
